const Expander = require('o-expander');
const isOutside = require('./is-outside');

function $(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector));
}

module.exports = {
	init: function (flags) {

		document
			.querySelector('.next-navigation-v2__checkbox')
			.addEventListener('change', function(e) {
				const checked = e.target.checked;
				if(checked && (window.innerWidth <= 720)) {
					document.querySelector('html').style.overflow = 'hidden';
					document.body.style['overflow-y'] = 'hidden';
					document.body.style.position = 'fixed';
				} else {
					document.querySelector('html').style.overflow = '';
					document.body.style['overflow-y'] = '';
					document.body.style.position = 'static';
				}
			});

		const decorateNavItem = function(el) {
			const label = el.querySelector('.next-navigation-v2__link--sub-level-header');
			const toggle = el.querySelector('.next-navigation-v2__link--radio');

			if(!toggle || !label) return;

			const handler = function() {
				if(!toggle.checked) return;

				document.location.href = label.dataset.navigationHref;
			};

			label.addEventListener('touchend', handler);
			label.addEventListener('click', handler);
		};

		const headers = document.querySelectorAll('.next-navigation-v2__sub-nav .next-navigation-v2__group__item');
		for(let i = 0; i < headers.length; i++) {
			decorateNavItem(headers[i]);
		}
	}

};
