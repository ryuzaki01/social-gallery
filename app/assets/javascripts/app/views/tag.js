define([], function () {
    return {
		// button click function or UI specified function for current page can be set here
        init: function (e) {
			var tag = window.location.pathname.split('/')[2];
			$('#search-tag').val(tag);
			Ig.init();
			console.log('Inited Tag');
		}
	}
});