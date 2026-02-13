# GitHub Pages

This repo is set up to deploy to **GitHub Pages** on every push to `main`.

## Fix “There isn’t a GitHub Pages site here” (one-time setup)

Do this once so GitHub knows to use the workflow for your site:

1. Open your repo’s **Pages settings**:  
   **https://github.com/UX-ZiLLa/Tableviewcardlayout/settings/pages**
2. Under **“Build and deployment”**, set **Source** to **“GitHub Actions”** (not “Deploy from a branch”).  
   No Save button — it applies as soon as you select it.

Then trigger a deploy (either push a commit to `main` or run the workflow manually):

- **Option A:** Push any commit to `main`, or  
- **Option B:** Go to the **Actions** tab → select **“Deploy to GitHub Pages”** → **“Run workflow”** (green button) → Run.

Wait 1–2 minutes, then open your site (see Live URL below). If you still see 404, check the **Actions** tab for a green checkmark on the latest run; if it’s red, open the run and read the error.

## Live URL

After a successful deploy, the app is at:

**https://ux-zilla.github.io/Tableviewcardlayout/**

(Use your real GitHub username if different from `UX-ZiLLa`.)

## How it works

- The workflow `.github/workflows/deploy-pages.yml` runs on every push to `main`.
- It installs dependencies, runs `npm run build`, and deploys the `dist` folder to GitHub Pages.
- You can run it manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.
