const Expander = require('o-expander');
const isOutside = require('./is-outside');

function $(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector));
}

module.exports = {
	init: function (flags) {

		if (flags.get('mastheadV2')) {
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

		if (flags.get('globalNavigation') && !flags.get('mastheadV2')) {
			// convert top level links to button
			$('.js-sub-nav-toggle').forEach(function (toggleEl) {
				const innerHTML = toggleEl.innerHTML;
				const classes = toggleEl.className;
				const dataTrackable = toggleEl.getAttribute('data-trackable');
				toggleEl.outerHTML = '<button class="' + classes + '" data-trackable="' + dataTrackable + '">' + innerHTML + '</button>';
			});
			const nav = document.querySelector('.js-global-nav');
			let currentSubNav;
			// create expanders
			const expanders = Expander.init(nav, {
				toggleState: 'aria',
				toggleSelector: '.js-sub-nav-toggle'
			});

			nav.addEventListener('oExpander.expand', function (ev) {
				currentSubNav = ev.target;
			});
						// close if clicking outside the dropdown
			document.addEventListener('click', function (ev) {
				if (currentSubNav && isOutside(ev.target, currentSubNav)) {
					// close the currently open sub nav
					expanders.some(function (expander) {
						if (expander.el === currentSubNav) {
							expander.collapse();
							currentSubNav = null;
							return true;
						}
						return false;
					});
				}
			}, true);
		}
	}

};
