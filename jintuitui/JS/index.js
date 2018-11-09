

$(function() {
	var num = 0;
	var timer = null;
	var flag = true;
	// 1.0 动态生成ol里面的li
	$(".indecator").append($("<ol></ol>"))
	$(".inner > li").each(function(index, ele) {
		$("<li></li>").appendTo($(".indecator > ol"))
	})
	$(".indecator > ol > li").eq(0).addClass('current')
	$(".inner > li").eq(0).clone().appendTo($(".inner"))
	// 2.0 给每一个li注册一个事件
	$(".indecator > ol").on("click", "li", function() {

		$(this).addClass('current').siblings().removeAttr('class')
		$(".inner").animate({
			"left" : -$(this).index() * $(".inner > li").width()
		}, 600, "swing", function() {
			flag = true;
		})
		// 统一索引
		num = $(this).index()
	})
	// 3.0 给盒子设置鼠标经过和鼠标离开的事件,hover能做但是时间不宜过长
	$(".swiper").hover(function() {
		$(".arrow").fadeTo(100, 1);
		clearInterval(timer)
	}, function() {
		$(".arrow").fadeTo(100, 0);
		timer = setInterval(autoPlay, 2000)
	})
	// 4.0 给左右按钮设置点击事件
	$(".arrowRight").on("click", function() {
		if(flag) {
			flag = false;
			autoPlay()
		}
	})
	function autoPlay() {
		num++;
		if(num < $(".inner > li").length - 1) {
			$(".indecator > ol > li").eq(num).trigger('click')
		}
		if(num == $(".inner > li").length - 1) {
			$(".indecator > ol > li").eq(0).addClass('current').siblings().removeAttr('class');
			$(".inner ").animate({
				"left" : -num * $(".inner > li").width()
			}, 600, "swing", function() {
				$(".inner").css("left", 0);
				num = 0;
				flag = true;
			})
		}
	}
	$(".arrowLeft").on("click", function() {
		if(flag) {
			flag = false;
			if(num === 0) {
				num = $(".inner> li").length - 1;
				$(".inner").css("left", -num * $(".inner > li").width());
			}
			num--;
			$(".indecator > ol > li").eq(num).trigger('click')
		}
	})
	// 5.0 设置自动轮播
	timer = setInterval(autoPlay, 3500)
})