define([], function () {
    return {
		last_max: null,
		userid: false,
		fetching: false,
		options: {
			target: 'instagram',
			get: 'popular',
			resolution: 'thumbnail',
			sortBy: 'none',
			links: true,
			mock: false,
			useHttp: false
		},
		init: function(options, userid){
			$('#'+Ig.options.target).html('');
			//reset
			Ig.last_max = null;
			Ig.userid = userid?userid:false;
			Ig.options = Ig.defaults;
			
			for(i in options){
				Ig.options[i] = options[i];
			}
			Ig.fetch();
			
			$('#'+Ig.options.target).delegate('.sg-heart:not(.active)', 'click', function(){
				Ig.like($(this).parent().parent().parent().parent().parent().parent().attr('id'));
			});
			
			$('#'+Ig.options.target).delegate('.sg-heart.active', 'click', function(){
				Ig.unlike($(this).parent().parent().parent().parent().parent().parent().attr('id'));
			});
			
			$(window).scroll(function() {
				if($(window).scrollTop() + $(window).height() >= ($(document).height() - ($('#instagram > li:eq(1)').height() * 2))) {
					if(Ig.hasNext())
						Ig.next();
				}
					
				$.each($('#'+Ig.options.target+' > li:not(.visible)'), function(){
					if(Ig.visible($(this))){
						$(this).addClass('visible');
					}
				});
			});
		},
		
		visible: function(el){
			var $t        = el,
			$w            = $(window),
			viewTop       = $w.scrollTop(),
			viewBottom    = viewTop + $w.height(),
			_top          = $t.offset().top,
			_bottom       = _top + $t.height() + 100,
			compareTop    = _bottom,
			compareBottom = _top;
			return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
		},
		
		fetch: function(maxid){
			if(Ig.fetching)
				return;
			Ig.fetching = true;
			$('#loading').show();
			
			console.log('Fetching '+maxid);
			
			max = maxid;
			url = "/api/" + Ig.options.get;
			
			if(Ig.userid)
				url += '/'+Ig.userid;
				
			if(max){
				url += '/'+max+'.json';
			} else {
				url += '.json';
			}
			$.getJSON( url, function(data){
				if(max == data.max_id){
					//alert('Conflict max data');
					Ig.last_max = null;
				} else {
					Ig.last_max = data.max_id;	
				}
				
				if(data.medias.length > 0){
					for(i = 0; i < data.medias.length; i++){
						media = data.medias[i];
						item = '<li id="'+media.id+'" class="grid-25 tablet-grid-33 mobile-grid-100">'+
								'<span class="grid-100 grid-parent">'+
									'<div>'+
									'<ul class="grid-100 grid-parent">'+
										'<li class="grid-33 tablet-grid-33 mobile-grid-33 grid-parent text-center"><a href="/main/media/'+media.id+'" title="Go to Link">'+
												'<i class="ic sg-link"></i>'+
										'</a></li>'+
										'<li class="grid-33 tablet-grid-33 mobile-grid-33 grid-parent text-center"><a onclick="Ig.share(\''+media.id+'\', \''+media.images.low_resolution.url+'\')" target="_blank" title="Share ?">'+
											'<i class="ic sg-share"></i>'+
										'</a></li>';
										
						if(data.authed){
							item += '<li class="grid-33 tablet-grid-33 mobile-grid-33 grid-parent text-center"><a target="_blank" title="'+(media.user_has_liked?'Unlike this ?':'Like this ?')+'">'+
											'<i class="ic sg-heart '+(media.user_has_liked?'active':'')+'"></i>'+
										'</a></li>';
						}
									
						item += '</ul><section>'+(media.caption ? '<a class="userlink" href="/main/user/'+media.caption.from.username+'">'+media.caption.from.username+'</a> : '+media.caption.text.replace(/(^| )@([A-Za-z0-9_-]+)(?![A-Za-z0-9_\]-])/g, "$1<a class=\"userlink\" href=\"/main/user/$2\">@$2</a>").replace(/(^| )#([A-Za-z0-9_-]+)(?![A-Za-z0-9_\]-])/g, "$1<a class=\"tag\" href=\"/main/tag/$2\">#$2</a>"):'')+'</section>'+
								'</div>'+
								(media.type == 'video'? '<video muted loop autoplay preload="auto" poster="'+media.images.standard_resolution.url+'"><source src="'+(media.videos.low_bandwidth?media.videos.low_bandwidth.url:media.videos.low_resolution.url)+'" type="video/mp4;"></video>' : '<img src="'+media.images.low_resolution.url+'">')+
								'<img class="small-avatar" src="'+media.user.profile_picture+'" title="'+media.user.full_name+'">'+
							'</span>'+
						'</li>';
						
						$('#'+Ig.options.target).append(item);
					}
				} else {
					$('#'+Ig.options.target).append('<li>No result.</li>');
				}
				
				$.each($('#'+Ig.options.target+' > li:not(.visible)'), function(){
					if(Ig.visible($(this))){
						$(this).addClass('visible');
					}
				});
				
				$('#loading').hide();
				
				Ig.fetching = false;
			}).error(function() { Ig.fetching = false; $('#loading').hide(); });
		},
		
		like: function(id){
			$('#loading').show();
			url = '/api/like/'+id+'.json';
			$.getJSON( url, function(data){
				$('#'+id).find('.sg-heart').addClass('active');
				$('#loading').hide();
			}).error(function() { $('#loading').hide(); });
		},
		
		unlike: function(id){
			$('#loading').show();
			url = '/api/unlike/'+id+'.json';
			$.getJSON( url, function(data){
				$('#'+id).find('.sg-heart').removeClass('active');
				$('#loading').hide();
			}).error(function() { $('#loading').hide(); });
		},
		
		share :function(id){
			url = window.location.origin+'/main/media/'+id;
			var sharerURL = "http://www.facebook.com/sharer/sharer.php?u=" + encodeURI(url);
			window.open(
			  sharerURL,
			  'facebook-share-dialog', 
			  'width=626,height=436');
			return  false;
		},
		
		hasNext: function(){
			return (Ig.last_max != null);
		},
		
		next: function(){
			Ig.fetch(Ig.last_max);
		},
		
		defaults: {
			target: 'instagram',
			get: 'popular',
			userid: false,
			resolution: 'thumbnail',
			sortBy: 'none',
			links: true,
			mock: false,
			useHttp: false
		}
	}
});