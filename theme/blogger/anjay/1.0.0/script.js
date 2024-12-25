var anjay = {};

function owl_carousel (element, reference, option) {
	option = option || {}
	var autoplay = false;
	var auto_width = false;
	var loop = true;
	var nav = true;
	var nav_dot = true;
	if (option.play === "auto") autoplay = true;
	if (option.width === "auto") auto_width = true;
	if (option.nav === false) nav = false;
	if (option.dot === false) nav_dot = false;
	if ("loop" in option) loop = option.loop;
	var oc = $ (element);
	if (oc) {
		oc.width ($ (reference).width () - (option.gap || 0) - 1);
		oc.owlCarousel ({
			onTranslated: option.on_translate || function () {},
			loop,
			center: option.center || false,
			nav, dots: nav_dot,
			autoplay,
			margin: 10,
			autoWidth: auto_width || false,
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
				if (null) if (anjay [id].title.origin) extra.push ("<div class='owl-carousel-title-origin'>" + anjay [id].title.origin + "</div>");
				if (anjay [id].type === "adult") {}
				else if (anjay [id].type === "movie") extra.push ("<div class='owl-carousel-episode'></div>");
				else if (anjay [id].type === "drama") {
					if (anjay [id].prop.episode.total && anjay [id].prop.episode.current) extra.push ("<div class='owl-carousel-episode'>Episode " + anjay [id].prop.episode.current + "/" + anjay [id].prop.episode.total + "</div>");
					else if (anjay [id].prop.episode.total) extra.push ("<div class='owl-carousel-episode'>" + anjay [id].prop.episode.total + " Episode's</div>");
					}
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

function body_class () {
	var type = 'phone';
	var body = $ ('body').innerWidth ();
	if (body > 600) type = 'tablet';
	if (body > 1000) type = 'computer';
	$ ('body').removeClass ('computer mobile tablet phone');
	$ ('body').addClass (type);
	}

function body_click (event) {
	if ($ ('body').hasClass ('phone')) {
		if ($ (event.target).is ('[id="menu:toggle"]') || $ (event.target).is ('[id="menu:toggle"] *')) $ ('#menu').css ('display', 'flex');
		else if ($ ('#menu').css ('display') === 'flex') if (!$ (event.target).is ('.phone #blog > #main > #menu *')) $ ('#menu').css ('display', 'none');
		}
	}

function button_section () {
	$ ('button').focus (function (event) {
		var element = $ (event.target).children ('section.transition-opacity');
		$ (event.target).blur (function () {
			element.removeClass ('transition-opacity-alpha');
			});
		if (element.css ('display') === 'flex') {
			element.addClass ('transition-opacity-alpha');
			}
		});
	}

/*
$ (document).ready (function () {
	body_class ();
	owl_carousel ('#owl-001', '#blog > #main > section', {
		gap: 20,
		responsive: {
			0: {items: 2},
			600: {items: 3},
			1000: {items: 5},
			},
		});
	});
$ (window).on ('resize', function () {
	body_class ();
	});
$ (document).click (function (event) {
	body_click (event);
	});
$ ('button').focus (function (event) {
	var ch = $ (event.target).children ('section.transition-opacity');
	$ (event.target).blur (function () {
		ch.removeClass ('transition-opacity-ex');
		});
	if (ch.css ('display') === 'flex') {
		ch.addClass ('transition-opacity-ex');
		}
	});
*/
