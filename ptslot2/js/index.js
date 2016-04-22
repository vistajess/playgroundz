// JavaScript Document
var suffix = document.domain;
suffix = suffix.substring(suffix.lastIndexOf("."));
$(function () {
	 /* 设置语言*/
    $("#current_language").mouseenter(function(){
        $("#choose_language").fadeIn(100);
    });
    $("#choose_language").mouseleave(function(){
        $("#choose_language").fadeOut(100);
    });
    /* 设置语言 end*/
    //弹窗不需初始化
//    if (window.top == window) {
//        InitHeaderPromotion();
//    }

    setFooter();
    $("input").filter("[type=text],[type=password]").attr("autocomplete", "off");
    $(".browser-updatetips span").click(function () { $(".browser-updatetips").hide(); });
    $(".input-datepicker .btn-datepicker").click(function () { $(this).siblings("input").datepicker("show"); });

    //contact cs
    $("body").on("click", "a[data-btncs]", function (e) {
        window.open($(this).attr("href"), "liaonow", "width=500,height=650,location=no"); return false;
    });
    //$("a[data-btncs]").click(function() { window.open($(this).attr("href"), "liaonow", "width=500,height=650,location=no"); return false; });

    if (window.top == window.self) { $("html").css("backgroundColor", "#6e6d71"); }


    //#region input-4
    $("body").on("blur focus", ".uedinput-4", function (e) {
        if (e.type == "focusin") {
            $(this).parent().addClass('focus');
        }
        else if (e.type == "focusout") {
            $(this).parent().removeClass('focus');
        }
    });
    //#endregion


    $(".lf-input").keyup(function () {
        var $a = $(this).siblings("a");
        if ($(this).val() != "") {
            $(this).attr("class", "long");
            $a.text($a.attr("data-shorttxt"));
        }
        else {
            $(this).attr("class", "short");
            $a.text($a.attr("data-longtxt"));
        }
    });

    //#region auto resize image
    function resizeImg() {
        if ($("#resize-img").length == 0) { return; }
        var width = $(window).width(),
		    height = $(window).height() - $("#header").outerHeight();

        $("#resize-img").css({ "width": width, "height": height });
        var $img = $("#resize-img").children("img");
        $img.css({ "width": "100%", "height": "auto" });
        var imgHeight = $img.height(), imgWidth = $img.width();
        if (imgHeight != 0) {
            if (imgHeight < height) { $img.css({ "width": "auto", "height": height }); $img.css({ "marginLeft": -(($img.width() - width) / 2), "marginTop": 0 }); }
            else { $img.css({ "width": "100%", "height": "auto" }); $img.css({ "marginLeft": 0, "marginTop": -(($img.height() - height) / 2) }); }
        }
    }

    $(window).load(function () { resizeImg(); });
    $(window).resize(function () { resizeImg(); });
    //#endregion


    //#region register form
    var SwitchForms = {
        _showFormCls: 'form-account',
        _$slider: $(".slider"),
        _formCfg: { 'a': 'form-account', 'p': 'form-phone', 'e': 'form-email', 'q': 'form-qq' },
        _sliderCfg: { 'a': { top: "12px" }, 'p': { top: "51px" }, 'e': { "top": "90px" }, 'q': { "top": "130px"} },


        showForm: function (itemname) {
            if (typeof this._formCfg[itemname] == 'undefined') {
                return false;
            }
            var cls = this._formCfg[itemname];
            $(".rf-forms").removeClass(this._showFormCls).addClass(cls).find("input").val("");
            this._showFormCls = cls;
        },
        slider: function (itemname) {
            if (typeof this._sliderCfg[itemname] != 'undefined') {
                this._$slider.css(this._sliderCfg[itemname]);
            }
        }
    };

    $('.rf-items').mouseover(function (e) {
        var $target = $(e.target);
        var itemname = $target.attr("data-item");
        SwitchForms.slider(itemname);
        SwitchForms.showForm(itemname);
    });

//    $("body").on("focus keydown keyup blur", "input[type=text],input[type=password]", function (e) {
$("body").on("focus keydown keyup blur", "input[type=text]", function (e) {
        switch (e.type) {
            case "focusin":
                $(this).siblings("label").hide();
                if ($(this).val() != "") { return; }
                var name = $(this).attr("name");
                $('[data-for="' + name + '"]').show();
                break;
            case "focusout":
                if ($(this).val() != "") { return; }
                $(this).siblings("label").show();
                var name = $(this).attr("name");
                //$('[data-for="' + name + '"]').hide();
                break;
            case "keydown": break; //$(this).siblings("label").hide(); break;
            case "keyup": break;
        }
    });
    //#endregion

    //#region password check
    String.prototype.strReverse = function () { var b = ""; for (var a = 0; a < this.length; a++) { b = this.charAt(a) + b } return b };
    function checkPassword(f) {
        if (!f) { return 0 }
        var h = 8;
        if (f.length < h) { return 0 }
        var g = 0;
        var e = "abcdefghijklmnopqrstuvwxyz";
        var d = "01234567890";
        var a = "~)!@#$%^&*()_+-={}[]|:;<>?,./";
        if (f.length >= 10) { g += 20 }
        if (f.length >= 12) { g += 20 }
        if (f.match(/[a-z]/g)) { g += 20 }
        if (f.match(/[0-9]/g)) { g += 20 }
        if (f.match(/[A-Z]/g)) { g += 20 }
        for (var i = 0; i < a.length; i++) {
            if (f.indexOf(a[i]) != -1) { g += 20; break }
        }
        for (var i = 0; i < 23; i++) {
            var b = e.substring(i, parseInt(i + 3));
            var c = b.strReverse();
            if (f.indexOf(b) != -1 || f.indexOf(c) != -1) {
                g -= 20
            }
            b = e.toUpperCase().substring(i, parseInt(i + 3)); c = b.strReverse(); if (f.indexOf(b) != -1 || f.indexOf(c) != -1) { g -= 20 }
        }
        for (var i = 0; i < 8; i++) { var b = d.substring(i, parseInt(i + 3)); var c = b.strReverse(); if (f.indexOf(b) != -1 || f.toLowerCase().indexOf(c) != -1) { g -= 20 } } return Math.max(g, 0)
    };

    var delayKey,
    displayPasswdMeter = function (n, item) {
        var s, $node = $('.pwd-strong');

        if (n < 60) {
            s = '弱';
        } else if (n < 80) {
            s = '一般';
        } else {
            s = '强';
        }

        $node.show().text('密码强度：' + s);
    };

//    $('#password').bind({
//        blur: function () {
//
//        },
//        keyup: function (e) {
//            var el = this;
//            if (this.value.length < 8) {
//                $('.pwd-strong').hide();
//                $("[data-valmsg-for='password']").show();
//                return;
//            }
//
//            $("[data-valmsg-for='password']").hide();
//            delayKey && clearTimeout(delayKey);
//            delayKey = setTimeout(function () {
//                displayPasswdMeter(checkPassword(el.value), $(el).parent());
//            }, 10);
//        }
//    });
    //#endregion 

    //#region summarys block animation
    var SummarysAnimation = {
        _$activeEl: $('[data-summary="2"]'), //当前活动块元素
        _range: 30,                          //高度变化范围
        _speed: 400,
        _timer: null,

        clearTimer: function () { this._timer != null && clearTimeout(this._timer); },
        IsEqual: function ($target) {
            if ($target.attr("data-summary") == this._$activeEl.attr("data-summary")) { return true; }
            return false;
        },
        animate: function ($target) {
            if (this.IsEqual($target)) { return false; }

            this._timer != null && clearTimeout(this._timer);
            var self = this;
            this._timer = setTimeout(function () {
                $target.stop(true, true).animate({ "marginTop": (parseInt($target.css("marginTop")) - self._range) + "px" }, self._speed, "linear");
                self._$activeEl.stop(true, true).animate({ "marginTop": (parseInt(self._$activeEl.css("marginTop")) + self._range) + "px" }, self._speed, "linear");
                self._$activeEl = $target;
            }, 300);
        }
    };

    $("div[data-summary]").mouseenter(function (e) {
        $target = $(this);
        var dataSummary = $target.attr("data-summary");
        if (dataSummary != 1 && dataSummary != 2 && dataSummary != 3) { return; }
        SummarysAnimation.animate($target);
    });
    $("div[data-summary]").mouseleave(function (e) {
        SummarysAnimation.clearTimer();
    });
    //#endregion

    //#region account safe status
    window.AccountSafe = { $el: $(".account-safe") };
    AccountSafe.Model = { infotrue: 0, bindcard: 0, bindphone: 0, bindemail: 0, complete: 0 };
    AccountSafe.safetxts = ["一般", "良好", "还不错", "非常安全"];
    AccountSafe.Bar = function (p) {

        var $e = $(".illustration .dial");
        $e.knob({ width: 52, height: 52, lineCap: "round", thickness: ".15", angleOffset: 180, readOnly: true, displayInput: false, fgColor: "#98C2F3", bgColor: "#E6F0FB" });

        var i = 0;

        var t = setInterval(function () {
            i += 5;
            if (i >= 100) { $e.val(i).trigger("configure", { bgColor: "#98C2F3" }); $(".safe-percent").html("100%"); clearInterval(t); return; }

            if (i >= p) { i = p; clearInterval(t); }
            $e.val(i).trigger("change");
            $(".safe-percent").html(i + "%");
        }, 30);
    };
    AccountSafe.Render = function () {
        var i = 0, infotrue = bindcard = bindphone = bindemail = 0;
        infotrue = this.Model.infotrue; bindcard = this.Model.bindcard; bindphone = this.Model.bindphone; bindemail = this.Model.bindemail;

        i = this.Model.complete;
        this.Bar(i);

        this.$el.find(".safe-level").html(this.safetxts[i > 0 ? (Math.floor((i - 1) / 25)) : 0]);

        var $r = $("#as-trueinfo"), $c = $("#as-bindcard"), $p = $("#as-bindphone"), $e = $("#as-bindemail");

        infotrue == 1 ? $r.attr("class", "logo-trueinfo-on") : $r.attr("class", "logo-trueinfo");
        bindcard == 1 ? $c.attr("class", "logo-bindcard-on") : $c.attr("class", "logo-bindcard");
        bindphone == 1 ? $p.attr("class", "logo-bindphone-on") : $p.attr("class", "logo-bindphone");
        bindemail == 1 ? $e.attr("class", "logo-bindemail-on") : $e.attr("class", "logo-bindemail");
    }
    AccountSafe.Init = function (infotrue, bindcard, bindphone, bindemail) {
        this.Model.complete = this.$el.find(".safe-percent").attr("data-complete");

        this.Model.infotrue = infotrue == 1 ? 1 : 0; this.Model.bindcard = bindcard == 1 ? 1 : 0; this.Model.bindphone = bindphone == 1 ? 1 : 0; this.Model.bindemail = bindemail == 1 ? 1 : 0;
        this.Render();
    }
    AccountSafe.Get = function () {
        var url = "";
		AccountSafe.Init(1,1,1,1);
//        $.get(url, function (respone) {
//			
//        });
    }
    //#endregion

    //#region Elevator
    var Elevator = { HidePopupTimer: null, HidePopup: function () {
        this.HidePopupTimer = setTimeout(function () { $("#elevator_item .qr-popup").hide(); }, 500);
    }
    };

    $("#elevator_item .qr").click(function () { $("#elevator_item .qr-popup").show(); });
    $("#elevator_item .qr, #elevator_item .qr-popup").mouseleave(function () { Elevator.HidePopup(); }).mouseenter(function () { Elevator.HidePopupTimer != null && clearTimeout(Elevator.HidePopupTimer); })

    $("#elevator_item").hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#elevator_item").fadeIn(500);
        }
        else {
            $("#elevator_item").fadeOut(500);
        }
    });
    $("#elevator_item #elevator").click(function () { $('body,html').animate({ scrollTop: 0 }, 500); return false; });
    //#endregion
    addNavEvent();
})

