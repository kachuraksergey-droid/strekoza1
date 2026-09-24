import '@fontsource/onest/cyrillic-300.css';
import '@fontsource/onest/latin-300.css';
import '@fontsource/onest/cyrillic-400.css';
import '@fontsource/onest/latin-400.css';
import '@fontsource/onest/cyrillic-500.css';
import '@fontsource/onest/latin-500.css';
import '@fontsource/ibm-plex-mono/cyrillic-400.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/cyrillic-500.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '../styles/main.css';
import '../styles/pages.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Мобільне меню ---------- */
const burger = document.querySelector('.burger');
if (burger) {
  const toggle = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => toggle(!document.body.classList.contains('menu-open')));
  document.querySelectorAll('.mmenu a').forEach((a) => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
}

/* ---------- Напрямки: акордеон на десктопі (наведення / фокус) ---------- */
document.querySelectorAll('[data-acc]').forEach((row) => {
  const items = [...row.querySelectorAll('.acc')];
  const open = (el) => items.forEach((it) => it.classList.toggle('is-open', it === el));
  items.forEach((it) => {
    it.addEventListener('mouseenter', () => open(it));
    it.addEventListener('focus', () => open(it));
  });
});

/* ---------- Відгуки ---------- */
document.querySelectorAll('[data-reviews]').forEach((box) => {
  const els = [...box.querySelectorAll('[data-slide]')];
  const total = new Set(els.map((e) => e.dataset.slide)).size;
  const nums = box.querySelectorAll('[data-rev-num]');
  let i = 0;
  const show = (n) => {
    i = (n + total) % total;
    const cur = els.filter((e) => Number(e.dataset.slide) === i);
    els.forEach((e) => { e.hidden = Number(e.dataset.slide) !== i; });
    nums.forEach((el) => { el.textContent = String(i + 1).padStart(2, '0'); });
    if (!reduce) gsap.fromTo(cur, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05 });
  };
  box.querySelectorAll('[data-prev]').forEach((b) => b.addEventListener('click', () => show(i - 1)));
  box.querySelectorAll('[data-next]').forEach((b) => b.addEventListener('click', () => show(i + 1)));
});

/* ---------- Команда: фільтр за напрямком ---------- */
document.querySelectorAll('[data-filter]').forEach((wrap) => {
  const tabs = [...wrap.querySelectorAll('.tab')];
  const cards = [...document.querySelectorAll(wrap.dataset.filter + ' [data-group]')];
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const g = tab.dataset.value;
    tabs.forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
    cards.forEach((c) => { c.hidden = g !== 'Усі' && c.dataset.group !== g; });
    ScrollTrigger.refresh();
  }));
});

/* ---------- Поява блоків при скролі ---------- */
if (!reduce) {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  // мобайл: маленькі фото напрямків проявляються по черзі при скролі
  gsap.utils.toArray('.dir-row .ph').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, scale: 0.85 }, {
      opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
}
