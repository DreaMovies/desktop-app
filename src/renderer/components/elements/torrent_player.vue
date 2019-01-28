<template>
    <div class="player">
        <!--<keep-alive>
             HTML binding webtorrent client data
        </keep-alive>-->

        <AppTorrentDetails v-if="magnet !== ''" :magnetUri="magnet"></AppTorrentDetails>
    </div>
</template>

<script>
    import Player from './player';
    import AppTorrentDetails from './torrent/torrent_detail';

    export default {
        name: 'torrent-player',
        props: [
            'magnet',
            'info'
        ],
        components: {
            Player,
            AppTorrentDetails
        },
        data: function(){
            return {
                params:{
                    plugin: "",
                    id: "",
                    imdb: ""
                },
                link: '',
                magnet_uri: '',
                movie: {}
            }
        },
        methods: {
            /*Plyr_Player() {
                const player = new Plyr('#player', {
                    debug: true
                });

                client.add(torrentId, function (torrent) {
                    var file = torrent.files.find(function (file) {
                        return file.name.endsWith('.mp4')
                    });
                    file.renderTo('video', {
                        autoplay: false,
                        muted: true
                    }, function callback() {
                        console.log("ready to play!");
                    });
                });
            }
            VideoJS_Player(){
                var player = videojs("video-container");
                player.fluid(true);

                client.add(torrentId, function(torrent) {
                    var file = torrent.files.find(function(file) {
                        return file.name.endsWith('.mp4')
                    });
                    file.renderTo('video#video-container_html5_api', {}, function callback() {
                        console.log("ready to play!");
                    });
                });
            }*/
        },
    };
</script>
