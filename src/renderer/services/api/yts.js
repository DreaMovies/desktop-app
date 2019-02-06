import axios from 'axios';

export default {
    config: {
        name: "yts",
        label: "YTS Movies",
        logo: "img.png",
        url: "https://yts.am/api/v2/",
        hasFilters: true,
        type: "movie",
        player: "torrent"
    },
    axios_yts: axios.create({
        baseURL: "https://yts.am/api/v2/",
        timeout: 5000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }),
    filters(){
        var filters = {
            order_by: {
                type: "list",
                field: "order_by",
                default: "seeds",
                list: [
                    { value: "seeds",        label: "Order By (seeds)",     disabled: true },
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
                default: "all",
                list: [
                    { value: "all",         label: "Genres (All)",     disabled: true },
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
                default: "all",
                list: [
                    { value: "all",         label: "Quality (All)",   disabled: true },
                    { value: "720p,1080p",  label: "720p/1080p" },
                    { value: "all",         label: "All"        },
                    { value: "720p",        label: "720p"       },
                    { value: "1080p",       label: "1080p"      },
                    { value: "3D",          label: "3D"         }
                ],
            },
            sort_by: {
                type: "list",
                field: "sort_by",
                default: "date_added",
                list: [
                    { value: "date_added",      label: "Sort By (Date Added)", disabled: true },
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
                default: "",
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
    async list(params = {}){ //movie/tvshow/anime
        const params_default = {
            type: "movies",
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
        if(Object.entries(params).length == 0){
            params = params_default;
        } else {
            var filters = params.filters;
        }

        // Optionally the request above could also be done as
        return await this.axios_yts.get('/list_movies.json', {
            params: {
                limit: filters.limit,
                page: params.page,
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

    dataListConvert(response){
        response = response.data;
        var resp = {
            page: response.page_number,
            total: response.movie_count,
            limit: response.limit,
            list : []
        };
        var raw_list = response.movies;

        Object.keys(raw_list).forEach(function(key) {
            resp.list.push({
                id: raw_list[key].id,
                title: raw_list[key].title,
                poster: raw_list[key].medium_cover_image,
                rating: raw_list[key].rating,
                year: raw_list[key].year,
                imdb: raw_list[key].imdb_code,
                runtime: raw_list[key].runtime,
            });
        });

        return resp;
    },
    async details(id){
        return await this.axios_yts.get('/movie_details.json', {
            params: {
                movie_id: id,
                with_images: true,
                with_cast: true
            }
        });
    },
	geMagnetURI(hash, name){
    	//Start MagnetURI Construct and Add  TORRENT_HASH
    	var magnet = "magnet:?xt=urn:btih:" + hash;
    	//Add Encoded+Movie+Name
		magnet += "&dn=" + encodeURI(name);
		//Add Trackers
		magnet += "&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80";
		magnet += "&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce";
		magnet += "&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce";
		magnet += "&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969";
		return magnet;
    }
};


//$(document).on('click', '.yts-list .page-link', function (e) {
//    var page = $(this).data('page');
//    getList(page);
//});
//$(document).on('click', '.yts-list .torrent-download', function (e) {
//    var torrent = $(this).data('link');
//    //torrent_tool.previewFile(torrent);
//});