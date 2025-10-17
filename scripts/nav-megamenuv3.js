// nav-megamenusv3.js
//  MegaMenu Navigation Support
//  June2020 logical and structural rewrite
//  August2020 adding sticky header support and transition config
//

/*

menu_toggle_selector: CSS selector for the burger menu icon or other menu toggle element

menu_panel_selector: CSS selector for the menu panel (containing top-level menu items)

menu_subpanel_selector: CSS selector for the menu subpanel (containing sub-level menu items)

mobile_size_detector: CSS selector to refer to an element that is only visible below the mobile breakpoint.

menu_relevantcontainer_selectors: List of selectors related to the menu. Elements in this list are the only elements that will not cause the menu to close when you click somewhere with the menu open.  

hide_menupanel_when_sticky: Set to false if the docked sticky-header keeps the main menu panel.  Set to true if the menu panel is to be hidden for example if the menu goes away and a menu icon shows up to activate the menu.

*/

var vMenu = {
	// configuration:
	menu_toggle_selector:	'#burgermenu,.JQcloseMM',
	menu_panel_selector:	'div.menu-main',
	menu_subpanel_selector:	'#JQmegamenu_content',
	menu_section_selector:	'.JQMegaMenuCtrl',
	mobile_size_detector:	'div.mobile-size-indicator',
	menu_relevantcontainer_selectors: [
		'div.menu-main',
		'#megabox',
		'#burgermenu',
		'#JQmegamenu_content'
	],
	animation: 'vertslide',		// options: vertslide, fade, showhide
	animationduration: 400,		// animation speed in ms, 600 slow, 200 fast, etc

	hide_menupanel_when_sticky: false,		// true/false to hide the menu panel when header is sticky-docked
	close_on_current: true,		// true/false to close menu when clicking on the active menu item
	close_on_scroll: false,		// true/false to close menu during transition to sticky header
	close_on_scroll_mobile: false,		// true/false to close menu at mobile size during transition to sticky header

	// internal variables, do not change for configuration:
	navDebug: false,
	menu_is_open: false,
	page_is_scrolled: false,
	at_mobile: false,
	
	initial_active_menu_num: 1,
	active_menu_num: 0
}

// initialize the menu -- only call once 
vMenu.initialize = function() {

    // get the data-navid of the main menu item that is in on state
    if($('ul.nav-menu.megamenu').find('li.on').length &gt; 0){
        this.initial_active_menu_num = $('ul.nav-menu.megamenu').find('li.on a').attr('data-navid');
		if(this.navDebug) console.log('found current menu id ' + this.initial_active_menu_num);
		this.active_menu_num = this.initial_active_menu_num;
    }

	// initialize the active menu item so it's ready when activated
	//if(this.initial_active_menu_num &gt; 0) {
	//	this.setActive(this.initial_active_menu_num);
	//}

	if( $(vMenu.mobile_size_detector).is(":visible") ) {
		this.at_mobile = true;
	}
	
	// install click handler for activator:
	$(this.menu_toggle_selector).on('click', function(e){ 
		if(vMenu.menu_is_open) {
			vMenu.close(); 
		} else {
			$(vMenu.menu_panel_selector).show();
			vMenu.open(); 
		}
	});
	
	// install click handler for menu interaction:
	$(this.menu_section_selector).on('click', function(e){
		e.preventDefault();
		navid_clicked = $(this).attr('data-navid');
		if(vMenu.navDebug) console.log('menu item click; vMenu.menu_is_open='+vMenu.menu_is_open);
		if(vMenu.menu_is_open) {
			
			if(navid_clicked == vMenu.active_menu_num) {
				if(vMenu.close_on_current) {
					vMenu.close();
				}
			} else {
				if(vMenu.navDebug) console.log('menu item click; vMenu.active_menu_num='+vMenu.active_menu_num);
				vMenu.setActive(navid_clicked);
				
			}
		} else {
			vMenu.setActive(navid_clicked);
			vMenu.open();
		}
	});

	// install global click handler to close menu on clicks outside of menu area
	$(document).on('mouseup', function(e){
		vMenu.processGlobalClick(e);
	});

	if($(".header").is(':visible')){
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			if (scroll &gt; 0) {
				if(!vMenu.page_is_scrolled) {
					// page is not already scrolled so we're just now 
					//  scrolling away from the top of the page
					if(vMenu.at_mobile) {
						vMenu.updateMobileHeader_Scrolled();
					} else {
						vMenu.updateFullHeader_Scrolled();
					}
				}
			} else {
				if(vMenu.page_is_scrolled) {
					// page is already scrolled so we're just now 
					//  scrolling back to the top of the page
					if(vMenu.at_mobile) {
						vMenu.updateMobileHeader_Unscrolled();
					} else {
						vMenu.updateFullHeader_Unscrolled();
					}
				}
			}
		});
	}
	
}

