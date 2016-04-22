$(function(){
	subcategoryList();
	fetchCompleteSubcategoryGames();
	favorite();
	searchGames();
	addEvent();
	search();
	initDownloadBtn();
	initCsBtn();
	initPrize();
	banner.init();
	banner.createKnob();
	banner.timeout = setInterval(function(){
		banner.timing();
	}, banner.secound);
	
	// setInterval(function(){banner.timing();},300);

	jackpotList.getJackpot();
	jackpotList.interval = setInterval(function(){
	 	jackpotList.getJackpot();
	}, jackpotList.intervalTime);
 	jackpotList.beginAdd();

 	//活动切换
 	activity.timeout = setTimeout(function(){
	 	activity.change(2);
 	}, activity.duration);

 	//中奖弹窗
 	setTimeout(function(){
		// prize.getPrize(3);
	},5 * 1000);
 	setInterval(function(){
		// prize.getPrize(3);
	},60 * 1000);

	    $(".gi_img img").unveil(0, function() {
        $(this).load(function() {
            this.style.opacity = 1;
        });
    });
});

function subcategoryList() {
	$('.category-btn').click(function() {
		$('#no_result').text('');
		var category = $(this).data('category');
		$('.subcategory-list').hide();
		$('div[data-subcategory-list='+category+']').show();
	});
}

function fetchCompleteSubcategoryGames() {
	$('.subcategory-list button').click(function() {
		var subcategoryName = $(this).data('target');
		var allBtn = $(this).hasClass('all-subcategory') ? true : false;
		var isInSubcategory = [];
		$('.g_game').each(function() {
				if(subcategoryName == $(this).data('tag')) {
					isInSubcategory.push($(this).find('.g_name span').text());
				}
			(subcategoryName == $(this).data('all-subcategory')) ? $(this).show() :		$(this).hide();
		});
		if(allBtn == false) {
			isInSubcategory.length ? $('#no_result').text('') : $('#no_result').text('No Results Found.');
		}
	});
}

function favorite() {
	var favoritesViewActivated = false;
	function setFavorite(tempArrayParams,_self) {
		//Get the game-id to be pushed into the cookie
		var gameId = _self.parent().data('game-id');
		if(_self.hasClass('heartful')) {
			var filter = tempArrayParams.filter(function(game) { return game != gameId; });
			// update the global tempArray for cookie
			tempArray = filter;
			_self.removeClass('heartful');
			_self.parent().removeClass('favorite');
		} else {
			tempArrayParams.push(gameId);
			_self.addClass('heartful');
			_self.parent().addClass('favorite');
		}
	}

	//Check if Cookie Favorite_Games exists
	if (document.cookie.indexOf('favorite_games') != -1) {
		//Remove the square brackets from cookies.get returning string [1,2,3] => 1,2,3 then split to become array
		var arrCookie = Cookies.get('favorite_games').replace(/[\[\]']+/g,'').split(',').map(function(game) {
			return parseInt(game);
		});
		var tempArray = arrCookie.filter(function(item, pos) { return arrCookie.indexOf(item) == pos; });
		$('.g_game').each(function(){
			var gameId = $(this).data('game-id');
			if(arrCookie.indexOf(gameId) != -1) {
				$(this).addClass('favorite');
				$(this).find('.heartless').addClass('heartful');
			}
		});
	} else {
		//if Cookie doesn't exists create a dummy array to store the id's
	 	var tempArray = [];
	}

	$('.heartless').click(function() {
		(favoritesViewActivated == true)
		?	(setFavorite(tempArray, $(this)),
			$('#favorites').trigger('click'))
		:	setFavorite(tempArray, $(this));
				// Cookie expires in 1 day
		Cookies.set('favorite_games', tempArray,{ expires: 1 });
	});

	//Check if favorites view is active
	$('.category-btn').click(function() {
		favoritesViewActivated = false;
	});

	//Check if favorites view is active
	$('#favorites').click(function() {
		favoritesViewActivated = true;
		$('.g_game').each(function(){
			$(this).show();
		});
		$('.g_game:not(.g_game.favorite)').each(function() {
			$(this).hide();
		});
	});
}

function searchGames() {
	$("#search_game").keyup(function(evt){
		var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
    if(keyCode == 13){
    	var searchNotFound = false;
    	var searchTxt = $(this).val();
    	$('.g_game').each(function(){
    		if(searchTxt == '') {
    			$(this).show();
    		}
    		var gameName = $(this).find('.g_name span').text().toLowerCase();
    		var regex = new RegExp(searchTxt.toLowerCase(), 'g');
    		var isFound = gameName.match(regex);
    		(isFound == null) 
    			?	$(this).hide()
    			: (searchNotFound = true,$(this).show());
			});
			searchNotFound ? $('#no_result').text('') : $('#no_result').text('No Results Found.');
    }
	});
}

