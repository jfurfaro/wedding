// Globally expose jquery... because jquery
window.$ = window.jQuery = require('jquery');

// Because Waypoints module is broken, but still better than coding from scratch
require('waypoints/lib/jquery.waypoints.min.js');
require('waypoints/lib/shortcuts/sticky.min.js');

$(function(){

	var stickyHeader = new Waypoint.Sticky({
		element: $('header')[0]
	});

	$('header nav').on('click', 'a', function(e){
		e.preventDefault();

		$('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - $('header').outerHeight(true)}, 700);
	});

	// Doing this half in vanilla JS and no one can stop me
	var hero = $('#hero')[0],
		heroBGPosition = 0;
	$(window).scroll(function(){
		heroBGPosition = Math.floor(0.25 * window.scrollY);
		hero.style.backgroundPosition = 'center '+ heroBGPosition + 'px';
	});

	// --------------------------------------------------
	// MAPS
	
	// var leoCarrilloMap = new google.maps.Map($('#details .map')[0], {zoom: 12, center: {lat: 33.126940, lng: -117.261104}}),
	// 	leoCarrilloWindow = new google.maps.InfoWindow(),
	// 	service = new google.maps.places.PlacesService(leoCarrilloMap);

	// service.getDetails({placeId: 'ChIJDUlhy8103IARGm0ZFFd9Twk'}, function(place, status) {
	// 	if (status == google.maps.places.PlacesServiceStatus.OK) {
	// 		var leoCarilloMarker = new google.maps.Marker({
	// 			map: leoCarrilloMap,
	// 			position: place.geometry.location
	// 		});
	// 			leoCarrilloWindow.setContent(place.name);
	// 			leoCarrilloWindow.open(leoCarrilloMap, leoCarilloMarker);
	// 	}
	// });
	
	// END MAPS
	// --------------------------------------------------
	
});
	
