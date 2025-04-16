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

// Add hover tab functionality
// This function simulates a click on elements with the attribute 'und-tab="hover"' when hovered
document.addEventListener('DOMContentLoaded', () => {
  // Select all elements with the 'und-tab="hover"' attribute
  const tabs = document.querySelectorAll('[und-tab="hover"]');

  // Add an event listener to each element to trigger a click on hover
  tabs.forEach(function(tab) {
    tab.addEventListener('mouseenter', function() {
      tab.click();
    });
  });
});

// Add mobile dropdown functionality. This function creates a mobile dropdown from desktop navigation tabs
// It listens for clicks and keyboard events to toggle the dropdowns. It uses aria attributes for accessibility
// It creates a new dropdown structure for mobile view. It ensures that only one dropdown is open at a time
document.addEventListener('DOMContentLoaded', () => {
  const desktopNavDropdowns = document.querySelectorAll('.nav-link_dd');

  if (!desktopNavDropdowns.length) {
    console.error('No desktop navigation dropdowns found with class "nav-link_dd".');
    return;
  }

  desktopNavDropdowns.forEach((dropdown, dropdownIndex) => {
    const desktopTabLinks = dropdown.querySelectorAll('.nav-dd_tab-menu-link');
    const desktopTabContents = dropdown.querySelectorAll('.nav-dd_tabs-pane-grid');
    const mobileNavContainer = dropdown.querySelector('.nav-mobile_nav_btm');

    if (!mobileNavContainer) {
      console.warn(`Mobile container not found in dropdown index ${dropdownIndex}.`);
      return;
    }

    // Clear old mobile dropdowns
    mobileNavContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    desktopTabLinks.forEach((tabLink, index) => {
      const tabContent = desktopTabContents[index];
      if (!tabContent) return;

      const mobileDd = document.createElement('div');
      mobileDd.className = 'nav-mobile-dd';

      // Toggle
      const toggle = document.createElement('div');
      toggle.className = 'nav-mobile-dd_toggle';
      toggle.innerHTML = tabLink.innerHTML;

      const toggleId = `nav-mobile-dd-toggle-${dropdownIndex}-${index}`;
      const contentId = `nav-mobile-dd-content-${dropdownIndex}-${index}`;
      toggle.id = toggleId;
      toggle.setAttribute('role', 'button');
      toggle.setAttribute('aria-controls', contentId);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.tabIndex = 0;

      // Content
      const btm = document.createElement('div');
      btm.className = 'nav-mobile-dd_btm';
      btm.id = contentId;
      btm.setAttribute('aria-labelledby', toggleId);
      btm.setAttribute('role', 'region');
      btm.style.display = 'none';

      const list = document.createElement('div');
      list.className = 'nav-mobile-dd_list';
      list.innerHTML = tabContent.innerHTML;

      btm.appendChild(list);
      mobileDd.appendChild(toggle);
      mobileDd.appendChild(btm);
      fragment.appendChild(mobileDd);
    });

    mobileNavContainer.appendChild(fragment);

    // Click event
    mobileNavContainer.addEventListener('click', (event) => {
      const toggle = event.target.closest('.nav-mobile-dd_toggle');
      if (!toggle) return;

      const btm = toggle.nextElementSibling;
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      // Close all first
      mobileNavContainer.querySelectorAll('.nav-mobile-dd_btm').forEach(el => el.style.display = 'none');
      mobileNavContainer.querySelectorAll('.nav-mobile-dd_toggle').forEach(el => el.setAttribute('aria-expanded', 'false'));

      if (!isExpanded) {
        btm.style.display = 'block';
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support
    mobileNavContainer.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const toggle = event.target.closest('.nav-mobile-dd_toggle');
      if (toggle) {
        event.preventDefault();
        toggle.click();
      }
    });
  });
});