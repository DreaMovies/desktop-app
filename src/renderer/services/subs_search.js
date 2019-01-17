const fs            = require('fs');
const path 			= require('path');
const axios         = require('axios');                       //to make http requests
const zlib          = require('zlib');                          //to read zipped files
const iconv         = require('iconv-lite');                    //to recode files
const jQuery        = require("jquery");
const srt2vtt       = require('srt-to-vtt');

var subtitles     	= [];

//https://github.com/vankasteelj/opensubtitles-api
const OpenSubtitles = require('opensubtitles-api');             //for subtitles
//create new instance
const OS            = new OpenSubtitles('Butter');
const yifysubtitles = require('yifysubtitles-api');

//TODO instal npm packages from this file


var getSubs = function (name, path) {
	const search_conf = getType(name, path);

	if( API_search_OS(search_conf.config_OS, path) == 0 )
		if( API_search_YIFI(name, search_conf, path) == 0 )
			if( API_search_Pipocas(name, search_conf, path) == 0 )
				alert("No subtitles found in 3 API's!!! :(");
}

/*
 *  Search in OpenSubtitles API for the given name
 *
 *  - name
 *  - config
 */
//var API_search_OS = function (config, path) {

function API_search_OS (config, path) {
	//search in OpenSubtitles API
	OS.search(config)
		.then(subtitles => {
			subs_total = Object.keys(subtitles).length;
			console.log('Subtitle found:' + subs_total);
			if (subs_total > 0) {
				Object.keys(subtitles).forEach(function(key) {
					saveToFile(subtitles[key].url, path, key + "_" + subtitles[key].filename, subtitles[key].encoding);
				});
			} else {
				throw 'no subtitle found';
			}
		}).catch(console.error);
}

/*
 *  Search in OpenSubtitles API for the given name
 *
 *  - name
 *  - config
 */
var API_search_YIFI = function (name, config, path) {
	yifysubtitles.search({
		imdbid:'tt0120915',
		limit:'best'
	}).then(subtitles => {
		subs_total = Object.keys(subtitles).length;
		console.log('Subtitle found:' + subs_total);
		if (subs_total > 0) {
			Object.keys(subtitles).forEach(function(key) {
				saveToFile(subtitles[key].url, path, key + "_" + subtitles[key].filename, subtitles[key].encoding); //(fileUrl, path, LocalPathFile)
			});
		} else {
			throw 'no subtitle found';
		}
	}).catch(console.error);
	/*
	Object {
		en: [{
			id: "192883746",
			lang: "en",
			langName: "English",
			rating: 9,
			release: 'Some Movie by UploadTeam',
			url: "http://some-url.com/link-to-archive.zip",
			hi: false
		}]
	}
	*/
}

/*
 *  Search in Pipocas.Tv API for the given name (mostly PT and PT-BR)
 *
 *  - name
 *  - type [movie/show]
 *  - config
 * 
 *  > http://api.pipocas.tv/search/serie/[appkey]/[imdb]/[pt|br|all]/[release]
 *  > http://api.pipocas.tv/search/movie/[appkey]/[imdb]/[pt|br|all]/[release]
 */
var API_search_Pipocas = function (name, config = {}) {

	const uri = "http://api.pipocas.tv/search/";
	const config = {
		type: config.type || "movie",//"movie"/"serie"
		key: "",
		imdb: "",
		lang: "all",//[pt|br|all]
		release: "" //The.Exes.S02E11.Hes.Gotta.Have.It.WEB-DL.XviD-TVSR
	}
	const full_uri = uri + Object.values(config).join("/");
	/*
		{
			"Error": "200",
			"Results": 1,
			"Subtitles": [
				{
					"Title": "The Exes",
					"Year": "2011",
					"Language": "BR",
					"IMDB": "1830888",
					"DW": "http://api.pipocas.tv/download/5f3bebc9d877999c95e86ba233de817a7256b268/33697/TheExes.zip"
				}
			]
		}
	*/
}

/*
 *  It will receive the content and save it to a file 
 *  with the given name to a given path
 *
 *  - content 
 *  - name
 *  - path
 */
