const remote		= require('electron').remote;
const app 			= remote.app;

const fs 			= require('fs');
var path 			= require('path');
var ipcRenderer 	= require('electron').ipcRenderer;

const ABSPATH 		= path.dirname(process.mainModule.filename); // Absolute path to our app directory

var util_tools		= require('../js/util.js');
var player			= require('../view/player.js');
var views			= require('../view/generic_view.js');

var getOSFolder = function (name){
	return ipcRenderer.getPath(name);
};


var readFolderOrder = function (url_path, isOS = false) {
	
	var realPath = "";
	if( isOS ){
		realPath = app.getPath(url_path);//getOSFolder(url_path);
	} else {
		realPath = url_path;
	}
	realPath = path.resolve(realPath).replace(/\\/g, '/') + '/';

	let files = fs.readdirSync( realPath ); // You can also use the async method
	let filesWithStats = [];
	if( files.length > 1 ) {
		let sorted = files.sort((a, b) => {
			let s1 = fs.statSync(realPath + a);
			let s2 = fs.statSync(realPath + b);
			return s1.ctime < s2.ctime;
		});
		sorted.forEach(file => {
			filesWithStats.push({
				filename: file,
				date: new Date(fs.statSync(realPath + file).ctime),
				path: path + file
			});
		});
	} else {
		files.forEach(file => {
			filesWithStats.push({
				filename: file,
				date: new Date(fs.statSync(realPath + file).ctime),
				path: path + file
			});
		});
	}
	return filesWithStats;
}

