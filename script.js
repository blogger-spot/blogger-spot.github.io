function owl_carousel (element, reference, gap = 0) {
	var oc = $ (element);
	if (oc) {
		oc.width ($ (reference).width () - gap);
		oc.owlCarousel ({
			loop: true,
			margin: 10,
			nav: true,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			responsive: {
				0: {items: 1},
				600: {items: 3},
				1000: {items: 5},
				},
			});
		}
	}
