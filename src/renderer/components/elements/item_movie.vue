<template>
	<b-link 
		class="movie-item card" 
		:to="'/movie-detail/' + plugin + '/' + movie.imdb_code + '/' + movie.id" 
		:style="{ 'background-image': 'url(\'' + movie.medium_cover_image + '\')' }">
		<div class="info">
			<span class="year">{{ movie.year }}</span>
			<span class="rating">{{ movie.rating }}</span>
		</div>
		<span class="hvr-radial-out">
			<i class="fas fa-play"></i>
			<span class="time">{{ movie.runtime }} min</span>
		</span>
		<div :class="['title', ( showAlways ? 'show': '' )]">{{ movie.title }}</div>
	</b-link>
</template>

<script>
	export default {
		name: 'item-movie',
		props: [
			'movie', 'plugin'
		],
		data: function(){
			return {
				showAlways: false
			}
		},
		methods: {
			// open(link) {
			// this.link = link;
			// require('electron').shell.openExternal(link);
			// },
		},
	};
</script>