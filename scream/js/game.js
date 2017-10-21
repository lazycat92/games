define(function(require) {
	'use strict';
	
	var $ = require('jquery');
	var Swiper = require('Swiper');
	
	
	var count = 0;

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
})