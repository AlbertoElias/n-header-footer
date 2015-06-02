'use strict';

var session = require('next-session-client');

function getSessionValidity() {
	return session.validate();
}

function init() {
	getSessionValidity()
		.then(function(sessionIsValid){
			document.documentElement.setAttribute('data-next-is-logged-in', sessionIsValid);
		}).catch(function(err) {
			setTimeout(function() {
				throw err;
			}, 0);
		});
}

module.exports = {
	init : init
};
