<template>
	<b-link
		class="episode-item card"
		:style="{ 'background-image': 'url(\'' + item.poster + '\')' }"
		:to="{
                            name: 'player',
                            params: {
                                detail: {
                                    type: type,
                                    plugin: params.plugin,
                                    id: item.id,
                                    imdb_code: item.imdb
                                },
                                title: item.title,
                                type: item.link.type,
                                magnetUri: item.link.url
                            }
                        }">
		<div class="info">
			<span class="year">{{ item.year }}</span>
			<span class="rating">{{ item.rating }}</span>
		</div>
		<span class="hvr-radial-out">
			<i class="fas fa-play"></i>
			<span v-if="item.runtime != ''" class="time">{{ item.runtime }} min</span>
		</span>
		<div :class="['title', ( showAlways ? 'show': '' )]">{{ item.title }}</div>
	</b-link>
</template>

<script>
	export default {
		name: 'item-list',
		props: [
			'item', 'type', 'plugin'
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