/*jshint node:true,browser:true,-W030*/
'use strict';

var Typeahead = require('./typeahead');
var isOutside = require('./is-outside');

module.exports = {

	init: function(flags) {
		var header = document.querySelector('.next-header');

		// handle clicking outside the subnav to collapse
		document.addEventListener('click', function (ev) {
			if (isOutside(ev.target, '.next-header__search-toggle') && isOutside(ev.target, '.js-search')) {
				header.classList.remove('next-header--searching');
			} else if (ev.target.classList.contains('next-header__search-toggle')) {
				header.classList.toggle('next-header--searching');
				header.querySelector('.next-header__search-form__input').focus();
			}
		});

		if (flags.get('typeahead')) {
			new Typeahead(
				header.querySelector('.js-search'),
				'//' + window.location.host + '/search-suggestions?flatten=true&limit=5&q=',
				flags.get('userPrefsUseConceptId')
			);
		}
	}

};
