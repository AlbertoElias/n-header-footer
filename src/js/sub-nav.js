'use strict';

var nav = require('next-navigation/main');

module.exports = {

	init: function (flags) {
		nav.init(flags);

		var header = document.querySelector('.next-header');

		header.addEventListener('oExpander.expand', function(ev) {
			header.classList.add('next-header--expanded');
		});

		header.addEventListener('oExpander.collapse', function(ev) {
			header.classList.remove('next-header--expanded');
		});
	}

};
