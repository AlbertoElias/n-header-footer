'use strict';

var verticalStep = 50; // roughly the height of the header

module.exports = {
	el: null,
	className: "",
	didScroll: false,
	lastPosition: 0,
	timer: null,

	init: function(el, className, flags) {
		this.el = el;
		this.lastPosition = document.body.scrollTop;
		this.className = className;

		window.onscroll = function() {
			this.didScroll = true;
			if(this.timer) return;

			this.timer = setInterval(this.throttle.bind(this), 200);
		}.bind(this);
	},

	throttle: function() {
		if(!this.didScroll) {
			clearInterval(this.timer);
			this.timer = null;

			return;
		}

		requestAnimationFrame(function() {
			this.scroll();
		}.bind(this));
		this.didScroll = false;
	},

	scroll: function() {
		// always show on top of the page
		if(document.body.scrollTop < verticalStep) {
			this.el.classList.remove(this.className);
			return;
		}

		// only respond to a scoll larger than the head itself
		var delta = document.body.scrollTop - this.lastPosition;

		if(delta > verticalStep) {
			this.el.classList.add(this.className);
			this.lastPosition = document.body.scrollTop;
		}

		// ignore bounceback past the page height
		if(document.body.scrollTop + window.innerHeight > document.body.offsetHeight) return;

		if(delta < -verticalStep) {
			this.el.classList.remove(this.className);
			this.lastPosition = document.body.scrollTop;
		}
	}
};
