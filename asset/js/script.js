$.odbc = {}
$.label = {
	name: {
		"top-global": "Top Global",
		"top-10": "Top 10",
		"trending": "Trending",
		"featured": "Featured",
		"popular": "Popular",
		"editor-choice": "EditorChoice",
		"movie": "Movie",
		"drama": "Drama",
		"tv-show": "TV Show",
		"playlist": "Playlist",
		"episode": "Episode",
		"group": "Group",

		"international": "International",
		"united-state": "United State",
		"united-kingdom": "United Kingdom",
		"france": "France",
		"russia": "Russia",
		"spain": "Spain",
		"germany": "Germany",
		"brazil": "Brazil",
		"asia": "Asia",
		"arab": "Arab",
		"india": "India",
		"indonesia": "Indonesia",
		"malaysia": "Malaysia",
		"korea": "Korea",
		"china": "China",
		"japan": "Japan",
		"thailand": "Thailand",
		"vietnam": "Vietnam",
		"philippine": "Philippine",

		"action": "Action",
		"adventure": "Adventure",
		"comedy": "Comedy",
		"cooking": "Cooking",
		"crime": "Crime",
		"dance": "Dance",
		"family": "Family",
		"fantasy": "Fantasy",
		"game": "Game",
		"horror": "Horror",
		"musical": "Musical",
		"medical": "Medical",
		"mystery": "Mystery",
		"racing": "Racing",
		"romance": "Romance",
		"sci-fi": "Sci-Fi",
		"science": "Science",
		"sport": "Sport",
		"thriller": "Thriller",
		"war": "War",
		},
	}

function owl_carousel (element, reference, option) {
	option = option || {}
	var timeout = 5000;
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
	if ("timeout" in option) timeout = option.timeout;
	var oc = $ (element);
	if (oc) {
		oc.width ($ (reference).width () - (option.gap || 0) - 1);
		oc.owlCarousel ({
			onTranslated: option.on_translate || function () {},
			gap: (option.gap || 0) - 1,
			loop,
			center: option.center || false,
			nav, dots: nav_dot,
			autoplay,
			margin: 10,
			autoWidth: auto_width || false,
			stagePadding: option.stage_padding || 0,
			autoplayTimeout: timeout,
			autoplayHoverPause: true,
			responsive: option.responsive || {
				0: {items: 1},
				600: {items: 3},
				1000: {items: 5},
				},
			});
		}
	}

function owl_carousel_group (element, reference, option, item) {
	option = option || {group: {}};
	option.group = option.group || {};
	var data = $ (element).children ();
	var tmp = {};
	var group = [];
	var j = 0, x = 0;
	for (var i = 0; i < data.length; i ++) {
		if (tmp [x]) tmp [x].push (data [i]);
		else tmp [x] = [data [i]];
		j ++;
		if (j >= (item || 20)) {
			x ++;
			j = 0;
			}
		}
	for (var i in tmp) {
		var child = [];
		tmp [i].forEach (function (e) {
			var permalink = $ (e).attr ('permalink');
			var html = $ (e).html ();
			var odbc = $.odbc [permalink];
			if (odbc) {
				if (odbc.prop.rating) html = html.split ('<div class="owl-carousel-thumbnail-rating"></div>').join ("<div class='owl-carousel-thumbnail-rating'>" + (("<span class='icon:material'>star</span>").repeat (odbc.prop.rating)) + "</div>"); else html = html.split ('<div class="owl-carousel-thumbnail-rating"></div>').join ("");
				if (odbc ["country:flag"] && odbc ["country:flag"].length) { var country_flag = []; for (var i in odbc ["country:flag"]) country_flag.push ("<img src='https://blogger-spot.github.io/asset/image/flag/" + odbc ["country:flag"][i] + ".jpg'/>"); html = html.split ('<div class="owl-carousel-thumbnail-flag"></div>').join ("<div class='owl-carousel-thumbnail-flag'>" + country_flag.join ('') + "</div>"); } else html = html.split ('<div class="owl-carousel-thumbnail-flag"></div>').join ("");
				if (odbc.video.quality) html = html.split ('<div class="owl-carousel-thumbnail-video-quality"></div>').join ("<div class='owl-carousel-thumbnail-video-quality'>" + odbc.video.quality + "</div>"); else html = html.split ('<div class="owl-carousel-thumbnail-video-quality"></div>').join ("");
				if (odbc.video.length) html = html.split ('<div class="owl-carousel-thumbnail-video-length"></div>').join ("<div class='owl-carousel-thumbnail-video-length'>" + odbc.video.length + "</div>"); else html = html.split ('<div class="owl-carousel-thumbnail-video-length"></div>').join ("");
				}
			html = html.split ('<div thumbnail="' + permalink + '"></div>').join ("");
			html = html.split ('<div post="' + permalink + '"></div>').join ("");
			child.push ("<div class='owl-carousel-item' permalink='" + permalink + "'>" + html + "</div>");
			});
		group.push ("<div class='" + (option.group.css || "owl-carousel-group") + "'>" + child.join ('') + "</div>");
		}
	$ (element).hide ();
	var group_element = element + '-group';
	$ (group_element).html (group.join (''));
	owl_carousel (group_element, reference, {gap: 20, timeout: 30000, play: 'auto', nav: false, responsive: {0: {items: 1}, 1000: {items: 1}}});
	}

