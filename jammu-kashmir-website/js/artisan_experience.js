/**
 * ════════════════════════════════════════════════════════
 *   🍁  KASHMIRI MASTER ARTISAN EXPERIENCE ENGINE  🍁
 *       Sozni Embroidery Needle · Kani Loom Parallax
 *       Pinjra Kari Hover Dynamics · Royal Entrance Fade
 * ════════════════════════════════════════════════════════
 */

class ArtisanExperienceEngine {
  constructor() {
    this.canvas    = null;
    this.ctx       = null;
    this.trail     = [];
    this.sparks    = [];
    this.maxTrail  = 45;
    this.mouse     = { x: -200, y: -200, lastX: -200, lastY: -200, speed: 0 };
    this.hue       = 0; // oscillating hue for subtle thread color shift

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupCanvas();
      this.setupParallaxLoom();
      this.setupPaperMacheInteractions();
      this.setupScrollReveal();
      this.animate();
    });
  }

  /* ──────────────────────────────────────────
     SOZNI NEEDLE CANVAS
  ────────────────────────────────────────── */
  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'sozniNeedleCanvas';
    Object.assign(this.canvas.style, {
      position:      'fixed',
      top:           '0',
      left:          '0',
      width:         '100vw',
      height:        '100vh',
      pointerEvents: 'none',
      zIndex:        '9999',
    });
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    window.addEventListener('mousemove', (e) => {
      const dx = e.clientX - this.mouse.lastX;
      const dy = e.clientY - this.mouse.lastY;
      this.mouse.speed = Math.sqrt(dx * dx + dy * dy);
      this.mouse.x     = e.clientX;
      this.mouse.y     = e.clientY;
      this.mouse.lastX = e.clientX;
      this.mouse.lastY = e.clientY;

      // Spawn primary gold thread point
      this.trail.push({
        x: e.clientX, y: e.clientY,
        age: 0, maxAge: 55,
        size: Math.max(1.2, Math.min(3.2, 4.5 - this.mouse.speed * 0.04)),
        gold: true,
      });
      if (this.trail.length > this.maxTrail) this.trail.shift();

      // Occasionally spawn a crimson spark for accent colour
      if (this.mouse.speed > 6 && Math.random() < 0.25) {
        this.sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 1.5 - 0.5,
          age: 0, maxAge: 28,
          r: Math.random() * 2 + 1,
          crimson: Math.random() < 0.4,
        });
      }
    });
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /* ──────────────────────────────────────────
     KANI LOOM PARALLAX
  ────────────────────────────────────────── */
  setupParallaxLoom() {
    const kaniBg = document.getElementById('kani-canvas-background');
    if (!kaniBg) return;

    window.addEventListener('scroll', () => {
      const s = window.pageYOffset;
      // Vertical drift + very subtle warp-thread rotation
      kaniBg.style.transform =
        `translate3d(0, ${s * 0.2}px, 0) rotate(${s * 0.002}deg)`;
    }, { passive: true });
  }

  /* ──────────────────────────────────────────
     PAPER MACHE / NAQASHI HOVER
  ────────────────────────────────────────── */
  setupPaperMacheInteractions() {
    const cards = document.querySelectorAll(
      '.handcrafted-card, .carpet-card, .marketplace-card'
    );
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('naqashi-active');
        card.style.transition = 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('naqashi-active');
      });
    });

    // Stat boxes depth bounce on hover
    document.querySelectorAll('.weave-stat-box').forEach(box => {
      box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-4px) scale(1.04)';
      });
      box.addEventListener('mouseleave', () => {
        box.style.transform = '';
      });
    });
  }

  /* ──────────────────────────────────────────
     SCROLL REVEAL — Royal Entrance Fade
  ────────────────────────────────────────── */
  setupScrollReveal() {
    const style = document.createElement('style');
    style.textContent = `
      .reveal-artisan {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.7s cubic-bezier(0.25,1,0.5,1),
                    transform 0.7s cubic-bezier(0.25,1,0.5,1);
      }
      .reveal-artisan.revealed {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    // Tag elements for reveal
    const targets = document.querySelectorAll(
      '.weave-stat-box, .handcrafted-card, .carpet-card, ' +
      '.marketplace-card, .pinjrakari-grid-wrapper, .section-header-artisan'
    );
    targets.forEach((el, i) => {
      el.classList.add('reveal-artisan');
      el.style.transitionDelay = `${(i % 6) * 80}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(el => observer.observe(el));
  }

  /* ──────────────────────────────────────────
     RENDER LOOP
  ────────────────────────────────────────── */
  animate() {
    const ctx = this.ctx;
    if (ctx && this.canvas) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.hue = (this.hue + 0.4) % 30; // subtle golden hue oscillation

      // ── Sozni Thread Line ──────────────────
      if (this.trail.length > 1) {
        // Outer glow pass
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
          const pt   = this.trail[i];
          const prev = this.trail[i - 1];
          const xc   = (pt.x + prev.x) / 2;
          const yc   = (pt.y + prev.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
        }
        ctx.strokeStyle = 'rgba(201, 147, 42, 0.35)';
        ctx.lineWidth   = 5;
        ctx.shadowColor = '#E8B84B';
        ctx.shadowBlur  = 18;
        ctx.stroke();
        ctx.restore();

        // Inner bright thread
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
          const pt   = this.trail[i];
          const prev = this.trail[i - 1];
          const xc   = (pt.x + prev.x) / 2;
          const yc   = (pt.y + prev.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
        }
        ctx.strokeStyle = `hsl(${38 + this.hue}, 88%, 54%)`;
        ctx.lineWidth   = 1.8;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur  = 8;
        ctx.stroke();
        ctx.restore();

        // Thread bead nodes
        for (let i = 0; i < this.trail.length; i++) {
          const p     = this.trail[i];
          p.age++;
          const alpha = Math.max(0, 1 - (p.age / p.maxAge));
          if (alpha <= 0) continue;

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
          ctx.fillStyle   = `rgba(232, 184, 75, ${alpha * 0.9})`;
          ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
          ctx.shadowBlur  = 5;
          ctx.fill();
          ctx.restore();
        }

        // Needle tip — bright white-gold point
        const head = this.trail[this.trail.length - 1];
        if (head) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle   = '#FFF8DC';
          ctx.shadowColor = '#C9932A';
          ctx.shadowBlur  = 14;
          ctx.fill();
          ctx.restore();
        }

        // Clean spent points
        this.trail = this.trail.filter(p => p.age < p.maxAge);
      }

      // ── Accent Sparks ──────────────────────
      this.sparks.forEach((s, idx) => {
        s.age++;
        s.x  += s.vx;
        s.y  += s.vy;
        s.vy += 0.04; // gentle gravity
        const alpha = Math.max(0, 1 - s.age / s.maxAge);
        if (alpha <= 0) return;

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * alpha, 0, Math.PI * 2);
        ctx.fillStyle   = s.crimson
          ? `rgba(139, 26, 26, ${alpha})`
          : `rgba(201, 147, 42, ${alpha})`;
        ctx.shadowColor = s.crimson ? '#8B1A1A' : '#E8B84B';
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.restore();
      });
      this.sparks = this.sparks.filter(s => s.age < s.maxAge);
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Instantiate the artisan engine
new ArtisanExperienceEngine();
