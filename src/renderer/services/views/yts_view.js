const $ 		= require("jquery");
var util		= require('../js/util.js');
var yts_api		= require('../js/api/yts.js');
var view		= require('../view/generic_view.js');

var MoviesList = function(response){

	showListAPI();

	var bar_filters = view.filterCreate("Categories");
	bar_filters += view.filterCreate("Order");
	bar_filters += view.filterCreate("Quality");
	bar_filters += view.filterCreate("Sort");

	$("#options-bar").html(bar_filters);

	var list = response.movies;

	var html = '<div class="">';
	for (var i = 0; i < list.length; i++) {
		if(list[i].torrents != undefined){
			html += MovieItem(list[i]);
		}
	}
	html += '</div>';
//	html += util.pagination(response.page_number, response.movie_count / 30);
	html += view.ListPagination(response.page_number, response.movie_count);

	$("#API-list").html(html);
};


var MovieItem = function(item){
	/*{
		"id": 10037,
		"url": "https://yts.am/movie/ouija-seance-the-final-game-2018",
		"imdb_code": "tt8655708",
		"title": "Ouija Seance: The Final Game",
		"title_english": "Ouija Seance: The Final Game",
		"title_long": "Ouija Seance: The Final Game (2018)",
		"slug": "ouija-seance-the-final-game-2018",
		"year": 2018,
		"rating": 2.4,
		"runtime": 81,
		"summary": "Sarah and her friends decide to spend the weekend at an old villa Sarah mysteriously inherited. After finding a Ouija Board in the attic, Sarah and her friends unknowingly awaken an evil force connected to the villa's hidden secrets. To fight the unimaginable horror they will have to face their darkest fears and worst nightmares.",
		"description_full": "Sarah and her friends decide to spend the weekend at an old villa Sarah mysteriously inherited. After finding a Ouija Board in the attic, Sarah and her friends unknowingly awaken an evil force connected to the villa's hidden secrets. To fight the unimaginable horror they will have to face their darkest fears and worst nightmares.",
		"synopsis": "Sarah and her friends decide to spend the weekend at an old villa Sarah mysteriously inherited. After finding a Ouija Board in the attic, Sarah and her friends unknowingly awaken an evil force connected to the villa's hidden secrets. To fight the unimaginable horror they will have to face their darkest fears and worst nightmares.",
		"yt_trailer_code": "A24WjJq7h7E",
		"language": "English",
		"mpa_rating": "",
		"background_image": "https://yts.am/assets/images/movies/ouija_seance_the_final_game_2018/background.jpg",
		"background_image_original": "https://yts.am/assets/images/movies/ouija_seance_the_final_game_2018/background.jpg",
		"small_cover_image": "https://yts.am/assets/images/movies/ouija_seance_the_final_game_2018/small-cover.jpg",
		"medium_cover_image": "https://yts.am/assets/images/movies/ouija_seance_the_final_game_2018/medium-cover.jpg",
		"large_cover_image": "https://yts.am/assets/images/movies/ouija_seance_the_final_game_2018/large-cover.jpg",
		"state": "ok",
		"torrents": [
			{
				"url": "https://yts.am/torrent/download/F8242B18E83248F70461740C6F187778E3FE5165",
				"hash": "F8242B18E83248F70461740C6F187778E3FE5165",
				"quality": "720p",
				"seeds": 350,
				"peers": 205,
				"size": "716.1 MB",
				"size_bytes": 750885274,
				"date_uploaded": "2018-12-04 04:18:11",
				"date_uploaded_unix": 1543893491
			},
			{
				"url": "https://yts.am/torrent/download/056B07D4478DA47096CF5EFC57CE390BD17C6C70",
				"hash": "056B07D4478DA47096CF5EFC57CE390BD17C6C70",
				"quality": "1080p",
				"seeds": 262,
				"peers": 157,
				"size": "1.35 GB",
				"size_bytes": 1449551462,
				"date_uploaded": "2018-12-04 05:36:32",
				"date_uploaded_unix": 1543898192
			}
		],
		"date_uploaded": "2018-12-04 04:18:11",
		"date_uploaded_unix": 1543893491
	},*/
//style="background-image: url();"
	var html = '<div class="movie-card">' +
				'	<div class="movie-header"><img src="' + item.medium_cover_image + '" /></div>' +
				'	<div class="movie-content">' +
				'		<div class="movie-content-header">' +
				'			<h3 class="movie-title">' + item.title_english + '</h3>' +
				'			<div class="item-year">' + item.year + '</div>' +
				'		</div>' +
				'		<div class="movie-info">' +
				'			<div class="info-section">' +
				'				<label>IMDB</label>' +
				'				<span>' + item.imdb_code + '</span>' +
				'			</div>';
	for (var i = item.torrents.length - 1; i >= 0; i--) {
		html += '			<div class="info-section torrent-download" data-link="' + item.torrents[i].url + '">' +
				'				<label>' + item.torrents[i].quality + '</label>' +
				'				<span>' + item.torrents[i].size + ' </span>' +
				'			</div>';
	}
			

	html += '		</div>' +
			'	</div>' +
			'</div>';

	return html;
}


var showListAPI = function(){
	$("#log-container").removeClass('show-container');
	$("#files-container").removeClass('show-container');
	$("#API-list").removeClass('yts-list eztv-list dreamovies-list');
	$("#API-list").addClass('show-container yts-list');
}

module.exports = {
	MoviesList: MoviesList,
}