function owl_carousel_odbc (context, url) {
	$.ajax ({
		url: url + '?' + Date.now (),
		type: "GET",
		dataType: "json",
		complete: function (ajax) {
			var data = ajax.responseJSON;
			for (var i in data) {
				if (data [i].permalink) {
					if (data [i].permalink.length) {
						for (var x in data [i].permalink) {
							$.odbc [data [i].permalink [x]] = data [i];
							}
						}
					}
				}
			if (context) context ();
			}
		});
	}

function body_class () {
	var type = 'phone';
	var orientation = 'portrait';
	var body = $ ('body').innerWidth ();
	if (body > 600) type = 'phone';
	if (body > 1000) type = 'computer';
	if ($ ('body').width () > $ ('body').height ()) orientation = "landscape";
	$ ('body').removeClass ('computer mobile tablet phone');
	$ ('body').addClass (type).addClass (orientation);
	}

function body_click (event) {
	if ($ ('body').hasClass ('phone')) {
		if ($ (event.target).is ('[id="menu:toggle"]') || $ (event.target).is ('[id="menu:toggle"] *')) $ ('#menu').css ('display', 'flex');
		else if ($ ('#menu').css ('display') === 'flex') if (!$ (event.target).is ('.phone #menu *')) $ ('#menu').css ('display', 'none');
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

function theme_mode (color = '#98c379') {
	if ($ ('body').attr ('theme') === 'night') {
		$ ('#theme-mode-icon').css ('color', color).html ('toggle_on');
		}
	}

function theme_mode_set (mode) {
	theme_mode.style = mode || 'default';
	$ ('body').attr ('theme', mode);
	if (mode === 'default') $ ('#theme-mode-icon').css ('color', '#61aeef').html ('toggle_off');
	if (mode === 'night') $ ('#theme-mode-icon').css ('color', '#98c379').html ('toggle_on');
	}

function the_video (... video) {
	$ (document).ready (function () {
		video_player (... video);
		});
	}

function video_player (video, direct_link, overlay_timeout) {
	$ ("[id='player:overlay']").click (function (element) {
		$ ("[id='player:overlay']").hide ();
		window.open ((direct_link || video_player.direct_link), "_blank");
		setTimeout (function () { $ ("[id='player:overlay']").show (); }, (60000 * (overlay_timeout || 3)));
		});
	setTimeout (function () {
		var height = ($ ("#player").width () / 16) * 9;
		$ ("[id='player:overlay']").css ("width", "100%").css ("height", height + "px");
		$ ("[id='player:frame']").css ("width", "100%").css ("height", height + "px").attr ("src", video.embed_url);
		$ ("button[id='video:download']").click (function () {
			window.open ((direct_link || video_player.direct_link), "_blank");
			location.href = video.download_url;
			});
		}, 1000);
	}
