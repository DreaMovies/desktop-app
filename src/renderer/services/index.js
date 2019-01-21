import api_yts from "./api/yts.js";

export default {
    loadConfig(plugin) { //plugin, imdb, id
        if (plugin == "yts") {
            console.log(api_yts.config);
            return api_yts.config;
        }
    },
    check_plugin(plugin) {
        if (plugin == "yts") {
            return true;
        }
    },
    loadList(plugin, page) {
        if (plugin == "yts") {
            return api_yts.getList(page);
        }
    },
    loadDetail(params) { //plugin, imdb, id
        if (params.plugin == "yts") {
            return api_yts.getDetails(params.id);
        }
    },
    loadFilters(plugin) { //plugin, imdb, id
        if (plugin == "yts" && api_yts.config.hasFilters) {
            console.log(api_yts.filters());
            return api_yts.filters();
        }
    },
}