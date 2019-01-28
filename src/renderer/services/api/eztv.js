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
	async list(params = {}){ //movie/tvshow/anime
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
	async details(id){
		return await this.axios_eztv.get('/movie_details.json', {
			params: {
				movie_id: id,
				with_images: true,
				with_cast: true
			}
		});
	}
};