import { gsap } from 'gsap';
import { map, lerp, getMousePos, calcWinsize, getRandomNumber } from '../utils';

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());

let mousepos = {x: winsize.width/2, y: winsize.height/2};
window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

class GridItem {
    constructor(el) {
        this.DOM = {el: el};
        this.move();
    }
    move() {
        let translationVals = {tx: 0, ty: 0, r: 0};
        const xstart = getRandomNumber(15,60);
        const ystart = getRandomNumber(30,90);
        const randR = getRandomNumber(-15,15);

        const render = () => {
            translationVals.tx = lerp(translationVals.tx, map(mousepos.x, 0, winsize.width, -xstart, xstart), 0.07);
            translationVals.ty = lerp(translationVals.ty, map(mousepos.y, 0, winsize.height, -ystart, ystart), 0.07);
            translationVals.r = lerp(translationVals.r, map(mousepos.x, 0, winsize.width, -randR, randR), 0.07);
            
            gsap.set(this.DOM.el, {
                x: translationVals.tx, 
                y: translationVals.ty,
                rotation: translationVals.r,
            });
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }
}

export default class Grid {
    constructor(el) {
        this.DOM = {el: el};
        this.gridItems = [];
        this.items = [...this.DOM.el.querySelectorAll('.grid__item')];
        this.items.forEach(item => this.gridItems.push(new GridItem(item)));

        this.showItems();
    }
    // Initial animation to scale up and fade in the items
    showItems() {
        gsap
        .timeline()
        .set(this.items, {scale: 0.7, opacity: 0}, 0)
        .to(this.items, {
            duration: 2,
            ease: 'Expo.easeOut',
            scale: 1,
            stagger: {amount: 0.6, grid: 'auto', from: 'center'}
        }, 0)
        .to(this.items, {
            duration: 3,
            ease: 'Power1.easeOut',
            opacity: 0.8,
            stagger: {amount: 0.6, grid: 'auto', from: 'center'}
        }, 0);
    }
}