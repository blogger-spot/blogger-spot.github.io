vue.router = function () {}
vue.router.create = function (data = [], hash = true) { return VueRouter.createRouter ({routes: data.map (function (data) { return {name: (data.name || Math.random ()), path: data.path, component: (data.template || data.component)} }), history: (hash ? VueRouter.createWebHashHistory () : VueRouter.createWebHistory ())}); }
vue.router.use = function () { return vue.router.link = VueRouter.useRouter (); }
vue.router.path = function (path) { if (path) return vue.router.link.currentRoute.value.path = path; else return vue.route.link.path; }
vue.router.resolve = function (router) { return vue.router.link.resolve (vue.router.to (router)); }
vue.router.resolve.uri = function (router) { return vue.router.resolve (router).fullPath; }
vue.router.id = function () { return vue.router.link.currentRoute.value.name; }
vue.router.previous = function (i = 1) { vue.router.link.go (- i); }
vue.router.next = function (i = 1) { vue.router.link.go (i); }
vue.router.url = function () { vue.router.url.path = vue.route.path (); vue.router.url.param = vue.route.param (); vue.router.url.query = vue.route.query (); }
vue.router.to = function (router) { if (typeof router === "string") { if (router.startsWith ("/")) return router; else return {name: router} } else { if (router.id) if (router.name = router.id) delete router.id; if (router.param) if (router.params = router.param) delete router.param; return router; } }

vue.route = function () {}
vue.route.use = function () { return vue.route.link = VueRouter.useRoute (); }
vue.route.path = function (path) { if (path) return vue.route.link.path === path; else return vue.route.link.path; }
vue.route.param = function (param) { if (param) if (Array.isArray (vue.route.link.params [param])) return vue.route.link.params [param].join ("/"); else return vue.route.link.params [param]; else return vue.route.link.params; }
vue.route.query = function (query) { if (query) { if (typeof query === "string") return vue.route.link.query [query]; else { for (var i in query) if (vue.route.link.query [i] !== query [i]) return false; return true; } } else return vue.route.link.query; }

vue ("router:view", `<router-view v-bind:key="$route.fullPath"/>`)
vue ("router:link", {
	prop: ["url", "scroll", "click"],
	setup () {
		return {}
		},
	template: `
		<a v-if="lib.is_url (url)" v-bind:href="url"><slot name="default"/></a>
		<router-link v-else-if="scroll" v-on:click="lib.scroll_to (scroll)"><slot name="default"/></router-link>
		<router-link v-else-if="url" v-on:click="click || function () {}" v-bind:to="vue.router.to (url)"><slot name="default"/></router-link>
		<a v-else><slot name="default"/></a>
		`,
	})
