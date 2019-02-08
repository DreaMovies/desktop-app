const fs 	= require('fs');
const path 	= require('path');
const _		= require('underscore');

const remote 	= require('electron').remote
const { Menu, MenuItem } = require('electron').remote;
const menu 		= new Menu();
var ipcRenderer = require('electron').ipcRenderer;


const subs_search 	= require('../subtitles.js');
const player 		= require('../view/player.js');


var extension_map = {
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
};

var cached = {};

var fileType = function(filepath, isTorrent) {
	var result; /* = {
		name: path.basename(filepath),
		path: filepath,
	};*/
	try {
		if(isTorrent){
			result = cached[filepath];
			if (!result) {
				for (var key in extension_map) {
					if (_.include(extension_map[key], ext)) {
						cached[ext] = result = key;
						break;
					}
				}

				if (!result)
					result = 'blank';
			}
		} else {
			var stat = fs.statSync(filepath);
			if (stat.isDirectory()) {
				return ""; //result.type = 'folder';
			} else {
				var ext = path.extname(filepath).substr(1);
				result = cached[ext];
				if (!result) {
					for (var key in extension_map) {
						if (_.include(extension_map[key], ext)) {
							cached[ext] = result = key;
							break;
						}
					}

					if (!result)
						result = 'blank';
				}
			}
		}
	} catch (e) {
		console.error(e);
	}
	return result;
};

var humanFileSize = function(bytes, si) {
	var thresh = si ? 1000 : 1024;
	if(Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}
	var units = si
		? ['kB','MB','GB','TB','PB','EB','ZB','YB']
		: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
	var u = -1;
	do {
		bytes /= thresh;
		++u;
	} while(Math.abs(bytes) >= thresh && u < units.length - 1);
	return bytes.toFixed(1)+' '+units[u];
};

// Human readable bytes util
var prettyBytes = function(num) {
	var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	if (neg)
		num = -num;
	if (num < 1)
		return (neg ? '-' : '') + num + ' B';
	exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
	num = Number((num / Math.pow(1000, exponent)).toFixed(2));
	unit = units[exponent];
	return (neg ? '-' : '') + num + ' ' + unit;
}

var createNotification = function(title, body){
	let myNotification = new Notification(title, {
		body: body,
		icon: path.join(__dirname, './../img/icons/png/64x64.png')
	})

	myNotification.onclick = () => {
		console.log('Notification clicked')
	}
};

	/**
	 * We create an object from electron module. The shell object allows us to open the selected file
	 */
