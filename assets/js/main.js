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
  initFaq();
  initContactForm();
  initPreorderForm();
});
