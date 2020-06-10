import Cursor from '../cursor';
import Grid from './grid';
import { preloadImages } from '../utils';

// Preload  images
preloadImages('.grid__item-img, .bigimg').then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');
    
    // Initialize grid
    const grid = new Grid(document.querySelector('.grid'));
});

const cursor = new Cursor(document.querySelector('.cursor'));