// updateFullHeader_Scrolled :: called when full (non-mobile) header is scrolled away from top
//  (header should transition to sticky header)
vMenu.updateFullHeader_Scrolled = function() {
	if(vMenu.menu_is_open) {
		if (vMenu.close_on_scroll) {
			vMenu.close();
		}
	} else {
		if(vMenu.hide_menupanel_when_sticky) {
			$(vMenu.menu_panel_selector).hide();
		}
	}
	this.page_is_scrolled = true;
	$(".header").addClass("scrolled");
	$(".wrapper_inner").addClass("scrolled-margin");
}

// updateFullHeader_Unscrolled :: called when full (non-mobile) header is scrolled to the top
//  (header should transition back to normal header)
vMenu.updateFullHeader_Unscrolled = function() {
	if(vMenu.hide_menupanel_when_sticky) {
		$(vMenu.menu_panel_selector).show();
	}
	this.page_is_scrolled = false;
	$(".header").removeClass("scrolled");
	$(".wrapper_inner").removeClass("scrolled-margin");
}

// updateFullHeader_Scrolled :: called when full (non-mobile) header is scrolled away from top
//  (header should transition to sticky header)
vMenu.updateMobileHeader_Scrolled = function() {
	// here's what non-mobile should do when header goes sticky:
	if(vMenu.menu_is_open &amp;&amp; vMenu.close_on_scroll_mobile) {
		vMenu.close();
		if(vMenu.hide_menupanel_when_sticky) {
			$(vMenu.menu_panel_selector).hide();
		}
	}
	this.page_is_scrolled = true;
	$(".header").addClass("scrolled");
	$(".wrapper_inner").addClass("scrolled-margin");
}

vMenu.updateMobileHeader_Unscrolled = function() {
	// we are at mobile size
	//$(vMenu.menu_panel_selector).hide();
	if(vMenu.close_on_scroll_mobile) {
		vMenu.close();
	}
	this.page_is_scrolled = false;
	$(".header").removeClass("scrolled");
	$(".wrapper_inner").removeClass("scrolled-margin");
	
}


// open the menu
vMenu.open = function() {
	var  m = $(this.menu_panel_selector);
	var sm = $(this.menu_subpanel_selector);

	if(vMenu.navDebug) console.log('open, setting ' + this.active_menu_num + ' active.');
	if(this.active_menu_num &gt; 0) {
		this.setActive(this.active_menu_num);
	} else {
		this.setActive(this.initial_active_menu_num);
	}

	// if header is stuck then menu panel needs to open
	if(this.page_is_scrolled) {
		this.transition('open',m);
	}
	
	this.transition('open',sm);
	this.menu_is_open = true;
	
}

// close the menu
vMenu.close = function() {
	var  m = $(this.menu_panel_selector);
	var sm = $(this.menu_subpanel_selector);

	if (sm.is(":visible")) {
		this.transition('close',sm);
		this.menu_is_open = false;
	}

	// if header is stuck then menu panel needs to close also
	/*if(this.page_is_scrolled || this.at_mobile) {
		this.transition('close',m);
	}*/

	this.clear();
}

// update menu with the specified main menu item selected
vMenu.setActive = function(navid) {
	
	this.active_menu_num = navid;
	
	// clear on state for all menu items
	$('ul.nav-menu.megamenu').find('li.on').removeClass('on');
	
	// hide and clear on state for all mega menu containers
	$('div.megacontainer').each(function(index){
		if($(this).hasClass('on')){
			$(this).hide().removeClass('on');
		}
	});
	
	// set on state for the specified menu item
	var $div2Display = $('#JQmegamenu_content div.megacontainer[data-navid=' + navid + "]");
	$div2Display.show().addClass('on');

	// clear active class from all 
	$('ul.nav-menu.megamenu a.active').removeClass('active').addClass('inactive');
	
	// set active for the specified menu item
	var menuitem = $('ul.nav-menu.megamenu').find('li a[data-navid=' + navid + "]");
	menuitem.removeClass('inactive').addClass('active');
	
}

vMenu.clear = function() {
	$('ul.nav-menu.megamenu a.active').removeClass('active').addClass('inactive');
}

vMenu.processGlobalClick = function(e) {
	
	// determine if the click is in any menu-relevant container:
	var offclick = true;	// assume click is outside 
	vMenu.menu_relevantcontainer_selectors.forEach(function(s) {
		var container = $(s);
		if (container.is(e.target)) {
			// click is directly on relevant element
			offclick = false;
		}
		if(container.has(e.target).length != 0) {
			// clicked on something inside a relevant element
			offclick = false;
		}
	});
	if(offclick) {
		vMenu.close();
		vMenu.clear();
	}
		
}

vMenu.transition = function(action,element) {
	if(action == 'open') {
		switch(this.animation) {
			case 'fade':
				element.fadeIn(this.animationduration);
				break;
			case 'showhide':
				element.show(this.animationduration);
				break;
			case 'vertslide':
			default:
				element.slideDown(this.animationduration);
				break;
		}
	}
	if(action == 'close') {
		switch(this.animation) {
			case 'fade':
				element.fadeOut(this.animationduration);
				break;
			case 'showhide':
				element.hide(this.animationduration);
				break;
			case 'vertslide':
			default:
				element.slideUp(this.animationduration);
				break;
		}
	}

}

$(function(){
	vMenu.initialize();
});

