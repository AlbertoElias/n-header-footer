'use strict';

var Expander = require('o-expander');
var isOutside = require('./is-outside');

function $(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector));
}

module.exports = {
	init: function (flags) {
		if (flags.get('globalNavigation')) {
			// convert top level links to button
			$('.js-sub-nav-toggle').forEach(function (toggleEl) {
				var innerHTML = toggleEl.innerHTML;
				var classes = toggleEl.className;
				var dataTrackable = toggleEl.getAttribute('data-trackable');
				toggleEl.outerHTML = '<button class="' + classes + '" data-trackable="' + dataTrackable +'">' + innerHTML + '</button>';
			});
			var nav = document.querySelector('.js-global-nav');
			var currentSubNav;
			// create expanders
			var expanders = Expander.init(nav, {
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