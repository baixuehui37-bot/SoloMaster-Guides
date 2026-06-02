// =============================================
// Game Page Renderer — used by /games/*.html
// =============================================
(function() {
  'use strict';

  // Determine which game page we're on
  const path = window.location.pathname;
  const match = path.match(/\/games\/([a-z0-9-]+)\.html/);
  if (!match) return;

  const gameId = match[1];
  const game = GAMES.find(g => g.id === gameId);
  if (!game) {
    document.body.innerHTML = '<div style="text-align:center;padding:100px;color:var(--text-secondary)"><h1>Game not found</h1><p><a href="/">Back to Home</a></p></div>';
    return;
  }

  // Set page title
  document.title = `${game.title} — Guides, Tips & Walkthroughs | SoloMaster Guides`;

  // Determine current page type
  const isGamePage = true;

  function render() {
    const main = document.querySelector('main');
    if (!main) return;

    const categoryName = getCategoryName(game.category);

    main.innerHTML = `
      <nav class="breadcrumbs">
        <a href="/">Home</a> <span class="sep">›</span>
        <a href="categories/${game.category}.html">${categoryName}</a> <span class="sep">›</span>
        <span>${game.title}</span>
      </nav>

      <div class="game-hero">
        <div class="game-hero-image" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;">
          <img src="../img/${game.id}.svg" alt="${game.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML='<div style=font-size:5rem;display:flex;align-items:center;justify-content:center;height:100%'>🎮</div>'">
        </div>
        <div class="game-hero-info">
          <span style="display:inline-block;background:var(--accent);color:#fff;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;padding:4px 14px;border-radius:20px;margin-bottom:12px;">${categoryName}</span>
          <h1>${game.title}</h1>
          ${game.rating > 0 ? `<div class="game-hero-score">★ ${game.rating}/100</div>` : '<div class="game-hero-score" style="background:var(--purple-bg);color:var(--purple)">Coming November 19, 2026</div>'}
          <div class="game-hero-meta">
            <span>🎮 ${game.platforms.join(', ')}</span>
            <span>🏢 ${game.developer}</span>
            <span>📅 ${game.releaseDate}</span>
          </div>
          <p class="game-hero-desc">${game.description}</p>
        </div>
      </div>

      <!-- Ad In-Content -->
      <div class="ad-slot ad-incontent">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${SITE_CONFIG.adClient}"
             data-ad-slot="${SITE_CONFIG.adSlots.inContent1}"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px;">📝 ${game.guides.length} Guides for ${game.title}</h2>

      <ul class="game-guides-list">
        ${game.guides.map(guide => `
          <li>
            <a href="../guides/${game.id}/${guide.slug}.html">
              <span style="font-size:1.2rem;">📄</span>
              <div>
                <div style="font-weight:600;margin-bottom:2px;">${guide.title}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);">${formatDate(guide.date)}</div>
              </div>
            </a>
          </li>
        `).join('')}
      </ul>

      <!-- Related Games Section -->
      <div style="margin-top:48px;">
        <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px;">🎮 More ${categoryName} Games</h2>
        <div class="article-grid">
          ${GAMES.filter(g => g.id !== game.id && g.category === game.category).slice(0, 3).map(g => `
            <article class="article-card">
              <div class="article-card-category">${getCategoryName(g.category)}</div>
              <h3 class="article-card-title">
                <a href="${g.id}.html">${g.title}</a>
              </h3>
              <p class="article-card-excerpt">${g.description.substring(0, 120)}...</p>
              <div class="article-card-meta">
                <span>${g.guides.length} guides</span>
                ${g.rating > 0 ? `<span>★ ${g.rating}</span>` : ''}
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