var OLD_createContextMenu = function(){
	let rightClickPosition = null;

	
	menu.append(new MenuItem({
		label: 'Get Subtitles', 
		click(menuItem, browserWindow, event) {
			subs_search.getSubtitle( clicked_element.getAttribute("data-name"), clicked_element.getAttribute("data-url"));
		}
	}));
	menu.append(new MenuItem({
		label: 'Get Subtitles and Create Folder', 
		click(menuItem, browserWindow, event) {
			subs_search.getSubtitleAdvanced( clicked_element.getAttribute("data-name"), clicked_element.getAttribute("data-url"));
		}
	}));
	menu.append(new MenuItem({
		label: 'Play this video', 
		click(menuItem, browserWindow, event) {
			console.log(clicked_element); 
			player.play(clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name"));
		}
	}));
	menu.append(new MenuItem({type: 'separator'}));
	menu.append(new MenuItem({
		label: 'Download', 
		click(menuItem, browserWindow, event) {
			console.log(clicked_element); 
		}
	}));
	menu.append(new MenuItem({
		label: 'Upload', 
		click(menuItem, browserWindow, event) {
			ipcRenderer.send('file_upload', clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name"));
			ipcRenderer.on('upload_status', (event, arg) => {
				console.log(arg); // prints "pong"
			});
			//openload_upload.fileUpload(  clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name") );
		}
	}));
	menu.append(new MenuItem({type: 'separator'}));
	menu.append(new MenuItem({
		label: 'Delete', 
		click(menuItem, browserWindow, event) {
			console.log(clicked_element); 
		}
	}));
	menu.append(new MenuItem({type: 'separator'}));
	menu.append(new MenuItem({
		label: 'Inspect Element',
		click(){
			remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
		}
	}));



	window.addEventListener('contextmenu', (e) => {
		e.preventDefault()
		rightClickPosition = {x: e.x, y: e.y};
		clicked_element = e.target;
		menu.popup(remote.getCurrentWindow());
	}, false);
};
var createContextMenu = function(){
	return [
		{
			type: 'separator'
		},
		{
			label: 'Get Subtitles', 
			click(menuItem, browserWindow, event) {
				subs_search.getSubs( clicked_element.getAttribute("data-name"), clicked_element.getAttribute("data-url"));
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
			click(){
				remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
			}
		},
	];
};

var fileInfo = function(fileName, isDir, path, isTorrent) {
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
	};
	if(isTorrent){
		var regex_extension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
		var file_extension = fileName.match(regex_extension);

		var ext = fileType(file_extension, isTorrent);

	} else {
		var ext = fileType(path);
	}

	if ((show_number = regex_season_ep.exec(fileName)) !== null && ( ext == "video" || isDir ) ) {
		details.type = "show";
		details.season =  show_number[1];
		details.episode = show_number[2];
	} else if( isDir ){
		details.type = "folder";
	} else if ( regex_name_year.exec(fileName) !== null && regex_name_year.exec(fileName)[3] !== null && ext == "video" ) {
		details.type = "movie";
	} else {
		details.type = "other";
	}
	
	if( fileName.includes("8k") ){
		details.quality =  "8k";
	} else if( fileName.includes("4k") ){
		details.quality =  "4k";
	} else if( fileName.includes("1080p") ){
		details.quality =  "1080p";
	} else if( fileName.includes("720p") ){
		details.quality =  "720p";
	} else if( fileName.includes("480p") ){
		details.quality =  "480p";
	} else if( fileName.includes("HDTV") ){
		details.quality =  "HDTV";
	}

	if ( m = regex_name_year.exec(fileName) ) {
		details.name = m[1].replace(/(^|[. ]+)(\S)/g, function(all, pre, c) { return ((pre) ? ' ' : '') + c.toUpperCase(); });
		details.year = m[2];
	}

	return details;
};

// Implementation in ES6
var pagination = function(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}

var listOrder = function() {
	var field = "order_by";
	var placeholder = "Order By";
	var list = [
			{ value: "latest", 		 label: "Latest" 		},
			{ value: "oldest",  	 label: "Oldest" 		},
			{ value: "seeds", 		 label: "Seeds" 		},
			{ value: "peers", 		 label: "Peers" 		},
			{ value: "year", 		 label: "Year" 			},
			{ value: "rating", 	 	 label: "Rating" 		},
			{ value: "likes", 		 label: "Likes" 		},
			{ value: "alphabetical", label: "Alphabetical" 	},
			{ value: "downloads", 	 label: "Downloads" 	}
		];
	return {"field": field, "placeholder": placeholder, "list": list};
}

var listCategories = function() {
	var field = "genre";
	var placeholder = "Genres";
	var list = [
		{ value: "all", 		label: "All" 		 },
		{ value: "action", 		label: "Action" 	 },
		{ value: "adventure", 	label: "Adventure" 	 },
		{ value: "animation", 	label: "Animation" 	 },
		{ value: "biography", 	label: "Biography" 	 },
		{ value: "comedy", 		label: "Comedy" 	 },
		{ value: "crime", 		label: "Crime" 		 },
		{ value: "documentary", label: "Documentary" },
		{ value: "drama", 		label: "Drama" 		 },
		{ value: "family", 		label: "Family" 	 },
		{ value: "fantasy", 	label: "Fantasy" 	 },
		{ value: "film-noir", 	label: "Film-Noir" 	 },
		{ value: "game-show", 	label: "Game-Show" 	 },
		{ value: "history", 	label: "History" 	 },
		{ value: "horror", 		label: "Horror" 	 },
		{ value: "music", 		label: "Music" 		 },
		{ value: "musical", 	label: "Musical" 	 },
		{ value: "mystery", 	label: "Mystery" 	 },
		{ value: "news", 		label: "News" 		 },
		{ value: "reality-tv", 	label: "Reality-TV"  },
		{ value: "romance", 	label: "Romance" 	 },
		{ value: "sci-fi", 		label: "Sci-Fi" 	 },
		{ value: "sport", 		label: "Sport" 		 },
		{ value: "talk-show", 	label: "Talk-Show" 	 },
		{ value: "thriller", 	label: "Thriller" 	 },
		{ value: "war", 		label: "War" 		 },
		{ value: "western", 	label: "Western" 	 }
	];
	return {"field": field, "placeholder": placeholder, "list": list};
}

var listQuality = function() {
	var field = "quality";
	var placeholder = "Quality";
	var list = [
			{ value: "720p,1080p", 	label: "720p/1080p"	},
			{ value: "all", 		label: "All" 	},
			{ value: "720p", 		label: "720p"	},
			{ value: "1080p", 		label: "1080p" 	},
			{ value: "3D", 			label: "3D" 	}
		];
	return {"field": field, "placeholder": placeholder, "list": list};
}

var listSort = function() {
	var field = "sort_by";
	var placeholder = "Sort By";
	var list = [
			{ value: "date_added", 		label: "Date Added" 	},
			{ value: "title", 			label: "Title" 			},
			{ value: "year", 			label: "Year" 			},
			{ value: "rating", 			label: "Rating" 		},
			{ value: "peers", 			label: "Peers" 			},
			{ value: "seeds", 			label: "Seeds" 			},
			{ value: "download_count", 	label: "Download Count" },
			{ value: "like_count", 		label: "Like Count" 	}
		];
	return {"field": field, "placeholder": placeholder, "list": list};
}

var showLogTable = function(){
	//$("#files-container, #API-list").removeClass('show-container');
	//$("#API-list").removeClass('yts-list eztv-list dreamovies-list');
	//$("#log-container").addClass('show-container');
}


module.exports = {
	fileType: fileType,
	humanFileSize: humanFileSize,
	prettyBytes: prettyBytes,
	createNotification: createNotification,
	createContextMenu: createContextMenu,
	fileInfo: fileInfo,
	pagination: pagination,
	showLogTable: showLogTable,
	listOrder: listOrder,
	listCategories: listCategories,
	listQuality: listQuality,
	listSort: listSort,
}