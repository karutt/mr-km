

$(function() {
	//scroll Menu
	windowScroll(".Header-menu-item");
	windowScroll(".Header-head-phrase");
	headerColor();
	ImageHover();
	confirmWindow();

});



var first = true;
function confirmWindow() {
	if(first) {
		var dist = $(window).scrollTop();
		if(dist > 300) {
			$("header").addClass("Header-scroll");
			$(".Header-head").fadeIn(300);
		} else {
			$("header").removeClass("Header-scroll");
			$(".Header-head").fadeOut(100);
		}
		first = false;
	}
}

function headerColor() {
	var height = $("body").height;
	$(window).scroll(function() {
		var dist = $(this).scrollTop();

		if(dist > 300) {
			$("header").addClass("Header-scroll");
			$(".Header-head").fadeIn(300);
		} else {
			$("header").removeClass("Header-scroll");
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
	function windowScroll(target) {
		$(target).on("click", function() {
			var path = $(this).attr("href");
			var target = $(path).offset().top - 60;
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
