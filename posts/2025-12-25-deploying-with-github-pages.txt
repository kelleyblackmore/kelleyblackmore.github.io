---
title: "Deploying a Static Site to GitHub Pages"
date: "2026-06-21"
tags: [deploy, github-pages, devops]
excerpt: "A complete guide to deploying and maintaining a static site on GitHub Pages — custom domains, Jekyll pitfalls, and keeping it fast."
---

# Deploying a Static Site to GitHub Pages

GitHub Pages is the easiest way to host a personal portfolio or documentation site at zero cost. It's also easy to misconfigure. This is the guide I wish I'd had — covering the setup that actually works, the pitfalls that bite you later, and the Jekyll vs. static HTML distinction that trips nearly everyone up.

## Two modes you need to understand

GitHub Pages serves your site in one of two ways:

**Jekyll mode** (default) — GitHub runs Jekyll on your repo before serving it. Markdown files get processed into HTML. Files prefixed with `_` are treated as templates or data. Files starting with `.` are ignored. This is great if you're deliberately using Jekyll; it's silently wrong if you're not.

**Static mode** — GitHub serves your files exactly as-is, with no processing. Enable it by dropping a `.nojekyll` file in your repo root:

```bash
touch .nojekyll
git add .nojekyll && git commit -m "disable jekyll"
git push
```

If you're deploying a built React, Vite, or SvelteKit app — or writing raw HTML like this site — you want static mode. Without `.nojekyll`, Jekyll may silently swallow files, mangle paths, or refuse to serve anything beginning with an underscore (which is where bundlers like Vite put assets: `_assets/`).

## The repo naming convention

GitHub Pages has two flavors:

| Repo name | URL | Notes |
|-----------|-----|-------|
| `username.github.io` | `https://username.github.io` | User site, served from `main`/`master` |
| `any-repo-name` | `https://username.github.io/any-repo-name` | Project site, served from `gh-pages` branch or `/docs` folder |

For a personal portfolio, create a repo named exactly `<your-github-username>.github.io`. This site lives at that URL with no path prefix, which simplifies all your asset links.

Project sites are served from a subpath (`/repo-name/`), which means every absolute path in your HTML needs to account for the prefix. If you're using a build tool, set the `base` config option. If you're writing raw HTML, use relative paths everywhere.

## Enabling Pages in the repo

After pushing your files:

1. Go to **Settings → Pages** in your repo
2. Under **Source**, choose the branch and folder (`/` for root, `/docs` for the docs folder)
3. Hit **Save**

GitHub will show you the URL once the first deployment finishes — usually within 60 seconds. Subsequent pushes trigger a new deployment automatically.

## Custom domains

To use a custom domain like `kelleyblackmore.com`:

**Step 1** — Add a `CNAME` file to your repo root containing just the domain:

```
kelleyblackmore.com
```

**Step 2** — Add DNS records at your registrar. For an apex domain (`example.com`), add four `A` records pointing to GitHub's servers:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For a `www` subdomain, add a `CNAME` record pointing to `username.github.io`.

**Step 3** — In **Settings → Pages**, enter your custom domain and check **Enforce HTTPS** once the certificate provisions (usually a few minutes after DNS propagates).

DNS propagation can take up to 48 hours, but is often under 10 minutes. You can check with:

```bash
dig +short kelleyblackmore.com
# should return GitHub's IPs above
```

## Handling 404s

GitHub Pages has no server-side routing. Any URL that doesn't correspond to an actual file on disk returns a 404. There are two clean ways to handle this in a static site:

**Option 1 — `404.html`**: Create a `404.html` file at the root. GitHub Pages serves this for any missing path. You can use it to show a friendly error or redirect back to the homepage:

```html
<!doctype html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=/" />
</head>
<body>Redirecting…</body>
</html>
```

**Option 2 — `index.html` at every route**: For single-page apps, copy your `index.html` to `404.html`. The browser loads the app from the error page and client-side routing takes it from there. This is the technique used by `create-react-app`'s `gh-pages` integration.

For a plain static site with no client-side router, Option 1 is cleaner.

## Deploying a build artifact

If your site has a build step (Vite, Next.js static export, etc.), you need to push the build output to GitHub Pages — not the source. The two common approaches:

**GitHub Actions** (recommended):

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

This builds on every push to `main` and deploys the `dist/` folder to the `gh-pages` branch automatically.

**Manual with the `gh-pages` npm package**:

```bash
npm install --save-dev gh-pages

# package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

npm run deploy
```

The `gh-pages` package pushes your build output to the `gh-pages` branch and automatically adds `.nojekyll`.

## How this site is deployed

This portfolio is a single `index.html` file with markdown posts under `/posts/` and a `post.html` reader that fetches and renders them in the browser. There's no build step. The deploy workflow is:

```bash
# edit files, then:
git add -p
git commit -m "add post: ..."
git push origin master
```

GitHub Pages picks up the push and deploys within about 30 seconds. The `.nojekyll` file at the root prevents Jekyll from touching anything. Markdown rendering happens client-side via `marked.js`, so the server only needs to serve static files — no build pipeline, no dependencies.

## Common pitfalls checklist

- [ ] **Missing `.nojekyll`** — Jekyll silently breaks static sites, especially those with `_`-prefixed asset dirs
- [ ] **Wrong branch** — Pages is configured to the wrong branch; pushes go nowhere
- [ ] **Path prefix missing** — Project sites (not `username.github.io`) live at `/repo-name/`; hardcoded absolute paths break
- [ ] **Case-sensitive filenames** — GitHub's servers are Linux; `Image.PNG` and `image.png` are different files
- [ ] **Large files** — GitHub has a 100 MB file limit; use Git LFS for binaries
- [ ] **HTTPS not enforced** — Mixed-content warnings block resources loaded over HTTP on an HTTPS page
- [ ] **No `404.html`** — Missing paths return GitHub's generic 404 instead of your own page

Once you've shipped the first push and confirmed the site loads, GitHub Pages mostly stays out of the way. The main ongoing gotcha is case-sensitivity — code works fine on Mac in development and fails silently on Linux servers in production.
