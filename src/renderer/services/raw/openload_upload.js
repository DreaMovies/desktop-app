const openload 	= require('node-openload');              //to upload files to openload
var views 		= require('../view/generic_view.js');
var infoFetcher	= require('../js/info_fetcher.js');

var ol = openload({
	api_login: 'a64a34a4c8e16c20',
	api_key: 'umPGoUXZ',
});


/*ipcMain.on('file_upload', function(event, path) {
	ol.upload({
		file: path,
		folder: "4349015"
	}).then(info => {
			console.log(info);
			event.sender.send('upload_status', info);
		}
	);   // Prints upload info
});
*/


//var filepath = "feeds/Silicon.Valley.S01E01.HDTV.x264-KILLERS.mp4";
	/**************
	upload(obj)
	Perform an upload of a local file.
	obj: Object containing data for the upload:
	{
	  file:             // mandatory
	  folder:
	  filename:
	  contentType
	}
	obj.file: A buffer or the local path of your desired file.
	obj.folder: The folder ID you want to upload to. (not required)
	obj.filename: The file's name. (only required if using a buffer)
	obj.contentType: The file's content type. (only required if using a buffer)
	***************/

var getAccountInfo = function () {
	ol.getAccountInfo().then(info => console.log(info));   // Prints account info 
};

var fileUpload = function (filename, fileUrl) {
	//ipcRenderer.send('show-prop1');file_upload
	var current_id = Date.now();
	
	window.list_uploads[current_id] = {};

	var info = infoFetcher.getInfoFile(filename, fileUrl, current_id);

	views.listItem("upload", current_id, info);

	ol.upload({
		file: fileUrl,
		folder: "4349015"
	}, function(args){
		console.log(args);
		upload_status(current_id, args);
	}).then(info => {   // Prints upload info
		/*
			id		: "ZV3RLF2j9tQ"
			name	: "WhatsApp Video 2018-02-16 at 11.22.35.mp4"
			sha1	: "9207a620b78796666d5ef7e0a7f34d74fbe225c8"
			size	: "1509630"
			url		: "https://openload.co/f/ZV3RLF2j9tQ/WhatsApp_Video_2018-02-16_at_11.22.35.mp4"
			content_type	: "video/mp4"
		*/
		console.log(info);

		window.list_uploads[current_id].upload = info;

		views.itemFinalize(current_id, info);
		views.tableFill();
	}).catch((err) => {
		// Handle any error that occurred in any of the previous
		// promises in the chain.
		upload_status(current_id, err, true);
	});
};

var upload_status = function(id, status, error = false){
	//{percent: 0, transferred: 0, total: 852225032}
	console.log("Status Upload: ");
	console.log(status);
	if(!error){
		views.barUpdate(id, (status.percent * 100).toFixed(2), error);
	} else {
		views.barUpdate(id, 100, error, status);
	}
};

module.exports = {
	getAccountInfo: getAccountInfo,
	fileUpload: fileUpload
}