---
title: "Deploying with GitHub Pages"
date: "2025-12-25"
tags: [deploy, github-pages]
excerpt: "How I deploy this portfolio using GitHub Pages and `gh-pages`."
---

# Deploying with GitHub Pages

This site is built with Create React App and deployed to GitHub Pages using the `gh-pages` package.

Key steps:

1. Set `homepage` in `package.json`.
2. Run `npm run build` then `npm run deploy`.
3. GitHub Pages serves the `build` directory from the `gh-pages` branch or `master/main` depending on settings.

Small tips: enable HTTPS in repository pages settings and ensure your `homepage` matches your site URL.
