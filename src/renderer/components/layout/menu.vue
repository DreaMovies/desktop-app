<template>
	<nav class="navbar header-top fixed-top navbar-expand-lg  navbar-dark bg-dark">
		<b-link class="navbar-brand" to="/index">LOGO</b-link>
		<button class="navbar-toggler" type="button" @click="toggleSidebar">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<Sidebar :expanded="isExpanded"></Sidebar>
			<ul class="navbar-nav ml-md-auto d-md-flex">
				<li class="nav-item">
					<b-link class="nav-link" to="/settings">User</b-link>
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
		data: function(){
			return {
				isExpanded: true
			}
		},
		methods: {
			toggleSidebar(){
				this.isExpanded = !this.isExpanded; 
			},
			// open(link) {
			// this.link = link;
			// require('electron').shell.openExternal(link);
			// },
		},
	};
</script>