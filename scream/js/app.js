require.config({
    baseUrl: './js',
    paths: {
        'jquery': 'jquery.min',
        'Swiper': '//s1.aomygodstatic.com/lib/Swiper/swiper.min',
    },
    shim: {
        'Swiper': {
            exports: 'Swiper'
        }
    }
});


