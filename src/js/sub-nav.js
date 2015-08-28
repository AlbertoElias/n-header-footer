'use strict';

var nav = require('./navigation');

module.exports = {

	init: function (flags) {
		nav.init(flags);

		var header = document.querySelector('.next-header');

		if (flags.get('mastheadV2')) {
			document
				.querySelector('.next-navigation-v2__checkbox')
				.addEventListener('change', function(ev) {
					if(ev.target.checked) {
						header.classList.add('next-header-v2--expanded');
					} else {
						header.classList.remove('next-header-v2--expanded');
					}
				});
		} else {

			header.addEventListener('oExpander.expand', function() {
				header.classList.add('next-header--expanded');
			});

			header.addEventListener('oExpander.collapse', function() {
				header.classList.remove('next-header--expanded');
			});
		}

	}

};
