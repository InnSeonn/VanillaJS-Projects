// Slide Class
class Slide {
	constructor(name, data) {
		this.name = name;
		this.data = data;
		this.elem = document.querySelector(`.${name}`);
		this.container = this.elem.querySelector(`.${name}__slideContainer`);
		this.slides = null;
		this.pagenation = this.elem.querySelector(`.${name}__pagenation`);
		this.pages = null;
		this.createSlide = this.createSlide.bind(this);
		this.createCloneSlide = this.createCloneSlide.bind(this);
		this.createPageButton = this.createPageButton.bind(this);
		this.setMovement = this.setMovement.bind(this);
		this.setPageButton = this.setPageButton.bind(this);
		this.getContainerX = this.getContainerX.bind(this);
		this.moveToSlide = this.moveToSlide.bind(this);
		this.setSwipeEvent = this.setSwipeEvent.bind(this);
		this.swipeStart = this.swipeStart.bind(this);
		this.resizing = this.resizing.bind(this);
		this.resetSlide = this.resetSlide.bind(this);
		this.count = 1;
		this.cloneCount = 1;
		this.currPage = 0;
		this.first = this.count * this.cloneCount;
	}
	createSlide() {
		this.slides = this.container.querySelectorAll(`.${this.name}__slide`); //클론 제외
		this.createCloneSlide();
		this.createPageButton();
		this.setSwipeEvent();
		this.setMovement('none', -this.count * this.cloneCount * this.slides[0].offsetWidth);
		this.first = this.count * this.cloneCount;
	}
	createCloneSlide() {
		for(let i = 1; i <= this.count * this.cloneCount; i++) {
			const first = this.slides[i - 1].cloneNode(true);
			first.classList.add('clone');
			this.container.insertAdjacentElement('beforeend', first);

			const last = this.slides[this.slides.length - i].cloneNode(true);
			last.classList.add('clone');
			this.container.insertAdjacentElement('afterbegin', last);
		}
	}
	createPageButton() {
		for(let i = 0; i < this.slides.length; i += this.count) {
			const btn = document.createElement('button');
			i === 0 ? btn.classList.add(`${this.name}__page`, `active`) : btn.classList.add(`${this.name}__page`);
			this.pagenation.classList.contains('pagenation') ? btn.classList.add('pagenation__page') : '';
			btn.setAttribute('data-id', Number.parseInt(i / this.count));
			btn.addEventListener('click', this.moveToSlide);
			this.pagenation.appendChild(btn);
		}
		this.pages = this.pagenation.querySelectorAll(`.${this.name}__page`);
		this.currPage = 0;
	}
	setMovement(transition, x) {
		this.container.style.transition = transition;
		this.container.style.transform = `translateX(${x}px)`;
	}
	setPageButton(index) {
		this.pages[this.currPage].classList.remove('active');
		this.pages[index].classList.add('active');
		this.currPage = index;
	}
	getContainerX() {
		return Number(new WebKitCSSMatrix(getComputedStyle(this.container).transform).e);
	}
	moveToSlide(e) {
		const index = Number(e.target.dataset.id);
		const x = this.slides[0].offsetWidth * this.count * (index + this.cloneCount);
		this.setMovement('all 0.5s', -x);
		this.setPageButton(index);
		this.first = this.count * (index + this.cloneCount);
	}
	setSwipeEvent() {
		this.container.addEventListener('mousedown', this.swipeStart);
		this.container.addEventListener('touchstart', this.swipeStart);
	}
	swipeStart(e) {
		const obj = this;
		if(e.type === 'touchstart') {
			obj.container.addEventListener('touchmove', swipeMove);
			obj.container.addEventListener('touchend', swipeEnd);
		} else if(e.type === 'mousedown') {
			obj.container.addEventListener('mousemove', swipeMove);
			obj.container.addEventListener('mouseleave', swipeEnd);
			obj.container.addEventListener('mouseup', swipeEnd);
		}

		let startX = e.touches ? e.touches[0].pageX : e.pageX;
		let prevX = startX;
		let firstPos = -obj.slides[0].offsetWidth * obj.count * obj.cloneCount;
		let lastPos = -obj.slides[0].offsetWidth * (obj.slides.length + obj.count * obj.cloneCount);

		function swipeMove(e) {
			const pageX = e.touches ? e.touches[0].pageX : e.pageX;
			const movementX = prevX - pageX;
			obj.setMovement('none', obj.getContainerX() - movementX);
			prevX = pageX;

			//스와이프 중에 처음 지점을 지나면 마지막 슬라이드로 이동
			if(obj.getContainerX() >= firstPos) {
				obj.setMovement('none', lastPos);
			}
			//스와이프 중에 마지막 지점을 지나면 첫 슬라이드로 이동
			else if(obj.getContainerX() <= lastPos) {
				obj.setMovement('none', firstPos);
			}
		}

		function swipeEnd(e) {
			if(e.type === 'touchend') {
				obj.container.removeEventListener('touchmove', swipeMove);
				obj.container.removeEventListener('touchend', swipeEnd);
			} else if(e.type === 'mouseleave') {
				obj.container.removeEventListener('mousemove', swipeMove);
				obj.container.removeEventListener('mouseleave', swipeEnd);
				obj.container.removeEventListener('mouseup', swipeEnd);
			}

			obj.first = startX - prevX > 0 ?
			Math.ceil(Math.abs(obj.getContainerX() / obj.slides[0].offsetWidth))
			: Math.floor(Math.abs(obj.getContainerX() / obj.slides[0].offsetWidth));

			const x = -obj.first * obj.slides[0].offsetWidth;
			obj.setMovement('all 0.5s', x);
			
			//마지막 슬라이드에서 첫 슬라이드로 이동
			if(x <= lastPos) {
				obj.first = obj.count * obj.cloneCount;
				setTimeout(() => {
					obj.setMovement('none', firstPos);
				}, 500);
			}
			//첫 슬라이드에서 마지막 슬라이드로 이동
			else if(x >= firstPos) {
				obj.first = (obj.count * obj.cloneCount) + obj.slides.length;
				setTimeout(() => {
					obj.setMovement('none', lastPos);
				}, 500);
			}

			//슬라이드 좌측 첫번째 아이템 기준으로 버튼 활성화
			if(obj.first < obj.count * obj.cloneCount) {
				const num = obj.slides.length % obj.count;
				if(num === 0) {
					obj.setPageButton(obj.pages.length - 1)
				} else {
					obj.first >= obj.count - num
					? obj.setPageButton(obj.pages.length - 1)
					: obj.setPageButton(obj.pages.length - 2);
				}
			} else if(obj.first > (obj.count * obj.cloneCount) + obj.slides.length - 1) {
				obj.setPageButton(0);
			} else {
				obj.setPageButton(Math.trunc(obj.first / obj.count) - obj.cloneCount);
			}
		}
	}
	resizing() {
		this.setMovement('none', -this.first * this.slides[0].offsetWidth);
	}
	resetSlide() {}
}

