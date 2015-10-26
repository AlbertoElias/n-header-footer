/*jshint node:true,browser:true,-W030*/
const search = require('./src/js/search');

function init(flags) {
	search.init(flags);
}

module.exports.init = init;
