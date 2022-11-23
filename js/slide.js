'use strict';

const media = {
	s: 768,
	m: 992,
	l: 1200,
}
let mediaSize = window.innerWidth > media.l ? 'l' : window.innerWidth > media.m ? 'm' : window.innerWidth > media.s ? 's' : 'xs';
let checkMedia = '';
let prevWidth = window.innerWidth;

function changeMediaSize() {
	window.innerWidth > media.l ? checkMedia = 'l'
	: window.innerWidth > media.m ? checkMedia = 'm'
	: window.innerWidth > media.s ? checkMedia = 's'
	: checkMedia = 'xs';

	return checkMedia !== mediaSize ? true : false;
};

window.addEventListener('resize', () => {
	if(changeMediaSize()) {
		mediaSize = checkMedia;
		clientSlide.resetSlide();
	}
	prevWidth = window.innerWidth;
});

const company = ['nationwide.com', 'pfizer.com', 'tysonfoods.com', 'att.com', 'costco.com', 'metlife.com', 'dow.com', 'hcahealthcare.com', 'google.com', 'fedex.com'];

class Slide {
	constructor(name) {
		this.name = name;
		this.elem = document.querySelector(`.${name}`);
		this.slider = document.querySelector(`.${name}__slider`);
		this.container = this.slider.querySelector(`.${name}__slideContainer`);
		this.slide = this.slider.querySelectorAll(`.${name}__slide`) ?? null;
		this.page = this.elem.querySelector(`.${name}__pagenation`);
		this.pages = null;
		this.moveToSlide = this.moveToSlide.bind(this);
		this.setPageButton = this.setPageButton.bind(this);
		this.createSlideItem = this.createSlideItem.bind(this);
		this.setSwipeEvent = this.setSwipeEvent.bind(this);
		this.swipeStart = this.swipeStart.bind(this);
		this.swipeEnd = this.swipeEnd.bind(this);
		this.swipeMove = this.swipeMove.bind(this);
		this.displayCount = Number(1); //표시할 슬라이드 개수
		this.curr = 0; //현재 페이지
		this.x = 0;
	}
	initSlide() {}
	setPageButton() {
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
	moveToSlide(e) {
		const pageId = Number(e.target.dataset.id);
		let x = (pageId + 1) * this.slide[0].offsetWidth * this.displayCount;
		if(pageId === this.pages.length - 1) x = (this.slide[0].offsetWidth * this.slide.length); //마지막 페이지에 슬라이드 공간이 남지 않고 마지막 슬라이드가 위치하도록

		this.container.style.transition = 'all 1s';
		this.container.style.transform = `translateX(-${x}px)`;
		this.pages[this.curr].classList.remove('active');
		this.pages[pageId].classList.add('active');
		this.curr = pageId;
	}
	createSlideItem() { //Clone
		for(let i = 1; i <= this.displayCount; i++) {
			const start = this.slide[i - 1].cloneNode(true);
			start.classList.add('clone');
			this.container.insertAdjacentElement('beforeend', start);

			const end = this.slide[this.slide.length - i].cloneNode(true);
			end.classList.add('clone');
			this.container.insertAdjacentElement('afterbegin', end);
		}
	}
	setSwipeEvent() {
		this.container.addEventListener('mousedown', this.swipeStart);
		this.container.addEventListener('touchstart', this.swipeStart);
	}
	swipeStart(e) {
		this.container.addEventListener('mousemove', this.swipeMove);
		this.container.addEventListener('mouseleave', this.swipeEnd);
		this.container.addEventListener('mouseup', this.swipeEnd);
		this.container.addEventListener('touchmove', this.swipeMove);
		this.container.addEventListener('touchend', this.swipeEnd);
	}
	swipeMove(e) {
		this.x = new WebKitCSSMatrix(getComputedStyle(this.container).transform).e;
		const pos = this.x + e.movementX; //이동할 위치 - 현재 위치 + 이동한 거리

		if(pos >= 0) { //스와이프 중에 시작 지점을 지나면 끝 지점으로 이동
			this.x = -this.slide[0].offsetWidth * this.slide.length;
		} else if(pos <= -this.slide[0].offsetWidth * (this.slide.length + this.displayCount)) { //스와이프 중에 끝 지점을 지나면 시작 지점으로 이동
			this.x = -this.slide[0].offsetWidth * this.displayCount;
		}
		
		this.container.style.transition = 'none';
		this.container.style.transform = `translateX(${this.x + e.movementX}px)`;
	}
	swipeEnd(e) {
		this.container.removeEventListener('mousemove', this.swipeMove);
		this.container.removeEventListener('mouseleave', this.swipeEnd);
		this.container.removeEventListener('mouseup', this.swipeEnd);
		this.container.removeEventListener('touchmove', this.swipeMove);
		this.container.removeEventListener('touchend', this.swipeEnd);

		//움직인 방향에 따라 다음 슬라이드 위치로 이동
		const x = new WebKitCSSMatrix(getComputedStyle(this.container).transform).e;
		const slideWidth = this.slide[0].offsetWidth; //슬라이드 아이템 하나의 width
		let slideNum = Math.abs(Math.floor(x / slideWidth)); //가장 앞쪽(왼쪽)에 있는 슬라이드 인덱스 구하기
		this.x = this.x > x ? slideNum * -slideWidth : --slideNum * -slideWidth;
		this.container.style.transition = 'all 1s';
		this.container.style.transform = `translateX(${this.x}px)`;

		//가장 왼쪽에 있는 슬라이드에 해당하는 페이지 버튼 활성화
		this.pages[this.curr].classList.remove('active');
		if(slideNum >= this.slide.length + this.displayCount) {
			this.curr = 0;
		} else {
			const index = Math.floor(slideNum / this.displayCount) - 1;
			this.curr = index < 0 ? this.pages.length - 1 : index > this.pages.length - 1 ? 0 : index;
		}
		this.pages[this.curr].classList.add('active');
	}
}

class HeroSlide extends Slide { 
	constructor(name) {
		super(name);
		// this.slide = this.slider.querySelectorAll(`.${name}__slide`);
		this.slide[0].classList.add('active');
		this.prevBtn = this.elem.querySelector(`.${this.name}__prevBtn`);
		this.nextBtn = this.elem.querySelector(`.${this.name}__nextBtn`);
		this.checkSlidePage = this.checkSlidePage.bind(this);
		this.autoSlide = this.autoSlide.bind(this);
		this.prevBtn.addEventListener('click', () => this.checkSlidePage(Number(this.curr) - 1));
		this.nextBtn.addEventListener('click', () => this.checkSlidePage(Number(this.curr) + 1));
		this.timer = null;
	}
	initSlide () {
		super.setPageButton();
		this.autoSlide();
	}
	moveToSlide(e) { 
		if(this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}
		const pageId = Number(e.target.dataset.id);
		this.pages[this.curr].classList.remove('active');
		this.pages[pageId].classList.add('active');
		this.slide[this.curr].classList.remove('active');
		this.slide[pageId].classList.add('active');
		this.curr = pageId;
		this.autoSlide();
	}
	autoSlide() {
		this.timer = setInterval(() => this.checkSlidePage(this.curr + 1), 5000);
	}
	checkSlidePage(index) {
		if(index < 0) {
			index = this.pages.length - 1;
		} else if(index >= this.pages.length) {
			index = 0;
		}
		this.pages[index].click();
	}
}

class ClientSlide extends Slide {
	constructor(name) {
		super(name);
		this.displayCount = mediaSize === 'l' ? this.displayCount = Number(5)
		: mediaSize === 'm' ? this.displayCount = Number(4)
		: mediaSize === 's' ? this.displayCount = Number(3)
		: this.displayCount = Number(1);
		this.resetSlide = this.resetSlide.bind(this);
	}
	initSlide() {
		this.createSlideItem();
		super.setPageButton();
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
		super.createSlideItem();
	}
	resetSlide() { //window resize에 따라 페이지 버튼 재설정
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
		super.setPageButton();
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
			li.insertAdjacentHTML('afterbegin', html);
			this.container.appendChild(li);
		}
		this.slide = this.container.querySelectorAll(`.${this.name}__slide`);
		super.createSlideItem();
	}
}