// HeroSlide Class (자동 슬라이드)
class HeroSlide extends Slide {
	constructor(name, data) {
		super(name, data);
		this.slides = this.container.querySelectorAll(`.${this.name}__slide`);
		this.prevBtn = this.elem.querySelector(`.${name}__prevBtn`);
		this.nextBtn = this.elem.querySelector(`.${name}__nextBtn`);
		this.autoSlide = this.autoSlide.bind(this);
		this.goToSlide = this.goToSlide.bind(this);
		this.prevBtn.addEventListener('click', () => this.goToSlide(this.currPage - 1));
		this.nextBtn.addEventListener('click', () => this.goToSlide(this.currPage + 1));
		this.timer = null;
	}
	createSlide() {
		this.createPageButton();
		this.setSwipeEvent();
		this.first = 0;
		this.slides[0].classList.add('active');
		this.autoSlide();
	}
	moveToSlide(e) {
		if(this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}
		const index = Number(e.target.dataset.id);
		this.slides[this.currPage].classList.remove('active');
		this.slides[index].classList.add('active');
		this.setPageButton(index);
		this.autoSlide();
	}
	autoSlide() {
		this.timer = setInterval(() => {
			this.goToSlide(this.currPage + 1);
		}, 4000);
	}
	goToSlide(page) {
		if(page < 0) {
			this.pages[this.pages.length - 1].click();
		} else if(page > this.pages.length - 1) {
			this.pages[0].click();
		} else {
			this.pages[page].click();
		}
	}
	swipeStart(e) {
		if(this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}

		const obj = this;
		if(e.type === 'touchstart') {
			obj.container.addEventListener('touchmove', swipeMove);
			obj.container.addEventListener('touchend', swipeEnd);
		} else if(e.type === 'mousedown') {
			obj.container.addEventListener('mousemove', swipeMove);
			obj.container.addEventListener('mouseleave', swipeEnd);
			obj.container.addEventListener('mouseup', swipeEnd);
		}

		const startX = e.touches ? e.touches[0].pageX : e.pageX;
		let prevX = startX;

		function swipeMove(e) {
			prevX = e.touches ? e.touches[0].pageX : e.pageX;
		}

		function swipeEnd(e) {
			if(e.type === 'touchend') {
				obj.container.removeEventListener('touchmove', swipeMove);
				obj.container.removeEventListener('touchend', swipeEnd);
			} else if(e.type === 'mouseleave') {
				obj.container.removeEventListener('mousemove', swipeMove);
				obj.container.removeEventListener('mouseleave', swipeEnd);
				obj.container.removeEventListener('mouseup', swipeEnd);
			}

			const movementX = startX - prevX;
			movementX > 0 ? obj.goToSlide(obj.currPage + 1) : obj.goToSlide(obj.currPage - 1);
		}
	}
}

