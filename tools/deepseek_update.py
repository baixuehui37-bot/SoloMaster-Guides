# SoloMaster Guides — DeepSeek 每日内容生成脚本
# 用法：python3 tools/deepseek_update.py
# 会自动检测哪些热门游戏 7 天没更新了，然后调用 DeepSeek 生成新攻略

import json, os, datetime, re
from pathlib import Path
import urllib.request, urllib.error

SITE_ROOT = Path(__file__).resolve().parent.parent
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "sk-80c8dcdf555f4cca8808f88bc2202337")
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

# ---- 加载网站数据 ----
def load_config():
    with open(SITE_ROOT / 'data' / 'site-config.json', encoding='utf-8') as f:
        return json.load(f)

def find_stale_games():
    """找 7 天没有更新攻略的热门游戏"""
    config = load_config()
    today = datetime.date.today()
    stale = []
    for game in config['games']:
        guides = game.get('guides', [])
        if not guides or not game.get('trending'):
            continue
        # guides可能是字符串列表（JSON里最初存的格式）
        if isinstance(guides[0], str):
            stale.append((game, 999))  # 字符串格式代表没有日期，视为过期
            continue
        latest = max(datetime.date.fromisoformat(g['date']) for g in guides if isinstance(g, dict) and 'date' in g)
        days = (today - latest).days
        if days > 7:
            stale.append((game, days))
    return stale

def call_deepseek(prompt, max_tokens=4000):
    """调用 DeepSeek API"""
    data = json.dumps({
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "You are a professional video game guide writer. Write detailed, practical guides in English. Use HTML tags for formatting."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": max_tokens,
        "temperature": 0.7
    }).encode('utf-8')

    req = urllib.request.Request(DEEPSEEK_API_URL, data=data, headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
    })

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode('utf-8'))
            return result['choices'][0]['message']['content']
    except urllib.error.HTTPError as e:
        print(f"DeepSeek API 错误: {e.code} - {e.read().decode()}")
        return None
    except Exception as e:
        print(f"请求失败: {e}")
        return None

def generate_guide_prompt(game, topic):
    """构建给 DeepSeek 的提示词"""
    return f"""Write a comprehensive video game guide for: {game['title']}
Developer: {game['developer']}
Genre: {game['category']}
Platforms: {', '.join(game['platforms'])}

TOPIC: {topic['title']}

Write in English. Use HTML formatting with these rules:
- Main sections use <h2> tags
- Sub-sections use <h3> tags
- Tips use <div class="guide-tip"><strong>Pro Tip:</strong> ...</div>
- Warnings use <div class="guide-warning"><strong>Warning:</strong> ...</div>
- Data tables use <table class="guide-table"><thead><tr><th>...</th></tr></thead><tbody>...</tbody></table>
- Lists use <ul><li>...</li></ul> or <ol><li>...</li></ol>

The guide must include:
1. A strong introduction explaining why this topic matters
2. At least 2 comparison/data tables with real numbers
3. 5+ specific pro tips
4. Common mistakes section
5. At least 800 words total

Be specific and authoritative. Use concrete stats, numbers, and actionable advice. Write for experienced gamers who want to optimize."""

def save_guide(game_id, slug, title, html_content):
    """保存生成的攻略"""
    guide_dir = SITE_ROOT / 'guides' / game_id
    guide_dir.mkdir(parents=True, exist_ok=True)

    date_str = datetime.date.today().strftime('%B %e, %Y')
    game = next((g for g in load_config()['games'] if g['id'] == game_id), None)
    if not game:
        return

    full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{game['title']} {title} — SoloMaster Guides</title>
<meta name="description" content="{title} for {game['title']}. Expert guide with tips and strategies.">
<link rel="stylesheet" href="../../css/style.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <a href="../../index.html" class="logo"><div class="logo-icon">🎮</div>SoloMaster Guides</a>
    <nav class="header-nav"><a href="../../index.html">Home</a><a href="../../categories/{game['category']}.html">{game['category']}</a></nav>
    <button class="mobile-menu-btn">☰</button>
  </div>
</header>
<main class="container">
  <nav class="breadcrumbs">
    <a href="../../index.html">Home</a> <span class="sep">›</span>
    <a href="../../categories/{game['category']}.html">{game['category']}</a> <span class="sep">›</span>
    <a href="../../games/{game['id']}.html">{game['title']}</a> <span class="sep">›</span>
    <span>{title}</span>
  </nav>
  <article>
    <div class="guide-header">
      <span class="guide-category">{game['category']}</span>
      <h1>{game['title']} — {title}</h1>
      <div class="guide-meta">
        <span>📅 Updated: {date_str}</span>
        <span>⏱️ 10 min read</span>
      </div>
    </div>
    <div class="ad-slot ad-incontent">
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="3456789012" data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>
    <div class="guide-content">
{html_content}
    </div>
    <div class="ad-slot ad-incontent" style="margin-top:40px;">
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="4567890123" data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>
  </article>
