import api_yts from "./api/yts.js";

export default {
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
}