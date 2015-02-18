define([], function () {
    return {
		// button click function or UI specified function for current page can be set here
        init: function (e) {
			console.log('Inited Media');
			//I still don't understand why javascript not reset when changing page in rails
			//Add tweak to reset scroll function
			$(window).scroll(function() {});
		}
	}
});