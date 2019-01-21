<template>
	<ul :class="['navbar-nav side-nav', (expanded ? 'nav-open' : 'nav-closed')]">
		<li class="nav-item">
			<!-- literal string -->
			<b-link class="nav-link" to="/index">Index</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link" to="/local-media">Local Media</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link disabled">API's</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link" to="/movie-list/dreamovies">Dreamovies</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link" to="/movie-list/eztv">EZTV</b-link>
		</li>
		<li class="nav-item">
			<b-link class="nav-link" to="/movie-list/yts">YTS</b-link>
		</li>
		<b-nav-item v-for="item in list">{{ item.config.label }}</b-nav-item>
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