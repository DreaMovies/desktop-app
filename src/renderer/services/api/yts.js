import axios from 'axios';              //Get list of movies
//var torrent_tool 	= require('../torrent_download.js');
//var views_yts 		= require('../../view/yts_view.js');

const axios_yts = axios.create({
    baseURL: 'https://yts.am/api/v2/',
    timeout: 1000,
    headers: {
        'X-App': 'DreamoviesUploader/V1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

module.exports = {
    getList(page = 1, params = []) {
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
        var filters = this.getFilters();

        // Optionally the request above could also be done as
        axios_yts.get('/list_movies.json', {
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
        }).then(function (response) {
            console.log(response);

            return response.data.data;
            //views_yts.MoviesList(moviesList);
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    },
    getFilters(argument) {
        var filters = {};
        filters.limit = 20;
        filters.order_by ='desc'; // $("#options-bar .filter-order_by").val();
        filters.genre   = 'all'; //$("#options-bar .filter-genre").val();
        filters.quality = 'all'; //$("#options-bar .filter-quality").val();
        filters.sort_by = 'date_added'; //$("#options-bar .filter-sort_by").val();
        filters.keyword = ''; //$(".input-search").val();

        return filters;
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