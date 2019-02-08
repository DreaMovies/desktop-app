const fs 	= require('fs');
const path 	= require('path');
const _		= require('underscore');

const remote 	= require('electron').remote
var ipcRenderer = require('electron').ipcRenderer;


export default {
	cached: {},
	extension_map: {
		'archive': ['zip', 'rar', 'gz', '7z'],
		'text': ['txt', 'md', '', 'srt', 'vtt', 'json'],
		'image': ['jpg', 'jpge', 'png', 'gif', 'bmp'],
		'pdf': ['pdf'],
		'code': ['html', 'css', 'js'],
		'word': ['doc', 'docx'],
		'powerpoint': ['ppt', 'pptx'],
		'video': ['mkv', 'avi', 'rmvb', 'mp4', 'flv', 'wmv', 'mpeg'],
		'audio': ['mp3', 'ogg', 'm4a', 'flac', 'wav', 'wma', 'webm', '3gp', 'aac'],
		'torrent': ['torrent']
	},

	fileType(filepath, isTorrent) {
		var result; /* = {
			name: path.basename(filepath),
			path: filepath,
		};*/
		try {
			if (isTorrent) {
				result = this.cached[filepath];
				if (!result) {
					for (var key in this.extension_map) {
						if (_.include(this.extension_map[key], ext)) {
							this.cached[ext] = result = key;
							break;
						}
					}

					if (!result)
						result = 'blank';
				}
			} else {
				var stat = fs.statSync(filepath);
				if (stat.isDirectory()) {
					return "folder"; //result.type = 'folder';
				} else {
					var ext = path.extname(filepath).substr(1);
					result = this.cached[ext];
					if (!result) {
						for (var key in this.extension_map) {
							if (_.include(this.extension_map[key], ext)) {
								this.cached[ext] = result = key;
								break;
							}
						}

						if (!result)
							result = 'text';
					}
				}
			}
		} catch (e) {
			console.error(e);
		}
		return result;
	},
	humanFileSize(bytes, si) {
		var thresh = si ? 1000 : 1024;
		if (Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}
		var units = si
			? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
			: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while (Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1) + ' ' + units[u];
	},
// Human readable bytes util
	prettyBytes(num) {
		var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		if (neg)
			num = -num;
		if (num < 1)
			return (neg ? '-' : '') + num + ' B';
		exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
		num = Number((num / Math.pow(1000, exponent)).toFixed(2));
		unit = units[exponent];
		return (neg ? '-' : '') + num + ' ' + unit;
	},
	createNotification(title, body) {
		let myNotification = new Notification(title, {
			body: body,
			//icon: path.join(__dirname, './../img/icons/png/64x64.png')
		})

		myNotification.onclick = () => {
			console.log('Notification clicked')
		}
	},
	/**
	 * We create an object from electron module. The shell object allows us to open the selected file
	 */
	createContextMenu() {
		return [
			{
				type: 'separator'
			},
			{
				label: 'Get Subtitles',
				click(menuItem, browserWindow, event) {
					subs_search.getSubs(clicked_element.getAttribute("data-name"), clicked_element.getAttribute("data-url"));
				}
			},
			{
				label: 'Play video',
				click(menuItem, browserWindow, event) {
					console.log(clicked_element);
					player.play(clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name"));
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Download',
				click(menuItem, browserWindow, event) {
					console.log(clicked_element);
				}
			},
			{
				label: 'Upload',
				click(menuItem, browserWindow, event) {
					ipcRenderer.send('file_upload', clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name"));
					ipcRenderer.on('upload_status', (event, arg) => {
						console.log(arg); // prints "pong"
					});
					//openload_upload.fileUpload(  clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name") );
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'About app',
				click(menuItem, browserWindow, event) {
					console.log(clicked_element);
				}
			},
			{
				label: 'Inspect Element',
				click() {
					remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
				}
			},
		];
	},
	fileInfo(fileName, isDir, path, isTorrent) {
		//a more complex example to see later //TODO
		//https://regex101.com/r/mR6oD4/1/codegen?language=javascript
		var regex_name_year = /^(.+?)[.( \t]*(?:(19\d{2}|20(?:0\d|1[0-9])).*|(?:(?=bluray|\d+p|brrip|webrip|HDTV)..*)?[.](mkv|avi|mpe?g|mp4)$)/i;
		var regex_season_ep = /[sS]?0*(\d+)?[Ee]0*(\d+)/g;
		var m = "";
		var details = {
			type: "",
			name: "",
			year: "",
			quality: "",
			season: "",
			episode: "",
			language: "",
			ext: "",
			rawExt: "",
		};
		if (isTorrent) {
			var regex_extension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
			var file_extension = fileName.match(regex_extension);

			var ext = this.fileType(file_extension, isTorrent);

		} else {
			var ext = this.fileType(path);
		}
		details.ext = ext;


		let show_number;
		if ((show_number = regex_season_ep.exec(fileName)) !== null && (ext == "video" || isDir)) {
			details.type = "show";
			details.season = show_number[1];
			details.episode = show_number[2];
		} else if (isDir) {
			details.type = "folder";
		} else if (regex_name_year.exec(fileName) !== null && regex_name_year.exec(fileName)[3] !== null && ext == "video") {
			details.type = "movie";
		} else {
			details.type = "other";
		}

		if (fileName.includes("8k")) {
			details.quality = "8k";
		} else if (fileName.includes("4k")) {
			details.quality = "4k";
		} else if (fileName.includes("1080p")) {
			details.quality = "1080p";
		} else if (fileName.includes("720p")) {
			details.quality = "720p";
		} else if (fileName.includes("480p")) {
			details.quality = "480p";
		} else if (fileName.includes("HDTV")) {
			details.quality = "HDTV";
		}

		if (m = regex_name_year.exec(fileName)) {
			details.name = m[1].replace(/(^|[. ]+)(\S)/g, function (all, pre, c) {
				return ((pre) ? ' ' : '') + c.toUpperCase();
			});
			details.year = m[2];
		}

		return details;
	},
}