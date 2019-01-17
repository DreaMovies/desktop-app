var util		= require('../js/util.js');
var views 		= require('../view/generic_view.js');
const moviedb 	= require('moviedb')('cc0d6d13870e0d57ec86eb1a208641c2');

var info = {
		DomId: "",
		id: 0,
		name: "",
		year: "",
		language: "",
		image: "",
		pathfile: "",
		filename: "",
		imdb: "",
		tmdb: "",
		season: "",
		episode: "",
		upload: {},
		type: "",
	};

var movieInfo 	= function(itemInfo){
	const parameters = {
		query: itemInfo.name,
		year: itemInfo.year,
		language: itemInfo.language // ISO 639-1 code
	};

	moviedb.searchMovie(parameters, (err, res) => {
		if(res.results.length > 0){
			moviedb.movieInfo({ id: res.results[0].id }, (err, tmdbInfo) => {
				console.log(tmdbInfo);

				window.uploads[itemInfo.DomId].image 	= "https://image.tmdb.org/t/p/w342/" + tmdbInfo.poster_path;
				window.uploads[itemInfo.DomId].imdb 	= tmdbInfo.id;
				window.uploads[itemInfo.DomId].tmdb 	= tmdbInfo.imdb_id;
				window.uploads[itemInfo.DomId].language = tmdbInfo.original_language;

				window.uploads[itemInfo.DomId].season 	= "";
				window.uploads[itemInfo.DomId].episode 	= "";
				window.uploads[itemInfo.DomId].uploadPath	= "";

				views.infoUpdate(window.uploads[itemInfo.DomId].DomId, window.uploads[itemInfo.DomId]);
			});
		}
	});
};

var showInfo 	= function(itemInfo){
	const parameters = {
		query: itemInfo.name,
		year: itemInfo.year,
		language: itemInfo.language // ISO 639-1 code
	};

	moviedb.searchTv(parameters, (err, res) => {
		if(res.results.length > 0){
			moviedb.tvInfo({ id: res.results[0].id }, (err, tmdbInfo) => {
				console.log(tmdbInfo);

				window.uploads[itemInfo.DomId].image 	= "https://image.tmdb.org/t/p/w342/" + tmdbInfo.poster_path;
				window.uploads[itemInfo.DomId].imdb 	= tmdbInfo.id;
				window.uploads[itemInfo.DomId].tmdb 	= tmdbInfo.imdb_id;
				window.uploads[itemInfo.DomId].language = tmdbInfo.original_language;

				window.uploads[itemInfo.DomId].season 	= "";
				window.uploads[itemInfo.DomId].episode 	= "";
				window.uploads[itemInfo.DomId].uploadPath	= "";

				views.infoUpdate(window.uploads[itemInfo.DomId].DomId, window.uploads[itemInfo.DomId]);
			});
		}
	});
};

var episodeInfo	= function(itemInfo){
	const parameters = {
		query: itemInfo.name,
		year: itemInfo.year,
		language: itemInfo.language // ISO 639-1 code
	};

	moviedb.searchTv(parameters, (err, res) => {
		if(res.results.length > 0){
			moviedb.tvInfo({ id: res.results[0].id }, (err, tmdbInfo) => {
				console.log(tmdbInfo);

				window.uploads[itemInfo.DomId].image 	= "https://image.tmdb.org/t/p/w342/" + tmdbInfo.poster_path;
				window.uploads[itemInfo.DomId].imdb 	= tmdbInfo.id;
				window.uploads[itemInfo.DomId].tmdb 	= tmdbInfo.imdb_id;
				window.uploads[itemInfo.DomId].language = tmdbInfo.original_language;

				window.uploads[itemInfo.DomId].season 	= "";
				window.uploads[itemInfo.DomId].episode 	= "";
				window.uploads[itemInfo.DomId].uploadPath	= "";

				views.infoUpdate(window.uploads[itemInfo.DomId].DomId, window.uploads[itemInfo.DomId]);
			});
		}
	});
};

var getInfoFile	= function(filename, pathFile, id, isTorrent = false){
	var fileInfo 	= util.fileInfo(filename, false, pathFile, isTorrent);
	var itemInfo 	= Object.create(info); 
	
	itemInfo.DomId		= id;
	itemInfo.name 		= fileInfo.name;
	itemInfo.year 		= fileInfo.year;
	itemInfo.language 	= fileInfo.language;
	itemInfo.pathfile 	= pathFile;
	itemInfo.filename 	= filename;
	itemInfo.type 		= fileInfo.type;

	if(fileInfo.type == "movie"){
		movieInfo(itemInfo);

	} else if (fileInfo.type == "show"){
		showInfo(itemInfo);

	} else if (fileInfo.type == "episode"){
		episodeInfo(itemInfo);

	} else{
		itemInfo.name = fileInfo.name;
	}
	if(isTorrent){
		window.list_downloads[id].info = itemInfo;
	} else {
		window.list_uploads[id].info = itemInfo;
	}

	return itemInfo;
};


module.exports = {
	getInfoFile: getInfoFile,
	getMovieInfo: movieInfo,
	getShowInfo: showInfo,
	getEpisodeInfo: episodeInfo
}