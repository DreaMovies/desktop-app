import { app, BrowserWindow, ipcMain} from 'electron';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080`
	: `file://${__dirname}/index.html`

function createWindow () {
	/**
	 * Initial window options
	 */
	var mainWindow_Config = {
								frame: false,
								titleBarStyle: 'hidden',
								useContentSize: true,
								width: 1280,
								height: 800,
								minWidth: 800,
								minHeight: 600,
								backgroundColor: "#232e4e",
								icon: require('path').join(__dirname, '/build/icons/64x64.png')
							};

	mainWindow = new BrowserWindow( mainWindow_Config );

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	});

	mainWindow.webContents.on('new-window', function(e, url) {
		e.preventDefault();
	});
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

app.on('web-contents-created', function(event, contents) {
	if (contents.getType() == 'webview') {
		contents.on('will-navigate', function(event, url) {
			event.preventDefault();
			shell.openExternal(url);
		});
	}
});

//var ol = openload({
//	api_login: 'login',
//	api_key: 'key',
//});

//ipcMain.on('file_upload', function(event, path) {
//	ol.upload({
//		file: path,
//		folder: "4349015"
//	}).then(info => {
//			console.log(info);
//			event.sender.send('upload_status', info);
//		}
//	);   // Prints upload info
//});

//resize window after loading Animation
ipcMain.on('end_loading', function(event) {

		mainWindow.setSize(app_config.width || 1280, app_config.height || 800, true);
		mainWindow.setMinimumSize(app_config.minWidth || 800, app_config.minHeight || 600);
		mainWindow.setResizable(true);
		mainWindow.setMovable(true);
		mainWindow.center();

});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
	autoUpdater.quitAndInstall()
})

app.on('ready', () => {
	if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
