import axios from 'axios';

export default {
	config: {
		name: "eztv",
		label: "EZTV Shows",
		logo: "img.png",
		url: "https://yts.am/api/v2/",
		hasFilters: false,
		type: "tvshow",
		player: "torrent"
	},
	axios_eztv: axios.create({
		baseURL: 'https://eztv.io/api/',
		timeout: 1000,
		headers: {
			//'X-App': 'DreamoviesUploader/V1',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}),
	async list(params = {}) { //movie/tvshow/anime
		/*
		 * List torrents by date:
		 * 	https://eztv.io/api/get-torrents?limit=10&page=1&imdb_id=6048596
		 * ,---------------------------------------------------------------------------------,
		 * |	 limit (between 1 and 100); page (current page of results) |
		 * '---------------------------------------------------------------------------------'
		  *	"imdb_id": "6048596",
		 *	"torrents_count": 132816,
		 *	"limit": 10,
		 *	"page": 1,
		 *	"torrents": [
		 *		{
		 *			"id": 1294818,
		 *			"hash": "45d664b68dee8a3ef50156522d675f375e9940df",
		 *			"filename": "Made.in.Great.Britain.S01E05.WEB.h264-WEBTUBE[eztv].mkv",
		 *			"episode_url": "https://eztv.io/ep/1294818/made-in-great-britain-s01e05-web-h264-webtube/",
		 *			"torrent_url": "https://zoink.ch/torrent/Made.in.Great.Britain.S01E05.WEB.h264-WEBTUBE[eztv].mkv.torrent",
		 *			"magnet_url": "magnet:?xt=urn:btih:45d664b68dee8a3ef50156522d675f375e9940df&dn=Made.in.Great.Britain.S01E05.WEB.h264-WEBTUBE%5Beztv%5D&tr=udp://tracker.coppersurfer.tk:80&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://exodus.desync.com:6969",
		 *			"title": "Made in Great Britain S01E05 WEB h264-WEBTUBE EZTV",
		 *			"imdb_id": "6047728",
		 *			"season": "1",
		 *			"episode": "5",
		 *			"small_screenshot": "//ezimg.ch/thumbs/made-in-great-britain-s01e05-web-h264-webtube-small.jpg",
		 *			"large_screenshot": "//ezimg.ch/thumbs/made-in-great-britain-s01e05-web-h264-webtube-large.jpg",
		 *			"seeds": 3,
		 *			"peers": 11,
		 *			"date_released_unix": 1544453705,
		 *			"size_bytes": "849726359"
		 *		},
		 */

		return await this.axios_eztv.get('/get-torrents', {
			params: {
				limit: 30,
				page: params.page,
				imdb_id: params.imdb_id
			}
		})
	},
	async details(id) {
		return await this.axios_eztv.get('/movie_details.json', {
			params: {
				movie_id: id,
				with_images: true,
				with_cast: true
			}
		});
	},


	async getSources(id, page = 1) {
		return await this.axios_eztv.get('/get-torrents', {
			params: {
				imdb_id: id.replace(/\D/g, ''),
				page: page,
				limit: 100
			}
		});
	},


	dataSourceConvert(response, info) {
		var sources = {
			page: response.page,
			count: response.torrents_count,
			total_pages: Math.ceil(response.torrents_count / response.limit),
			list: []
		};

		Object.keys(response.torrents).forEach(function (key) {
			if( response.torrents[key].season == info.season && response.torrents[key].episode == info.episode ) {
				sources.list.push({
					type: "torrent",
					id: response.torrents[key].id,
					hash: response.torrents[key].hash,
					source: {
						torrent_url: response.torrents[key].torrent_url,
						magnet_uri: response.torrents[key].magnet_url,
						url: "",
					},
					content: {
						title: response.torrents[key].title,
						season: response.torrents[key].season,
						episode: response.torrents[key].episode,
					},
					file: {
						quality: "",
						filename: response.torrents[key].filename,
						seeds: response.torrents[key].seeds,
						peers: response.torrents[key].peers,
						released: response.torrents[key].date_released_unix,
						size: response.torrents[key].size_bytes,
					},
				});
			}
		});
		return sources;
		/*
			var example = {
				"imdb_id": "5420376",
				"torrents_count": 164,
				"limit": 30,
				"page": 1,
				"torrents": [
					{
						"id": 1307313,
						"hash": "a8abc4ab73f1f5d00c677aa02d4281025db30fc8",
						"filename": "Riverdale.US.S03E11.iNTERNAL.480p.x264-mSD[eztv].mkv",
						"episode_url": "https://eztv.io/ep/1307313/riverdale-us-s03e11-internal-480p-x264-msd/",
						"torrent_url": "https://zoink.ch/torrent/Riverdale.US.S03E11.iNTERNAL.480p.x264-mSD[eztv].mkv.torrent",
						"magnet_url": "magnet:?xt=urn:btih:a8abc4ab73f1f5d00c677aa02d4281025db30fc8&dn=Riverdale.US.S03E11.iNTERNAL.480p.x264-mSD%5Beztv%5D&tr=udp://tracker.coppersurfer.tk:80&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://exodus.desync.com:6969",
						"title": "Riverdale US S03E11 iNTERNAL 480p x264-mSD EZTV",
						"imdb_id": "5420376",
						"season": "3",
						"episode": "11",
						"small_screenshot": "//ezimg.ch/thumbs/riverdale-us-s03e11-internal-480p-x264-msd-small.jpg",
						"large_screenshot": "//ezimg.ch/thumbs/riverdale-us-s03e11-internal-480p-x264-msd-large.jpg",
						"seeds": 159,
						"peers": 92,
						"date_released_unix": 1548919700,
						"size_bytes": "102661022"
					},
				]
			}
		*/
	},
};