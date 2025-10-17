
function closeAlerts() {
	$('.JQalertsFader').hide();
}
$(function(){
	
	
	
	// start of simple alert fader
	var alertHover = false;
	var alertInit = true;
	var alertCount = 0;
	alertCycler();

	function alertCycler(){
		var fadeSpeed = 2000;
		if(alertInit) {
			alertInit = false;
			alertCount = $('.JQalertsFader:visible div.alert').length;
			
			// sync up the heights of the alerts to the tallest one
			var maxHeight = 0;
			$('div.JQalertsFader div.alert').each(function () {
				//console.log('alert is ' + $(this).height() + ' pixels high');
				if ($(this).height() &gt; maxHeight) {
					maxHeight = $(this).height();
				}
			});
			//console.log('max alert height is ' + maxHeight);
			$('div.alert').css("height",maxHeight+'px');
			
			// isolate the visible divs of class alert and mark the first one
			//  (restricting to only visible adds support for duplicated alerts block)
			//$('.JQalertsFader div.alert:visible:first').addClass('current-alert');
			$('.JQalertsFader div.alert:first').addClass('current-alert');
			
			if(alertCount &gt; 1) {
				setTimeout(alertCycler, 6000);
				return;
			}
			
		}
		if (!$('.JQalertsFader:visible').is(':visible')) {
			return;
		}
		if(!alertHover) {
			// the current alert is the one marked with class current-alert
			//  but is also visible
			var current = $('div.alert.current-alert:visible');
			var next;
			if (current.next().length) {
				next = current.next();
			} else {
				next = current.siblings().first();
			}
			
			var current_inner = current.children('div.inner');
			var next_inner = next.children('div.inner');
			
			if(alertCount &gt; 1) {
				// hide the current alert and the inner div of the next one
				current.hide().removeClass('current-alert');
				next_inner.hide();
				// now show the next alert and then fade in its inner div
				next.addClass('current-alert').show();
				next_inner.fadeIn(fadeSpeed).addClass('current-alert');
			}
		}
		if(alertCount &gt; 1) {
			setTimeout(alertCycler, 6000);
		}
	};

	$( ".JQalertsFader" ).hover(
	  function() {
		alertHover = true;
	  }, function() {
		alertHover = false;
	  }
	);	
	// end of simple alert fader
  
	// configure font-awesome to use the pseudo element names only needed for FA 5
	window.FontAwesomeConfig = {
		searchPseudoElements: true
	}
      // mobile search button show and hide
      $("#mobilesearchbutton").on('click', function (e) {

      	// submit if open, open if closed
      	if ($("#mobile-search-box").hasClass("mobile-search-box-open") &amp;&amp; ($("#mobilesearchfld").val())) {
      		$("#mobilesearchfrm").trigger('submit');
      	} else {
      		$("#mobile-search-box").toggleClass("mobile-search-box-open");
			$("#mobilesearchbutton").toggleClass("mobile-search-button-open");
      		$("#mobilesearchfld").trigger('focus');
      	}
      });

      // mobile search button show and hide



      // search button show and hide
      $("#searchopen").on('click', function () {

      	// submit if open, open if closed
      	if ($("#search-box").hasClass("search-box-open")) {
      		$("#searchopen-unused").removeClass("hide").addClass("fa-search");
      		$("#search-box").toggleClass("search-box-open");

      	} else {
      		$("#search-box").toggleClass("search-box-open");

      		$("#searchform").trigger('focus');
      		$("#searchopen-unused").removeClass("fa-search").addClass("hide");
			$('#JQmegamenu_content').slideUp('slow');
      	}
      });
      
	      // locator button show and hide
      $("#locatoropen").on('click', function () {

      	// submit if open, open if closed
      	if ($("#locator-box").hasClass("locator-box-open")) {
      		$("#locatoropen-unused").removeClass("hide").addClass("fa-map-marker-alt");
      		$("#locator-box").toggleClass("locator-box-open");

      	} else {
      		$("#locator-box").toggleClass("locator-box-open");

      		$("#locatorinput").trigger('focus');
      		$("#locatoropen-unused").removeClass("fa-map-marker-alt").addClass("hide");
			$('#JQmegamenu_content').slideUp('slow');
      	}
      });
      
      
	
	$("#searchclose").on('click', function () {

      	$("#search-box").toggleClass("search-box-open");
		$("#searchopen").removeClass("hide").addClass("fa-search");
      });


      $("#searchsubmit").on('click', function (e) {

      	// submit if open, open if closed
		e.preventDefault();
      	if ($("#search-box").hasClass("search-box-open") &amp;&amp; ($("#searchform").val().length &gt; 0)) {
      		$("#searchfrm").trigger('submit');
      	} else {
      		
      		$("#searchform").trigger('focus');

      	}
      });
      
      
	$("#locatorclose").on('click', function () {

      	$("#locator-box").toggleClass("locator-box-open");
		$("#locatoropen").removeClass("hide").addClass("fa-search-location");
      });


      $("#locatorsubmit").on('click', function (e) {

      	// submit if open, open if closed
		e.preventDefault();
      	if ($("#locator-box").hasClass("locator-box-open") &amp;&amp; ($("#locatorform").val().length &gt; 0)) {
      		$("#locatorfrm").trigger('submit');
      	} else {
      		
      		$("#locatorform").trigger('focus');

      	}
      });	
      
	
	// open/close the hidden container and add optionally add a class to the item that was clicked
	$(".JQslideTogglev2, .JQslideToggle_close_buttonv2").on('click', function(e){
		e.preventDefault();
		$clicked_item = $(this);
		button_class = '';
		if(typeof $clicked_item.data('container_opened_class') !== 'undefined'){
			button_class = $clicked_item.data('container_opened_class');
		}
		if($(this).hasClass('JQslideTogglev2')){
			if($(this).data('container-class-to-close') &amp;&amp; $(this).data('container-class-to-close') != '') {
				// close all open containers
				class_to_close = $(this).data('container-class-to-close');
				$('body').find('.' + class_to_close).each(function(){
					if($(this).is(":visible")){
						$(this).hide();
					}
				});
			}
			// toggle an indicator if present
			if($clicked_item.hasClass('content-open') || $clicked_item.hasClass('content-closed')){
				if($('#' + $clicked_item.data('container-id-to-open')).is(':hidden')){
					$clicked_item.removeClass('content-closed').addClass('content-open');
				} else {
					$clicked_item.removeClass('content-open').addClass('content-closed');
				}
			}
			if(button_class != ''){
				if($('#' + $clicked_item.data('container-id-to-open')).is(':visible')){
					$clicked_item.removeClass(button_class);
				} else {
					$clicked_item.addClass(button_class);
				}
			}
			$('#' + $clicked_item.data('container-id-to-open')).slideToggle('fast');
		} else {
			$('#' + $clicked_item.data('container-id-to-close')).slideToggle('fast');
		}
	});
	
	



    // post pagination button click event
    $("body").on("click",'.JQPollsPagination_btn',function(e){
        e.preventDefault();
        var url_params = {
                  mod: 'post',
                  action: "list",
                  pg: $(this).attr('data-pg'),
                  cat: $(this).attr('data-cat')
        };
		if($(this).attr('data-psrc')){
			url_params.psrc = $(this).attr('data-psrc');
		}
        $more_button = $(this).parent();
        $post_list = $(this).parent().prev("div[class*=JQpost_list]");
        encoded_params = $.param(url_params);
        $.ajax({
            type: 'GET',
            async: false,
            url: '/render.php',
            data: encoded_params,
            timeout: 15000,
            cache: false})
         .done(function(resultsObj){
                if('status' in resultsObj){

                    if('response' in resultsObj){
                        $post_list.html(resultsObj.response);
                    }
                    if('morebutton' in resultsObj){
                        $more_button.html(resultsObj.morebutton);
                    }
                }

            })
          .fail(function(XMLHttpRequest, textStatus, errorThrown){
              $('#dialog_detail').text("We're sorry. Your request could not be processed.");
              $('#dialog').dialog("open");
        });
    });

	
	/* banner-awareness */
	if( $('div.wrapper .hero-image').length || $('div.wrapper .banner-video').length)  {
			$("div.wrapper").addClass("hasbanner");
	} else {
			$("div.wrapper").addClass("hasnobanner");
	}

	
	// toggle faq icon open and closed
    $("li.faq-icon a.JQfaq").on('click', function(e){
		$( this ).toggleClass("faq-open");
    });

    // get the data-id of the main menu item that is in onstate
    if($('ul.nav-menu.dropdown').find('li.on').length &gt; 0){
        original_main_menu_item = $('ul.nav-menu.dropdown').find('li.on a').attr('data-id');
    } else {
        original_main_menu_item = 0;
    }

    $('body').on("click", '.JQcloseMM', function (e) {
        e.preventDefault();
        $('#JQmegamenu_content').slideUp('slow');
    })

    // force the menu to be open
    if($('ul.nav-menu.dropdown').find('a.on').length &gt; 0){
        TransInitialLoad = '1';
        $('ul.nav-menu.dropdown').find('a.on').trigger('click');
    }


    // toggles the mobile menu
    $('#mobilemenu').on('click', function(e){
        var submenu = $('#submenu');
        if (submenu.is(":visible")) {
    		submenu.slideUp();
            $(this).removeClass('menu-icon-open').addClass('menu-icon-closed');
    	} else {
    		submenu.slideDown();
            $(this).removeClass('menu-icon-closed').addClass('menu-icon-open')
    	}
    });
  
	// add class to fixed header on scroll
	$(window).on('load', function () {
		if($(".header").is(':visible')){

			$(window).scroll(function() {
				var scroll = $(window).scrollTop();
			if (scroll &gt; 0) {
					$(".header").addClass("scrolled");
					$(".wrapper_inner").addClass("scrolled-margin");
					$(".JQalertsFader").addClass("scrolled-alerts");
				} else {
					$(".header").removeClass("scrolled");
					$(".wrapper_inner").removeClass("scrolled-margin");
					$(".JQalertsFader").removeClass("scrolled-alerts");
				}
			});
		}
	})
	
	
	// slick slider options - homepage promotions carousel

      $('.carousel-promotions').slick({
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 44000,
        fade: false,
        speed: 1000,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
		    useTransform: true, // needed for easing
        cssEase: 'ease',
        easing: 'swing',
        dotsClass: 'slick-dots slick-dots-black',
        responsive: [
				{
				  breakpoint: 600,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	  ]
        });

    // open speedbump in iframe modal dialog
    $('*[class*="JQspeedbump"]').on('click',function(e){
        e.preventDefault();
        href = $(this).attr('href');
        id = $(this).attr('id');
        linktext = $(this).text();

        var wWidth = $(window).width();
        var wHeight = $(window).height();

		if(wWidth &lt;= 767) {
			// mobile settings
			var dWidth = Math.round(wWidth * 0.95);
			var dHeight = Math.round(wHeight * 0.95);
		} else {
			// desktop settings
			var dWidth = Math.round(wWidth * 0.5);
			var dHeight = Math.round(wHeight * 0.6);
		}

        // support for alternate speedbump styles:
        bumpstyle = encodeURIComponent($(this).attr('class'));

        $('#dialog_content').load('/render.php',{
            mod: "speedbump",
            action: "display",
            params: 'id~' + id + '|linktext~' + linktext+'|href~'+href+'|style~'+bumpstyle+'|ww~'+wWidth+'|wh~'+wHeight}
        );

        var sizedebug = wWidth + 'x' + wHeight + '  (80% = ' + dWidth + 'x' + dHeight + ')';
        var speedbumptitle = '';

       $('#dialog').dialog({
            autoOpen: false,
            // position: { my: "center", at: "center" },
            modal: true,
            overlay: { opacity: 0.1, background: "black" },
            title: speedbumptitle,
            height: dHeight,
            width: dWidth,
            open: function(){
                //$(this).css('width','98%');
                // TJ; the following closes modal on outside click:
                $('.ui-widget-overlay').on('click', function () { $(this).parents("body").find(".ui-dialog-content").dialog("close"); });
            },
            buttons: {
                'Go': function() {
                    vTracker($(this),'Speedbumps','Exit',href);
                    $(this).dialog('close');

                    // open new window for all speedbumps:
                    //setTimeout(function() {
                        window.open(href);
                    //}, 100);

                    // or if client requests same window always:
                    //window.location.href = href;
                },
                'Stay': function() {
                    vTracker($(this),'Speedbumps','Stay',href);
                    $(this).dialog('close');
                }
            }
       });

        $('#dialog').dialog("open");

    });


	//  slick slider options - homepage testimonials carousel
      $('.carousel-testimonials').slick({
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 700,
        easing: 'swing',
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
			  responsive: [
				{
				  breakpoint: 1000,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 600,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	  ]
        });
	//  slick slider options - homepage promotions carousel
      $('.carousel-mini-image-slider').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 700,
        easing: 'swing',
        pauseOnHover: true,
        prevArrow: '<button class="slick-prev" type="button">Previous Slide</button>',
        nextArrow: '<button class="slick-next" type="button">Next Slide</button>',
        responsive: [
				{
				  breakpoint: 600,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	  ]
        });
		
		
		
		

    // banking login interceptor
    // login submit button must exist, OBmsg block must exist, and the notice data flag on
    notices = ($('#OBmsg').length &gt; 0)?$('#OBmsg').attr('data-notices'):'off';

    $('#BankingLoginSubmit').on('click',function(e) {

		if($('#UserName').val().length == 0) {
			//alert('Please enter your Username.');
			$('#UNerror').show();
			return false;
		} else {
			$('#UNerror').hide();
		}

		// if this is IE11 then override activate a mid-login notice
		//  which overrides any existing notice.
		if('isie11' in WrapperVariablesObj){
			notices = 'on';
		}

		if( ($('#BankingLoginSubmit').length &gt; 0) &amp;&amp; (notices=='on') ) {

			e.preventDefault();
		
			$('#dialog_content').html( $('#OBmsg').html() );
			var btitle = $('#OBtitle').html();

			// override the notice when IE11
			if('isie11' in WrapperVariablesObj){
				notices = 'on';
				$('#dialog_content').html( $('#OB_IE11msg').html() );
				btitle = $('#OB_IE11title').html();
			}

			var wWidth = $(window).width();
			var dWidth = Math.round(wWidth * 0.8);
			var wHeight = $(window).height();
			var dHeight = Math.round(wHeight * 0.8);

		   $('#dialog').dialog({
				autoOpen: false,
				// position: { my: "center", at: "center" },
				modal: true,
				overlay: { opacity: 0.1, background: "black" },
				title: btitle,
				height: dHeight,
				width: dWidth,
				open: function(){
					// TJ; the following closes modal on outside click:
					$('.ui-widget-overlay').on('click', function () { $(this).parents("body").find(".ui-dialog-content").dialog("close"); });
				},
				buttons: {
					'Continue': function() {
						$(this).dialog('close');
						processLogin();
					}
				}
		   });

			$('#dialog').dialog("open");
		}

    });


	function processLogin() {
		if($('#UserName').val().length == 0) {
			alert('Please enter your UserName.');
		} else {
			// see if there are any opt-out cookies to setActive
			$('.JQbnOptOut').each(function(idx,elementObj){
				if($(this).is(':checked') ){ 
					data_cookiename = $(this).attr('data-cn');
					data_cookieval = $(this).attr('data-cv');
					if (document.cookie.indexOf(data_cookiename) == -1) {
						// cookie is not yet set
						var exp=new Date();
						exp.setDate(exp.getDate() + 100); // expire in 100 days
						setInterstitialCookie(data_cookiename, data_cookieval, exp, false, false);
					} else {
						// cookie is set, but we need to check its value
						if($.cookie(data_cookiename) != data_cookieval) {
							// cookie is probably from previous version of notice, so update value:
							var exp=new Date();
							exp.setDate(exp.getDate() + 100); // expire in 100 days
							setInterstitialCookie(data_cookiename, data_cookieval, exp, false, false);
						}
					}
				}
				

			});
			
			// cookies are all set, move on
			$('#loginForm').submit();
		}

	}

	

		
});

$(window).on('load', function () {

    if(window.location.hash) {
		
		hashLogic('window',window.location.href);
		
		// delay hashLogic to allow for Flexslider to finish rendering:
		//setTimeout(function(){  hashLogic('window',window.location.href); }, 250);
    }

    // needed to support anchors to within current page:
    $("a[href*='#']").on('click', function(event) {
		console.log(this.href);
		if(this.href != '') {
			hashLogic('click',this.href);
		}
    });

	// make header chat link trigger chat in new window
	//const headerChatLink = document.getElementById('static-chat-button');
	//headerChatLink.addEventListener('click', (e) =&gt; {
	//	openChatWindow();
	//});
	
	
	// Avtex-powered chat
	// handle the click on the chat icon
	//
	$("#static-chat-button").on('click', function (e) {

		// default to inactive chat
		var chat_status = false;
		var cselem = document.getElementById("computed-chat-status");
		if(cselem) {
			// we have our chat status element, get the value
			if(cselem.hasAttribute('data-value')) {
				chat_status_value = cselem.getAttribute('data-value');
				if(chat_status_value == 1) {
					chat_status = true;
				}
			} else {
				console.log('chat status with no value found.');
			}
		} else { console.log('no computed-chat-status element'); }
		
		if(chat_status === true) {
			openChatWindow();
		} else {
			// use slideToggle directly so our jquery-powered JQslideTogglev2 will pick it up from there
			$("#chat-status-box").slideToggle();
		}
	 });




});

function openChatWindow() {
	window.open(
		"https://home-c68.nice-incontact.com/inContact/ChatClient/ChatClient.aspx?poc=5cbab155-ca44-4ff3-a6e1-38c54fc9e416&amp;bu=4606544&amp;P1=FirstName&amp;P2=Last+Name&amp;P3=first.last@company.com&amp;P4=555-555-5555",
		'icPatronChatWin', 
		'location=no,height=630,menubar=no,status-no,width=410', true);
}


function hashLogic(funcType,href){
	hrefVal = href || '';
	var hrefArray = hrefVal.split('#');
	var hash = hrefArray[1];
	var headerHeight = 0;			// height of the fixed header that everything scrolls beneath
	
	if($("div.header").length &gt; 0){
 		headerHeight = parseInt($("div.header").height()) + parseInt($("div.header").css('margin-bottom')) + parseInt($("div.header").css('margin-top'));
	}
	
	//console.log('header height measured to be ' + headerHeight + 'px');
	
	if(hash.substr(0,5) == 'goto_') {
		if(funcType == 'window'){
			var temp = hash.split('_');
			namedAnchorId = temp[1];
			switch(namedAnchorId){
	            case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
					tabnum = parseInt(namedAnchorId);
					anchorOffset = $('.ca_tabs').offset().top - headerHeight;
					$('html, body').animate({ scrollTop: anchorOffset}, 'slow');
					$('.ca_tabs li:nth-child(' + tabnum + ')').trigger('click');
	                break;
				default:
					if($('#' + namedAnchorId).length &gt; 0){
						anchorOffset = $('a#' + namedAnchorId).offset().top - headerHeight;
						$('html, body').animate({ scrollTop: anchorOffset}, 'slow');
					} else {
					 	console.log('Named Anchor - ' + namedAnchorId + ', not found in document.');
					}
					break;
			}
		} else {
			// make sure the id exists otherwise an error is thrown
			namedAnchorId = hash.replace(/goto_/i,'');
			if($('#' + namedAnchorId).length &gt; 0){
				anchObj = $('#' + namedAnchorId).offset();
				if($(window).width() &gt; 767){
					$('html').animate({ scrollTop: anchObj.top - headerHeight}, 'slow');
				} else {
					$('html').animate({ scrollTop: anchObj.top}, 'slow');
				}
			} else {
			 	console.log('Named Anchor - ' + namedAnchorId + ', does not exist in document.');
			}
			return false;
		}
	} else {
		// make sure the id exists otherwise an error is thrown
		namedAnchorId = hash.replace(/goto_/i,'');
		if(namedAnchorId != '' &amp;&amp; $('#' + namedAnchorId).length &gt; 0){
			anchObj = $('#' + namedAnchorId).offset();
			//console.log("anchor offset is " + anchObj);
			console.log(anchObj);
			var fudge = 18;
			var scrollto = anchObj.top - headerHeight - fudge;
			//console.log("scrollto calculated as " + scrollto);
			if($(window).width() &gt; 767){
				$('html').animate({ scrollTop: scrollto}, 'slow');
			} else {
				$('html').animate({ scrollTop: scrollto}, 'slow');
			}
		}
		return false;
	}
}

function setInterstitialCookie(cn, cv, expires, path, domain) {
  var curCookie = cn + "=" + cv +
  ((expires) ? "; expires=" + expires.toUTCString() : "") +
  ((path) ? "; path=" + path : "") +
  ((domain) ? "; domain=" + domain : "") +
  (('https:' == document.location.protocol) ? "; secure" : "");
  document.cookie = curCookie;
}	
