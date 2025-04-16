import KeenSlider from 'keen-slider';

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector("#waas-reviews-slider");
    if (!slider) return;

    const animation = {
      duration: 100000,
      easing: t => t,
    };

    new KeenSlider(slider, {
      loop: true,
      renderMode: 'performance',
      drag: true,
      slides: {
        perView: 3,
        spacing: 24,
      },
      breakpoints: {
        '(max-width: 991px)': {
          slides: { perView: 2, spacing: 24 },
        },
        '(max-width: 767px)': {
          slides: { perView: 1, spacing: 24 },
        },
      },
      created(s) {
        s.moveToIdx(5, true, animation);
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      },
    });
  });