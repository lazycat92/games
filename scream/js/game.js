define(function(require) {
	'use strict';
	
	var $ = require('jquery');
	var Swiper = require('Swiper');
	var Preload = require('Preload');
	
	var count = 0;

	var manifest = [
		"status1/arrow.png",
		"status1/bg.png",
		"status1/boy-light.png",
		"status1/girl-light.png",
		"status1/girl.png",
		"status1/boy.png",
		"status1/cloud.png",
		"status1/coupon.png",
		"status1/title.png"
	];

	var preload = new createjs.LoadQueue(true, "./img/");
	preload.on('fileload', handleFileLoad);
	preload.on('progress', handleOverallProgress);
	preload.on("fileprogress", handleFileProgress);
	preload.on('error', handleFileError);
	preload.setMaxConnections(10);
	
	preload.loadManifest(manifest);
	
	function handleFileLoad() {
		$(".preload-tips").hide();
		$(".container").show();
	}
	
	function handleOverallProgress(e) {
		console.log(e);
		console.log('progress', preload.progress);
		$(".preload-progress").html(preload.progress * 100);
	}
	
	function handleFileProgress(e) {
		console.log(e);
	}
	
	function handleFileError(event) {
		$(".preload-tips").html("error" + JSON.stringify(event));
	}

	function countdown(a) {
		$("time").html(a);
		$(".btn").on("touchstart", function() {
			count++;
			$(this).addClass("off");
		}).on("touchend", function() {
			$(this).removeClass("off");
			$(".count").html(count);
		});
		$("button").off("click", handler);
		var timer = setInterval(function() {
			a--
			$("time").html(a);
			if(a == 0) {
				clearInterval(timer);
				$(".btn").off("touchstart touchend");
				$(".btn").removeClass("off");
				$("button").on("click", handler);
			}
		}, 1000);
	}

	$("button").on("click", handler);

	function handler() {
		count = 0
		countdown(10);
	};
	
	new Swiper('.swiper-container', {
		direction: "vertical",
		noSwiping: true
	})
})