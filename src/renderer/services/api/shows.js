import axios from 'axios';

export default {
	config: {
		name: "shows",
		label: "Show Discover",
		logo: "img.png",
		url: "https://api.themoviedb.org/3",
		hasFilters: false,
		type: "tvshow",
		player: "torrent",
		api_key: 'cc0d6d13870e0d57ec86eb1a208641c2'
	},
	axios_tmdb: axios.create({
		baseURL: "https://api.themoviedb.org/3",
		timeout: 1000,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}),
	async list(page = 1, params = {}) {

		var page = params.page;
		// Optionally the request above could also be done as
		return await this.axios_tmdb.get('/discover/tv', {
			params: {
				timezone: 'America/New_York',
				page: page,
				sort_by: 'popularity.desc',
				language: 'en-US',
				api_key: this.config.api_key
			}
		});

		/*
			{
			"page": 1,
			"total_results": 78991,
			"total_pages": 3950,
			"results": [
				{
					"original_name": "Arrow",
					"genre_ids": [
						80,
						18,
						9648,
						10759
					],
					"name": "Arrow",
					"popularity": 429.712,
					"origin_country": [
						"US"
					],
					"vote_count": 2185,
					"first_air_date": "2012-10-10",
					"backdrop_path": "/dKxkwAJfGuznW8Hu0mhaDJtna0n.jpg",
					"original_language": "en",
					"id": 1412,
					"vote_average": 5.9,
					"overview": "Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante armed with a bow.",
					"poster_path": "/mo0FP1GxOFZT4UDde7RFDz5APXF.jpg"
				},
		* */
	},

	dataListConvert(response) {
		const img_cover = "https://image.tmdb.org/t/p/original/";
		const img_poster = "https://image.tmdb.org/t/p/w300/";
		var resp = {
			page: response.page,
			total: response.total_results,
			limit: 30,
			list: []
		};
		var raw_list = response.results;
		Object.keys(raw_list).forEach(function (key) {
			resp.list.push({
				id: raw_list[key].id,
				title: raw_list[key].original_name,
				poster: img_poster + raw_list[key].poster_path,
				rating: raw_list[key].vote_average,
				year: new Date(raw_list[key].first_air_date).getFullYear(),
				imdb: "",
				runtime: "",
			});
		});

		return resp;
	},

	async details(id) {
		return await this.axios_tmdb.get('/tv/' + id, {
			params: {
				api_key: this.config.api_key,
				language: 'en-US',
				append_to_response: "external_ids,content_ratings,keywords,credits"
			}
		});
	},

	dataDetailConvert(response) {
		const img_cover = "https://image.tmdb.org/t/p/original/";
		const img_poster = "https://image.tmdb.org/t/p/w300/";
		const img_logo = "https://image.tmdb.org/t/p/w154/";
		const img_picture = "https://image.tmdb.org/t/p/w154/";

		var resp = {
			id: response.id,
			imdb: "",
			title: response.original_name,
			poster: img_poster + response.poster_path,
			cover: img_cover + response.backdrop_path,
			rating: response.vote_average,
			mpa_rating: "",
			description: response.overview,
			runtime: response.episode_run_time,
			status: response.status,
			language: response.original_language,
			count: {
				likes: response.vote_count,
				seasons: response.number_of_seasons,
				episodes: response.number_of_episodes,
			},
			ids: response.external_ids,

			genres: [],
			networks: [],
			seasons: [],
			tags: [],
			cast: [],
		};
		Object.keys(response.genres).forEach(function (key) {
			resp.genres.push({
				id: response.genres[key].id,
				label: response.genres[key].name,
			});
		});
		Object.keys(response.networks).forEach(function (key) {
			resp.networks.push({
				id: response.networks[key].id,
				name: response.networks[key].name,
				logo: img_logo + response.networks[key].logo_path,
			});
		});
		var self = this;
		Object.keys(response.seasons).forEach(function (key) {
			resp.seasons.push({
				id: response.seasons[key].id,
				aired: response.seasons[key].air_date,
				name: response.seasons[key].name,
				overview: response.seasons[key].overview,
				season: response.seasons[key].season_number,
				episode_count: response.seasons[key].episode_count,
				poster: img_poster + response.seasons[key].poster_path,
				episodes: self.episodesBySeason(response.id, response.seasons[key].season_number).then(function(episodes){self.dataEpisodeBySeasonConvert(episodes)})
			});
		});
		Object.keys(response.credits.cast).forEach(function (key) {
			resp.cast.push({
				id: response.credits.cast[key].id,
				name: response.credits.cast[key].name,
				character: response.credits.cast[key].character,
				picture: img_picture + response.credits.cast[key].profile_path,
			});
		});
		Object.keys(response.keywords.results).forEach(function (key) {
			resp.tags.push({
				id: response.keywords.results[key].id,
				label: response.keywords.results[key].name,
			});
		});
		Object.keys(response.content_ratings.results).forEach(function (key) {
			if (response.content_ratings.results[key].iso_3166_1 === "US") { //PT - GB
				resp.mpa_rating = response.content_ratings.results[key].rating;
			}
		});
		return resp;
		/*
			var example = {
				"backdrop_path": "/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg",
				"created_by": [
					{
						"id": 9813,
						"credit_id": "5256c8c219c2956ff604858a",
						"name": "David Benioff",
						"gender": 2,
						"profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
					},
					{
						"id": 228068,
						"credit_id": "552e611e9251413fea000901",
						"name": "D. B. Weiss",
						"gender": 2,
						"profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
					}
				],
				"episode_run_time": [
					60
				],
				"first_air_date": "2011-04-17",
				"genres": [
					{
						"id": 10765,
						"name": "Sci-Fi & Fantasy"
					},
					{
						"id": 18,
						"name": "Drama"
					},
					{
						"id": 10759,
						"name": "Action & Adventure"
					}
				],
				"homepage": "http://www.hbo.com/game-of-thrones",
				"id": 1399,
				"in_production": true,
				"languages": [
					"es",
					"en",
					"de"
				],
				"last_air_date": "2017-08-27",
				"last_episode_to_air": {
					"air_date": "2017-08-27",
					"episode_number": 7,
					"id": 1340528,
					"name": "The Dragon and the Wolf",
					"overview": "A meeting is held in King's Landing. Problems arise in the North.",
					"production_code": "707",
					"season_number": 7,
					"show_id": 1399,
					"still_path": "/jLe9VcbGRDUJeuM8IwB7VX4GDRg.jpg",
					"vote_average": 9.088,
					"vote_count": 41
				},
				"name": "Game of Thrones",
				"next_episode_to_air": {
					"air_date": "2019-04-14",
					"episode_number": 1,
					"id": 1551825,
					"name": "Episode 1",
					"overview": "",
					"production_code": "",
					"season_number": 8,
					"show_id": 1399,
					"still_path": null,
					"vote_average": 8,
					"vote_count": 1
				},
				"networks": [
					{
						"name": "HBO",
						"id": 49,
						"logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
						"origin_country": "US"
					}
				],
				"number_of_episodes": 73,
				"number_of_seasons": 8,
				"origin_country": [
					"US"
				],
				"original_language": "en",
				"original_name": "Game of Thrones",
				"overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
				"popularity": 164.886,
				"poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg",
				"production_companies": [
					{
						"id": 76043,
						"logo_path": "/9RO2vbQ67otPrBLXCaC8UMp3Qat.png",
						"name": "Revolution Sun Studios",
						"origin_country": "US"
					},
					{
						"id": 3268,
						"logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
						"name": "HBO",
						"origin_country": "US"
					},
					{
						"id": 12525,
						"logo_path": null,
						"name": "Television 360",
						"origin_country": ""
					},
					{
						"id": 5820,
						"logo_path": null,
						"name": "Generator Entertainment",
						"origin_country": ""
					},
					{
						"id": 12526,
						"logo_path": null,
						"name": "Bighead Littlehead",
						"origin_country": ""
					}
				],
				"seasons": [
					{
						"air_date": "2010-12-05",
						"episode_count": 15,
						"id": 3627,
						"name": "Specials",
						"overview": "",
						"poster_path": "/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg",
						"season_number": 0
					},
					{
						"air_date": "2011-04-17",
						"episode_count": 10,
						"id": 3624,
						"name": "Season 1",
						"overview": "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.",
						"poster_path": "/zwaj4egrhnXOBIit1tyb4Sbt3KP.jpg",
						"season_number": 1
					},
					{
						"air_date": "2012-04-01",
						"episode_count": 10,
						"id": 3625,
						"name": "Season 2",
						"overview": "The cold winds of winter are rising in Westeros...war is coming...and five kings continue their savage quest for control of the all-powerful Iron Throne. With winter fast approaching, the coveted Iron Throne is occupied by the cruel Joffrey, counseled by his conniving mother Cersei and uncle Tyrion. But the Lannister hold on the Throne is under assault on many fronts. Meanwhile, a new leader is rising among the wildings outside the Great Wall, adding new perils for Jon Snow and the order of the Night's Watch.",
						"poster_path": "/5tuhCkqPOT20XPwwi9NhFnC1g9R.jpg",
						"season_number": 2
					},
					{
						"air_date": "2013-03-31",
						"episode_count": 10,
						"id": 3626,
						"name": "Season 3",
						"overview": "Duplicity and treachery...nobility and honor...conquest and triumph...and, of course, dragons. In Season 3, family and loyalty are the overarching themes as many critical storylines from the first two seasons come to a brutal head. Meanwhile, the Lannisters maintain their hold on King's Landing, though stirrings in the North threaten to alter the balance of power; Robb Stark, King of the North, faces a major calamity as he tries to build on his victories; a massive army of wildlings led by Mance Rayder march for the Wall; and Daenerys Targaryen--reunited with her dragons--attempts to raise an army in her quest for the Iron Throne.",
						"poster_path": "/7d3vRgbmnrRQ39Qmzd66bQyY7Is.jpg",
						"season_number": 3
					},
					{
						"air_date": "2014-04-06",
						"episode_count": 10,
						"id": 3628,
						"name": "Season 4",
						"overview": "The War of the Five Kings is drawing to a close, but new intrigues and plots are in motion, and the surviving factions must contend with enemies not only outside their ranks, but within.",
						"poster_path": "/dniQ7zw3mbLJkd1U0gdFEh4b24O.jpg",
						"season_number": 4
					},
					{
						"air_date": "2015-04-12",
						"episode_count": 10,
						"id": 62090,
						"name": "Season 5",
						"overview": "The War of the Five Kings, once thought to be drawing to a close, is instead entering a new and more chaotic phase. Westeros is on the brink of collapse, and many are seizing what they can while the realm implodes, like a corpse making a feast for crows.",
						"poster_path": "/527sR9hNDcgVDKNUE3QYra95vP5.jpg",
						"season_number": 5
					},
					{
						"air_date": "2016-04-24",
						"episode_count": 10,
						"id": 71881,
						"name": "Season 6",
						"overview": "Following the shocking developments at the conclusion of season five, survivors from all parts of Westeros and Essos regroup to press forward, inexorably, towards their uncertain individual fates. Familiar faces will forge new alliances to bolster their strategic chances at survival, while new characters will emerge to challenge the balance of power in the east, west, north and south.",
						"poster_path": "/zvYrzLMfPIenxoq2jFY4eExbRv8.jpg",
						"season_number": 6
					},
					{
						"air_date": "2017-07-16",
						"episode_count": 7,
						"id": 81266,
						"name": "Season 7",
						"overview": "The long winter is here. And with it comes a convergence of armies and attitudes that have been brewing for years.",
						"poster_path": "/3dqzU3F3dZpAripEx9kRnijXbOj.jpg",
						"season_number": 7
					},
					{
						"air_date": "2019-04-14",
						"episode_count": 6,
						"id": 107971,
						"name": "Season 8",
						"overview": "",
						"poster_path": "/aJ8Bkb8Fck3sk5UIGGWGAkRiznC.jpg",
						"season_number": 8
					}
				],
				"status": "Returning Series",
				"type": "Scripted",
				"vote_average": 8.2,
				"vote_count": 5211,
				"external_ids": {
					"imdb_id": "tt0944947",
					"freebase_mid": "/m/0524b41",
					"freebase_id": "/en/game_of_thrones",
					"tvdb_id": 121361,
					"tvrage_id": 24493,
					"facebook_id": "GameOfThrones",
					"instagram_id": "gameofthrones",
					"twitter_id": "GameOfThrones"
				},
				"content_ratings": {
					"results": [
						{
							"iso_3166_1": "DE",
							"rating": "16"
						},
						{
							"iso_3166_1": "GB",
							"rating": "18"
						},
						{
							"iso_3166_1": "AU",
							"rating": "R18+"
						},
						{
							"iso_3166_1": "FR",
							"rating": "16"
						},
						{
							"iso_3166_1": "US",
							"rating": "TV-MA"
						},
						{
							"iso_3166_1": "CA",
							"rating": "18+"
						},
						{
							"iso_3166_1": "RU",
							"rating": "18+"
						},
						{
							"iso_3166_1": "BR",
							"rating": "18"
						},
						{
							"iso_3166_1": "PT",
							"rating": "M/18"
						},
						{
							"iso_3166_1": "HU",
							"rating": "18"
						}
					]
				},
				"keywords": {
					"results": [
						{
							"name": "war",
							"id": 6091
						},
						{
							"name": "based on novel or book",
							"id": 818
						},
						{
							"name": "kingdom",
							"id": 4152
						},
						{
							"name": "dragon",
							"id": 12554
						},
						{
							"name": "king",
							"id": 13084
						},
						{
							"name": "intrigue",
							"id": 34038
						},
						{
							"name": "fantasy world",
							"id": 170362
						}
					]
				},
				"credits": {
					"cast": [
						{
							"character": "Daenerys Targaryen",
							"credit_id": "5256c8af19c2956ff60479f6",
							"id": 1223786,
							"name": "Emilia Clarke",
							"gender": 1,
							"profile_path": "/j7d083zIMhwnKro3tQqDz2Fq1UD.jpg",
							"order": 0
						},
						{
							"character": "Jon Snow",
							"credit_id": "5256c8af19c2956ff6047af6",
							"id": 239019,
							"name": "Kit Harington",
							"gender": 2,
							"profile_path": "/4MqUjb1SYrzHmFSyGiXnlZWLvBs.jpg",
							"order": 1
						},
						{
							"character": "Tyrion Lannister",
							"credit_id": "5256c8b219c2956ff6047cd8",
							"id": 22970,
							"name": "Peter Dinklage",
							"gender": 2,
							"profile_path": "/xuB7b4GbARu4HN6gq5zMqjGbkwF.jpg",
							"order": 2
						},
						{
							"character": "Cersei Lannister",
							"credit_id": "5256c8ad19c2956ff60479ce",
							"id": 17286,
							"name": "Lena Headey",
							"gender": 1,
							"profile_path": "/wcpy6J7KLzmVt0METboX3CZ0Jp.jpg",
							"order": 3
						},
						{
							"character": "Jaime Lannister",
							"credit_id": "5256c8ad19c2956ff604793e",
							"id": 12795,
							"name": "Nikolaj Coster-Waldau",
							"gender": 2,
							"profile_path": "/3xv7t3Uyx4RNLB8MnPQMIhuRV9V.jpg",
							"order": 4
						},
						{
							"character": "Sansa Stark",
							"credit_id": "5256c8b419c2956ff6047f34",
							"id": 1001657,
							"name": "Sophie Turner",
							"gender": 1,
							"profile_path": "/ed4ajSYdv49j9OF7yMeG8Hznrrt.jpg",
							"order": 5
						},
						{
							"character": "Arya Stark",
							"credit_id": "5256c8b419c2956ff6047f0c",
							"id": 1181313,
							"name": "Maisie Williams",
							"gender": 1,
							"profile_path": "/7PlTqaeqCNctmHf8UEBjChHID98.jpg",
							"order": 6
						},
						{
							"character": "Jorah Mormont",
							"credit_id": "5256c8af19c2956ff6047a5c",
							"id": 20508,
							"name": "Iain Glen",
							"gender": 2,
							"profile_path": "/vYEI5xJWJ6HKjPusvO2klAvez3J.jpg",
							"order": 7
						},
						{
							"character": "Theon Greyjoy",
							"credit_id": "5256c8b019c2956ff6047b5a",
							"id": 71586,
							"name": "Alfie Allen",
							"gender": 2,
							"profile_path": "/4q6yzSMi8Q5XeIn5A1yUD1tEfwq.jpg",
							"order": 8
						},
						{
							"character": "Davos Seaworth",
							"credit_id": "5256c8b519c2956ff604803e",
							"id": 15498,
							"name": "Liam Cunningham",
							"gender": 2,
							"profile_path": "/8RMX0M8AEaldVAC6WUJIViUdDkm.jpg",
							"order": 9
						},
						{
							"character": "Samwell Tarly",
							"credit_id": "56009f37c3a36856180002b5",
							"id": 1010135,
							"name": "John Bradley",
							"gender": 2,
							"profile_path": "/yrRfy2LUab8i6bjEb0LFEe0wDK2.jpg",
							"order": 10
						},
						{
							"character": "Varys",
							"credit_id": "5256c8b219c2956ff6047d6e",
							"id": 84423,
							"name": "Conleth Hill",
							"gender": 2,
							"profile_path": "/nxSh1w1MTyAfQ1cCSie3HtjQot6.jpg",
							"order": 11
						},
						{
							"character": "Petyr Baelish",
							"credit_id": "5256c8af19c2956ff6047aa4",
							"id": 49735,
							"name": "Aidan Gillen",
							"gender": 2,
							"profile_path": "/w37z62Ex1kxqLTyI3SRySmiVsDB.jpg",
							"order": 12
						},
						{
							"character": "Brienne of Tarth",
							"credit_id": "5256c8bd19c2956ff604841c",
							"id": 1011904,
							"name": "Gwendoline Christie",
							"gender": 1,
							"profile_path": "/kmlv5i02n3zKryBr2W3kSeWVKTD.jpg",
							"order": 13
						},
						{
							"character": "Bran Stark",
							"credit_id": "5256c8b119c2956ff6047c22",
							"id": 239020,
							"name": "Isaac Hempstead-Wright",
							"gender": 2,
							"profile_path": "/qF1Ca4aNDkpSGQt9Q7qfpRbwNOk.jpg",
							"order": 14
						},
						{
							"character": "Tormund Giantsbane",
							"credit_id": "5256c8c219c2956ff6048530",
							"id": 571418,
							"name": "Kristofer Hivju",
							"gender": 2,
							"profile_path": "/qlGV5b8FMx2Ut1fgmm6TDc1fHxC.jpg",
							"order": 15
						},
						{
							"character": "Missandei",
							"credit_id": "570161409251416074000524",
							"id": 1251069,
							"name": "Nathalie Emmanuel",
							"gender": 1,
							"profile_path": "/yYiJwunH04doOZJgMu7qTZyrRYJ.jpg",
							"order": 16
						},
						{
							"character": "Grey Worm",
							"credit_id": "570161b39251416070000434",
							"id": 964792,
							"name": "Jacob Anderson",
							"gender": 2,
							"profile_path": "/kCvEYSYeUk6aPh2sE8VExaTRYWP.jpg",
							"order": 17
						},
						{
							"character": "Bronn",
							"credit_id": "5256c8b219c2956ff6047d8e",
							"id": 195930,
							"name": "Jerome Flynn",
							"gender": 2,
							"profile_path": "/nW9wUciHIkTt0jrw07uuQUWtVnm.jpg",
							"order": 18
						},
						{
							"character": "Sandor Clegane",
							"credit_id": "5256c8b119c2956ff6047c84",
							"id": 3075,
							"name": "Rory McCann",
							"gender": 2,
							"profile_path": "/zYNJIN6fEXAkLz2APQduYxvGxI1.jpg",
							"order": 19
						}
					],
					"crew": [
						{
							"credit_id": "5256c8c219c2956ff60485e8",
							"department": "Production",
							"id": 9813,
							"name": "David Benioff",
							"gender": 2,
							"job": "Executive Producer",
							"profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
						},
						{
							"credit_id": "5256c8c319c2956ff6048612",
							"department": "Production",
							"id": 228068,
							"name": "D. B. Weiss",
							"gender": 2,
							"job": "Executive Producer",
							"profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
						},
						{
							"credit_id": "54eef3e19251417965005c64",
							"department": "Production",
							"id": 237053,
							"name": "George R. R. Martin",
							"gender": 2,
							"job": "Co-Executive Producer",
							"profile_path": "/v1fA3LZ4DefEPUvSFZmJVmczUmv.jpg"
						},
						{
							"credit_id": "54eeec309251417968005b14",
							"department": "Costume & Make-Up",
							"id": 50953,
							"name": "Michele Clapton",
							"gender": 1,
							"job": "Costume Design",
							"profile_path": "/dyGhslpGOvhvG1QAGu0xgti4e0k.jpg"
						},
						{
							"credit_id": "54eef1fc925141796e005aee",
							"department": "Writing",
							"id": 237053,
							"name": "George R. R. Martin",
							"gender": 2,
							"job": "Novel",
							"profile_path": "/v1fA3LZ4DefEPUvSFZmJVmczUmv.jpg"
						}
					]
				}
			};
		*/
	},

	async episodesBySeason(id, season){
		console.log(id + " - " + season);
		return await this.axios_tmdb.get('/tv/' + id + '/season/' + season, {
			params: {
				api_key: this.config.api_key,
				language: 'en-US',
				append_to_response: "external_ids,content_ratings,keywords,credits"
			}
		});
		console.log("Request: ");
		console.log(response);
		return this.dataEpisodeBySeasonConvert(response.data);
	},

	dataEpisodeBySeasonConvert(response) {
		console.log("Structure: ");
		console.log(response);
		const img_poster = "https://image.tmdb.org/t/p/w300/";
		var resp = [];
		Object.keys(response.episodes).forEach(function (key) {
			resp.push({
				id:             response.episodes[key].id,
				name:           response.episodes[key].name,
				overview:       response.episodes[key].overview,
				poster:         img_poster + response.episodes[key].still_path,
				aired:          response.episodes[key].air_date,
				episode_number: response.episodes[key].episode_number,
				season_number:  response.episodes[key].season_number,
				rating:         response.episodes[key].vote_average,
				votes:          response.episodes[key].vote_count,
				links:      [],
				torrents:   []
			});
		});
		return resp;
		/*
			var example = {
				"_id": "5256c89f19c2956ff6046d47",
				"air_date": "2011-04-17",
				"episodes": [
					{
						"air_date": "2011-04-17",
						"episode_number": 1,
						"name": "Winter Is Coming",
						"overview": "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
						"id": 63056,
						"production_code": "101",
						"season_number": 1,
						"still_path": "/wrGWeW4WKxnaeA8sxJb2T9O6ryo.jpg",
						"vote_average": 7.11904761904762,
						"vote_count": 21
					},
				],
				"name": "Season 1",
				"overview": "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.",
				"id": 3624,
				"poster_path": "/olJ6ivXxCMq3cfujo1IRw30OrsQ.jpg",
				"season_number": 1
			};
		*/
	},
};