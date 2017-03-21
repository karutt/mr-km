

$(function() {


	//scroll Menu
	windowScroll(".Header-menu-item",0);
	windowScroll(".Header-head-phrase",0);
	windowScroll(".explanation-list-item",-30);

	$(".Header").css("transition", ".1s");
	headerColor();
	confirmWindow();
	ImageHover();

//
// var cw = $("canvas").width();
// var ch = $("canvas").height();
// alert(cw, ch);
	// $("iframe").css("width": )


	var isHover = false;
	setTimeout(function(){
		if(!isHover) {
			$("WorkHeader").stop().animate({opacity:'0'},500);
		}
	},2000);

	$('WorkHeader').on({
		'mouseenter':function(){
			isHover = true;

			$(this).stop().animate({ opacity: 1}, 500);

		},
		'mouseleave':function(){
			if(!$(".information").hasClass("active")) {
				$(this).stop().animate({opacity: 0}, 500);
			}
			// alert("ok");
		}
	});

	$(".WorkHeader-menu-item").on("click", function() {
		var target = $(this).attr("href");
		var other;
		if(target == ".info1") other = ".info2";
		else other = ".info1";
		if(!$(target).hasClass("active")) {

			if($(other).hasClass("active") && other == ".info2")	{
				$(target).css("display", "block");
				$(other).stop().fadeOut(300);
			}
			else {$(target).stop().fadeIn(300, function() {$(other).fadeOut(100);});}

			$(".information").removeClass("active");
			$(target).addClass("active");

		} else {
			$(target).removeClass("active");
			$(target).fadeOut(300);
		}
		return false;
	});

});



var trigger = true;
function confirmWindow() {
	if(trigger) {
		var dist = $(window).scrollTop();
		if(dist > 300) {
			$(".Header").addClass("Header-scroll");
			$(".Header-head").fadeIn(300);
		} else {
			$(".Header").removeClass("Header-scroll");
			$(".Header-head").fadeOut(100);
		}
		trigger = false;
	}
}

function headerColor() {
	var height = $("body").height;
	$(window).scroll(function() {
		var dist = $(this).scrollTop();
		if(dist > 300) {
			$(".Header").addClass("Header-scroll");
			$(".Header-head").fadeIn(300);
		} else {
			$(".Header").removeClass("Header-scroll");
			$(".Header-head").fadeOut(100);
		}
	});
}



function ImageHover() {
	$(".category-link").hover(function(){
		var str = $(this).children("img").attr("alt");
		$(this).append(
			"<div class='category-hoverBord'><div class='category-hoverBord-wrapper'><p class='category-hoverBord-p'>"
			+str+
			"</p></div></div>");

			$(this).children("div.category-hoverBord").stop().fadeIn(300);
			$(this).children("div.category-hoverBord").children("div.category-hoverBord-wrapper").children("p").stop().animate({"top":0}, 300);
		}, function(){
			$(this).children("div.category-hoverBord").stop().fadeOut(300);
			$(this).children("div.category-hoverBord").children("div.category-hoverBord-wrapper").children("p").stop().animate({"top":"10px"}, 300, function() {
				$(this).parent("div.category-hoverBord-wrapper").parent("div.category-hoverBord").remove();
			});
		});
	};

	//scroll window
	function windowScroll(target, yoff) {
		$(target).on("click", function() {
			var target = $(this).attr("href");
			var target = $(target).offset().top - 60 + yoff;
			$("html, body").animate({scrollTop: target}, 200, "easeOutExpo");
			return false;
		});
	}


	var WinW = 600;
	var WinH = 400;
	var PosX = (screen.width - WinW)/2;
	var PosY = (screen.height - WinH)/2;
	var siteURL = document.URL;
	var siteNAM = "mr-km.net";

	function HtLink(){
		window.open('http://b.hatena.ne.jp/add?mode=confirm&url=' + siteURL + '&title=' + siteNAM + '', '', 'left='+ PosX +', top='+ PosY +', width='+ WinW +', height='+ WinH +', scrollbars=no');
	}

	function TwLink(){
		window.open('http://twitter.com/share?text=' + siteNAM + '&url=' + siteURL + '', '', 'left='+ PosX +', top='+ PosY +', width='+ WinW +', height='+ WinH +', scrollbars=no');
	}

	function FbLink(){
		window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fkarutt.github.io%2Fmrkm%2F&amp;src=sdkpreparse', '', 'left='+ PosX +', top='+ PosY +', width='+ WinW +', height='+ WinH +', scrollbars=no');
	}




	(function(window, $){
  $(window).load(function(){

    var $frame = $('iframe');
    var innerHeight = $('iframe').contents().find('canvas').width()
    var innerWidth = $('iframe').contents().find('canvas').height()
    $frame.attr('height', innerHeight + 'px');
    $frame.attr('width', innerWidth + 'px');
		$frame.css("width", innerHeight).css("height", innerWidth);
		// alert(innerWidth);
  })
})(window, jQuery)
