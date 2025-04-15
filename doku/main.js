import { numberRollupObserver } from '../../shared/utils/numberRollup.js';
numberRollupObserver(); // will auto-init on scroll

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

  console.log('Main JS loaded');