//#region tips  block
//fast
Tips = {
    Show: function(msg, css) {
        var $block = $(".g-tips-block2");
        if ($block.length == 0) { $block = $("<div></div>").attr("class", "g-tips-block2").css(css).appendTo("body") };
        $block.html(msg).hide().show(100,function() { setTimeout(function() { $block.hide(); }, 300); });
    }
};

Tips2 = { timer: null, $el: null };
Tips2.Show = function(content, offset, arcls) {
    var _self = this;
    _self.$el != null && _self.RunHide();
    //var $tipsBlock = $(".g-poptips");
    //if ($tipsBlock.length == 0) {
    $tipsBlock = $('<div class="g-poptips" ><div class="bd"></div><div class="ar"><em>◆</em><span>◆</span></div></div>').appendTo("body");
    $tipsBlock.mouseenter(function() { clearTimeout(_self.timer); }).mouseleave(function() { _self.Hide(); })
    //}

    $tipsBlock.find(".bd").html(content);
    $tipsBlock.find(".ar").attr("class", "ar " + arcls);
    $tipsBlock.css({ left: offset.left, top: offset.top }).show();
    _self.$el = $tipsBlock;
};
Tips2.Hide = function() {
    if (this.$el == null) { return; }
    var _self = this, $tipsBlock = this.$el;
    _self.timer = setTimeout(function() { _self.RunHide(); }, 300);
}
Tips2.RunHide = function() {
    this.$el.remove(); this.$el = null;
}


