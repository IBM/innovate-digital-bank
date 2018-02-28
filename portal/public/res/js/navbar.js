$(document).ready(function() {
	
	//Sticky navigation
	if (document.getElementById('js-section-features'))
		{
			var waypoint = new Waypoint({
			  element: document.getElementById('js-section-features'),
			  handler: function(direction) {
				if (direction == "down") $('nav').addClass('sticky-nav')
				else $('nav').removeClass('sticky-nav')
			  }
			})
		}
	
	//Mobile navigation 
	$('.mobile-nav-icon').click(function() {
		
		var icon = $('.js-mobile-nav-icon')
		$('.main-nav').slideToggle(200)
		
		if (icon.hasClass('ion-navicon-round')) {
			icon.removeClass('ion-navicon-round');
			icon.addClass('ion-close-round')
			
		}
		else if (icon.hasClass('ion-close-round')) {
			icon.removeClass('ion-close-round');
			icon.addClass('ion-navicon-round')
		}
		
	})
})