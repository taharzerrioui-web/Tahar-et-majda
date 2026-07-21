(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const WEDDING_DATE = new Date('2026-09-27T00:00:00');

  /* ============================================================
     1. Sparkle / gold-dust ambient particles (canvas)
     ============================================================ */
  function initSparkles() {
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function makeParticles(count) {
      return Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        speed: Math.random() * 0.25 + 0.05,
        drift: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      }));
    }

    resize();
    particles = makeParticles(Math.min(90, Math.floor((w * h) / 18000)));
    window.addEventListener('resize', () => {
      resize();
      particles = makeParticles(Math.min(90, Math.floor((w * h) / 18000)));
    });

    function tick() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        p.twinkle += 0.03;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.twinkle));
        ctx.beginPath();
        ctx.fillStyle = `rgba(241, 223, 168, ${a.toFixed(2)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ============================================================
     2. Cinematic opening (gate) + confetti burst
     ============================================================ */
  function burstParticles(originX, originY) {
    if (prefersReducedMotion) return;
    const colors = ['#c9a24b', '#f1dfa8', '#f7d7de', '#e8a9bd'];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'burst-particle';
      const size = Math.random() * 8 + 4;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${originX}px`;
      el.style.top = `${originY}px`;
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 260 + 120;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 80;
      const duration = Math.random() * 700 + 900;

      el.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.3)`, opacity: 0 },
      ], { duration, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => el.remove();
    }
  }

  function initIntro() {
    const intro = document.getElementById('intro');
    const site = document.getElementById('site');
    const openBtn = document.getElementById('open-invitation');
    if (!intro || !site || !openBtn) return;

    openBtn.addEventListener('click', () => {
      const rect = openBtn.getBoundingClientRect();
      burstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      intro.classList.add('opening');
      site.classList.add('visible');
      document.body.style.overflow = '';

      setTimeout(() => {
        intro.classList.add('opened');
      }, 900);
    }, { once: true });

    document.body.style.overflow = 'hidden';
  }

  /* ============================================================
     3. 3D tilt on photo frames
     ============================================================ */
  function initTilt() {
    if (prefersReducedMotion || window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${(-py * 14).toFixed(2)}deg) rotateY(${(px * 14).toFixed(2)}deg) scale(1.03)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ============================================================
     4. Countdown timer
     ============================================================ */
  function initCountdown() {
    const days = document.getElementById('cd-days');
    const hours = document.getElementById('cd-hours');
    const min = document.getElementById('cd-min');
    const sec = document.getElementById('cd-sec');
    if (!days) return;

    function pad(n) { return String(n).padStart(2, '0'); }

    function update() {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) {
        days.textContent = hours.textContent = min.textContent = sec.textContent = '00';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      days.textContent = pad(d);
      hours.textContent = pad(h);
      min.textContent = pad(m);
      sec.textContent = pad(s);
    }
    update();
    setInterval(update, 1000);
  }

  /* ============================================================
     5. Dynamic date formatting (FR / AR)
     ============================================================ */
  function initDynamicDate() {
    const frEl = document.getElementById('dynamic-date');
    const arEl = document.getElementById('dynamic-date-ar');
    if (!frEl) return;
    try {
      const fr = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(WEDDING_DATE);
      frEl.textContent = fr.charAt(0).toUpperCase() + fr.slice(1);
    } catch (e) { /* keep static fallback already in HTML */ }
    try {
      if (arEl) {
        arEl.textContent = new Intl.DateTimeFormat('ar-MA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(WEDDING_DATE);
      }
    } catch (e) { /* keep static fallback already in HTML */ }
  }

  /* ============================================================
     6. Scroll reveal
     ============================================================ */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      items.forEach(el => el.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => observer.observe(el));
  }

  /* ============================================================
     7. Ambient music toggle (graceful fallback if no file)
     ============================================================ */
  function initMusic() {
    const btn = document.getElementById('music-toggle');
    const audio = document.getElementById('bgm');
    if (!btn || !audio) return;

    audio.addEventListener('error', () => btn.classList.add('hidden'), true);

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          btn.setAttribute('aria-pressed', 'true');
        }).catch(() => btn.classList.add('hidden'));
      } else {
        audio.pause();
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /* ============================================================
     8. Ajouter au calendrier (.ics, sans dépendance externe)
     ============================================================ */
  function initAddToCalendar() {
    const btn = document.getElementById('add-calendar');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const start = new Date('2026-09-27T00:00:00Z');
      const end = new Date('2026-09-28T00:00:00Z');
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Tahar et Majda//Mariage//FR',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@tahar-et-majda`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        'SUMMARY:Mariage de Tahar & Majda',
        'DESCRIPTION:Lieu exact a confirmer. Consultez le site d\'invitation pour les mises a jour.',
        'LOCATION:Fès, Maroc',
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n');

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mariage-tahar-majda.ics';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  /* ============================================================
     9. Partage WhatsApp
     ============================================================ */
  function initShare() {
    const link = document.getElementById('share-whatsapp');
    if (!link) return;
    const text = encodeURIComponent(
      `Vous êtes invités au mariage de Tahar & Majda le 27 septembre 2026 à Fès ✨ ${window.location.href}`
    );
    link.href = `https://wa.me/?text=${text}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initIntro();
    initSparkles();
    initTilt();
    initCountdown();
    initDynamicDate();
    initReveal();
    initMusic();
    initAddToCalendar();
    initShare();
  });
})();
