const nav = require('./navigation');

module.exports = {

	init: function (flags) {
		nav.init(flags);

		const header = document.querySelector('.next-header');

		document
			.querySelector('.next-navigation-v2__checkbox')
			.addEventListener('change', function(ev) {
				if(ev.target.checked) {
					header.classList.add('next-header-v2--expanded');
				} else {
					header.classList.remove('next-header-v2--expanded');
				}
			});

	}

};
