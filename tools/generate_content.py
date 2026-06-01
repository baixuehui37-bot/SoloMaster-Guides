# SoloMaster Guides — AI Content Pipeline
# Generates new game guides using the Claude API and updates the site automatically.
#
# Usage:
#   python3 tools/generate_content.py --game "gothic-1-remake" --topic "best-builds"
#   python3 tools/generate_content.py --auto  # Generates 1-2 trending topics automatically

import json, os, sys, argparse, datetime, re, subprocess
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent

# Load site config
with open(SITE_ROOT / 'data' / 'site-config.json') as f:
    site_config = json.load(f)

GAMES = site_config['games']
CATEGORIES = site_config['categories']

def get_game(game_id):
    for g in GAMES:
        if g['id'] == game_id:
            return g
    return None

def get_category(cat_id):
    for c in CATEGORIES:
        if c['id'] == cat_id:
            return c
    return None

def generate_prompt(game, topic_name, topic_description):
    """Build the Claude prompt for generating a guide."""
    return f"""You are a professional video game guide writer for SoloMaster Guides. Write a comprehensive, detailed guide in proper English.

GAME: {game['title']}
DEVELOPER: {game['developer']}
PLATFORMS: {', '.join(game['platforms'])}
GENRE: {get_category(game['category'])['name']}

GUIDE TOPIC: {topic_name}

Write a complete HTML guide article with these exact sections:

## Introduction (2 paragraphs)
Introduce the topic, why it matters for players, and what the guide covers.

## Main Content (at least 600 words)
Deep, specific, actionable advice. Include:
- Step-by-step instructions where applicable
- Specific numbers, stats, and data points
- Common mistakes players make
- Advanced strategies for experienced players
- A comparison table if relevant

## Expert Tips
At least 5 specific, non-obvious tips that would help even experienced players.

## Summary
A brief conclusion paragraph.

FORMAT REQUIREMENTS:
- Write in valid HTML using <h2>, <h3>, <p>, <ul>, <li>, <table>, <tr>, <th>, <td>, <strong>, <div class="guide-tip">, <div class="guide-warning">
- Use <div class="guide-tip"><strong>Pro Tip:</strong> ...</div> for tips
- Use <div class="guide-warning"><strong>Warning:</strong> ...</div> for warnings
- Tables should have class="guide-table"
- Be specific and authoritative — never say "experiment with different approaches"
- Include concrete numbers and stats whenever possible
- Write for gamers who want to optimize and master the game, not casual players
- Target length: 800-1200 words"""

def create_guide_html(game, topic_slug, topic_name, content_html):
    """Create the full guide HTML file."""
    date_str = datetime.date.today().strftime('%B %e, %Y')
    date_iso = datetime.date.today().isoformat()
    cat = get_category(game['category'])

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{game['title']} {topic_name} — SoloMaster Guides</title>
<meta name="description" content="{topic_name} for {game['title']}. Expert guide with tips, strategies, and walkthroughs. Updated {date_str}.">
<meta name="robots" content="index, follow">
<link rel="stylesheet" href="../../css/style.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <a href="../../index.html" class="logo"><div class="logo-icon">🎮</div>SoloMaster Guides</a>
    <nav class="header-nav" id="mainNav">
      <a href="../../index.html">Home</a>
      <a href="../../categories/{game['category']}.html">{cat['name']}</a>
      <a href="../../categories/open-world.html">Open World</a>
      <a href="../../categories/horror.html">Horror</a>
      <a href="../../categories/soulslike.html">Soulslike</a>
      <a href="../../categories/roguelike.html">Roguelike</a>
    </nav>
    <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
  </div>
</header>

<main class="container">
  <nav class="breadcrumbs">
    <a href="../../index.html">Home</a> <span class="sep">›</span>
    <a href="../../categories/{game['category']}.html">{cat['name']}</a> <span class="sep">›</span>
    <a href="../../games/{game['id']}.html">{game['title']}</a> <span class="sep">›</span>
    <span>{topic_name}</span>
  </nav>

  <article>
    <div class="guide-header">
      <span class="guide-category">{cat['name']}</span>
      <h1>{game['title']} — {topic_name}</h1>
      <div class="guide-meta">
        <span>📅 Updated: {date_str}</span>
        <span>⏱️ 12 min read</span>
        <span class="rating">★ {game['rating']}/100</span>
      </div>
    </div>

    <div class="ad-slot ad-incontent">
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="3456789012" data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>

    <div class="guide-content">
      {content_html}
    </div>

    <div class="ad-slot ad-incontent" style="margin-top:40px;">
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="4567890123" data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>
  </article>
