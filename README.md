# Portfolio Website

This repo is a React-based portfolio that builds and deploys to GitHub Pages.

Adding blog posts
- Create a Markdown file in `public/posts/` (e.g. `my-post.md`).
- Include YAML frontmatter at the top, for example:

---
title: "My post title"
date: "2025-12-24"
excerpt: "Short summary"
tags: [projects, notes]
---

- On build (CI or `npm run build`) the script `scripts/generate-posts-index.js` will generate `public/posts/index.json` and the RSS in `public/rss.xml`.

Local commands
- Install dependencies: `npm install`
- Generate posts index and RSS: `npm run generate:posts` and `npm run generate:rss`
- Build: `npm run build` (runs generators first)

Deployment
- The project uses GitHub Actions to build and deploy `build/` to GitHub Pages on push to `master`.