var tipsBlock = { timer: null };
tipsBlock.Show = function($target) {
    tipsBlock.timer != null && clearTimeout(tipsBlock.timer);
    var $tipsBlock = $(".g-tips-block");
    if ($tipsBlock.length == 0) {
        $tipsBlock = $('<div class="g-tips-block"><div class="close"></div><div class="title"></div><p></p><div class="logo-sj6-b"></div></div>').appendTo("body");
        $tipsBlock.find(".close").click(function() { $tipsBlock.hide(); });
        $tipsBlock.mouseenter(function() { clearTimeout(tipsBlock.timer); }).mouseleave(function() { tipsBlock.Hide(); })
    }

    $tipsBlock.find(".title").html($target.attr("data-title"));
    $tipsBlock.find("p").html($target.attr("data-content"));

    var top = $target.offset().top, left = $target.offset().left;
    top -= $tipsBlock.innerHeight() + 20;
    left -= parseInt($tipsBlock.innerWidth() / 2, 10);

    var of = $target.attr("data-offset");
    if (typeof of != "undefined" && of != "") {
        var _of = of.split("|");
        left += parseInt(_of[0], 10);
        top += parseInt(_of[1], 10);
    }

    $tipsBlock.css({ top: top, left: left }).show();

    tipsBlock.$el = $target;
};
tipsBlock.Hide = function() {
    var $tipsBlock = $(".g-tips-block");
    tipsBlock.timer = setTimeout(function() { $tipsBlock.hide(); tipsBlock.$el = null; }, 300);
}
$("[data-showtips='true']").mouseenter(function(e) { tipsBlock.Show($(e.currentTarget)); }).mouseleave(function() { tipsBlock.Hide(); });

//#endregion


//#region Message
Message = {unread: 0, timer: null};
Message.BackendApi = {
    TestDelMsg: function() { dialog.info("消息", "success"); },
    SR: { deling: false, reading: false },
    // TODO delete msg this is implement
    DelMsg: function($cbs, ids) {
        if (this.SR.deling) { return false; }
        var _self = this;
        _self.SR.deling = true;
        $.post(" ", { action: "del", ids: ids }, function(response) {
            _self.SR.deling = false;
            response._err = '';
            if (response._err != "" && response._err != null) {
                dialog.info("消息", response._err);
            }
            else {
                var button = {};
                button[l.OK] = function() {
                    dialog.close();
                    utility.closePopUp();
                };
                dialog.info(l.Message, response.m, button);
                $cbs.closest("li").slideToggle("normal", function() { $(this).remove(); });
            }
        });
    },
    ReadMsg: function(id) {
        id = parseInt(id, 10);
        if (id == 0) { return; }
        if (this.SR.reading) { return false; }
        _self = this;
        _self.SR.reading = true;
        // TODO read msg this is implement
        $.post("", { action: "read", id: id }, function(response) {
            //_self.SR.reading = false;
            var template = _.template($("#tmp-readmsg").html());
		    var html = template({ Id: id, Subject: subject, AddTime: (new Date()).format("yyyy-M-d h:m:00") });
		    var button = {};
                button[l.OK] = function() {
                    dialog.close();
                    utility.closePopUp();
                };
            dialog.info(l.Message, html, button);
		    //$("#msg-send ul").prepend(html);
        });
    },
    Get: function(callback) {
        $.get("/service/message.ashx", function(res) {
            if (res.success) {
                Message.unread = res.result.c;
                if (Message.unread > 0) {
                    $("#new-msg").find("span").html(Message.unread).attr("title", "您有" + Message.unread + "未读消息").parent().show();
                    $(".t-2", ".mc-nav .bd").first().html("您有("+Message.unread+")条新的消息");
                }
                else {
                    $("#new-msg").hide();
                    $(".t-2", ".mc-nav .bd").first().html("您暂无未读消息哦");
                }
                typeof callback != "undefined" && callback();
            }
        });
    }
};

