const axios	= require('axios');

export default {
    config: {
        name: "dreamovies-tvshow",
        label: "Dreamovies (TvShows)",
        logo: "img.png",
        url: "https://yts.am/api/v2/",
        hasFilters: true,
        type: "tvshow",
        player: ["torrent", "links"]
    },
	axios_dream: axios.create({
		baseURL: 'https://api.dreamovies.tk/v2/',
		timeout: 1000,
		headers: {
			'X-App': 'DreamoviesUploader/V1',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}),
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
        };
        return filters;
    },
    defaultFilters(argument) {
        var filters = {};
        filters.limit = 20;
        filters.order_by ='desc'; // $("#options-bar .filter-order_by").val();
        filters.genre   = 'all'; //$("#options-bar .filter-genre").val();
        filters.quality = 'all'; //$("#options-bar .filter-quality").val();
        filters.sort_by = 'date_added'; //$("#options-bar .filter-sort_by").val();
        filters.keyword = ''; //$(".input-search").val();

        return filters;
    },
    async list(params = []){ //movie/tvshow/anime
        var params_default = {
            type: "movie",
            page: 1,
            filters: this.defaultFilters()
        }
        /*
            limit				Integer 		between 1 - 50 (inclusive)			20			The limit of results per page that has been set
            page				Integer 		(Unsigned)							1			Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
            quality				String 			(720p, 1080p, 3D)					All			Used to filter by a given quality
            minimum_rating		Integer 		between 0 - 9 (inclusive)			0			Used to filter movie by a given minimum IMDb rating
            query_term			String												0			Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
            genre				String												All			Used to filter by a given genre (See http://www.imdb.com/genre/ for full list)
            sort_by				String 			(title, year, rating, peers, seeds, download_count, like_count, date_added)			date_added			Sorts the results by choosen value
            order_by			String 			(desc, asc)							desc		Orders the results by either Ascending or Descending order
            with_rt_ratings		Boolean												false		Returns the list with the Rotten Tomatoes rating included
        */
        var filters = params.filters;

        // Optionally the request above could also be done as
        return await this.axios_dream.get('/list/' + type, {
            params: {
                limit: filters.limit,
                page: page,
                quality: filters.quality,
                //minimum_rating: 0,
                query_term: filters.keyword,
                genre: filters.genre,
                sort_by: filters.sort_by,
                order_by: filters.order_by,
                //with_rt_ratings: true,
            }
        });
    },
    async details(id){
        return await this.axios_dream.get('/details/' + type + '/' + id, {
            params: {
                movie_id: id,
                with_images: true,
                with_cast: true
            }
        });
    },


	async getSources(id, season, episode){
    	return [];
		//return await this.axios_dream.get('/get-torrents', {
		//	params: {
		//		imdb_id: id.replace(/\D/g,'')
		//	}
		//});
	},
};