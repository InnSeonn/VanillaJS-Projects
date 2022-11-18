'use strict';

const media = {
	s: 768,
	m: 992,
	l: 1200,
}
let mediaSize = window.innerWidth > media.l ? 'l' : window.innerWidth > media.m ? 'm' : window.innerWidth > media.s ? 's' : 'xs';
let checkMedia = '';
let prevWidth = window.innerWidth;

window.addEventListener('resize', () => {
	if(changeMediaSize()) {
		mediaSize = checkMedia;
		// clientSlide.resetSlide();
	}
	prevWidth = window.innerWidth;
});

function changeMediaSize() {
	window.innerWidth > media.l ? checkMedia = 'l'
	: window.innerWidth > media.m ? checkMedia = 'm'
	: window.innerWidth > media.s ? checkMedia = 's'
	: checkMedia = 'xs';

	return checkMedia !== mediaSize ? true : false;
};

const company = ['nationwide.com', 'pfizer.com', 'tysonfoods.com', 'att.com', 'costco.com', 'metlife.com', 'dow.com', 'hcahealthcare.com', 'google.com', 'fedex.com'];

class Slide {
	constructor(name) {
		this.name = name;
		this.elem = document.querySelector(`.${name}`);
		this.slider = document.querySelector(`.${name}__slider`);
		this.container = this.slider.querySelector(`.${name}__slideContainer`);
		this.slide = null;
		this.page = this.elem.querySelector(`.${name}__pagenation`);
		this.pages = null;
		this.moveToSlide = this.moveToSlide.bind(this);
		this.setPageButton = this.setPageButton.bind(this);
		this.checkSlidePage = this.checkSlidePage.bind(this);
		this.createSlideItem = this.createSlideItem.bind(this);
		this.setSwipeEvent = this.setSwipeEvent.bind(this);
		this.swipeStart = this.swipeStart.bind(this);
		this.swipeEnd = this.swipeEnd.bind(this);
		this.swipeMove = this.swipeMove.bind(this);
		this.curr = 0;
		this.timer = null;
		this.swipe = false;
		this.start = 0;
		this.x = 0;
		this.displayCount = 1;
	}
	initSlide() {
		this.setPageButton();
	}
	setPageButton() {
		for(let i = 0; i < this.slide.length; i++) {
			const btn = document.createElement('button');
			i === 0 ? btn.classList.add(`${this.name}__page`, `active`) : btn.classList.add(`${this.name}__page`);
			this.page.classList.contains('pagenation') ? btn.classList.add('pagenation__page') : '';
			btn.setAttribute('data-id', i);
			btn.addEventListener('click', this.moveToSlide);
			this.page.appendChild(btn);
		}
		this.pages = this.page.querySelectorAll(`.${this.name}__page`);
	}
	moveToSlide(e) {
		const page = e.target;
		this.container.style.transition = 'all 1s';
		this.container.style.transform = `translateX(-${Number(page.dataset.id) * 100}%)`;
		this.pages[this.curr].classList.remove('active');
		page.classList.add('active');
		this.curr = page.dataset.id;
	}
	checkSlidePage(index) {
		if(index < 0) {
			index = this.pages.length - 1;
		} else if(index >= this.pages.length) {
			index = 0;
		}
		this.pages[index].click();
	}
	createSlideItem() {}
	setSwipeEvent() {
		this.container.addEventListener('mousedown', this.swipeStart);
		this.container.addEventListener('touchstart', this.swipeStart);
	}
	swipeStart(e) {
		const x = new WebKitCSSMatrix(getComputedStyle(this.container).transform).e; //DOMMatrix {a: 1, b: 0, c: 0, d: 1, e: -125, …}
		this.swipe = true;
		this.x = x;
		this.start = e.clientX || e.changedTouches[0].clientX;
		this.container.addEventListener('mousemove', this.swipeMove);
		this.container.addEventListener('mouseleave', this.swipeEnd);
		this.container.addEventListener('mouseup', this.swipeEnd);
		this.container.addEventListener('touchmove', this.swipeMove);
		this.container.addEventListener('touchend', this.swipeEnd);
	}
	swipeMove(e) {
		if(!this.swipe) return ;
		const clientX = e.clientX || e.changedTouches[0].clientX;
		const pos = this.x + clientX - this.start;
		if(pos <= 0 && pos > -this.container.clientWidth * (this.pages.length - 1)) {
			this.container.style.transition = 'none';
			this.container.style.transform = `translateX(${pos}px)`;
		}
	}
	swipeEnd(e) {
		this.swipe = false;
		const x = new WebKitCSSMatrix(getComputedStyle(this.container).transform).e;
		const slideWidth = this.slide[0].clientWidth; //슬라이드 아이템 하나의 width
		let slideNum = Math.abs(Math.floor(x / slideWidth)); //가장 앞쪽(왼쪽)에 있는 슬라이드 인덱스 구하기
		if(x !== 0) {
			this.start < (e.clientX || e.changedTouches[0].clientX) ? slideNum-- : slideNum;
		}
		this.pages[this.curr].classList.remove('active');
		this.pages[Math.floor(slideNum / this.displayCount)].classList.add('active');
		this.curr = Math.floor(slideNum / this.displayCount);
		this.container.style.transition = 'all 1s';
		this.container.style.transform = `translateX(${-slideNum * slideWidth}px)`;
		this.container.removeEventListener('mousemove', this.swipeMove);
		this.container.removeEventListener('mouseleave', this.swipeEnd);
		this.container.removeEventListener('mouseup', this.swipeEnd);
		this.container.removeEventListener('touchmove', this.swipeMove);
		this.container.removeEventListener('touchend', this.swipeEnd);
	}
}

