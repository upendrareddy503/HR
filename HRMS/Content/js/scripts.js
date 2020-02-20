$('.owl-testimonials').owlCarousel({
			loop: false,
			margin: 10,
			dots:true,
			smartSpeed: 450,
			navText: [
				'<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>',
				
			],
			autoplay: true,
			autoplayHoverPause: false,
			responsive: {
				0: {
					items: 1,
					nav: false,
					loop: true,
					dots:true
				},
				600: {
					items: 1,
					nav: false,
					loop: true,
					dots:true
				},
				1000: {
					items: 1,
					nav: false,
					dots:true
				}
			}
		});

	
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}



		