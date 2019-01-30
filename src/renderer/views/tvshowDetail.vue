<template>
	<div class="page-tvshow-detail">
		<router-link :to="'/tvshow-list/' + params.plugin" class="return-to-list">
			<i class="fas fa-arrow-left"></i>
		</router-link>
		<div class="tvshow-card" v-if="tvshow.id != ''">
			<img :src="tvshow.poster" alt="cover" class="cover"/>
			<div class="hero" :style="{ 'background-image': 'url(\'' + tvshow.cover + '\')' }"></div>
			<div class="tvshow-header">
				<div class="details">
					<div class="title1">{{ tvshow.title }} <span>{{ tvshow.mpa_rating }}</span></div>
					<div class="title2">{{ tvshow.status }}</div>
					<fieldset class="rating">
						<input type="radio" id="star5" name="rating" value="5"/>
						<label class="full" for="star5" title="Awesome - 5 stars"></label>
						<input type="radio" id="star4half" name="rating" value="4 and a half"/>
						<label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
						<input type="radio" id="star4" name="rating" value="4" checked/>
						<label class="full" for="star4" title="Pretty good - 4 stars"></label>
						<input type="radio" id="star3half" name="rating" value="3 and a half"/>
						<label class="half" for="star3half" title="Meh - 3.5 stars"></label>
						<input type="radio" id="star3" name="rating" value="3"/>
						<label class="full" for="star3" title="Meh - 3 stars"></label>
						<input type="radio" id="star2half" name="rating" value="2 and a half"/>
						<label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
						<input type="radio" id="star2" name="rating" value="2"/>
						<label class="full" for="star2" title="Kinda bad - 2 stars"></label>
						<input type="radio" id="star1half" name="rating" value="1 and a half"/>
						<label class="half" for="star1half" title="Meh - 1.5 stars"></label>
						<input type="radio" id="star1" name="rating" value="1"/>
						<label class="full" for="star1" title="Sucks big time - 1 star"></label>
						<input type="radio" id="starhalf" name="rating" value="half"/>
						<label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
					</fieldset>
					<span class="likes">{{ tvshow.count.likes }} likes</span>
				</div> <!-- end details -->
			</div> <!-- end hero -->
			<div class="description">
				<div class="column1">
					<span class="counter">Seasons: {{ tvshow.count.seasons }} - Episodes: {{ tvshow.count.episodes }}</span>
					<h4>Genres</h4>
					<span class="tag" v-for="genre in tvshow.genres">{{ genre.label }}</span>
					<h4>Tags</h4>
					<span class="tag bg-secondary text-white" v-for="tag in tvshow.tags">{{ tag.label }}</span>
					<h4>Networks</h4>
					<span class="tag bg-primary text-white" v-for="network in tvshow.networks">{{ network.name}}</span>
				</div> <!-- end column1 -->
				<div class="column2">
					<p>{{ tvshow.description }}</p>
					<div class="avatars">
						<a v-for="person in tvshow.cast"
						   href="#"
						   :data-tooltip="person.name + ' ( ' + person.character + ' ) '"
						   data-placement="top">
							<img :src="person.picture" :alt="person.name"/>
						</a>
					</div> <!-- end avatars -->


					<div class="seasons-list">

						<b-card no-body>
							<b-tabs card>

								<b-tab v-for="season in tvshow.seasons" :title="'Season ' + season.season">
									<b-card-header>{{ season.episode_count }}</b-card-header>
									<b-card-img><img :src="season.poster" :alt="season.name"></b-card-img>
									<b-card-body>
										<itemEpisode v-for="episode in season.episodes" :item="episode" type="tvshow-detail" :plugin="params.plugin"></itemEpisode>
									</b-card-body>
									<b-card-footer>{{ season.overview }}</b-card-footer>
								</b-tab>

							</b-tabs>
						</b-card>

					</div>
				</div> <!-- end column2 -->
			</div> <!-- end description -->
		</div> <!-- end tvshow-card -->
	</div>
</template>

<script>

	import itemEpisode from "../components/elements/item_episode";

	export default {
		name: 'tvshow-detail',
		components: {
			itemEpisode
		},
		data: function () {
			return {
				params: {
					plugin: "",
					id: "",
					imdb: ""
				},
				tvshow: {
					id: "",
					imdb: "",
					title: "",
					poster: "",
					cover: "",
					rating: "",
					mpa_rating: "",
					description: "",
					runtime: "",
					status: "",
					language: "",
					count: {
						likes: "",
						seasons: "",
						episodes: "",
					},
					ids: "",
					genres: [{
						id: "",
						label: "",
					}],
					networks: [{
						id: "",
						name: "",
						logo: "",
					}],
					seasons: [{
						id: "",
						aired: "",
						name: "",
						overview: "",
						season: "",
						episode_count: "",
						poster: "",
						episodes: [
							{
								id: 0,
								title: '',
								poster: '',
								links: [],
								torrents: []
							}
						]
					}],
					cast: [{
						id: "",
						name: "",
						character: "",
						picture: "",
					}],
					tags: [{
						id: "",
						label: "",
					}],
				}
			}
		},
		created: function () {
			//Load and validate plugin
			this.params.plugin = this.$route.params.plugin;
			this.params.id = this.$route.params.id;
			this.params.imdb = this.$route.params.imdb;

			if (this.$plugins[this.params.plugin] !== undefined) {
				//Load Plugin Detail
				this.loadDetail();
			} else {

			}
		},
		methods: {
			loadDetail() {
				this.$plugins[this.params.plugin]
					.details(this.params.id)
					.then((response) => {
						this.tvshow = this.$plugins[this.params.plugin].dataDetailConvert(response.data);
					});
			},
			// 	open(link) {
			// 		this.link = link;
			// 		require('electron').shell.openExternal(link);
			// 	},
		},
	};
</script>