define([], function () {
    return {
		// button click function or UI specified function for current page can be set here
        init: function (e) {
			Ig.init({
				get: 'popular'
			});
			console.log('Inited index');
		}
	}
});