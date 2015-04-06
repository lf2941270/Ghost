/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $('.post-content img').showBigPic();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };

    //鼠标点击显示大图片
    $.fn.showBigPic = function (options) {
        var defaults = {
            elem: $(this),
        };
        var opts = $.extend(defaults, options);
        function showPic(src){
            $('#imageModal').modal('show').find('img').bind('load',function () {
                var naturalWidth = $(this)[0].naturalWidth + 32;
                var maxWidth = $(window).width() - 40;
                naturalWidth = naturalWidth > maxWidth ? maxWidth : naturalWidth;
                $('#imageModal').find('.modal-dialog').width(naturalWidth);
                $(this).show().siblings('.loading').hide();
            }).attr('src', src);
        }
        opts.elem.hover(function(){

        });
        opts.elem.click(function() {
            var $this = $(this);
            var src = $this.attr('src');
            showPic(src);
        });


    }
})(jQuery);
