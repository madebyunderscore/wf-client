import { numberRollupObserver } from '../../shared/utils/numberRollup.js';
numberRollupObserver(); 


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


// UTM tagging for external links
(function () {
    const UTM_HEADER = "utm_source=dokucom&utm_content=header";
    const UTM_FOOTER = "utm_source=dokucom&utm_content=footer";
  
    function addUTMToLinks(selector, utm) {
      const links = document.querySelectorAll(selector);
      links.forEach((link) => {
        try {
          const url = new URL(link.href);
          if (!url.hostname || url.hostname === window.location.hostname) return; // skip internal
          if (url.searchParams.has("utm_source")) return; // skip if already tagged
  
          // Add UTM params
          url.searchParams.append("utm_source", "dokucom");
          url.searchParams.append("utm_content", utm);
          link.href = url.toString();
        } catch (e) {
          console.warn("Invalid link skipped:", link.href);
        }
      });
    }
  
    // Header = nav or global header class
    addUTMToLinks("header a[href], .navbar a[href]", "header");
  
    // Footer = footer element or footer class
    addUTMToLinks("footer a[href], .footer a[href]", "footer");
  })();