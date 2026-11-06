/* ==========================================================
   BOCADILLO A40 DE TÁNGER — Propuesta A «Riad»
   Zellige en canvas que coge la luz del cursor, mapa del
   Estrecho, celosía de estrellas que destapa el local,
   anatomía del bocadillo capa a capa (SVG generado), carta
   bajo siete tajines que se destapan, carrusel arrastrable,
   vídeos y reseñas.
   ========================================================== */
(() => {
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const STATIC = /[?&]static\b/.test(location.search);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || STATIC;
const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
const motion = hasGSAP && !reduced;
if (hasGSAP) gsap.registerPlugin(ScrollTrigger);
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
document.documentElement.classList.toggle('static', STATIC);
document.documentElement.classList.toggle('no-motion', !motion);
const IMG = (f) => 'assets/img/' + f;
const play = (v) => { if (!v) return; if (!v.src && v.dataset.src) v.src = v.dataset.src; const p = v.play(); if (p) p.catch(() => {}); };
const seeded = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };

/* ----------------------------------------------------------
   DATOS · carta, ingredientes y bocadillos en datos.js (5 idiomas)
   ---------------------------------------------------------- */
const { ING, BOC, MENU, EXTRAS } = A40;
const loc = A40.L, T = A40.t;
const GAL = A40.SITE.gal;
const HA = { lechuga: 20, tomate: 16, cebolla: 12, pimientos: 14, maiz: 11, aceitunas: 13, ensalada: 24, pollo: 28, ternera: 24, kefta: 30, salchicha: 26, gambas: 26, calamar: 22, sepia: 20, higado: 20, salsa: 12, huevo: 20, remolacha: 13, zanahoria: 11, cebmorada: 12 };
const GLAZE = { boc: ['#B5603F', '#E8C27F', '#0F4A3A', '#F3EBDD'], panini: ['#C99A2E', '#F3EBDD', '#7A2E22', '#0F4A3A'], pasticcio: ['#7A2E22', '#E8C27F', '#0F4A3A', '#F3EBDD'], tacos: ['#1F4E79', '#E8C27F', '#F3EBDD', '#C8332B'], durum: ['#3E7D4F', '#F3EBDD', '#C99A2E', '#1F4E79'], burger: ['#B5603F', '#1F4E79', '#F3EBDD', '#E8C27F'], tapas: ['#C8332B', '#F3EBDD', '#0F4A3A', '#E8C27F'], bebidas: ['#0F4A3A', '#E8C27F', '#C8332B', '#F3EBDD'] };

/* ----------------------------------------------------------
   HORARIO · martes a domingo 12:00–24:00, lunes cerrado
   ---------------------------------------------------------- */
const madrid = () => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), m: +p.hour * 60 + +p.minute };
};
const paintLive = () => {
  const { d, m } = madrid();
  const open = d !== 1 && m >= 720;
  const txt = T(open ? 'open' : d === 1 ? 'closedMon' : 'closedAm');
  $$('[data-live]').forEach((el) => { el.classList.toggle('is-open', open); el.classList.toggle('is-closed', !open); $('[data-live-text]', el).textContent = txt; });
  $$('#hours tr').forEach((tr) => tr.classList.toggle('is-today', +tr.dataset.d === d));
};
paintLive(); setInterval(paintLive, 30000);
A40.on(paintLive);

/* ----------------------------------------------------------
   SCROLL · NAV · MENÚ
   ---------------------------------------------------------- */
let lenis = null;
if (motion && typeof window.Lenis !== 'undefined') {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const nav = $('#nav'), burger = $('#burger'), drawer = $('#drawer');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 30);
  nav.classList.toggle('is-hidden', y > 600 && y > lastY && !drawer.classList.contains('is-open'));
  lastY = y;
}, { passive: true });
const setDrawer = (open) => { burger.setAttribute('aria-expanded', open); drawer.classList.toggle('is-open', open); document.body.style.overflow = open ? 'hidden' : ''; if (lenis) open ? lenis.stop() : lenis.start(); };
burger.addEventListener('click', () => setDrawer(burger.getAttribute('aria-expanded') !== 'true'));
const goTo = (t) => { if (lenis) lenis.scrollTo(t, { offset: -60 }); else t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); };
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
  const id = a.getAttribute('href'); if (id.length < 2) return;
  const t = $(id); if (!t) return;
  e.preventDefault(); setDrawer(false); goTo(t);
}));

/* ----------------------------------------------------------
   ENTRADA
   ---------------------------------------------------------- */
const heroIn = () => {
  if (!motion) return;
  gsap.from('.hero__t .ln > span', { yPercent: 115, duration: 1.2, ease: 'power4.out', stagger: .09 });
  gsap.from(['.eyebrow', '.hero__ar', '.hero__lead', '.hero__cta', '.hero__hint'], { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08, delay: .35 });
  gsap.from('.hero__window', { scale: .86, opacity: 0, rotate: -8, duration: 1.6, ease: 'power3.out', delay: .1 });
};
if (motion) {
  const tl = gsap.timeline({ onComplete: () => document.documentElement.classList.add('no-intro') });
  tl.to('.intro__star *', { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: .06 })
    .to('.intro__ar', { opacity: 1, duration: .5 }, '-=.6')
    .to('.intro__star', { rotate: 45, scale: 1.25, duration: .9, ease: 'power2.inOut' }, '-=.2')
    .to('.intro', { opacity: 0, duration: .6, onStart: heroIn }, '-=.4');
} else document.documentElement.classList.add('no-intro');

/* ----------------------------------------------------------
   ZELLIGE · estrellas de ocho puntas que cogen la luz
   ---------------------------------------------------------- */
