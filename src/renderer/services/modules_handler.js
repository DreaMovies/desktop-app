const nativeImage 	= require('electron').nativeImage;

const remote 		= require('electron').remote;
const { Menu, MenuItem } = require('electron').remote;
const app 			= remote.app;
const menu 			= Menu.getApplicationMenu();
//Folder management
const fs 			= require('fs-extra');
//get installed path to get plugins in run time
const runningPath 	= app.getAppPath();
const pluginsFolder = '/plugins/';
const pluginsPath 	= runningPath + pluginsFolder;

//load other local modules
const util 			= require('./util.js');


var readPluginDirectory = function(){
	var folders = fs.readdirSync(pluginsPath);
	folders.forEach(function(item) {
		if (fs.statSync(pluginsPath + item).isDirectory()) {
			loadPlugin(item);
		}
	});
	displayPlugins();
}

var addPlugin = function(plugin) {
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
}


var loadPlugin = function(componentName) {
	const component = require(pluginsPath + componentName + "/index.js");
	const config = component.config;

	pluginList.push({
					uuid: (pluginList.length + 1),
					active: (pluginList.length == 0 ? true : false),
					module: componentName,
					label: config.label,
					icon: config.icon,
					component: component
				});

	if( config.has_menu && typeof component.menu === "function"){
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

};


var removePlugin = function(plugin) {
	console.log("Removing plugin: " + plugin);
	fs.remove( pluginsPath + plugin ).then(() => {
		console.log("Plugin removed: " + plugin);
	}).catch(err => {
		console.log("Error removing plugin: " + plugin);
		console.error(err)
	});
}


var menuItems = function(template){
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
};

var displayPlugins = function(){

	var html = "";

	pluginList.forEach(function(item) {
		//if(item.active){
			html += `<li class="nav-item">
					<a class="nav-link plugin-link" data-id="${item.uuid}" href="#">
						<img class="plugin-logo" src="${item.icon}">
						${item.label}
					</a>
				</li>`;
		//}
	});

	//$("#pluginsList").append(html);
}

module.exports = {
	readPluginDirectory: readPluginDirectory,
	addPlugin: addPlugin,
	loadPlugin: loadPlugin,
	listPlugins: displayPlugins,
	removePlugin: removePlugin,
	menuItems: menuItems
}