/*
(function() {
    if (!utility.isLogined() || Message.unread > 0) { return; }
    Message.BackendApi.Get();
    setTimeout(arguments.calle, 5000)
})();
*/


//Message.BackendApi.Get();
//setInterval(function() { Message.BackendApi.Get(); }, 10000);

//#endregion


//#region LoadingImg
function UBLoading($el, frameIndex, frames, frameTime) {
    this.$el = $el;
    this.timer = null;
    this.frameIndex = frameIndex;this.frames = frames;this.frameTime = frameTime;
}
UBLoading.prototype.Run = function() {
    var _self = this;
    _self.timer = setInterval(function() {
        var position = 0;
        position = (_self.frameIndex % _self.frames) * 30;
        _self.$el.css({ "background-position": "0px -" + position + "px" });
        _self.frameIndex++;
    }, this.frameTime);
}
UBLoading.prototype.Stop = function() {
    this.timer != null && clearInterval(this.timer);
}
//#endregion


//#region Valid
Valid = {
    IsEmail: function(email) {
        var re = /^[a-z0-9][a-z0-9_.-]+@[a-z0-9|-]+(.[a-z0-9|-]+)*[.][a-z0-9]+$/i;
        return re.test(email);
    },
    IsMobile: function(mobile) {
        var re = /^0{0,1}(13\d|14\d|15\d|18\d)\d{8}$/g;
        return re.test(mobile);
    },
    IsMoney: function(money) {
        var re = /^\d+(\.\d{1,2})?$/i;
        return re.test(money);
    }
};
//#endregion


//#region IOSONOFF
var IosOnOff = {};
IosOnOff.On = function(self) {
    $(self).trigger('iosonoff.start');

    var left = $(self).width() - $(self).find(".slider").width();

    $(self).children().attr("class", "on");
    $(self).find(".slider").animate({left: left}, 300, "easeInOut", function() {
        $(self).trigger('iosonoff.end');
    });
}
IosOnOff.Off = function(self) {
    $(self).trigger('iosonoff.start');

    $(self).children().attr("class", "off");
    $(self).find(".slider").animate({left: 0}, 300, "easeInOut", function() {
        $(self).trigger('iosonoff.end');
    });
}
IosOnOff.Switch = function(self) {
    if($(self).find(".slider").css("left") == "0px") { this.On(self); }
    else { this.Off(self); }
}
//#endregion
//
//
///* joe*/
var csnTimeout = null;
var kenoTimeout = null;
var csnTimeoutB = null;
var kenoTimeoutB = null;
var couponTimeout = null;
var couponTimeoutB = null;

var sportTimeout = null;
var gameTimeout = null;
var sportTimeoutB = null;
var gameTimeoutB = null;

function setFooter(){
	var url = window.location.href;
	if(url.indexOf("/zh-cn/keno/") < 0 && url.indexOf("/zh-cn/livecasino/") < 0 && url.indexOf("/zh-cn/sportsbook/") < 0){
	    var windowH = $(this).height(); //窗口高度
	    var headerH = $("#header").height();
	    var footerH = $("#footer").height();
//	    alert(headerH+"_"+footerH);
	    $("#content").css({ "min-height": (windowH - headerH -footerH -1) + "px", "overflow": "hidden" });
	}
}

//setFooter();