(() => {
  const cv = $('#zellige'); if (!cv) return;
  const ctx = cv.getContext('2d');
  const hero = $('#hero');
  let W = 0, H = 0, dpr = 1, tiles = [], s = 120, visible = true, raf = 0;
  const light = { x: 0, y: 0, tx: 0, ty: 0, auto: true };
  const PAL = ['#E6DAC0', '#E6DAC0', '#E6DAC0', '#DCCDAE', '#C9A15B', '#0E5442', '#0E5442', '#2B5B88'];
  const starPath = (cx, cy, R) => {
    const r = R * .7654, p = new Path2D();
    for (let k = 0; k < 16; k++) {
      const a = -Math.PI / 2 + k * Math.PI / 8, rr = k % 2 ? r : R;
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      k ? p.lineTo(x, y) : p.moveTo(x, y);
    }
    p.closePath(); return p;
  };
  const size = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    s = W < 700 ? 84 : 118;
    const rnd = seeded(40);
    tiles = [];
    const cols = Math.ceil(W / s) + 2, rows = Math.ceil(H / s) + 2;
    const ox = (W - (cols - 1) * s) / 2, oy = (H - (rows - 1) * s) / 2;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const a = rnd() * Math.PI * 2;
      tiles.push({ x: ox + i * s, y: oy + j * s, c: PAL[Math.floor(rnd() * PAL.length)], nx: Math.cos(a), ny: Math.sin(a), k: .6 + rnd() * .4 });
    }
    light.x = light.tx = W * .72; light.y = light.ty = H * .4;
    draw(0);
  };
  const draw = (t) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#0F3F32'; ctx.fillRect(0, 0, W, H);
    if (light.auto) { light.tx = W * (.62 + .22 * Math.cos(t / 3200)); light.ty = H * (.45 + .3 * Math.sin(t / 2600)); }
    light.x = lerp(light.x, light.tx, .08); light.y = lerp(light.y, light.ty, .08);
    const sig = Math.max(W, H) * .2;
    for (const tl of tiles) {
      const dx = light.x - tl.x, dy = light.y - tl.y, d = Math.hypot(dx, dy) || 1;
      const I = Math.exp(-(d * d) / (2 * sig * sig));
      const R = s * .5 * (1 + .05 * I) - 2;
      const p = starPath(tl.x, tl.y, R);
      ctx.fillStyle = tl.c; ctx.fill(p);
      ctx.lineWidth = 2.6; ctx.strokeStyle = '#0B231C'; ctx.stroke(p);
      const facing = .5 + .5 * ((dx / d) * tl.nx + (dy / d) * tl.ny);
      const a = I * (.25 + .55 * facing) * tl.k;
      if (a > .01) {
        ctx.save(); ctx.clip(p);
        const g = ctx.createRadialGradient(tl.x + tl.nx * R * .35, tl.y + tl.ny * R * .35, 0, tl.x, tl.y, R * 1.1);
        g.addColorStop(0, `rgba(255,252,238,${a})`); g.addColorStop(.45, `rgba(255,248,225,${a * .35})`); g.addColorStop(1, 'rgba(255,248,225,0)');
        ctx.fillStyle = g; ctx.fillRect(tl.x - R, tl.y - R, R * 2, R * 2);
        ctx.restore();
      }
      const shade = (1 - I) * .42;
      if (shade > .01) { ctx.fillStyle = `rgba(6,22,17,${shade})`; ctx.fill(p); }
    }
  };
  const loop = (t) => { draw(t); raf = visible && motion ? requestAnimationFrame(loop) : 0; };
  hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); light.auto = false; light.tx = e.clientX - r.left; light.ty = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => { light.auto = true; });
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf && motion) raf = requestAnimationFrame(loop); }).observe(hero);
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(size, 150); });
  size();
  if (motion) raf = requestAnimationFrame(loop);
})();

/* ----------------------------------------------------------
   REVELADOS · ESTRECHO · CELOSÍA
   ---------------------------------------------------------- */
if (motion) {
  $$('[data-reveal]').forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }));
  const route = $('.sm-route');
  gsap.fromTo(route, { strokeDashoffset: 120, strokeDasharray: '5 7' }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '#straitMap', start: 'top 80%', end: 'bottom 40%', scrub: true } });
  gsap.from('.sm-coast', { opacity: 0, x: (i) => (i ? 30 : -30), duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: '#straitMap', start: 'top 80%' } });
  gsap.from('.stats li', { y: 20, opacity: 0, duration: .8, stagger: .1, scrollTrigger: { trigger: '.stats', start: 'top 90%' } });
}
(() => {
  const fig = $('#lattice'), grid = $('.lattice__grid', fig);
  let cells = [];
  const build = () => {
    const w = fig.clientWidth, h = fig.clientHeight;
    const cols = Math.max(6, Math.round(w / (w < 700 ? 64 : 96))), cs = w / cols, rows = Math.ceil(h / cs);
    grid.style.setProperty('--cols', cols);
    grid.style.gridAutoRows = cs + 'px';
    grid.innerHTML = '<i></i>'.repeat(cols * rows);
    cells = $$('i', grid).map((el, k) => {
      const x = (k % cols + .5) / cols - .5, y = (Math.floor(k / cols) + .5) / rows - .5;
      return { el, d: Math.hypot(x, y * rows / cols) };
    });
    paint(motion ? 0 : 1);
  };
  const paint = (p) => {
    for (const c of cells) {
      const v = clamp(p * 1.9 - c.d * 1.1, 0, 1);
      c.el.classList.toggle('gone', v >= 1);
      c.el.style.setProperty('--o', (v * 74).toFixed(2) + '%');
    }
  };
  build();
  window.addEventListener('resize', build);
  if (motion) ScrollTrigger.create({ trigger: fig, start: 'top 85%', end: 'center 45%', scrub: true, onUpdate: (st) => paint(st.progress) });
})();

/* ----------------------------------------------------------
   ANATOMÍA · el bocadillo por capas (SVG)
   ---------------------------------------------------------- */
