<template>
    <video
            playsinline
            id="myPlayer"
            class="video-js vjs-custom-skin"
            width="100%"
            controls
            preload="auto"
            data-setup='{ "aspectRatio":"16:9" }'>
    </video>
</template>

<script>
    import _videojs from 'video.js';
    import 'video.js/dist/video-js.min.css';
    //import "videojs-contrib-hls";
    import 'videojs-hotkeys';

    const videojs = window.videojs || _videojs;

    export default {
        name: 'player',
        props: [
            'link'
        ],
        data(){
            return{
                player: '',
                url: 'https://someurl.com',
                volume: 1
            };
        },
        methods: {
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
            },

            ipc () {
                ipcRenderer.on('did-finish-load', (event, torrentKey, index, infoHash, mediaName, mediaIndex) => {
                    this.torrentKey = torrentKey
                    this.mediaName = mediaName
                    this.mediaIndex = mediaIndex
                    this.mediaType = fileExtension.isVideo(mediaName) ? 'video' : 'audio'

                    // 스트리밍을 위한 서버 실행 요청
                    ipcRenderer.send('wt-start-server', torrentKey, infoHash, index, mediaIndex)
                })
                // 요청한 서버가 실행되면 미디어를 재생합니다.
                ipcRenderer.on('wt-server-running', (event, localURL) => this.localURL = localURL)

                // 다운로드 중인 토렌트 정보를 받습니다(1초마다)
                ipcRenderer.on('wt-loading-parts', (event, torrent) => {
                    this.renderLoadingParts(torrent)
                })
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
        },
        mounted(){
            window.playerEvents = this;
            this.playerInitialize();
            //this.playerSetSrc(this.link);
            this.playerSetupEvents();


            this.ipc();
            this.initEvents();
        },
        beforeDestroy() {
            this.playerDispose();
        }
    }
</script>