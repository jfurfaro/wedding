$(function() {
	$('p').attr('contentEditable', true)
		.on('keypress', function(e){
			if(e.which == 13) {
				e.preventDefault();

				$(this).blur();
			}
		})
		.on('blur', function(){
			// Save content
		});

	// Make the links non-clickable
	$('a').off().click(function(e){
		e.preventDefault();
	});
})