const nativeImage 	= require('electron').nativeImage;

const remote 		= require('electron').remote;
const { Menu, MenuItem } = require('electron').remote;
const menu 			= Menu.getApplicationMenu();
//Folder management
const fs 			= require('fs-extra');
//get installed path to get plugins in run time
const runningPath 	= remote.app.getAppPath();
const pluginsFolder = '/api/';
const pluginsPath 	= runningPath + pluginsFolder;


module.exports = {
	readPluginDirectory(){
		var folders = fs.readdirSync(pluginsPath);
		folders.forEach(function(item) {
			if (fs.statSync(pluginsPath + item).isDirectory()) {
				loadPlugin(item);
			}
		});
	},

	addPlugin(plugin) {
		console.log("Adding plugin: " + plugin);
		try {
			if (!fs.existsSync( pluginsPath + plugin )){
				fs.mkdirSync( pluginsPath + plugin );
				console.log("Plugin added: " + plugin);
			}
		} catch (err) {
			console.error(err);
			console.log("Error adding plugin: " + plugin);
		}
	},

	loadPlugin(componentName) {
		const component = require(pluginsPath + componentName + "/index.js");
		const config = component.config;

		this.$plugins.push({
						uuid: (pluginList.length + 1),
						active: (pluginList.length == 0 ? true : false),
						module: componentName,
						label: config.label,
						icon: config.icon,
						component: component
					});

		if( config.hasMenu && typeof component.menu === "function"){
			var pluginMenu = component.menu();
			if(config.app_icon != ""){
				var appIconPath =  pluginsPath + componentName + "/" + config.app_icon;
				if(fs.existsSync(appIconPath)){
					let image = nativeImage.createFromPath(appIconPath).resize({width: 32}).toDataURL();
					pluginMenu[0].icon = appIconPath;//image;//
				}
			}
			menuItems(pluginMenu);
		}

	},

	removePlugin(plugin) {
		console.log("Removing plugin: " + plugin);
		fs.remove( pluginsPath + plugin ).then(() => {
			console.log("Plugin removed: " + plugin);
		}).catch(err => {
			console.log("Error removing plugin: " + plugin);
			console.error(err)
		});
	},

	menuItems(template){
		//var item = new MenuItem(template);
		//menu.insert(0, item);
		var fullMenuTemplate = template.concat( util.createContextMenu() );
		var menu = Menu.buildFromTemplate(fullMenuTemplate);

		window.addEventListener('contextmenu', (e) => {
			e.preventDefault()
			rightClickPosition = {x: e.x, y: e.y};
			clicked_element = e.target;
			menu.popup(remote.getCurrentWindow());
		}, false);
	},
}