<template>
    <div class="page-movie-list">
        <listFilters v-if="config.hasFilters" :filters="filters"></listFilters>
        movie detail {{ $route.params.plugin }}

        <ul v-if="list != ''" class="movie-list">
            <li v-for="item in list">
                <itemList :plugin="currentPlugin" :item="item" type="movie"></itemList>
            </li>
        </ul>
        <b-pagination @change="changePage" align="center" :total-rows="totalRow" v-model="currentPage" :per-page="perPage"></b-pagination>
    </div>
</template>

<script>
    import itemList from "../components/elements/item_list";
    import listFilters from "../components/elements/list_filters";
    import services from "@/services/";

    export default {
        name: 'movie-list',
        components: {
            services,
            listFilters,
            itemList
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
                },
                params: {
                    type: "movie",
                    page: 1,
                    filters: {
                        limit: 30,
                        order_by: "",
                        genre: "",
                        quality: "",
                        sort_by: "",
                        keyword: ""
                    }
                }
            }
        },
        created() {
            Event.$on('search-trigger', (param) => {
                this.params.filters = param;
                this.changePage();
            });
            console.log("created: " + this.$route.params.plugin);
            //if(services.check_plugin(plugin)){
            //Load and validate plugin
            this.currentPlugin = this.$route.params.plugin;
            if(this.$plugins[this.currentPlugin] !== undefined) {
                this.config = this.$plugins[this.currentPlugin].config;
                //Load Plugin Config
                console.log(this.config);
                if(this.config.hasFilters) {
                    this.filters = this.$plugins[this.currentPlugin].filters();
                    console.log(this.filters);
                }
                //Load Plugin List
                this.loadList();
            } else {

            }
        },
        //updated() {
        //    console.log("updated: " + this.$route.params.plugin);
        //    this.loadList(this.$route.params.plugin);
        //},
        methods: {
            loadList() {
                this.params.page = this.currentPage;
                this.changePage();
            },
            changePage(){
                /*services.loadList(this.currentPlugin, page)*/
                this.params.page = this.currentPage;
                this.$plugins[this.currentPlugin].list(this.params)
                    .then((response) => {
                        var resp = this.$plugins[this.currentPlugin].dataListConvert(response.data);

                        this.currentPage = resp.page;
                        this.perPage = resp.limit;
                        this.totalRow = resp.total;
                        this.list = resp.list;
                    })
                    .catch(function (error) {
                        console.log(error);
                    }).then(function () {
                        // always executed
                    });
            },
        },
    };
</script>