function addEvent(){
    //点击游戏
    $("body").on("click", ".g_picture, .g_name, .g_item, .dl_btn, .gbit_ad, .gbib_tips", function() {
    	if($(this).hasClass('g_big')){
    		return;
    	}
	    var code = $(this).attr("code");
	    if(code == "dl_mg_mobile") {
            var buttons = { "我知道了":function () { dialog.close(); }  };
            dialog.info("提示", "<img class=\"code\" src=\"imgs/mg-mobile.png\" border=\"none\" width=\"200\" height=\"200\"><br/> 使用微信、QQ或微博扫描二维码<br/>登录时，请在您的用户名(test)前加 <span style=\"color:red;\">"+_userNamePrefix+"</span> 例 \"<span style=\"color:red;\">"+_userNamePrefix+"test</span>\"<br />",buttons);
            return;
	    }
    	var liveGame = false;
    	if(code == "MPBaccarat" || code == "Roulette" || code == "MPBlackjack" || code == "Baccarat"  || code == "MPRoulette" || code == "MPPlayboy" || code == "SPPlayboy" || code == "MPCasinoHoldem" || code == "SPCasinoHoldem" ) {
    		liveGame = true;
    	}
        var url = "http://cache.download.banner.mightypanda88.com/flash/41/launchcasino.html?game=" + code + "&liveGame=" + liveGame;
        window.open(url, "_blank", "width=950, height=750, fullscreen=1, location=0, toolbar=0, menubar=0");
    });
    
    /*
    $("body").on("click", ".dl_btn", function() {
	    var code = $(this).attr("code");
    	var liveGame = false;
    	if(code == "MPBaccarat" || code == "Roulette" || code == "MPBlackjack" || code == "Baccarat"  || code == "MPRoulette" || code == "MPPlayboy" || code == "SPPlayboy") {
    		liveGame = true;
    	}
        var url = "/redirectToGame?gameId=" + code + "&liveGame=" + liveGame;
        window.open(url, "_blank", "width=950, height=750, fullscreen=yes, location=no, toolbar=no");
    });
    */

    /*
    $(".gbit_ad").click(function() {
    	var code = $(this).attr("code");
    	// var url = "http://cache.download.banner.mightypanda88.com/casinoclient.html?game=" + code + "&language=ZH-CN&nolobby=1";
    	// window.open(url, "", "depended=yes,height=600,width=800");
    	var num = "";
    	if(code == "bob"){
			num = 66;    		
    	}else if(code == "sfh"){
    		num = 65;
    	}else if(code == "zcjb"){
    		num = 64;
    	}

    	window.location.href="/zh-cn/promotions/promotions.aspx#PROMOTION."+num;
    });
    */

    //鼠标进入图标
    $("body").on("mouseenter", ".g_item", function(){
    	changeEnter("enter", $(this));
    });
    //鼠标离开图标
    $("body").on("mouseleave", ".g_item", function(){
    	changeEnter("leave", $(this));
    });

	$(".g_tp_item").click(function(){
		selectType(this);
		search();
	});
	$("[betSlt]").click(function(){
		selectBet(this);
		search();
	});
	$("[lineSlt]").click(function(){
		selectLine(this);
		search();
	});
	//style
	$("[disStyle]").click(function(){
		selectStyle(this);
		search();
	});
	//diffculty
	$("[diffType]").click(function(){
		selectDiff(this);
		search();
	});
	
	//切换活动
	$(".gbit_cgi").click(function(){
		var index =  $(this).attr("index");
		activity.change(index);
	});

	$(".gtp_close").click(function(){
		prize.hiddPrize();
	});
}

//类别选择
function selectType(type){
	var $this = $(type);
	$(".g_tp_item").attr("typeSlt",0);
	$(".g_tp_item").removeClass("t_slt");	

	$this.attr("typeSlt",1);
	$this.addClass("t_slt");
}

//限额选择
function selectBet(bet){
	var $this = $(bet);
	$("[betSlt]").attr("betSlt",0);
	$("[betSlt]").removeClass("t_slt");	
	
	$this.attr("betSlt",1);
	$this.addClass("t_slt");	
}

//线数选择
function selectLine(line){
	var $this = $(line);
	$("[lineSlt]").attr("lineSlt",0);
	$("[lineSlt]").removeClass("t_slt");	
	
	$this.attr("lineSlt",1);
	$this.addClass("t_slt");
}
//风格选择
function selectStyle(style){
	var $this = $(style);
	
	$("[styleSlt]").attr("styleSlt",0);
	$("[styleSlt]").removeClass("t_slt");	
	
	$this.attr("styleSlt",1);
	$this.addClass("t_slt");
	/*
	if($this.attr("disStyle") == "all"){
		$("[disStyle]").attr("styleSlt",0);
		$("[disStyle]").removeClass("t_slt");
		
		$("[disStyle='all']").attr("styleSlt",1);
		$("[disStyle='all']").addClass("t_slt");
	}else{
		$("[disStyle='all']").attr("styleSlt",0);
		$("[disStyle='all']").removeClass("t_slt");
		
		if($this.attr("styleSlt") == 1){
			$this.attr("styleSlt",0);
			$this.removeClass("t_slt");
			
			if($("[styleSlt='1']").length == 0){
				$("[disStyle='all']").attr("styleSlt",1);
				$("[disStyle='all']").addClass("t_slt");
			}
		}else{
			$this.attr("styleSlt",1);
			$this.addClass("t_slt");
		}
		
	}*/
}

//难度选择
function selectDiff(diff){
	var $this = $(diff);
	if($this.attr("diffType") == "all"){
		$("[diffType]").attr("diffSlt",0);
		$("[diffType]").removeClass("t_slt");
		
		$("[diffType='all']").attr("diffSlt",1);
		$("[diffType='all']").addClass("t_slt");
	}else{
		$("[diffType='all']").attr("diffSlt",0);
		$("[diffType='all']").removeClass("t_slt");
		
		if($this.attr("diffSlt") == 1){
			$this.attr("diffSlt",0);
			$this.removeClass("t_slt");
			
			if($("[diffSlt='1']").length == 0){
				$("[diffType='all']").attr("diffSlt",1);
				$("[diffType='all']").addClass("t_slt");
			}
		}else{
			$this.attr("diffSlt",1);
			$this.addClass("t_slt");
			
			/* 全选转换
			if($("[diffSlt='1']").length == 5){
				$("[diffType]").attr("diffSlt",0);
				$("[diffType]").removeClass("t_slt");
				
				$("[diffType='all']").attr("diffSlt",1);
				$("[diffType='all']").addClass("t_slt");
			}
			*/
		}
	}
}

//查找游戏
function search(){
	//筛选条件
	var data = {};
	
	if($("[typeSlt='1']").attr("typeId") != 0){
		data.search_EQ_category = $("[typeSlt='1']").attr("typeId");
	}
	if($("[betSlt='1']").attr("gamecategory") != 0){
		data.search_EQ_gameCategory = $("[betSlt='1']").attr("gamecategory");
	}
	if($("[lineSlt='1']").attr("lineValue") != 0){
		data.search_GTE_subCategory = $("[lineSlt='1']").attr("lineValue");
		
		if($("[lineSlt='1']").next("div"))
			{
				data.search_LT_subCategory = $("[lineSlt='1']").next("div").attr("lineValue");
			}
	}
	
	if($("[disStyle='all']").attr("styleSlt") == 0){
		if($("[disStyle='HD']").attr("styleSlt") == 1) {
			data.search_EQ_hd = true; 
		}
		if($("[disStyle='anime']").attr("styleSlt") == 1) {
			data.search_EQ_anime = true; 
		}
		if($("[disStyle='game']").attr("styleSlt") == 1) {
			data.search_EQ_game = true; 
		}
		if($("[disStyle='girl']").attr("styleSlt") == 1) {
			data.search_EQ_girl = true; 
		}
		if($("[disStyle='other']").attr("styleSlt") == 1) {
			data.search_EQ_otherStyle = true; 
		}
	}
	
//	if($("[diffType='all']").attr("diffSlt") == 0){
//		data.IsSmall = $("[diffType='small']").attr("diffSlt");
//		data.IsMedium = $("[diffType='medium']").attr("diffSlt");
//		data.IsBig = $("[diffType='big']").attr("diffSlt");
//	}

	// $.ajax({
	// 	type:"GET",
	// 	url:"/gameInfo",
	// 	cache:false,
	// 	dataType:"json",
	// 	data:data,
	// 	success:function(res){
	// 		if(res) {
	// 			createHtml(res);
	// 		}
	// 	}
	// });
	
	
}

