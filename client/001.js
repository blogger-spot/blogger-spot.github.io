/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.on ("setup", function () {
	console.log (123)
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.router ["/"] = vue ({
	setup () {
		console.log (1)
		return {}
		},
	template: `
		<div>
			{{ vue.router.url.path }}
			<router:link url="index">Home</router-link>
			-
			<router:link url="/p/about.html">About</router-link>
			-
			<router:link v-bind:url="{name: 'page', param: {slug: 'hello'}}">About Us</router-link>
			<div>router /</div>
		</div>
		`,
	})

vue.router ["try_catch"] = vue ({
	setup () {
		console.log (2)
		return {}
		},
	template: `
		<div>
			error
		</div>
		`,
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */
