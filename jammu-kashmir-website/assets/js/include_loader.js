/**
 * include_loader.js
 * Fetches header.html and footer.html fragments and injects them.
 * Also handles: mobile hamburger nav, dropdown keyboard nav, active page highlighting.
 */
(function(){
  'use strict';

  /* ── Fragment Loader ─────────────────────────────────────────── */
  function loadFragment(id, url, callback){
    var el = document.getElementById(id);
    if(!el) return;
    fetch(url)
      .then(function(r){ return r.text(); })
      .then(function(html){
        el.innerHTML = html;
        if(callback) callback(el);
      })
      .catch(function(){
        el.innerHTML = '';
      });
  }

  /* ── Active nav link ─────────────────────────────────────────── */
  function setActivePage(headerEl){
    var page = location.pathname.split('/').pop().replace('.html','') || 'index';
    headerEl.querySelectorAll('[data-page]').forEach(function(link){
      if(link.getAttribute('data-page') === page){
        link.classList.add('active');
        // also mark parent <li> for dropdown highlighting
        var li = link.closest('.site-nav__item');
        if(li) li.classList.add('active-parent');
      }
    });
  }

  /* ── Mobile hamburger ────────────────────────────────────────── */
  function initMobileNav(headerEl){
    var toggle = headerEl.querySelector('#nav-toggle');
    var menu   = headerEl.querySelector('#main-nav');
    if(!toggle || !menu) return;

    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.classList.toggle('is-open', open);
    });

    // Close menu on outside click
    document.addEventListener('click', function(e){
      if(!headerEl.contains(e.target)){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
      }
    });

    // Mobile: tap on parent link to toggle dropdown
    headerEl.querySelectorAll('.site-nav__item').forEach(function(item){
      var parentLink = item.querySelector('.site-nav__link[aria-haspopup]');
      var dropdown   = item.querySelector('.site-nav__dropdown');
      if(!parentLink || !dropdown) return;

      parentLink.addEventListener('click', function(e){
        // On mobile (menu is open), prevent navigation and toggle dropdown
        if(menu.classList.contains('open')){
          e.preventDefault();
          var isOpen = item.classList.toggle('open');
          parentLink.setAttribute('aria-expanded', String(isOpen));
        }
      });
    });
  }

  /* ── Keyboard nav for dropdowns ─────────────────────────────── */
  function initKeyboardNav(headerEl){
    headerEl.querySelectorAll('.site-nav__item').forEach(function(item){
      var trigger  = item.querySelector('.site-nav__link');
      var dropdown = item.querySelector('.site-nav__dropdown');
      if(!trigger || !dropdown) return;

      // Open on Enter/Space
      trigger.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          var open = item.classList.toggle('open');
          trigger.setAttribute('aria-expanded', String(open));
          if(open){
            var first = dropdown.querySelector('a');
            if(first) first.focus();
          }
        }
        if(e.key === 'Escape'){
          item.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();
        }
      });

      // Close on Escape inside dropdown
      dropdown.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
          item.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();
        }
      });

      // Close on focus leaving the item
      item.addEventListener('focusout', function(){
        setTimeout(function(){
          if(!item.contains(document.activeElement)){
            item.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
          }
        }, 100);
      });
    });
  }

  /* ── Date in gov bar ─────────────────────────────────────────── */
  function setGovBarDate(headerEl){
    var el = headerEl.querySelector('#gov-bar-date');
    if(!el) return;
    el.textContent = new Date().toLocaleDateString('en-IN',{
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  /* ── Search form wiring ──────────────────────────────────────── */
  function initSearchForm(headerEl){
    var form  = headerEl.querySelector('.site-nav__search-form');
    var input = headerEl.querySelector('#site-search');
    if(!form || !input) return;

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var q = input.value.trim();
      if(q){
        window.location.href = 'stats.html?q=' + encodeURIComponent(q);
      }
    });

    // Live search dropdown on stats page
    if(location.pathname.indexOf('stats') !== -1 && input){
      var params = new URLSearchParams(location.search);
      var q = params.get('q');
      if(q) input.value = q;
    }
  }

  /* ── Scroll to top button ────────────────────────────────────── */
  function initScrollTop(){
    var btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function(){
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Smooth scroll TOC with active highlight ─────────────────── */
  function initTOCspy(){
    var tocLinks = document.querySelectorAll('aside a[href^="#"]');
    if(!tocLinks.length) return;

    var sections = [];
    tocLinks.forEach(function(a){
      var target = document.querySelector(a.getAttribute('href'));
      if(target) sections.push({ link: a, el: target });
    });

    function onScroll(){
      var scrollY = window.scrollY + 120;
      var active = sections[0];
      sections.forEach(function(s){
        if(s.el.offsetTop <= scrollY) active = s;
      });
      sections.forEach(function(s){ s.link.classList.remove('toc-active'); });
      if(active) active.link.classList.add('toc-active');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Bootstrap ───────────────────────────────────────────────── */
  function onHeaderLoaded(headerEl){
    setActivePage(headerEl);
    setGovBarDate(headerEl);
    initMobileNav(headerEl);
    initKeyboardNav(headerEl);
    initSearchForm(headerEl);
  }

  var prefix = location.port === '8080' ? '/static/' : '';
  loadFragment('site-header', prefix + 'assets/includes/header.html', onHeaderLoaded);
  loadFragment('site-footer', prefix + 'assets/includes/footer.html', null);

  document.addEventListener('DOMContentLoaded', function(){
    initScrollTop();
    initTOCspy();
    // Set main#id for skip link
    var main = document.querySelector('main');
    if(main && !main.id) main.id = 'main-content';
  });
})();
