/* ─────────────────────────────────────────────
   SceneView — Main JS
   Nav, scroll reveals, mobile menu
   ───────────────────────────────────────────── */

// ── Scroll reveal ───────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const siblings = Array.from(e.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(e.target);
        e.target.style.transitionDelay = `${idx * 0.07}s`;
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
})();


// ── Mobile nav toggle ───────────────────────────
(function initMobileNav() {
  const btn     = document.querySelector('.nav__menu-btn');
  const mobileNav = document.querySelector('.nav__mobile');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.innerHTML = isOpen ? svgClose() : svgMenu();
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      btn.innerHTML = svgMenu();
    });
  });
})();


// ── Active nav link ─────────────────────────────
(function markActiveNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const clean = href.replace(/\/$/, '');
    if (path.endsWith(clean) || (clean === '/index.html' && (path === '' || path === '/'))) {
      a.classList.add('active');
    }
  });
})();


// ── SVG helpers ─────────────────────────────────
function svgMenu() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;
}
function svgClose() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`;
}
