import { numberRollupObserver } from '../../shared/utils/numberRollup.js';
import { addUTMToExternalLinks } from '../../shared/utils/utm-tagging.js';
import { storeUTMParameters, appendUTMParametersToLinks } from '../../shared/utils/utm-utils.js';
import { updateIframeWithUTM } from '../../shared/utils/iframe-utm-utils.js';
import { setupNavbarScrollEffect } from './utils/navbar-scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  numberRollupObserver();
  setupNavbarScrollEffect();

  addUTMToExternalLinks({
    source: 'dokucom', // Replace with project-specific name
    contentMap: {
      'header a[href], .navbar a[href]': 'header',
      'footer a[href], .footer a[href]': 'footer',
    },
  });
});

window.addEventListener('load', () => {
  console.log('onReady fired. Document and all resources loaded.');
  storeUTMParameters();
  appendUTMParametersToLinks();
  updateIframeWithUTM(); // call without ID to use default targeting logic
});

// Add auto scroll in animation to all sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      sectionObserver.unobserve(entry.target);
    }
  });
});

// Apply to all sections
document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});

// Individual reveal observer (for custom elements only)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
});

// Apply only to elements with data-reveal
document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

