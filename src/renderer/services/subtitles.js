import path 	from 'path';
import fs       from 'fs';
import axios    from 'axios';                       //to make http requests
import zlib     from 'zlib';                        //to read zipped files
import iconv    from 'iconv-lite';                  //to recode files
import srt2vtt  from 'srt-to-vtt';
//https://github.com/vankasteelj/opensubtitles-api
import OpenSubtitles from 'opensubtitles-api';             //for subtitles
//create new instance
import yifysubtitles from 'yifysubtitles-api';
const OpenSub = new OpenSubtitles("Butter");

export default {
	config: {
		name: "subtitles",
		label: "Subtitles Search",
		type: "subtitles",
		subtitles: []
	},
	getSubs(name, path) {
		const search_conf = this.getType(name, path);

		if (this.API_search_OS(search_conf.config_OS, path) == 0)
			if (this.API_search_YIFI(name, search_conf, path) == 0)
				if (this.API_search_Pipocas(name, search_conf, path) == 0)
					alert("No subtitles found in 3 API's!!! :(");
	},
	/*  Search in OpenSubtitles API for the given name
	 *  - name
	 *  - config
	 */
	API_search_OS(config, path) {
		const Self = this;
		//search in OpenSubtitles API
		OpenSub.search(config)
			.then(subtitles => {
				const subs_total = Object.keys(subtitles).length;
				console.log('Subtitle found:' + subs_total);
				if (subs_total > 0) {
					Object.keys(subtitles).forEach(function (key) {
						Self.saveToFile(subtitles[key].url, path, key + "_" + subtitles[key].filename, subtitles[key].encoding);
					});
				} else {
					throw 'no subtitle found';
				}
			}).catch(console.error);
	},

	/*
	 *  Search in OpenSubtitles API for the given name
	 *
	 *  - name
	 *  - config
	 */
	API_search_YIFI(name, config, path) {
		const Self = this;
		yifysubtitles.search({
			imdbid: 'tt0120915',
			limit: 'best'
		}).then(subtitles => {
			let subs_total = Object.keys(subtitles).length;
			console.log('Subtitle found:' + subs_total);
			if (subs_total > 0) {
				Object.keys(subtitles).forEach(function (key) {
					Self.saveToFile(subtitles[key].url, path, key + "_" + subtitles[key].filename, subtitles[key].encoding); //(fileUrl, path, LocalPathFile)
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
	},

	/*  Search in Pipocas.Tv API for the given name (mostly PT and PT-BR)
	 *  - name
	 *  - type [movie/show]
	 *  - config
	 *  > http://api.pipocas.tv/search/serie/[appkey]/[imdb]/[pt|br|all]/[release]
	 *  > http://api.pipocas.tv/search/movie/[appkey]/[imdb]/[pt|br|all]/[release]
	 */
	API_search_Pipocas(name, config = {}) {
		const Self = this;
		const uri = "http://api.pipocas.tv/search/";
		const config_pipocas = {
			type: config.type || "movie",//"movie"/"serie"
			key: "",
			imdb: "",
			lang: "all",//[pt|br|all]
			release: "" //The.Exes.S02E11.Hes.Gotta.Have.It.WEB-DL.XviD-TVSR
		}
		const full_uri = uri + Object.values(config_pipocas).join("/");
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
	},
	/*  It will receive the content and save it to a file
	 *  with the given name to a given path
	 *  - content
	 *  - name
	 *  - path
	 */
	saveToFile(fileUrl, basePath, localPath, encoding) {
		console.log("save subtitles");
		if (!fs.lstatSync(basePath).isDirectory()) {
			basePath = path.dirname(basePath);
		}
		let folder = basePath + "/subs/";
		// check if folder exists, or else it creates a new
		if (!fs.existsSync(folder)) {
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
			zlib.unzip(result.data, (error, buffer) => {
				if (error) {
					throw error;
				}
				fs.writeFileSync(folder + localPath, iconv.decode(buffer, encoding)); //(output, content)
				//now convert all files to VTT for most players
				this.subs_to_vtt(folder, localPath);
			});
		});
	},
	/*
	 *  It will receive the str file and create a new VTT File
	 *
	 *  - complete folder path
	 *  - local file name
	 */
	subs_to_vtt(folder, localPath) {
		let folder_vtt = folder + "/vtt/";
		if (!fs.existsSync(folder_vtt)) {
			fs.mkdirSync(folder_vtt);
		}
		//let srtData = fs.readFileSync(output);
		fs.createReadStream(folder + localPath)
			.pipe(srt2vtt())
			.pipe(fs.createWriteStream(folder_vtt + localPath.split(".srt")[0] + '.vtt'))
	},

	/*
	 *  Pass folder path, then it will read all the files of the folder and
	 *  if movies or shows, it will search for subtitles
	 *
	 *  - folder_path
	 */
	readFolder(folder_path) {
		//cycle to read folders
		const name = readFile(file_name);
		this.getSubs(name);
	},
	readFile(name, path) {
		this.getSubs(name, path);
		return name;
	},
	getType(name, path) {
		let regex = /[sS]?0*(\d+)?[Ee]0*(\d+)/g;
		let show_info;
		let config = {};

		let treated_name = name.split("1080p").join('.').split("720p").join('.').split("480p");
		treated_name = treated_name[0].replace(".", " ");

		if ((show_info = regex.exec(name)) !== null) {
			config.type = "shows";
			config.config_OS = {
				//filename:     name + path,
				query: treated_name,
				sublanguageid: 'eng,fre,por,deu,ita,spa,ell,pol',
				season: show_info[1],
				episode: show_info[2],
				gzip: true,
				extensions: ['vtt', 'srt'],
			};
		} else {
			config.type = "movies";
			config.config_OS = {
				//filename:     name + path,
				query: treated_name,
				sublanguageid: 'eng,fre,por,deu,ita,spa,ell,pol',
				gzip: true,
				extensions: ['vtt', 'srt'],
			};
		}
		return config;
	},
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
}