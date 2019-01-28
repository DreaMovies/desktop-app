<template>
    <div class="player">asdadsadada
        <pre v-text="$attrs"/>
    </div>
</template>

<script>
    export default {
        name: 'embed-player',
        components: {

        },
        data: function(){
            return {
                params:{
                    plugin: "",
                    id: "",
                    imdb: ""
                },
                movie: {}
            }
        },
        created: function () {
            //Load and validate plugin
            this.params.plugin = this.$route.params.plugin;
            this.params.id = 	this.$route.params.id;
            this.params.imdb = 	this.$route.params.imdb;

            if(this.$plugins[this.params.plugin] !== undefined) {
                //Load Plugin Detail
                this.loadDetail();
            } else {

            }
        },
        methods: {
            play(type, link){

            },
            pause(type, link){

            },
            stop(type, link){

            },
            subtitles(type, link){

            },
            // 	open(link) {
            // 		this.link = link;
            // 		require('electron').shell.openExternal(link);
            // 	},
        },
    };
</script>
