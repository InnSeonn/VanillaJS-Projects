'use strict';

const worksList = document.querySelector('.works__list');
const filter = document.querySelector('.works__filter');
const moreBtn = document.querySelector('.works__moreBtn');

const displayCount = 3; //표시할 개수
let displayed = 0; //표시된 개수
let worksData = []; //서버에서 가져온 Works 데이터
let works = []; //Works Article HTML Element
let filteredWorks = []; //필터링 된 Works Article HTML Element

async function getData(url) {
	const res = await fetch(url);
	const json = await res.json();
	return json;
}
getData(`http://localhost:3001/works`).then(res => createWorksItem(res));

/** 서버에서 가져온 데이터를 통해 HTML 요소를 생성하는 함수*/
function createWorksItem(data) {
	worksData = data.works;
	let category = 'All Works';
	let html = '';

	for(let item of data.works) { //displayCount개의 아이템 표시
		const show = item.id <= displayCount ? true : false;
		if(show) displayed++;
		category += ', ' + item.category;
		html += `
		<article class="portfolio ${show ? 'show' : ''}" data-id="${item.id}">
			<div class="portfolio__item">
			<div class="portfolio__contents">
				<img class="portfolio__img" src="${item.image}" alt="">
				<a href="#" class="portfolio__links">
					<p class="portfolio__more icon-plus"></p>
					<p class="portfolio__name">${item.title}</p>
					<p class="portfolio__category">${item.category}</p>
				</a>
				</div>
			</div>
		</article>
		`;
	}
	worksList.insertAdjacentHTML('afterbegin', html);
	works = worksList.querySelectorAll('.portfolio');
	works.forEach(w => w.addEventListener('mouseenter', hovering));
	filteredWorks = [...works];
	html = '';

	//카테고리 버튼 추가
	category = [...new Set (category.split(', '))];
	for(let key of category) {
		const li = document.createElement('li');
		const btn = document.createElement('button');
		key === 'All Works' ? btn.classList.add('works__btn', 'active') : btn.classList.add('works__btn');
		btn.textContent = key;
		btn.addEventListener('click', filtering);
		li.appendChild(btn);
		filter.appendChild(li);
	}

	//더보기 버튼 표시
	if(works.length > displayCount) {
		moreBtn.style.visibility = 'visible';
		moreBtn.addEventListener('click', displayItem);
	}
}

/** displayCount개의 아이템을 표시하는 함수 */
function displayItem() {
	const count = displayed;
	for(let i = count; i < count + displayCount; i++) {
		if(filteredWorks[i] !== undefined) {
			filteredWorks[i].classList.add('show');
			displayed++;
		}
	}
	filteredWorks[displayed] === undefined ? moreBtn.style.visibility = 'hidden' : moreBtn.style.visibility = 'visible';	
}

/** 모든 데이터를 감추고 표시할 데이터의 목록과 표시된 수를 리셋하는 함수  */
function init() {
	filteredWorks.map(v => v.classList.remove('show'));
	filteredWorks = [];
	displayed = 0;
}

/** 카테고리에 해당하는 데이터를 필터링하는 함수 */
function filtering(e) {
	filter.querySelectorAll('.works__btn').forEach(btn => btn.classList.contains('active') ? btn.classList.remove('active') : '');
	e.target.classList.add('active');

	init();

	const category = e.target.textContent;
	if(category === 'All Works') {
		filteredWorks = [...works];
		displayItem();
		return ;
	}

	//카테고리에 해당하는 데이터의 id 값 찾기
	let id = worksData.map(data => {
		if(data.category.includes(category)) {
			return data.id.toString();
		}
	});

	works.forEach(w => id.indexOf(w.dataset.id) > 0 ? filteredWorks.push(w) : w.classList.remove('show'));
	displayItem();
}

function hovering(e) {
	const elem = e.currentTarget;
	elem.addEventListener('mousemove', showHover);
	elem.addEventListener('mouseleave', hideHover);
	elem.hoverElem = elem.querySelector('.portfolio__links');
	elem.left = elem.offsetLeft;
	elem.top = elem.offsetTop;
	elem.right = elem.left + elem.clientWidth;
	elem.bottom = elem.top + elem.clientHeight;
}

function showHover(e) {
	// if(e.pageX >= this.left - 5 && e.pageX <= this.left + 15) {
	// 	e.movementX > 0 ? this.hoverElem.style.animationName = 'inLeft' : this.hoverElem.style.animationName = 'outLeft';
	// } else if(e.pageX >= this.right - 5 && e.pageX <= this.right + 15) {
	// 	e.movementX < 0 ? this.hoverElem.style.animationName = 'inRight' : this.hoverElem.style.animationName = 'outRight';
	// } else if(e.pageY >= this.top - 5 && e.pageY <= this.top + 15) {
	// 	e.movementY > 0 ? this.hoverElem.style.animationName = 'inTop' : this.hoverElem.style.animationName = 'outTop';
	// } else if(e.pageY >= this.bottom - 5 && e.pageY <= this.bottom + 15) {
	// 	e.movementY < 0 ? this.hoverElem.style.animationName = 'inBottom' : this.hoverElem.style.animationName = 'outBottom';
	// }
	if(getComputedStyle(this.hoverElem).animationName.includes('in')) return;
	if(e.pageX >= this.left - 5 && e.pageX <= this.left + 15) {
		this.hoverElem.style.animationName = 'inLeft';
	} else if(e.pageX >= this.right - 5 && e.pageX <= this.right + 15) {
		this.hoverElem.style.animationName = 'inRight';
	} else if(e.pageY >= this.top - 5 && e.pageY <= this.top + 15) {
		this.hoverElem.style.animationName = 'inTop';
	} else if(e.pageY >= this.bottom - 5 && e.pageY <= this.bottom + 15) {
		this.hoverElem.style.animationName = 'inBottom';
	}
}

function hideHover(e) {
	this.removeEventListener('mousemove', showHover)
	this.removeEventListener('mouseleave', hideHover);

	if(e.pageX <= this.left + 15) {
		this.hoverElem.style.animationName = 'outLeft';
	} else if(e.pageX >= this.right - 15) {
		this.hoverElem.style.animationName = 'outRight';
	} else if(e.pageY <= this.top + 15) {
		this.hoverElem.style.animationName = 'outTop';
	} else if(e.pageY >= this.bottom - 15) {
		this.hoverElem.style.animationName = 'outBottom';
	}
}