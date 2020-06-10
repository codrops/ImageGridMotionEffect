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
        this.DOM.inner = this.DOM.el.querySelector('.grid__item-img');
        this.move();
    }
    move() {
        this.invertMovement = !getRandomNumber(0,3);

        let translationVals = {tx: 0, ty: 0};
        const xstart = this.invertMovement ? getRandomNumber(20,70) : getRandomNumber(40,80);
        const ystart = this.invertMovement? getRandomNumber(10,60) : getRandomNumber(40,80);

        // also moving inner image (max 50px on each side - to change this limit change it also in the CSS)
        let translationInnerVals = {tx: 0, ty: 0};
        const xstartInner = this.invertMovement ? getRandomNumber(0,25) : getRandomNumber(0,50);
        const ystartInner = this.invertMovement? getRandomNumber(0,25) : getRandomNumber(0,50);

        const render = () => {
            translationVals.tx = lerp(translationVals.tx, map(mousepos.x, 0, winsize.width, this.invertMovement ? xstart : -xstart, this.invertMovement ? -xstart: xstart), 0.07);
            translationVals.ty = lerp(translationVals.ty, map(mousepos.y, 0, winsize.height, this.invertMovement ? ystart : -ystart, this.invertMovement ? -ystart: ystart), 0.07);            
            gsap.set(this.DOM.el, {x: translationVals.tx, y: translationVals.ty});   
            
            translationInnerVals.tx = lerp(translationInnerVals.tx, map(mousepos.x, 0, winsize.width, this.invertMovement ? -xstartInner : xstartInner, this.invertMovement ? xstartInner: -xstartInner), 0.07);
            translationInnerVals.ty = lerp(translationInnerVals.ty, map(mousepos.y, 0, winsize.height, this.invertMovement ? -ystartInner : ystartInner, this.invertMovement ? ystartInner: -ystartInner), 0.07);
            gsap.set(this.DOM.inner, {x: translationInnerVals.tx, y: translationInnerVals.ty});   
            
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
        .set(this.items, {scale: pos => this.gridItems[pos].invertMovement ? 0.2 : 0.6, opacity: 0}, 0)
        .to(this.items, {
            duration: 2,
            ease: 'Expo.easeOut',
            scale: pos => this.gridItems[pos].invertMovement ? 0.5 : 1,
            stagger: {amount: 0.6, grid: 'auto', from: 'center'}
        }, 0)
        .to(this.items, {
            duration: 2,
            ease: 'Power1.easeOut',
            opacity: pos => this.gridItems[pos].invertMovement ? 0.3 : 0.9,
            stagger: {amount: 0.6, grid: 'auto', from: 'center'}
        }, 0);
    }
}