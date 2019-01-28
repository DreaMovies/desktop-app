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
        },
        mounted(){
            window.playerEvents = this;
            this.playerInitialize();
            //this.playerSetSrc(this.link);
            this.playerSetupEvents();
        },
        beforeDestroy() {
            this.playerDispose();
        }
    }
</script>