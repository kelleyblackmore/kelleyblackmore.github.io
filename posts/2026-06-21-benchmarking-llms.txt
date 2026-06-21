---
title: "Benchmarking LLMs: What to Measure and How"
date: "2026-06-21"
tags: [llm, ai, benchmarking, performance]
excerpt: "A practical guide to measuring LLM latency, throughput, quality, and cost — without getting fooled by leaderboard numbers."
---

# Benchmarking LLMs: What to Measure and How

Public leaderboard numbers are a starting point, not a conclusion. MMLU scores and HumanEval pass rates tell you something about a model's general capability, but they say nothing about how the model performs on your data, at your latency budget, with your inference infrastructure. This post covers the metrics that matter, how to collect them rigorously, and the pitfalls that make benchmark results meaningless.

## The four axes

Every LLM benchmark lives on four axes. Missing any one of them gives you an incomplete picture.

**Latency** — how long does a response take?  
**Throughput** — how many requests can the system handle concurrently?  
**Quality** — how correct or useful is the output?  
**Cost** — what does it cost per useful output?

The hard part is that these axes trade against each other. A quantized model is cheaper and faster but may score lower on quality. A larger context window enables richer answers but blows up latency and cost. You need numbers on all four axes before you can make a real comparison.

## Latency metrics

There are three latency numbers worth tracking separately:

**Time to First Token (TTFT)** — the wall-clock time from sending the request to receiving the first output token. This dominates perceived responsiveness in streaming interfaces. A model with high TTFT feels slow even if its generation speed is excellent.

**Tokens per Second (TPS)** — the generation rate once the model is producing output. This determines how long a long-form response takes to complete.

**End-to-End Latency (E2E)** — total time from request to final token. For short outputs this is dominated by TTFT; for long outputs TPS takes over.

Collect these at percentiles, not averages. p50 tells you what a typical request looks like; p95 and p99 tell you what the tail looks like, which is what your users actually complain about.

```python
import time
import statistics

def measure_ttft(client, prompt: str) -> float:
    start = time.monotonic()
    first_token = False
    ttft = 0.0
    for chunk in client.stream(prompt):
        if not first_token and chunk.text:
            ttft = time.monotonic() - start
            first_token = True
    return ttft

results = [measure_ttft(client, prompt) for prompt in test_prompts]
print(f"p50: {statistics.median(results)*1000:.0f}ms")
print(f"p95: {statistics.quantiles(results, n=20)[18]*1000:.0f}ms")
```

## Throughput benchmarking

Latency under a single request is necessary but not sufficient. You need to know how latency degrades under concurrent load.

Run a load test that ramps concurrency from 1 to N and records both TTFT and E2E at each level:

```python
import asyncio

async def load_test(client, prompts, concurrency: int):
    semaphore = asyncio.Semaphore(concurrency)
    async def single(prompt):
        async with semaphore:
            return await measure_ttft_async(client, prompt)
    tasks = [single(p) for p in prompts]
    return await asyncio.gather(*tasks)

for c in [1, 4, 8, 16, 32]:
    results = asyncio.run(load_test(client, prompts * 10, concurrency=c))
    print(f"concurrency={c:2d}  p50={p50(results):.0f}ms  p95={p95(results):.0f}ms")
```

Plot TTFT against concurrency. The inflection point where latency starts climbing steeply is your practical throughput ceiling for that deployment.

## Quality evaluation

Quality is the hardest axis because it's task-dependent. Resist the urge to report a single score — instead, build a small eval suite that reflects your actual use cases.

**For factual / Q&A tasks**: exact-match or fuzzy-match against ground-truth answers. Use a held-out dataset, not examples the model may have seen in training.

**For generation tasks** (summaries, rewrites, code): an LLM-as-judge setup works well. Have a capable model (or a human panel) rate outputs on a rubric. Keep the rubric narrow and concrete — "is this response correct?" is more reliable than "rate this response 1–5".

**For code generation**: execute the output. Pass-rate against a test suite is the most honest signal. HumanEval and SWE-bench use this approach; replicate it on your own task distribution.

A minimal eval harness looks like this:

```python
def run_eval(model, cases: list[dict]) -> dict:
    scores = []
    for case in cases:
        response = model.complete(case["prompt"])
        score = judge(response, case["expected"])
        scores.append(score)
    return {
        "pass_rate": sum(scores) / len(scores),
        "n": len(scores),
    }
```

Run this eval on every model you're comparing, on the same cases, with the same judge. Even a 50-case eval is more informative than a leaderboard number if the cases reflect your workload.

## Cost accounting

Measure cost in terms of useful output, not raw tokens. Two models with the same price-per-token can have wildly different effective costs if one requires longer prompts to get correct answers.

Track:
- Input tokens per request (prompt + system prompt + context)
- Output tokens per request
- Retry rate (failed or low-quality outputs that required a second call)
- Effective cost per correct answer = `(input_cost + output_cost) / pass_rate`

The retry rate is the term most people miss. A model that succeeds on the first try at twice the price can still be cheaper than a cheap model that requires three attempts.

## Common pitfalls

**Benchmarking against your training distribution.** If you wrote your eval cases while thinking about what the model can do, they'll be biased toward the model's strengths. Source cases from real user queries or from a separate person who doesn't know the models.

**Not controlling for context length.** Latency scales with context length. Always report the prompt token count alongside latency numbers, otherwise comparisons across models are meaningless.

**Warm vs. cold starts.** The first request to a serverless endpoint hits a cold container; subsequent requests reuse it. Decide which scenario you care about and measure it explicitly. Don't mix them.

**Comparing different sampling parameters.** Temperature, top-p, and max tokens all affect both quality and latency. Pin them to the same values across all models you compare.

**Treating the eval as one-time work.** Models change (providers update weights silently), your task distribution evolves, and new models appear. Schedule a recurring eval run — even monthly — so you catch regressions and can make informed upgrade decisions.

## A benchmark you can trust

A trustworthy LLM benchmark is boring to describe: it has a fixed dataset drawn from real queries, measures all four axes, reports percentiles not averages, controls for prompt length and sampling parameters, and runs on a schedule. None of that is glamorous, but it's what separates a number you can make a decision from from a number that just feels authoritative.

Start with 50–100 eval cases, pick the three latency metrics, run a concurrency ramp, and account for retries in your cost math. That's enough to make a real model selection decision without getting lost in methodology.
