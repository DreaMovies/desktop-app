import axios from 'axios';

export default {
    config: {
        name: "eztv",
        label: "EZTV Shows",
        logo: "img.png",
        hasFilters: true,
        type: "movies"
    },
    axios_eztv: axios.create({
        baseURL: 'https://eztv.io/api/',
        timeout: 1000,
        headers: {
            //'X-App': 'DreamoviesUploader/V1',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }),
	getListReleases(page = 1){
	/*
	 * List torrents by date:
	 * 	https://eztv.io/api/get-torrents?limit=10&page=1
	 * ,---------------------------------------------------------------------------------,
	 * |	 limit (between 1 and 100); page (current page of results) |
	 * '---------------------------------------------------------------------------------'
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
		axios_eztv.get('/get-torrents', {
			params: {
				limit: 30,
				page: page
			}
		}).then(function (response) {
			console.log(response);

			var releasesList = response.data;
			eztv_views.ShowsList(releasesList);
		}).catch(function (error) {
			console.log(error);
		}).then(function () {
			// always executed
		});
	},
	getListByShow(imdb_id, page = 1){
		/*
		  * List torrents by IMDB:
		  * 	https://eztv.io/api/get-torrents?imdb_id=6048596
		  * ,---------------------------------------------------------------------------------,
		  * |	 limit (between 1 and 100); page (current page of results) |
		  * '---------------------------------------------------------------------------------'
		  *	"imdb_id": "6048596",
		  *	"torrents_count": 40,
		  *	"limit": 30,
		  *	"page": 1,
		  *	"torrents": [
		  *		{
		  *			"id": 1211379,
		  *			"hash": "fcdbab344b14938c881c704bf619f15759d7ae1e",
		  *			"filename": "The.Sinner.S02E08.720p.WEB.x264-TBS[eztv].mkv",
		  *			"episode_url": "https://eztv.io/ep/1211379/the-sinner-s02e08-720p-web-x264-tbs/",
		  *			"torrent_url": "https://zoink.ch/torrent/The.Sinner.S02E08.720p.WEB.x264-TBS[eztv].mkv.torrent",
		  *			"magnet_url": "magnet:?xt=urn:btih:fcdbab344b14938c881c704bf619f15759d7ae1e&dn=The.Sinner.S02E08.720p.WEB.x264-TBS%5Beztv%5D&tr=udp://tracker.coppersurfer.tk:80&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://exodus.desync.com:6969",
		  *			"title": "The Sinner S02E08 720p WEB x264-TBS EZTV",
		  *			"imdb_id": "6048596",
		  *			"season": "2",
		  *			"episode": "8",
		  *			"small_screenshot": "//ezimg.ch/thumbs/the-sinner-s02e08-720p-web-x264-tbs-small.jpg",
		  *			"large_screenshot": "//ezimg.ch/thumbs/the-sinner-s02e08-720p-web-x264-tbs-large.jpg",
		  *			"seeds": 41,
		  *			"peers": 5,
		  *			"date_released_unix": 1537439224,
		  *			"size_bytes": "921961691"
		  *		},
		  */
		axios_eztv.get('/get-torrents', {
				params: {
					imdb_id: imdb_id,
					limit: 30,
					page: page
				}
			}).then(function (response) {
				console.log(response);
				var showEpisodesList = response.data;
				eztv_views.ShowsList(showEpisodes);
			}).catch(function (error) {
				console.log(error);
			}).then(function () {
				// always executed
			});
	}
}