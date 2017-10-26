/*
 *	author: Wu
 *	data: 2017.10.26
 *	version: 1.0.0
 *	activityid: 20171111screamgame
 */

define(function(require) {
	'use strict';

	var $ = require('jquery');
	var Swiper = require('Swiper');
	var Preload = require('Preload');

	var urls = {
		img: "https://img04.aomygod.com/fontend",
		code: "",
		setActivityId: "",
		autoLogin: "",
		getCoupon: ""
	};

	// 阻止页面上下滑动
	$("body").on("touchmove", function(e) {
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
		"https://img04.aomygod.com/fontend/20171023/imgs/status1/title.png",
		'https://img04.aomygod.com/fontend/20171026/imgs/logo.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/number/0.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/number/1.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/number/2.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/number/3.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/number/4.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/number/5.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/number/6.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/number/7.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/number/8.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/number/9.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/arrow.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/bg.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/boy-light.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/boy-light2.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/boy.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/cloud.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/coupon.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/girl-light.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/girl-light2.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/girl.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/logo.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status1/title.png',
		'https://img04.aomygod.com/fontend/20171026/imgs/status2/boy/1.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status2/boy/2.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status2/boy/3.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status2/boy/4.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status2/girl/1.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status2/girl/2.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status2/girl/3.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status2/girl/4.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/1.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/12.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/13.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/33.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/begin.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/boy/0.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/boy/1.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/boy/2.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/boy/3.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/boy/5.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/boy/bg.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/btn-off.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/btn-on.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/cloud.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/final-scream.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/girl/0.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/girl/1.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/girl/2.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/girl/3.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/girl/4.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/girl/6.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/girl/bg.png',

		'https://img04.aomygod.com/fontend/20171026/imgs/status3/time.png',

	];

	var pageEvent = function() {
		this.init();
	};

	pageEvent.prototype = {
		init: function() {
			this.calcScreen();
			this.preloadFile();
			this.changeStatus();
		},
		// 定义页面宽高，屏幕适应计算
		calcScreen: function() {
			var container = $(".container");
			var winWidth = window.innerWidth,
				winHeight = window.innerHeight;
			var normalWidth = 750,
				normalHeight = 1334;
			var screenWidth, screenHeight;
			if(normalWidth / normalHeight > winWidth / winHeight) {
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
		preloadFile: function() {
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
				if(preload.progress == 1) {
					$(".container").show();
				}
			}

			function handleFileProgress(e) {}

			function handleFileError(event) {
				$(".preload-tips").html("error" + JSON.stringify(event));
			}
		},
		// 游戏开始
		gameBegin: function(gender) {
			var _this = this;
			var count = 0;

			function countdown(a) {
				$(".count1").attr('src', "img/number/1.png");
				$(".count2").attr('src', "img/number/0.png");

				$(".btn").on("touchstart", function(e) {
					e.preventDefault();
					count++;
					if(count >= 90) {
						$(".score-num img").css('bottom', '-8.74667rem');
					} else {
						$(".score-num img").css('bottom', ((count * 4.5 - 410) / 46.875) + 'rem');
					}
					switch(true) {
						case count >= 31 && count <= 50:
							$("#status3 img[name=person]").attr('src', 'img/status3/' + gender + '/1.png');
							break;

						case count >= 51:
							var num = count % 2 + 2;
							if(gender == 'girl') {
								$("#status3 img[name=person]").attr('src', 'img/status3/girl/2.png');
							} else {
								$("#status3 img[name=person]").attr('src', 'img/status3/' + gender + '/' + num + '.png');
							}
							$("#status3 .mask, img[name=shadow1]").show();
							break;

						default:
							// $("#status3 img[name=person]").attr('src', 'img/status3/boy/0.png');
							break;
					}
					$(this).addClass("btn-off");
				}).on("touchend", function() {
					$(this).removeClass("btn-off");
				});
				var timer = setInterval(function() {
					a--
					if(a < 10) {
						$(".count1").attr('src', "img/number/0.png");
						$(".count2").attr('src', "img/number/" + a + ".png");
					}
					if(a == 0) {
						clearInterval(timer);
						$(".count2").attr('src', "img/number/0.png");
						$(".btn").off("touchstart touchend");
						$(".btn").removeClass("btn-off");
						_this.calcScore(count);
					}
				}, 1000);
			}

			$(".btn-begin").on("click", handler);

			function handler() {
				console.log('begin');
				$(".btn-begin").off('click', handler);
				$(".arrow-begin").hide();
				count = 0
				countdown(10);
			};
		},
		// 切换
		changeStatus: function(e) {
			var _this = this;

			$("#status1 .btn-light a").on('click', function(e) {
				e.stopPropagation();
				$(this).parents("#status1").hide();
				$("#status2").show();
				var isBoy = $(this).hasClass("btn-boy");
				if(isBoy) {
					$("#status2").find("div").eq(0).show();
				} else {
					$("#status2").find("div").eq(1).show();
				}

				setTimeout(function() {
					$("#status2").hide();
					$("#status3").show();
					if(isBoy) {
						_this.gameBegin("boy");
						$("#status3 .background").find("img").eq(0).show();
						$("#status3 .background").find("img").eq(1).hide();
						$("#status3 .boy").show();
						$("#status3 .girl").hide();
					} else {
						_this.gameBegin("girl");
						$("#status3 .background").find("img").eq(1).show();
						$("#status3 .background").find("img").eq(0).hide();
						$("#status3 .boy").hide();
						$("#status3 .girl").show();
					}
				}, 4000);
			});
		},
		// 计算成绩
		calcScore: function(score) {
			console.log(score);
			$("#status3").fadeOut();
			$("#status4").fadeIn();
			var showScore = 179 * score; // 尖叫值
			var random = Math.floor(Math.random() * 10); // 产生一个有用的随机数
			var passOver = score < 100 ? Math.floor(score / 10) * 10 + random : 99; // 随机生成超过多少人
			$("#status4 .score span").html(passOver + "%");

			// 返回文案
			var content = [
				"你掰狂！</br>超越俺算啥本事！</br>再努力一点，追上TA！",
				"真正的大师！</br>永远都怀着一颗学徒的心！</br>再来一次，你可以更好！",
				"狂击10秒！</br>竟无一人超越我？！</br>哎哟喂，吓死宝宝了！</br>"
			]

			// 根据产品要求，分两种所谓的规则
			// 第一种情况， 参与游戏人数大于100时;
			if(rate.member_count > 100) {

				switch(true) {
					case score >= 31 && score <= 50:
						$("#status4 .word").html(content[1]);
						break;

					case score >= 51:
						$("#status4 .word").html(content[2]);
						break;

					default:
						$("#status4 .word").html(content[0]);
						break;
				}

			} else {
				// 第二种情况，参与游戏人数小于100时
				
				switch(true) {
					case score >= 21 && score <= 40:
						$("#status4 .word").html(content[1]);
						break;

					case score >= 41:
						$("#status4 .word").html(content[2]);
						break;

					default:
						$("#status4 .word").html(content[0]);
						break;
				}
			}
		}
	}

	new pageEvent();
});