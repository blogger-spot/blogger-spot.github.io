function owl_carousel (element, reference, option) {
	option = option || {}
	var oc = $ (element);
	if (oc) {
		oc.width ($ (reference).width () - (option.gap || 0));
		oc.owlCarousel ({
			loop: true,
			margin: 10,
			nav: true,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			responsive: option.responsive || {
				0: {items: 1},
				600: {items: 3},
				1000: {items: 5},
				},
			});
		}
	}
