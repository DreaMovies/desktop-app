<template>
	<ul class="navbar-nav side-nav">
		<li class="nav-item">
			<!-- literal string -->
			<b-link class="nav-link" to="index">Index</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link" to="local-media">Local Media</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link disabled " to="local-media">API's</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link" to="local-media">Dreamovies</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link" to="local-media">EZTV</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link" to="local-media">YTS</b-link>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'layout-sidebar',
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

<style>

</style>