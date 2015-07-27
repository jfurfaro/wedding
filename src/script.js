// Globally expose jquery... because jquery
window.$ = window.jQuery = require('jquery');

// Because Waypoints module is broken, but still better than coding from scratch
require('waypoints/lib/jquery.waypoints.min.js');
require('waypoints/lib/shortcuts/sticky.min.js');

var stickyHeader = new Waypoint.Sticky({
	element: $('header')[0]
});

// Doing this half in vanilla JS and no one can stop me
var hero = $('#hero')[0],
	heroBGPosition = 0;
$(window).scroll(function(){
	heroBGPosition = Math.floor(0.25 * window.scrollY);

	hero.style.backgroundPosition = 'center '+ heroBGPosition + 'px';
});