class NewsSlide extends Slide {
	constructor(name) {
		super(name);
	}
	async initSlide() {
		await this.getData();
		super.setPageButton();
		this.setSwipeEvent();
	}
	async getData() {
		const res = await fetch(`http://localhost:3001/news`);
		const json = await res.json();
		this.createSlideItem(json);
	}
	createSlideItem(data) {
		const news = data.news;
		for(let item of news) {
			const article = document.createElement('article');
			article.classList.add(`${this.name}__slide`, 'slider__slide');
			const html = `
				<div class="${this.name}__contents">
					<img class="${this.name}__img" src="${item.image}" alt="">
					<div class="${this.name}__text">
						<p class="${this.name}__title">${item.title}</p>
						<p class="${this.name}__desc">${item.text}</p>
						<p class="${this.name}__date">${item.date}</p>
					</div>
				</div>
				<a href="#" class="${this.name}__link">read more</a>
			`;
			article.insertAdjacentHTML('afterbegin', html);
			this.container.appendChild(article);
		}
		this.slide = this.container.querySelectorAll(`.${this.name}__slide`);
		super.createSlideItem();
	}
}

const heroSlide = new HeroSlide('hero');
heroSlide.initSlide();

const clientSlide = new ClientSlide('clients'); 
clientSlide.initSlide();

const reviewSlide = new ReviewSlide('reviews');
reviewSlide.initSlide();

const newsSlide = new NewsSlide('news');
newsSlide.initSlide();