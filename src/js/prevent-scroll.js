const init = () => {
	document.querySelector('input[name=sub-nav]').addEventListener('change', () => {
		document.documentElement.classList.toggle('next-navigation-is-open');
	});	
};

export default { init: init };