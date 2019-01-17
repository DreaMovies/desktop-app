const $ 		= require("jquery");
var util		= require('../js/util.js');
var yts_api		= require('../js/api/yts.js');
var view		= require('../view/generic_view.js');

var ShowsList = function(response){

	showListAPI();
	$("#options-bar").html('');

	var list = response.torrents;

	var html = 	'<table class="table table-striped table-hover">' +
				'	<thead>' +
				'		<tr>' +
				'			<th scope="col">Peers/Seeds</th>' +
				'			<th scope="col">Name</th>' +
				'			<th scope="col">Season/Episode</th>' +
				'			<th scope="col">Release Date</th>' +
				'			<th scope="col">Actions</th>' +
				'		</tr>' +
				'	</thead>' +
				'	<tbody>';

	for (var i = 0; i < list.length; i++) {
		html += EpisodeItem(list[i]);
	}

	html += '	</tbody>' +
			'</table>';

	html += view.ListPagination(response.page, response.torrents_count);

	$("#API-list").html(html);
};


var EpisodeItem = function(item){


	var html = '		<tr>' +
				'			<th scope="row">' + item.peers + '/' + item.seeds + '</th>' +
				'			<td>[' + item.imdb_id + '] ' + item.title + '</td>' +
				'			<td>S' + item.season + ' - E' + item.episode + '</td>' +
				'			<td alt="' + moment.unix(item.date_released_unix, 'seconds').format() + '">' + moment.unix(item.date_released_unix, 'seconds').fromNow() + '</td>' +
				'			<td><a class="torrent-download" data-magnet="' + item.magnet_url + '"><i class="fas fa-magnet"></i></a></td>' +
				'		</tr>';

	return html;
}

var showListAPI = function(){
	$("#log-container, #files-container").removeClass('show-container');
	$("#API-list").removeClass('yts-list eztv-list dreamovies-list');

	$("#API-list").addClass('show-container eztv-list');
}



module.exports = {
	ShowsList: ShowsList,
	EpisodeItem: EpisodeItem
}