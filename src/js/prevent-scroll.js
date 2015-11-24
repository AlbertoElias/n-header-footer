const init = () => {
	document.querySelector('.js-sub-nav-toggle').addEventListener('click', () => {
		document.documentElement.classList.toggle('next-navigation-is-open');
		document.getElementsByTagName('body')[0].classList.toggle('next-navigation-is-open');
	});	
};

export default { init: init };
