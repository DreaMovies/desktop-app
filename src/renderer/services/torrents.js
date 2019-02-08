import WebTorrent   from 'webtorrent';
import moment from 'moment';

export default {
	config: {
		name: "torrent",
		label: "Torrents Handler",
		type: "handler",
		torrent: {
			path: "C:/Users/miguel.cerejo/Documents/Download/torrent", // Folder to download files to (default=`/tmp/webtorrent/`)
			//announce: [String],        // Torrent trackers to use (added to list in .torrent or magnet uri)
			//getAnnounceOpts: Function, // Custom callback to allow sending extra parameters to the tracker
			//maxWebConns: Number,       // Max number of simultaneous connections per web seed [default=4]
			//store: Function            // Custom chunk store (must follow [abstract-chunk-store](https://www.npmjs.com/package/abstract-chunk-store) API)
		},
	},
	data: {
		torrent: null,
		//download_folder:  "C:/Users/miguel.cerejo/Documents/Download/torrent",//"C:/Users/user/Documents/Download/torrent";
		file: {
			name: "",
			path: ""
		},
		progress: {
			speed: {
				download: "0",
				upload: "0"
			},
			peer: 0,
			complete: "0",
			percentage: 0,
			time: "0"
		},
	},
	client: new WebTorrent({
		maxConns: 100,        // Max number of connections per torrent (default=55)
		//nodeId: String|Buffer,   // DHT protocol node ID (default=randomly generated)
		//peerId: String|Buffer,   // Wire protocol peer ID (default=randomly generated)
		//tracker: Boolean|Object, // Enable trackers (default=true), or options object for Tracker
		//dht: Boolean|Object,     // Enable DHT (default=true), or options object for DHT
		//webSeeds: Boolean        // Enable BEP19 web seeds (default=true)
	}),
	server: null,

	addTorrent(magnetUri, callback){
		console.log("[Torrent] Add Torrent");
		const torrent = this.client.get(magnetUri) || this.client.add(magnetUri, this.config.torrent);
		// make sure metadata is available before path matching
		if (torrent.metadata) {
			this.streamFile(torrent, callback);
		} else {
			torrent.once('ready', () => this.streamFile(torrent, callback));
		}
	},

	streamFile(torrent, callback) {
		console.log("[Torrent] Get File to stream");
		this.data.torrent = torrent;
		let path = '';
		// only render the first file found matching the path exactly
		const fileToPlay = torrent.files.find((file) => {
			if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv') || file.name.endsWith('.avi')) {
				// only set rootDir if the file is in a directory
				const rootDir = /\//.test(file.path) ? (torrent.name + '/') : '';
				path = path.replace(/^\//, ''); // remove initial / if present
				return file.path;// === rootDir + path;
			}
			//if (!path) return true; // if no path is specified, render the first file
		});

		if (!fileToPlay) {
			throw new Error('[Torrent] No file found matching this path: ' + path);
		}

		//fileToPlay.renderTo('video', {
		//	autoplay: true, controls: true // stops any overwrite of the element's values
		//}, (err, elem) => {
		//	if (err) throw err;
		//	console.log('magnet-loaded');
		//});
		this.data.file.name = fileToPlay.name;
		this.data.file.path = (fileToPlay.path).replace("\\", "/");

		callback();

		this.updateProgress();
	},

	/* WebTorrent Related */
	updateProgress() {
		this.progress.speed.download    = this.prettyBytes(this.data.torrent.downloadSpeed);
		this.progress.speed.upload      = this.prettyBytes(this.data.torrent.uploadSpeed);
		this.progress.peer              = this.data.torrent.numPeers;
		this.progress.percentage    = Math.round((this.data.torrent.received / this.data.torrent.length) * 100);
		this.progress.complete      = this.prettyBytes(this.data.torrent.received);
		this.progress.time          = this.remainingTime(this.data.torrent.timeRemaining);

		if (this.progress.percentage != 100) {
			setTimeout(this.updateProgress, 500);
		}
	},
	/* Human readable bytes util */
	prettyBytes(num) {
		let exponent,
			unit,
			neg = num < 0,
			units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		if (neg)
			num = -num;
		if (num < 1)
			return (neg ? '-' : '') + num + ' B';
		exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
		num = Number((num / Math.pow(1000, exponent)).toFixed(2));
		unit = units[exponent];
		return (neg ? '-' : '') + num + ' ' + unit;
	},

	/* Statistics */
	remainingTime(remaining) {
		// Remaining time
		if (remaining == 0) {
			return 'Done';
		} else {
			var timer = moment.duration(remaining / 1000, 'seconds').humanize();
			return timer[0].toUpperCase() + timer.substring(1) + ' remaining';
		}
	},
	getFileType(){
		const types = {
			'3gpp': 'video/3gpp',
			'H264': 'video/H264',
			'H265': 'video/H265',
			'JPEG': 'video/JPEG',
			'jpeg2000': 'video/jpeg2000',
			'mp4': 'video/mp4',
			'MPV': 'video/MPV',
			'mpeg': 'video/mpeg4-generic',
			'ogg': 'video/ogg'
		}
	},
	destroy(){
		/* if(client.torrents.length) {
	            var torrents = client.torrents;
	            torrents.foreach(function (torrent) {
		            client.remove(torrent.hash);
	            });
	            console.log("Torrent Client Destroyed");

            }*/
		this.client.destroy();
		console.log("[Torrent] WebTorrent Destroyed");
	}
}