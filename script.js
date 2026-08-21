// Replace this with the official ballot URL as soon as it is available.
const VOTE_LINK = '#vote';
// Paste the share link from your anonymous Google Form here.
const SUGGESTION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdipqdS8o-dh5xPzIX1mqfp8YFulomMBaOmQpwlBL5XZzjmVg/viewform?usp=publish-editor';

document.querySelectorAll('[data-vote-link]').forEach((link) => {
  link.href = VOTE_LINK;
  if (VOTE_LINK.startsWith('http')) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

document.querySelectorAll('[data-suggestion-form]').forEach((link) => {
  link.href = SUGGESTION_FORM_URL;
  if (SUGGESTION_FORM_URL.startsWith('http')) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

document.querySelectorAll('.candidate-image').forEach((image) => {
  image.addEventListener('error', () => {
    image.src = 'assets/team/photo-placeholder.svg';
    image.alt = 'Add a candidate photo';
  }, { once: true });
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(element);
  });
}