const X0 = 40, X1 = 470, L = X1 - X0;
const DRAW = {
  wavy(h, amp, per, rnd, fill, stroke) {
    let top = '', bot = '';
    for (let x = X0 - 6; x <= X1 + 6; x += per / 2) {
      const yt = amp + Math.sin(x / per * Math.PI * 2 + rnd() * .8) * amp * (.6 + rnd() * .5);
      top += `${top ? 'L' : 'M'}${x.toFixed(1)} ${yt.toFixed(1)} `;
    }
    for (let x = X1 + 6; x >= X0 - 6; x -= per / 2) {
      const yb = h - amp * .6 + Math.sin(x / per * Math.PI * 2 + 1.7 + rnd()) * amp * .6;
      bot += `L${x.toFixed(1)} ${yb.toFixed(1)} `;
    }
    return `<path d="${top}${bot}Z" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/>`;
  },
  lechuga(h, rnd) {
    let s = DRAW.wavy(h, 5, 26, rnd, '#7DBA5C', '#4C8536');
    for (let x = X0 + 10; x < X1; x += 34 + rnd() * 20) s += `<path d="M${x} ${h * .55} q 10 ${-h * .3} 22 ${-h * .12}" stroke="#A8D88A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    return s;
  },
  tomate(h, rnd) {
    let s = '';
    for (let x = X0 - 4; x < X1 - 30; x += 58 + rnd() * 12) {
      const w = 64 + rnd() * 10, y = rnd() * 3;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h - 2}" rx="${h / 2}" fill="#D9483B" stroke="#9E2A22" stroke-width="1.2"/>`;
      s += `<rect x="${x + 6}" y="${y + 3}" width="${w - 12}" height="${h - 8}" rx="${(h - 8) / 2}" fill="#EE6A55"/>`;
      for (let k = 0; k < 3; k++) s += `<ellipse cx="${x + 14 + k * (w - 28) / 2}" cy="${y + h / 2 - 1}" rx="3.4" ry="2" fill="#F6C27A"/>`;
    }
    return s;
  },
  cebolla(h, rnd, col = '#EFE6F3', edge = '#B8A3C6') {
    let s = '';
    for (let x = X0 + 4; x < X1 - 10; x += 26 + rnd() * 14) s += `<ellipse cx="${x + 14}" cy="${h / 2 + (rnd() - .5) * 3}" rx="${18 + rnd() * 6}" ry="${h / 2 - 1}" fill="none" stroke="${edge}" stroke-width="4.4"/><ellipse cx="${x + 14}" cy="${h / 2}" rx="${18 + rnd() * 4}" ry="${h / 2 - 1}" fill="none" stroke="${col}" stroke-width="2.4"/>`;
    return s;
  },
  cebmorada(h, rnd) { return DRAW.cebolla(h, rnd, '#C27AB4', '#6E2C62'); },
  pimientos(h, rnd) {
    let s = '';
    for (let x = X0; x < X1 - 30; x += 30 + rnd() * 16) {
      const c = rnd() > .5 ? ['#3E9B4F', '#2A6E37'] : ['#D8432F', '#9C2A1E'];
      s += `<rect x="${x}" y="${1 + rnd() * (h - 8)}" width="${44 + rnd() * 20}" height="7" rx="3.5" fill="${c[0]}" stroke="${c[1]}" stroke-width="1" transform="rotate(${(rnd() - .5) * 10} ${x + 20} ${h / 2})"/>`;
    }
    return s;
  },
  maiz(h, rnd) {
    let s = '';
    for (let k = 0; k < 64; k++) s += `<circle cx="${X0 + 6 + rnd() * (L - 12)}" cy="${3 + rnd() * (h - 6)}" r="${3 + rnd() * 1.4}" fill="#F2C232" stroke="#C7951A" stroke-width=".9"/>`;
    return s;
  },
  aceitunas(h, rnd) {
    let s = '';
    for (let x = X0 + 8; x < X1 - 6; x += 22 + rnd() * 18) {
      const c = rnd() > .45 ? '#2E2B20' : '#6E7B2E', y = h / 2 + (rnd() - .5) * 4;
      s += `<circle cx="${x}" cy="${y}" r="${h / 2 - .5}" fill="${c}" stroke="#14130E" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${h / 5}" fill="${c === '#2E2B20' ? '#5B4A3A' : '#B8392A'}"/>`;
    }
    return s;
  },
  ensalada(h, rnd) {
    let s = DRAW.wavy(h, 6, 24, rnd, '#7DBA5C', '#4C8536');
    for (let x = X0 + 12; x < X1 - 20; x += 40 + rnd() * 30) s += `<rect x="${x}" y="${h * .25 + rnd() * h * .3}" width="${16 + rnd() * 10}" height="${h * .32}" rx="3" fill="#D9483B" stroke="#9E2A22" stroke-width="1"/>`;
    for (let x = X0 + 30; x < X1 - 20; x += 46 + rnd() * 30) s += `<path d="M${x} ${h * .4} q 9 -6 18 0" stroke="#EFE6F3" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    return s;
  },
  pollo(h, rnd) {
    let s = '';
    for (let row = 0; row < 2; row++) for (let x = X0 - 2 + row * 22; x < X1 - 30; x += 44 + rnd() * 10) {
      const w = 46 + rnd() * 12, y = row ? h * .38 : 1, hh = h * .62;
      const pts = [[0, hh * .2], [w * .3, 0], [w * .8, hh * .08], [w, hh * .5], [w * .78, hh], [w * .2, hh * .94]].map(([a, b]) => `${(x + a + (rnd() - .5) * 4).toFixed(1)},${(y + b + (rnd() - .5) * 3).toFixed(1)}`).join(' ');
      s += `<polygon points="${pts}" fill="${row ? '#C98A43' : '#D69A4E'}" stroke="#93602A" stroke-width="1.3" stroke-linejoin="round"/>`;
      s += `<path d="M${x + w * .3} ${y + hh * .3} l ${w * .3} ${hh * .3} M${x + w * .5} ${y + hh * .2} l ${w * .3} ${hh * .3}" stroke="#7A4A1E" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>`;
    }
    return s;
  },
  ternera(h, rnd) {
    let s = '';
    for (let k = 0; k < 3; k++) {
      let d = `M${X0 - 2} ${4 + k * h * .26}`;
      for (let x = X0 + 20; x <= X1 + 4; x += 30) d += ` Q ${x - 15} ${k * h * .26 + (rnd() - .2) * 10} ${x} ${4 + k * h * .26 + (rnd() - .5) * 4}`;
      d += ` L ${X1 + 4} ${k * h * .26 + h * .42} L ${X0 - 2} ${k * h * .26 + h * .42} Z`;
      s += `<path d="${d}" fill="${['#7A3F2A', '#8E4C33', '#6A3422'][k]}" stroke="#4A2416" stroke-width="1.2"/>`;
    }
    return s;
  },
  kefta(h, rnd) {
    let s = '';
    for (let x = X0 - 4; x < X1 - 50; x += 76 + rnd() * 8) {
      const w = 82, y = rnd() * 3;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h - 3}" rx="${(h - 3) / 2}" fill="#6E3A26" stroke="#3E1E12" stroke-width="1.4"/>`;
      s += `<path d="M${x + 12} ${y + 6} q ${w / 2 - 12} -4 ${w - 24} 0" stroke="#9A5A3C" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
      for (let k = 0; k < 9; k++) s += `<circle cx="${x + 8 + rnd() * (w - 16)}" cy="${y + 6 + rnd() * (h - 14)}" r="1.4" fill="${rnd() > .5 ? '#6FA04A' : '#2A1309'}"/>`;
    }
    return s;
  },
  salchicha(h, rnd) {
    let s = '';
    const segs = [[X0 - 6, 210], [X0 + 200, 236]];
    segs.forEach(([x, w], i) => {
      s += `<rect x="${x}" y="${i * 3}" width="${w}" height="${h - 3}" rx="${(h - 3) / 2}" fill="#B5543F" stroke="#6E2A1E" stroke-width="1.4"/>`;
      s += `<rect x="${x + 10}" y="${i * 3 + 4}" width="${w - 20}" height="4" rx="2" fill="#D9806A" opacity=".8"/>`;
      for (let k = x + 26; k < x + w - 20; k += 30) s += `<path d="M${k} ${i * 3 + h * .3} l 10 ${h * .4}" stroke="#7E3426" stroke-width="2.4" stroke-linecap="round"/>`;
    });
    return s;
  },
  gambas(h, rnd) {
    let s = '';
    for (let x = X0 + 4; x < X1 - 30; x += 52 + rnd() * 10) {
      const r = h * .42, cx = x + r + 6, cy = h * .52 + (rnd() - .5) * 3;
      s += `<path d="M${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r * .2} ${cy + r * .96}" fill="none" stroke="#C9542E" stroke-width="${h * .42 + 2}" stroke-linecap="round"/>`;
      s += `<path d="M${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r * .2} ${cy + r * .96}" fill="none" stroke="#F08A5D" stroke-width="${h * .42 - 1}" stroke-linecap="round"/>`;
      for (let k = 0; k < 4; k++) { const a = Math.PI + k * .75; s += `<path d="M${cx + Math.cos(a) * (r - h * .2)} ${cy + Math.sin(a) * (r - h * .2)} L ${cx + Math.cos(a) * (r + h * .2)} ${cy + Math.sin(a) * (r + h * .2)}" stroke="#FBD3B8" stroke-width="1.6"/>`; }
    }
    return s;
  },
  calamar(h, rnd) {
    let s = '';
    for (let x = X0 + 4; x < X1 - 10; x += 30 + rnd() * 10) s += `<ellipse cx="${x + 14}" cy="${h / 2}" rx="${15 + rnd() * 3}" ry="${h / 2 - 3}" fill="none" stroke="#C9A36A" stroke-width="7.5"/><ellipse cx="${x + 14}" cy="${h / 2}" rx="${15 + rnd() * 2}" ry="${h / 2 - 3}" fill="none" stroke="#F1E4C8" stroke-width="5"/>`;
    return s;
  },
  sepia(h, rnd) {
    let s = '';
    for (let x = X0 - 4; x < X1 - 40; x += 64 + rnd() * 10) {
      const w = 74, y = rnd() * 3;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h - 3}" rx="6" fill="#EFE2C4" stroke="#B89A66" stroke-width="1.3"/>`;
      for (let k = 0; k < 3; k++) s += `<path d="M${x + 14 + k * 20} ${y + 3} l 10 ${h - 9}" stroke="#7A5A2E" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>`;
    }
    return s;
  },
  higado(h, rnd) {
    let s = '';
    for (let x = X0 - 4; x < X1 - 40; x += 58 + rnd() * 14) {
      const w = 70 + rnd() * 10, y = rnd() * 3;
      s += `<path d="M${x} ${y + h * .4} Q ${x + w * .2} ${y} ${x + w * .55} ${y + 2} T ${x + w} ${y + h * .5} Q ${x + w * .6} ${y + h - 2} ${x + w * .2} ${y + h - 3} Z" fill="#5A2320" stroke="#2E0F0D" stroke-width="1.3"/>`;
      s += `<path d="M${x + 12} ${y + h * .35} q ${w * .3} -6 ${w * .5} -2" stroke="#9A4A40" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    }
    return s;
  },
  salsa(h, rnd) {
    let d = `M${X0 + 4} ${h * .3}`;
    for (let x = X0 + 24; x <= X1 - 4; x += 20) d += ` Q ${x - 10} ${h * (.0 + rnd() * .3)} ${x} ${h * .3}`;
    d += ` L ${X1 - 4} ${h * .75}`;
    for (let x = X1 - 24; x >= X0 + 4; x -= 20) d += ` Q ${x + 10} ${h * (1 + rnd() * .2)} ${x} ${h * .75}`;
    let s = `<path d="${d} Z" fill="#F2B36B" stroke="#C47A33" stroke-width="1.2"/>`;
    s += `<path d="M${X0 + 30} ${h * .42} L ${X1 - 60} ${h * .42}" stroke="#FFE0B0" stroke-width="2" stroke-linecap="round" stroke-dasharray="40 26"/>`;
    s += `<path d="M${X0 + 8} ${h * .7} q 3 10 0 16 q -4 -6 0 -16 M${X1 - 14} ${h * .7} q 3 12 0 20 q -4 -8 0 -20" fill="#F2B36B" stroke="#C47A33" stroke-width="1"/>`;
    return s;
  },
  huevo(h, rnd) {
    let s = '';
    for (let x = X0 + 6; x < X1 - 30; x += 50 + rnd() * 10) s += `<ellipse cx="${x + 24}" cy="${h / 2}" rx="25" ry="${h / 2 - .5}" fill="#FFF8E6" stroke="#CBBE9C" stroke-width="1.2"/><ellipse cx="${x + 24}" cy="${h / 2 + 1}" rx="11" ry="${h / 2 - 4}" fill="#F5B92E" stroke="#D4921A" stroke-width="1"/>`;
    return s;
  },
  remolacha(h, rnd) {
    let s = '';
    for (let k = 0; k < 30; k++) { const x = X0 + 6 + rnd() * (L - 20), y = 1 + rnd() * (h - 10), w = 8 + rnd() * 4; s += `<rect x="${x}" y="${y}" width="${w}" height="${w}" rx="1.6" fill="#8C1D4A" stroke="#55102C" stroke-width="1" transform="rotate(${rnd() * 40 - 20} ${x + w / 2} ${y + w / 2})"/>`; }
    return s;
  },
  zanahoria(h, rnd) {
    let s = '';
    for (let k = 0; k < 70; k++) { const x = X0 + 4 + rnd() * (L - 30), y = 2 + rnd() * (h - 4); s += `<path d="M${x} ${y} l ${18 + rnd() * 12} ${(rnd() - .5) * 6}" stroke="${rnd() > .5 ? '#EE8A2E' : '#D8701A'}" stroke-width="2.4" stroke-linecap="round"/>`; }
    return s;
  },
  panBase(h) {
    return `<path d="M${X0 + 12} 0 L ${X1 - 12} 0 Q ${X1 + 6} 0 ${X1 + 2} 14 Q ${X1 - 10} ${h} ${X1 - 70} ${h} L ${X0 + 70} ${h} Q ${X0 + 10} ${h} ${X0 - 2} 14 Q ${X0 - 6} 0 ${X0 + 12} 0 Z" fill="url(#crust)" stroke="#7E4A1C" stroke-width="1.5"/>
      <path d="M${X0 + 6} 3 L ${X1 - 6} 3 Q ${X1} 3 ${X1 - 2} 9 L ${X0 + 2} 9 Q ${X0} 3 ${X0 + 6} 3 Z" fill="#F4E2B8"/>`;
  },
  panTop(h) {
    let s = `<path d="M${X0 - 4} ${h - 2} Q ${X0 - 12} ${h * .45} ${X0 + 40} ${h * .2} Q ${X0 + L / 2} ${-h * .18} ${X1 - 40} ${h * .2} Q ${X1 + 12} ${h * .45} ${X1 + 4} ${h - 2} Z" fill="url(#crust)" stroke="#7E4A1C" stroke-width="1.5"/>`;
    s += `<path d="M${X0 + 2} ${h - 8} L ${X1 - 2} ${h - 8} L ${X1 + 2} ${h - 2} L ${X0 - 2} ${h - 2} Z" fill="#F4E2B8"/>`;
    for (let k = 0; k < 5; k++) { const x = X0 + 64 + k * 76; s += `<path d="M${x} ${h * .42} Q ${x + 30} ${h * .05} ${x + 58} ${h * .2} Q ${x + 30} ${h * .3} ${x} ${h * .42} Z" fill="#EDC27A" stroke="#B87A35" stroke-width="1"/>`; }
    return s;
  }
};

(() => {
  const svg = $('#anatSvg'), list = $('#anatList'), extrasBox = $('#anatExtras'), toggle = $('#anatToggle');
  const NS = 'http://www.w3.org/2000/svg';
  svg.innerHTML = `<defs><linearGradient id="crust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9A35B"/><stop offset=".6" stop-color="#C08240"/><stop offset="1" stop-color="#9E6630"/></linearGradient>
    <radialGradient id="plate" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#C9A15B" stop-opacity=".18"/><stop offset="1" stop-color="#C9A15B" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="255" cy="528" rx="250" ry="18" fill="url(#plate)"/><g id="anatLayers"></g>`;
  const root = $('#anatLayers', svg);
  let cur = -1, extras = new Set(), E = { v: motion ? 0 : 1 }, exploded = true, groups = [];

  const paintList = () => {
    list.innerHTML = BOC.map((b, i) => `${b.board && !BOC[i - 1].board ? `<li class="sep">${T('board')}</li>` : ''}<li><button type="button" data-i="${i}" aria-current="${i === cur}"><svg viewBox="0 0 100 100"><use href="#star8"/></svg><span>${loc(b.n)}</span><small dir="ltr">${A40.eur0(b.p)}</small></button></li>`).join('');
    extrasBox.innerHTML = EXTRAS.map((k) => `<button class="chip" type="button" data-x="${k}" aria-pressed="${extras.has(k)}">+ ${loc(ING[k].n).toLowerCase()}</button>`).join('');
  };

  const layersOf = (b) => {
    const fill = b.ings.filter((k) => k !== 'salsa');
    EXTRAS.forEach((k) => { if (extras.has(k) && !fill.includes(k)) fill.push(k); });
    return ['pan:b', ...fill, ...(b.ings.includes('salsa') ? ['salsa'] : []), 'pan:t'];
  };
  const heightOf = (k) => k === 'pan:b' ? 50 : k === 'pan:t' ? 86 : Math.round(HA[k] * 1.2);

  const layout = () => {
    const e = E.v, keys = groups.map((g) => g.k);
    const n = keys.length;
    const closed = keys.reduce((a, k, i) => a + heightOf(k) * (i === 0 || i === n - 1 ? 1 : .62), 0);
    const gap = clamp((480 - closed) / (n - 1), 12, 54) * e;
    let y = 500;
    const pos = [];
    keys.forEach((k, i) => {
      const h = heightOf(k);
      const top = y - h;
      pos.push(top);
      y = top + (i === 0 || i === n - 1 ? 0 : h * .38) - gap;
      if (i === 0) y = top + 4 - gap;
    });
    const minTop = pos[n - 1], total = 500 - minTop;
    const shift = (540 - total) / 2 - minTop - 6;
    groups.forEach((g, i) => {
      const h = heightOf(g.k), yy = pos[i] + shift;
      g.el.setAttribute('transform', `translate(0 ${yy.toFixed(2)})`);
      if (g.lab) {
        const cy = h / 2;
        g.lab.setAttribute('opacity', clamp(e * 1.6 - .4, 0, 1).toFixed(3));
        g.lab.setAttribute('transform', `translate(0 ${cy.toFixed(2)})`);
      }
    });
  };

  let compact = false;
  const buildLayer = (k, i) => {
    const g = document.createElementNS(NS, 'g');
    const sc = document.createElementNS(NS, 'g');
    const inner = document.createElementNS(NS, 'g');
    const h = heightOf(k), rnd = seeded(i * 97 + k.length * 13 + 7);
    inner.innerHTML = k === 'pan:b' ? DRAW.panBase(h) : k === 'pan:t' ? DRAW.panTop(h) : (DRAW[k] || DRAW.lechuga)(h, rnd);
    if (compact) sc.setAttribute('transform', `translate(${X0} 0) scale(.72 1) translate(${-X0} 0)`);
    sc.appendChild(inner); g.appendChild(sc);
    let lab = null;
    const ing = k.startsWith('pan') ? (k === 'pan:t' ? ING.pan : null) : ING[k];
    if (ing) {
      const xe = compact ? X0 + L * .72 : X1, lx = xe + 36;
      const name = loc(compact || k === 'gambas' ? (ing.s || ing.n) : ing.n);
      lab = document.createElementNS(NS, 'g');
      lab.innerHTML = `<path class="ly-lead" d="M${xe + 10} 0 H ${lx - 4}"/><rect class="ly-tick" x="${lx - 7}" y="-3" width="6" height="6" transform="rotate(45 ${lx - 4} 0)"/>
        <text x="${lx + 10}" y="${compact ? 9 : 5}"><tspan class="ly-label">${name}</tspan>${ing.ar && !compact && !A40.rtl ? `<tspan class="ly-sub" dx="9">${ing.ar}</tspan>` : ''}</text>`;
      g.appendChild(lab);
    }
    root.appendChild(g);
    return { k, el: g, inner, lab };
  };

  const paintCard = (b) => {
    $('#anatNo').textContent = String(BOC.indexOf(b) + 1).padStart(2, '0') + (b.board ? ' · ' + T('pizarra') : '');
    $('#anatName').textContent = loc(b.n);
    $('#anatAr').textContent = A40.rtl ? '' : b.ar || '';
    $('#anatPrice').textContent = A40.eur(b.p);
    $('#anatDesc').textContent = loc(b.d);
    const ks = layersOf(b).filter((k) => k !== 'pan:b').map((k) => (k === 'pan:t' ? 'pan' : k));
    ks.unshift(ks.pop());
    $('#anatIngs').innerHTML = ks.map((k) => { const g = ING[k]; return `<li style="--c:${g.c}"><span><b>${loc(g.n)}</b>${g.ar && !A40.rtl ? `<span class="ar" lang="ar">${g.ar}</span>` : ''}<br>${loc(g.note)}</span></li>`; }).join('');
    $('#anatNote').textContent = loc(b.tip);
  };

  const render = (animate) => {
    const b = BOC[cur];
    const old = groups;
    groups = layersOf(b).map(buildLayer);
    layout();
    if (motion && animate) {
      old.forEach((g, i) => gsap.to(g.inner, { y: -30, opacity: 0, duration: .35, delay: i * .02, onComplete: () => g.el.remove() }));
      old.forEach((g) => g.lab && gsap.to(g.lab, { opacity: 0, duration: .2 }));
      groups.forEach((g, i) => gsap.from(g.inner, { y: -60, opacity: 0, duration: .6, ease: 'back.out(1.6)', delay: .25 + i * .06 }));
    } else old.forEach((g) => g.el.remove());
    paintCard(b);
  };

  const select = (i, animate = true) => {
    if (i === cur) return;
    cur = i;
    $$('button', list).forEach((bt) => bt.setAttribute('aria-current', +bt.dataset.i === i));
    render(animate);
  };
  list.addEventListener('click', (e) => { const bt = e.target.closest('button'); if (bt) select(+bt.dataset.i); });
  extrasBox.addEventListener('click', (e) => {
    const bt = e.target.closest('button'); if (!bt) return;
    const k = bt.dataset.x;
    extras.has(k) ? extras.delete(k) : extras.add(k);
    bt.setAttribute('aria-pressed', extras.has(k));
    render(true);
  });
  const setExploded = (v, dur = 1.1) => {
    exploded = v;
    toggle.textContent = T(v ? 'anat.on' : 'anat.off');
    toggle.setAttribute('aria-pressed', v);
    if (motion) gsap.to(E, { v: v ? 1 : 0, duration: dur, ease: 'power3.inOut', onUpdate: layout });
    else { E.v = v ? 1 : 0; layout(); }
  };
  toggle.addEventListener('click', () => setExploded(!exploded));
  const checkCompact = () => {
    const c = svg.getBoundingClientRect().width < 560;
    svg.classList.toggle('is-compact', c);
    svg.setAttribute('viewBox', c ? '20 30 610 500' : '0 0 700 560');
    if (c !== compact) { compact = c; if (cur >= 0) render(false); }
  };
  checkCompact();
  window.addEventListener('resize', checkCompact);
  paintList();
  select(Math.max(0, BOC.findIndex((b) => b.id === 'mixto')), false);
  A40.on(() => { paintList(); toggle.textContent = T(exploded ? 'anat.on' : 'anat.off'); render(false); });
  if (motion) {
    E.v = 0; layout();
    ScrollTrigger.create({ trigger: '.anat__stage', start: 'top 65%', once: true, onEnter: () => setExploded(true, 1.6) });
  } else setExploded(true);
})();

