<template>
	<div
		class="episode-item card"
		:style="{ 'background-image': 'url(\'' + item.poster + '\')' }"
		@click="showSources">
		<div class="info">
			<span class="year">{{ item.year }}</span>
			<span class="rating">{{ item.rating }}</span>
		</div>
		<span class="hvr-radial-out">
			<i class="fas fa-play"></i>
		</span>
		<div :class="['title', ( showAlways ? 'show': '' )]">{{ item.title }}</div>
	</div>
</template>

<script>
	export default {
		name: 'item-list',
		props: [
			'item', 'type', 'plugin'
		],
		data: function(){
			return {
				showAlways: false,
			}
		},
		created: function () {

		},
		methods: {
			showSources(){
				Event.$emit('sources-get', {
					season: this.item.season_number,
					episode: this.item.episode_number
				});
			}
		},
	};
</script>