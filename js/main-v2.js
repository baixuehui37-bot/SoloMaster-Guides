// =============================================
// SoloMaster Guides v2 — Professional Edition
// Carousel, Search, Dark Mode, Share, Progress Bar
// =============================================

(function() {
  'use strict';

  // Universal image name resolver — tries gameId.svg, falls back gracefully
  function getGameImg(gameId) {
    // Map known mismatches from data/site-config.json
    var knownMap = {
      'gothic-1-remake': 'gothic-remake',
      'clair-obscur-expedition-33': 'clair-obscur',
      'baldurs-gate-3': 'bg3',
      'black-myth-wukong': 'wukong',
      'resident-evil-requiem': 're-requiem',
      'slay-the-spire-2': 'sts-2',
      'mouse-pi-for-hire': 'mouse-pi',
      'elden-ring-shadow-erdtree': 'elden-ring-shadow-erdtree',
      'kingdom-come-2': 'kingdom-come-2',
      'doom-dark-ages': 'doom-dark-ages',
      'death-stranding-2': 'death-stranding-2',
      'metroid-prime-4': 'metroid-prime-4',
      'hollow-knight-silksong': 'hollow-knight-silksong',
      'ff7-rebirth': 'ff7-rebirth',
      'monster-hunter-wilds': 'monster-hunter-wilds',
      'nioh-3': 'nioh-3',
      'solarpunk': 'solarpunk',
      'road-to-vostok': 'road-to-vostok',
      'saros': 'saros',
      'gta-6': 'gta-6'
    };
    return (knownMap[gameId] || gameId) + '.svg';
  }

  // ============ READING PROGRESS ============
  function initProgressBar() {
    var bar = document.getElementById('readingProgress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
      var h = document.documentElement;
      var total = h.scrollHeight - h.clientHeight;
      bar.style.width = total > 0 ? (h.scrollTop / total * 100) + '%' : '0%';
    });
  }

  // ============ DARK/LIGHT TOGGLE ============
  function initThemeToggle() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    btn.textContent = saved === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  // ============ HERO CAROUSEL ============
  function initCarousel() {
    var track = document.getElementById('heroTrack');
    var nav = document.getElementById('heroNav');
    var prev = document.getElementById('heroPrev');
    var next = document.getElementById('heroNext');
    if (!track || !nav) return;

    var featured = GAMES.filter(function(g) { return g.featured; }).slice(0, 5);
    if (!featured.length) return;

    track.innerHTML = featured.map(function(g) {
      var img = getGameImg(g.id);
      return '<div class="hero-slide" style="background:linear-gradient(135deg,var(--bg-card),var(--bg-secondary));">' +
        '<div class="hero-slide-content">' +
          '<span class="hero-slide-badge">' + (g.rating > 0 ? '★ ' + g.rating + '/100' : 'Coming Soon') + '</span>' +
          '<h2>' + g.title + '</h2>' +
          '<p>' + (g.description || '') + '</p>' +
          '<a href="games/' + g.id + '.html" class="btn-primary">View ' + (g.guides || []).length + ' Guides →</a>' +
        '</div>' +
      '</div>';
    }).join('');

    nav.innerHTML = featured.map(function(_, i) {
      return '<span class="hero-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></span>';
    }).join('');

    var current = 0;
    var dots = nav.querySelectorAll('.hero-dot');
    var totalSlides = featured.length;

    function goTo(idx) {
      current = ((idx % totalSlides) + totalSlides) % totalSlides;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    dots.forEach(function(d) {
      d.addEventListener('click', function() { goTo(parseInt(d.dataset.index)); });
    });
    if (prev) prev.addEventListener('click', function() { goTo(current - 1); });
    if (next) next.addEventListener('click', function() { goTo(current + 1); });
    setInterval(function() { goTo(current + 1); }, 5000);
  }

  // ============ TRENDING HORIZONTAL SCROLL ============
  function renderTrendingRow() {
    var row = document.getElementById('trendingRow');
    if (!row) return;
    var trending = GAMES.filter(function(g) { return g.trending; }).slice(0, 8);

    row.innerHTML = trending.map(function(g, i) {
      var catName = getCategoryName(g.category);
      var img = getGameImg(g.id);
      return '<div class="trending-card">' +
        '<a href="games/' + g.id + '.html">' +
          '<div class="trending-card-img">' +
            '<img src="img/' + img + '" alt="' + g.title + '" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'<div style=font-size:3rem>&#x1f3ae;</div>\'">' +
            '<span class="trending-card-num">' + String(i + 1).padStart(2, '0') + '</span>' +
          '</div>' +
        '</a>' +
        '<div class="trending-card-body">' +
          '<div class="trending-card-category">' + catName + '</div>' +
          '<h4><a href="games/' + g.id + '.html">' + g.title + '</a></h4>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // ============ FEATURED GRID ============
  function renderFeaturedGrid() {
    var grid = document.getElementById('featuredGrid');
    if (!grid) return;
    var featured = GAMES.filter(function(g) { return g.featured; }).slice(0, 4);

    grid.innerHTML = featured.map(function(g) {
      var img = getGameImg(g.id);
      var catName = getCategoryName(g.category);
      return '<article class="featured-card">' +
        '<a href="games/' + g.id + '.html">' +
          '<div class="featured-card-image">' +
            '<img src="img/' + img + '" alt="' + g.title + '" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'<div style=font-size:4rem>&#x1f3ae;</div>\'">' +
            '<span class="featured-card-badge">' + (g.rating > 0 ? '★ ' + g.rating : 'TBA') + '</span>' +
          '</div>' +
        '</a>' +
        '<div class="featured-card-body">' +
          '<div class="featured-card-category">' + catName + '</div>' +
          '<h3 class="featured-card-title"><a href="games/' + g.id + '.html">' + g.title + ' — Ultimate Guide Hub</a></h3>' +
          '<p class="featured-card-excerpt">' + (g.description || '') + '</p>' +
          '<div class="featured-card-meta">' +
            '<span>' + (g.guides || []).length + ' guides</span><span>' + (g.platforms || []).join(', ') + '</span><span>' + (g.developer || '') + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  // ============ LATEST GUIDES GRID ============
  function renderLatestGuides() {
    var grid = document.getElementById('latestGuides');
    if (!grid) return;
    var latest = ALL_GUIDES.slice(0, 12);
    grid.innerHTML = latest.map(function(guide) {
      return '<article class="article-card">' +
        '<div class="article-card-category">' + getCategoryName(guide.gameCategory) + '</div>' +
        '<h3 class="article-card-title"><a href="guides/' + guide.gameId + '/' + guide.slug + '.html">' + (guide.title || guide.slug) + '</a></h3>' +
        '<p class="article-card-excerpt">' + (guide.excerpt || '') + '</p>' +
        '<div class="article-card-meta">' +
          '<span>' + (guide.gameTitle || '') + '</span><span>' + (guide.date ? formatDate(guide.date) : '') + '</span>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  // ============ SIDEBAR ============
  function renderSidebar() {
    var list = document.getElementById('trendingList');
    var tags = document.getElementById('categoryTags');
    if (list) {
      list.innerHTML = GAMES.filter(function(g) { return g.trending; }).slice(0, 7).map(function(g, i) {
        return '<li class="trending-item">' +
          '<span class="trending-num">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<div class="trending-info">' +
            '<h4><a href="games/' + g.id + '.html">' + g.title + '</a></h4>' +
            '<span>' + (g.guides || []).length + ' guides · ' + (g.rating > 0 ? '★' + g.rating : 'TBA') + '</span>' +
          '</div>' +
        '</li>';
      }).join('');
    }
    if (tags) {
      tags.innerHTML = CATEGORIES.map(function(c) {
        return '<a href="categories/' + c.slug + '.html" class="category-tag">' + c.icon + ' ' + c.name + '</a>';
      }).join('');
    }
  }

  // ============ SMART SEARCH WITH AUTOCOMPLETE ============
  function initSearch() {
    var input = document.getElementById('searchInput');
    var dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', function() {
      var q = this.value.trim().toLowerCase();
      if (q.length < 2) { dropdown.classList.remove('active'); return; }

      var results = ALL_GUIDES.filter(function(g) {
        return (g.title || '').toLowerCase().indexOf(q) !== -1 ||
               (g.gameTitle || '').toLowerCase().indexOf(q) !== -1 ||
               (g.excerpt || '').toLowerCase().indexOf(q) !== -1 ||
               (getCategoryName(g.gameCategory) || '').toLowerCase().indexOf(q) !== -1;
      }).slice(0, 8);

      if (results.length === 0) {
        dropdown.innerHTML = '<div class="no-results">No guides found for "' + q + '"</div>';
      } else {
        dropdown.innerHTML = results.map(function(r) {
          return '<a href="guides/' + r.gameId + '/' + r.slug + '.html">' +
            '<span style="font-size:0.9rem;">📄</span>' +
            '<div><strong>' + (r.title || r.slug) + '</strong><br><span style="font-size:0.75rem;color:var(--text-muted)">' + (r.gameTitle || '') + ' · ' + getCategoryName(r.gameCategory) + '</span></div>' +
          '</a>';
        }).join('');
      }
      dropdown.classList.add('active');
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var first = dropdown.querySelector('a');
        if (first) window.location.href = first.href;
      }
    });

    document.addEventListener('click', function(e) {
      if (!input.parentElement.contains(e.target)) dropdown.classList.remove('active');
    });
  }

  // ============ NEWSLETTER ============
  window.subscribeNewsletter = function() {
    var email = document.getElementById('newsletterEmail');
    var btn = document.querySelector('.sidebar-widget .btn-primary');
    if (email && email.value && email.value.indexOf('@') !== -1) {
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
