<template>
  <div class="page-movie-list">
    <listFilters v-if="config.hasFilters" :filters="filters"></listFilters>
    TvShow detail {{ $route.params.plugin }}

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
    name: 'tvshow-list',
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
        },
        params: {
          type: "show",
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
        this.$plugins[this.currentPlugin].list(this.params)
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
      },
    },
  };
</script>