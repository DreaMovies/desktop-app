<template>
    <div>
        movie detail {{ $route.params.plugin }}
        <ul>
            <li v-for="item in list">
                <movie_item :movie="item"></movie_item>
            </li>
        </ul>
    </div>
</template>

<script>
    import movie_item from "../components/elements/movie_item";
    import services from "@/services/";

    export default {
        name: 'movie-list',
        components: {
            services,
            movie_item
        },
        data() {
            return {
                list: {}
            }
        },
        created: function () {
            // `this` points to the vm instance
            console.log('a is: ' + this.a);
            loadList($route.params.plugin);
        },
        methods: {
            loadList(plugin) {
                if(services.check_plugin(plugin)){
                    services.loadList(plugin);
                }
            }
            // open(link) {
            // this.link = link;
            // require('electron').shell.openExternal(link);
            // },
        },
    };
</script>