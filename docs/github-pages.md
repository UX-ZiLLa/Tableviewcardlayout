# GitHub Pages

This repo is set up to deploy to **GitHub Pages** on every push to `main`.

## One-time setup

1. In your repo on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Save. The next push to `main` (or run of the workflow) will build and deploy.

## Live URL

After the first successful deploy, the app will be at:

**https://ux-zilla.github.io/Tableviewcardlayout/**

(Replace `ux-zilla` with your GitHub username if the repo is under a different account.)

## How it works

- The workflow `.github/workflows/deploy-pages.yml` runs on every push to `main`.
- It installs dependencies, runs `npm run build`, and deploys the `dist` folder to GitHub Pages.
- You can also run it manually: **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.
