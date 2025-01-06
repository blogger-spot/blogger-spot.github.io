function vue (part, io) {
	if (io) {
		var v = {}
		if (typeof io === "string") {
			v.template = io;
			v.setup = function () { return vue.export (); }
			}
		else {
			if ("prop" in io) v.props = io.prop || [];
			if ("template" in io) v.template = io.template || "";
			if ("method" in io) v.methods = io.method || {}
			if ("setup" in io) v.setup = function (prop) { if (io.setup) return vue.export (io.setup (prop)); else return vue.export (); }
			if ("watch" in io) v.watch = io.watch;
			}
		if (part) return vue.part [part] = v;
		else return v;
		}
	else if (typeof part === "object") return vue (null, part);
	else return vue.part [part];
	}

vue.create = function (v) { return Vue.createApp (v); }
vue.part = {}
vue.partial = function (app) { for (var i in vue.part) app.component (i, vue.part [i]); }

vue.reference = function (... reference) { return Vue.ref (... reference); }
vue.reactive = function (... reactive) { return Vue.reactive (... reactive); }

vue.event = function () {}
vue.event.data = {}
vue.emit = function (key, ... value) { var data; for (var i in vue.event.data [key]) data = vue.event.data [key][i].call ({data}, ... value); return data; }
vue.on = function (key, value) { if (vue.event.data [key]) vue.event.data [key].push (value); else vue.event.data [key] = [value]; }

vue.export = function (data) {
	return {vue, lib: $$$, ... data}
	}

vue.setup = function () {
	vue.router.use ();
	vue.route.use ();
	vue.emit ("setup");
	}

vue.app = vue.create (vue ({
	setup () {
		vue.setup ();
		return {}
		},
	watch: {
		$route () {
			vue.router.url ();
			},
		},
	}));
