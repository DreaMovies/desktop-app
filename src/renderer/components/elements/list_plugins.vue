<template>
	<b-nav vertical class="w-25">
		<b-nav-item v-for="item in list">{{ item.config.label }}</b-nav-item>
	</b-nav>
</template>

<script>
	export default {
		name: 'list-plugins',
		data: function(){
			return {
				list: []
			}
		},
        created() {
			this.list = this.$plugins;
		},
		methods: {
			// open(link) {
			// this.link = link;
			// require('electron').shell.openExternal(link);
			// },
		},
	};
</script>