/*jshint node:true,browser:true,-W030*/
const subNav = require('./src/js/sub-nav');
const search = require('./src/js/search');

function init(flags) {
	subNav.init(flags);
	search.init(flags);
}

module.exports.init = init;