</main>
<footer class="site-footer"><div class="footer-bottom" style="max-width:1280px;margin:0 auto;padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text-muted);"><span>&copy; 2026 SoloMaster Guides</span><span>Updated {date_str}</span></div></footer>
<script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
</body>
</html>'''

    filepath = guide_dir / f'{slug}.html'
    filepath.write_text(full_html, encoding='utf-8')
    print(f"  ✓ 已保存: {filepath}")
    return filepath

def update_config(game_id, slug, title):
    """更新 data/site-config.json"""
    config_path = SITE_ROOT / 'data' / 'site-config.json'
    config = load_config()
    for g in config['games']:
        if g['id'] == game_id:
            g['guides'].append({
                "title": title,
                "slug": slug,
                "excerpt": f"Expert guide for {title} — tips, strategies, and walkthroughs.",
                "date": datetime.date.today().isoformat()
            })
            break
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    print(f"  ✓ 已更新 site-config.json")

# ---- 可以自动生成的备选话题 ----
TOPIC_POOL = [
    {"slug": "advanced-tips", "title": "25 Advanced Tips & Secrets"},
    {"slug": "best-builds", "title": "Best Builds & Loadouts Guide"},
    {"slug": "speedrun-guide", "title": "Speedrun Guide: Optimal Route"},
    {"slug": "hidden-secrets", "title": "All Hidden Secrets & Easter Eggs"},
    {"slug": "endgame-guide", "title": "Endgame & Post-Game Content Guide"},
    {"slug": "combat-mastery", "title": "Combat Mastery: Advanced Techniques"},
    {"slug": "resource-farming", "title": "Ultimate Resource & Farming Guide"},
    {"slug": "boss-strategies", "title": "All Boss Strategies & Weaknesses"},
    {"slug": "achievement-guide", "title": "100% Achievement / Platinum Guide"},
]

def main():
    print("=" * 60)
    print("  SoloMaster Guides — DeepSeek 每日更新")
    print(f"  日期: {datetime.date.today().strftime('%Y年%m月%d日')}")
    print("=" * 60)

    if DEEPSEEK_API_KEY == "你的API密钥填这里":
        print("\n⚠️  请先设置 DEEPSEEK_API_KEY 环境变量！")
        print("   Windows: set DEEPSEEK_API_KEY=sk-xxxxxxxx")
        print("   Mac/Linux: export DEEPSEEK_API_KEY=sk-xxxxxxxx")
        return

    stale = find_stale_games()
    if not stale:
        print("\n✅ 所有热门游戏都有最新攻略，无需更新。")
        return

    print(f"\n发现 {len(stale)} 个需要更新的游戏：")
    for game, days in stale:
        print(f"  • {game['title']} — {days}天没更新了")

    # 取第一个过期游戏，挑一个没写过的话题
    game, days = stale[0]
    existing_slugs = {g['slug'] for g in game['guides']} if isinstance(game['guides'][0], dict) else set()

    for topic in TOPIC_POOL:
        if topic['slug'] not in existing_slugs:
            print(f"\n📝 为 {game['title']} 生成: {topic['title']}")
            print("   正在调用 DeepSeek API...")

            prompt = generate_guide_prompt(game, topic)
            content = call_deepseek(prompt)

            if content:
                # DeepSeek 可能返回包裹在 markdown 代码块里的 HTML
                # 提取纯 HTML
                html_match = re.search(r'```html?\n(.*?)```', content, re.DOTALL)
                if html_match:
                    content = html_match.group(1)
                elif content.startswith('<!DOCTYPE') or content.startswith('<'):
                    pass  # 直接就是 HTML
                else:
                    # 纯文本，用 <p> 包裹
                    content = '\n'.join(f'<p>{line}</p>' for line in content.strip().split('\n') if line.strip())

                save_guide(game['id'], topic['slug'], topic['title'], content)
                update_config(game['id'], topic['slug'], topic['title'])
                print(f"\n✅ 完成！新攻略: {topic['title']}")
            else:
                print("   ❌ DeepSeek API 调用失败，跳过。")
            break
    else:
        print(f"\n⚠️  {game['title']} 所有预设话题都已写过，手动指定一个吧。")

    print("\n" + "=" * 60)
    print("  每日更新完成！")
    print("=" * 60)

if __name__ == '__main__':
    main()
