define([], function () {
    return {
		// button click function or UI specified function for current page can be set here
        init: function (e) {
		console.log($('#userid').val());
			Ig.init({
				get: 'tag'
			}, $('#userid').val());
			console.log('Inited Profile');
		}
	}
});