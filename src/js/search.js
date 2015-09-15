/*jshint node:true,browser:true,-W030*/
'use strict';

var Typeahead = require('./typeahead');
var isOutside = require('./is-outside');

// Source: https://gist.github.com/davidcalhoun/702826
var transitionEventName = function(el) {
	var transition;

	if('ontransitionend' in window) {
		transition = 'transitionend';
	} else if('onwebkittransitionend' in window) {
		transition = 'webkitTransitionEnd';
	} else if('onotransitionend' in el || navigator.appName === 'Opera') {
		transition = 'oTransitionEnd';
	} else {
		transition = false;
	}

	return transition;
};

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

		var form = document.querySelector('.js-search');
		var toggle = document.querySelector('.js-search-toggle');
		var input = document.querySelector('.js-search-input');
		var placeholder = document.querySelector('.js-search-placeholder');

		var transition = transitionEventName(form);
		var transitionHandler = function() {
			var visibility = getComputedStyle(form, null).getPropertyValue('visibility');

			if(visibility === 'visible')
				input.focus();

			form.removeEventListener(transition, transitionHandler);
		};

		if(placeholder) {
			input.addEventListener('keyup', function() {
				if(input.value.length > 0) {
					placeholder.style.display = 'none';
				} else {
					placeholder.style.display = 'block';
				}
			});
		}

		if(toggle) {
			var clickHandler = function() {
				if(transition) {
					form.addEventListener(transition, transitionHandler);
				} else {
					setTimeout(transitionHandler, 300);
				}

				return true;
			};

			toggle.addEventListener('touchend', clickHandler);
			toggle.addEventListener('click', clickHandler);
		}

		if (flags.get('typeahead')) {
			var container = (flags.get('mastheadV2') ?  header.querySelector('.js-suggestions-container') : header.querySelector('.js-search'));

			var typeahead = new Typeahead(
				container,
				input,
				'//' + window.location.host + '/search-suggestions?flatten=true&limit=5&q=',
				flags
			);

			if(toggle) {
				var handler = function() {
					typeahead.hide();
				};

				toggle.addEventListener('touchend', handler);
				toggle.addEventListener('click', handler);
			}
		}
	}

};
