/*
import { initializeKeenSlider } from '../utils/keen-slider';

const animation = { duration: 20000, easing: function (t) { return t; } };

const careerSlider = initializeKeenSlider('#my-keen-slider', {
  loop: true,
  renderMode: 'performance',
  drag: true,
  slides: {
    perView: 5,
    spacing: 8,
  },
  breakpoints: {
    '(max-width: 991px)': {
      slides: {
        perView: 3,
        spacing: 8,
      },
    },
    '(max-width: 767px)': {
      slides: {
        perView: 2,
        spacing: 8,
      },
    },
  },
  created: function (s) {
    s.moveToIdx(5, true, animation);
  },
  updated: function (s) {
    s.moveToIdx(s.track.details.abs + 5, true, animation);
  },
  animationEnded: function (s) {
    s.moveToIdx(s.track.details.abs + 5, true, animation);
  },
});
*/
const proxyUrl = 'https://proxy-server-doku.vercel.app/api/division-proxy';

const container = document.getElementById('career-api');
const template = container ? container.querySelector('.careers_accordion') : null;

let fetchedData = [];

function renderAllData() {
  if (!template || !container) {
    console.error('Template or container not found');
    return;
  }

  const fragment = document.createDocumentFragment();

  fetchedData.forEach(function (item) {
    const newAccordion = template.cloneNode(true);
    newAccordion.classList.remove('hidden');

    const titleEl = newAccordion.querySelector('.career_accordion-title');
    if (titleEl) {
      titleEl.textContent = item.division || 'No Division Name';
    }

    const linksContainer = newAccordion.querySelector('.careers_accordion-job-list');
    if (linksContainer) {
      linksContainer.innerHTML = '';
      item.jobs.forEach(function (job) {
        const jobLink = document.createElement('a');
        jobLink.className = 'career_job-link';
        jobLink.href = `https://doku-payment.webflow.io/career/detail?jobId=${job.jobId}`;
        jobLink.target = '_blank';
        jobLink.textContent = job.jobTitle || 'There are currently no openings';
        linksContainer.appendChild(jobLink);
      });
    }

    fragment.appendChild(newAccordion);
  });

  container.appendChild(fragment);

  if (window.Webflow && typeof window.Webflow.require === 'function') {
    window.Webflow.require('ix2').init();
  }
}

function fetchAndRenderData() {
  const cachedData = localStorage.getItem('careerData');
  if (cachedData) {
    console.log('Using cached data');
    fetchedData = JSON.parse(cachedData);
    renderAllData();
  } else {
    fetch(proxyUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fetchedData = data;
        localStorage.setItem('careerData', JSON.stringify(data));
        renderAllData();
      })
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  }
}

fetchAndRenderData();