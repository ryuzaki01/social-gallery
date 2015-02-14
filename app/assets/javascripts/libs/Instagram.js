define([], function () {
    return {
		last_max: null,
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
		init: function(options){
			$('#'+Ig.options.target).html('');
			for(i in options){
				Ig.options[i] = options[i];
			}
			Ig.last_max = null;
			Ig.fetch();
			
			$('#'+Ig.options.target).delegate('.sg-heart:not(.active)', 'click', function(){
				Ig.like($(this).parent().parent().parent().parent().parent().parent().attr('id'));
			});
			
			$('#'+Ig.options.target).delegate('.sg-heart.active', 'click', function(){
				Ig.unlike($(this).parent().parent().parent().parent().parent().parent().attr('id'));
			});
			
			$(window).scroll(function() {
				if($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
					if(Ig.hasNext())
						Ig.next();
				} else {
					$.each($('#'+Ig.options.target+' li:not(.visible)'), function(){
						if(Ig.visible($(this))){
							$(this).addClass('visible');
						}
					});
				}
			});
		},
		
		visible: function(el){
			var $t        = el,
			$w            = $(window),
			viewTop       = $w.scrollTop(),
			viewBottom    = viewTop + $w.height(),
			_top          = $t.offset().top,
			_bottom       = _top + $t.height(),
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
			if(max){
				url = "/api/" + Ig.options.get +'/'+max+'.json';
			} else {
				url = "/api/" + Ig.options.get +'.json';
			}
			$.getJSON( url, function(data){
				if(max == data.max_id){
					//alert('Conflict max data');
					Ig.last_max = null;
				} else {
					Ig.last_max = data.max_id;	
				}
				
				if(data.medias.length > 0){
					for(i in data.medias){
						media = data.medias[i];
						$('#'+Ig.options.target).append(
							'<li id="'+media.id+'" class="grid-25 tablet-grid-30 mobile-grid-100">'+
								'<span class="grid-100 grid-parent">'+
									'<div>'+
										'<ul class="grid-100 grid-parent">'+
											'<li class="grid-33 tablet-grid-33 mobile-grid-33 grid-parent text-center"><a target="_blank">'+
												'<i class="ic sg-heart '+(media.user_has_liked?'active':'')+'"></i>'+
											'</a></li>'+
											'<li class="grid-33 tablet-grid-33 mobile-grid-33 grid-parent text-center"><a href="'+media.link+'" target="_blank">'+
												'<i class="ic sg-link"></i>'+
											'</a></li>'+
											'<li class="grid-33 tablet-grid-33 mobile-grid-33 grid-parent text-center"><a href="'+media.link+'" target="_blank">'+
												'<i class="ic sg-share"></i>'+
											'</a></li>'+
										'</ul>'+
										'<section><b>'+media.user.username+'</b>'+(media.caption?' : '+media.caption.text:'')+'</section>'+
									'</div>'+
									'<img src="'+media.images.standard_resolution.url+'">'+
								'</span>'+
							'</li>');
					}
				} else {
					$('#'+Ig.options.target).append('<li>No result.</li>');
				}
				
				$.each($('#'+Ig.options.target+' li:not(.visible)'), function(){
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
		
		hasNext: function(){
			return (Ig.last_max != null);
		},
		
		next: function(){
			Ig.fetch(Ig.last_max);
		}
	}
});