// ON DOCUMENT READY
jQuery(document).ready(function(){
     
    // INPUT PLACEHOLDER FOR OLD BROWSERS
	jQuery('input, textarea').placeholder({ customClass: 'placeholder-ie' });
    
    //FITVIDS
    //jQuery('.text').fitVids();
    
    wow_offset = 80;
    if(jQuery(window).width() < 500) wow_offset = 30;
    
    jQuery('.sized-image, .btn').not('.not-wow, .not-wow *, .header .btn').addClass('wow fadeIn');
    jQuery('.sized-image, .btn').not('.not-wow, .not-wow *, .header .btn').attr({'data-wow-delay':'0s', 'data-wow-offset':wow_offset, 'data-wow-duration':'0.6s'});
    
    jQuery('h1, h2, h3, h4, h5, h6, p, input, textarea, .text li, .text img, video').not('#menu-bar *, .not-wow *, .not-wow').addClass('wow fadeIn');
    jQuery('h1, h2, h3, h4, h5, h6, p, input, textarea, .text li, .text img, video').not('#menu-bar *, .not-wow *, .not-wow').attr({'data-wow-delay':'0s', 'data-wow-offset':wow_offset, 'data-wow-duration':'0.6s'});
    
    jQuery('#popup-newsletter').addClass('wow fadeInUp');
    jQuery('#popup-newsletter').attr({'data-wow-delay':'1s', 'data-wow-offset':0, 'data-wow-duration':'0.6s'});
    
    
    var wow = new WOW({
        animateClass: 'animated',
        //offset:       -100,
        callback: function(box) {            
            //if(jQuery(box).hasClass('wow-video')) start_video(box);
        }
    });
    wow.init();
    
    
    //BR MOBILE IN TITLES
    jQuery('h1, h2, h3, h4, h5, h6, .banner-module p').find('br').replaceWith('<span class="br"> </span>');
    
    
    //OPEN CLOSE MENU
    jQuery('.menu-toggle').on('click', function(e){
        e.preventDefault();
        jQuery('html, body').animate({scrollTop : 0},200);
        setTimeout(function(){
            jQuery('.menu-toggle').toggleClass('active');
            
            if(jQuery('#menu-bar').hasClass('active')){
                var i=0;
                var time = 0;
                if(jQuery(window).width() > 767) menu_li = '#main-menu li'; else menu_li = '#mobile-menu li';
                jQuery(menu_li+', #menu-bar .anim').not('.sub-menu li').each(function(){
                    _this[i] = jQuery(this);
                    setTimeout(function(){
                        jQuery(_this[i]).addClass('menu-item-leave');
                        jQuery(_this[i]).removeClass('menu-item-arrive');
                        i--;
                    },time);
                    i++;
                    time += 30;
                });
                
                i--;
                
                time += 200;
                
                jQuery('#main-menu .active, #mobile-menu .active').not('.current-menu-parent, .current-menu-parent .active').removeClass('active');
                setTimeout(function(){jQuery('#main-menu, #mobile-menu').animate({'opacity':0},300);},time);
                setTimeout(function(){
                    jQuery('#menu-bar').removeClass('active');
                    jQuery('#menu-images').removeClass('active');
                },time+100);
                //setTimeout(function(){jQuery('#overlay').fadeOut(400);},time+100);
                setTimeout(function(){jQuery('.header').removeClass('active');},time+200);
                setTimeout(enableScroll, time+600);
                //setTimeout(function(){scroll_menu.refresh(); scroll_menu.scrollTo(0,0)}, time + 300);
                
                if(jQuery('#mobile-menu .current-menu-parent').find('.sub-menu').length < 1 && jQuery('#mobile-menu .sub-menu').hasClass('active')){
                    jQuery('#mobile-menu .sub-menu').removeClass('active');
                    //scroll_menu.scrollTo(0,0)
                }
                active_submenu = '';
            }else{
                
                if(jQuery('#main-menu .parent_menu .current-menu-parent').length > 0){
                    jQuery('#main-menu .parent_menu .current-menu-parent a').mouseenter();
                }

                jQuery('#menu-bar').addClass('active');
                jQuery('#menu-images').addClass('active');
                jQuery('.header').addClass('active');
                jQuery('#main-menu, #mobile-menu').animate({'opacity':1},100);
                setTimeout(disableScroll, 100);
                jQuery('#menu-bar li, #menu-bar .anim').removeClass('menu-item-leave');
                //jQuery('#overlay').fadeIn(400);
                var i=0;
                var time = 100;
                _this = new Array();
                
                if(jQuery(window).width() > 767) menu_li = '#main-menu li'; else menu_li = '#mobile-menu li';
                jQuery(menu_li+', #menu-bar .anim').not('.sub-menu li').each(function(){
                    _this[i] = jQuery(this);
                    setTimeout(function(){
                        jQuery(_this[i]).addClass('menu-item-arrive');
                        i++;
                        
                    },time);
                    i++;
                    time += 30;
                });
                i=0;                                
                
                time += 200;
                //setTimeout(function(){scroll_menu.refresh();}, time);
            }
        },200)
    });
    
    /*jQuery('#overlay').click(function(){
        if(jQuery('#menu-toggle').hasClass('active')) jQuery('#menu-toggle').click();
    });*/
            
    
    //DESKTOP MENU
    var active_submenu = '';
    var active_hover_img = '';
    jQuery('#main-menu .parent_menu li a, .lore-link').on('mouseenter', function(){
        if(active_submenu == jQuery(this).parent().attr('data-id')) return;        
        active_submenu = jQuery(this).parent().attr('data-id'); 
        
        jQuery('#main-menu .sub-menu.active').removeClass('active').fadeOut(300);
        if(jQuery('#main-menu .sub-menu[data-id="'+active_submenu+'"]').length > 0){
            jQuery('#main-menu .col2').addClass('active');   
            jQuery('#main-menu .sub-menu[data-id="'+active_submenu+'"]').addClass('active').fadeIn(300);
        }        
    })
    jQuery('#main-menu').on('mouseleave', function(){
        jQuery('#main-menu .col2.active').removeClass('active');
        jQuery('#main-menu .sub-menu.active').removeClass('active').fadeOut(300);
        jQuery('#menu-images .hover_img.active').removeClass('active').fadeOut(300);
        if(jQuery('#menu-images .default_menu_img').hasClass('hide')) jQuery('#menu-images .default_menu_img').removeClass('hide').fadeIn(300);        
        active_submenu = '';
        active_hover_img = '';
    })
    jQuery('#main-menu a').on('mouseenter', function(){
        if(jQuery(this).parent().attr('data-hover-img') == active_hover_img) return;
        
        if(!jQuery('#menu-images .default_menu_img').hasClass('hide') && active_hover_img) jQuery('#menu-images .default_menu_img').addClass('hide').fadeOut(300);
        
        if(jQuery(this).parent().attr('data-hover-img')){
            active_hover_img = jQuery(this).parent().attr('data-hover-img');
            jQuery('#menu-images .hover_img.active').removeClass('active').fadeOut(300);
            jQuery('#menu-images .hover_img[data-hover-img="'+active_hover_img+'"]').addClass('active').fadeIn(300);
        }else{
            
        }
    })
    
    
    jQuery('#main-menu a').on('mouseenter', function(){        
        if(!jQuery(this).closest('li').is('.current-menu-item, .current-menu-parent')){
            jQuery(this).closest('.col').find('.current-menu-item, .current-menu-parent').addClass('force-white');
        }else{
            jQuery(this).closest('.col').find('.force-white').removeClass('force-white');
        }        
    })
    
    jQuery('#main-menu .col1').on('mouseleave', function(){        
        jQuery('#main-menu .col1 .force-white').removeClass('force-white');
    })
    jQuery('#main-menu .col2').on('mouseleave', function(){        
        jQuery('#main-menu .col2 .force-white').removeClass('force-white');
    })
    
    /*jQuery('#main-menu .col2').on('mouseenter', function(){   
        jQuery('#main-menu .col2 .current-menu-item, #main-menu .col2 .current-menu-parent').addClass('force-white');
    })
    
    jQuery('#main-menu .col2').on('mouseleave', function(){        
        jQuery('#main-menu .col2 .current-menu-item, #main-menu .col2 .current-menu-parent').removeClass('force-white');
    })*/
    
    
    //SUBMENU MOBILE MENU
    jQuery('#mobile-menu .menu-item-has-children > a').on('click', function(e){
        if(jQuery(window).width() < 768){
            e.preventDefault();            
            jQuery(this).parent().toggleClass('active');
            jQuery(this).parent().find('.sub-menu').toggleClass('active');
            //setTimeout(function(){scroll_menu.refresh()}, 400);   
        }        
    })
    
    if(jQuery('#mobile-menu .current-menu-parent').find('.sub-menu').length > 0){
         jQuery('#mobile-menu .current-menu-parent').find('.sub-menu').addClass('active');
    }
    
            
    //MENU ISCROLL    
    //scroll_menu = new IScroll('#menu-wrapper', {click : true, scrollbars: false, mouseWheel:true, keyBindings:true});   
    
    
    //CENTERED SWIPERS
    /*if(jQuery('.centered-swiper').length > 0){
        var centered_swipers = [];
        var ics = 1;
        
        jQuery('.centered-swiper').each(function(){
            jQuery(this).attr('id', 'centered_swiper_' + ics);
            jQuery(this).attr('data-num-swiper', ics);
            
            centered_swipers[ics] =  new Swiper ('#centered_swiper_' + ics, {
                loop: false,
                autoplay: 0,
                speed: 1000,
                keyboardControl: false,
                slidesPerView: 'auto',
                freeMode: true,
            })
            ics++;
        })
        
        
        function center_swiper(){
            //return false;
            jQuery('.centered-swiper').each(function(){                            
                id_swiper = jQuery(this).attr('id');
                num_swiper = jQuery(this).attr('data-num-swiper');
                
                swiper_w = 0;
                jQuery(this).find('.swiper-slide').each(function(){
                    swiper_w += jQuery(this).outerWidth();
                });

                if(swiper_w > jQuery(window).width()) swiper_w = jQuery(window).width();

                jQuery(this).css('width', swiper_w + 'px');
                centered_swipers[num_swiper].update();
            });
        }; center_swiper();
        
        my_images1 = jQuery('.centered-swiper img');
        load_counter1 = 0;
        jQuery.each(my_images1, function(i, item) {
            jQuery(item).load(function() {
                load_counter1 ++;
                if (load_counter1 == my_images1.length) {
                    center_swiper();                    
                }
            })
        })
    }*/

                
    
    //SIZED IMAGES
    function sized_images(){
        jQuery('.sized-image').each(function(){
            ratio = jQuery(this).attr('data-ratio');
            img_w = jQuery(this).width();
            jQuery(this).css('height', img_w / ratio);
        });
    }; sized_images();
        
    
    // COLUMNS WITH SAME HEIGHT
    function same_height_col(){        
        jQuery('.same-height .col').css('height', '100%');        
        jQuery('.same-height').each(function(){
            if(jQuery(this).find('.col').length < 1) return true;
            var max_h = 0;
            var line_y = jQuery(this).find('.col').first().offset().top;
            var line_y_last = jQuery(this).find('.col').last().offset().top;
            jQuery(this).find('.col').each(function(){
                if(jQuery(this).offset().top > line_y){
                    jQuery(this).closest('.same-height').find('.col.calculate').css('height', max_h + 'px');
                    jQuery(this).closest('.same-height').find('.col.calculate').removeClass('calculate');
                    max_h = 0;
                }
                
                line_y = jQuery(this).offset().top;
                
                if(jQuery(this).outerHeight() > max_h)
                    max_h = jQuery(this).outerHeight();
                
                jQuery(this).addClass('calculate');
            });
            
            jQuery(this).find('.calculate').css('height', max_h + 'px').removeClass('calculate');
            
        });
        
        jQuery('.same-height-old .col').css('height', '100%');
        //if(jQuery(window).width() < 500) return;
        jQuery('.same-height-old').each(function(){
            var max_h = 0;
            jQuery(this).find('.col').each(function(){
                if(jQuery(this).outerHeight() > max_h)
                    max_h = jQuery(this).outerHeight();
            });            
            jQuery(this).find('.col').css('height', max_h + 'px');
        });
    } same_height_col();        
    
    my_images2 = jQuery('.same-height img');
    load_counter2 = 0;
    jQuery.each(my_images2, function(i, item) {
        jQuery(item).load(function() {
            load_counter2 ++;
            if (load_counter2 == my_images2.length) {
                same_height_col();
            }
        })
    })
    
                
    //READ MORE
    /*jQuery.fn.almComplete = function(){      
        sized_images();
        same_height_col();
    };*/
    
    
    //HEADER BANNER SCROLL DOWN
    jQuery('#header_banner').on('click', function(){
        win_h = jQuery(window).height();
        jQuery('html, body').animate({scrollTop : win_h}, 'slow');
    })
    
    //ADD SPAN TO BUTTONS
    jQuery('.btn, .gold-small-box').wrapInner('<div class="inner-content"></div>').prepend('<div class="inner-box"></div>');        
    
    
    //FIX TO
    jQuery('.fix-to-top').fixTo('body', {useNativeSticky:false, top: 0, fixToBottom: false});
    
        
    
    //BANNER MODULE SCROLL DOWN
    /*jQuery('.banner-100-scroll-down-btn').on('click', function(){
        win_h = jQuery(window).height();
        jQuery('html, body').animate({scrollTop : win_h}, 'slow');
        
    })*/
       
    
    //BANNER MODULE SWIPER
    if(jQuery('.banner-module .swiper-container').length > 0){
        var banner_swipers = [];
        jQuery('.banner-module .swiper-container').each(function(){
            id_swiper = jQuery(this).attr('id');
            banner_swipers[id_swiper] = new Swiper ('#'+id_swiper, {
                loop: true,                
                speed: 800,
                autoplay: 4000,                
                autoplayDisableOnInteraction: false,                                                
                pagination: '', //'.swiper-pagination',
                paginationClickable: false,
                effect: 'fade',
                fade: {
                  crossFade: true
                }
            })          
        })
    }
    
        
    //HEADER VIDEO
    if (typeof header_video !== 'undefined' && jQuery.isFunction(header_video)) header_video();
       
    
            
    //IMAGES MODULE BANNER
    if(jQuery('.images-module').length > 0){
        var images_swipers = [];
        jQuery('.images-module .swiper-container').not('.production-images-module .swiper-container').each(function(){
            id_swiper = jQuery(this).attr('id');
            images_swipers[id_swiper] = new Swiper ('#'+id_swiper, {
                loop: true,                
                speed: 600,
                autoplay: 0,                
                autoplayDisableOnInteraction: false,                                                
                nextButton: '#'+id_swiper+' .images-button-next',
                prevButton: '#'+id_swiper+' .images-button-prev',                
            })          
        })
    }
          
    
    //SHORTCODE P FIX
    jQuery('.shortcode_div').each(function(){
        jQuery(this).prev('p').remove();
        jQuery(this).next('p').remove();        
    })
        
    
    
    //BOXES MODULE LOAD MORE (ACCORDION)
    jQuery( ".boxes-module .hidden_boxes" ).accordion({        
        collapsible: true,
        active: false,
        heightStyle: "content",
    });
    
    jQuery('.boxes-module .load-more-btn').on('click', function(e){
        e.preventDefault();    
        var _this = jQuery(this);
        if(jQuery(this).closest('.boxes-module').find('.hidden_boxes .ui-accordion-content-active').length > 0){               
            jQuery(this).closest('.boxes-module').find('.hidden_boxes').accordion({active: false});
            jQuery(this).find('.inner-content').html('Load More');            
        }else{            
            jQuery(this).closest('.boxes-module').find('.hidden_boxes').accordion({active: 0});
            setTimeout(function(){jQuery(_this).remove(); /*.find('.inner-content').html('Hide');*/},500);
            sized_images();
        }
    })
    
    
    //BOXES MODULE MASONRY
    if(jQuery('.boxes-2-columns').length > 0){
        var $grid = jQuery('.boxes-2-columns').masonry({      
            itemSelector: '.box',
            columnWidth: '.grid-sizer',
            percentPosition: true,
        });
        
        my_images1 = jQuery('.boxes-2-columns img');
        load_counter1 = 0;
        jQuery.each(my_images1, function(i, item) {
            jQuery(item).load(function() {
                load_counter1 ++;
                $grid.masonry();
                if (load_counter1 == my_images1.length) {
                    
                }
            })
        })
    }   
        
    
    
    //SERVICES TABLE SCROLL
    if(jQuery('.services-table').length > 0){
        //var services_scrolls = new Array();
        var i = 0; 
        jQuery('.services-table').each(function(){
            if(jQuery(this).find('.scroll_table').length < 1) return true;
            id_scroll = jQuery(this).find('.scroll_table').attr('id');
            //services_scrolls[i] = new IScroll('#'+id_scroll, { scrollX: true, scrollY: false, mouseWheel: true });
            i++;           
        });
    }    
    
    
    //POPUP    
    //var scroll_popup = new IScroll('#popup-wrapper', {click : true, scrollbars: false, mouseWheel:true, keyBindings:true});           
    
    
    //VACANCIES POPUP
    jQuery('.vacancies-module .box').on('click', function(e){
        e.preventDefault();
        
        temp_html = jQuery(this).closest('.box').find('.hidden').html();
        jQuery('#popup_content').html(temp_html);
        /*setTimeout(function(){
            scroll_popup.refresh();  
        }, 400);*/
        
        //disableScroll();
        jQuery('#popup').fadeIn(600).addClass('active');        
        sized_images();
        same_height_col();
    })
    
    jQuery('#popup .close-popup').on('click', function(e){        //.btn[href="#close-popup        
        e.preventDefault();
        jQuery('#popup').fadeOut(500).removeClass('active');
        
        setTimeout(function(){            
            jQuery('#popup_content').html('');
            //scroll_popup.scrollTo(0,0);            
            //enableScroll();
        }, 600);        
    })
    
    
    //NEWSLETTER POPUP
    jQuery('#popup-newsletter .close-popup').on('click', function(e){
        e.preventDefault();
        jQuery('#popup-newsletter').fadeOut(500); 
    })
    
    
	// ON SCROLL
    jQuery(window).on('scroll', function(){                                       
        
        clearTimeout(jQuery.data(this, 'scrollTimer'));
        jQuery.data(this, 'scrollTimer', setTimeout(function() {
            //when scroll ends                           
        }, 200));
    });
    
    
    // ON RESIZE
    var doit;
    var old_w = jQuery(window).width();
    var new_w = '';
	window.onresize = function(){
        new_w = jQuery(window).width();
        if(old_w == new_w) return false;
        
	  	clearTimeout(doit);
	  	doit = setTimeout(resizedw, 300);
	};
	
	function resizedw(){
        // on resize ends        
        sized_images();
        same_height_col();
        
        //if(jQuery('.centered-swiper').length > 0) center_swiper();
        if(jQuery('.menu-toggle').first().hasClass('active')) jQuery('.menu-toggle').first().click();                  
	}
    
    jQuery(window).on( "orientationchange", function( event ) {
        resizedw();
    });
    
    jQuery('.home #header_banner img').css('opacity', 0);
    
    jQuery(window).load(function(){        
       
        //PARALLAX ON HOVER
        var boxes_parallax_frame = new Array();
        var i = 0;
        jQuery('.paral').each(function(){                        
            var scene = jQuery(this).get(0);            
            boxes_parallax_frame[i] = new Parallax(scene,{
                selector: '.layer',                
                invertY : false,
                scalarX: 80,
                scalarY: 40,
                frictionX: 0.05,
                frictionY: 0.01,                
                pointerEvents: true,
            });
            i++;
        });  
        
        //PARALLAX ON HOVER INSTAGRAM
        var instagram_parallax = new Array();
        var i = 0;
        jQuery('.instagram-module .sbi_photo_wrap').attr('data-depth', '-0.1');
        jQuery('.instagram-module .sbi_type_image').each(function(){                        
            var scene = jQuery(this).get(0);            
            instagram_parallax[i] = new Parallax(scene,{
                selector: '.sbi_photo_wrap',
                invertY : false,
                scalarX: 80,
                scalarY: 40,
                frictionX: 0.05,
                frictionY: 0.01,                
                pointerEvents: true,
                hoverOnly: true,
            });
            i++;
        });                         

        
        //PARALLAX 
        if(!isMobile && jQuery(window).height() > 600){
            jQuery(window).stellar({
                horizontalScrolling: false,
                horizontalOffset: 0,
                parallaxBackgrounds: false,
                hideDistantElements: false,
                responsive: true,
            });
        }
        
        if(jQuery('.boxes-2-columns').length > 0) $grid.masonry();
        
        setTimeout(function(){
            jQuery('.home #header_banner img').animate({'opacity' : 1}, 400);   
        }, 500);
    })
    
});



// ENABLE DISABLE SCROLL
function disableScroll() {    
    jQuery(window).lockscroll(true);
}

function enableScroll() {    
    jQuery(window).lockscroll(false);
}

