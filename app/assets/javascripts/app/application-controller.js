define([
    "jQuery",
	"app/views/start",
	"app/views/profile",
	"app/views/show",
	"app/data"
	], function (
    $,
	startView,
	profileView,
	showView,
	Data
	) {

    return {
		init: function () {
			$(document).ready(function() {
				//initial page load
				var path = window.location.pathname.split('/')[2];
				path = (typeof(path) != 'undefined' && path !== '') ? path : 'show';
				console.log('Initializing '+path);
				App.views[path].init();
			});
			$(document).on('page:load', function() {
				//rails page load
				var path = window.location.pathname.split('/')[2];
				path = (typeof(path) != 'undefined' && path !== '') ? path : 'show';
				console.log('Initializing '+path);
				App.views[path].init();
			});
			
			$('#search-tag').on('keypress', function(e){
				// TODO 
				 // var keycode = (event.keyCode ? event.keyCode : event.which);
				// if(keycode == '13') {
					// window.location.href = '/tag/'+$(this).val();    
				// }
			});
		},
		data: Data,
		views : {
			start: startView,
			profile: profileView,
			show: showView
		}
	}
});