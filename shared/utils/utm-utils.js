export function storeUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};
  
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
    utmKeys.forEach((key) => {
      if (urlParams.has(key)) {
        utmParams[key] = urlParams.get(key);
      }
    });
  
    if (Object.keys(utmParams).length > 0) {
      try {
        sessionStorage.setItem('utmParams', JSON.stringify(utmParams));
      } catch (e) {
        console.warn('Failed to store UTM parameters:', e);
      }
    }
  }
  
  export function appendUTMParametersToLinks() {
    try {
      const storedUTM = sessionStorage.getItem('utmParams');
      if (storedUTM) {
        const utmParams = JSON.parse(storedUTM);
        const utmQueryString = new URLSearchParams(utmParams).toString();
  
        document.querySelectorAll('a').forEach((link) => {
          const url = new URL(link.href, window.location.origin);
          if (url.hostname === window.location.hostname) {
            url.search += (url.search ? '&' : '') + utmQueryString;
            link.href = url.toString();
          }
        });
      }
    } catch (e) {
      console.warn('Failed to append UTM parameters to links:', e);
    }
  }