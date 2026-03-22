# ScaleForge AI Ops - Deployment Guide

## Quick Deploy to GitHub Pages

### Option 1: Using GitHub Web Interface (Recommended for First Deploy)

1. **Create GitHub Personal Access Token** (if not already done):
   - Go to: https://github.com/settings/tokens/new
   - Name: "ScaleForge Deploy"
   - Expiration: 90 days
   - Scopes: `repo` (all), `workflow`
   - Generate and save the token

2. **Push to GitHub**:
   ```bash
   cd /home/jackal/.openclaw/scaleforge-project
   git remote set-url origin https://YOUR_TOKEN@github.com/jackalAgents/scaleforge-studio.git
   git push origin master
   ```

3. **Enable GitHub Pages**:
   - Go to: https://github.com/jackalAgents/scaleforge-studio/settings/pages
   - Source: Deploy from a branch
   - Branch: `master` / `/ (root)`
   - Save

4. **Site will be live at**: https://jackalagents.github.io/scaleforge-studio/

### Option 2: Using gh-pages branch

```bash
cd /home/jackal/.openclaw/scaleforge-project
git checkout -b gh-pages
git add index.html styles.css script.js demos/ .gitignore
git commit -m "Deploy to GitHub Pages"
git push -f origin gh-pages
```

Then enable Pages from the `gh-pages` branch in repo settings.

## Current Status

✅ Landing page polished with high-conversion copy
✅ All 3 demos functional and tested
✅ Professional premium agency aesthetic
✅ Mobile responsive design
✅ Fast-loading, clean code

## Site URL

Once deployed: **https://jackalagents.github.io/scaleforge-studio/**

## Local Testing

Open `index.html` directly in browser or use:
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```
