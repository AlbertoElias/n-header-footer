import search from './src/js/search';
import checked from './src/js/checked';
import preventScroll from './src/js/prevent-scroll';

const init = flags => {
	search.init(flags);
	checked.init(flags);
	preventScroll.init();
};

export default {
	init
};
