# SoloMaster Guides — Deployment & Setup Guide

## Overview
A complete, SEO-optimized static gaming guide website focused on the hottest single-player games of 2026. Built pure HTML/CSS/JS — deploy anywhere.

## Quick Start
1. Open `index.html` in your browser to preview locally
2. Deploy to Netlify/Vercel/GitHub Pages for production (see below)

## Site Structure
```
AI网站/
├── index.html              # Homepage
├── css/style.css            # All styles (dark gaming theme)
├── js/
│   ├── site-config.js       # Games, guides, categories data
│   ├── main.js             # Homepage renderer
│   └── game-page.js        # Game detail page renderer
├── games/                   # Game hub pages (12 games)
├── guides/                  # Individual guide articles
│   ├── gothic-1-remake/
│   ├── solarpunk/
│   ├── nioh-3/
│   └── ... (12 total)
├── categories/              # Genre category pages
├── data/site-config.json    # JSON data store
├── tools/
│   ├── generate_content.py  # AI content pipeline
│   └── daily_update.py      # Daily content check & sitemap generator
└── sitemap.xml              # Auto-generated sitemap
```

## Content Covered (12 Games)
- Gothic 1 Remake (June 5, 2026)
- Solarpunk (June 8, 2026)
- Slay the Spire 2
- Resident Evil Requiem
- Clair Obscur: Expedition 33
- Nioh 3
- Mouse: P.I. For Hire
- Road to Vostok
- Baldur's Gate 3 (evergreen)
- Black Myth: Wukong (evergreen)
- SAROS
- GTA VI (pre-release)

## AdSense Setup
1. Create a Google AdSense account
2. Replace all `ca-pub-XXXXXXXXXXXXXXXX` with your Publisher ID
3. Replace ad slot IDs (`1234567890`, etc.) with your Ad Unit IDs
4. Ad slots are placed at: header, sidebar, 2x in-content, footer

## Generating New Content (AI Pipeline)
```bash
# Check what needs updating:
python3 tools/generate_content.py --auto

# Generate a specific guide (outputs Claude prompt):
python3 tools/generate_content.py --game "solarpunk" --topic "advanced-tips"
```

Copy the generated prompt to Claude, paste the HTML response into the guide file.

## Auto-Update Strategy
For production, combine these tools with:
- **GitHub Actions**: Run `daily_update.py` on a cron schedule, auto-commit new guides
- **Netlify deploy hook**: Trigger rebuild when new content is pushed
- **Claude API integration**: Automate the content pipeline with scheduled tasks

## Deploy to Netlify (Recommended)
1. Push this folder to a GitHub repo
2. Go to netlify.com → "Import from Git"
3. Select the repo → Deploy
4. Set build settings: no build command needed (pure static)
5. Add custom domain in Netlify settings

## Deploy to GitHub Pages
1. Push to `username.github.io` repo (or configure Pages for any repo)
2. Go to Settings → Pages → select branch → Save
3. Site will be live at `https://username.github.io/repo-name/`

## SEO Checklist
- [x] Title & meta descriptions on all pages
- [x] Semantic HTML (article, nav, header, footer)
- [x] Canonical URLs
- [x] Breadcrumb navigation
- [x] Sitemap.xml auto-generated
- [ ] Add robots.txt
- [ ] Submit sitemap to Google Search Console
- [ ] Add Open Graph tags for social sharing
- [ ] Enable Google Analytics
