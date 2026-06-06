// =============================================
// Game Page Renderer — used by /games/*.html
// =============================================
(function() {
  'use strict';

  const path = window.location.pathname;
  const match = path.match(/\/games\/([a-z0-9-]+)\.html/);
  if (!match) return;

  const gameId = match[1];
  const game = GAMES.find(g => g.id === gameId);
  if (!game) {
    document.body.innerHTML = '<div style="text-align:center;padding:100px;color:var(--text-secondary)"><h1>Game not found</h1><p><a href="/">Back to Home</a></p></div>';
    return;
  }

  document.title = game.title + ' — Guides, Tips & Walkthroughs | SoloMaster Guides';

  function render() {
    const main = document.querySelector('main');
    if (!main) return;

    const categoryName = getCategoryName(game.category);

    // Universal image name resolver
    var imgName = (game.id + '.svg');
    // Check if file exists with a simple fallback
    var imgSrc = '../img/' + imgName;

    main.innerHTML =
      '<nav class="breadcrumbs">' +
        '<a href="/">Home</a> <span class="sep">›</span> ' +
        '<a href="categories/' + game.category + '.html">' + categoryName + '</a> <span class="sep">›</span> ' +
        '<span>' + game.title + '</span>' +
      '</nav>' +

      '<div class="game-hero">' +
        '<div class="game-hero-image" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;display:flex;align-items:center;justify-content:center;">' +
          '<img src="' + imgSrc + '" alt="' + game.title + '" style="width:100%;height:100%;object-fit:cover;" loading="lazy" onerror="this.style.display=\'none\'">' +
          '<div style="display:none;font-size:5rem;text-align:center;width:100%" class="img-fallback">🎮</div>' +
        '</div>' +
        '<div class="game-hero-info">' +
          '<span style="display:inline-block;background:var(--accent);color:#fff;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;padding:4px 14px;border-radius:20px;margin-bottom:12px;">' + categoryName + '</span>' +
          '<h1>' + game.title + '</h1>' +
          (game.rating > 0 ? '<div class="game-hero-score">★ ' + game.rating + '/100</div>' : '<div class="game-hero-score" style="background:var(--purple-bg);color:var(--purple)">TBA</div>') +
          '<div class="game-hero-meta">' +
            '<span>' + game.platforms.join(', ') + '</span>' +
            '<span>' + (game.developer || '') + '</span>' +
            '<span>' + (game.releaseDate || '') + '</span>' +
          '</div>' +
          '<p class="game-hero-desc">' + (game.description || '') + '</p>' +
        '</div>' +
      '</div>' +

      '<div class="ad-slot ad-incontent">' +
        '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7173243111626096" data-ad-slot="3456789012" data-ad-format="auto" data-full-width-responsive="true"></ins>' +
      '</div>' +

      '<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px;">' + (game.guides || []).length + ' Guides for ' + game.title + '</h2>' +

      '<ul class="game-guides-list">' +
        (game.guides || []).map(function(guide) {
          return '<li><a href="../guides/' + game.id + '/' + guide.slug + '.html">' +
            '<span style="font-size:1.2rem;">📄</span>' +
            '<div>' +
              '<div style="font-weight:600;margin-bottom:2px;">' + (guide.title || guide.slug) + '</div>' +
              '<div style="font-size:0.75rem;color:var(--text-muted);">' + (guide.date ? formatDate(guide.date) : '') + '</div>' +
            '</div>' +
          '</a></li>';
        }).join('') +
      '</ul>';

    // Show fallback if image fails
    setTimeout(function() {
      var img = main.querySelector('.game-hero-image img');
      var fb = main.querySelector('.img-fallback');
      if (img && fb && (!img.complete || img.naturalWidth === 0)) {
        img.style.display = 'none';
        fb.style.display = 'block';
      }
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