/* ----------------------------------------------------------
   LA CARTA · siete tajines
   ---------------------------------------------------------- */
(() => {
  const box = $('#tajines');
  const tajSVG = (m, i) => {
    const [a, b, c, d] = GLAZE[m.id];
    const id = 'lc' + i;
    return `<svg viewBox="0 0 160 200" aria-hidden="true">
      <defs><clipPath id="${id}"><path d="M14 158 Q 30 154 44 124 L 70 50 Q 80 34 90 50 L 116 124 Q 130 154 146 158 Z"/></clipPath>
      <radialGradient id="gl${i}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE6A8" stop-opacity=".9"/><stop offset="1" stop-color="#FFE6A8" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="80" cy="182" rx="76" ry="12" fill="#000" opacity=".25"/>
      <path d="M6 160 Q 80 204 154 160 Z" fill="${a}" stroke="#0B231C" stroke-width="2"/>
      <path d="M14 166 Q 80 196 146 166" fill="none" stroke="${b}" stroke-width="3" stroke-dasharray="6 5"/>
      <ellipse cx="80" cy="160" rx="74" ry="12" fill="${d}" stroke="#0B231C" stroke-width="2"/>
      <g class="inner"><ellipse cx="80" cy="158" rx="54" ry="8" fill="url(#gl${i})"/><text x="80" y="160" text-anchor="middle" font-family="Aref Ruqaa, serif" font-size="17" fill="#7A4A1E">${m.ar}</text></g>
      <g class="steam"><path d="M64 140 q -8 -14 0 -26 q 8 -12 0 -26" style="--d:0s"/><path d="M80 136 q -8 -14 0 -26 q 8 -12 0 -26" style="--d:.5s"/><path d="M96 140 q -8 -14 0 -26 q 8 -12 0 -26" style="--d:1s"/></g>
      <g class="lid">
        <path d="M14 158 Q 30 154 44 124 L 70 50 Q 80 34 90 50 L 116 124 Q 130 154 146 158 Z" fill="${a}"/>
        <g clip-path="url(#${id})">
          <rect x="0" y="132" width="160" height="10" fill="${b}"/>
          <path d="M0 142 ${Array.from({ length: 17 }, (_, k) => `L ${k * 10 + 5} 154 L ${k * 10 + 10} 142`).join(' ')} V 160 H 0 Z" fill="${c}"/>
          <rect x="0" y="98" width="160" height="5" fill="${d}"/>
          <rect x="0" y="108" width="160" height="14" fill="${c}"/>
          ${Array.from({ length: 9 }, (_, k) => `<path d="M${k * 20 + 2} 115 l 6 -6 6 6 -6 6 z" fill="${b}"/>`).join('')}
          <rect x="0" y="74" width="160" height="4" fill="${b}"/>
          ${Array.from({ length: 8 }, (_, k) => `<circle cx="${k * 22 + 4}" cy="88" r="3" fill="${d}"/>`).join('')}
          <path d="M60 54 Q 80 44 100 54 L 104 64 Q 80 56 56 64 Z" fill="${b}"/>
          <path d="M40 130 Q 60 60 80 40" stroke="#fff" stroke-opacity=".22" stroke-width="5" fill="none" stroke-linecap="round"/>
        </g>
        <path d="M14 158 Q 30 154 44 124 L 70 50 Q 80 34 90 50 L 116 124 Q 130 154 146 158 Z" fill="none" stroke="#0B231C" stroke-width="2.2"/>
        <rect x="74" y="28" width="12" height="12" rx="2" fill="${b}" stroke="#0B231C" stroke-width="2"/>
        <circle cx="80" cy="22" r="9" fill="${a}" stroke="#0B231C" stroke-width="2.2"/>
        <circle cx="77" cy="19" r="2.6" fill="#fff" opacity=".45"/>
      </g>
    </svg>`;
  };
  box.innerHTML = MENU.map((m, i) => `<button class="taj" type="button" role="tab" id="taj-${m.id}" aria-controls="dish" aria-selected="false" data-i="${i}">${tajSVG(m, i)}<span class="taj__n"></span></button>`).join('');
  const names = () => $$('.taj__n', box).forEach((el, i) => { el.innerHTML = loc(MENU[i].n) + (A40.rtl ? '' : `<small lang="ar">${MENU[i].ar}</small>`); });
  let cur = -1;
  const show = (i, force) => {
    if (i === cur && !force) return;
    cur = i;
    const m = MENU[i];
    $$('.taj', box).forEach((t) => t.setAttribute('aria-selected', +t.dataset.i === i));
    $('#dish').setAttribute('aria-labelledby', 'taj-' + m.id);
    $('#dishAr').textContent = A40.rtl ? '' : m.ar;
    $('#dishT').textContent = loc(m.n);
    $('#dishSub').textContent = loc(m.sub);
    $('#dishList').innerHTML = m.items.map((it) => `<li><b>${loc(it.n)}${it.nuevo ? `<span class="tag tag--new">${T('nuevo')}</span>` : ''}${it.board ? `<span class="tag tag--board">${T('pizarra')}</span>` : ''}</b><span class="pr">${A40.eur(it.p)}</span>${it.d ? `<p>${loc(it.d)}</p>` : ''}</li>`).join('');
    if (motion) {
      gsap.fromTo('#dish .dish__head > *', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .05 });
      gsap.fromTo('#dishList li', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .045, delay: .1 });
    }
  };
  box.addEventListener('click', (e) => { const t = e.target.closest('.taj'); if (t) show(+t.dataset.i); });
  box.addEventListener('keydown', (e) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + MENU.length) % MENU.length;
    show(n); $$('.taj', box)[n].focus();
  });
  names(); show(0);
  A40.on(() => { names(); show(cur, true); });
  if (motion) gsap.from('.taj', { y: 40, opacity: 0, duration: .9, ease: 'power3.out', stagger: .07, scrollTrigger: { trigger: box, start: 'top 85%' } });
  $('#openCarta').addEventListener('click', () => openLB(IMG('carta-impresa.jpg'), T('menu.printCap')));
})();

