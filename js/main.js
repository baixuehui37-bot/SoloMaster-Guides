// =============================================
// SoloMaster Guides — Main App JavaScript
// =============================================

(function() {
  'use strict';

  // ============ DOM HELPERS ============
  function $(sel, parent) { return (parent || document).querySelector(sel); }
  function $$(sel, parent) { return Array.from((parent || document).querySelectorAll(sel)); }

  // ============ RENDER FUNCTIONS ============

  function renderFeaturedGames() {
    const grid = $('#featuredGrid');
    if (!grid) return;
    const featured = GAMES.filter(g => g.featured);

    grid.innerHTML = featured.map(game => `
      <article class="featured-card">
        <a href="games/${game.id}.html">
          <div class="featured-card-image">
            <div class="placeholder-img">${game.image}</div>
            <span class="featured-card-badge">${game.rating > 0 ? game.rating + '/100' : 'Coming Soon'}</span>
          </div>
        </a>
        <div class="featured-card-body">
          <div class="featured-card-category">${getCategoryName(game.category)}</div>
          <h3 class="featured-card-title">
            <a href="games/${game.id}.html">${game.title} — Ultimate Guide Hub</a>
          </h3>
          <p class="featured-card-excerpt">${game.description}</p>
          <div class="featured-card-meta">
            <span>${game.guides.length} guides</span>
            <span>${game.platforms.join(', ')}</span>
            <span>${game.developer}</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderLatestGuides() {
    const grid = $('#latestGuides');
    if (!grid) return;
    const latest = ALL_GUIDES.slice(0, 9);

    grid.innerHTML = latest.map(guide => `
      <article class="article-card">
        <div class="article-card-category">${getCategoryName(guide.gameCategory)}</div>
        <h3 class="article-card-title">
          <a href="guides/${guide.gameId}/${guide.slug}.html">${guide.title}</a>
        </h3>
        <p class="article-card-excerpt">${guide.excerpt}</p>
        <div class="article-card-meta">
          <span>${guide.gameTitle}</span>
          <span>${formatDate(guide.date)}</span>
        </div>
      </article>
    `).join('');
  }

  function renderTrendingGrid() {
    const grid = $('#trendingGrid');
    if (!grid) return;
    const trending = GAMES.filter(g => g.trending);
    const guides = ALL_GUIDES.filter(g => trending.some(tg => tg.id === g.gameId)).slice(0, 6);

    grid.innerHTML = guides.map(guide => `
      <article class="article-card">
        <div class="article-card-category">🔥 Trending</div>
        <h3 class="article-card-title">
          <a href="guides/${guide.gameId}/${guide.slug}.html">${guide.title}</a>
        </h3>
        <p class="article-card-excerpt">${guide.excerpt}</p>
        <div class="article-card-meta">
          <span>${guide.gameTitle}</span>
          <span>${formatDate(guide.date)}</span>
        </div>
      </article>
    `).join('');
  }

  function renderTrendingSidebar() {
    const list = $('#trendingList');
    if (!list) return;
    const trending = GAMES.filter(g => g.trending);

    list.innerHTML = trending.map((game, i) => `
      <li class="trending-item">
        <span class="trending-num">${String(i + 1).padStart(2, '0')}</span>
        <div class="trending-info">
          <h4><a href="games/${game.id}.html">${game.title}</a></h4>
          <span>${game.guides.length} guides · ${game.rating > 0 ? game.rating + '/100' : 'TBA'}</span>
        </div>
      </li>
    `).join('');
  }

  function renderCategoryTags() {
    const tags = $('#categoryTags');
    if (!tags) return;
    tags.innerHTML = CATEGORIES.map(cat => `
      <a href="categories/${cat.slug}.html" class="category-tag">${cat.icon} ${cat.name}</a>
    `).join('');
  }

  // ============ SEARCH ============
  function initSearch() {
    const input = $('#searchInput');
    const btn = $('#searchBtn');
    if (!input || !btn) return;

    function doSearch() {
      const query = input.value.trim().toLowerCase();
      if (!query) return;

      const results = ALL_GUIDES.filter(g =>
        g.title.toLowerCase().includes(query) ||
        g.gameTitle.toLowerCase().includes(query) ||
        g.excerpt.toLowerCase().includes(query)
      );

      if (results.length > 0) {
        // Navigate to first result
        const first = results[0];
        window.location.href = `guides/${first.gameId}/${first.slug}.html`;
      } else {
        alert('No guides found for "' + query + '". Try a different search term.');
      }
    }

    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') doSearch();
    });
  }

  // ============ MOBILE MENU ============
  function initMobileMenu() {
    const btn = $('#mobileMenuBtn');
    const nav = $('#mainNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function() {
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? '' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '64px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = 'var(--bg-secondary)';
      nav.style.padding = '16px 24px';
      nav.style.borderBottom = '1px solid var(--border)';
      nav.style.zIndex = '99';
      btn.textContent = isOpen ? '☰' : '✕';
    });
  }

  // ============ NEWSLETTER ============
  function initNewsletter() {
    const btn = $$('.btn-primary-full');
    btn.forEach(b => {
      if (b.textContent.trim() === 'Subscribe') {
        b.addEventListener('click', function() {
          const input = this.previousElementSibling;
          const email = input.value.trim();
          if (email && email.includes('@')) {
            this.textContent = 'Subscribed ✓';
            this.style.background = 'var(--green)';
            input.value = '';
            setTimeout(() => {
              this.textContent = 'Subscribe';
              this.style.background = '';
            }, 2000);
          } else {
            alert('Please enter a valid email address.');
          }
        });
      }
    });
  }

  // ============ INIT ============
  function init() {
    renderFeaturedGames();
    renderLatestGuides();
    renderTrendingGrid();
    renderTrendingSidebar();
    renderCategoryTags();
    initSearch();
    initMobileMenu();
    initNewsletter();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
