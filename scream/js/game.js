define(function (require) {
	'use strict';

	var $ = require('jquery');
	var Swiper = require('Swiper');
	var Preload = require('Preload');

	// 阻止页面上下滑动
	$("body").on("touchmove", function (e) {
		e.preventDefault();
	})

	var manifest = [
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/arrow.png",
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/bg.png",
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/boy-light2.png",
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/girl-light2.png",
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/girl.png",
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/boy.png",
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/cloud.png",
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/coupon.png",
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/title.png"
	];

	var pageEvent = function () {
		this.init();
	};

	pageEvent.prototype = {
		init: function () {
			this.calcScreen();
			this.preloadFile();
		},
		// 定义页面宽高，屏幕适应计算
		calcScreen: function() {
			var container = $(".container");
			var winWidth = window.innerWidth, winHeight = window.innerHeight;
			var normalWidth = 750, normalHeight = 1334;
			var screenWidth, screenHeight;
			if(normalWidth/normalHeight > winWidth/winHeight) {
				screenWidth = winWidth;
				screenHeight = Math.floor(screenWidth * normalHeight / normalWidth);
			} else {
				screenHeight = winHeight;
				screenWidth = Math.floor(screenHeight * normalWidth / normalHeight);
			}
			// container.find(".status").width(screenWidth);
			// container.find(".status").height(screenHeight);
		},
		// 图片预加载
		preloadFile: function () {
			var _this = this;
			var preload = new createjs.LoadQueue(true);
			preload.on('fileload', handleFileLoad);
			preload.on('progress', handleOverallProgress);
			preload.on("fileprogress", handleFileProgress);
			preload.on('error', handleFileError);
			preload.setMaxConnections(10);

			preload.loadManifest(manifest);

			function handleFileLoad() {
					$(".preload-tips").hide();
			}

			function handleOverallProgress(e) {
				var progress = preload.progress.toFixed(2);
				$(".preload-progress").html(parseInt(progress * 100));
				if (preload.progress == 1) {
					$(".container").show();
				}
			}

			function handleFileProgress(e) {
			}

			function handleFileError(event) {
				$(".preload-tips").html("error" + JSON.stringify(event));
			}
			
			_this.gameBegin();
		},
		// 游戏开始
		gameBegin: function () {
			var count = 0;
			
			function countdown(a) {
				$(".count1").attr('src', "img/number/1.png");
				$(".count2").attr('src', "img/number/0.png");

				$(".btn").on("touchstart", function (e) {
					e.preventDefault();
					count++;
					$(this).addClass("btn-off");
				}).on("touchend", function () {
					$(this).removeClass("btn-off");
					$(".count").html(count);
				});
				var timer = setInterval(function () {
					a--
					if(a < 10) {
						$(".count1").attr('src', "img/number/0.png");
						$(".count2").attr('src', "img/number/" + a + ".png");
					}
					$(".score-num img").css('bottom', -(a * 41 / 46.875) + 'rem');
					$(".person img[name=person]").attr('src', 'img/status3/boy/' + (a % 4) + '.png')
					if (a == 0) {
						clearInterval(timer);
						$(".count1").attr('src', "img/number/0.png");
						$(".count2").attr('src', "img/number/0.png");
						$(".btn").off("touchstart touchend");
						$(".btn").removeClass("off");
					}
				}, 1000);
			}

//			$("button").on("click", handler);

			function handler() {
				count = 0
				countdown(10);
			};
			countdown(10);
		},
	}

	new pageEvent();
});