/* ----------------------------------------------------------
   GALERÍA · carrusel arrastrable
   ---------------------------------------------------------- */
(() => {
  const vp = $('#galVp'), track = $('#galTrack');
  track.innerHTML = GAL.map(([f, t, d, w, pos], i) => `<li class="gal__slide${w ? ' is-wide' : ''}" data-i="${i}"><div class="gal__frame"${w ? ' style="aspect-ratio:16/11"' : ''}><span class="gal__no"><svg viewBox="0 0 100 100"><use href="#star8"/></svg><span>${String(i + 1).padStart(2, '0')}</span></span><img src="${IMG(f)}" alt="" loading="lazy" draggable="false"${pos ? ` style="object-position:${pos}"` : ''}></div><p class="gal__cap"></p></li>`).join('');
  $$('.is-wide', track).forEach((s) => { s.style.width = 'clamp(320px, 52vw, 820px)'; });
  const slides = $$('.gal__slide', track);
  const caps = () => slides.forEach((s, i) => { const [, t, d] = GAL[i]; $('.gal__cap', s).innerHTML = `<b>${loc(t)}</b>${loc(d)}`; $('img', s).alt = `${loc(t)}: ${loc(d)}${T('seo.alt')}`; });
  caps(); A40.on(caps);
  $('#galAll').textContent = String(slides.length).padStart(2, '0');
  let x = 0, tx = 0, idx = 0, drag = null, moved = 0, raf = 0, auto = 0, inView = false;
  const target = (i) => { const s = slides[i]; return clamp(s.offsetLeft + s.offsetWidth / 2 - vp.clientWidth / 2, 0, track.scrollWidth - vp.clientWidth); };
  const setIdx = (i) => {
    idx = clamp(i, 0, slides.length - 1);
    slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
    $('#galNow').textContent = String(idx + 1).padStart(2, '0');
  };
  const go = (i) => { setIdx(i); tx = target(idx); kick(); };
  const nearest = (pos) => { let best = 0, bd = Infinity; slides.forEach((s, k) => { const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - vp.clientWidth / 2 - pos); if (d < bd) { bd = d; best = k; } }); return best; };
  const tick = () => {
    x = lerp(x, tx, motion ? .12 : 1);
    track.style.transform = `translate3d(${-x.toFixed(2)}px,0,0)`;
    raf = Math.abs(x - tx) > .3 || drag ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  vp.addEventListener('pointerdown', (e) => {
    drag = { sx: e.clientX, st: tx, t: performance.now(), lx: e.clientX, v: 0 }; moved = 0;
    vp.setPointerCapture(e.pointerId); vp.classList.add('is-drag'); kick();
  });
  vp.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.sx; moved = Math.max(moved, Math.abs(dx));
    const now = performance.now(); drag.v = (e.clientX - drag.lx) / Math.max(1, now - drag.t); drag.lx = e.clientX; drag.t = now;
    tx = clamp(drag.st - dx, -80, track.scrollWidth - vp.clientWidth + 80);
  });
  const end = () => {
    if (!drag) return;
    vp.classList.remove('is-drag');
    const proj = tx - drag.v * 260;
    drag = null;
    if (moved > 6) go(nearest(proj));
    kick();
  };
  vp.addEventListener('pointerup', end); vp.addEventListener('pointercancel', end);
  track.addEventListener('click', (e) => {
    const s = e.target.closest('.gal__slide'); if (!s || moved > 6) return;
    const i = +s.dataset.i;
    if (i !== idx) go(i); else openLB(IMG(GAL[i][0]), loc(GAL[i][1]) + ' · ' + loc(GAL[i][2]));
  });
  $('#galPrev').addEventListener('click', () => go(idx - 1));
  $('#galNext').addEventListener('click', () => go(idx + 1));
  vp.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') go(idx + 1); if (e.key === 'ArrowLeft') go(idx - 1); });
  vp.tabIndex = 0;
  new IntersectionObserver(([en]) => { inView = en.isIntersecting; }).observe(vp);
  if (motion) auto = setInterval(() => { if (inView && !drag && !vp.matches(':hover')) go(idx + 1 >= slides.length ? 0 : idx + 1); }, 5200);
  window.addEventListener('resize', () => { tx = target(idx); x = tx; track.style.transform = `translate3d(${-x}px,0,0)`; });
  setIdx(0); tx = x = target(0); tick();
})();

