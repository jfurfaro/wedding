// Globally expose jquery... because jquery
window.$ = window.jQuery = require('jquery');

// Because Waypoints module is broken, but still better than coding from scratch
require('waypoints/lib/jquery.waypoints.min.js');
require('waypoints/lib/shortcuts/sticky.min.js');

$(function(){

	// --------------------------------------------------
	// HEADER STUFF
	
	var stickyHeader = new Waypoint.Sticky({
		element: $('header')[0]
	});

	$('header nav').on('click', 'a', function(e){
		e.preventDefault();

		$('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - $('header').outerHeight(true)}, 700);
	});
	
	// END HEADER STUFF
	// --------------------------------------------------
	

	// --------------------------------------------------
	// PARALLAX HERO
	
	// Doing this half in vanilla JS and no one can stop me #sorrynotsorry
	var hero = $('#hero')[0],
		heroBGPosition = 0;
	$(window).scroll(function(){
		heroBGPosition = Math.floor(0.25 * window.scrollY);
		hero.style.backgroundPosition = 'center '+ heroBGPosition + 'px';
	});
	
	// END PARALLAX HERO
	// --------------------------------------------------


	// --------------------------------------------------
	// FUNKY BUS
	
	$('form#bus-signup').submit(function(e){
		// Never actually submit
		e.preventDefault();

		var passenger = $('input[name="passenger"]').val(),
			$this = $(this);

		if(passenger) {
			$this.children().prop('disabled', true);

			$.post($this.attr('action'), {passenger: passenger})
				.done(function(response){
					if(response.success) {
						$('input[name="passenger"]').val('');

						// Add a message
						$this.find('.error').remove();
						$this.append('<p>' + passenger + ' is signed up for the bus!</p>');
					} else {
						$this.find('.error').remove();
						$this.append('<p class="error">Something went wrong! Try again</p>');
						console.log(response.message);
					}
				})
				.fail(function(response){
					$this.find('.error').remove();
					$this.append('<p class="error">Something went wrong! Try again</p>');
					console.log(response.responseJSON.message);
				})
				.always(function(){
					// Enable the form again
					$this.children().prop('disabled', '');
				});
		} else {
			$this.find('.error').remove();
			$this.append('<p class="error">You forgot to put your name!</p>');
		}
	});
	
	// END FUNKY BUS
	// --------------------------------------------------
	

	// --------------------------------------------------
	// WEDDING PARTY
	
	var $bioContainer = $('#bio'),
		$bioFader = $bioContainer.children('div');

	if($(window).width() > 600) {
		$('.groomsman, .bridesmaid').click(function(){
			var $this = $(this),
				$bio = $this.children('div');

			if($this.hasClass('selected')) {
				$this.removeClass('selected');
				$bioContainer.children('div').fadeTo(400, 0, function(){
					$bioFader.html('');
					$bioContainer.height(0).addClass('closed');
					$bioFader.fadeTo(400, 1);	
				});
			} else {
				$('#wedding-party .selected').removeClass('selected');
				$this.addClass('selected');
				$bioFader.fadeTo(400, 0, function(){
					$bioFader.html($bio.html());
					$bioContainer.height($bioFader.outerHeight(true)).removeClass('closed');
					$bioFader.fadeTo(400, 1);	
				});
			}
		});
	} else {
		$('.groomsman, .bridesmaid').click(function(){
			$(this).toggleClass('selected');
		});
	}
	
	// END WEDDING PARTY
	// --------------------------------------------------

	// --------------------------------------------------
	// HASHTAG
	
	if($(window).width() > 600) {
		$('.instagram-link').click(function(){
			return false;
		});
	}
	
	// END HASHTAG
	// --------------------------------------------------
	
});
	