class HeroSlide extends Slide { 
	constructor(name) {
		super(name);
		this.slide = this.slider.querySelectorAll(`.${name}__slide`);
		this.slide[0].classList.add('active');
		this.prevBtn = this.elem.querySelector(`.${this.name}__prevBtn`);
		this.nextBtn = this.elem.querySelector(`.${this.name}__nextBtn`);
		this.prevBtn.addEventListener('click', () => this.checkSlidePage(Number(this.curr) - 1));
		this.nextBtn.addEventListener('click', () => this.checkSlidePage(Number(this.curr) + 1));
		this.autoSlide = this.autoSlide.bind(this);
	}
	initSlide () {
		this.setPageButton();
		this.autoSlide();
	}
	moveToSlide(e) { 
		if(this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}
		const page = e.target;
		this.pages[this.curr].classList.remove('active');
		this.slide[this.curr].classList.remove('active');
		this.slide[page.dataset.id].classList.add('active');
		page.classList.add('active');
		this.curr = page.dataset.id;
		this.autoSlide();
	}
	autoSlide() {
		this.timer = setInterval(() => this.checkSlidePage(Number(this.curr) + 1), 5000);
	}
}

class ClientSlide extends Slide {
	constructor(name) {
		super(name);
		// this.displayCount = 1;
		this.resetSlide = this.resetSlide.bind(this);
	}
	initSlide () {
		this.createSlideItem();
		this.setPageButton();
		this.setSwipeEvent();
	}
	createSlideItem() { 
		for(let name of company) {
			const li = document.createElement('li');
			li.classList.add('clients__slide', 'slider__slide');
			const img = document.createElement('img');
			img.setAttribute('src', `https://logo.clearbit.com/${name}`);
			li.appendChild(img);
			this.container.appendChild(li);
		}
		this.slide = this.container.querySelectorAll(`.${this.name}__slide`);
	}
	setPageButton() {
		mediaSize === 'l' ? this.displayCount = 5
		: mediaSize === 'm' ? this.displayCount = 4
		: mediaSize === 's' ? this.displayCount = 3
		: this.displayCount = 1;

		for(let i = 0; i < this.slide.length; i += this.displayCount) {
			const btn = document.createElement('button');
			i === 0 ? btn.classList.add(`${this.name}__page`, `active`) : btn.classList.add(`${this.name}__page`);
			this.page.classList.contains('pagenation') ? btn.classList.add('pagenation__page') : '';
			btn.setAttribute('data-id', Number.parseInt(i / this.displayCount));
			btn.addEventListener('click', this.moveToSlide);
			this.page.appendChild(btn);
		}
		this.pages = this.page.querySelectorAll(`.${this.name}__page`);
	}
	resetSlide() {
		this.curr = 0;
		this.container.style.transform = 'translateX(0)';
		while(this.page.children.length > 0) {
			this.page.removeChild(this.page.lastChild);
		}
		this.setPageButton();
	}
}

class ReviewSlide extends Slide {
	constructor(name) {
		super(name);
	}
	async initSlide() {
		await this.getData();
		this.setPageButton();
		this.setSwipeEvent();
	}
	async getData() {
		const res = await fetch(`http://localhost:3001/reviews`);
		const json = await res.json();
		this.createSlideItem(json);
	}
	createSlideItem(data) {
		const reviews = data.review;
		for(let item of reviews) {
			const li = document.createElement('li');
			li.classList.add(`${this.name}__slide`, 'slider__slide');
			const html = `
				<img class="${this.name}__img" src="${item.src}">
				<p class="${this.name}__text">${item.text}</p>
				<p class="${this.name}__user icon-quote">${item.name}</p>
			`;
			li.innerHTML = html;
			this.container.appendChild(li);
		}
		this.slide = this.container.querySelectorAll(`.${this.name}__slide`);
	}
}

const heroSlide = new HeroSlide('hero');
heroSlide.initSlide();

const clientSlide = new ClientSlide('clients'); 
clientSlide.initSlide();

const reviewSlide = new ReviewSlide('reviews');
reviewSlide.initSlide();
