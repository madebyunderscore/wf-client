import KeenSlider from 'keen-slider';

const animation = {
    duration: 100000,
    easing: function (t) {
      return t;
    },
  };

  const careerSliderOptions = {
    loop: true,
    renderMode: 'performance',
    drag: true,
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      '(max-width: 991px)': {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
      '(max-width: 767px)': {
        slides: {
          perView: 1,
          spacing: 24,
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
  };

  function initializeKeenSlider(selector, options) {
    const element = document.querySelector(selector);
    if (element) {
      new KeenSlider(element, options);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initializeKeenSlider('#waas-reviews-slider', careerSliderOptions);
  });