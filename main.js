import search from './src/js/search';
import preventScroll from './src/js/prevent-scroll';
import toggle from './src/js/toggle';
import selected from './src/js/selected';

const init = flags => {
	search.init(flags);
	preventScroll.init();
	toggle.init(flags);
	selected.init(flags);
};

export default {
	init
};
