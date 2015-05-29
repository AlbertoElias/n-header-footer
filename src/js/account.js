'use strict';

var session = require('next-session-client');

var accountToolsClass = 'next-header__primary-tools__account';
var loginLinkClass = 'next-header__primary-tools__login-link';
var logoutLinkClass = 'next-header__primary-tools__logout-link';
var myAccountLinkClass = 'next-header__primary-tools__my-account-link';
var myFTLinkClass = 'next-header__primary-tools__mypage';

function getSessionValidity() {
	return session.validate();
}

function showLogOutLink() {
	document.querySelector('.' + loginLinkClass).classList.remove(loginLinkClass + '--visible');
	document.querySelector('.' + logoutLinkClass).classList.add(logoutLinkClass + '--visible');
	document.querySelector('.' + myAccountLinkClass).classList.add(myAccountLinkClass + '--visible');
	document.querySelector('.' + myFTLinkClass).classList.add(myFTLinkClass + '--visible');
}

function showLogInLink() {
	document.querySelector('.' + logoutLinkClass).classList.remove(logoutLinkClass + '--visible');
	document.querySelector('.' + loginLinkClass).classList.add(loginLinkClass + '--visible');
	document.querySelector('.' + myAccountLinkClass).classList.remove(myAccountLinkClass + '--visible');
	document.querySelector('.' + myFTLinkClass).classList.remove(myFTLinkClass + '--visible');
}

function showAccountTools() {
	document.querySelector('.' + accountToolsClass).classList.add(accountToolsClass + '--visible');
}

function init() {
	getSessionValidity()
		.then(function(sessionIsValid){
			if (sessionIsValid) {
				showLogOutLink();
			} else {
				showLogInLink();
			}

			showAccountTools();
		}).catch(function(err) {
			setTimeout(function() {
				throw err;
			}, 0);
		});
}

module.exports = {
	init : init
};