</main>

<footer class="site-footer">
  <div class="footer-bottom" style="max-width:1280px;margin:0 auto;padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text-muted);">
    <span>&copy; 2026 SoloMaster Guides</span>
    <span>Updated Daily — {date_str}</span>
  </div>
</footer>
<script src="../../js/site-config.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
</body>
</html>'''

    # Write to file
    guide_dir = SITE_ROOT / 'guides' / game['id']
    guide_dir.mkdir(parents=True, exist_ok=True)
    filepath = guide_dir / f'{topic_slug}.html'
    filepath.write_text(html, encoding='utf-8')
    return filepath

def update_site_config(game_id, topic_slug, topic_name, topic_excerpt):
    """Add the new guide to site config."""
    config_path = SITE_ROOT / 'data' / 'site-config.json'
    with open(config_path) as f:
        config = json.load(f)

    for g in config['games']:
        if g['id'] == game_id:
            g['guides'].append({
                'title': topic_name,
                'slug': topic_slug,
                'excerpt': topic_excerpt,
                'date': datetime.date.today().isoformat()
            })
            break

    with open(config_path, 'w') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

    # Also update site-config.js
    js_path = SITE_ROOT / 'js' / 'site-config.js'
    # This would update the JS file too — simplified for the prototype
    print(f'Updated site config for {game_id}/{topic_slug}')

def run_auto_generation():
    """Automatically generate content for trending games."""
    today = datetime.date.today()
    print(f'=== SoloMaster AI Content Pipeline ===')
    print(f'=== Running auto-generation for {today.isoformat()} ===\n')

    # Find trending games that need new content
    trending = [g for g in GAMES if g.get('trending')]
    print(f'Found {len(trending)} trending games')

    for game in trending[:3]:  # Process top 3 trending
        print(f'\n--- {game["title"]} ---')
        existing = {g['slug'] for g in game['guides']}

        # Topics we could generate
        potential_topics = [
            {'slug': 'tips-and-tricks', 'title': '25 Essential Tips & Tricks', 'excerpt': f'25 must-know tips for {game["title"]} — hidden mechanics, time-saving tricks, and pro strategies.'},
            {'slug': 'best-settings', 'title': 'Best Settings Guide (PC & Console)', 'excerpt': f'Optimize your {game["title"]} experience — best graphics settings, control schemes, and accessibility options.'},
            {'slug': 'endgame-guide', 'title': 'Endgame Guide: What to Do After You Beat It', 'excerpt': f'Everything to do after the credits roll in {game["title"]} — NG+, secret content, and post-game challenges.'},
            {'slug': 'leveling-guide', 'title': 'Fast Leveling & Progression Guide', 'excerpt': f'The fastest way to level up and progress in {game["title"]} — optimized routes and strategies.'},
        ]

        for topic in potential_topics:
            if topic['slug'] not in existing:
                print(f'  Would generate: {topic["title"]}')
                print(f'  Run: python3 tools/generate_content.py --game {game["id"]} --topic {topic["slug"]}')
                break

    print('\n=== Auto-generation check complete ===')
    print('To actually generate content, use:')
    print('  python3 tools/generate_content.py --game <game-id> --topic <topic-slug>')

def main():
    parser = argparse.ArgumentParser(description='SoloMaster AI Content Pipeline')
    parser.add_argument('--game', type=str, help='Game ID to generate content for')
    parser.add_argument('--topic', type=str, help='Topic slug to generate')
    parser.add_argument('--auto', action='store_true', help='Run auto-generation check')
    args = parser.parse_args()

    if args.auto:
        run_auto_generation()
        return

    if args.game and args.topic:
        game = get_game(args.game)
        if not game:
            print(f'Error: Game "{args.game}" not found')
            sys.exit(1)
        print(f'Generating content for: {game["title"]}')
        print(f'Topic: {args.topic}')
        print(f'\n=== PROMPT FOR CLAUDE ===\n')
        print(generate_prompt(game, args.topic, ''))
        print('\n=== END PROMPT ===')
        print(f'\nPaste the generated HTML content and it will be saved to:')
        print(f'  guides/{args.game}/{args.topic}.html')
        return

    parser.print_help()

if __name__ == '__main__':
    main()