function addNavEvent(){
	$("#nav_casino").mouseenter(function(){
		clearTimeout(csnTimeout);
		csnTimeout = null;
		if(csnTimeoutB == null){
			csnTimeoutB = setTimeout(function(){
				showCasino();
			},200);
		}
	});
	
	$("#nav_casino").mouseleave(function(){
		clearTimeout(csnTimeoutB);
		csnTimeoutB=null;
		hiddCasino();
	});
	$(".nh_csn").mouseenter(function(){
		clearTimeout(csnTimeout);
		csnTimeout = null;
		if(csnTimeoutB == null){
			csnTimeoutB = setTimeout(function(){
				showCasino();
			},200);
		}
	});
	$(".nh_csn").mouseleave(function(){
		clearTimeout(csnTimeoutB);
		csnTimeoutB=null;
		hiddCasino();
	});
	
	
	$("#nav_keno").mouseenter(function(){
		clearTimeout(kenoTimeout);
		kenoTimeout = null;
		if(kenoTimeoutB == null){
			kenoTimeoutB = setTimeout(function(){
				showKeno();
			},200);
		}
		
	});
	
	$("#nav_keno").mouseleave(function(){
		clearTimeout(kenoTimeoutB);
		kenoTimeoutB=null;
		hiddKeno();
	});
	$(".nh_keno").mouseenter(function(){
		clearTimeout(kenoTimeout);
		kenoTimeout = null;
		if(kenoTimeoutB == null){
			kenoTimeoutB = setTimeout(function(){
				showKeno();
			},200);
		}
	});
	$(".nh_keno").mouseleave(function(){
		clearTimeout(kenoTimeoutB);
		kenoTimeoutB=null;
		hiddKeno();
	});
	
	
	
	$("#nav_sport").mouseenter(function(){
		clearTimeout(sportTimeout);
		sportTimeout = null;
		if(sportTimeoutB == null){
			sportTimeoutB = setTimeout(function(){
				showSport();
			},200);
		}
		
	});
	
	$("#nav_sport").mouseleave(function(){
		clearTimeout(sportTimeoutB);
		sportTimeoutB=null;
		hiddSport();
	});
	$(".nh_sport").mouseenter(function(){
		clearTimeout(sportTimeout);
		sportTimeout = null;
		if(sportTimeoutB == null){
			sportTimeoutB = setTimeout(function(){
				showSport();
			},200);
		}
	});
	$(".nh_sport").mouseleave(function(){
		clearTimeout(sportTimeoutB);
		sportTimeoutB=null;
		hiddSport();
	});
	

    /* */
    $("#nav_coupon").mouseenter(function(){
        clearTimeout(couponTimeout);
        couponTimeout = null;
        if(couponTimeoutB == null){
            couponTimeoutB = setTimeout(function(){
                showCoupon();
            },200);
        }
        
    });
    
    $("#nav_coupon").mouseleave(function(){
        clearTimeout(couponTimeoutB);
        couponTimeoutB=null;
        hiddCoupon();
    });
    $(".nh_coupon").mouseenter(function(){
        clearTimeout(couponTimeout);
        couponTimeout = null;
        if(couponTimeoutB == null){
            couponTimeoutB = setTimeout(function(){
                showCoupon();
            },200);
        }
    });
    $(".nh_coupon").mouseleave(function(){
        clearTimeout(couponTimeoutB);
        couponTimeoutB=null;
        hiddCoupon();
    });
    /* */
	
	
	$("#nav_game").mouseenter(function(){
		clearTimeout(gameTimeout);
		gameTimeout = null;
		if(gameTimeoutB == null){
			gameTimeoutB = setTimeout(function(){
				showGame();
			},200);
		}
		
	});
	
	$("#nav_game").mouseleave(function(){
		clearTimeout(gameTimeoutB);
		gameTimeoutB=null;
		hiddGame();
	});
	$(".nh_game").mouseenter(function(){
		clearTimeout(gameTimeout);
		gameTimeout = null;
		if(gameTimeoutB == null){
			gameTimeoutB = setTimeout(function(){
				showGame();
			},200);
		}
	});
	$(".nh_game").mouseleave(function(){
		clearTimeout(gameTimeoutB);
		gameTimeoutB=null;
		hiddGame();
	});
	
	
	$(".nh_ea, .nh_gd, .nh_kp, .nh_pt, .nh_knad, .nh_bet, .nh_sl").mouseenter(function(event){
		if($(event.target).attr("class") != "dl"){
			$(this).find(".st").html("进入游戏");
			$(this).addClass("hover");
		}
		
	});
	$(".nh_ea, .nh_gd, .nh_kp, .nh_pt, .nh_knad, .nh_bet, .nh_sl").mouseleave(function(event){
		if($(event.target).attr("class") != "dl"){
			$(this).find(".st").html("立即游戏");
			$(this).removeClass("hover");
		}
	});
	$(".nh_app, .nh_2d, .nh_cl, .nh_sl, .nh_gm, .nh_ptcp, .nh_alcp, .nh_spcp").mouseover(function(){
		$(this).addClass("hover");
		});
    $(".nh_app, .nh_2d, .nh_cl, .nh_sl, .nh_gmi, .nh_ptcp, .nh_alcp, .nh_spcp").mouseout(function () {
		$(this).removeClass("hover");
		});
	
	//导航效果
	$(".pngFix").mouseenter(function(){
		// var navId = $(this).attr("id");
		// if(navId == "nav_casino"){
			
		
		// }else if( navId == "nav_keno"){
			
		// }
	//	$(this).addClass("over");
	});
	$(".pngFix").mouseleave(function(){
		// $(this).removeClass("over");
	});
	
	//click
	$(".nh_ea").click(function(event){
		if($(event.target).attr("class") != "dl"){
			openEaHd();
		}
	});
	$(".nh_gd").click(function(){
		openGdHd();
	});
	$(".nh_kp").click(function(){
			openCrownHd();
	});
	$(".nh_pt").click(function(event){
		if($(event.target).attr("class") != "dl"){
			openPtHd();
		}
	});
	
	$("[name_attr='pt']").click(function(){
        // if($(this).attr("class") == "pt_dld"){
            var buttons = {
                "我知道了":function () { dialog.close(); }
            };
             //   buttons[l.OK] = function () { dialog.close(); window.location.href="http://download.uedbet.com/pt/ued_cn.exe";};

            dialog.info("提示", "您正在下载的是MG娱乐城客户端。<br />登录时，请在您的用户名(test)前加 <span style=\"color:red;\">"+_userNamePrefix+"</span> 例 \"<span style=\"color:red;\">"+_userNamePrefix+"test</span>\"<br /> <a href='/static/download/MicroGaming.exe' style='color:#0088ff;font:bold;'>本地下载</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href='https://dl.dropboxusercontent.com/u/15452623/TNG-MIP_iGaming%20MaxA_CV2.exe' style='color:#0088ff;font:bold;'>官方下载</a> ",buttons);
        // }else{
        //     window.open("http://download1.uedbet.com:808/ued_cn.msi");
        // }
	});	
	
	$(".nh_gm").click(function(){
		//openKeno();
		//downloadAndroid();
		downloadKeno();
	});
	$(".nh_knad").click(function(){
		openKeno();
		
	});
	
	
	$(".nh_app").click(function(){
		downloadKeno();
	});
	
	$(".nh_bet").click(function(){
		window.location = "#";
	});
	
	$(".nh_2d").click(function(){
		var url = $(this).find(".st").attr("href");
		//window.location = "http://s.uedbet" + suffix;
	});
	$(".nh_sl").click(function(){
		window.location = "#";
	});
    $(".nh_ptcp").click(function(){
        window.location = "#";
    });
    $(".nh_alcp").click(function(){
        window.location = "#";
    });
    $(".nh_spcp").click(function () {
        window.location = "#";
    });
	// $(".nh_cl").click(function(){
	// 	//window.open("http://download.uedbet.com/pt/ued_cn.exe");
	// 	window.location = "http://download.uedbet.com/pt/ued_cn.exe";
	// });

    $("#top_logo_a").mousedown(function(){
        //$(this).addClass("press");
    });
    $("#top_logo_a").mouseup(function(){
        //$(this).removeClass("press");
    });


    //aglimit
    $(".nh_ag_close").click(function(){
        $("#ag_limit").fadeOut();
    });
    $("[ag_limit]").click(function(){
        var agLimit = $(this).attr("ag_limit");
        var agurl = "/integration/aggame/game.aspx";
        agurl += "?oddtype=" + agLimit;
        $("#ag_limit").fadeOut();
        var ref = window.open(agurl,"ag","depended=yes,height=766,width=1290"); 
        ref.focus();
    });
}

