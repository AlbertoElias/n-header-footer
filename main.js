/*jshint node:true,browser:true,-W030*/
import search from './src/js/search';
import checked from './src/js/checked';

const init = flags => {
	search.init(flags);
	checked.init(flags);
};

export default {
	init
};
