<template>
	<ul :class="['navbar-nav side-nav', (expanded ? 'nav-open' : 'nav-closed')]">
		<b-nav-item class="text-white" to="/index">Home</b-nav-item>
		<b-nav-item class="text-white" to="/local-media">Local Media</b-nav-item>
		<b-dropdown-header>API's</b-dropdown-header>
		<b-nav-item v-for="item in list" :key="item.config.name" class="text-white" :to="'/' + item.config.type + '-list/' + item.config.name">{{ item.config.label }}</b-nav-item>
	</ul>
</template>

<script>
	export default {
		name: 'layout-sidebar',
		props: [
			'expanded'
		],
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

	//$(document).ready(function(){
	//	$('.button-left').click(function(){
	//		$('.sidebar').toggleClass('fliph');
	//	});
	//});
</script>