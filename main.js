/*jshint node:true,browser:true,-W030*/
'use strict';

var subNav = require('./src/js/sub-nav');
var search = require('./src/js/search');

function init(flags) {
	subNav.init(flags);
	search.init(flags);
}

module.exports.init = init;
