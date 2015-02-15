define([], function () {
    return {
		// button click function or UI specified function for current page can be set here
        init: function (e) {
			Ig.init({
				get: 'user_media'
			}, $('#userid').val());
			console.log('Inited Profile');
		}
	}
});