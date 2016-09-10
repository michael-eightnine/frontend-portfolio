// var gridInit = function() {
// 	//reveal on scroll
// 	window.sr = ScrollReveal({ reset: true });
// 	setTimeout(function() {
// 		sr.reveal('.grid-item', { duration: 700, viewFactor  : 0.2, scale: 1, viewOffset: { top: 60 }, reset: false});
// 	}, 0);
//
// 	//smooth scroll to link
// 	var $root = $('html, body');
// 	$('a.scroll-link').click(function(e) {
// 		e.preventDefault();
// 	    $root.animate({
// 	        scrollTop: $( $.attr(this, 'href') ).offset().top - 50
// 	    }, 500);
// 	    if ( $('#menuTrigger').hasClass("open") ) {
// 	    	$('#menuTrigger').removeClass("open");
// 			$('#nav-menu-links').slideUp(250);
// 	    }
// 	    return false;
// 	});
//
// 	//mobile menu
// 	$('#menuTrigger').click(function() {
// 		$(this).toggleClass("open");
// 		$('#nav-menu-links').slideToggle(250);
// 	})
// }
