<template>
    <div class="page-player">
        <div class="player-title">
            <router-link :to="'/' + detail.type + '-detail/' + detail.plugin + '/' + detail.imdb_code + '/' + detail.id" class="return-to-list">
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

    import _videojs from 'video.js';
    import 'video.js/dist/video-js.min.css';
    import 'videojs-hotkeys';
    //import "videojs-contrib-hls";

    const videojs = window.videojs || _videojs;
    var client = new WebTorrent();

    export default {
        name: 'player',
        props: [
            'detail',
            'title',
            'magnetUri'
        ],
        data(){
            return{
                player: '',
                url: 'https://someurl.com',
                volume: 1,
                links: [],
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
                download_folder:  "C:/Users/miguel.cerejo/Documents/Download/torrent"//"C:/Users/user/Documents/Download/torrent";
            };
        },
        mounted(){
            window.playerEvents = this;
            this.playerInitialize();
            //this.playerSetSrc(this.link);
            this.playerSetupEvents();

            //this.ipc();
            //this.initEvents();

            this.toggleBodyClass('addClass', 'layout-player');

            var vm = this;
            console.log("Mount Player");
            var check_torrent = client.get(this.magnetUri);
            console.log(check_torrent);

            client.add(
                this.magnetUri,
                {
                    announce: ['ws://127.0.0.1:8800/announce'],
                    path: vm.download_folder
                },
                function (torrent) {//, path: '/Downloads/'
                    console.log("Start Torrent Download");
                    vm.torrent = torrent;
                    console.log(torrent);
                    setTimeout(vm.updateProgress, 500);
                    // Torrents can contain many files. Let's use the .mp4 file
                    const file = torrent.files.find(function (file) {
                        console.log(file);
                        if( file.name.endsWith('.mp4') ){
                            return file.name.endsWith('.mp4');
                        } else if( file.name.endsWith('.mkv') ){
                            return file.name.endsWith('.mkv');
                        } else if( file.name.endsWith('.avi') ){
                            return file.name.endsWith('.avi');
                        }
                    });
                    console.log("Torrent Get Blob URL");
                    file.getBlobURL(function (err, url) {
                        if (err) throw err;
                        vm.link = url;
                        console.log("Set Player URL: " + url);
                        vm.player.src({
                            type: 'video/mp4',
                            'src': url
                        });
                        vm.playerPlay();
                    });
                }
            );
        },
        methods: {
            /* Change Layout for player */
            toggleBodyClass(addRemoveClass, className) {
                const el = document.body;

                if (addRemoveClass === 'addClass') {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
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
            streamFile() {
                var file = this.torrent.files[this.streamSemaphore];
               // var fileStream = StreamSaver.createWriteStream(file.name, file.size);
               // var writer = fileStream.getWriter();
               // var readStream = file.createReadStream();
               // var vm = this;
               // readStream.on('data', function (data) {
               //     writer.write(data);
               // })
               // readStream.on('end', function () {
               //     vm.streamSemaphore = -1
               //     writer.close();
               // })
            },
            /* Player VideoJS Related*/
            playerInitialize(){
                this.player = videojs('myPlayer');
                //this.player.fluid(true);

                this.player.hotkeys({
                    volumeStep: 0.1,
                    seekStep: 5,
                    enableModifiersForNumbers: false,
                    fullscreenKey: function(event, player) {
                        // override fullscreen to trigger when pressing the F key or Ctrl+Enter
                        return ((event.which === 70) || (event.ctrlKey && event.which === 13));
                    }
                })
            },
            playerDispose(){
                this.player.dispose();
            },

            playerPlay(){
                this.player.play();
            },
            playerPause(){
                this.player.pause();
            },

            playerSetSrc(url){
                this.player.src(url);
            },
            playerSetVolume(float){
                this.player.volume(float);
            },
            playerSetPoster(url){
                this.player.poster(url);
            },
            playerSetTime(time){
                this.player.currentTime(time);
            },


            playerEventEnded(){
                console.log('ended');
            },
            playerEventVolume(){
                this.volume = this.player.volume();
            },
            playerEventError(){
                console.log( this.playerGetError() )
            },


            playerGetPaused(){
                return this.player.paused();
            },
            playerGetTime(){
                return this.player.currentTime();
            },
            playerGetError(){
                return this.player.error().message;
            },


            playerSetupEvents(){
                this.player.on('ended', function(){
                    var a = window.playerEvents.playerEventEnded();
                });
                this.player.on('volumechange', function(){
                    window.playerEvents.playerEventVolume();
                });
                this.player.on('error', function(){
                    window.playerEvents.playerEventError();
                });
                this.player.on('useractive', function(){
                    console.log("player has user active");
                });
                this.player.on('userinactive', function(){
                    console.log("player has user inactive");
                });
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
                document.addEventListener('mousewheel', event => {
                    if (event.wheelDelta > 0) {
                        //this.volumeUp()
                    } else {
                        //this.volumeDown()
                    }
                });
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
            this.playerDispose();
            console.log("Player Destroyed");
            client.remove(this.torrent);
            console.log("Torrent Destroyed");
        },
        destroyed() {
            this.toggleBodyClass('removeClass', 'layout-player');
        }
    }
</script>