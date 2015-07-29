'use strict';

var supportsStorage = require('./supports-storage');
var session = require('next-session-client');
var seenKey = 'ftNextNotificationCount';

function getSeenCount() {
	if (!supportsStorage) {
		return 0;
	}

	var count = sessionStorage.getItem(seenKey);

	return count ? parseInt(count, 10) : 0;
}

function setSeenCount(count) {
	if (!supportsStorage) {
		return 0;
	}

	return sessionStorage.setItem(seenKey, count);
}

module.exports = {

	init: function(flags) {
		session.uuid().then(function (obj) {
			var myftLink = document.querySelector('.next-header__primary-tools__myft a');
			if (myftLink) {
				myftLink.href = '/myft/' + obj.uuid;
			}

		});

		// Listen for the notification poller to report the number of new items
		// Not wrapped in flag as it's inert if user prefs not on
		document.addEventListener('myft.articleFromFollow.load', function(ev) {
			var notifications = ev.detail;
			var count = parseInt(notifications.Count, 10);
			var myPageLink = document.querySelector('.js-my-page-tool');

			// HACK: Handle anonymous user. Won't be needed once we're fully on the new membership APIs
			if (!myPageLink) {
				return;
			}
			var seenCount = getSeenCount();
			setSeenCount(count);

			if (count > 0) {
				myPageLink.classList.add('next-header__primary-tools__mypage--notification');

				if (flags.get('myFTHeaderAnimation') && count > seenCount) {
					myPageLink.classList.remove('next-header__primary-tools__mypage--pulse');
					myPageLink.classList.add('next-header__primary-tools__mypage--pulse');
				}

				myPageLink.setAttribute('data-trackable', 'my-ft | notification');
			} else {
				myPageLink.classList.remove('next-header__primary-tools__mypage--notification');
				myPageLink.classList.remove('next-header__primary-tools__mypage--pulse');
				myPageLink.setAttribute('data-trackable', 'my-ft');
			}
		});
	}

};