var readFolder = function (url_path, isOS = false) {
	console.log(url_path);
	var realPath = "";
	var elements_list = "";

	if( isOS ){
		realPath = app.getPath(url_path);//getOSFolder(url_path);
	} else {
		realPath = url_path;
	}
	realPath = path.resolve(realPath).replace(/\\/g, '/') + '/';

	fs.readdir(realPath, (err, files) => {
		'use strict';
		if (err) throw  err;
		//Dynamically add <ol> tags to the div
		document.getElementById('Folders-list').innerHTML = '';

		var split_path = realPath;
		if(split_path.split('/').length == 1){
			if(split_path.substr(split_path.length - 1) != '\\'){
				split_path = split_path + '\\';
			}
			split_path = split_path.split('\\');
		} else {
			if(split_path.substr(split_path.length - 1) != '/'){
				split_path = split_path + '/';
			}
			split_path = split_path.split('/');
		}

		var conc_link = "";
		var link_html = "";
		var path_length = split_path.length;

		for (var i = 0; i < path_length - 1; i++) {
			conc_link +=  split_path[i] + "/";
			if( i < path_length - 2 ) {
				link_html += `<li class='breadcrumb-item'>
								<a href="#" class="path-link" data-path='${ encodePath(conc_link) }'>${ split_path[i] }</a>
							</li>`;
			} else {
				link_html += `<li class='breadcrumb-item active' aria-current='page'>${ split_path[i] }</li>`;
			}
		}

		//create html for table list
		document.getElementById('Folders-list').innerHTML = ''+
					'<div class="content" id="folder-path">' + 
					'	<nav aria-label="breadcrumb">' +
					'		<ol class="breadcrumb">' +
								link_html + 
					'		</ol>' +
					'	</nav>' +
					'</div>' +
					'<table class="table table-hover table-bordered" id="listed-files">' +
					'	<thead class="thead-light">' +
					'		<tr>' +
					'			<th class="col-5">File</th>' +
					'			<th class="col-2">Type</th>' +
					'			<th class="col-2">Size</th>' +
					'			<th class="col-1">Quality</th>' +
					'			<th class="col-1">Season Episode</th>' +
					'			<th class="col-1">Actions</th>' +
					'		</tr>' +
					'	</thead>' +
					'	<tbody id="path-list"></tbody>' +
					'</table>';

		var count = 0;
		for (let file of files) {
			fs.stat(realPath + file, (err, stats) => {
				count++;
				/*
				 * When you double click on a folder or file, we need to obtain the realPath and name so that we can use it to take action. The easiest way to obtain the realPath and name for each file and folder, is to store that information in the element itself, as an ID. this is possible since we cannot have two files with the same name in a folder. fullPath variable below is created by concatenating the realPath with file name and a / at the end. As indicated earlier, we must have the / at the end of the realPath.
				 */

				let fullPath = realPath + file;
				
				var show_info = "";
				var element_details = { type: "", name: "", year: "", quality: "", season: "", episode: "" };

				var element_details = util_tools.fileInfo(file, stats.isDirectory(), fullPath);
				if( element_details.type == "show" ){
					show_info = "S" + element_details.season + " E" + element_details.episode;
				}
				if (err) throw err;
				if (stats.isDirectory()) {
					fullPath += '/';
					elements_list = `<tr data-path="${ encodePath(fullPath) }" class='list-item list-folder'>
										<td alt="${ file }" 
											title="${ file }" 
											data-url="${ encodePath(fullPath) }" 
											data-name="${ file }">
												<i class='fas fa-folder'></i> 
												${ ( element_details.name != '' ?  element_details.name : file ) }
												<small style='float:right'>${ file }</small>
										</td>
										<td class='text-right'>${ element_details.type }</td>
										<td class='text-right'>${ show_info }</td>
										<td class='text-right'>${ element_details.quality }</td>
										<td class='text-right'></td>
										<td class='text-right'>
											<div class="dropdown">
												<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownItemList_${count}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													<i class="fas fa-ellipsis-v"></i>
												</button>
												<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownItemList_${count}">
													<a  class="dropdown-item subs_search" 
														href="#"
														data-url="${ fullPath.substr(0, fullPath.lastIndexOf('/')) }/" 
														data-name="${ file }">
															Get Subtitles
													</a>
												</div>
											</div>
										</td>
									</tr>`;
				} else {
					elements_list = `<tr data-path="${ encodePath(fullPath) }" class='list-item list-file'>
										<td alt="${ file }" 
											title="${ file }" 
											data-url="${ fullPath.substr(0, fullPath.lastIndexOf('/')) }/" 
											data-name="${ file }">
												<i class='fas fa-${ util_tools.fileType(fullPath) }'></i> 
												${ ( element_details.name != '' ?  element_details.name : file ) }
												<small style='float:right'>${ file }</small>
										</td>
										<td class='text-right'>${ element_details.type }</td>
										<td class='text-right'>${ show_info }</td>
										<td class='text-right'>${ element_details.quality }</td>
										<td class='text-right'>${ util_tools.humanFileSize(stats.size, true) }</td>
										<td class='text-right'>
											<div class="dropdown">
												<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownItemList_${count}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													<i class="fas fa-ellipsis-v dropdown-toggle"
														data-url="${ fullPath.substr(0, fullPath.lastIndexOf('/')) }/" 
														data-name="${ file }">
													</i>
												</button>
												<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownItemList_${count}">
													<a  class="dropdown-item subs_search" 
														href="#"
														data-url="${ fullPath.substr(0, fullPath.lastIndexOf('/')) }/" 
														data-name="${ file }">
															Get Subtitles
													</a>
													<a class="dropdown-item" href="#">Another action</a>
													<a class="dropdown-item" href="#">Something else here</a>
												</div>
											</div>
										</td>
									</tr>`;
				}
				document.getElementById('path-list').insertAdjacentHTML('beforeend', elements_list);
			});
		}
	});
	views.activateView();
};

//open the file with the default application
var openFile = function (url_path) {
	if(util_tools.fileType(url_path) == "video"){
		player.play(url_path);
	} else {
		shell.openItem(url_path);
	}
};

var encodePath = function (pathFile){
	var map = {
		'&': '%26',
		'<': '%3c',
		'>': '%3e',
		'"': '%22',
		"'": '%27'
	};

	return pathFile;//return encodeURI(pathFile).replace(/[&<>"']/g, function(m) { return map[m];});
}

var decodePath = function (pathFile){
	var map = {
		'%26' : '&',
		'%3c' : '<',
		'%3e' : '>',
		'%22' : '"',
		'%27' : "'"
	};
	
	return pathFile;//return decodeURI(pathFile).replace(/[%26%3c%3e%22%27]/g, function(m) { return map[m];});
}


//open the file with the default application
var refreshFolder = function (path) {
	readFolder(path);
};

module.exports = {
	openFile: openFile,
	getOSFolder: getOSFolder,
	readFolder: readFolder,
	refreshFolder: refreshFolder,
	decodePath: decodePath
}