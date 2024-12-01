var anjay = {};

function owl_carousel (element, reference, option) {
	option = option || {}
	var autoplay = false;
	if (option.play === "auto") autoplay = true;
	var oc = $ (element);
	if (oc) {
		oc.width ($ (reference).width () - (option.gap || 0) - 1);
		oc.owlCarousel ({
			onTranslated: option.on_translate || function () {},
			loop: true,
			nav: true,
			autoplay,
			margin: 10,
			stagePadding: option.stage_padding || 0,
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

function owl_carousel_extra (element, reference, option) {
	var data = $ (element);
	var child = data.children ();
	var child_length = child.length;
	var tmp = {};
	var each = [];
	var j = 0, x = 0;
	for (var i = 0; i < child_length; i ++) {
		if (tmp [x]) tmp [x].push (child [i]);
		else tmp [x] = [child [i]];
		j ++;
		if (j >= 20) {
			x ++;
			j = 0;
			}
		}
	for (var i in tmp) {
		var child_each = [];
		tmp [i].forEach (function (a) {
			var id = $ (a).attr ('id');
			var html = $ (a).html ();
			var thumbnail_extra = [];
			var extra = [];
			if (anjay [id]) {
				if (anjay [id].prop.rating) thumbnail_extra.push ("<div class='owl-carousel-thumbnail-rating'>" + ("<span class='material-symbol --round'>star</span>".repeat (anjay [id].prop.rating)) + "</div>");
				if (anjay [id].video.length) thumbnail_extra.push ("<div class='owl-carousel-thumbnail-video-length'>" + anjay [id].video.length + "</div>");
				if (anjay [id].title.origin) extra.push ("<div class='owl-carousel-title-origin'>" + anjay [id].title.origin + "</div>");
				}
			html = html.split ('<div thumbnail="' + id + '"></div>').join (thumbnail_extra.join (''));
			html = html.split ('<div extra="' + id + '"></div>').join (extra.join (''));
			child_each.push ("<div class='owl-carousel-item' id='" + id + "'>" + html + "</div>");
			});
		each.push ("<div class='owl-carousel-extra'>" + child_each.join ('') + "</div>");
		}
	$ (element).html (each.join (''));
	owl_carousel (element, reference, option);
	}

function owl_carousel_ajax (context) {
	$.ajax ({
		url: 'https://blogger-spot.github.io/client/bioskop/drama.json?' + Date.now (),
		type: "GET",
		dataType: "json",
		complete: function (ajax) {
			var data = ajax.responseJSON;
			for (var i in data) {
				if (data [i].id) {
					if (data [i].id.length) {
						var the = data [i];
						for (var x in the.id) {
							anjay [the.id [x]] = the;
							}
						}
					}
				}
			context ();
			}
		});
	}
