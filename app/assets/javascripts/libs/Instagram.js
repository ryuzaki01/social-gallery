define([], function () {
    return {
		context: null,
		unique: null,
		options: {
			target: 'instagram',
			get: 'popular',
			resolution: 'thumbnail',
			sortBy: 'none',
			links: true,
			mock: false,
			useHttp: false
		},
		init: function(){
			//TODO ajax api content loading
		}
	}
});