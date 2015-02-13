define([
    "jQuery",
	"app/views/index",
	"app/views/tag",
	"app/data"
	], function (
    $,
	indexView,
	tagView,
	Data
	) {

    return {
		init: function () {
			// $(document).ready(function() {
				// initial page load
				// var path = window.location.pathname.split('/')[1];
				// path = path !== '' ? path : 'index';
				// console.log('Initializing '+path);
				// App.views[path].init();
			// });
			// $(document).on('page:load', function() {
				// rails page load
				// var path = window.location.pathname.split('/')[1];
				// path = path !== '' ? path : 'index';
				// console.log('Initializing '+path);
				// App.views[path].init();
			// });
			
			$('#search-tag').on('keypress', function(e){
				// TODO 
				 // var keycode = (event.keyCode ? event.keyCode : event.which);
				// if(keycode == '13') {
					// window.location.href = '/tag/'+$(this).val();    
				// }
			});
			
			$(window).scroll(function() {
			   if($(window).scrollTop() + $(window).height() == $(document).height()) {
					// Endless Scroll
				  // if(Ig.hasNext())
					// Ig.next();
			   }
			});
		},
		data: Data,
		views : {
			index: indexView,
			tag: tagView
		}
	}
});