function showSport(){ 
	$(".it_sport").addClass("over");
	$(".nh_sport").css({"z-index":100});
	// if(csnTimeout != null){
		// clearTimeout(csnTimeout);
		// csnTimeout = null;
	// }
	
	$(".nh_sport").stop(true).animate({"height":"205px"},200,"easeInQuart",function(){
		// $(".nh_csn").css({"overflow":"visible"});
		if(check()){
			$("#nh_sport").stop(true).animate({"opacity":1},200,"easeInQuart",function(){});
		}
		
	});
}

function showCasino(){ 
	$(".it_csn").addClass("over");
	$(".nh_csn").css({"z-index":100});
	// if(csnTimeout != null){
		// clearTimeout(csnTimeout);
		// csnTimeout = null;
	// }
	
	$(".nh_csn").stop(true).animate({"height":"205px"},200,"easeInQuart",function(){
		// $(".nh_csn").css({"overflow":"visible"});
		if(check()){
			$("#nh_cnt").stop(true).animate({"opacity":1},200,"easeInQuart",function(){});
		}
		
	});
}

function showKeno(){ 
	$(".it_keno").addClass("over");
	$(".nh_keno").css({"z-index":100});
	// if(kenoTimeout != null){
		// clearTimeout(kenoTimeout);
		// kenoTimeout = null;
	// }
	
	$(".nh_keno").stop(true).animate({"height":"205px"},200,"easeInQuart",function(){
		// $(".nh_csn").css({"overflow":"visible"});
		if(check()){
			$("#keno_cnt").stop(true).animate({"opacity":1},200,"easeInQuart",function(){});
		}
		
	});
}

function showGame(){ 
	$(".it_game").addClass("over");
	$(".nh_game").css({"z-index":100});
	// if(csnTimeout != null){
		// clearTimeout(csnTimeout);
		// csnTimeout = null;
	// }
	
	$(".nh_game").stop(true).animate({"height":"205px"},200,"easeInQuart",function(){
		// $(".nh_csn").css({"overflow":"visible"});
		if(check()){
			$("#nh_game").stop(true).animate({"opacity":1},200,"easeInQuart",function(){});
		}
		
	});
}

function showCoupon(){ 
    $("#nav_coupon").addClass("over");
    $(".nh_coupon").css({"z-index":100});
    
    $(".nh_coupon").stop(true).animate({"height":"205px"},200,"easeInQuart",function(){
        // $(".nh_csn").css({"overflow":"visible"});
        if(check()){
            $("#nh_coupon").stop(true).animate({"opacity":1},200,"easeInQuart",function(){});
        }
        
    });

    //执行自定义事件
    $(document).trigger("CouponDropDownShow");

}

function hiddCasino(){
	$(".nh_csn").css({"z-index":99});
	csnTimeout = setTimeout(function(){
		csnTimeout = null;
		$(".it_csn").removeClass("over");
		if(check()){
			$("#nh_cnt").stop(true).animate({"opacity":0},200,"easeInQuart",function(){
				
				$(".nh_csn").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
				// $(".nh_csn").css({"overflow":"hidden"});
				});
			});
		}else{
			$("#nh_cnt").stop(true).animate({"top":"0px"},200,"easeInQuart",function(){
				
				$(".nh_csn").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
					// $(".nh_csn").css({"overflow":"hidden"});
				});
			});
		}
		
	},250);
}

function hiddKeno(){
	$(".nh_keno").css({"z-index":99});
	kenoTimeout = setTimeout(function(){
		kenoTimeout = null;
		$(".it_keno").removeClass("over");
		if(check()){
			$("#keno_cnt").stop(true).animate({"opacity":0},200,"easeInQuart",function(){
				
				$(".nh_keno").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
				// $(".nh_csn").css({"overflow":"hidden"});
				});
			});
		}else{
			$("#keno_cnt").stop(true).animate({"top":"0px"},200,"easeInQuart",function(){
				
				$(".nh_keno").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
					// $(".nh_csn").css({"overflow":"hidden"});
				});
			});
		}
		
	},250);
}



