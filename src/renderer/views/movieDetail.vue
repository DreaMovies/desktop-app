<template>
	<div class="page-movie-detail">
		<router-link :to="'/movie-list/' + params.plugin" class="return-to-list">
			<i class="fas fa-arrow-left"></i>
		</router-link>
		<div class="movie-card" v-if="movie != ''">
			<img :src="movie.medium_cover_image" alt="cover" class="cover" />
			<div class="hero" :style="{ 'background-image': 'url(\'' + movie.background_image_original + '\')' }"></div>
			<div class="movie-header">
				<div class="details">
					<div class="title1">{{ movie.title }} <span>{{ movie.mpa_rating }}</span></div>
					<div class="title2">{{ movie.title_long }}</div>
					<fieldset class="rating">
						<input type="radio" id="star5" name="rating" value="5" />
						<label class = "full" for="star5" title="Awesome - 5 stars"></label>
						<input type="radio" id="star4half" name="rating" value="4 and a half" />
						<label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
						<input type="radio" id="star4" name="rating" value="4" checked />
						<label class = "full" for="star4" title="Pretty good - 4 stars"></label>
						<input type="radio" id="star3half" name="rating" value="3 and a half" />
						<label class="half" for="star3half" title="Meh - 3.5 stars"></label>
						<input type="radio" id="star3" name="rating" value="3" />
						<label class = "full" for="star3" title="Meh - 3 stars"></label>
						<input type="radio" id="star2half" name="rating" value="2 and a half" />
						<label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
						<input type="radio" id="star2" name="rating" value="2" />
						<label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
						<input type="radio" id="star1half" name="rating" value="1 and a half" />
						<label class="half" for="star1half" title="Meh - 1.5 stars"></label>
						<input type="radio" id="star1" name="rating" value="1" />
						<label class = "full" for="star1" title="Sucks big time - 1 star"></label>
						<input type="radio" id="starhalf" name="rating" value="half" />
						<label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
					</fieldset>
					<span class="likes">{{ movie.like_count }} likes</span>
				</div> <!-- end details -->
			</div> <!-- end hero -->
			<div class="description">
				<div class="column1">
					<span class="tag" v-for="genre in movie.genres">{{ genre }}</span>

					<span class="tag" v-for="torrent in movie.torrents" @click="play('torrent', torrent.url)">{{ torrent.quality }}</span>
				</div> <!-- end column1 -->
				<div class="column2">
					<p>{{ movie.description_full }}</p>
					<div class="avatars">
						<a 	v-for="person in movie.cast" 
							href="#" 
							:data-tooltip="person.name + ' ( ' + person.character_name + ' ) '" 
							data-placement="top">
							<img :src="person.url_small_image" :alt="person.name" />
						</a>
					</div> <!-- end avatars -->
				</div> <!-- end column2 -->
			</div> <!-- end description -->

			<AppTorrentDetails v-if="player.type == 'torrent' && player.link !== ''" :magnetUri="player.link"></AppTorrentDetails>
			<!-- <torrentPlayer v-if="player.type == 'torrent'" :magnet="player.link" :info="player"></torrentPlayer> -->
			<embedPlayer v-if="player.type == 'link'" :info="player"></embedPlayer>
		</div> <!-- end movie-card -->
	</div>
</template>

<script>
    import services from "@/services/";
	import torrentPlayer from "../components/elements/torrent_player";
	import embedPlayer from "../components/elements/embed_player";
	import AppTorrentDetails from '../components/elements/torrent/torrent_detail';

	export default {
		name: 'movie-detail',
		components: {
            services,
			torrentPlayer,
			embedPlayer,
			AppTorrentDetails
		},
		data: function(){
			return {
				params:{
					plugin: "",
					id: "",
					imdb: ""
				},
				player: {
					type: "",
					link: ""
				},
				movie: {}
			}
		},
        created: function () {
			//Load and validate plugin
            this.params.plugin = this.$route.params.plugin;
            this.params.id = 	this.$route.params.id;
            this.params.imdb = 	this.$route.params.imdb;

			if(this.$plugins[this.params.plugin] !== undefined) {
				//Load Plugin Detail
				this.loadDetail();
			} else {

			}
        },
        methods: {
            loadDetail() {
				this.$plugins[this.params.plugin].details(this.params.id).then((response) => {
					this.movie = response.data.data.movie;
				});
            },
			play(type, link){
				this.player.type = type;
				this.player.link = link;
			},
			// 	open(link) {
			// 		this.link = link;
			// 		require('electron').shell.openExternal(link);
			// 	},
		},
	};
</script>