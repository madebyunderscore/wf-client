export function updateIframeWithUTM(targetId = 'mf_iframe') {
    const iframe = document.getElementById(targetId);
    if (!iframe) return;
  
    const storedUTM = sessionStorage.getItem('utmParams');
    if (storedUTM) {
      const utmParams = JSON.parse(storedUTM);
      const iframeUrl = new URL(iframe.src);
  
      Object.entries(utmParams).forEach(([key, value]) => {
        iframeUrl.searchParams.set(key, value);
      });
  
      iframe.src = iframeUrl.toString();
    }
  }