$(document).ready(function(){
	
	var navi_h; //네비게이션 높이
	var winH; //현재 화면 높이
	var widW; //현재 화면 넓이
	var introH; //유투브 영상 넓이
	var vid; //랜드마크 재생되는 비디오
	var mainH;
	var pos1;
	var pos2;
	var pos3;
	var pos4;
	var pos5;
	var pos6;
	var arr;
	var len;

	pos_header();
	heightbox();


	//함수 패키징 전 각 색션 높이
		
	 function heightbox(){
		pos1 = $("#home").offset().top;
		pos2 = $("#Landmark").offset().top;
		pos3 = $("#NightView").offset().top;
		pos4 = $("#Food").offset().top;
		pos5 = $("#Hotel").offset().top;
		pos6 = $("#Hotel").offset().top + $("#Hotel").height();

		//배열에 집어넣고 스크롤 시 패키징함. 
		arr = [pos1, pos2, pos3, pos4, pos5, pos6];
		len = arr.length;
	}

	//네비게이션 바 하단 고정 값
	function pos_header(){
		winH = $(window).height();
		widW = $(window).width();
		mainH = $("#home, #Landmark, #NightView, #Food, #Hotel, .mask, .intro").css({"height":winH, "width":widW});
		 
		//var homeH = $(window).height();
		//var headerH = $("#top").height();
		//navi_h = homeH-headerH;
		var headerH = $("#top").height();
		navi_h = winH-headerH;
		$("#top").css({"top":navi_h});
	}

	
	//리사이즈 시 현재 화면에 맞춰 홈화면 조정
	$(window).on("resize",function(){
		pos_header();
		heightbox();	
	});


	//네비게이션 
	$(".topnavi li").on("click",function(e){
		e.preventDefault();
		var page = $(this).children("a").attr("href");
		var move = $(page).offset().top;		
		$("html,body").stop().animate({"scrollTop":move},400);
	});

	
	//인트로 애니메이션
	$(".motion_intro .top").stop().animate({"width":"100%"},4000,function(){
		$(".motion_intro .right").stop().animate({"height":"100%"},300,function(){
			$(".motion_intro .bottom").stop().animate({"width":"100%"},300,function(){
				$(".motion_intro .left").stop().animate({"height":"100%"},300);
				$(".motion_intro .center_left").stop().animate({"width":"35%"},1000);
				$(".motion_intro .center_right").stop().animate({"width":"35%"},1000);
				$(".center .count").stop().animate({"opacity":"1", "top":"60px"},1000,function(){
					$(".top, .left, .bottom, .right").remove();
					$(".motion_intro2").css({"opacity":1});
					setTimeout(function(){
						$(".motion_intro").fadeOut();
						var abc;
						$({abc:0}).stop().animate({abc:180},{
							duration : 1000,
							progress : function(){
								$(".motion_intro2").css({"transform":"rotate("+this.abc+"deg)"});
								$(".motion_intro3").css({"transform":"skewY("+this.abc+"deg)"});
								$(".motion_intro3").css({"opacity":1});
							}
						});
					},1000); 
				});
				var i = 2010;
				var count = setInterval(function(){		
						if(i < 2017){
							i++;
						}else if (i == 2017){
							clearInterval(count);
						}
						$(".center .count").text(i);		
				},100);
				var j = 0;
				var titletext = setInterval(function(){
					if(j<7){
						j++;
					}else if(j == 7){
						clearInterval(titletext);
					}
					$(".center .text").children("span").eq(j-1).addClass("on");
				},120);

			});
		});
	});	
	
	


	//스크롤 시 네비게이션 활성화 함수패키징 전
	$(window).on("scroll",function(){
		var scroll = $(this).scrollTop();	
		for(var i=0; i<len; i++) {
			if(scroll>=arr[i] && scroll<arr[i+1]){
				$(".topnavi li a").removeClass("on");
				$(".topnavi li").eq(i).children("a").addClass("on");
			};	
		}
		if(scroll>=navi_h){
				$("#top").css({"position":"fixed","top":0});
			}else{
				$("#top").css({"position":"absolute","top":navi_h});
		}
		if(scroll>=pos2 && scroll<pos3){
			
			var viewer = setInterval(card,300);
			var k = 0;
			function card (){
				if(k < 5){
				    k++;
				}else if (k == 4){
					clearInterval(viewer);
				}
				$("#Landmark").children("div").eq(k-1).addClass("on");
			}
		};
		if(scroll>=pos3 == scroll<pos4){
			$("#Landmark").children("div").removeClass("on");
		};
		
	});


	// 인스타그램 on / off 동작 
	$(".snsbox").on("click",function(){
		$(this).addClass("on");
		$(".con_sns").show();
	});
	$("body").on("click",".snsbox .close",function(e){
		e.preventDefault();
		$(".snsbox").removeClass("on");
		$(".con_sns").hide();	
	});

	$("body").on("mouseenter",".snsbox .thumb",function(){
		$(this).children("img").stop().animate({"left":"0px"},2000);
	});
	$("body").on("mouseleave",".snsbox .thumb",function(){
		$(this).children("img").stop().animate({"left":"-40px"},500);
	});

	//ajax로 인슽타그램 불러오기 api
	var dataURL = 'https://api.instagram.com/v1/users/self/media/recent';
	var photoData;
		
		  var getData = function(url) {
		    $.ajax({
		      url: url,
		      dataType: 'jsonp',
		      data: {
		        access_token: '2079221999.568ea8d.80be90124c7a48d0bc6d24f1eb5a54dc',
		        count: 8
		      }
		    })
		    .success(function(data) {
		      photoData = data;	  
		      console.dir(photoData);
		      $(photoData.data).each(function(){
		      		$(".list_insta").append(
					$('<div class="item"></div>').append(
					$('<a class="thumb" target="_blank"></a>').attr({"href":this.images.standard_resolution.url}).append(
						$('<img class="desc_img" />').attr({"src":this.images.low_resolution.url})
					).append(
						$('<span class="like"></span>').text(this.likes.count)
					).append(
						$('<a class="moveinsta">more</a>').attr({"href":this.link, "target":"_blank"})
					)
				)
			);	
		      });
		    })
		    .error(function() {
				alert("데이터불러오기에 실패했습니다");
		    })
		  }
	//ajax 실행구문
	getData(dataURL);

	//LandMark 영상 on / off
	$("#Landmark>div").on("mouseenter",function(){		
		var selVideo = $(this).index();
		$("#Landmark>div").eq(selVideo).addClass("video");
		$(this).find("video").stop().animate({"opacity":"0.9"},400);
		vid = $(this).find("video").get(0);
		vid.currentTime=0;
		//vid.play();
		$(this).children("p").stop().animate({"right":"50px","opacity":"1"},1000);
	});

	$("#Landmark>div").on("mouseleave",function(){
		$("#Landmark>div").removeClass("video");
		//vid.pause();
		$(this).find("video").stop().animate({"opacity":"0"},400);
		$(this).children("p").stop().animate({"right":"-400px","opacity":"0"},500);
	});

	//NightView 동작
	$("#NightView a").on("click",function(e){
		e.preventDefault();
		$("#NightView>div").removeClass("on");
		$(this).hide();
		//$(this).siblings(".intro").css({"display":"block"});
		$(this).siblings("img").hide();
		$(this).parent("div").addClass("on");
		
		var $url_iframe = $(this).siblings(".intro").find("iframe").attr("src"); // 플레이어 영역에 넣은 iframe의 주소를 찾아서 $item_top 로 간직하고 있다가

  		$(this).siblings(".intro").children("iframe").attr("src",$url_iframe + "&autoplay=1");
		//setTimeout(function(){
		//	$("#NightView>div.on video").fadeIn(1000);
		//},1000);
		$(this).siblings(".intro").fadeIn(500);
		$(this).fadeOut(500);
		$("#top").fadeOut(500);
		$(".snsbox").fadeOut(500);
		//var mask ='<div class="mk"></div>'
		//$(mask).appendTo(".intro");
		//$(".mk").css({"width:100%","height":"100%"; "position":"absolute","top":"0px","left":"0px"});
	});
	$("#NightView .close").on("click",function(){
		$(this).parent("div").removeClass("on");
		$("#NightView video").fadeOut(100);
		setTimeout(function(){
			$("#NightView>div img").fadeIn(500);
		},400);
		$("#top").fadeIn(500);
		$("#NightView .intro").css({"display":"none"});
		$(".snsbox").fadeIn(500);
		//$(this).siblings("video").fadeOut(100);
		$("#NightView a").fadeIn(500);
	});



	//food 마우스 오버시 오브젝트 움직임
	$("#Food").on("mousemove",function(e){
		var posX = e.pageX;
		var posY = e.pageY;
		$(".obj1").css({"right":-180-(posX/30), "bottom":-480-(posY/30)});
		$(".obj2").css({"right":130+(posX/50), "bottom":-40+(posY/50)});
	});

	//food 탭 클릭 시 콘텐츠 보이기 (on으로 제어)
	$(".list_food li").eq(0).addClass("on");
	$(".list_food li").on("click",function(){
		$(".list_food li").removeClass("on");
		var sel = $(this).index();
		$(".list_food li").eq(sel).addClass("on");
		$(".list_food li").eq(sel).children("div").children(".sum_food").addClass("on");
	});
	
	var mtop = 0;
	//Hotel 롤링
	hotellist = setInterval(move,50);
	function move(){
		mtop-= 3;
		if(mtop < -80){
			$(".list_hotel li").first().appendTo(".list_hotel");
			mtop=0;
		}
		$(".list_hotel").css({"top":mtop});
	}

	$(".box_list").on("mouseenter",function(){
		clearInterval(hotellist);
		$(".box_list .btn_prev").addClass("on");
		$(".box_list .btn_next").addClass("on");
	});
	$(".box_list").on("mouseleave",function(){
		hotellist = setInterval(move,50);
		$(".box_list .btn_prev").removeClass("on");
		$(".box_list .btn_next").removeClass("on");
	});

	$(".list_hotel li").on("mouseenter",function(){
		$(this).children(".tit_hotel").addClass("on");
	});
	$(".list_hotel li").on("mouseleave",function(){
		$(".list_hotel li .tit_hotel").removeClass("on");
	});

	$(".box_list .btn_prev").on("click",function(e){
		e.preventDefault();
		$(".list_hotel li").first().appendTo(".list_hotel");
	});
	$(".box_list .btn_next").on("click",function(e){
		e.preventDefault();
		$(".list_hotel li").last().prependTo(".list_hotel");
	});

	//호텔 클릭 시 ajax로 호텔 정보 호출
	$(".list_hotel li").on("click",function(e){
		e.preventDefault();
		$(".con_hotel .dec_hotel").remove();
		popHotel();
		
		var target = $(this).children("a").attr("href");

		$.ajax({
			url : target,	
			beforeSend : function(){
				//데이터가 불러오기전 실행할 구문
			},
			success : function(data){
				$(".dec_hotel .dec_con").hide();	
				$(".dec_hotel .dec_con").html(data);
				$(".dec_hotel .dec_con").stop().fadeIn();
			},
			error : function(){
				//데이터 불러오기 실패했을때 실행할 구문
			}		
		});


	});

	$("body").on("click",".btn_close",function(){
		$(this).parent(".dec_hotel").stop().fadeOut(600,function(){
			$(".con_hotel .dec_hotel").remove();
		});
	});

	function popHotel (){
		var tags = '<div class="dec_hotel"><div class="dec_con"></div><span class="btn_close">Close</span></div>'
		$(tags).appendTo(".con_hotel");
		$(".dec_hotel").stop().fadeIn();
	}

});




