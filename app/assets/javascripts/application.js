// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require turbolinks
var App;
var Ig;
require.config({
    paths: {
        jQuery: ['//code.jquery.com/jquery-2.1.3.min',"libs/jquery-2.1.3.min"]
    },
    waitSeconds: 240,
    shim: {
        jQuery: {
            exports: "jQuery",
			init: function(){
				//$('#loading').show();

				console.log('JQuery inited..');
			}
        }
    }
});

require(["app/application-controller", "libs/Instagram"], function (application, Instagram) {
	App = application;
	Ig = Instagram;
	var deviceAgent = navigator.userAgent.toLowerCase();
	var agentID = deviceAgent.match(/(iphone|ipod|android)/);
	if (agentID) {
		$("#body").css("min-height", "418px");
		setTimeout(function () {
			try { window.scrollTo(0, 1); } catch (e) { }
		}, 0);
	}
	App.init();
	console.log('Main...');
});