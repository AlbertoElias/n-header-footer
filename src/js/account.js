'use strict';

var session = require('next-session-client');

function getSessionValidity() {
	return session.validate();
}

function init(flags) {
	getSessionValidity()
		.then(function(sessionIsValid){
			document.documentElement.setAttribute('data-next-is-logged-in', sessionIsValid);
		}).catch(function(err) {
			setTimeout(function() {
				throw err;
			}, 0);
		});

	if(flags.get("anonymousMyFt")) {
		document.documentElement.setAttribute('data-next-anonymous-myft', 'on');
	}
}

module.exports = {
	init : init
};
