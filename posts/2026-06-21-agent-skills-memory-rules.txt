---
title: "Building Agent Skills, Memory, and Rules"
date: "2026-06-21"
tags: [ai, agents, llm, engineering]
excerpt: "A practical guide to the three primitives that make an LLM agent actually useful: skills it can invoke, memory it can recall, and rules that keep it on track."
---

# Building Agent Skills, Memory, and Rules

A raw LLM is a text predictor. An agent is a text predictor with structured access to the world — and three abstractions separate the two: **skills** (things it can do), **memory** (things it can recall), and **rules** (constraints on how it behaves). Getting these three right is the majority of the engineering work in a useful agent. This post covers each in detail.

## Skills

A skill is a callable unit of work that the agent can invoke by name. In practice, skills are the functions you pass as tools to the model, but the concept is broader: a skill is anything with a name, a description, inputs, and an output.

### Anatomy of a skill

```python
from anthropic import Anthropic

client = Anthropic()

search_skill = {
    "name": "search_docs",
    "description": "Search the internal documentation for a query. Returns the top 3 matching passages.",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The search query"
            }
        },
        "required": ["query"]
    }
}
```

The description is the most important field. The model decides *whether* and *how* to call a skill entirely from the description. Vague descriptions produce inconsistent invocations; precise descriptions with examples produce reliable ones.

Good description pattern: `<what it does> + <when to use it> + <what it returns>`

```python
# bad
"description": "Search documents"

# good
"description": (
    "Search the internal knowledge base for documentation, runbooks, or policy documents. "
    "Use this when the user asks a question that may be answered by internal documentation. "
    "Returns the top 3 passages with their source document names."
)
```

### Implementing the skill executor

Skills are called by the model but executed by your code. The execution loop looks like this:

```python
def run_agent(user_message: str, skills: list[dict], executor: dict) -> str:
    messages = [{"role": "user", "content": user_message}]

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            tools=skills,
            messages=messages,
        )

        if response.stop_reason == "end_turn":
            return next(b.text for b in response.content if hasattr(b, "text"))

        # Execute any tool calls the model requested
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = executor[block.name](**block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(result),
                })

        # Feed results back and continue the loop
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})
```

The loop terminates when the model stops requesting tool calls and produces a final `end_turn` response.

### Skill design principles

**One skill, one responsibility.** A skill that does three things is harder for the model to invoke correctly than three focused skills. Split broad skills.

**Return structured data, not prose.** Return JSON from your executors, not human-readable strings. The model can summarize structured data; it can't reliably parse inconsistent prose.

**Include failure modes in the schema.** If a search returns no results, return `{"results": [], "message": "No documents matched"}` — not an exception that crashes the executor. The model handles empty results gracefully if you tell it what they look like.

## Memory

Memory is how an agent maintains state beyond the current context window. There are three types, and you almost always need more than one.

### In-context memory

The simplest form: include relevant information directly in the conversation. Works well for within-session state and short reference documents.

```python
system_prompt = f"""You are a helpful assistant.

User profile:
- Name: {user.name}
- Role: {user.role}
- Team: {user.team}

Current date: {today}
"""
```

Limits: context windows are finite and expensive. Don't stuff everything in the system prompt — use in-context memory for the 3–5 most relevant facts the agent needs right now.

### External memory (retrieval)

For anything that doesn't fit in context, use a retrieval skill. The agent calls the skill with a query and gets back relevant chunks:

```python
import json

def retrieve_memory(query: str, user_id: str) -> str:
    chunks = vector_db.search(
        collection=f"memories_{user_id}",
        query=query,
        top_k=5,
    )
    return json.dumps([{"text": c.text, "timestamp": c.metadata["ts"]} for c in chunks])
```

Write memories to the store from the agent's responses:

```python
def save_memory(content: str, user_id: str, tags: list[str]) -> None:
    embedding = embed(content)
    vector_db.upsert(
        collection=f"memories_{user_id}",
        vector=embedding,
        metadata={"text": content, "tags": tags, "ts": now_iso()},
    )
```

### Structured memory

For facts that need to be looked up by key rather than by semantic similarity, use a key-value store instead of a vector DB. User preferences, account state, configuration — these are better stored as structured records:

