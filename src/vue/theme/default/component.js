vue ("button:test", {
	setup () {},
	template: `
		<button><slot name="default"/></button>
		`,
	})

vue ("icon:material", {
	prop: ["src"],
	template: `
		<span v-if="src" class="icon:material">{{ src }}</span>
		<span class="icon:material" v-else><slot name="default"></span>
		`,
	})
