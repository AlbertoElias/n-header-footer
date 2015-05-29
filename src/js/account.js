'use strict';

var session = require('next-session-client');

function getSessionValidity() {
	return session.validate();
}

function init() {
	var primaryTools = document.querySelector('.js-primary-tools');

	getSessionValidity()
		.then(function(sessionIsValid){
			primaryTools.classList.add(sessionIsValid ? 'is-logged-in' : 'is-logged-out');
		}).catch(function(err) {
			setTimeout(function() {
				throw err;
			}, 0);
		});
}

module.exports = {
	init : init
};
