<template>
    <div class="page-movie-list">
        <listFilters v-if="config.hasFilters" :filters="filters"></listFilters>
        movie detail {{ $route.params.plugin }}

        <ul v-if="list != ''" class="movie-list">
            <li v-for="item in list">
                <itemMovie :plugin="currentPlugin" :movie="item"></itemMovie>
            </li>
        </ul>
        <b-pagination @change="changePage" align="center" :total-rows="totalRow" v-model="currentPage" :per-page="perPage"></b-pagination>
    </div>
</template>

<script>
    import itemMovie from "../components/elements/item_movie";
    import listFilters from "../components/elements/list_filters";
    import services from "@/services/";

    export default {
        name: 'movie-list',
        components: {
            services,
            listFilters,
            itemMovie
        },
        data() {
            return {
                config: {},
                currentPlugin: "",
                list: {},
                currentPage: 1,
                perPage: 10,
                totalRow: 10,
                filters: {
                    order_by: [],
                    genre: [],
                    quality: [],
                    sort_by: [],
                    keyword: ""
                }
            }
        },
        created() {
            this.loadList(this.$route.params.plugin);
        },
        methods: {
            loadList(plugin) {
                if(services.check_plugin(plugin)){
                    this.currentPlugin = plugin;
                    this.changePage(this.currentPage);
                    this.config = services.loadConfig(this.currentPlugin);
                    console.log(this.config);
                    if(this.config.hasFilters) {
                        this.filters = services.loadFilters(this.currentPlugin);
                        console.log(this.filters);
                    }
                }
            },
            changePage(page){
                services.loadList(this.currentPlugin, page)
                        .then((response) => {
                            var resp = response.data.data;
                            this.currentPage = resp.page_number;
                            this.perPage = resp.limit;
                            this.totalRow = resp.movie_count;
                            this.list = resp.movies;
                        })
                        .catch(function (error) {
                            console.log(error);
                        }).then(function () {
                            // always executed
                        });
            }
            // open(link) {
            // this.link = link;
            // require('electron').shell.openExternal(link);
            // },
        },
    };
</script>