# SoloMaster Guides — Daily Content Update Script
# Runs as a scheduled task to keep the site fresh.

import json, os, datetime
from pathlib import Path

import sys

def find_site_root():
    """Dynamically find the AI网站 directory from the mounted filesystem."""
    try:
        for base in Path('/sessions').iterdir():
            try:
                candidate = base / 'mnt' / 'AI网站'
                if candidate.exists():
                    return candidate
            except PermissionError:
                continue
    except PermissionError:
        pass
    # Fallback: use script location relative path
    return Path(__file__).resolve().parent.parent

SITE_ROOT = find_site_root()

def load_config():
    with open(SITE_ROOT / 'data' / 'site-config.json') as f:
        return json.load(f)

def check_for_stale_games():
    """Identify games that haven't had new guides recently."""
    config = load_config()
    today = datetime.date.today()
    stale = []

    for game in config['games']:
        guides = game.get('guides', [])
        if not guides:
            continue
        if isinstance(guides[0], str):
            continue
        guide_dates = []
        for g in guides:
            if isinstance(g, dict) and 'date' in g:
                guide_dates.append(datetime.date.fromisoformat(g['date']))
        if not guide_dates:
            continue
        latest = max(guide_dates)
        days_since = (today - latest).days
        if days_since > 7 and game.get('trending'):
            stale.append((game['title'], days_since, game['id']))

    return stale

def generate_sitemap():
    """Generate sitemap.xml"""
    config = load_config()
    base_url = config['site']['url']
    today = datetime.date.today().isoformat()
    urls = [
        f'  <url><loc>{base_url}/</loc><lastmod>{today}</lastmod><priority>1.0</priority></url>'
    ]
    for cat in config['categories']:
        urls.append(f'  <url><loc>{base_url}/categories/{cat["slug"]}.html</loc><priority>0.8</priority></url>')
    for game in config['games']:
        urls.append(f'  <url><loc>{base_url}/games/{game["id"]}.html</loc><priority>0.9</priority></url>')
        for guide in game.get('guides', []):
            if isinstance(guide, dict):
                urls.append(f'  <url><loc>{base_url}/guides/{game["id"]}/{guide["slug"]}.html</loc><priority>0.7</priority></url>')

    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap += '\n'.join(urls) + '\n</urlset>'
    (SITE_ROOT / 'sitemap.xml').write_text(sitemap)
    print(f'Sitemap generated with {len(urls)} URLs')

def main():
    print('=== SoloMaster Daily Update ===')
    print(f'Date: {datetime.date.today().isoformat()}\n')

    stale = check_for_stale_games()
    if stale:
        print(f'Stale trending games (>7 days):')
        for title, days, gid in stale:
            print(f'  - {title}: {days} days')
        print('\nRun generate_content.py --auto to see suggested topics.')
    else:
        print('All trending games have recent content.')

    generate_sitemap()
    print('\n=== Update Complete ===')

if __name__ == '__main__':
    main()
