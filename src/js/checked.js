import Delegate from 'ftdomdelegate';

const init = () => {
	const delegate = new Delegate(document.querySelector('.js-header'));
	delegate.on('click', ev => {
		const target = ev.target;
		if (!target.classList.contains('js-checked')) {
			return;
		}
		const inputEl = document.querySelector(`#${ev.target.getAttribute('for')}`);
		if (inputEl.getAttribute('type') === 'checkbox') {
			inputEl.classList.toggle('checked');
		} else { // assume it's a radio button
			 // uncheck others
			[...document.querySelectorAll(`[name='${inputEl.getAttribute('name')}']`)].forEach(
				radioEl => radioEl.classList.remove('checked')
			);
			inputEl.classList.add('checked');
		}
	});
};

export default {
	init
};
