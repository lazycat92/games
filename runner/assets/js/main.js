var baseUrl=baseUrl||"./assets/js/";
require.config({
    //测试防止js文件缓存
    //urlArgs: "bust=" +  (new Date()).getTime(),
    /*模块依赖配置*/
    baseUrl:baseUrl,
	
	/*模块路径配置*/
    paths: {

		"jquery": "jquery",
		 "exif-js":"exif",
		 "tomLib":"tom.Lib",
	
	
		"hammer":"Hammer/hammer.min",
		"hammer.fake":"Hammer/hammer.fakemultitouch",
		"hammer.showtouch":"Hammer/hammer.showtouches",
		"tomPlugin":"plugins/tom-jqplugins",
	
		"megapix-image":"megapix-image",

    } 
});
