// Scroll-reveal animations
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));
}

// How It Works — step timeline scroll reveal (separate from initReveal so it
// can trigger earlier and stagger the connecting line progress)
function initStepReveal() {
  const steps = document.querySelectorAll('.step-reveal');
  if (!steps.length) return;
  const progressLine = document.getElementById('step-line-progress');
  const total = steps.length;
  let revealedCount = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealedCount++;
          if (progressLine) {
            progressLine.style.height = (revealedCount / total) * 100 + '%';
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -20% 0px' }
  );
  steps.forEach((step) => observer.observe(step));
}

// Cards with a load-in animation (contact page, product comparison cards) —
// once the animation finishes, remove it so a later :hover transition on the
// same "transform" property isn't overridden by the animation's persisting
// end state.
function initCardSettle(selector) {
  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener('animationend', () => {
      card.classList.add('settled');
    }, { once: true });
  });
}

// Hero photo carousel (home + product) — auto-advances every 5s, slides
// right-to-left (CSS .is-active / .is-prev classes), clickable dots, and
// respects prefers-reduced-motion by pausing auto-advance.
function initHeroCarousels() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    if (slides.length < 2) return;
    const dotsWrap = carousel.querySelector('.hero-dots');
    let current = 0;
    let timer = null;

    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1) + ' of ' + slides.length);
      if (i === 0) dot.setAttribute('aria-current', 'true');
      dot.addEventListener('click', () => {
        goTo(i);
        start(); // reset the 5s clock after manual navigation
      });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(next) {
      if (next === current) return;
      const prev = current;
      current = next;

      slides[prev].classList.remove('is-active');
      slides[prev].classList.add('is-prev');
      slides[next].classList.remove('is-prev');
      slides[next].classList.add('is-active');
      // After the slide-out finishes, drop .is-prev so the slide snaps back
      // (transition: none in base state) to the off-screen right position.
      setTimeout(() => slides[prev].classList.remove('is-prev'), 850);

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        if (i === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    function start() {
      stop();
      if (reduceMotion.matches) return;
      timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
    }
    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    reduceMotion.addEventListener('change', start);
    start();
  });
}

// Full-viewport hero pages (body.hero-page): the fixed header starts
// transparent over the hero and solidifies after 50px of scroll.
function initOverlayHeader() {
  if (!document.body.classList.contains('hero-page')) return;
  const header = document.querySelector('#site-header header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// FAQ accordion
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      faqItems.forEach((other) => other.setAttribute('data-open', 'false'));
      item.setAttribute('data-open', String(!isOpen));
    });
  });
}

// Generic field validation helper
function validateField(field) {
  const wrapper = field.closest('.form-field');
  if (!wrapper) return true;
  const isValid = field.checkValidity();
  wrapper.classList.toggle('field-invalid', !isValid);
  return isValid;
}

// Contact form (client-side only, no backend)
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const successMsg = document.getElementById('contact-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });
    if (!allValid) return;

    form.reset();
    form.classList.add('hidden');
    if (successMsg) successMsg.classList.remove('hidden');
  });

  form.querySelectorAll('input, textarea, select').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });
}

// Pre-order form -> Google Forms submission via hidden iframe (no-cors, static site friendly)
function initPreorderForm() {
  const form = document.getElementById('preorder-form');
  if (!form) return;
  const successMsg = document.getElementById('preorder-success');
  const iframe = document.getElementById('preorder-target');

  form.addEventListener('submit', (e) => {
    const fields = form.querySelectorAll('input[required], select[required]');
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });
    if (!allValid) {
      e.preventDefault();
      return;
    }

    if (iframe) {
      iframe.addEventListener(
        'load',
        () => {
          form.reset();
          form.classList.add('hidden');
          if (successMsg) successMsg.classList.remove('hidden');
        },
        { once: true }
      );
    }
    // Let the form submit naturally to the hidden iframe target (set via form target attribute).
  });

  form.querySelectorAll('input, select').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initStepReveal();
  initCardSettle('.contact-card');
  initCardSettle('.compare-card');
  initHeroCarousels();
  initOverlayHeader();
  initFaq();
  initContactForm();
  initPreorderForm();
});
