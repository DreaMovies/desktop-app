<template>
	<div class="app-layout">
		<TopBar></TopBar>
		<Menu></Menu>
		<div class="container-fluid">
			base-layout
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

<style>
	body{
		background:#f9f9f9;
	}
	.app-layout{
		padding:60px 205px;
	}
	.navbar-expand-lg .navbar-nav.side-nav{
		flex-direction: column;
	}
	.card{
		margin-bottom: 15px;
		border-radius:0;
		box-shadow: 0 3px 5px rgba(0,0,0,.1);
	}
	.header-top{
		box-shadow: 0 3px 5px rgba(0,0,0,.1)
	}
	@media(min-width:992px) {
		#wrapper{
			margin-left: 200px;
			padding: 90px 15px 15px;
		}
		.navbar-nav.side-nav{
			background: #585f66;
			box-shadow: 2px 1px 2px rgba(0,0,0,.1);
			position:fixed;
			top:56px;
			flex-direction: column!important;
			left:0;
			width:200px;
			overflow-y:auto;
			bottom:0;
			overflow-x:hidden;
			padding-bottom:40px
		}
	}
</style>