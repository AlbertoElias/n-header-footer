import isOutside from './is-outside';

class EditionSwitcher {
	constructor(editionSwitcherEl) {
		const btnEl = (editionSwitcherEl) ? editionSwitcherEl.querySelector('.js-edition-switcher-button') : null;

		if (!btnEl) { return; }

		this.editionSwitcherEl = editionSwitcherEl;
		this.openClass = 'edition-switcher--open';
		this.isOpen = false;

		btnEl.addEventListener('click', this.toggle.bind(this));
		document.body.addEventListener('click', this.click.bind(this));
	}

	toggle() {
		this.isOpen = !this.isOpen;
		this.editionSwitcherEl.classList.toggle(this.openClass);
	}

	click(ev) {
		if (this.isOpen && isOutside(ev.target, this.editionSwitcherEl)) {
			this.toggle();
		}
	}
}

export default {
	init: (editionSwitcherEl, flags) => {
		if (flags.get('editionSwitcher')) {
			new EditionSwitcher(editionSwitcherEl);
		}
	}
}
