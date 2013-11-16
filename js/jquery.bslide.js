/**
 * bSlide
 * https://github.com/0x49464D/bSlide
 *
 * Copyright 2013 Israel Flores Morató
 * Released under the MIT license
 *
 */

$(function(){
    /**
     * bSlide jQuery plugin
     *
     * @param options Options of the plugin.
     * @returns {*}
     */
    $.fn.bSlide = function(options){

        var settings = $.extend({
            top: $(this).position().top,
            left: $(this).position().left,
            width: $(this).outerWidth(),
            height: $(this).outerHeight(),
            zindex: parseInt($(this).css('zindex') ? $(this).css('zindex') : '0') - 1,
            borderradius: $(this).css('border-radius'),
            opacity: 1,
            class: 'bslide-class',

            delay: 5000,
            repeat: false,
//            scale: true,
//            ratio: true,
        }, options);

        function setBackground(target, image, repeat, scale, ratio)
        {
            repeat = repeat || false;
            scale = scale || false;
            ratio = ratio || false;

            target.css('background', 'url(' + image + ') ' + (repeat ? 'repeat' : 'no-repeat'));
            target.css('background-size', '100%');
        }

        return this.each(function(){
            var images = $(this).find('images'),
                list = [],
                i=0;

            /* hide images tag */
            images.hide();

            /* load images */
            images.find('li').each(function(key,val){
                var image = $(val).html();
                /* add image to the list */
                list.push(image);
                /* load image file */
                $('<img/>').prop('src', image).load();
            });

            /* add 'position: absolute' */
            $(this).css('position', 'absolute');

            /* create the background div */
            var div = $('<div/>', {class: settings.class}).appendTo('body');

            /* some style for the background div */
            div.css({
                'position': 'absolute',
                'top': settings.top,
                'left': settings.left,
                'width': settings.width,
                'height': settings.height,
                'z-index': settings.zindex,
                'border-radius': settings.borderradius,
                'opacity': settings.opacity
            });

            setBackground(div, list[i]);

            setInterval(function(){
                i = ( i < (list.length - 1) ) ? ++i : 0;
                div.hide();
                setBackground(div, list[i]);
                div.fadeIn(1000);
            }, settings.delay);
        });
    };
}(jQuery));