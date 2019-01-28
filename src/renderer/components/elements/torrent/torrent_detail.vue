<template>
    <div class="card">
        <div class="card-body">
            <Player :link="link"></Player>
            <h4 class="card-title">Torrent: {{ torrent.name }}</h4>
            <h6 class="card-subtitle mb-2 text-muted">Hash: {{ torrent.infoHash}}</h6>
            <div class="progress">
                <div
                        class="progress-bar progress-bar-striped"
                        v-bind:class="[progress == 100 ? 'bg-success' : 'bg-info progress-bar-animated']"
                        role="progressbar"
                        v-bind:style="{width: progress +'%'}"
                        aria-valuenow="progress"
                        aria-valuemin="0"
                        aria-valuemax="100">
                    {{ progress }} %
                </div>
            </div>
            <p class="card-text">Files:</p>
            <AppDownloadLink v-for="link in links" v-bind:blobUrl="link.blobUrl" v-bind:fileName="link.fileName"></AppDownloadLink>
        </div>
    </div>
</template>

<script>
    import AppDownloadLink from './download_link'
    import Player from '../player';

    import WebTorrent from 'webtorrent';
    import StreamSaver from 'streamsaver';
    var client = new WebTorrent();
    export default {
        props: ['magnetUri'],
        components: {
            Player,
            AppDownloadLink
        },
        data(){
            return{
                torrent: {},
                links: [],
                progress: 0,
                streamSemaphore: -1,
                link: ''
            };
        },
        methods: {
            updateProgress: function () {
                this.progress = Math.round((this.torrent.received / this.torrent.length) * 100)
                if (this.progress != 100) {
                    setTimeout(this.updateProgress, 500);
                }
            },
            streamFile: function () {
                var file = this.torrent.files[this.streamSemaphore];
                var fileStream = StreamSaver.createWriteStream(file.name, file.size);
                var writer = fileStream.getWriter();
                var readStream = file.createReadStream();
                var vm = this;
                readStream.on('data', function (data) {
                    writer.write(data);
                })
                readStream.on('end', function () {
                    vm.streamSemaphore = -1
                    writer.close();
                })
            }
        },
        watch: {
            streamSemaphore: function(currentValue, oldValue) {
                if(currentValue == -1 && oldValue < (this.torrent.files.length - 1)) {
                    this.streamSemaphore = oldValue + 1;
                    this.streamFile();
                }
            }
        },
        created() {
            var vm = this
            client.add(this.magnetUri, {announce: ['ws://127.0.0.1:8800/announce']}, function (torrent) {//, path: '/Downloads/'
                vm.torrent = torrent;
                vm.streamSemaphore = 0;
                vm.streamFile();
                setTimeout(vm.updateProgress, 500);
                // Torrents can contain many files. Let's use the .mp4 file
                const file = torrent.files.find(function (file) {
                    return file.name.endsWith('.mp4')
                });

                file.getBlobURL(function (err, url) {
                    if (err) throw err
                    vm.link = url;
                    //var a = document.createElement('a')
                    //a.download = file.name
                    //a.href = url
                    //a.textContent = 'Download ' + file.name
                    //document.body.appendChild(a)
                });
                file.renderTo('video#myPlayer_html5_api', {}, function callback() {
                    console.log("ready to play!");
                });
            })
        }
    }
</script>

<style scoped>
    .card {
        margin-top: 20px
    }
    .progress {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    p {
        margin-bottom: 0px
    }
</style>