function hiddSport(){
	$(".nh_sport").css({"z-index":99});
	sportTimeout = setTimeout(function(){
		sportTimeout = null;
		$(".it_sport").removeClass("over");
		if(check()){
			$("#nh_sport").stop(true).animate({"opacity":0},200,"easeInQuart",function(){
				
				$(".nh_sport").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
				// $(".nh_csn").css({"overflow":"hidden"});
				});
			});
		}else{
			$("#nh_sport").stop(true).animate({"top":"0px"},200,"easeInQuart",function(){
				
				$(".nh_sport").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
					// $(".nh_csn").css({"overflow":"hidden"});
				});
			});
		}
		
	},250);
}

function hiddGame(){
	$(".nh_game").css({"z-index":99});
	gameTimeout = setTimeout(function(){
		gameTimeout = null;
		$(".it_game").removeClass("over");
		if(check()){
			$("#nh_game").stop(true).animate({"opacity":0},200,"easeInQuart",function(){
				
				$(".nh_game").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
				// $(".nh_csn").css({"overflow":"hidden"});
				});
			});
		}else{
			$("#nh_game").stop(true).animate({"top":"0px"},200,"easeInQuart",function(){
				
				$(".nh_game").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
					// $(".nh_csn").css({"overflow":"hidden"});
				});
			});
		}
		
	},250);
}

function hiddCoupon() {

    $(".nh_coupon").css({"z-index":99});
    couponTimeout = setTimeout(function(){
        couponTimeout = null;
        $("#nav_coupon").removeClass("over");
        if(check()){
            $("#nh_coupon").stop(true).animate({"opacity":0},200,"easeInQuart",function(){
                
                $(".nh_coupon").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
                // $(".nh_csn").css({"overflow":"hidden"});
                });
            });
        }else{
            $("#nh_coupon").stop(true).animate({"top":"0px"},200,"easeInQuart",function(){
                
                $(".nh_coupon").stop(true).animate({"height":"0px"},200,"easeInQuart",function(){
                    // $(".nh_csn").css({"overflow":"hidden"});
                });
            });
        }

        //执行自定义事件
        $(document).trigger("CouponDropDownHide");
        
    },250);

}

function openCrownHd(){
	if(uv.l == null){
			dialog.info("提示", "请您先登录再进入游戏");
		}else{
			window.open("/index","ld","depended=yes,height=766,width=1290");
	}
}

function openGdHd(){
	if(uv.l == null){
			dialog.info("提示", "请您先登录再进入游戏");
		}else{
			window.open("/index","gd","depended=yes,height=766,width=1290");
	}
}
function openEaHd(){
	if(uv.l == null){
		dialog.info("提示", "请您先登录再进入游戏");
	}else{
		$("#ag_limit").fadeIn();
	}
}
function openPtHd(){
	window.open("/index"); 
}

function openKeno(){
	if(uv.l == null){
		dialog.info("提示", "请您先登录再进入游戏");
	}else{
	//	window.location.href="/zh-cn/keno/keno.aspx";
		window.open("/index");
	}
}
function downloadKeno(){
	window.location.href="#";
}
function downloadAndroid(){
	window.location.href="#m";
}

function check(){
	var bro = navigator.userAgent;//获取浏览器用户代理信息;

	if ($.support.leadingWhitespace){ 
		return true;
	}else{
		return false;
	}
}
/* joe end*/

