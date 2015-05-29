'use strict';

var session = require('next-session-client');

function getSessionValidity() {
	return session.validate();
}

function addClass(selector, className) {
	var items = document.querySelectorAll(selector);

	Array.prototype.forEach.call(items, function(item) {
		item.classList.add(className);
	});
}

function showLoggedOutItems() {
	addClass('.js-logged-out-tool', 'is-visible');
}

function showLoggedInItems() {
	addClass('.js-logged-in-tool', 'is-visible');
}

function init() {
	getSessionValidity()
		.then(function(sessionIsValid){
			if (sessionIsValid) {
				showLoggedInItems();
			} else {
				showLoggedOutItems();
			}
		}).catch(function(err) {
			setTimeout(function() {
				throw err;
			}, 0);
		});
}

module.exports = {
	init : init
};
