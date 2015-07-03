/*jshint node:true,browser:true,-W030*/
'use strict';

var subNav = require('./src/js/sub-nav');
var search = require('./src/js/search');
var notified = require('./src/js/notified');

function init(flags) {
	subNav.init(flags);
	search.init(flags);
	notified.init(flags);
}

module.exports.init = init;
