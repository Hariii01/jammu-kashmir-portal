/**
 * Jammu & Kashmir Daily News Engine v3.0
 * Features: Multi-source feed, district weather grid, news bookmarking, sub-category tags & TTS Audio Narrator
 */
(function() {
  let allNews = [];
  let weatherData = [];
  let currentCategory = 'all';
  let currentSubCategory = 'all';
  let searchQuery = '';
  let viewMode = 'grid';
  let currentDivision = 'all';
  let bookmarkedIds = JSON.parse(localStorage.getItem('jk_bookmarked_news') || '[]');

  async function initDataLoad() {
    await Promise.all([fetchNewsData(), fetchWeatherData()]);
    renderAllComponents();
  }

  async function fetchNewsData() {
    const paths = ['data/latest_news.json', '../data/latest_news.json', 'jammu-kashmir-website/data/latest_news.json'];
    for (const p of paths) {
      try {
        const res = await fetch(p + '?t=' + Date.now());
        if (res.ok) {
          const data = await res.json();
          allNews = data.news || [];
          return;
        }
      } catch (e) {}
    }
  }

  async function fetchWeatherData() {
    const paths = ['data/district_weather.json', '../data/district_weather.json', 'jammu-kashmir-website/data/district_weather.json'];
    for (const p of paths) {
      try {
        const res = await fetch(p + '?t=' + Date.now());
        if (res.ok) {
          const data = await res.json();
          weatherData = data.districts || [];
          return;
        }
      } catch (e) {}
    }
  }

  function renderAllComponents() {
    renderNewsTicker();
    renderNewsGrid();
    renderCategoryCounts();
    renderDistrictWeatherGrid();
  }

  // 1. Render Marquee Ticker
  function renderNewsTicker() {
    const tickerTrack = document.getElementById('newsMarqueeTrack');
    if (!tickerTrack) return;

    if (allNews.length === 0) {
      tickerTrack.innerHTML = '<span class="news-ticker-item"><span class="ticker-headline">Loading latest Jammu & Kashmir updates...</span></span>';
      return;
    }

    const breakingItems = allNews.filter(n => n.is_breaking).concat(allNews).slice(0, 10);
    let html = '';
    breakingItems.forEach(item => {
      const badgeClass = item.category_slug || 'politics';
      const icon = item.category_slug === 'calamity' ? '🚨' : (item.category_slug === 'development' ? '🏗️' : '🏛️');
      html += `
        <span class="news-ticker-item" onclick="window.openNewsModal('${item.id}')">
          <span class="ticker-badge badge-${badgeClass}">${icon} ${item.category}</span>
          <span class="ticker-headline">${escapeHtml(item.headline)}</span>
          <span class="ticker-source">— ${escapeHtml(item.source)} (${item.published_at})</span>
        </span>
        <span class="ticker-separator">❖</span>
      `;
    });

    tickerTrack.innerHTML = html + html;
  }

  // 2. Render News Grid
  function renderNewsGrid() {
    const container = document.getElementById('newsGridContainer');
    if (!container) return;

    let filtered = allNews.filter(item => {
      if (currentCategory === 'bookmarks') {
        return bookmarkedIds.includes(item.id);
      }

      const matchesCategory = currentCategory === 'all' || item.category_slug === currentCategory;
      const matchesSubCat = currentSubCategory === 'all' || (item.sub_category && item.sub_category === currentSubCategory);
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        item.headline.toLowerCase().includes(q) || 
        (item.summary && item.summary.toLowerCase().includes(q)) || 
        (item.details && item.details.toLowerCase().includes(q)) ||
        (item.source && item.source.toLowerCase().includes(q)) ||
        (item.sub_category && item.sub_category.toLowerCase().includes(q));

      return matchesCategory && matchesSubCat && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="news-empty-state">
          <div class="empty-icon">📰</div>
          <h3>${currentCategory === 'bookmarks' ? 'No Bookmarked News Yet' : 'No matching news found'}</h3>
          <p>${currentCategory === 'bookmarks' ? 'Click the ⭐ Star icon on any news card to save stories for later reading.' : 'Try searching for terms like "assembly", "national agenda", "railway", "weather", or reset filters.'}</p>
          <button class="btn-news-reset" onclick="window.resetNewsFilters()">Show All Updates</button>
        </div>
      `;
      return;
    }

    container.className = viewMode === 'grid' ? 'news-card-grid' : 'news-card-list';

    let html = '';
    filtered.forEach(item => {
      const catSlug = item.category_slug || 'politics';
      const icon = catSlug === 'calamity' ? '🌩️' : (catSlug === 'development' ? '🏗️' : '🏛️');
      const breakingBadge = item.is_breaking ? `<span class="badge-breaking">🔥 BREAKING</span>` : '';
      const isBookmarked = bookmarkedIds.includes(item.id);
      const subCatTag = item.sub_category ? `<span class="news-subcat-pill">${escapeHtml(item.sub_category)}</span>` : '';

      html += `
        <article class="news-card card-${catSlug}">
          <div class="news-card-header">
            <div class="news-meta">
              <span class="news-cat-tag tag-${catSlug}">${icon} ${escapeHtml(item.category)}</span>
              ${subCatTag}
              ${breakingBadge}
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="news-date">📅 ${item.published_at}</span>
              <button class="btn-bookmark ${isBookmarked ? 'is-active' : ''}" onclick="window.toggleBookmark('${item.id}', this)" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Story'}">
                ${isBookmarked ? '⭐' : '☆'}
              </button>
            </div>
          </div>

          <h3 class="news-headline" onclick="window.openNewsModal('${item.id}')">${escapeHtml(item.headline)}</h3>
          <p class="news-summary">${escapeHtml(item.summary)}</p>

          <div class="news-card-footer">
            <span class="news-source-tag">📰 ${escapeHtml(item.source)}</span>
            <div class="news-actions">
              <button class="btn-news-read" onclick="window.openNewsModal('${item.id}')">📖 Full Details &rarr;</button>
              ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener" class="btn-news-link">🔗 Source</a>` : ''}
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  }

  // 3. Render 20-District Weather Grid
  function renderDistrictWeatherGrid() {
    const container = document.getElementById('districtWeatherContainer');
    if (!container) return;

    let filtered = weatherData.filter(d => {
      if (currentDivision === 'all') return true;
      return d.division.toLowerCase() === currentDivision.toLowerCase();
    });

    let html = '';
    filtered.forEach(d => {
      const alertClass = (d.alert || 'green').toLowerCase();
      const alertEmoji = alertClass === 'red' ? '🚨 RED WARNING' : (alertClass === 'orange' ? '⚠️ ORANGE WATCH' : (alertClass === 'yellow' ? '🟡 YELLOW ADVISORY' : '🟢 NORMAL'));

      html += `
        <div class="weather-district-card weather-alert-${alertClass}">
          <div class="weather-card-top">
            <div>
              <h4 class="weather-district-name">${escapeHtml(d.name)}</h4>
              <span class="weather-div-badge">${escapeHtml(d.division)} Division • ${escapeHtml(d.type)}</span>
            </div>
            <div class="weather-temp-badge">${d.temp_c}°C</div>
          </div>

          <div class="weather-cond-row">
            <span class="weather-cond-text">🌦️ ${escapeHtml(d.condition)}</span>
            <span class="weather-rain-val">🌧️ ${d.rainfall_mm} mm</span>
          </div>

          <div class="weather-gauge-box">
            💧 <strong>River / Basin:</strong> ${escapeHtml(d.river_level)}
          </div>

          <div class="weather-alert-box alert-bg-${alertClass}">
            <strong>${alertEmoji}:</strong> ${escapeHtml(d.hazard_note)}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // 4. Render Category Counts
  function renderCategoryCounts() {
    const counts = {
      all: allNews.length,
      politics: allNews.filter(n => n.category_slug === 'politics').length,
      development: allNews.filter(n => n.category_slug === 'development').length,
      calamity: allNews.filter(n => n.category_slug === 'calamity').length,
      bookmarks: bookmarkedIds.length
    };

    for (const [key, val] of Object.entries(counts)) {
      const el = document.getElementById(`count-badge-${key}`);
      if (el) el.textContent = val;
    }

    const updatedEl = document.getElementById('newsLastUpdated');
    if (updatedEl && allNews.length > 0) {
      updatedEl.textContent = `Live Feed Active • ${allNews.length} verified reports • 20 Districts Monitored`;
    }
  }

  // Bookmark Toggle
  window.toggleBookmark = function(id, btnEl) {
    const idx = bookmarkedIds.indexOf(id);
    if (idx > -1) {
      bookmarkedIds.splice(idx, 1);
    } else {
      bookmarkedIds.push(id);
    }
    localStorage.setItem('jk_bookmarked_news', JSON.stringify(bookmarkedIds));
    renderCategoryCounts();
    renderNewsGrid();
  };

  // TTS Audio Reader for News
  window.readNewsAloud = function(id) {
    const item = allNews.find(n => n.id === id);
    if (!item) return;

    if (!('speechSynthesis' in window)) {
      alert("Audio speech synthesis is not supported in your browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${item.headline}. ${item.summary}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Global UI Handlers
  window.setNewsCategory = function(cat, btnEl) {
    currentCategory = cat;
    document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderNewsGrid();
  };

  window.setWeatherDivision = function(divName, btnEl) {
    currentDivision = divName;
    document.querySelectorAll('.weather-div-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderDistrictWeatherGrid();
  };

  window.handleNewsSearch = function(inputEl) {
    searchQuery = inputEl.value;
    renderNewsGrid();
  };

  window.toggleNewsViewMode = function(mode) {
    viewMode = mode;
    document.querySelectorAll('.btn-view-toggle').forEach(b => b.classList.remove('active'));
    const b = document.getElementById(`btn-view-${mode}`);
    if (b) b.classList.add('active');
    renderNewsGrid();
  };

  window.resetNewsFilters = function() {
    currentCategory = 'all';
    currentSubCategory = 'all';
    searchQuery = '';
    const input = document.getElementById('newsSearchInput');
    if (input) input.value = '';
    document.querySelectorAll('.news-filter-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-category') === 'all');
    });
    renderNewsGrid();
  };

  window.openNewsModal = function(id) {
    const item = allNews.find(n => n.id === id);
    if (!item) return;

    const modal = document.getElementById('newsDetailModal');
    const title = document.getElementById('modalNewsTitle');
    const meta = document.getElementById('modalNewsMeta');
    const body = document.getElementById('modalNewsBody');
    const sourceLink = document.getElementById('modalNewsSourceLink');

    if (!modal || !title || !body) return;

    const icon = item.category_slug === 'calamity' ? '🌩️' : (item.category_slug === 'development' ? '🏗️' : '🏛️');
    
    title.textContent = item.headline;
    meta.innerHTML = `
      <span class="news-cat-tag tag-${item.category_slug}">${icon} ${escapeHtml(item.category)}</span>
      <span>📰 Source: <strong>${escapeHtml(item.source)}</strong></span>
      <span>📅 Date: <strong>${item.published_at}</strong></span>
      <button class="btn-audio-pronounce" onclick="window.readNewsAloud('${item.id}')">🔊 Read Summary Aloud</button>
    `;

    body.innerHTML = `
      <div class="modal-summary-box">
        <strong>Summary:</strong> ${escapeHtml(item.summary)}
      </div>
      <div class="modal-full-details">
        <h4>Comprehensive Analysis &amp; National Policy Perspective:</h4>
        <p>${escapeHtml(item.details).replace(/\n\n/g, '</p><p>')}</p>
      </div>
    `;

    if (sourceLink) {
      if (item.url) {
        sourceLink.href = item.url;
        sourceLink.style.display = 'inline-flex';
      } else {
        sourceLink.style.display = 'none';
      }
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeNewsModal = function() {
    const modal = document.getElementById('newsDetailModal');
    if (modal) {
      window.speechSynthesis.cancel(); // stop audio if reading
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  window.refreshLiveNewsFeed = async function() {
    const btn = document.getElementById('btnRefreshNewsFeed');
    if (btn) {
      btn.innerHTML = '🔄 Syncing Feeds...';
      btn.disabled = true;
    }

    try {
      const apiRes = await fetch('/api/refresh-news', { method: 'GET' });
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.news) allNews = data.news;
        await fetchWeatherData();
        renderAllComponents();
        if (btn) {
          btn.innerHTML = '✅ Daily News Synced!';
          setTimeout(() => { btn.innerHTML = '🔄 Refresh Feed'; btn.disabled = false; }, 1500);
        }
        return;
      }
    } catch (err) {}

    initDataLoad().then(() => {
      setTimeout(() => {
        if (btn) {
          btn.innerHTML = '✅ Refreshed!';
          setTimeout(() => {
            btn.innerHTML = '🔄 Refresh Feed';
            btn.disabled = false;
          }, 1500);
        }
      }, 500);
    });
  };

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  document.addEventListener('click', function(e) {
    const modal = document.getElementById('newsDetailModal');
    if (e.target === modal) window.closeNewsModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') window.closeNewsModal();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDataLoad);
  } else {
    initDataLoad();
  }
})();
