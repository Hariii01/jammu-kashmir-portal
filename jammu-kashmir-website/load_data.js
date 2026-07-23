(function(){
  // Apply saved theme on page load
  const savedTheme = localStorage.getItem('jk_site_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('dark-theme');
  }

  // 1. Inject Unified Header across all site pages
  function injectSiteHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    headerEl.innerHTML = `
      <!-- Top Emergency & Helpline Bar -->
      <div class="gov-top-bar" style="background:#18121b; color:#faf6f0; font-size:12px; padding:6px 24px; display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #d96b1e;">
        <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
          <span style="color:#d4af37; font-weight:700;">🚨 J&K 24x7 HELPLINES:</span>
          <span>Disaster / Emergency: <strong style="color:#e76f51;">112 / 1070</strong></span>
          <span>Traffic (NH-44 Ramban): <strong style="color:#f4a261;">0191-2459048</strong></span>
          <span>Srinagar Weather Center: <strong style="color:#52b788;">0194-2430065</strong></span>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <button onclick="window.toggleSiteTheme()" style="background:#3b4c63; color:#ffffff; border:1px solid #d4af37; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:700; cursor:pointer;">
            ${savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <a href="news.html" style="color:#f4a261; text-decoration:none; font-weight:700;">⚡ Daily News &amp; 20-District Weather &rarr;</a>
        </div>
      </div>

      <!-- Main Navigation Masthead -->
      <nav class="site-main-nav" style="background:rgba(255,255,255,0.97); backdrop-filter:blur(10px); border-bottom:1px solid #dfddd3; padding:12px 24px; position:sticky; top:0; z-index:1000;">
        <div style="max-width:1400px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          
          <a href="index.html" style="text-decoration:none; display:flex; align-items:center; gap:12px; color:inherit;">
            <div style="width:40px; height:40px; background:#921a28; color:#ffffff; border:2px solid #cda250; border-radius:6px; display:flex; align-items:center; justify-content:center; font-family:serif; font-weight:700; font-size:18px; box-shadow:0 2px 6px rgba(146,26,40,0.3);">
              JK
            </div>
            <div>
              <div style="font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#921a28; line-height:1.1;">Jammu &amp; Kashmir Portal</div>
              <div style="font-size:10px; font-weight:700; color:#cda250; letter-spacing:0.12em; text-transform:uppercase;">Heritage, News &amp; Geospatial Archive</div>
            </div>
          </a>

          <!-- Navigation Links -->
          <ul style="display:flex; gap:14px; list-style:none; margin:0; padding:0; flex-wrap:wrap; font-size:13px; font-weight:600;">
            <li><a href="index.html" class="nav-link">🏠 Home</a></li>
            <li><a href="news.html" class="nav-link" style="color:#921a28; font-weight:800;">📰 News &amp; Weather</a></li>
            <li><a href="politics.html" class="nav-link">🏛️ Governance</a></li>
            <li><a href="development.html" class="nav-link">🏗️ Infrastructure</a></li>
            <li><a href="history.html" class="nav-link">📜 History</a></li>
            <li><a href="geography.html" class="nav-link">🗺️ Geography</a></li>
            <li><a href="culture.html" class="nav-link">🧶 Craft &amp; Culture</a></li>
            <li><a href="economy.html" class="nav-link">🚜 Economy</a></li>
            <li><a href="resources.html" class="nav-link">📚 Gazetteers</a></li>
            <li><a href="faq.html" class="nav-link">💬 FAQ</a></li>
          </ul>

        </div>
      </nav>
    `;
  }

  // 2. Inject Unified Sitemap Footer
  function injectSiteFooter() {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
      <footer style="background:#18121b; color:#dfddd3; padding:48px 24px 24px; border-top:4px solid #921a28; margin-top:64px; font-size:14px;">
        <div style="max-width:1400px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:32px; margin-bottom:32px;">
          
          <div>
            <h4 style="color:#d4af37; font-family:'Playfair Display',serif; font-size:18px; margin-bottom:12px;">Jammu &amp; Kashmir Information Portal</h4>
            <p style="font-size:13px; line-height:1.6; color:#a0a0a0;">Comprehensive public reference portal for the Union Territory of Jammu and Kashmir. Providing verified daily news, 20-district weather watch, heritage geography, river etymologies, and civil service study archives.</p>
          </div>

          <div>
            <h5 style="color:#ffffff; font-size:14px; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:12px;">Quick Navigation</h5>
            <ul style="list-style:none; padding:0; margin:0; font-size:13px; display:flex; flex-direction:column; gap:8px;">
              <li><a href="news.html" style="color:#f4a261; text-decoration:none;">⚡ Daily News &amp; 20-District Weather</a></li>
              <li><a href="politics.html" style="color:#dfddd3; text-decoration:none;">🏛️ Legislative Assembly &amp; Governance</a></li>
              <li><a href="development.html" style="color:#dfddd3; text-decoration:none;">🏗️ USBRL Rail &amp; Mega Infrastructure</a></li>
              <li><a href="etymology_dictionary.html" style="color:#dfddd3; text-decoration:none;">📖 River Etymology &amp; Audio Reader</a></li>
              <li><a href="stats.html" style="color:#dfddd3; text-decoration:none;">📊 20-District Analytics &amp; Flashcards</a></li>
            </ul>
          </div>

          <div>
            <h5 style="color:#ffffff; font-size:14px; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:12px;">Emergency &amp; Control Rooms</h5>
            <div style="font-size:13px; line-height:1.8; color:#a0a0a0;">
              <div>🚨 Unified Emergency: <strong style="color:#ffffff;">112 / 1070</strong></div>
              <div>🚗 NH-44 Traffic Control (Ramban): <strong style="color:#ffffff;">0191-2459048</strong></div>
              <div>🌦️ IMD Srinagar Met Center: <strong style="color:#ffffff;">0194-2430065</strong></div>
              <div>🌊 SDRF Flood Control Srinagar: <strong style="color:#ffffff;">0194-2479268</strong></div>
              <div>🏔️ Disaster Mgmt Division: <strong style="color:#ffffff;">1077</strong></div>
            </div>
          </div>

          <div>
            <h5 style="color:#ffffff; font-size:14px; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:12px;">Automated Data Sync</h5>
            <p style="font-size:12px; color:#a0a0a0; line-height:1.5;">Data aggregated from Press Information Bureau (PIB), IMD Weather Radar, Legislative Assembly Records, and official Gazetteers.</p>
            <div style="margin-top:12px;">
              <button onclick="window.toggleSiteTheme()" style="background:#921a28; color:#ffffff; border:1px solid #d4af37; padding:6px 12px; border-radius:4px; font-weight:700; cursor:pointer;">
                🌗 Switch Theme (Light / Dark)
              </button>
            </div>
          </div>

        </div>

        <div style="max-width:1400px; margin:0 auto; padding-top:24px; border-top:1px solid #2d2832; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; font-size:12px; color:#777;">
          <div>© 2026 Jammu &amp; Kashmir Knowledge Archive • Developed for Public Knowledge &amp; Educational Reference</div>
          <div>All 20 Districts Monitored • Kashmir &amp; Jammu Divisions</div>
        </div>
      </footer>
    `;
  }

  // Theme Switcher Logic
  window.toggleSiteTheme = function() {
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.remove('dark-theme');
      localStorage.setItem('jk_site_theme', 'light');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('jk_site_theme', 'dark');
    }
    injectSiteHeader();
  };

  document.addEventListener('DOMContentLoaded', () => {
    injectSiteHeader();
    injectSiteFooter();
  });
})();