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

	if(fullNav.classList.contains('show')) {
		fullNav.classList.remove('show');
	}

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
