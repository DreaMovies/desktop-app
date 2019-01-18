var WebTorrent 	= require('webtorrent');

var infoFetcher	= require('../js/info_fetcher.js');
var views 		= require('../view/generic_view.js');
var util		= require('../js/util.js');

let client = window.client = new WebTorrent();
// WebTorrent-to-HTTP streaming sever
let server = null;

const DOWNLOAD_FOLDER = "C:/Users/miguel.cerejo/Documents/Download/torrent";//"C:/Users/user/Documents/Download/torrent";

/*
 * Add a torrent to the client
 */
var torrentAdd = function(filePath, toDiscover = false){
	var current_id = Date.now();

	views.activateView();
	//$(".download-side .loading").addClass("show");
	if(toDiscover){
		client.add(filePath, {path: DOWNLOAD_FOLDER}, function (torrent) {
			torrentDiscover(torrent.infoHash);
		});
	} else {
		previewFile(filePath);
	}
}
/*
 * Search for the video Type file
 */
var torrentDiscover = function(infoHash){
	var torrent = client.get(infoHash);
	if (torrent == null) {
		client.add(infoHash, {path: DOWNLOAD_FOLDER});
		torrent = client.get(infoHash);
	}

	var file_index = 0;
	
	// Torrents can contain many files. Let's use the .mp4 file
	var file = torrent.files.find(function (file) {
		if( file.name.endsWith('.mp4') ){
			console.log(file);
			//file_index = file;
			return file.name.endsWith('.mp4');
		} else if( file.name.endsWith('.mkv') ){
			console.log(file);
			return file.name.endsWith('.mkv');
		} else if( file.name.endsWith('.avi') ){
			console.log(file);
			return file.name.endsWith('.avi');
		}
		file_index++;
	});

	if (torrent.ready){
		torrentDownload(infoHash, file_index);
	} else {
		torrent.on('ready', torrentDownload(infoHash, file_index));
	}
}

/*
 * Downloads from torrent the asked file
 */
var torrentDownload = function (infoHash, filePosition) {

	var torrent = client.get(infoHash);
	if(torrent.ready){
		var current_id = Date.now();
		// create HTTP server for this torrent
		var server = torrent.createServer();
		server.listen(8888); // start the server listening to a port

		util.createNotification('Download Started', torrent.name);
		console.log('Client is downloading:', torrent.infoHash);
		
		//initialize object to prevent error 
		window.list_downloads[current_id] = {};
		window.list_downloads[current_id].torrent = torrent;

		var file = torrent.files[filePosition];
		console.log(torrent);
		
		console.log(torrent.ready);
		console.log(file);
		console.log(torrent.name );
		console.log(torrent.dn);
		console.log((file != undefined ? file.name : "empty"));
		console.log((torrent.name != undefined ? torrent.name : torrent.dn));
		console.log((file != undefined ? file.name : (torrent.name != undefined ? torrent.name : torrent.dn)));

		var filename = (file != undefined ? file.name : (torrent.name != undefined ? torrent.name : torrent.dn));

		var file_path = DOWNLOAD_FOLDER + "/" + torrent.infoHash  + "/" + filename;
		var info = infoFetcher.getInfoFile(filename, file_path, current_id, true);


		views.listItem("download", current_id, info);
		views.activateView();

		//$(".download-side .loading").removeClass("show");

		torrent.on('warning', function (err) {
			console.log(err);
		});
		torrent.on('error', function (err) {
			console.log(err);
		});


		//// Trigger statistics refresh
		//torrent.on('done', function(torrent, current_id){
		//	onProgress(current_id);
		//	clearInterval(window.torrent_interval[current_id]);
		//});
		window.torrent_interval[current_id] = setInterval( function(e){
			onProgress(current_id);
		}, 500);
		onProgress(current_id);
		
	} else {
		torrentDownload(infoHash, filePosition);
	}
	
}


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

// Statistics
var onProgress = function(id) {
	var torrent = window.list_downloads[id].torrent
	// Remaining time
	var remaining;
	if (torrent.done) {
		remaining = 'Done.';
		util.createNotification('Download Complete', torrent.name);

		torrent.destroy(function(){
			console.log("torrent totally destroyed");
		});

		clearInterval(window.torrent_interval[id]);
		//server.close();
		//client.destroy();

	} else {
		remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize();
		remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.';
	}
	console.log(remaining);

	var torrent_info = {
			id : id,
			hash : torrent.hash,
			numPeers : torrent.numPeers,
			progress : Math.round(torrent.progress * 100 * 100) / 100,
			downloaded : prettyBytes(torrent.downloaded),
			total : prettyBytes(torrent.length),
			remaining : remaining,
			isDone : torrent.done,
			downloadSpeed : prettyBytes(torrent.downloadSpeed) + '/s',
			uploadSpeed : prettyBytes(torrent.uploadSpeed) + '/s',
		};
	window.list_downloads[id].torrent_info = torrent_info;

	console.log(window.list_downloads[id]);
	
	views.downloadUpdate(torrent_info);
}

var destroyClient = function(e){
	console.log("WebTorrent Client destroyed!");
	server.close();
	client.destroy();
}

var stopTorrent = function(infoHash) {
	console.log('--- STOP TORRENT: ', infoHash);
	const torrent = client.get(infoHash);
	if (torrent) torrent.destroy();
}


var previewFile = function(filePath){
	console.log(client.torrents);
	client.add(filePath, {path: DOWNLOAD_FOLDER}, function (torrent) {
		views.TorrentList(torrent.files, torrent.infoHash);
	});
};


//$(document).on('click', '.torrent-select', function(e){
//	var file_position = $(this).data('position');
//	var file_hash = $(this).data('hash');
//	$('#modalListTorrent').modal('hide');
//
//	var torrent = client.get(file_hash);
//	if (torrent.ready){
//		torrentDownload(file_hash, file_position);;
//	} else {
//		torrent.on('ready', torrentDownload(file_hash, file_position));
//	}
//});



module.exports = {
	torrentAdd: torrentAdd,
	torrentDownload: torrentDownload,
	torrentDiscover: torrentDiscover,
	stopTorrent: stopTorrent,
	destroyClient: destroyClient,
	previewFile: previewFile
}