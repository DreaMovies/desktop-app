<template>
	<div class="links-modal">
		<b-modal
			id="modal-sources"
			size="lg"
			centered
			title="Source Select"
			header-bg-variant="secondary"
			header-text-variant="white"
			ok-only
			ok-title="Close">
			<div v-if="Object.keys(sources).length == 0 && !error.notFound" class="loading">
				<loading center="true" page="false"></loading>
			</div>
			<div v-else-if="error.notFound" class="error">
				{{ error.msg }}
			</div>
			<b-list-group v-else>
				<b-list-group-item
					v-for="item in sources.list"
					href="#"
					class="flex-column align-items-start"
					:to="{
						name: 'player',
						params: {
							detail: {
								type: info.screen,
								plugin: info.plugin,
								id: info.id,
								imdb_code: info.imdb
							},
							type: item.type,
							magnetUri: item.source.magnet_uri,
							url: item.source.url,
							title: item.content.title,
						}
					}">
					<div class="d-flex w-100 justify-content-between">
						<h6 class="mb-1">{{ item.file.filename }}</h6>
						<small v-if="item.type == 'torrent'">{{ getAgo(item.file.released) }}</small>
					</div>
					<div class="d-flex w-100 justify-content-between">
						<span>
							<small v-if="item.type == 'torrent'">{{ prettyBytes(item.file.size) }}</small>
							<small>{{ item.file.quality }}</small>
						</span>
						<b-badge v-if="item.type == 'torrent'" variant="secondary" pill>{{ item.file.peers }} / {{ item.file.seeds }}</b-badge>
					</div>
				</b-list-group-item>
			</b-list-group>
		</b-modal>
	</div>
</template>

<script>
	import moment from 'moment';
	import loading from "./loading";

	export default {
		name: 'sources',
		components: {
			loading
		},
		props: [
			'item'
		],
		data: function(){
			/* Sources: {
						count:"",
						page:"",
						total_pages:"",
						list: [{
							type: "torrent", //link
							id: "",
							hash: "",
							source: {
								torrent_url: "",
								magnet_uri: "",
							},
							content: {
								title: "",
								season: "",
								episode: "",
							},
							file: {
								quality: "",
								filename: "",
								seeds: "",
								peers: "",
								released: "",
								size: "",
							},
						}],
					}*/
			return {
				sources: {},
				info: {},
				error:{
					notFound: false,
					msg: ""
				},
			}
		},
		mounted(){
			var Self = this;
			Event.$on("sources-open", (info) => {
				console.log(info);

				this.error.notFound = false;
				this.error.msg = "";
				this.info = info;
				this.info.page = 1;
				this.$root.$emit('bv::show::modal', 'modal-sources');
				this.getSourcesTorrent();
			});
		},
		methods: {
			getSourcesTorrent() {
				var self = this;
				//if()
				if(this.info.type == "movie"){
					//go to plugins of type movie
					Object.keys(this.$plugins).forEach(function (key) {
						if (self.$plugins[key].config.type === "movie") {
							self.$plugins[key]
								.getSources(self.info.imdb, self.info.page)
								.then(function (response) {
									if(Object.keys(response).length > 0 || response.length > 0 ) {
										self.addSources(response.data, key);
									}
								}).catch(function (e) {
									console.log(e);
									self.error.notFound = true;
									self.error.msg = "Error with request";
								});
						}
					});

				} else if( this.info.type == "tvshow" ){
					//go to plugins of type tvshow
					Object.keys(this.$plugins).forEach(function (key) {
						if (self.$plugins[key].config.type === "tvshow") {
							self.$plugins[key]
								.getSources(self.info.imdb, self.info.page)
								.then(function (response) {
									if(Object.keys(response).length > 0 || response.length > 0 ) {
										self.addSources(response.data, key);
									}
								}).catch(function (e) {
									console.log(e);
									self.error.notFound = true;
									self.error.msg = "Error with request";
								});
						}
					});
				}
				//this.$plugins[this.params.plugin]
				//	.details(this.params.id)
				//	.then((response) => {
				//		this.tvshow = this.$plugins[this.params.plugin].dataDetailConvert(response.data);
				//	});
			},
			addSources(response, plugin){
				console.log(response);

				this.sources = this.$plugins[plugin].dataSourceConvert(response, this.info);
				if( this.sources.total_pages > this.sources.page && this.sources.list.length == 0){
					this.info.page = this.info.page + 1;
					this.getSourcesTorrent();
				} else if(this.sources.list.length == 0){
					this.error.notFound = true;
					this.error.msg = "No results found. :(";
				}
				//this.sources.push({type});
			},

			/* Human readable bytes util */
			prettyBytes(num) {
				var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
				if (neg)
					num = -num;
				if (num < 1)
					return (neg ? '-' : '') + num + ' B';
				exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
				num = Number((num / Math.pow(1000, exponent)).toFixed(2));
				unit = units[exponent];
				return (neg ? '-' : '') + num + ' ' + unit;
			},
			getAgo(date){
				return  moment(date).fromNow();
			}
		},
		beforeDestroy(){
			Event.$off("sources-open");
		},
	};
</script>