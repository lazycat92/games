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
	var Howler = require("howler.js-master/howler.js-master/dist/howler.core.min");
	// var cookie = require('js/common/base/cookie');
	// var BrowserUtil = require('js/util/browser/1.0.0/browser');
	// var Dialog = require('common/ui/dialog/dialog');
	// var io = require('common/kit/io/request');

	function getCookie(c_name) {
		if(document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=")
			if(c_start != -1) {
				c_start = c_start + c_name.length + 1
				c_end = document.cookie.indexOf(";", c_start)
				if(c_end == -1) c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	}
	var urls = {
		img: "https://img04.aomygod.com/fontend/20171027/",
		code: "https://ssl.aomygod.com/passport/smsSendByMobile",
		setActivityId: "https://ssl.aomygod.com/apimall/member/saveactive", // https://ssl.aomygod.com/apimall/member/saveactive/{active_id}
		autoLogin: "https://ssl.aomygod.com/passport/autoRegisterAndLogin",
		getCoupon: "https://m.aomygod.com/Activitycommon/fetchCoupon"
	};

	var manifest = [
		urls.img + 'imgs/logo.png',
		urls.img + 'imgs/music-off.png',
		urls.img + 'imgs/music-on.png',
		urls.img + 'imgs/new.png',

		urls.img + 'imgs/status1/title.png',
		urls.img + "imgs/status1/arrow.png",
		urls.img + "imgs/status1/bg.png",
		urls.img + "imgs/status1/boy-light2.png",
		urls.img + "imgs/status1/girl-light2.png",
		urls.img + "imgs/status1/girl.png",
		urls.img + "imgs/status1/boy.png",
		urls.img + "imgs/status1/coupon.png",

		urls.img + 'imgs/number/0.png',
		urls.img + 'imgs/number/1.png',
		urls.img + 'imgs/number/2.png',
		urls.img + 'imgs/number/3.png',
		urls.img + 'imgs/number/4.png',
		urls.img + 'imgs/number/5.png',
		urls.img + 'imgs/number/6.png',
		urls.img + 'imgs/number/7.png',
		urls.img + 'imgs/number/8.png',
		urls.img + 'imgs/number/9.png',

		urls.img + 'imgs/status2/boy/1.png',
		urls.img + 'imgs/status2/boy/2.png',
		urls.img + 'imgs/status2/boy/3.png',
		urls.img + 'imgs/status2/boy/4.png',
		urls.img + 'imgs/status2/girl/1.png',
		urls.img + 'imgs/status2/girl/2.png',
		urls.img + 'imgs/status2/girl/3.png',
		urls.img + 'imgs/status2/girl/4.png',

		urls.img + 'imgs/status3/1.png',
		urls.img + 'imgs/status3/12.png',
		urls.img + 'imgs/status3/13.png',
		urls.img + 'imgs/status3/33.png',
		urls.img + 'imgs/status3/begin.png',
		urls.img + 'imgs/status3/btn-off.png',
		urls.img + 'imgs/status3/btn-on.png',
		urls.img + 'imgs/status3/cloud.png',
		urls.img + 'imgs/status3/time.png',

		urls.img + 'imgs/status3/boy/0.png',
		urls.img + 'imgs/status3/boy/1.png',
		urls.img + 'imgs/status3/boy/2.png',
		urls.img + 'imgs/status3/boy/3.png',
		urls.img + 'imgs/status3/boy/5.png',
		urls.img + 'imgs/status3/boy/bg.png',

		urls.img + 'imgs/status3/girl/0.png',
		urls.img + 'imgs/status3/girl/1.png',
		urls.img + 'imgs/status3/girl/2.png',
		urls.img + 'imgs/status3/girl/3.png',
		urls.img + 'imgs/status3/girl/4.png',
		urls.img + 'imgs/status3/girl/bg.png',

		urls.img + 'imgs/status4/1.png',
		urls.img + 'imgs/status4/2.png',
		urls.img + 'imgs/status4/3.png',
		urls.img + 'imgs/status4/btn.png',
		urls.img + 'imgs/status4/cancel.png',
		urls.img + 'imgs/status4/coupon1.png',
		urls.img + 'imgs/status4/coupon2.png',
		urls.img + 'imgs/status4/coupon3.png',
		urls.img + 'imgs/status4/logo.png',
		urls.img + 'imgs/status4/share.png',

		'https://img04.aomygod.com/fontend/20171028/imgs/music/bgm.mp3',
		'https://img04.aomygod.com/fontend/20171028/imgs/music/boy.mp3',
		urls.img + 'imgs/music/girl.mp3'
	];
	
	
	var regs = {
		mobile: /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/,
		code: /[0-9]*/g
	}

	// 阻止页面上下滑动
	$("body").on("touchmove", function(e) {
		e.preventDefault();
	})


	var pageEvent = function() {
		this.init();
	};

	pageEvent.prototype = {
		init: function() {
			this.calcScreen();
			this.preloadFile();
			this.changeStatus();
			this.login();
			// this.shareGame();
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
			preload.on('complete', handlerComplete);
			preload.on('progress', handleOverallProgress);
			preload.on('error', handleFileError);
			preload.setMaxConnections(100);

			preload.loadManifest(manifest);
			
			function handlerComplete(e) {
				$(".for-boy").find("img").each(function(index, item) {
					$(item).attr('src', urls.img + "imgs/status2/boy/" + (index + 1) + ".png");
				})
				$(".for-girl").find("img").each(function(index, item) {
					$(item).attr('src', urls.img + "imgs/status2/girl/" + (index + 1) + ".png");
				});
				$(".voice").find("img").attr("src", urls.img + 'imgs/music-on.png');
				$(".preload-tips").hide();
				$(".container").show();
			}

			function handleOverallProgress(e) {
				$(".preload-progress").html(parseInt(preload.progress * 100));
			}

			function handleFileError(event) {
				alert(event);
				$(".preload-tips").html("error" + JSON.stringify(event));
			}
			
			
		},
		// 游戏开始
		gameBegin: function(gender) {
			var _this = this;
			var count = 0;
//			var musics = [
//				"https://img04.aomygod.com/fontend/20171028/imgs/music/boy.mp3",
//				urls.img + 'imgs/music/girl.mp3'
//			];
//			var sound2 = new Howl({
//				src: [gender == boy ? musics[0]: musics[1]]
//			});
			
			// 初始化页面
			$(".score-num img").css('bottom', '-8.74667rem');
			$(".count1").attr('src', urls.img + "imgs/number/1.png");
			$(".count2").attr('src', urls.img + "imgs/number/0.png");
			$("#status2").find("div").hide();
			$("#status3").find(".person").hide();
			$("#status3 .mask, img[name=shadow1]").hide();

			function countdown(a) {

				$(".btn").on("touchstart", function (e) {
					e.preventDefault();
					if($(".music").hasClass("off")) {
						$("audio#" + gender)[0].play();
					} else {
						$("audio#" + gender)[0].pause();
					}
					
					count++;
					if (count >= 130) {
						$(".score-num img").css('bottom', '0');
					} else {
						$(".score-num img").css('bottom', ((count * 3 - 410) / 46.875) + 'rem');
					}
					switch (true) {
						case count >= 46 && count <= 90:
							$("#status3 ." + gender + " img[name=person]").attr('src', urls.img + 'imgs/status3/' + gender + '/1.png');
							break;

						case count >= 91:
							var num = count % 2 + 2;
							if (gender == 'girl') {
								$("#status3 ." + gender + " img[name=person]").attr('src', urls.img + 'imgs/status3/girl/2.png');
							} else {
								$("#status3 ." + gender + " img[name=person]").attr('src', urls.img + 'imgs/status3/' + gender + '/' + num + '.png');
							}
							$("#status3 .mask, img[name=shadow1]").show();
							break;

						default:
							// $("#status3 img[name=person]").attr('src', 'img/status3/boy/0.png');
							break;
					}
					$(this).addClass("btn-off");
				}).on("touchend", function () {
					$(this).removeClass("btn-off");
				});
				var timer = setInterval(function () {
					a--
					if (a < 10 && a > 0) {
						$(".count1").attr('src', urls.img + "imgs/number/0.png");
						$(".count2").attr('src', urls.img + "imgs/number/" + a + ".png");
					}
					if (a <= 0) {
						// sound2.pause();
						$("audio#" + gender)[0].pause();
						$(".count2").attr('src', urls.img + "imgs/number/0.png");
						$(".btn").off("touchstart touchend");
						$(".btn").removeClass("btn-off");
						clearInterval(timer);
						setTimeout(function (e) {
							_this.calcScore(count);
						}, 1500);
					}
				}, 1000);
			}

			$(".btn-begin").on("click", handler);

			function handler() {
				console.log('begin');
				$(".btn-begin").off('click', handler);
				$(".arrow-begin").hide();
				var count = 0
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
				$("#status3 .background").find("img").attr("src", isBoy ? urls.img + "imgs/status3/boy/bg.png" : urls.img + "imgs/status3/girl/bg.png");
				if(isBoy) {
					$(".for-boy").find("img").each(function(index, item) {
						$(item).attr('src', urls.img + "imgs/status2/boy/" + (index + 1) + ".png");
					})
					$("#status2").find("div").eq(0).show();
				} else {
					$(".for-boy").find("img").each(function(index, item) {
						$(item).attr('src', urls.img + "imgs/status2/girl/" + (index + 1) + ".png");
					})
					$("#status2").find("div").eq(1).show();
				}
				setTimeout(function() {
					$("#status2").hide();
					$("#status3").show();
					if(isBoy) {
						_this.gameBegin("boy");
						$("#status3 .boy").show();
						$("#status3 .girl").hide();
					} else {
						_this.gameBegin("girl");
						$("#status3 .boy").hide();
						$("#status3 .girl").show();
					}
				}, 4000);
			});

			// play again 
			$(".play-again").on("click", function() {
				$("#status4").hide();
				$("#status1").show();
				$("#status3 .girl img[name=person]").attr('src', urls.img + 'imgs/status3/girl/0.png');
				$("#status3 .boy img[name=person]").attr('src', urls.img + 'imgs/status3/boy/0.png');
			});

			// 停止播放音乐
			$(".music").on('click', function(e) {
				e.stopPropagation();
				if($(this).hasClass("off")) {
					$(this).attr("src", urls.img + 'imgs/music-on.png');
					$("audio")[0].play();
				} else {
					$(this).attr("src", urls.img + 'imgs/music-off.png');
					$("audio").each(function(index, item) {
						item.pause();
					})
				}
				$(this).toggleClass("off");
			})
		},
		calcScore: function(score) {
			console.log(score);
			$("#status3").fadeOut();
			$("#status4").fadeIn();
			var showScore = 179 * score; // 尖叫值
			var random = parseInt(Math.random() * 100); // 产生一个有用的随机数

			// 文案
			var content = [
				"你掰狂！</br>超越俺算啥本事！</br>再努力一点，追上TA！",
				"真正的大师！</br>永远都怀着一颗学徒的心！</br>再来一次，你可以更好！",
				"狂击10秒！</br>竟无一人超越我？！</br>哎哟喂，吓死宝宝了！</br>"
			];

			var arr = [];
			// 显示尖叫值
			while(showScore > 0) {
				arr.push(showScore % 10);
				showScore = parseInt(showScore / 10);
			}
			if(arr.length < 5) {
				for(var i = arr.length; i < 5; i++) {
					arr.push(0);
				}
			}

			arr.reverse();

			var scream = $("#status4 .scream");
			for(var i = 0, len = arr.length; i < len; i++) {
				scream.find("p").eq(i).find("img").attr("src", urls.img + "imgs/number/" + arr[i] + ".png");
			}

			// 根据产品要求，分两种所谓的规则
			// 第一种情况， 参与游戏人数大于100时;
			if(rate.member_count > 100) {

				switch(true) {
					case score >= 46 && score <= 90:
						var passOver = parseInt(1.3 * score - 38.5);
						$("#status4 .score span").html(passOver + "%");
						$("#status4 .word").html(content[1]);
						if(random < 70) {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon2.png",
								"data-index": 1
							});
						} else {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon1.png",
								"data-index": 0
							});
						}
						break;

					case score >= 91:
						var passOver = score > 135 ? 99 : parseInt(0.4 * score + 44);
						$("#status4 .score span").html(passOver + "%");
						$("#status4 .word").html(content[2]);
						if(random < 95) {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon2.png",
								"data-index": 1
							});
						} else {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon3.png",
								"data-index": 2
							});
						}
						break;

					default:
						var passOver = parseInt(0.4 * score);
						$("#status4 .score span").html(passOver + "%");
						$("#status4 .word").html(content[0]);
						if(random < 80) {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon1.png",
								"data-index": 0
							});
						} else {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon2.png",
								"data-index": 1
							});
						}
						break;
				}
			} else {
				// 第二种情况，参与游戏人数小于100时

				switch(true) {
					case score >= 40 && score <= 80:
						var passOver = parseInt(1.5 * score - 40);
						$("#status4 .score span").html(passOver + "%");
						$("#status4 .word").html(content[1]);
						if(random < 70) {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon2.png",
								"data-index": 1
							});
						} else {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon1.png",
								"data-index": 0
							});
						}
						break;

					case score >= 81:
						var passOver = score > 135 ? 99 : parseInt(0.36 * score + 51.2);
						$("#status4 .score span").html(passOver + "%");
						$("#status4 .word").html(content[2]);
						if(random < 88) {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon2.png",
								"data-index": 1
							});
						} else {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon3.png",
								"data-index": 2
							});
						}
						break;

					default:
						var passOver = parseInt(0.5 * score);
						$("#status4 .score span").html(passOver + "%");
						$("#status4 .word").html(content[0]);
						if(random < 80) {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon1.png",
								"data-index": 0
							});
						} else {
							$("#status4 .btn-coupon").attr({
								"src": urls.img + "imgs/status4/coupon2.png",
								"data-index": 1
							});
						}
						break;
				}
			}
		},
		// 领券
		login: function() {
			var _this = this;
			var couponId;

			$("body").on('click', ".btn-coupon", function(e) {
				e.stopPropagation();
				var $this = this;
				couponId = $(this).data("index");
				var _nick = getCookie("_nick");
				if(!_nick) {
					$(".outside-mask").show();
				} else {
					_this.setActivity();
					_this.getCoupon(couponId);
				}

			}).on('click', ".get-coupon", function(e) {
				e.stopPropagation();
				var phone = $("input[name=phone]").val();
				var code = $("input[name=code]").val();

				if(!regs.mobile.test(phone)) {
					console.log('请输入正确的手机号码');
				} else if(!regs.code.test(code) || code.length != 6) {
					console.log('请输入正确的验证码');
				} else {
					$.ajax({
						url: urls.autoLogin,
						type: "get",
						dataType: "jsonp",
						jsonp: "callback",
						async: false,
						data: {
							mobile: phone,
							code: code,
							tagId: '',
							activeId: '20171111screamgame'
						},
						success: function(e) {
							if(e.error == 0) {
								_this.setActivity();
								_this.getCoupon(couponId);
							} else {
								console.log('自动登录注册失败');
							}
						}
					})

				}
			}).on('click', ".close", function(e) {
				e.stopPropagation();
				$(".outside-mask").hide();
			});
			
			$(".get-code").on('click', function (e) {
				e.stopPropagation();
				var $this = $(this);
				var phone = $("input[name=phone]").val();
				var isSend = $(this).data("send");
				if (!regs.mobile.test(phone)) {
					Dialog.tips('请输入正确的手机号码');
				} else {

					if(isSend == 1) {
						$.ajax({
							url: urls.code,
							type: "get",
							dataType: "jsonp",
							jsonp: "callback",
							async: false,
							data: {
								mobile: phone
							},
							success: function (e) {
								if (e.error == 0) {
									Dialog.tips('验证码已发送，请注意查收');
									countTime(60);
									$this.data("send", "0");
								} else {
									Dialog.tips(e.msg);
								}
							}
						})
					} else {
						Dialog.tips('请稍后再试');
					}
					
				}
			});

			function countTime(time) {
				$(".get-code").html(time + "s");
				var timer = setInterval(function() {
					$(".get-code").html(time + "s");
					time--;
					if(time < 0) {
						clearInterval(timer);
						$(".get-code").html("获取验证码");
					}
				}, 1000);
			}	
		},
		// 领取优惠券
		getCoupon: function(e) {
			var _this = this;

			$.ajax({
				url: urls.getCoupon,
				type: "get",
				dataType: "jsonp",
				jsonp: "callback",
				async: false,
				data: {
					coupon_id: rate.coupons[e].coupon_id
				},
				success: function(e) {
					if(e.code == 0) {
						alert(e.msg);
						setTimeout(function() {
							$(".outside-mask").hide();
						}, 1000);
					} else {
						alert(e.msg);
					}
				}
			});
		},
		// 打标签
		setActivity: function() {
			$.ajax({
				url: urls.setActivityId + "/20171111screamgame",
				type: "get",
				dataType: "jsonp",
				jsonp: "callback",
				async: false,
				data: {
					active_id: "20171111screamgame",
					token: ""
				},
				success: function(e) {
					if(e.code == 0) {
						console.log('打标签成功');
					}
				}
			});
		},
		shareGame: function() {
			var _this = this;

			var options = {
				'initAppShareOption': {
					'sharedURL': "https://m.aomygod.com/Activitycommon/scream",
					'sharedImageURL': '',
					'sharedTitle': "",
					'shareSummary': ""
				},
				'publicHeaderOption': {
					'sharedImageURL': '',
					'sharedTitle': "",
					'shareSummary': ""
				}
			};

			function initWxShare() {
				var self = this;
				wx.ready(function() {
					var title = options.initAppShareOption.sharedTitle;
					var desc = options.initAppShareOption.shareSummary;
					var url = options.initAppShareOption.sharedURL;
					var imgUrl = options.initAppShareOption.sharedImageURL;
					//朋友圈
					wx.onMenuShareTimeline({
						title: title,
						link: url,
						imgUrl: imgUrl,
						success: function() {
							Dialog.tips('分享朋友圈成功!');
						},
						cancel: function() {
							Dialog.tips('分享朋友圈失败!');
						}
					});
					//发送给朋友
					wx.onMenuShareAppMessage({
						title: title,
						desc: desc,
						link: url,
						imgUrl: imgUrl,
						success: function() {
							Dialog.tips('分享给朋友成功!');
						},
						cancel: function() {
							Dialog.tips('分享给朋友失败!');
						}
					});
					wx.onMenuShareWeibo({
						title: title,
						desc: desc,
						link: url,
						imgUrl: imgUrl,
						success: function() {
							Dialog.tips('分享微博成功!');
						},
						cancel: function() {
							Dialog.tips('分享微博失败!');
						}
					});
					//分享到腾讯QQ
					wx.onMenuShareQQ({
						title: title,
						desc: desc,
						link: url,
						imgUrl: imgUrl,
						success: function() {
							Dialog.tips('分享腾讯QQ成功!');
						},
						cancel: function() {
							Dialog.tips('分享腾讯QQ失败!');
						}
					});
					//分享到腾讯QQ空间
					wx.onMenuShareQZone({
						title: title,
						desc: desc,
						link: url,
						imgUrl: imgUrl,
						success: function() {
							Dialog.tips('分享QQ空间成功!');
						},
						cancel: function() {
							Dialog.tips('分享QQ空间失败!');
						}
					});
				});

			};

			if(BrowserUtil.isWeixin()) {
				initWxShare();
			}
		}
	}

	new pageEvent();
});