<template>
    <div class="page-player">
        <div class="player-title">
            <router-link :to="links.return" class="return-to-list">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <span> {{ title }} </span>
            <span v-if="progress != null" class="torrent-info" id="player_popover">
                <i class="fas fa-info"></i>
            </span>
            <b-popover v-if="progress != null" class="popover-info" target="player_popover" triggers="hover focus" placement="bottomleft">
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

    import fs       from 'fs';
    import _videojs from 'video.js';
    import 'video.js/dist/video-js.min.css';
    import 'videojs-hotkeys';

    import subtitles    from "../services/subtitles";
    import torrents     from "../services/torrents";

    //import "videojs-contrib-hls";

    const videojs = window.videojs || _videojs;

    export default {
        name: 'player',
        props: [
            'detail',
            'title',
            'url',
	        'magnetUri',
	        'path',
	        'ext',
	        'type'
        ],
        data(){
            return{
            	torrent: null,
	            progress: null,
                player: '',
	            volume: 1,
	            subtitles: [],
                link: '',
	            lang_codes: {
		            'en' : "English",
		            'fr' : "Francais",
		            'pt' : "Português",
		            'de' : "Deutsh",
		            'it' : "Italian",
		            'es' : "Spanish",
		            'el' : "Greek",
		            'pl' : "Polish"
	            },
	            links: {
            		return: "/",
		            subtitles: "",
	            },
            };
        },
        mounted(){
            this.playerInitialize();
            this.playerSetupEvents();

            //this.ipc();
            //this.initEvents();

            this.toggleBodyClass('addClass', 'layout-player');

            if(this.type == "torrent") {
	            this.links.return = '/' + this.detail.type + '-detail/' + this.detail.plugin + '/' + this.detail.id;
	            this.torrent = torrents.addTorrent(this.magnetUri);
	            this.waitTorrent();
            } else if(this.type == "local") {
	            this.links.return = "/explorer";
	            this.links.subtitles = (this.path).replace(this.title, "");
	            this.loadSubtitles();
	            this.player.src({
		            'src': this.path
	            });
	            //this.player.play();
            } else {

            }
        },
        methods: {
	        waitTorrent(params){
	        	console.log("[View::Player] wait Torrent Params");
	        	console.log(params);
		        //this.getSubtitles();
		        let files = torrents.streamFile(this.torrent);
		        console.log(files);
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
		        console.log("[View::Player] Get subtitles");
		        if(this.type == "torrent") {
			        subtitles.getSubs(this.file.name, this.download_folder + '/' + (this.file.path).replace(this.file.name, ""));
		        } else if(this.type == "local"){
			        subtitles.getSubs(this.title, this.links.subtitles);
		        }
		        this.loadSubtitles();
	        },
	        loadSubtitles(){
            	console.log("[View::Player] Load subtitles");
		        let subs_folder_path = "";
		        if(this.type == "torrent") {
			        subs_folder_path = this.download_folder + '/' + (this.file.path).substr(0, (this.file.path).lastIndexOf("/")) + "/subs/vtt/";
		        } else if(this.type == "local"){
			        subs_folder_path = this.links.subtitles + "/subs/vtt/";
		        }
				const Self = this;
		        if (fs.existsSync(subs_folder_path)){
			        let sub_list = fs.readdirSync(subs_folder_path);
			        console.log(sub_list);

			        for (let file of sub_list) {
				        //console.log(file);
				        var lang = file.split("_")[0];

				        let current_sub = {
					        kind: 'subtitles',
					        label: this.lang_codes[lang],
					        language: lang,
					        mode: (lang == 'pt' ? 'showing' : 'hidden'),
					        src: subs_folder_path + file,
				        };
				        Self.player.addRemoteTextTrack(current_sub, true);
			        }
		        } else {
		        	this.getSubtitles();
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
        },
        beforeDestroy() {
	        this.player.dispose();
	        console.log("[View::Player] Player Destroyed");
	        torrents.destroy();
        },
        destroyed() {
            this.toggleBodyClass('removeClass', 'layout-player');
        }
    }
</script>