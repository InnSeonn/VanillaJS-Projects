const navBtn = document.querySelector('.navBtn');
const fullNav = document.querySelector('.fullNav');
const navLliks = document.querySelectorAll('.links a');

navBtn.addEventListener('click', () => {
	fullNav.classList.toggle('show');
});

navLliks.forEach(v => v.addEventListener('click', (e) => goToScroll(e)));
const goToScroll = (e) => {
	e.preventDefault();
	const target = document.querySelector(e.target.getAttribute('href'));
	const timer = setInterval(() => {
		if(window.scrollY < target.offsetTop) {
			window.scrollTo(0, window.scrollY + (target.offsetTop / 100));
		} else {
			clearTimeout(timer);
		}
	}, 0);
}