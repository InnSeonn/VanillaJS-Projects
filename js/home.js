const aside = document.querySelector('aside');
const topBtn = aside.querySelector('.topBtn');
const nav = document.querySelector('.nav');
const navBtn = nav.querySelector('.navBtn');
const fullNav = nav.querySelector('.fullNav');
const navLliks = nav.querySelectorAll('.links a');

/** 이벤트 리스너 등록 **/
topBtn.addEventListener('click', goToScroll);
navLliks.forEach(v => v.addEventListener('click', goToScroll));
navBtn.addEventListener('click', () => fullNav.classList.toggle('show'));


/** 윈도우 스크롤 이벤트 리스너 **/
let prevScroll = 0;
window.addEventListener('scroll', () => {
	let currScroll = window.scrollY;
	if(prevScroll > currScroll) { //위로 스크롤
		if(currScroll < 100) {
			nav.style.animationName = 'slideUp';
			nav.classList.remove('fixed');
			aside.classList.remove('show');
		}
		else {
			nav.style.animationName = 'slideDown';
			nav.classList.add('fixed');
			aside.classList.add('show');
		}
	}
	else { //아래로 스크롤
		nav.style.animationName = 'slideUp';
		aside.classList.remove('show');
	}
	prevScroll = currScroll;
});

let timer = null;
/** 타겟의 위치로 페이지를 스크롤하는 이벤트 리스너 함수 */
function goToScroll(e) {
	e.preventDefault();

	const target = document.querySelector(this.getAttribute('href'));
	const top = window.scrollY - target.offsetTop > 0 ? true : false;

	if(!timer) {
		timer = setInterval(() => {
			const dist = Math.abs(window.scrollY - target.offsetTop);
			if(top) { //위로 스크롤
				window.scrollTo(0, window.scrollY - Math.ceil(dist / 100));
				if(window.scrollY <= target.offsetTop) {
					clearInterval(timer);
					timer = null;
				}
			}
			else { //아래로 스크롤
				window.scrollTo(0, window.scrollY + Math.ceil(dist / 100));
				if(window.scrollY >= target.offsetTop) {
					clearInterval(timer);
					timer = null;
				}
			}
		}, 0);
	}
}

/** 슬라이드 */
class Slide {
	constructor(name) {
		this.name = name;
		this.elem = document.querySelector(`.${name}`);
		this.slider = document.querySelector(`.${name}__slider`);
		this.container = this.slider.querySelector(`.${name}__slideContainer`);
		this.slide = this.slider.querySelectorAll(`.${name}__slide`);
		this.slide[0].classList.add('active');
		this.page = this.elem.querySelector(`.${name}__pagenation`);
		this.moveToSlide = this.moveToSlide.bind(this);
		this.setPageButton = this.setPageButton.bind(this);
		this.autoSlide = this.autoSlide.bind(this);
		this.curr = 0;
		this.timer = null;
	}
	initSlide () {
		this.setPageButton();
		this.autoSlide();
	}
	setPageButton() {
		for(let i = 0; i < this.slide.length; i++) {
			const btn = document.createElement('button');
			i === 0 ? btn.classList.add(`${this.name}__page`, `active`) : btn.classList.add(`${this.name}__page`);
			btn.setAttribute('data-id', i);
			btn.addEventListener('click', this.moveToSlide);
			this.page.insertAdjacentElement('beforeend', btn);
		}
		this.pages = this.page.querySelectorAll(`.${this.name}__page`);
	}
	moveToSlide() {}
}
class HeroSlide extends Slide { 
	constructor(name) {
		super(name);
		this.prevBtn = this.elem.querySelector(`.${this.name}__prevBtn`);
		this.nextBtn = this.elem.querySelector(`.${this.name}__nextBtn`);
		this.checkSlidePage = this.checkSlidePage.bind(this);
		this.prevBtn.addEventListener('click', () => this.checkSlidePage(Number(this.curr) - 1));
		this.nextBtn.addEventListener('click', () => this.checkSlidePage(Number(this.curr) + 1));
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
	checkSlidePage(index) {
		if(index < 0) {
			index = this.pages.length - 1;
		} else if(index >= this.pages.length) {
			index = 0;
		}
		this.pages[index].click();
	}
	autoSlide() {
		this.timer = setInterval(() => this.checkSlidePage(Number(this.curr) + 1), 5000);
	}
}

const heroSlide = new HeroSlide('hero');
heroSlide.initSlide();