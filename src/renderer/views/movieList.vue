<template>
    <div class="page-movie-list">
        <list_filters v-if="config.hasFilters" :filters="filters"></list_filters>
        movie detail {{ $route.params.plugin }}

        <ul v-if="list != ''" class="movie-list">
            <li v-for="item in list">
                <movie_item :plugin="currentPlugin" :movie="item"></movie_item>
            </li>
        </ul>
        <b-pagination @change="changePage" align="center" :total-rows="totalRow" v-model="currentPage" :per-page="perPage"></b-pagination>
    </div>
</template>

<script>
    import movie_item from "../components/elements/movie_item";
    import list_filters from "../components/elements/list_filters";
    import services from "@/services/";

    export default {
        name: 'movie-list',
        components: {
            services,
            list_filters,
            movie_item
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
        created: function () {
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
                        });
                
            }
            // open(link) {
            // this.link = link;
            // require('electron').shell.openExternal(link);
            // },
        },
    };
</script>