// ClientSlide Class
class ClientSlide extends Slide {
	constructor(name, data) {
		super(name, data);
	}
	createSlide() {
		for(let company of this.data) {
			const li = document.createElement('li');
			li.classList.add('clients__slide', 'slider__slide');
			const img = document.createElement('img');
			img.setAttribute('src', `https://logo.clearbit.com/${company}`);
			li.appendChild(img);
			this.container.appendChild(li);
		}
		super.createSlide();
	}
	resetSlide() {
		this.container.innerHTML = '';
		this.pagenation.innerHTML = '';
		this.createSlide();
	}
}

// ReviewSlide Class
class ReviewSlide extends Slide {
	constructor(name, data) {
		super(name, data);
	}
	createSlide() {
		for(let item of this.data) {
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
		super.createSlide();
	}
}

// NewsSlide Class (선택된 아이템이 가운데에 표시되는 슬라이드)
class NewsSlide extends Slide {
	constructor(name, data) {
		super(name, data);
		this.setMarginLeft = this.setMarginLeft.bind(this);
	}
	createSlide() {
		for(let item of this.data) {
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
		super.createSlide();
		this.setMarginLeft();
		window.addEventListener('resize', this.setMarginLeft);
	}
	setMarginLeft() {
		this.container.style.marginLeft
		= mediaSize === 's' ? `${this.slides[0].offsetWidth / 2}px`
		: mediaSize === 'm' || mediaSize === 'l' ? `${this.slides[0].offsetWidth}px`
		: '0';
	}
	resetSlide() {
		this.setMovement('none', -this.count * this.cloneCount * this.slides[0].offsetWidth);
		this.setPageButton(0);
	}
}

const breakpoints = {
	s: 768,
	m: 992,
	l: 1200,
}
let mediaSize = checkMediaSize();
function checkMediaSize() {
	return window.innerWidth >= breakpoints.l ? 'l'
	: window.innerWidth >= breakpoints.m ? 'm'
	: window.innerWidth >= breakpoints.s ? 's'
	: 'xs';
}

// 슬라이드 생성
const heroSlide = new HeroSlide('hero', null);
heroSlide.createSlide();

const dataSlides = {
	clientSlide: null,
	reviewSlide: null,
	newsSlide: null,
}
const sliders = document.querySelectorAll('.slider');
[...sliders].map(slider => getSlideData(slider));

// 창크기에 따라 슬라이드 수정
window.addEventListener('resize', () => {
	for(const key in dataSlides) {
		const slide = dataSlides[key];
		slide.resizing();
	}

	if(mediaSize !== checkMediaSize()) {
		mediaSize = checkMediaSize();
		dataSlides.clientSlide.count
		= mediaSize === 'l' ? Number(5)
		: mediaSize === 'm' ? Number(4)
		: mediaSize === 's' ? Number(3)
		: Number(1);
		dataSlides.clientSlide.resetSlide();
		dataSlides.newsSlide.resetSlide();
	}
});

/** 서버에서 슬라이드 관련 데이터를 가져와 슬라이드를 생성하는 함수 */
async function getSlideData(slider) {
	const name = slider.parentNode.classList.value;
	const data = await fetch(`https://inn-server.vercel.app/api/${name}`)
	.then(res => res.json())
	.catch(error => {throw new Error(error)});

	switch(name) {
		case 'clients': {
			dataSlides.clientSlide = new ClientSlide(name, data);
			dataSlides.clientSlide.count = mediaSize === 'l' ? Number(5)
			: mediaSize === 'm' ? Number(4)
			: mediaSize === 's' ? Number(3)
			: Number(1);
			return dataSlides.clientSlide.createSlide();
		}
		case 'reviews': {
			dataSlides.reviewSlide = new ReviewSlide(name, data);
			return dataSlides.reviewSlide.createSlide();
		}
		case 'news': {
			dataSlides.newsSlide = new NewsSlide(name, data);
			dataSlides.newsSlide.cloneCount = 2;
			return dataSlides.newsSlide.createSlide();
		}
	}
}
