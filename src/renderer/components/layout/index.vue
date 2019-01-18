<template>
	<div class="layout-core">
		<TopBar></TopBar>
		<Menu></Menu>
		<div class="layout-app">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import TopBar from './topbar.vue';
	import Menu from './menu.vue';

	export default {
		name: 'layout',
		components: { 
			TopBar,
			Menu,
		},
		methods: {
			// open(link) {
			// this.link = link;
			// require('electron').shell.openExternal(link);
			// },
		},
	};
</script>