//生成HTML
function createHtml(json){
	var gameHtml = "";
	for(var i = 0; i < json.length; i++){
		var game = json[i];
		gameHtml += '<div class="g_game">';
		gameHtml += '	<div class="g_picture" code="'+game.automModuleCode+'">';
		gameHtml += '		<div class="g_p_bg">';
		gameHtml += '			<img class="g_img" data-src="imgs/'+game.automModuleCode+'.png" />';
		gameHtml += '		</div>';
		gameHtml += '		<div class="'+game.g_movie+'"></div>';
		gameHtml += '		<div class="'+game.g_hd+'"></div>';
		gameHtml += '		<div class="g_p_style">';
		gameHtml += '			<div class="'+game.g_auto+'"></div>';
		gameHtml += '			<div class="'+game.g_anime+'"></div>';
		gameHtml += '			<div class="'+game.g_girl+'"></div>';	
		gameHtml += '		</div>';
		gameHtml += '	</div>';
		gameHtml += '	<div class="g_name">';
		gameHtml += '		<span code="trm">'+game.gameName+'</span>';
		gameHtml += '	</div>';
		gameHtml += '</div>';
	}
	$("#result").html(gameHtml);
	   $(".g_img").unveil(0, function() {
        $(this).load(function() {
            this.style.opacity = 1;
        });
    });
}

function initDownloadBtn(){
	var winWidth =$(this).width();
	var right = 0;
	if(winWidth <= 1030 + 280){
		right = winWidth-140;
	}else{
		right = (winWidth+1030)/2;
	}
	$(".gt_download").css({"right":right+"px","display":"block"});
}

function initCsBtn(){
	var winWidth =$(this).width();
	var left = 0;
	if(winWidth <= 1030 + 100){
		left = winWidth-100;
	}else{
		left = (winWidth+1030 + 20)/2;
	}
	// $(".gt_cs").css({"left":left+"px","display":"block"});
}

function initPrize(){
	var winWidth =$(this).width();
	var left = 0;
	if(winWidth <= 1030 + 230*2){
		// left = winWidth-100;
		$(".gt_prize").css({"right":20+"px"});
	}else{
		left = (winWidth+1030 + 10)/2;
		$(".gt_prize").css({"left":left+"px"});
	}
}


//广告图
var banner={
	"size":3,
	"timeout":null,
	"secound":100,
	"secondTime":0,
	"maxSecond":100,
	"dateStamp":"1031",
	"init":function(){
		var $this = this;
		for(var i =0; i < $this.size; i++){
			var isShow = i == 0 ? 1 : 0;
			var cssstr = i == 0 ? "on" :"";
			var stylestr = i == 0 ? "opacity:1;  filter:alpha(opacity=100); " : "";
			var imgstr = "<div class='gt_img' showindex='"+(i+1)+"' style='background:url(imgs/bn"+(i+1)+".jpg?"+$this.dateStamp+") no-repeat center;"+stylestr+"'></div>";
			var ctrlstr = "<div class='gt_icon "+cssstr+"' onCtrl='"+isShow+"' ctrlindex='"+(i+1)+"' style='background:url(imgs/bni"+(i+1)+".png?"+$this.dateStamp+") no-repeat;'><input type='text' id='kb"+(i+1)+"' class='ctc_btn'/></div>";
			$(".gt_binner").append(imgstr);
			$(".gt_bnctrl").append(ctrlstr);
		}

		$(".gt_icon").unbind().click(function(){
			var nextId = $(this).attr("ctrlindex");
			banner.clickChange(nextId);
		});
	},
	"changeImg":function(nextId){
		var $this = this;
		if($this.timeout != null){
			clearInterval($this.timeout);
			$this.timeout = null;
		}

		var currentId = $("[onctrl='1']").attr("ctrlindex");
		//change pointer
		$("[ctrlindex='"+currentId+"']").removeClass("on");
		$("[ctrlindex='"+nextId+"']").addClass("on");
		$("[ctrlindex='"+currentId+"']").attr("onctrl", "0");
		$("[ctrlindex='"+nextId+"']").attr("onctrl","1");

		//隐藏按钮
		$("[for_index]").css({"display":"none"});
		//隐藏按钮 end
		//change background
		$("[showindex='"+currentId+"']").stop(true, false).animate({"opacity":0}, 700, "easeOutCubic",function(){
	//显示按钮
			$("[for_index]").each(function(index, element){
				var imgIndex = $(element).attr("for_index");
				if(imgIndex == nextId){
					$(element).css({"display":"block"});
				}
			});
	//显示按钮end
		});
		$("[showindex='"+nextId+"']").stop(true,false).animate({"opacity":1}, 700, "easeOutCubic",function(){
			
		});
		$this.timeout = setInterval(function(){
			$this.timing();
		}, $this.secound);	
	},
	"nextBackground":function(){
		var $this = this;
		var currentId = $("[onctrl='1']").attr("ctrlindex");
		currentId = parseInt(currentId, 10);
		var next = currentId % $this.size + 1;
		$this.changeImg(next);
	},
	"createKnob":function(){
		var $this = this;
		for(var i = 1; i <=$this.size; i++ ){
			$("#kb"+i).knob({
				"width":40,
				'min':0,
				'max':$this.maxSecond,
				"displayInput":false,
				"displayPrevious":true,
				"thickness":".1",
				"fgColor":"#3cd2f5",
				"bgColor":"none",
				"readOnly":true
			});
		}
	
	},
	"timing":function(){
		var $this = this;
		var showIndex = $("[onctrl='1']").attr("ctrlindex");
		showIndex = parseInt(showIndex,10);
		var next;
		next = showIndex%$this.size + 1;
		
		if($this.secondTime == $this.maxSecond){
			$this.secondTime=0;
			$("#kb"+showIndex).val(0).trigger('change');
			//changeImg("right");
			$this.changeImg(next);
		}else{
			$this.setKnobValue("kb"+showIndex);
		}
	},
	"clickChange":function(next){
		var $this = this;
		var showIndex = $("[onctrl='1']").attr("ctrlindex");
		$this.secondTime=0;
		$("#kb"+showIndex).val(0).trigger('change');
		$this.changeImg(next);
	},
	"setKnobValue":function(id){
		var $this = this;
		$("#"+id).val($this.secondTime).trigger('change');
		$this.secondTime++;
	}
} 

