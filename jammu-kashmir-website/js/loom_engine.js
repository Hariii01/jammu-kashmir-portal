/**
 * ════════════════════════════════════════════════════
 *  EDITORIAL ENGINE  v3.0
 *  Kashmiri Cultural Archive — Production-Grade JS
 * ────────────────────────────────────────────────────
 *  Card Micro-Tilt (2° max)  ·  Layout Mode Toggle
 *  Scroll Reveal  ·  Reduced-Motion Compliance
 * ════════════════════════════════════════════════════
 */
'use strict';

/* ── Reduced-Motion Detection ─────────────────────── */
const MOTION_OK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════════════════════════════════════════
   MODULE 1 · CARD MICRO-TILT
   Maximum 2° rotation. Instant snap-back on leave.
   No shimmer layers, no box-shadow theatrics.
═══════════════════════════════════════════════════ */
class CardMicroTilt {
  init() {
    this._scan();
    /* Re-scan when dynamic content loads (search results, etc.) */
    new MutationObserver(() => this._scan())
      .observe(document.body, { childList: true, subtree: true });
  }

  _scan() {
    document.querySelectorAll('.loom-panel:not([data-mt])').forEach(card => {
      card.setAttribute('data-mt', '1');
      if (!MOTION_OK) return;

      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
        /* Clamp strictly to ±2 degrees */
        const rY =  Math.max(-2, Math.min(2, dx * 2));
        const rX =  Math.max(-2, Math.min(2, -dy * 2));
        card.style.transform  = `perspective(1200px) rotateX(${rX}deg) rotateY(${rY}deg)`;
        card.style.boxShadow  = '0 8px 24px rgba(26,17,11,0.08)';
        card.style.willChange = 'transform';
      });

      /* Instant flat snap-back — no lag */
      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.boxShadow  = '';
        card.style.willChange = 'auto';
      });
    });
  }
}

/* ═══════════════════════════════════════════════════
   MODULE 2 · LAYOUT MODE TOGGLE
   Transforms the multi-column grid into a clean,
   single-column editorial list view.
═══════════════════════════════════════════════════ */
class LayoutModeToggle {
  constructor() { this.listMode = false; }

  init() {
    const btn = document.getElementById('loom-mode-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => this._toggle(btn));
  }

  _toggle(btn) {
    this.listMode = !this.listMode;
    document.body.classList.toggle('layout-list-mode', this.listMode);
    btn.innerHTML = this.listMode
      ? '<span aria-hidden="true">▤</span> Grid View'
      : '<span aria-hidden="true">▤</span> List View';
    btn.setAttribute('aria-pressed', String(this.listMode));
  }
}

/* ═══════════════════════════════════════════════════
   MODULE 3 · SCROLL REVEAL
   Subtle 16px fade-up. Hardware-accelerated opacity.
   IntersectionObserver — no scroll event polling.
═══════════════════════════════════════════════════ */
function initScrollReveal() {
  /* Inject reveal styles via JS to avoid FOUC */
  const style = document.createElement('style');
  style.textContent = `
    @media (prefers-reduced-motion: no-preference) {
      .sr-item {
        opacity: 0;
        transform: translateY(16px);
        transition:
          opacity   0.5s cubic-bezier(0.25, 1, 0.5, 1),
          transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
      }
      .sr-item.sr-visible {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll('.loom-panel, .weave-stat-box');
  targets.forEach((el, i) => {
    el.classList.add('sr-item');
    el.style.transitionDelay = `${(i % 5) * 55}ms`;
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('sr-visible');
        io.unobserve(e.target); /* Fire once only */
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  targets.forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  new CardMicroTilt().init();
  new LayoutModeToggle().init();
  initScrollReveal();
});
