<template>
    <div class="page-player">
        <div class="player-title">
            <router-link :to="'/' + detail.type + '-detail/' + detail.plugin + '/' + detail.id" class="return-to-list">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <span> {{ title }} </span>
            <span class="torrent-info" id="player_popover">
                <i class="fas fa-info"></i>
            </span>
            <b-popover class="popover-info" target="player_popover" triggers="hover focus" placement="bottomleft">
                <span class="player-info"><b>Download Speed</b>: {{ progress.speed.download }}</span>
                <span class="player-info"><b>Upload Speed</b>: {{ progress.speed.upload }}</span>
                <span class="player-info"><b>Peers</b>: {{ progress.peer }}</span>
                <span class="player-info"><b>Time remaining</b>: {{ progress.time }}</span>
                <span class="player-info"><b>Percentage Done</b>: {{ progress.percentage }}%</span>
            </b-popover>
        </div>
        <video
                playsinline
                id="myPlayer"
                class="video-js vjs-custom-skin vjs-fill"
                width="100%"
                controls
                preload="auto"
                data-setup='{ "fluid": true }'>
        </video>
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron';

    import WebTorrent from 'webtorrent';
    import moment from 'moment';
    import fs       from 'fs';

    import _videojs from 'video.js';
    import 'video.js/dist/video-js.min.css';
    import 'videojs-hotkeys';

    import subtitles from "../services/subs_search";

    //import "videojs-contrib-hls";

    const videojs = window.videojs || _videojs;

    export default {
        name: 'player',
        props: [
            'detail',
            'title',
            'url',
	        'magnetUri',
	        'type'
        ],
        data(){
            return{
            	client: new WebTorrent(),
	            server: null,

                player: '',
	            volume: 1,
	            subtitles: {},
	            links: [],
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
	            streamSemaphore: -1,
                link: '',
                torrent: {},
                download_folder:  "C:/Users/miguel.cerejo/Documents/Download/torrent",//"C:/Users/user/Documents/Download/torrent";
	            lang_codes: {
		            'en' : "English",
		            'fr' : "Francais",
		            'pt' : "Português",
		            'de' : "Deutsh",
		            'it' : "Italian",
		            'es' : "Spanish",
		            'el' : "Greek",
		            'pl' : "Polish"
	            }
            };
        },
        mounted(){
            window.playerEvents = this;
            this.playerInitialize();
            this.playerSetupEvents();

            //this.ipc();
            //this.initEvents();

            this.toggleBodyClass('addClass', 'layout-player');

            if(this.type == "torrent") {
	            console.log("Mount WebTorrent");
	            const torrent = this.client.get(this.magnetUri) || this.client.add(this.magnetUri, { path: this.download_folder });
	            // make sure metadata is available before path matching
	            if (torrent.metadata) {
		            this.streamFile(torrent);
	            } else {
		            torrent.once('ready', () => this.streamFile(torrent));
	            }
	            //this.client.add(
	            //	this.magnetUri,
		        //    {
		        //    	announce: ['ws://127.0.0.1:8800/announce'],
			    //        path: this.download_folder
		        //    },
		        //    this.startStream()
	            //);
            } else {
	            this.player.src({
		            type: 'video/mp4',
		            'src': this.url
	            });
            }
        },
        methods: {
	        streamFile(torrent) {
		        this.torrent = torrent;
		        let path = '';
		        // only render the first file found matching the path exactly
		        const fileToRender = torrent.files.find((file) => {
			        console.log(file);
			        if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv') || file.name.endsWith('.avi')) {
				        // only set rootDir if the file is in a directory
				        const rootDir = /\//.test(file.path) ? (torrent.name + '/') : '';
				        path = path.replace(/^\//, ''); // remove initial / if present
				        return file.path;// === rootDir + path;
			        }
			        //if (!path) return true; // if no path is specified, render the first file
		        });

		        if (!fileToRender) {
			        throw new Error('No file found matching this path: ' + path);
		        }

		        fileToRender.renderTo('video', {
			        autoplay: true, controls: true // stops any overwrite of the element's values
		        }, (err, elem) => {
			        if (err) throw err;
			        console.log('magnet-loaded');
		        });
		        this.file.name = fileToRender.name;
		        this.file.path = fileToRender.path;
		        this.file.path = (this.file.path).replace("\\", "/");
		        this.getSubtitles();
		        this.updateProgress();
	        },
            /* WebTorrent Related */
            updateProgress() {
                this.progress.speed.download    = this.prettyBytes(this.torrent.downloadSpeed);
                this.progress.speed.upload      = this.prettyBytes(this.torrent.uploadSpeed);
                this.progress.peer              = this.torrent.numPeers;
                this.progress.percentage    = Math.round((this.torrent.received / this.torrent.length) * 100);
                this.progress.complete      = this.prettyBytes(this.torrent.received);
                this.progress.time          = this.remainingTime(this.torrent.timeRemaining);

                if (this.progress.percentage != 100) {
                    setTimeout(this.updateProgress, 500);
                }
            },
            /* Human readable bytes util */
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
            /* Player VideoJS Related*/
            playerInitialize(){
                this.player = videojs('myPlayer', {
	                controls: true,
	                "playbackRates": [1, 2],
	                "trackLanguage": 'pt',
	                /*chromecast:{
						appId: 'APP-ID',
						metadata: {
							title: 'Title display on tech wrapper',
							subtitle: 'Synopsis display on tech wrapper',
						}
					}*/
                });
                //this.player.fluid(true);



               // this.player.hotkeys({
               //     volumeStep: 0.1,
               //     seekStep: 5,
               //     enableModifiersForNumbers: false,
               //     fullscreenKey: function(event, player) {
               //         // override fullscreen to trigger when pressing the F key or Ctrl+Enter
               //         return ((event.which === 70) || (event.ctrlKey && event.which === 13));
               //     }
               // })
            },
           // playerPlay(){
           //     this.player.play();
           // },
           // playerPause(){
           //     this.player.pause();
           // },
           // playerSetTime(time){
           //     this.player.currentTime(time);
           // },
           // playerEventVolume(){
           //     this.volume = this.player.volume();
//
           // },
//
//
           // playerGetPaused(){
           //     return this.player.paused();
           // },
           // playerGetTime(){
           //     return this.player.currentTime();
           // },
	       // playerEventEnded(){
		   //     console.log('ended');
	       // },
//
	       // playerEventError(){
		   //     console.log( this.playerGetError() )
	       // },
           // playerGetError(){
           //     return this.player.error().message;
           // },


            playerSetupEvents(){
            	const Self = this;
                //this.player.on('ended', function(){
	            //    Self.playerEventEnded();
                //});
                //this.player.on('volumechange', function(){
	            //    Self.playerEventVolume();
                //});
                //this.player.on('error', function(){
	            //    Self.playerEventError();
                //});
                //this.player.on('useractive', function(){
                //    console.log("player has user active");
	            //    //Self.toggleBodyClass("addClass", "show-player-header");
                //});
                //this.player.on('userinactive', function(){
	            //   // Self.toggleBodyClass("removeClass", "show-player-header");
                //});
            },
	        getSubtitles(){
		        console.log("get subtitles");
		        subtitles.getSubs(this.file.name, this.download_folder + '/' + (this.file.path).replace(this.file.name, "") );
		        this.loadSubtitles();
	        },
	        loadSubtitles(){
            	console.log("load subtitles");
		        let subs_folder_path = this.download_folder + '/' + (this.file.path).substr(0, (this.file.path).lastIndexOf("/")) + "/subs/vtt/";

		        if (fs.existsSync(subs_folder_path)){
			        let sub_list = fs.readdirSync(subs_folder_path);
			        console.log(sub_list);

			        for (let file of sub_list) {
				        //console.log(file);
				        var lang = file.split("_")[0];

				        let current_sub = {
					        src: subs_folder_path + file,
					        kind: 'captions',
					        srclang: lang,
					        label: this.lang_codes[lang],
					        mode: (lang == 'pt' ? 'showing' : 'hidden')
				        };
				        this.player.addRemoteTextTrack(current_sub, false);
			        }
		        }

	        },

            ipc () {
                //ipcRenderer.on('did-finish-load', (event, torrentKey, index, infoHash, mediaName, mediaIndex) => {
                //    this.torrentKey = torrentKey
                //    this.mediaName = mediaName
                //    this.mediaIndex = mediaIndex
                //    this.mediaType = fileExtension.isVideo(mediaName) ? 'video' : 'audio'
//
                //    // 스트리밍을 위한 서버 실행 요청
                //    ipcRenderer.send('wt-start-server', torrentKey, infoHash, index, mediaIndex)
                //})
                //// 요청한 서버가 실행되면 미디어를 재생합니다.
                //ipcRenderer.on('wt-server-running', (event, localURL) => this.localURL = localURL)
//
                //// 다운로드 중인 토렌트 정보를 받습니다(1초마다)
                //ipcRenderer.on('wt-loading-parts', (event, torrent) => {
                //    this.renderLoadingParts(torrent)
                //})
            },
            initEvents () {
                document.addEventListener('keydown', event => {
                    if (!event.altKey && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
                        switch(event.keyCode) {
                            // space
                            case 32:
                                //this.togglePlay()
                                event.preventDefault()
                                break
                            // left
                            case 37:
                                //this.skipPrev()
                                event.preventDefault()
                                break
                            // up
                            case 38:
                                //this.volumeUp()
                                event.preventDefault()
                                break
                            // right
                            case 39:
                                //this.skipNext()
                                event.preventDefault()
                                break
                            // down
                            case 40:
                                //this.volumeDown()
                                event.preventDefault()
                                break
                            // M
                            case 77:
                                //this.toggleMute()
                                event.preventDefault()
                                break
                            // tab
                            case 9:
                                event.preventDefault()
                                break
                            // enter
                            case 13:
                                //this.fullScreen()
                                event.preventDefault()
                                break
                            // ESC
                            case 27:
                                //if (this.isFullScreen) this.fullScreen()
                                event.preventDefault()
                                break;
                            // f11
                            case 122:
                                event.preventDefault()
                                break
                        }
                    }
                });
            },

	        /* Change Layout for player */
	        toggleBodyClass(addRemoveClass, className) {
		        const el = document.body;
		        if (addRemoveClass === 'addClass') {
			        el.classList.add(className);
		        } else {
			        el.classList.remove(className);
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
        },
        beforeDestroy() {
            console.log("Component destruction begin");
	        this.player.dispose();
            console.log("Player Destroyed");
           /* if(client.torrents.length) {
	            var torrents = client.torrents;
	            torrents.foreach(function (torrent) {
		            client.remove(torrent.hash);
	            });
	            console.log("Torrent Client Destroyed");

            }*/
	        this.client.destroy();
        },
        destroyed() {
            this.toggleBodyClass('removeClass', 'layout-player');
        }
    }
</script>