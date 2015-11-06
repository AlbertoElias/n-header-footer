const init = flags => {
	const checkedEls = document.querySelectorAll('.js-checked');
	console.log(checkedEls);
	[...checkedEls].forEach(checkedEl => {
		console.log(checkedEl);
		checkedEl.addEventListener('click', ev => {
			const forId = ev.target.getAttribute('for');
			document.querySelector(`#${forId}`).classList.toggle('checked');
		});
	})
};

export default {
	init
};
