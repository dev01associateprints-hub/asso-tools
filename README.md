# asso-tools

A simple calculator built with React + Vite, statically hosted on GitHub Pages.

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages via GitHub Actions.

One-time repo setup: in **Settings → Pages**, set **Source** to "GitHub Actions".

The site is served under `/asso-tools/` (see `base` in `vite.config.js`) — update this if the repo is renamed.
