<template>
	<b-link class="movie-item card" to="{ name: 'movie-detail', params: { id: movie.imdb }}">
		<div class="info">
			<span class="year">{{ movie.year }}</span>
			<span class="rating">{{ movie.rating }}</span>
		</div>
		<span class="hvr-radial-out">
			<i class="fas fa-play"></i>
			<span class="time">{{ movie.duration }} min</span>
		</span>
		<div :class="['title', ( showAlways ? 'show': '' )]">{{ movie.title }}</div>
	</b-link>
</template>

<script>
	export default {
		name: 'movie-item',
		components: {

		},
		props: [
			'movie'
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