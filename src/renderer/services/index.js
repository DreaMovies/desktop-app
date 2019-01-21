//import modules_handler from "./modules_handler";
//import api_yts from "./api/yts.js";

export default {
    loadPlugin(plugin){
        console.log(plugin);

        //const pluginsPath  = require('electron').remote.app.getPath("appData") + '\\dreamovies_app_alpha\\plugins\\';

        //const runningPath   = require('electron').remote.app.getAppPath();
        //const pluginsFolder = '/api/';
        //const pluginsPath   = runningPath + pluginsFolder;
        
        //var fullPluginPath = pluginsPath + plugin + ".js";

        const files = require.context('./api/', false, /\.js$/);

        files.keys().forEach(key => {
            if (key === './example.js') return
            this.$plugins[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
        });

        //this.$plugins.push({
        //                uuid: (this.$plugins.length + 1),
        //                active: (this.$plugins.length == 0 ? true : false),
        //                module: plugin,
        //                label: component.config.label,
        //                icon: component.config.icon,
        //                component: component
        //            });
        return true;
    },
    check_plugin(plugin) {
        console.log(plugin);
        for (item in this.$plugins) {
            if (item(name) && item[name] === plugin) {
                return true;
            }
        }
        return this.loadPlugin(plugin);
    },
    loadConfig(plugin) { //plugin, imdb, id
        var config = this.$plugins[plugin];
        console.log(config);
        return config;
    },
    loadList(plugin, page) {
        return this.$plugins[plugin].list(page);
    },
    loadDetail(params) { //plugin, imdb, id
        return this.$plugins[plugin].details(params.id);
    },
    loadFilters(plugin) { //plugin, imdb, id
        if (this.loadConfig(plugin).hasFilters) {
            return this.$plugins[plugin].filters();
        }
    },
}