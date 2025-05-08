// global
const sliderTrack = document.querySelector('.slider__track');
const allSlides = document.querySelectorAll('.slider__slide');
const dotsContainer = document.querySelector('.slider__dots');
const moveLeftBtn = document.querySelector('.slider__control-left');
const moveRightBtn = document.querySelector('.slider__control-right');

// constants
const SLIDE_WIDTH = 600;
const ANIMATION_DURATION = 400;

// state
let currentSlidePointer = 0;
let isAnimating = false;

// utils
const getPrevSlideIndex = () => (currentSlidePointer === 0 ? allSlides.length - 1 : currentSlidePointer - 1);
const getCurrentSlideIndex = () => currentSlidePointer;
const getNextSlideIndex = () => (currentSlidePointer === allSlides.length - 1 ? 0 : currentSlidePointer + 1);

const getPrevSlide = () => allSlides[getPrevSlideIndex()];
const getCurrentSlide = () => allSlides[getCurrentSlideIndex()];
const getNextSlide = () => allSlides[getNextSlideIndex()];

const cloneSlide = (slide, offsetX) => {
  const clone = slide.cloneNode();
  clone.style.left = offsetX + 'px';
  return clone;
};

const animateSlide = (element, from, to, callback) => {
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / ANIMATION_DURATION, 1);
    const position = Math.round(from + (to - from) * progress);
    element.style.left = position + 'px';

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.style.left = Math.round(to) + 'px';
      callback();
    }
  };

  requestAnimationFrame(step);
};

// init
const initSlider = () => {
  if (allSlides.length === 0) {
    return;
  }

  const dots = [];

  allSlides.forEach((slide) => {
    slide.remove();

    const dot = document.createElement('div');
    dot.classList.add('slider__dot');
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  let prevSlide = cloneSlide(getPrevSlide(), -SLIDE_WIDTH);
  let currentSlide = cloneSlide(getCurrentSlide(), 0);
  let nextSlide = cloneSlide(getNextSlide(), SLIDE_WIDTH);
  dots[0].classList.add('slider__dot_active');

  sliderTrack.appendChild(prevSlide);
  sliderTrack.appendChild(currentSlide);
  sliderTrack.appendChild(nextSlide);

  const moveRight = () => {
    if (isAnimating) return;
    isAnimating = true;

    dots[currentSlidePointer].classList.remove('slider__dot_active');
    dots[getNextSlideIndex()].classList.add('slider__dot_active');

    requestAnimationFrame(() => {
      animateSlide(currentSlide, 0, -SLIDE_WIDTH, () => {});
      animateSlide(nextSlide, SLIDE_WIDTH, 0, () => {
        prevSlide.remove();
        currentSlidePointer = (currentSlidePointer + 1) % allSlides.length;

        prevSlide = currentSlide;
        currentSlide = nextSlide;

        nextSlide = cloneSlide(getNextSlide(), SLIDE_WIDTH);
        sliderTrack.appendChild(nextSlide);

        isAnimating = false;
      });
    });
  };

  const moveLeft = () => {
    if (isAnimating) return;
    isAnimating = true;

    dots[currentSlidePointer].classList.remove('slider__dot_active');
    dots[getPrevSlideIndex()].classList.add('slider__dot_active');

    requestAnimationFrame(() => {
      animateSlide(currentSlide, 0, SLIDE_WIDTH, () => {});
      animateSlide(prevSlide, -SLIDE_WIDTH, 0, () => {
        nextSlide.remove();
        currentSlidePointer = currentSlidePointer - 1 < 0 ? allSlides.length - 1 : currentSlidePointer - 1;

        nextSlide = currentSlide;
        currentSlide = prevSlide;

        prevSlide = cloneSlide(getPrevSlide(), -SLIDE_WIDTH);
        sliderTrack.appendChild(prevSlide);

        isAnimating = false;
      });
    });
  };

  const moveDot = (index) => () => {
    if (currentSlidePointer === index) {
      return;
    }

    dots[currentSlidePointer].classList.remove('slider__dot_active');
    dots[index].classList.add('slider__dot_active');

    currentSlidePointer = index;

    prevSlide.remove();
    currentSlide.remove();
    nextSlide.remove();

    prevSlide = cloneSlide(getPrevSlide(), -SLIDE_WIDTH);
    currentSlide = cloneSlide(getCurrentSlide(), 0);
    nextSlide = cloneSlide(getNextSlide(), SLIDE_WIDTH);

    sliderTrack.appendChild(prevSlide);
    sliderTrack.appendChild(currentSlide);
    sliderTrack.appendChild(nextSlide);
  };

  moveLeftBtn.addEventListener('click', moveLeft);
  moveRightBtn.addEventListener('click', moveRight);
  dots.forEach((dot, index) => dot.addEventListener('click', moveDot(index)));
};

// app
initSlider();
