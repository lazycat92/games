require.config({
    baseUrl: './js',
    paths: {
        'jquery': 'jquery.min',
        'Swiper': 'Swiper/swiper.min',
        'Preload': 'PreloadJS-0.6.2/lib/preloadjs-0.6.2.min'
    },
    shim: {
        'Swiper': {
            exports: 'Swiper'
        }
    }
});


