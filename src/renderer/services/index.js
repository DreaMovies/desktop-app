//import api_yts from "./api/yts.js";

module.exports = {
    check_plugin(plugin) {
        if (plugin == "yts") {
            return true;
        }
    },
    loadList(plugin) {
        if (plugin == "yts") {
            var list = {};//api_yts.getList();
            return list;
        }
    },
}