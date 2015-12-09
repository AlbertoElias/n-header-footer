import search from './src/js/search';
import preventScroll from './src/js/prevent-scroll';
import toggle from './src/js/toggle';
import selected from './src/js/selected';
import editionToggler from './src/js/edition-toggler';

const init = flags => {
	search.init(flags);
	preventScroll.init();
	toggle.init(flags);
	selected.init(flags);
	editionToggler.init();
};

export default {
	init
};
