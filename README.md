# desktop-uploader

[![Build Status](https://travis-ci.com/DreaMovies/desktop-app.svg?branch=master)](https://travis-ci.com/DreaMovies/desktop-app)

## What is this
This is an app made with Electron-Vue, and the objective is to give to the user, a local media manager and player, and to help 
it see updated content from several sources, from links or torrents and fetch information about the same as well subtitles.

# Is Legal?
Yes, we don't have any content neither the app is patched with any possible way to see illegal content. The use of plugins with 
illegal content is all up to the user and the developer/s that create the same.

## Install
` npm install && npm run dev`

## Packages used
```
For the Base programming
	"axios": "^0.18.0",
	"bootstrap-vue": "^2.0.0-rc.11",
	"emoji-mart-vue": "^2.6.6",
	"moment": "^2.24.0",
	"nedb": "^1.8.0",
	"socket.io": "^2.2.0",
	
	"video.js": "latest",
		"videojs-chromecast": "latest",
		"videojs-hotkeys": "latest",
		"videojs-select-subtitle": "latest",
		
	"vue": "^2.5.16",
		"vue-electron": "^1.0.6",
		"vue-i18n": "^8.8.2",
		"vue-router": "^3.0.1",
		"vuex": "^3.1.0",
		"vuex-electron": "^1.0.3",
	"@fortawesome/fontawesome-free": "^5.7.0",
	"electron": "^4.0.2",
	"webpack": "^4.29.0",

For the core of the app
	"moviedb": "latest",
	"node-openload": "latest",
	"opensubtitles-api": "latest",
	"webtorrent": "latest",
	"yifysubtitles-api": "latest"
```

For now we use:
- electron
- Vue
- Bootstrap (later will be changed to Semantic-ui)
- Socket.io
- Video.js (It's in possibility to be changed to Plyr)
- Nedb
