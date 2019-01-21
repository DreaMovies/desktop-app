import axios from 'axios';

export default {
	config: {
		name: "example", // The name of the file needs to be the same as the "name" property in the config object
		label: "Example",
		icon: "https://website.com/favicon.png",
		app_icon: "icon.png",
		background: "orange",
		url: "https://website.com/api/",
		hasMenu: true,
		hasFilters: true,
		types: [
			"movie",
			"tvshow",
			"anime"
		], // can be string or array
		player: [
			"torrent",
			"url",
			"local"
		], // can be string or array
		uniqueFields: true, //if the API is not set to return the name of the fields, then you need to make an association 
		fields: {
			imdb: "imdb_code",
			unique_id: "id",
			language: "language",
			torrents: "torrents",
			links: "links",
		}
	},
    axios_example: axios.create({
        baseURL: this.config.url,
        timeout: 1000,
        headers: {
            //'X-App': 'DreamoviesUploader/V1',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }),
	menu(){
		return [{
				label: config.label,
				icon: "icon.png",
				submenu: [
					{
						label: 'Add Movie/Show',
						click(menuItem, browserWindow, event) {
							console.log(clicked_element); 
						}
					},
					{
						label: 'Create Info', 
						click(menuItem, browserWindow, event) {
							console.log(clicked_element); 
						}
					},
				]
			}];
	},
	/*
	 * Receive several types
	 * text  = input
	 * list  = select
	 * check = checkbox
	 */
    filters(){
        var filters = {
            order_by: {
                type: "list",
                field: "order_by",
                placeholder: "Order By",
                list: [
                    { value: "latest",       label: "Latest"        },
                    { value: "oldest",       label: "Oldest"        },
                    { value: "seeds",        label: "Seeds"         },
                    { value: "peers",        label: "Peers"         },
                    { value: "year",         label: "Year"          },
                    { value: "rating",       label: "Rating"        },
                    { value: "likes",        label: "Likes"         },
                    { value: "alphabetical", label: "Alphabetical"  },
                    { value: "downloads",    label: "Downloads"     }
                ],
            },
            genre: {
                type: "list",
                field: "genre",
                placeholder: "Genres",
                list: [
                    { value: "all",         label: "All"         },
                    { value: "action",      label: "Action"      },
                    { value: "adventure",   label: "Adventure"   },
                    { value: "animation",   label: "Animation"   },
                    { value: "biography",   label: "Biography"   },
                    { value: "comedy",      label: "Comedy"      },
                    { value: "crime",       label: "Crime"       },
                    { value: "documentary", label: "Documentary" },
                    { value: "drama",       label: "Drama"       },
                    { value: "family",      label: "Family"      },
                    { value: "fantasy",     label: "Fantasy"     },
                    { value: "film-noir",   label: "Film-Noir"   },
                    { value: "game-show",   label: "Game-Show"   },
                    { value: "history",     label: "History"     },
                    { value: "horror",      label: "Horror"      },
                    { value: "music",       label: "Music"       },
                    { value: "musical",     label: "Musical"     },
                    { value: "mystery",     label: "Mystery"     },
                    { value: "news",        label: "News"        },
                    { value: "reality-tv",  label: "Reality-TV"  },
                    { value: "romance",     label: "Romance"     },
                    { value: "sci-fi",      label: "Sci-Fi"      },
                    { value: "sport",       label: "Sport"       },
                    { value: "talk-show",   label: "Talk-Show"   },
                    { value: "thriller",    label: "Thriller"    },
                    { value: "war",         label: "War"         },
                    { value: "western",     label: "Western"     }
                ],
            },
            quality: {
                type: "list",
                field: "quality",
                placeholder: "Quality",
                list: [
                    { value: "720p,1080p",  label: "720p/1080p" },
                    { value: "all",         label: "All"    },
                    { value: "720p",        label: "720p"   },
                    { value: "1080p",       label: "1080p"  },
                    { value: "3D",          label: "3D"     }
                ],
            },
            sort_by: {
                type: "list",
                field: "sort_by",
                placeholder: "Sort By",
                list: [
                    { value: "date_added",      label: "Date Added"     },
                    { value: "title",           label: "Title"          },
                    { value: "year",            label: "Year"           },
                    { value: "rating",          label: "Rating"         },
                    { value: "peers",           label: "Peers"          },
                    { value: "seeds",           label: "Seeds"          },
                    { value: "download_count",  label: "Download Count" },
                    { value: "like_count",      label: "Like Count"     }
                ],
            },
            keyword: {
                type: "text",
                field: "keyword",
                placeholder: "Search by...",
            },
            seen: {
                type: "check",
                field: "seen",
                placeholder: "Hide seen titles",
            },
        };
        return filters;
    },
	async list(type, filters){ //movie/tvshow/anime

		return {
			status: "ok", //"error"
			status_message: "Query was successful",
			data:{
				count: 99,
				page_number: 1,
				limit: 10,
				type: "",//movie/tvshow/anime
			},
			list: [
				{
					id: "",
					title: "",
					summary: "",
					poster: "",
					cover: "",
					rating: 0
				}
			],
		}
	},
	async detail(type, id) { //movie/tvshow/anime, id of element
		return {
			"id": 10458,
			"url": "https://yts.am/movie/i-saw-what-you-did-1965",
			"imdb_code": "tt0059297",
			"title": "I Saw What You Did",
			"year": 1965,
			"rating": 6.2,
			"runtime": 82,
			"genres": [
				"Comedy",
				"Horror",
				"Thriller"
			],
			"summary": "When two teenagers make prank phone calls to strangers, they become the target for terror when they whisper \"I Saw What You Did, And I Know Who You Are!\" to psychopath Steve Marek who has just murdered his wife. But somebody else knows of the terrible crime that was committed that night, the killer's desperately amorous neighbor Amy Nelson.",
			"synopsis": "When two teenagers make prank phone calls to strangers, they become the target for terror when they whisper \"I Saw What You Did, And I Know Who You Are!\" to psychopath Steve Marek who has just murdered his wife. But somebody else knows of the terrible crime that was committed that night, the killer's desperately amorous neighbor Amy Nelson.",
			"yt_trailer_code": "FGAoTS180Pg",
			"language": "English",
			"mpa_rating": "",
			"cover": "https://yts.am/assets/images/movies/i_saw_what_you_did_1965/background.jpg",
			"small_cover_image": "https://yts.am/assets/images/movies/i_saw_what_you_did_1965/small-cover.jpg",
			"poster": "https://yts.am/assets/images/movies/i_saw_what_you_did_1965/medium-cover.jpg",
			"state": "ok",
			"torrents": [
				{
					"url": "https://yts.am/torrent/download/52252F463B46F8562029A664FD928B27B06A1514",
					"hash": "52252F463B46F8562029A664FD928B27B06A1514",
					"quality": "720p",
					"type": "bluray",
					"seeds": 52,
					"peers": 38,
					"size": "682.83 MB",
					"size_bytes": 715999150,
					"date_uploaded": "2019-01-09 09:28:27",
					"date_uploaded_unix": 1547022507
				},
				{
					"url": "https://yts.am/torrent/download/246BEFBC7396700A8E035BF0D0459907049A1AAD",
					"hash": "246BEFBC7396700A8E035BF0D0459907049A1AAD",
					"quality": "1080p",
					"type": "bluray",
					"seeds": 0,
					"peers": 0,
					"size": "1.3 GB",
					"size_bytes": 1395864371,
					"date_uploaded": "2019-01-09 11:00:50",
					"date_uploaded_unix": 1547028050
				}
			],
			"links": [
				{
					"url": "https://yts.am/torrent/download/52252F463B46F8562029A664FD928B27B06A1514",
					"quality": "720p",
					"type": "bluray",
					"size": "682.83 MB",
					"size_bytes": 715999150,
					"date_uploaded": "2019-01-09 09:28:27",
					"subtitles": [
						{
							"lang": "Portugues",
							"url": "url.vtt",
							"type": "vtt" //vtt, str
						},
						{
							"lang": "English",
							"url": "url.vtt",
							"type": "vtt" //vtt, str
						},
					]
				}
			],
			"date_uploaded": "2019-01-09 09:28:27",
			"date_uploaded_unix": 1547022507
		}
	},
}