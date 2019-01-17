const axios	= require('axios');              //to post links of the uploaded files to dreamovies

var config = function(){
	//axios.defaults.baseURL = 'https://api.dreamovies.tk/v2/';
	//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	//axios.defaults.headers.common["User-Agent"] = axios.defaults.headers.common["User-Agent"] + " DreamoviesUploader/V1";
}

const axios_dream = axios.create({
	baseURL: 'https://api.dreamovies.tk/v2/',
	timeout: 1000,
	headers: {
		'X-App': 'DreamoviesUploader/V1',
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

var addLink = function(link, id){
	
	$(".btn-search").removeClass("yts-filter eztv-filter dreamovies-filter").addClass("dreamovies-filter");

	axios_dream.post('/user', {
			link: link,
			id: id
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

config();

module.exports = {
	addLink: addLink,
	config: config
}