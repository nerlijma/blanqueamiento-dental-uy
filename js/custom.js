$(document).ready(function () {
    //ajuste visual bullets sliders
    $('.swiper-pagination-bullet').html('');


});

/*slider steps*/
var swiper2 = new Swiper('.swiper-container_promos', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    autoplay: {
        delay: 3000,
    },
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 4,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
});

//start steps slider
$(window).scroll(function () {
    $steps_offset = $('#target_steps').offset();
    $doc_position = $(document).scrollTop();
    if ($doc_position => $steps_offset) {
        swiper2.autoplay.start();
    }
});