/* ----------------------------------------------------------
   UN PASEO · las fotos del local, de la puerta al mostrador
   ---------------------------------------------------------- */
(() => {
  const ol = $('#walk'), W = A40.SITE.walk;
  ol.innerHTML = W.map(([f], i) => `<li><button type="button" data-i="${i}"><span class="walk__ph"><img src="${IMG(f)}" alt="" loading="lazy"></span><span class="walk__no"><svg viewBox="0 0 100 100"><use href="#star8"/></svg><span>${String(i + 1).padStart(2, '0')}</span></span></button><p class="walk__cap"></p></li>`).join('');
  const caps = () => $$('li', ol).forEach((li, i) => { const [, t, d] = W[i]; $('.walk__cap', li).innerHTML = `<b>${loc(t)}</b>${loc(d)}`; $('img', li).alt = `${loc(t)}: ${loc(d)}${T('seo.alt')}`; });
  caps(); A40.on(caps);
  ol.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; const [f, t, d] = W[+b.dataset.i]; openLB(IMG(f), loc(t) + ' · ' + loc(d)); });
  if (motion) gsap.from('.walk li', { y: 60, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: ol, start: 'top 82%' } });
})();

/* ----------------------------------------------------------
   PORTADA · el vídeo del local
   ---------------------------------------------------------- */
