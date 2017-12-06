require.config({
    urlArgs: "bust=" +  (new Date()).getTime(),
    baseUrl: './js',
    paths: {
        'jquery': 'jquery',
        'cropper': 'cropper/cropper'
    },
    shim: {
        'Swiper': {
            exports: 'Swiper'
        }
    }
});