//活动
var activity = {
	"index":0,
	"size":3,
	"timeout":null,
	"duration":10000,
	"change" : function(num){
		var $this = this;
		if($this.timeout != null){
			clearTimeout($this.timeout);
			$this.timeout = null;
		}
		$("[index='"+$this.index+"']").removeClass("c");
		$("[index='"+num+"']").addClass("c");
		var left = -$(".gbit_ad").width() * num;
		$(".gbit_bg").stop(true,false).animate({"left":left + "px"},650,"easeInOutCubic",function(){
			$(".gbib_tips").each(function(index, element){
				if(index == num){
					$(element).css({"display":"block"});
				}else{
					$(element).css({"display":"none"});
				}
			});
		});	
		$this.index = num;
		$this.timeout = setTimeout(function(){
			$this.change(($this.index + 1)%$this.size);
		}, $this.duration);

	}
}

//切换游戏入口
function changeEnter(type, $this){
	if(type == "enter"){
		$this.find(".gi_b_df").stop(true,false).animate({"opacity": 0}, 50, function() {
			$(this).css({"display":"none"});
			$this.find(".gi_b_play").css({"display":"block"});
			$this.find(".gi_b_play").animate({"opacity": 1}, 100, function() {
			});
		});
	}else if(type == "leave"){
		$this.find(".gi_b_play").stop(true,false).animate({"opacity": 0}, 50, function() {
			$(this).css({"display":"none"});
			$this.find(".gi_b_df").css({"display":"block"});
			$this.find(".gi_b_df").animate({"opacity": 1}, 100, function() {
			});
		});
	}
}


//奖池动画
function Jackpot(){
	this.option = {
		"code" : "",
		"targetNum":0,
		"currentNum":0,
		"coefficient":0.85,
		"all_cfct":100,
		"all_cfct2":200,
		"addInt":10,
		"initNum":0,
		"duration":3500,
		"easing":"easeOutQuart",
		"isTotal":false,
		"timeout": null
	};
	this.init = function(setOption){
		var $this = this;
		if(setOption != null){
			this.option = $.extend({},this.option, setOption);
		}
		if(this.option.isTotal){
			this.option.targetNum = this.option.targetNum * this.option.all_cfct;
			this.option.initNum = Math.round(this.option.coefficient * this.option.targetNum); 

		}else{
			this.option.initNum = Math.round(this.option.coefficient * this.option.targetNum); 
		}
		this.option.currentNum = this.option.initNum;
		$("[for_code='"+$this.option.code+"']").css({"opacity":1});

		var objHtml = "<div class='hs_obj' num_code='"+ $this.option.code +"'><div></div></div>";
		$(".hidd_scroll").append(objHtml);
		$("[num_code='"+ $this.option.code +"']").scroll(function(){
			$this.changeNum();
		});
	};
	this.splitNum = function(num){
		var maxLength = 0;
		if(this.option.isTotal){
			maxLength = 11;
		}else{
			maxLength = 9;
		}
		num = Math.round(num) + "";
		if(num.length < maxLength){
			var preNum = "";
			for(var i = 0; i < (maxLength - num.length); i++){
				preNum += "0";
			}
			num = preNum + num;
		}
		return num.split("");
	};
	this.start = function(){
		var $this = this;
		var value = this.option.targetNum - this.option.initNum;

		var targetNumList = $this.splitNum($this.option.targetNum);
		var isOpacity = true;

		$("[for_code='"+$this.option.code+"']").find(".num").each(function(index, element){
			if(isOpacity){
				if(targetNumList[index] != "0"){
					$(element).css({"opacity":1});
					isOpacity = false;
				}else{
					if(index == 2){
						$("[for_code='"+$this.option.code+"']").find(".comma:first").css({"opacity":0});
					}
					$(element).css({"opacity":0});
				}
			}else{
				$(element).css({"opacity":1});
			}
		});
		// $("[for_code='"+$this.option.code+"']").find(".num").css({"opacity":0});					//设置透明
		$("[num_code='"+ this.option.code +"']").stop(true, true).animate({"scrollTop":value},$this.option.duration,$this.option.easing,function(){
		});
	};
	this.changeNum = function(){
		var $this = this;
		var value = $("[num_code='"+ $this.option.code +"']").scrollTop();
		$this.option.currentNum = $this.option.initNum + value;
		// var targetNumList = $this.splitNum($this.option.targetNum);			
		var numList = $this.splitNum($this.option.currentNum);
		// var isOpacity = true;
		$("[for_code='"+$this.option.code+"']").find(".num").each(function(index, element){
			
			
				
			$(element).find('.txt').html(numList[index]);
		});
	};
	this.update = function(setOption){
		this.option = $.extend({},this.option, setOption);
	};
	this.addNum = function(){
		var $this = this;
		$this.option.timeout = null;

		var setOption ={
			"duration":4000,
			"easing":"linear"
		};
		$this.option = $.extend({},$this.option, setOption);
		$this.option.targetNum = $this.option.targetNum + $this.option.addInt;
		if($this.option.isTotal){
			$this.option.targetNum = $this.option.targetNum + $this.option.addInt * $this.option.all_cfct2;
		} 
		$this.start();
		$this.option.timeout = setTimeout(function(){
			$this.addNum();
		}, $this.option.duration);
	};
	return this;
}