/* 倒计时 */
//cd:天，时，分，秒元素
//callback:倒计时完成后执行的方法
//begintime:开始时间（2014/10/10 10:10）
function Countdown(cd, begintime, callback){

    var self = this;
    this.now = new Date(uv.t);
    this.now = this.now.getTime();
    this.beginTime = new Date(begintime);
    this.beginTime = this.beginTime.getTime();
    this.isstart = false; //是否已开始

    this.timer = null;

    this.timing = function(){
        var $this = this;
        var time = [];
        var value = $this.beginTime - $this.now;
        if(value <= 0){
            time[0] = "00";
            time[1] = "00";
            time[2] = "00";
            time[3] = "00";
            this.isstart = true;
            clearInterval(this.timer);
            if(typeof callback != "undefined") {callback(); }
        }else{
            time[0] = Math.floor(value / (1000*60*60*24));
            value = value % (1000*60*60*24);
            time[1] = Math.floor(value / (1000*60*60));
            value = value % (1000*60*60);
            time[2] = Math.floor(value / (1000*60));
            value = value % (1000*60);
            time[3] = Math.floor(value / (1000));
        }
        //$("#"+cd).find(str).each(function(index, element){
        $(cd).each(function(index, element){
            $(element).html(self.zero(time[index]));
        });

        $this.now += 1000;
        setTimeout(function(){$this.timing();},1000);
    }

    this.zero = function(n){
        var n = parseInt(n, 10);
        if(n > 0){
            if(n <= 9){
                n = "0" + n;    
            }
            return String(n);
        }else{
            return "00";    
        }
    }

    this.timing();
    if(this.isstart == false)
    this.timer = setInterval(function(){ self.timing(); }, 1000);
}
//
///* 倒计时 end */
//
//
////#region 获取可抢得优惠券剩余票数
//function PromoCodeRemain(id) {
//    this.$el = $("#"+id);
//    if(this.$el.length == 0) { return; }
//    this.url = this.$el.attr("data-ajaxurl");
//    if(this.url.length == 0) { return; }
//    this.url += "?action=remain";
//
//    this.timer = null;
//}
//
//PromoCodeRemain.prototype.Run = function() {
//    var self = this;
//    var $el = this.$el, url = this.url;
//
//    $el.show();
//    $.getJSON(url, function(res) {
//        //出错
//        if(res.status_code != "00") {
//            //dialog.info("提示",ErrorMsg[res.status_code]);
//            return;
//        }
//
//        var count = res.count;
//        $el.find("em").html(count);
//
//        if(count != 0) {
//            //5秒轮训
//            self.timer = setTimeout(function(){ self.Run(); }, 5000);    
//        }
//    });
//}
//
//PromoCodeRemain.prototype.Stop = function() {
//    clearTimeout(this.timer);
//}
////#endregion
//
////初始化头部优惠码倒计时
//function InitHeaderPromotion() {
//
//    if($("#ptCountdown").length == 0 && $("#alcpCountdown").length == 0 && $("#sportCountdown").length == 0) {
//        return;
//    }
//
//    //对象集合
//    var PromoRemainList = {};
//    /* 取消588优惠券
//    var promotionstarttime = $("#ptCountdown").find("[type='hidden']").val();
//    */
//    var alcpPromotionStartTime = $("#alcpCountdown").find("[type='hidden']").val();
//    var sportPromotionStartTime = $("#sportCountdown").find("[type='hidden']").val();
//
//    //pt588优惠券活动活动
//    /* 取消588优惠券
//    if (promotionstarttime.length == 0) {
//        $("#ptCountdown").hide();
//        $("#ptCouponNone").show();
//    }
//    else {
//
//        //开始倒计时
//        var ptcd = new Countdown("#ptCountdown div", promotionstarttime, function () {
//            //隐藏状态
//            if ($("#nh_coupon").css("opacity") == "0") {
//                return;
//            }
//
//            //倒计时结束
//            $("#ptCountdown").hide();
//            if (typeof PromoRemainList.PT == "undefined") {
//                PromoRemainList.PT = new PromoCodeRemain("ptCouponRemains");
//            }
//
//            PromoRemainList.PT.Run();
//        });
//
//        //导航“优惠券”展开
//        $(document).bind("CouponDropDownShow", function (e) {
//            //活动未开始
//            if (ptcd.isstart == false) {
//                return;
//            }
//
//            $("#ptCountdown").hide();
//            if (typeof PromoRemainList.PT == "undefined") {
//                PromoRemainList.PT = new PromoCodeRemain("ptCouponRemains");
//            }
//            PromoRemainList.PT.Run();
//
//        }).bind("CouponDropDownHide", function (e) {
//            //活动未开始
//            if (ptcd.isstart == false) {
//                return;
//            }
//
//            typeof PromoRemainList.PT != "undefined" && PromoRemainList.PT.Stop();
//        });
//    }
//    */
//
//    //pt88优惠券活动
//    if (alcpPromotionStartTime.length == 0) {
//        $("#alcpCountdown").hide();
//        $("#alcpCouponNone").show();
//    }
//    else {
//
//        //开始倒计时
//        var alcpcd = new Countdown("#alcpCountdown div", alcpPromotionStartTime, function () {
//            //隐藏状态
//            if ($("#nh_coupon").css("opacity") == "0") {
//                return;
//            }
//
//            //倒计时结束
//            $("#alcpCountdown").hide();
//            if (typeof PromoRemainList.ALCP == "undefined") {
//                PromoRemainList.ALCP = new PromoCodeRemain("alcpCouponRemains");
//            }
//
//            PromoRemainList.ALCP.Run();
//        });
//
//        //导航“优惠券”展开
//        $(document).bind("CouponDropDownShow", function (e) {
//            //活动未开始
//            if (alcpcd.isstart == false) {
//                return;
//            }
//
//            $("#alcpCountdown").hide();
//            if (typeof PromoRemainList.ALCP == "undefined") {
//                PromoRemainList.ALCP = new PromoCodeRemain("alcpCouponRemains");
//            }
//            PromoRemainList.ALCP.Run();
//
//        }).bind("CouponDropDownHide", function (e) {
//            //活动未开始
//            if (alcpcd.isstart == false) {
//                return;
//            }
//
//            typeof PromoRemainList.PT != "undefined" && PromoRemainList.ALCP.Stop();
//        });
//    }
//    
//
//    //sport88优惠券活动
//    if (sportPromotionStartTime.length == 0) {
//        $("#sportCountdown").hide();
//        $("#sportCouponNone").show();
//    }
//    else {
//
//        //开始倒计时
//        var sportcd = new Countdown("#sportCountdown div", sportPromotionStartTime, function () {
//            //隐藏状态
//            if ($("#nh_coupon").css("opacity") == "0") {
//                return;
//            }
//
//            //倒计时结束
//            $("#sportCountdown").hide();
//            if (typeof PromoRemainList.SPORT == "undefined") {
//                PromoRemainList.SPORT = new PromoCodeRemain("sportCouponRemains");
//            }
//
//            PromoRemainList.SPORT.Run();
//        });
//
//        //导航“优惠券”展开
//        $(document).bind("CouponDropDownShow", function (e) {
//            //活动未开始
//            if (sportcd.isstart == false) {
//                return;
//            }
//
//            $("#sportCountdown").hide();
//            if (typeof PromoRemainList.SPORT == "undefined") {
//                PromoRemainList.SPORT = new PromoCodeRemain("sportCouponRemains");
//            }
//            PromoRemainList.SPORT.Run();
//
//        }).bind("CouponDropDownHide", function (e) {
//            //活动未开始
//            if (sportcd.isstart == false) {
//                return;
//            }
//
//            typeof PromoRemainList.PT != "undefined" && PromoRemainList.SPORT.Stop();
//        });
//    }
//
//}