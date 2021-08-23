const imagesLoaded = require('imagesloaded');

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const calcWinsize = () => {
    return {width: window.innerWidth, height: window.innerHeight};
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Gets the mouse position
const getMousePos = e => {
    return { 
        x : e.clientX, 
        y : e.clientY 
    };
};

// Preload images
const preloadImages = (selector) => {
    return new Promise((resolve, reject) => {
        imagesLoaded(document.querySelectorAll(selector), resolve);
    });
};

export { map, lerp, calcWinsize, getRandomNumber, getMousePos, preloadImages };