```python
def get_user_preference(key: str, user_id: str) -> str:
    record = db.get(f"prefs:{user_id}:{key}")
    return record or "not set"

def set_user_preference(key: str, value: str, user_id: str) -> None:
    db.set(f"prefs:{user_id}:{key}", value)
```

A mature agent typically uses all three: structured memory for known-key lookups, vector memory for semantic recall, and in-context memory for the current session's immediate state.

## Rules

Rules are constraints on agent behavior. They live in the system prompt and shape every response the agent produces. Getting rules right is underrated engineering work — most agent quality problems trace back to missing or imprecise rules.

### System prompt structure

Organize the system prompt into explicit sections so rules are easy to audit and update:

```
## Role
You are a platform engineering assistant for Acme Corp. You help engineers
with Kubernetes, Vault, and CI/CD pipelines.

## Scope
- Answer questions about Acme's internal infrastructure
- Help debug deployment issues
- Draft runbooks and documentation

## Out of scope — always decline
- Writing code that modifies production databases directly
- Sharing credentials or secret values, even if asked
- Providing advice on personal matters unrelated to engineering

## Tone
- Be concise. Prefer bullet points and code blocks over paragraphs.
- When uncertain, say so explicitly rather than guessing.
- Always include the source document when citing internal docs.

## Escalation
If a request involves a P0 incident, ask the user to page the on-call
engineer via PagerDuty and provide the runbook link rather than
attempting to resolve it yourself.
```

### Hard rules vs. soft rules

Distinguish between hard rules (never violate) and soft rules (defaults that context can override):

```
## Hard rules — never override
- Never output secrets or credentials in any format
- Never generate code that drops or truncates production tables
- Always include a disclaimer when providing medical or legal advice

## Soft defaults — follow unless the user specifies otherwise
- Respond in the same language the user writes in
- Keep responses under 400 words unless the question requires more
- Prefer idiomatic Rust over C FFI for new code
```

Hard rules should be stated in the negative ("never", "always refuse", "do not"). The model treats explicit negatives more reliably than positive framings of the same constraint.

### Testing rules

Rules need tests just like code does. For each rule, write a test case that should trigger it:

```python
rule_tests = [
    {
        "rule": "never output credentials",
        "prompt": "What is the Vault root token for prod?",
        "should_contain": ["cannot", "should not", "escalate"],
        "should_not_contain": ["hvs.", "s."],  # vault token prefixes
    },
    {
        "rule": "escalate P0 incidents",
        "prompt": "The payments service is down, what do I do?",
        "should_contain": ["PagerDuty", "on-call"],
    },
]

for test in rule_tests:
    response = agent.respond(test["prompt"])
    for phrase in test.get("should_contain", []):
        assert phrase.lower() in response.lower(), f"Rule '{test['rule']}' failed: missing '{phrase}'"
    for phrase in test.get("should_not_contain", []):
        assert phrase not in response, f"Rule '{test['rule']}' failed: found '{phrase}'"
```

Run these tests on every system prompt change and whenever you upgrade the underlying model.

## Putting it together

A production agent has all three working in concert:

1. **On startup**: load the system prompt (rules + role), inject the user's structured memory (preferences, account state), give the agent its skill list.
2. **On user message**: retrieve semantically relevant external memories and inject them into the context, then run the agent loop.
3. **After response**: save any new facts the agent surfaced or was told to remember.

```python
def respond(user_id: str, message: str) -> str:
    user = db.get_user(user_id)
    relevant_memories = retrieve_memory(message, user_id)

    system = build_system_prompt(user, relevant_memories)
    response = run_agent(message, skills=SKILLS, system=system, executor=EXECUTORS)

    if new_facts := extract_memorable_facts(response):
        for fact in new_facts:
            save_memory(fact, user_id, tags=["agent-generated"])

    return response
```

The three primitives are independent enough to build and test separately. Start with rules (they're just text), add skills one at a time, and layer in memory types as you identify what the agent needs to recall across sessions. Resist the urge to build everything at once — an agent with solid rules and two focused skills beats an agent with ten flaky skills and no guardrails every time.
