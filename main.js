/*jshint node:true,browser:true,-W030*/
'use strict';

var subNav = require('./src/js/sub-nav');
var search = require('./src/js/search');
var sticky = require('./src/js/sticky');

function init(flags) {
	subNav.init(flags);
	search.init(flags);

	var nav = document.querySelector('.next-header__row--primary');
	sticky.init(nav, "next-header__row--primary--hidden", flags);
}

module.exports.init = init;