var jackpotList = {
	"list":null,
	"games":[],
	"gamesStr":[],
	"interval":null,
	"intervalTime":600000,
	"map":{
		"all_game":["all_game"],
		"hb":["ls"],
		"ct":["ls"],
		"dt":["ls"],
		"dlm":["ls"],
		"fbr":["ls"],
		"fow":["ls"],
		"gos":["ls"],
		"hk":["ls"],
		"lm":["ls"],
		"sib":["ls"],
		"ges":["ls"],
		"ts":["ls"],
		"bld":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"bld50":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"drd":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"elr":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"fnf":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"ghr":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"irm3":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"irmn3":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"irm50":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"hlk2":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"hlk50":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"trm":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"cam":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"spidc":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"avng":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"wvm":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"xmn":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"xmn50":["mrj-1","mrj-2","mrj-3","mrj-4"],
		"qbd":["drts1","drts2","drts3","drts4"],
		"pnp":["adv-2","adv-3"],
		"ghlj":["ghlj1","ghlj2","ghlj3","ghlj4"],
		"sc":["sc1","sc2","sc3","sc4"],
		"bl":["bl"],
		"car":["car"],
		"evj":["evjj-1"],
		"fmn":["fmn1"],
		"glr":["glrjj-1"],
		"bls":["bls"],
		"pbj":["pbj"],
		"str":["str_sb"],
		"str":["str_sb"],
		"str":["str_sb"],
		"wsffr":["wsffr"],
		"cifr":["cifr"],
		"gs":["gs2"],
		"grel":["grel"],
		"jb10":["jb10p"],
		"ms":["ms1","ms2","ms3","ms4"],
		"pba":["pba_sb1"],
		"plba":["plba_sb1"],
		"qop":["qop1"],
		"cwc":["wc3","wc4"]
	},
	"jackpotObj":null,
	"getJackpot":function(func){
		var $this = this;
		rs = {"Message":null,"Error":0,"Currency":"cny","PlayerGroup":0,"CurrentBet":0.0,"Balance":0.0,"TranId":null,"Status":null,"PlaytechUserName":null,"PlaytechPassword":null,"Amount":"92043276.03","Games":[{"Game":"adv-1","GameGroup":"adv-1","Amount":560.12},{"Game":"adv-1","GameGroup":"adv-1","Amount":560.12},{"Game":"adv-2","GameGroup":"adv-2","Amount":1276.28},{"Game":"adv-2","GameGroup":"adv-2","Amount":1276.28},{"Game":"adv-3","GameGroup":"adv-3","Amount":17634.71},{"Game":"adv-3","GameGroup":"adv-3","Amount":17634.71},{"Game":"bl","GameGroup":"bl","Amount":2.191753896E7},{"Game":"bl","GameGroup":"bl","Amount":2.191753896E7},{"Game":"bls","GameGroup":"bls","Amount":199425.91},{"Game":"bls","GameGroup":"bls","Amount":199425.91},{"Game":"ci2","GameGroup":"ci","Amount":111000.0},{"Game":"ci2","GameGroup":"ci","Amount":111000.0},{"Game":"cifr","GameGroup":"cifr","Amount":112929.18},{"Game":"cifr","GameGroup":"cifr","Amount":112929.18},{"Game":"cnpr1","GameGroup":"cnpr","Amount":1294516.24},{"Game":"cnpr1","GameGroup":"cnpr","Amount":1294516.24},{"Game":"cnpr2","GameGroup":"cnpr","Amount":2589032.48},{"Game":"cnpr2","GameGroup":"cnpr","Amount":2589032.48},{"Game":"cnpr3","GameGroup":"cnpr","Amount":6472581.21},{"Game":"cnpr3","GameGroup":"cnpr","Amount":6472581.21},{"Game":"cnpr4","GameGroup":"cnpr","Amount":1.294516242E7},{"Game":"cnpr4","GameGroup":"cnpr","Amount":1.294516242E7},{"Game":"ctivj-1","GameGroup":"ctivj-1","Amount":696751.87},{"Game":"ctivj-1","GameGroup":"ctivj-1","Amount":696751.87},{"Game":"dond_i-1","GameGroup":"dond_i-1","Amount":71219.39},{"Game":"dond_i-1","GameGroup":"dond_i-1","Amount":71219.39},{"Game":"dond_i-2","GameGroup":"dond_i-2","Amount":723924.84},{"Game":"dond_i-2","GameGroup":"dond_i-2","Amount":723924.84},{"Game":"dond_i-3","GameGroup":"dond_i-3","Amount":837964.02},{"Game":"dond_i-3","GameGroup":"dond_i-3","Amount":837964.02},{"Game":"drts1","GameGroup":"drts","Amount":291577.02},{"Game":"drts1","GameGroup":"drts","Amount":291577.02},{"Game":"drts2","GameGroup":"drts","Amount":585654.05},{"Game":"drts2","GameGroup":"drts","Amount":585654.05},{"Game":"drts3","GameGroup":"drts","Amount":1237667.1},{"Game":"drts3","GameGroup":"drts","Amount":1237667.1},{"Game":"drts4","GameGroup":"drts","Amount":1889680.16},{"Game":"drts4","GameGroup":"drts","Amount":1889680.16},{"Game":"esm1","GameGroup":"esm-4","Amount":419689.29},{"Game":"esm1","GameGroup":"esm-4","Amount":419689.29},{"Game":"esm2","GameGroup":"esm-4","Amount":449689.29},{"Game":"esm2","GameGroup":"esm-4","Amount":449689.29},{"Game":"esm3","GameGroup":"esm-4","Amount":499689.29},{"Game":"esm3","GameGroup":"esm-4","Amount":499689.29},{"Game":"esm4","GameGroup":"esm-4","Amount":649689.29},{"Game":"esm4","GameGroup":"esm-4","Amount":649689.29},{"Game":"esmk7","GameGroup":"esmk-1","Amount":154518.6},{"Game":"esmk7","GameGroup":"esmk-1","Amount":154518.6},{"Game":"evjj-1","GameGroup":"evjj-1","Amount":2088886.96},{"Game":"evjj-1","GameGroup":"evjj-1","Amount":2088886.96},{"Game":"fmn1","GameGroup":"fmn","Amount":59217.31},{"Game":"fmn1","GameGroup":"fmn","Amount":59217.31},{"Game":"fnfrj1","GameGroup":"fnfrj","Amount":324529.84},{"Game":"fnfrj1","GameGroup":"fnfrj","Amount":324529.84},{"Game":"fnfrj2","GameGroup":"fnfrj","Amount":649059.69},{"Game":"fnfrj2","GameGroup":"fnfrj","Amount":649059.69},{"Game":"fnfrj3","GameGroup":"fnfrj","Amount":1622649.22},{"Game":"fnfrj3","GameGroup":"fnfrj","Amount":1622649.22},{"Game":"fnfrj4","GameGroup":"fnfrj","Amount":3245298.43},{"Game":"fnfrj4","GameGroup":"fnfrj","Amount":3245298.43},{"Game":"ghlj1","GameGroup":"ghlj","Amount":4711.03},{"Game":"ghlj1","GameGroup":"ghlj","Amount":4711.03},{"Game":"ghlj2","GameGroup":"ghlj","Amount":9447.07},{"Game":"ghlj2","GameGroup":"ghlj","Amount":9447.07},{"Game":"ghlj3","GameGroup":"ghlj","Amount":18894.13},{"Game":"ghlj3","GameGroup":"ghlj","Amount":18894.13},{"Game":"ghlj4","GameGroup":"ghlj","Amount":47235.33},{"Game":"ghlj4","GameGroup":"ghlj","Amount":47235.33},{"Game":"glrjj-1","GameGroup":"glrjj-1","Amount":1.073431001E7},{"Game":"glrjj-1","GameGroup":"glrjj-1","Amount":1.073431001E7},{"Game":"gr3","GameGroup":"gr","Amount":600000.0},{"Game":"gr3","GameGroup":"gr","Amount":600000.0},{"Game":"grel","GameGroup":"grel","Amount":2836547.68},{"Game":"grel","GameGroup":"grel","Amount":2836547.68},{"Game":"gs2","GameGroup":"gs","Amount":253011.69},{"Game":"gs2","GameGroup":"gs","Amount":253011.69},{"Game":"gtscirsj-1","GameGroup":"gtscirsj-1","Amount":16996.82},{"Game":"gtscirsj-1","GameGroup":"gtscirsj-1","Amount":16996.82},{"Game":"jb10p","GameGroup":"jb10p","Amount":20537.63},{"Game":"jb10p","GameGroup":"jb10p","Amount":20537.63},{"Game":"ls","GameGroup":"ls","Amount":414588.65},{"Game":"ls","GameGroup":"ls","Amount":414588.65},{"Game":"lvb-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb1-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb1-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb10-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb10-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb11-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb11-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb12-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb12-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb13-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb13-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb14-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb14-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb2-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb2-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb3-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb3-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb4-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb4-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb5-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb5-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb6-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb6-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb7-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb7-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb8-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb8-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb9-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"lvb9-1","GameGroup":"lvb-1","Amount":70012.53},{"Game":"mj1","GameGroup":"mj","Amount":4118.21},{"Game":"mj1","GameGroup":"mj","Amount":4118.21},{"Game":"mrj-1","GameGroup":"mrj-1","Amount":912.79},{"Game":"mrj-1","GameGroup":"mrj-1","Amount":912.79},{"Game":"mrj-2","GameGroup":"mrj-2","Amount":11348.94},{"Game":"mrj-2","GameGroup":"mrj-2","Amount":11348.94},{"Game":"mrj-3","GameGroup":"mrj-3","Amount":252535.9},{"Game":"mrj-3","GameGroup":"mrj-3","Amount":252535.9},{"Game":"mrj-4","GameGroup":"mrj-4","Amount":4682380.4},{"Game":"mrj-4","GameGroup":"mrj-4","Amount":4682380.4},{"Game":"ms1","GameGroup":"ms","Amount":30260.99},{"Game":"ms1","GameGroup":"ms","Amount":30260.99},{"Game":"ms2","GameGroup":"ms","Amount":121103.97},{"Game":"ms2","GameGroup":"ms","Amount":121103.97},{"Game":"ms3","GameGroup":"ms","Amount":605519.84},{"Game":"ms3","GameGroup":"ms","Amount":605519.84},{"Game":"ms4","GameGroup":"ms","Amount":60401.98},{"Game":"ms4","GameGroup":"ms","Amount":60401.98},{"Game":"mysr-1","GameGroup":"mysr-1","Amount":700.13},{"Game":"mysr-1","GameGroup":"mysr-1","Amount":700.13},{"Game":"mysr-2","GameGroup":"mysr-2","Amount":17503.13},{"Game":"mysr-2","GameGroup":"mysr-2","Amount":17503.13},{"Game":"mysr-3","GameGroup":"mysr-3","Amount":175031.33},{"Game":"mysr-3","GameGroup":"mysr-3","Amount":175031.33},{"Game":"nbl","GameGroup":"nbl","Amount":200012.4},{"Game":"nbl","GameGroup":"nbl","Amount":200012.4},{"Game":"ngrel","GameGroup":"ngrel","Amount":20002.71},{"Game":"ngrel","GameGroup":"ngrel","Amount":20002.71},{"Game":"pba_sb1","GameGroup":"pba_sb","Amount":120838.87},{"Game":"pba_sb1","GameGroup":"pba_sb","Amount":120838.87},{"Game":"pba_sb2","GameGroup":"pba_sb","Amount":241677.74},{"Game":"pba_sb2","GameGroup":"pba_sb","Amount":241677.74},{"Game":"pba_sb3","GameGroup":"pba_sb","Amount":604194.36},{"Game":"pba_sb3","GameGroup":"pba_sb","Amount":604194.36},{"Game":"pbj","GameGroup":"pbj","Amount":697012.12},{"Game":"pbj","GameGroup":"pbj","Amount":697012.12},{"Game":"pbj_mh5","GameGroup":"pbj","Amount":697012.12},{"Game":"pbj_mh5","GameGroup":"pbj","Amount":697012.12},{"Game":"pbj_mp","GameGroup":"pbj","Amount":697012.12},{"Game":"pbj_mp","GameGroup":"pbj","Amount":697012.12},{"Game":"phot1","GameGroup":"phot-4","Amount":261144.41},{"Game":"phot1","GameGroup":"phot-4","Amount":261144.41},{"Game":"phot2","GameGroup":"phot-4","Amount":291144.41},{"Game":"phot2","GameGroup":"phot-4","Amount":291144.41},{"Game":"phot3","GameGroup":"phot-4","Amount":341144.41},{"Game":"phot3","GameGroup":"phot-4","Amount":341144.41},{"Game":"phot4","GameGroup":"phot-4","Amount":491144.41},{"Game":"phot4","GameGroup":"phot-4","Amount":491144.41},{"Game":"photk9","GameGroup":"photk-1","Amount":21464.89},{"Game":"plba_sb1","GameGroup":"plba_sb","Amount":310277.93},{"Game":"plba_sb2","GameGroup":"plba_sb","Amount":695555.87},{"Game":"plba_sb3","GameGroup":"plba_sb","Amount":1551389.67},{"Game":"plba_sb4","GameGroup":"plba_sb","Amount":3102779.35},{"Game":"qop1","GameGroup":"qop","Amount":183079.42},{"Game":"qop2","GameGroup":"qop","Amount":305265.7},{"Game":"sc1","GameGroup":"sc","Amount":21750.6},{"Game":"sc2","GameGroup":"sc","Amount":87122.42},{"Game":"photk9","GameGroup":"photk-1","Amount":21464.89},{"Game":"sc3","GameGroup":"sc","Amount":435612.09},{"Game":"plba_sb1","GameGroup":"plba_sb","Amount":310277.93},{"Game":"sc4","GameGroup":"sc","Amount":43561.21},{"Game":"plba_sb2","GameGroup":"plba_sb","Amount":695555.87},{"Game":"sol-1","GameGroup":"sol-1","Amount":1193.45},{"Game":"plba_sb3","GameGroup":"plba_sb","Amount":1551389.67},{"Game":"sol-2","GameGroup":"sol-2","Amount":11424.47},{"Game":"plba_sb4","GameGroup":"plba_sb","Amount":3102779.35},{"Game":"sol-3","GameGroup":"sol-3","Amount":3943.32},{"Game":"qop1","GameGroup":"qop","Amount":183079.42},{"Game":"sol-4","GameGroup":"sol-4","Amount":15441.68},{"Game":"qop2","GameGroup":"qop","Amount":305265.7},{"Game":"sol-5","GameGroup":"sol-5","Amount":66854.29},{"Game":"sc1","GameGroup":"sc","Amount":21750.6},{"Game":"sol-6","GameGroup":"sol-6","Amount":30377.7},{"Game":"sc2","GameGroup":"sc","Amount":87122.42},{"Game":"spmj-1","GameGroup":"spmj-1","Amount":1722.59},{"Game":"sc3","GameGroup":"sc","Amount":435612.09},{"Game":"spmj-2","GameGroup":"spmj-2","Amount":1.668856656E7},{"Game":"sc4","GameGroup":"sc","Amount":43561.21},{"Game":"str_sb","GameGroup":"str_sb","Amount":227912.24},{"Game":"sol-1","GameGroup":"sol-1","Amount":1193.45},{"Game":"vpcj-1","GameGroup":"vpcj-1","Amount":3094.36},{"Game":"sol-2","GameGroup":"sol-2","Amount":11424.47},{"Game":"vpcj-2","GameGroup":"vpcj-2","Amount":40467.47},{"Game":"sol-3","GameGroup":"sol-3","Amount":3943.32},{"Game":"wc1","GameGroup":"wc","Amount":50000.0},{"Game":"sol-4","GameGroup":"sol-4","Amount":15441.68},{"Game":"wc2","GameGroup":"wc","Amount":90000.0},{"Game":"sol-5","GameGroup":"sol-5","Amount":66854.29},{"Game":"wc3","GameGroup":"wc","Amount":310668.86},{"Game":"sol-6","GameGroup":"sol-6","Amount":30377.7},{"Game":"wc4","GameGroup":"wc","Amount":776672.15},{"Game":"spmj-1","GameGroup":"spmj-1","Amount":1722.59},{"Game":"wsf1","GameGroup":"wsf","Amount":11250.0},{"Game":"spmj-2","GameGroup":"spmj-2","Amount":1.668856656E7},{"Game":"wsffr","GameGroup":"wsffr","Amount":201202.39},{"Game":"str_sb","GameGroup":"str_sb","Amount":227912.24},{"Game":"wv_s","GameGroup":"wv_s","Amount":153521.41},{"Game":"vpcj-1","GameGroup":"vpcj-1","Amount":3094.36},{"Game":"vpcj-2","GameGroup":"vpcj-2","Amount":40467.47},{"Game":"wc1","GameGroup":"wc","Amount":50000.0},{"Game":"wc2","GameGroup":"wc","Amount":90000.0},{"Game":"wc3","GameGroup":"wc","Amount":310668.86},{"Game":"wc4","GameGroup":"wc","Amount":776672.15},{"Game":"wsf1","GameGroup":"wsf","Amount":11250.0},{"Game":"wsffr","GameGroup":"wsffr","Amount":201202.39},{"Game":"wv_s","GameGroup":"wv_s","Amount":153521.41},{"Game":"jpgt1-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt2-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt1-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt3-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt2-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt4-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt3-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt5-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt4-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt6-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"jpgt5-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"pyrr7","GameGroup":"pyrr-4","Amount":52168.29},{"Game":"jpgt6-1","GameGroup":"jpgt-1","Amount":3829919.62},{"Game":"pyrr8","GameGroup":"pyrr-4","Amount":70168.29},{"Game":"pyrr9","GameGroup":"pyrr-4","Amount":100168.29},{"Game":"pyrr7","GameGroup":"pyrr-4","Amount":52168.29},{"Game":"pyrr10","GameGroup":"pyrr-4","Amount":190168.29},{"Game":"pyrr8","GameGroup":"pyrr-4","Amount":70168.29},{"Game":"pyrrk7","GameGroup":"pyrrk-1","Amount":181189.14},{"Game":"pyrr9","GameGroup":"pyrr-4","Amount":100168.29},{"Game":"pyrr10","GameGroup":"pyrr-4","Amount":190168.29},{"Game":"pyrrk7","GameGroup":"pyrrk-1","Amount":181189.14},{"Game":"car","GameGroup":"car","Amount":55024.84},{"Game":"car","GameGroup":"car","Amount":55024.84}]};
		if(rs && rs.Games) {
			$this.jackpotObj = rs.Games;
			var game = {"Game":"all_game", "Amount":rs.Amount};
			$this.jackpotObj.push(game);
			$this.setJackpot();
			$this.initJackpot();
			if(func != null){
				func();
			}
		}
		/*$.ajax({
			type:"GET",
			url:"/jackpot",
			cache:false,
			dataType:"json",
			success:function(rs){
				if(rs && rs.Games) {
					$this.jackpotObj = rs.Games;
					var game = {"Game":"all_game", "Amount":rs.Amount};
					$this.jackpotObj.push(game);
					$this.setJackpot();
					$this.initJackpot();
					if(func != null){
						func();
					}
				}
			}
		});*/
	},
	"setJackpot":function(){
		var $this = this;
		$("[for_code]").each(function(index, element){
			var code = $(element).attr("for_code"); 								
			var jackpotCode = $this.map[code][$this.map[code].length - 1];			

			var isExist = false;													
			for(var i = 0; i < $this.gamesStr.length; i++){
				if(jackpotCode == $this.gamesStr[i]){								
					isExist = true;
				}
			}
			if(!isExist){
				$this.gamesStr.push(jackpotCode);									
			}
		});

		if($this.jackpotObj != null && $this.gamesStr.length > 0){
			$this.games = [];
			for(var i = 0; i < $this.jackpotObj.length; i++){
				var game = $this.jackpotObj[i];
				for(var j = 0; j < $this.gamesStr.length; j++){
					if(game.Game == $this.gamesStr[j]){
						$this.games.push(game);
						$this.gamesStr.splice(j,1);
						continue;
					}
				}
			}

		}
	},
	"initJackpot":function(){
		var $this = this;
		var temp = new Jackpot();
		if($this.list == null){
			$this.list = {};
			$("[for_code]").each(function(index, element){
				var code = $(element).attr("for_code"); 
				var jackpotCode = $this.map[code][$this.map[code].length - 1];

				for(var i = 0; i < $this.games.length; i++){
					var game = $this.games[i];
					if(game.Game == jackpotCode){
						var obj = new Jackpot();
						var option = {"targetNum":game.Amount,"code":code};
						if(code == "all_game"){
							option.isTotal = true;
							option.coefficient = 0.999;
						}
						obj.init(option);
						$this.list[code] = obj;
						$this.list[code].start();
					}
				}
			});
		}else{
			for(var o in $this.list){
				var jackpot = $this.list[o];
				var jackpotCode = $this.map[jackpot.option.code][$this.map[jackpot.option.code].length - 1];
				for(var i = 0; i < $this.games.length; i++){
					var game = $this.games[i];
					if(game.game == jackpotCode){
						if (jackpot.option.timeout != null){
							clearTimeout(jackpot.option.timeout);	
							jackpot.option.timeout = null;
						}
						var amount = game.Amount;
						if(jackpot.option.isTotal){
							amount = amount * temp.option.all_cfct;
						}
						var setOption ={
							"targetNum": amount ,
							"duration": temp.option.duration,
							"easing":temp.option.easing
						};
						jackpot.update(setOption);
						jackpot.start();
					}
				}
			}
			$this.beginAdd();
		}
	},
	"beginAdd":function(){
		var $this = this;
		var temp = new Jackpot();
		setTimeout(function(){
			for(var o in $this.list){
				var jackpot = $this.list[o];
				jackpot.addNum();
			}
		},temp.option.duration+200);

		
	}

}

//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// var prize = {

// 	closeTimeout:null,
// 	animateTime:700,
// 	autoCloseTime:1000*15,
// 	updateTime:"",
// 	"getPrize":function(size){
// 		var $this = this;
// 		size == null ? 1 : size;
// 		var time;
// 		$.ajax({
// 			type:"GET",
// 			cache:false,
// 			url:"/prizeList",
// 			dataType:"json",
// 			success:function(rs){
// 				if(rs && rs["0"]) {
// 					$this.createHtml(rs);
// 					$this.showPrize();
// 				}
// 			}
// 		});
// 	},
// 	"createHtml":function(rs){
// 		var $this = this;
// 		for(var o in rs){
// 			var prize = rs[o];
// 			var time = $this.afterTime(prize[0]);
// 			var member = prize[1];
// 			var prizeType = prize[2];
// 			var gameType = prize[3];
// 			var amount = parseFloat(prize[4],10); 
// 			var style = amount >= 2000 ? "red" : "green";
// 			var prizeStr = "";
// 			prizeStr += "<div class='gtp_dt "+style+"'>";
//             prizeStr += "<div class='bg'></div>";
// 			prizeStr += "<div class='txt'>";
// 			prizeStr += "<div class='cls'>x</div>";
// 			prizeStr += "<span>"+time+"</span>";
// 			prizeStr += "<br>";
// 			prizeStr += "<span>"+member+"</span>";
// 			prizeStr += "<span>在</span>";
// 			prizeStr += "<span>"+gameType+"</span>";
// 			prizeStr += "<br>"
// 			prizeStr += "<span class='white'>"+prizeType+"</span>";
// 			prizeStr += "<span>中赢得</span>";
// 			prizeStr += "<span class='white'>￥</span>";
// 			prizeStr += "<span class='num'>"+amount+"</span>";
// 			prizeStr += "</div>";
// 			prizeStr += "</div>";

// 			$(".gtp_list").append(prizeStr);
// 		}

// 		$(".cls").unbind().click(function(){
// 			$this.hiddPrize($(this).parent().parent());
// 		});
// 		$this.updateTime = new Date().format("yyyy/MM/dd hh:mm:ss");
// 	},
// 	"showPrize":function(){
// 		var $this = this;
// 		$(".gt_prize").css({"display":"block"});
// 		var prizeList = $(".gtp_list").find(".gtp_dt");
// 		prizeList.each(function(index, element){
// 			setTimeout(function(){
// 				$(element).stop(true,false).animate({"opacity":1,"height":"80px"},$this.animateTime,"easeInOutCubic",function(){
// 					if(index == prizeList.length -1){
// 						//
// 						$this.closeTimeout =  setTimeout(function(){
// 							$this.hiddPrize();
// 						}, $this.autoCloseTime);
// 					}
// 				});


// 			},$this.animateTime * index);
// 		});
// 	},
// 	"hiddPrize":function(dt){
// 		var $this = this;
// 		if(dt != null){
// 			dt.stop(true,false).animate({"opacity":0,"height":"0px"},$this.animateTime,"easeInOutCubic",function(){
// 				$(this).remove();	

// 				if($(".gtp_list").find(".gtp_dt").length == 0){
// 					$(".gt_prize").css({"display":"none"});
// 				}
// 			});
// 		}else{
// 			clearTimeout($this.closeTimeout);
// 			var prizeList = $(".gtp_list").find(".gtp_dt");
// 			prizeList.each(function(index, element){
// 				$(element).stop(true,false).animate({"opacity":0,"height":"0px"},$this.animateTime,"easeInOutCubic",function(){
// 					$(this).remove();
// 					if(index == prizeList.length -1){
// 						//
// 						$(".gt_prize").css({"display":"none"});
// 					}
// 				});
// 			});
// 		}
// 	},
// 	afterTime:function(time){
// 		var date = new Date(time).getTime();
// 		var now =  new Date().getTime();
// 		var value = now - date;
// 		var timeStr = "";
// 		var num = Math.floor(value/ (1000 * 60 * 60 * 24 * 7));
// 		if(num > 0){
// 			timeStr = num+"周前";
// 			return timeStr;
// 		}
// 		num = Math.floor(value/ (1000 * 60 * 60 * 24));
// 		if(num > 0){
// 			timeStr = num+"天前";
// 			return timeStr;
// 		}
// 		num = Math.floor(value/ (1000 * 60 * 60));
// 		if(num > 0){
// 			timeStr = num+"小时前";
// 			return timeStr;
// 		}
// 		num = Math.floor(value/ (1000 * 60));
// 		if(num > 0){
// 			timeStr = num+"分钟前";
// 			return timeStr;
// 		}else{
// 			timeStr = "刚刚";
// 			return timeStr;
// 		}
// 	}

// }