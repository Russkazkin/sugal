jQuery(document).ready(function ($) {
    $('.sugal-gallery-thumb').on('click', function () {
        let anchor = 'anchor-' + $(this).parent().data('page-id'),
        anchor_name = 'a[name=' + anchor +']';
        if( $(this).siblings('.sugal-gallery-item-wrap').length && $(this).parent().hasClass('sugal-gallery-thumb-active')){
            console.log('Обнаружена открытая галерея! Скрываем...');
            $(this).next().slideToggle();
            $('.sugal-gallery-thumb-active').removeClass('sugal-gallery-thumb-active');
        }else if($(this).siblings('.sugal-gallery-item-wrap').length) {
            $('.sugal-gallery-thumb-active .sugal-gallery-item-wrap').slideToggle();
            console.log('Обнаружена скрытая галерея! Открываем...');
            $(this).parent().addClass('sugal-gallery-thumb-active');
            $(this).next().slideToggle();
            const target = $(anchor_name).offset().top;
            $('html, body').animate({scrollTop: target}, 700);
        }else{
            $('.sugal-gallery-item-wrap').remove();
            $('.sugal-gallery-thumb-active .sugal-gallery-item-wrap').slideToggle();
            $('.sugal-gallery-thumb-active').removeClass('sugal-gallery-thumb-active');
            console.log('Создание новой галереи...');
            $(this).parent().addClass('sugal-gallery-thumb-active');
            $(this).parent().append(
                '<div class="sugal-gallery-item-wrap">' +
                '<a name="' + anchor + '"></a>' +
                '<div class="sugal-gallery-item-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"/></svg></div>' +
                '<div class="sugal-gallery-item">' +
                '<div class="sugal-gallery-item-loader">' +
                '<div class="sugal-gallery-item-loader-icon"><i class="fas fa-spinner fa-pulse"></i></div>' +
                '<div class="sugal-gallery-item-loader-text">loading...</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            $('.sugal-gallery-item-close').on('click', function () {
                console.log('Обнаружена открытая галерея! Скрываем...');
                $(this).parent().slideToggle();
                $('.sugal-gallery-thumb-active').removeClass('sugal-gallery-thumb-active');
            });
            const target = $(anchor_name).offset().top;
            $('html, body').animate({scrollTop: target}, 700);
            let data = {
                action: 'get_sugal',
                page: $(this).parent().data('page-id')
            },
                $that = this;
            $.post(window.wp_data.ajax_url, data, function (response) {
                let item = $($that).next().children('.sugal-gallery-item');
                // console.log(item);
                $('.sugal-gallery-item-loader').remove();
                item.append('<div class="sugal-gallery-item-slider-wrap">' +
                    '<div class="sugal-gallery-item-slider" data-auto="false" data-nav="thumbs" data-allowfullscreen="true">' +
                    '</div>' +
                    '</div>');
                let images = $.makeArray(response.sugal.images);
                $.each(images, function (index, value) {
                    $('.sugal-gallery-item-slider').append(
                        '<a href="' + value + '" title="IMAGE ' + index + '"></a>'
                    )
                });
                item.append(
                    '<div class="sugal-gallery-item-content-wrap">' +
                    '<div class="sugal-gallery-item-content">' + 
                    '<div class="sugal-gallery-item-content-text">' + response.sugal.description +'</div>' +
                    '<div><a class="sugal-gallery-item-button" href="/">More...</a></div>' +
                    '</div>'
                );
                $('.sugal-gallery-item-slider').fotorama();
            }, 'json');
        }
    });
});