const $ 	= require("jquery");
var util	= require('../js/util.js');

var listItem = function(list, id, info){

	var html = '<div class="media text-muted pt-3" id="' + list + '-item-' + id + '">' +
	'	<img alt="' + info.image + '" class="mr-2 rounded" style="width: 100px;" src="' + info.image + '" >' +
	'	<div class="media-body mb-0 small lh-125 border-bottom border-gray">' +
	'		<div class="d-flex justify-content-between align-items-center w-100">' +
	'			<strong class="text-gray-dark">' + info.name + '</strong>' +
	'			<a class="add-to-website" href="#" data-id="' + id + '">Add link to Website</a>' +
	'		</div>' +
	'		<span class="file-peers"></span><span class="file-info"></span>' + 
	'		<span class="d-block"><!-- progresss bar -->' + progress(id) + '</span>' +
	'		<p class="final-link"></p>' + 
	'	</div>' +
	'</div>';

	if(list == "upload"){
		$("#list-upload").append(html);
	} else if(list == "download"){
		$("#list-download").append(html);
	}
};

var progress = function(id){
	var html = '<div class="progress">' +
	'	<div id="progress-bar-' + id + '" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>' +
	'</div>';
	return html;
}
var barUpdate = function(id, progress, error = false, msgError = ""){
	$("#progress-bar-" + id).css("width", progress + "%").attr("aria-valuenow", progress).text(progress + "%");
	if(parseInt(progress) == 100){
		$("#progress-bar-" + id).addClass('bg-success');
	}
	if(error){
		$("#progress-bar-" + id).css("width", progress + "%").attr("aria-valuenow", progress).text(msgError);
		$("#progress-bar-" + id).removeClass('bg-success').addClass('bg-danger');
	} else {
		$("#progress-bar-" + id).css("width", progress + "%").attr("aria-valuenow", progress).text(progress + "%");
	}
};

var infoUpdate = function(id, info){
	$("#upload-item-" + id + " strong").text(info.title);
	$("#upload-item-" + id + " img").attr('src', info.image);
}

var itemFinalize = function(id, info){
	$("#upload-item-" + id + " p.final-link").text(info.url);
}

var downloadUpdate = function(info){
	var info_Html = '<div>' +
	'	<span>Downloaded: ' + info.downloaded + '</span> / <span>Total: ' + info.total + '</span><br>'+
	'	<span>remaining: ' + info.remaining + '</span><br>'+
	'	<span>isDone: ' + info.isDone + '</span><br>'+
	'	<span>DownloadSpeed: ' + info.downloadSpeed + '</span> - <span>uploadSpeed: ' + info.uploadSpeed + '</span>'+
	'</div>';

	$("#download-item-" + info.id + " .file-peers").text(info.numPeers + (info.numPeers === 1 ? ' peer' : ' peers'));
	$("#download-item-" + info.id + " .file-info").html(info_Html);
	barUpdate(info.id, info.progress);
};


var TorrentList = function(list, infoHash){
	var html = "<ul>";
	for(item in list){
		html += "<li class='torrent-select' data-position='" + item + "' data-hash='" + infoHash + "'>";
		html += "	<span>Name: </span>" + list[item].name;
		html += "</li>";
	}
	html += "</ul>";
	$("#modalListTorrent .modal-body").html(html);
	$('#modalListTorrent').modal('show');
};


var ListPagination = function(page_number, items_count){


	var html = 	'<nav aria-label="Page navigation">' +
				'	<ul class="pagination justify-content-center">'+
				'		<li class="page-item ' + (page_number == 1 ? " disabled" : "" ) + '"><a class="page-link" data-page="' + (page_number - 1) + '" href="#" ' + (page_number == 1 ? " tabindex='-1'" : "" ) + '>Previous</a></li>';

	var total_pages =  Math.round(items_count / 30);
	
	if(page_number == 1 || page_number <= 4){
		var start_count = 1;
	} else {
		var start_count = page_number - 3;
	}
	if(items_count - 3 <= page_number){
		var end_count = items_count;
	} else {
		var end_count = page_number + 3;
	}

	for (var i = start_count; i <= end_count; i++) {
		html += '		<li class="page-item ' + (i == page_number ? " active" : "" ) + '"><a data-page="' + i + '" class="page-link" href="#">' + i + '</a></li>';
	}
		html += '		<li class="page-item"><a class="page-link" data-page="' + (page_number + 1) + '" href="#">Next</a></li>' +
				'	</ul>' +
				'</nav>';
	return html;
}


var filterCreate = function(type = "Categories"){

	if(type == "Categories"){
		var filters = util.listCategories();
	} else if(type == "Order"){
		var filters = util.listOrder();
	} else if(type == "Quality"){
		var filters = util.listQuality();
	} else if(type == "Sort"){
		var filters = util.listSort();
	}

	var html = `<select class="form-control form-control-dark mr-2 filter filter-${ filters.field }" name="${ filters.field }">`;
		html += `<option value="${ filters.list[0].value }" selected disabled>${ filters.placeholder }</option>`;

	var list = filters.list;

	for (var i = 0; i < list.length; i++) {
		html += `<option value="${ list[i].value }">${ list[i].label }</option>`;
	}	
	html += '</select>';

	return html;
}



var tableFill = function(){
	var html = "";
	
	$(".array-list-upload").html('');
	Object.keys(window.list_uploads).forEach(function(key) {
		console.log(key, window.list_uploads[key]);
		html += '<tr>' + 
			'	<th scope="row">#' + key + ' - ' + window.list_uploads[key].info.id + '</th>' + 
			'	<td>' + window.list_uploads[key].upload.id + '</td>' + 
			'	<td>' + window.list_uploads[key].upload.url + '</td>' + 
			'	<td>' + window.list_uploads[key].info.name + '</td>' + 
			'</tr>';
	});
	
	$(".array-list-upload").append(html);

	var html = "";
	$(".array-list-download").html('');
	Object.keys(window.list_downloads).forEach(function(key) {
		console.log(key, window.list_downloads[key]);
		html += '<tr>' + 
			'	<th scope="row">#' + key + ' - ' + window.list_downloads[key].info.id + '</th>' + 
			'	<td>' + window.list_downloads[key].torrent.progress + '</td>' + 
			'	<td>' + window.list_downloads[key].torrent.downloadSpeed + '</td>' + 
			'	<td>' + window.list_downloads[key].torrent.hash + '</td>' + 
			'	<td>' + window.list_downloads[key].info.pathfile + '</td>' + 
			'	<td>' + window.list_downloads[key].info.name + '</td>' + 
			'</tr>';
	});
	
	$(".array-list-download").append(html)
}


var activateView = function(){
	$("#log-container, #API-list").removeClass('show-container');
	$("#API-list").removeClass('yts-list eztv-list dreamovies-list');
	$("#files-container").addClass('show-container');
}

module.exports = {
	listItem: listItem,
	barUpdate: barUpdate,
	infoUpdate: infoUpdate,
	itemFinalize: itemFinalize,
	tableFill: tableFill,
	downloadUpdate: downloadUpdate,
	activateView: activateView,
	TorrentList: TorrentList,
	ListPagination: ListPagination,
	filterCreate: filterCreate
}