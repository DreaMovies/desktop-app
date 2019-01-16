<template>
	<nav class="navbar header-top fixed-top navbar-expand-lg  navbar-dark bg-dark">
		<a class="navbar-brand" href="#">LOGO</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
		aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<Sidebar></Sidebar>
			<ul class="navbar-nav ml-md-auto d-md-flex">
				<li class="nav-item">
					<a class="nav-link" href="#">User</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">menu</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	import Sidebar from './sidebar.vue';
	export default {
		name: 'layout-menu',
		components: {
			Sidebar,
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
</style>