var saveToFile = function (fileUrl, basePath, localPath, encoding) {
	var subs_total = 0;
	if( !fs.lstatSync(basePath).isDirectory()){
		basePath = path.dirname(basePath);
	}
	var folder = basePath + "/subs/";
	// check if folder exists, or else it creates a new
	if (!fs.existsSync(folder)){
		fs.mkdirSync(folder);
	}

	return axios.request({
		url: fileUrl,
		responseType: 'arraybuffer',
		method: 'get',
		headers: {
			'Content-Type': 'application/force-download',
		},
	}).then((result) => {
		require('zlib').unzip(result.data, (error, buffer) => {
			if (error){
				throw error;
			}
			fs.writeFileSync(folder + localPath, iconv.decode(buffer, encoding)); //(output, content)
			//now convert all files to VTT for most players
			subs_to_vtt(folder, localPath);
		});
	});
}

/*
 *  It will receive the str file and create a new VTT File
 *
 *  - complete folder path 
 *  - local file name
 */
var subs_to_vtt = function (folder, localPath) {
	var folder_vtt = folder + "/vtt/";
	if (!fs.existsSync(folder_vtt)){
		fs.mkdirSync(folder_vtt);
	}
	//var srtData = fs.readFileSync(output);
	fs.createReadStream(folder + localPath)
	  .pipe(srt2vtt())
	  .pipe(fs.createWriteStream(folder_vtt + localPath.split(".srt")[0] + '.vtt'))
}

/*
 *  Pass folder path, then it will read all the files of the folder and
 *  if movies or shows, it will search for subtitles
 *
 *  - folder_path 
 */
var readFolder = function (folder_path) {
	//cycle to read folders
	const name = readFile(file_name);
	getSubs(name);
}

var readFile = function (name, path) {
	getSubs(name, path);
	return name;
}

var getType = function(name, path){
	var regex = /[sS]?0*(\d+)?[Ee]0*(\d+)/g;
	var show_info;
	var config = {};

	treated_name = name.split("1080p").join('.').split("720p").join('.').split("480p");
	treated_name = treated_name[0].replace(".", " ");

	if ((show_info = regex.exec(name)) !== null) {
		config.type = "shows";
		config.config_OS = {
			//filename:     name + path,
			query:          treated_name,
			sublanguageid:  'eng,fre,por,deu,ita,spa,ell,pol',
			season:         show_info[1],
			episode:        show_info[2],
			gzip:           true,
			extensions: ['vtt','srt'], 
		};
	} else {
		config.type = "movies";
		config.config_OS = {
			//filename:     name + path,
			query:          treated_name,
			sublanguageid:  'eng,fre,por,deu,ita,spa,ell,pol',
			gzip:           true,
			extensions: ['vtt','srt'],
		};
	}
	return config;
};


module.exports = {
	getSubs: getSubs,
	readFolder: readFolder,
	readFile: readFile
};


/*
/**	***********
	Example
  **************

OpenSubtitles.search({
	sublanguageid: 'fre',       // Can be an array.join, 'all', or be omitted.
	hash: '8e245d9679d31e12',   // Size + 64bit checksum of the first and last 64k
	filesize: '129994823',      // Total size, in bytes.
	path: 'foo/bar.mp4',        // Complete path to the video file, it allows
								//   to automatically calculate 'hash'.
	filename: 'bar.mp4',        // The video file name. Better if extension
								//   is included.
	season: '2',
	episode: '3',
	extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
	limit: '3',                 // Can be 'best', 'all' or an
								// arbitrary nb. Defaults to 'best'
	imdbid: '528809',           // 'tt528809' is fine too.
	fps: '23.96',               // Number of frames per sec in the video.
	query: 'Charlie Chaplin',   // Text-based query, this is not recommended.
	gzip: true                  // returns url to gzipped subtitles, defaults to false
}).then(subtitles => {
	// an array of objects, no duplicates (ordered by
	// matching + uploader, with total downloads as fallback)

	subtitles = Object {
		en: {
			downloads: "432",
			encoding: "ASCII",
			id: "192883746",
			lang: "en",
			langName: "English",
			score: 9,
			url: "http://dl.opensubtitles.org/download/subtitle_file_id",
			filename: "some_movie.tag.srt"
		}
		fr: {
			download: "221",
			encoding: "UTF-8",
			id: "1992536558",
			lang: "fr",
			langName: "French",
			score: 6,
			url: "http://dl.opensubtitles.org/download/subtitle_file_id",
			filename: "some_movie.tag.srt"
		}
	}
});
*/