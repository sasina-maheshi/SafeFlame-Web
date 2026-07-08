// Shared header + footer markup, injected into every page.
// Keeps nav/branding consistent without needing a build step.

const NAV_LINKS = [
  { href: 'home.html', label: 'Home', page: 'home' },
  { href: 'product.html', label: 'Product', page: 'product' },
  { href: 'how-it-works.html', label: 'How It Works', page: 'how-it-works' },
  { href: 'pricing.html', label: 'Pricing', page: 'pricing' },
  { href: 'contact.html', label: 'Contact', page: 'contact' },
];

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61590805951491',
    svg: '<path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/>',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_safeflame_',
    svg: '<path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.55.55.9 1.11 1.16 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.16 1.77 4.9 4.9 0 0 1-1.77 1.16c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43a4.9 4.9 0 0 1 1.16-1.77A4.9 4.9 0 0 1 5.46.52C6.1.27 6.83.1 7.89.05 8.94.01 9.28 0 12 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.17 1.17 0 1 1 0-2.34 1.17 1.17 0 0 1 0 2.34Z"/>',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/94786300042',
    svg: '<path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.13-1.34A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.05.8.82-2.97-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.46-6.06c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.2-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28Z"/>',
  },
  {
    name: 'TikTok',
    href: 'https://vm.tiktok.com/ZS96p8YTg5E8S-rsPwr/',
    svg: '<path d="M16.6 2h-3.2v13.2a2.9 2.9 0 1 1-2.05-2.77V9.13a6.1 6.1 0 1 0 5.25 6.04V8.3a7.9 7.9 0 0 0 4.6 1.47V6.55A4.7 4.7 0 0 1 16.6 2Z"/>',
  },
];

function logoMark(sizeClasses) {
  return `
    <span class="relative inline-flex ${sizeClasses} shrink-0">
      <img src="assets/images/logo-icon.png" alt="" class="${sizeClasses} object-contain" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <span class="hidden ${sizeClasses} items-center justify-center rounded-lg logo-fallback" style="display:none">
        <svg viewBox="0 0 24 24" class="w-3/5 h-3/5" fill="#E8593F"><path d="M12.5 2c.3 2.4-.7 3.6-2 5-1.6 1.7-2.5 3.1-2.5 5a4 4 0 0 0 8 0c0-1.2-.4-2-1-2.8-.2.9-.6 1.5-1.2 2a2 2 0 1 1-3.1-2.4c1.4-1.6 2.6-3.2 1.8-6.8Z"/></svg>
      </span>
    </span>`;
}

function buildHeader(activePage) {
  const links = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="text-base font-medium transition-colors hover:text-[#E8593F] ${
      l.page === activePage ? 'text-[#E8593F]' : 'text-[#132436]'
    }">${l.label}</a>`
  ).join('');

  const mobileLinks = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="block px-4 py-3 text-base font-medium border-b border-white/10 ${
      l.page === activePage ? 'text-[#E8593F]' : 'text-white'
    }">${l.label}</a>`
  ).join('');

  return `
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 gap-4">
        <a href="home.html" class="flex items-center gap-2" aria-label="SafeFlame home">
          ${logoMark('w-11 h-11')}
          <span class="font-bold text-xl tracking-tight"><span class="text-[#132436]">Safe</span><span class="text-[#E8593F]">Flame</span></span>
        </a>
        <nav class="hidden md:flex items-center gap-8" aria-label="Primary">
          ${links}
        </nav>
        <div class="hidden md:block">
          <a href="pricing.html" class="inline-flex items-center rounded-md bg-[#E8593F] px-5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-[#d14a32] transition-colors">Pre-Order Now</a>
        </div>
        <button id="nav-toggle" type="button" class="md:hidden inline-flex items-center justify-center rounded-md p-2.5 text-[#132436]" aria-controls="mobile-nav" aria-expanded="false" aria-label="Toggle navigation menu">
          <svg id="nav-icon-open" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg id="nav-icon-close" class="hidden h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
    <nav id="mobile-nav" class="md:hidden bg-[#132436]" aria-label="Mobile">
      ${mobileLinks}
      <div class="p-4">
        <a href="pricing.html" class="block text-center rounded-md bg-[#E8593F] px-5 py-2.5 text-base font-semibold text-white">Pre-Order Now</a>
      </div>
    </nav>
  </header>`;
}

function buildFooter() {
  const footerLinks = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="block text-sm text-gray-300 hover:text-[#E8593F] transition-colors py-1">${l.label}</a>`
  ).join('');

  const socials = SOCIAL_LINKS.map(
    (s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="SafeFlame on ${s.name}" class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#E8593F] transition-colors">
      <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current text-white">${s.svg}</svg>
    </a>`
  ).join('');

  return `
  <footer class="site-footer text-white">
    <div class="starfield" aria-hidden="true">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
    <div class="footer-content">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="home.html" class="flex items-center gap-2 mb-3" aria-label="SafeFlame home">
            <span class="relative inline-flex w-10 h-10 shrink-0">
              <img src="assets/images/logo-full.png" alt="SafeFlame - Safety That Never Sleeps" class="h-10 w-auto object-contain" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <span class="hidden w-10 h-10 items-center justify-center rounded-lg logo-fallback" style="display:none">
                <svg viewBox="0 0 24 24" class="w-3/5 h-3/5" fill="#E8593F"><path d="M12.5 2c.3 2.4-.7 3.6-2 5-1.6 1.7-2.5 3.1-2.5 5a4 4 0 0 0 8 0c0-1.2-.4-2-1-2.8-.2.9-.6 1.5-1.2 2a2 2 0 1 1-3.1-2.4c1.4-1.6 2.6-3.2 1.8-6.8Z"/></svg>
              </span>
            </span>
            <span class="font-bold text-lg"><span class="text-white">Safe</span><span class="text-[#E8593F]">Flame</span></span>
          </a>
          <p class="text-sm text-gray-300">Safety That Never Sleeps.</p>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Navigate</h3>
          ${footerLinks}
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Contact</h3>
          <a href="mailto:safeflame11@gmail.com" class="block text-sm text-gray-300 hover:text-[#E8593F] transition-colors py-1">safeflame11@gmail.com</a>
          <a href="tel:+94786300042" class="block text-sm text-gray-300 hover:text-[#E8593F] transition-colors py-1">+94 78 630 00 42</a>
          <a href="https://wa.me/94786300042" target="_blank" rel="noopener noreferrer" class="block text-sm text-gray-300 hover:text-[#E8593F] transition-colors py-1">Chat on WhatsApp</a>
          <p class="text-sm text-gray-300 py-1">Mendis Waththa,<br>Hunupitiya Road, Kelaniya</p>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Follow Us</h3>
          <div class="flex gap-3">${socials}</div>
        </div>
      </div>
      <div class="border-t border-white/10 py-6 text-center text-xs text-gray-400">
        &copy; <span id="footer-year"></span> SafeFlame. All rights reserved.
      </div>
    </div>
  </footer>`;
}

function initPartials() {
  const activePage = document.body.dataset.page || '';
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  if (headerMount) headerMount.innerHTML = buildHeader(activePage);
  if (footerMount) footerMount.innerHTML = buildFooter();

  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const iconOpen = document.getElementById('nav-icon-open');
  const iconClose = document.getElementById('nav-icon-close');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      iconOpen.classList.toggle('hidden', isOpen);
      iconClose.classList.toggle('hidden', !isOpen);
    });
  }
}

document.addEventListener('DOMContentLoaded', initPartials);
