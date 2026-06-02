// =============================================
// SoloMaster Guides v2 — Professional Edition
// Carousel, Search, Dark Mode, Share, Progress Bar
// =============================================

(function() {
  'use strict';

  // ============ READING PROGRESS ============
  function initProgressBar() {
    const bar = document.getElementById('readingProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      bar.style.width = total > 0 ? (h.scrollTop / total * 100) + '%' : '0%';
    });
  }

  // ============ DARK/LIGHT TOGGLE ============
  function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    btn.textContent = saved === 'dark' ? '☀️' : '🌙';

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  // ============ HERO CAROUSEL ============
  function initCarousel() {
    const track = document.getElementById('heroTrack');
    const nav = document.getElementById('heroNav');
    const prev = document.getElementById('heroPrev');
    const next = document.getElementById('heroNext');
    if (!track || !nav) return;

    const featured = GAMES.filter(g => g.featured).slice(0, 5);
    if (featured.length === 0) return;

    const imgMap = {
      'gothic-1-remake': 'gothic-remake.svg', 'solarpunk': 'solarpunk.svg',
      'nioh-3': 'nioh-3.svg', 'resident-evil-requiem': 're-requiem.svg',
      'slay-the-spire-2': 'sts-2.svg', 'road-to-vostok': 'road-to-vostok.svg',
      'mouse-pi-for-hire': 'mouse-pi.svg', 'clair-obscur-expedition-33': 'clair-obscur.svg',
      'baldurs-gate-3': 'bg3.svg', 'black-myth-wukong': 'wukong.svg',
      'saros': 'saros.svg', 'gta-6': 'gta-6.svg'
    };

    track.innerHTML = featured.map((g, i) => {
      const img = imgMap[g.id] || '';
      return `<div class="hero-slide" style="background:linear-gradient(135deg,var(--bg-card),var(--bg-secondary));">
        <div class="hero-slide-content">
          <span class="hero-slide-badge">${g.rating > 0 ? '★ ' + g.rating + '/100' : 'Coming Soon'}</span>
          <h2>${g.title}</h2>
          <p>${g.description}</p>
          <a href="games/${g.id}.html" class="btn-primary">View ${g.guides.length} Guides →</a>
        </div>
      </div>`;
    }).join('');

    // Dots
    nav.innerHTML = featured.map((_, i) => `<span class="hero-dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`).join('');

    let current = 0;
    const dots = nav.querySelectorAll('.hero-dot');
    const totalSlides = featured.length;

    function goTo(idx) {
      current = ((idx % totalSlides) + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index))));
    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));

    // Auto-advance every 5s
    setInterval(() => goTo(current + 1), 5000);
  }

  // ============ TRENDING HORIZONTAL SCROLL ============
  function renderTrendingRow() {
    const row = document.getElementById('trendingRow');
    if (!row) return;
    const trending = GAMES.filter(g => g.trending).slice(0, 8);
    const imgMap = {
      'gothic-1-remake': 'gothic-remake.svg', 'solarpunk': 'solarpunk.svg',
      'slay-the-spire-2': 'sts-2.svg', 'road-to-vostok': 'road-to-vostok.svg',
      'mouse-pi-for-hire': 'mouse-pi.svg', 'saros': 'saros.svg', 'gta-6': 'gta-6.svg'
    };

    row.innerHTML = trending.map((g, i) => {
      const catName = getCategoryName(g.category);
      const img = imgMap[g.id] || '';
      return `<div class="trending-card">
        <a href="games/${g.id}.html">
          <div class="trending-card-img">
            <img src="img/${img}" alt="${g.title}" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML='<div style=font-size:3rem>🎮</div>'">
            <span class="trending-card-num">${String(i + 1).padStart(2, '0')}</span>
          </div>
        </a>
        <div class="trending-card-body">
          <div class="trending-card-category">${catName}</div>
          <h4><a href="games/${g.id}.html">${g.title}</a></h4>
        </div>
      </div>`;
    }).join('');
  }

  // ============ FEATURED GRID ============
  function renderFeaturedGrid() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    const featured = GAMES.filter(g => g.featured).slice(0, 4);
    const imgMap = {
      'gothic-1-remake': 'gothic-remake.svg', 'solarpunk': 'solarpunk.svg',
      'nioh-3': 'nioh-3.svg', 'resident-evil-requiem': 're-requiem.svg',
      'slay-the-spire-2': 'sts-2.svg', 'clair-obscur-expedition-33': 'clair-obscur.svg',
      'baldurs-gate-3': 'bg3.svg', 'gta-6': 'gta-6.svg'
    };

    grid.innerHTML = featured.map(g => {
      const img = imgMap[g.id] || '';
      const catName = getCategoryName(g.category);
      return `<article class="featured-card">
        <a href="games/${g.id}.html">
          <div class="featured-card-image">
            <img src="img/${img}" alt="${g.title}" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML='<div style=font-size:4rem>🎮</div>'">
            <span class="featured-card-badge">${g.rating > 0 ? '★ ' + g.rating : 'TBA'}</span>
          </div>
        </a>
        <div class="featured-card-body">
          <div class="featured-card-category">${catName}</div>
          <h3 class="featured-card-title"><a href="games/${g.id}.html">${g.title} — Ultimate Guide Hub</a></h3>
          <p class="featured-card-excerpt">${g.description}</p>
          <div class="featured-card-meta">
            <span>${g.guides.length} guides</span><span>${g.platforms.join(', ')}</span><span>${g.developer}</span>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  // ============ LATEST GUIDES GRID ============
  function renderLatestGuides() {
    const grid = document.getElementById('latestGuides');
    if (!grid) return;
    const latest = ALL_GUIDES.slice(0, 12);

    grid.innerHTML = latest.map(guide => {
      const catName = getCategoryName(guide.gameCategory);
      return `<article class="article-card">
        <div class="article-card-category">${catName}</div>
        <h3 class="article-card-title"><a href="guides/${guide.gameId}/${guide.slug}.html">${guide.title}</a></h3>
        <p class="article-card-excerpt">${guide.excerpt}</p>
        <div class="article-card-meta">
          <span>${guide.gameTitle}</span><span>${formatDate(guide.date)}</span>
        </div>
      </article>`;
    }).join('');
  }

  // ============ SIDEBAR ============
  function renderSidebar() {
    const list = document.getElementById('trendingList');
    const tags = document.getElementById('categoryTags');
    if (list) {
      list.innerHTML = GAMES.filter(g => g.trending).slice(0, 7).map((g, i) =>
        `<li class="trending-item">
          <span class="trending-num">${String(i + 1).padStart(2, '0')}</span>
          <div class="trending-info">
            <h4><a href="games/${g.id}.html">${g.title}</a></h4>
            <span>${g.guides.length} guides · ${g.rating > 0 ? '★' + g.rating : 'TBA'}</span>
          </div>
        </li>`
      ).join('');
    }
    if (tags) {
      tags.innerHTML = CATEGORIES.map(c =>
        `<a href="categories/${c.slug}.html" class="category-tag">${c.icon} ${c.name}</a>`
      ).join('');
    }
  }

  // ============ SMART SEARCH WITH AUTOCOMPLETE ============
  function initSearch() {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', function() {
      const q = this.value.trim().toLowerCase();
      if (q.length < 2) { dropdown.classList.remove('active'); return; }

      const results = ALL_GUIDES.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.gameTitle.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        (getCategoryName(g.gameCategory) || '').toLowerCase().includes(q)
      ).slice(0, 8);

      if (results.length === 0) {
        dropdown.innerHTML = '<div class="no-results">No guides found for "' + q + '"</div>';
      } else {
        dropdown.innerHTML = results.map(r =>
          `<a href="guides/${r.gameId}/${r.slug}.html">
            <span style="font-size:0.9rem;">📄</span>
            <div><strong>${r.title}</strong><br><span style="font-size:0.75rem;color:var(--text-muted)">${r.gameTitle} · ${getCategoryName(r.gameCategory)}</span></div>
          </a>`
        ).join('');
      }
      dropdown.classList.add('active');
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const first = dropdown.querySelector('a');
        if (first) window.location.href = first.href;
      }
    });

    document.addEventListener('click', function(e) {
      if (!input.parentElement.contains(e.target)) dropdown.classList.remove('active');
    });
  }

  // ============ NEWSLETTER ============
  window.subscribeNewsletter = function() {
    const email = document.getElementById('newsletterEmail')?.value?.trim();
    if (email && email.includes('@')) {
      const btn = document.querySelector('.sidebar-widget .btn-primary');
      if (btn) { btn.textContent = '✓ Subscribed!'; btn.style.background = 'var(--green)'; }
    } else {
      alert('Please enter a valid email address.');
    }
  };

  // ============ INIT ============
  function init() {
    initProgressBar();
    initThemeToggle();
    initCarousel();
    renderTrendingRow();
    renderFeaturedGrid();
    renderLatestGuides();
    renderSidebar();
    initSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