(() => {
  const v = $('#heroVid');
  if (!v || STATIC) return;
  v.muted = true;
  const go = () => { const p = v.play(); if (p) p.catch(() => {}); };
  new IntersectionObserver(([en]) => { if (en.isIntersecting && motion) go(); else v.pause(); }, { threshold: .2 }).observe(v);
})();

/* ----------------------------------------------------------
   RESEÑAS
   ---------------------------------------------------------- */
(() => {
  const qs = $$('#revs blockquote'), dots = $('#revDots');
  dots.innerHTML = qs.map((_, i) => `<button type="button" aria-label="Reseña ${i + 1}" aria-current="${i === 0}"></button>`).join('');
  let i = 0;
  const show = (n) => { i = n; qs.forEach((q, k) => q.classList.toggle('is-on', k === i)); $$('button', dots).forEach((d, k) => d.setAttribute('aria-current', k === i)); };
  dots.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show($$('button', dots).indexOf(b)); });
  if (motion) setInterval(() => show((i + 1) % qs.length), 6500);
})();

/* ----------------------------------------------------------
   LIGHTBOX
   ---------------------------------------------------------- */
function openLB(src, cap) {
  const lb = $('#lb');
  $('#lbImg').src = src; $('#lbImg').alt = cap; $('#lbCap').textContent = cap;
  lb.hidden = false; if (lenis) lenis.stop();
  $('.lb__close', lb).focus();
}
const closeLB = () => { $('#lb').hidden = true; if (lenis) lenis.start(); };
$('#lb').addEventListener('click', (e) => { if (e.target.id === 'lb' || e.target.closest('.lb__close')) closeLB(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#lb').hidden) closeLB(); });

A40.start();
if (hasGSAP) addEventListener('load', () => ScrollTrigger.refresh());
})();
