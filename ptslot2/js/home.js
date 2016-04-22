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

//底部动画切换
var FooterSwitch = { timer: null };
FooterSwitch.Init = function () {
    this.BindEvent();
}
FooterSwitch.BindEvent = function () {
    var _t = this;

    //触摸事件
    $("#footer-col-1").mouseenter(function () {
        clearTimeout(_t.timer);
        _t.timer = setTimeout(function () {

            $("#ft-rightblock").stop().animate({
                "marginTop": -110
            }, 1000, "easeOutQuart");

        }, 500);

    }).mouseleave(function () {
        clearTimeout(_t.timer);
        _t.timer = setTimeout(function () {

            $("#ft-rightblock").stop().animate({
                "marginTop": 0
            }, 1000, "easeOutQuart");

        }, 500);

    });

    $("#ft-rightblock").mouseenter(function () {
        clearTimeout(_t.timer);
    }).mouseleave(function () {
        $("#footer-col-1").mouseleave();
    });

}

FooterSwitch.Init();
/*website footer end*/


//#region winreload
function winreload() {
    window.location.reload();
}
//#endregion

//#region setClientData
function setClientdata(data,includeLanguage) {
     uv = data;
    
    if (typeof uv.t == 'string') {
        uv.t = utility.dateDeserialize(uv.t);
    }

    if (!uv.gap) {
        uv.gap = new Date() - uv.t;
    }

  //  $("#timezone").html("" + uv.tz + " ");
	$("#timezone").html("GMT&nbsp;+8&nbsp;&nbsp;");
    
    if(data.l) { //login
        $("#lb-membername").html(uv.l.mn);
        uv.l.um != 0 && $("#new-msg").show().find("span").html(uv.l.um);

        $("#headerLogin").hide();
        $("#headerPanel").show();
    }
    else { //logout
        
        $("#headerLogin").show();
        $("#headerPanel").hide();
    }
}
//#endregion


function setMessage(res) {
    if (res.success) {
        Message.unread = res.result.c;
        if (Message.unread > 0) {
            $("#new-msg").find("span").html(Message.unread).attr("title", "您有" + Message.unread + "未读消息").parent().show();
            $(".t-2", ".mc-nav .bd").first().html("您有(" + Message.unread + ")条新的消息");
        }
        else {
            $("#new-msg").hide();
            $(".t-2", ".mc-nav .bd").first().html("您暂无未读消息哦");
        }
    }
}



//#region Announcement
var ann = {
    show: function() {

        //modify by 20121118
        //var serverUrl = $("body").hasClass("login") ? "memberservice/getallann" : "publicservice/getallann";
        /*
        var serverUrl = "/general/getallann.aspx";

            utility.service(serverUrl, null, function (result) {
        $("#announcement").html(result.ann).show();
        gv.av = result.v;
        });
        */

        if (header.intervalId) {
            window.clearInterval(header.intervalId);
        }

        // header.intervalId = setInterval(function() {
            // if (dialog.openned) {
                // return;
            // }
// 
            // //serverUrl = $("body").hasClass("login") ? "memberservice/refreshann" : "publicservice/refreshann";
            // serverUrl = "/service/refreshann.aspx";
// 
            // utility.service(serverUrl, { versionNumber: window.gv.av },
                    // function(result) {
                        // //if (result != null && result.v) {
                        // // $("#announcement").html(result.ann);
                        // //gv.av = result.v;
                        // //}
                        // if (result != null && result.success) {
                            // setMessage(result);
                        // }
                    // }
                // );
        // }, 15000); //TODO, Set 15 seconds only

        var announcementLink$ = $("#announcement").parent();

        announcementLink$.click(function(event) {
            var href = announcementLink$.attr("href");

            if ($("body").hasClass("login")) {
                utility.openWindow(href, "myaccount", 974);
            }

            event.stopPropagation();
            event.preventDefault();
        }
        );
    },
    stop: function() {
        if (header.intervalId) {
            window.clearInterval(header.intervalId);
        }

        $("#announcement").html("").hide();
    }
};
//#endregion


//#region header
var header = {
    intervalId: null,
    init: function () {
            setClientdata(uv);
                    
            ann.show();

            //#region Bind Events
//            $("#LoginName,#Password,#CheckCode").focus(function () {
//                var $this = $(this);
//                var maskClassName = $this.attr("id") + "-mask";
//                $this.removeClass(maskClassName);
//            }).blur(function () {
//                var $this = $(this);
//                var maskClassName = $this.attr("id") + "-mask";
//                if ($this.val() == "") {
//                    $this.addClass(maskClassName);
//                }
//            }).blur();

            $("#btn-balance").click(function (event) {
                $(this).addClass("loading");
                utility.service("/member/refreshaccount.aspx", null, function (result) {
                    windowSync.setClientdata(result);
                });
                event.preventDefault();
            });

            $("#btn-logout").click(function () {
                ann.stop();
                utility.service("/zh-cn/member/login.aspx?action=logout",
                    null,
                    function (result) {
                    /*
                        setClientdata(result);
                        windowSync.setlogout();
                        $("#login-panel").removeClass("login-loading");
                        */
                       winreload(); 
                    });
            });

            $("#btn-login").click(function (event) {
                var isFailed = false;
                //$("#LoginName,#Password,#CheckCode").each(function () {
                $("#LoginName,#Password").each(function() {
                    var this$ = $(this);
                    var value = this$.val();
                    if (value == "") {
                        isFailed = true;
                        var button = {};
                        button[l.OK] = function () {
                            dialog.close();
                            this$.focus();
                        };
                        dialog.error(l.Message, this$.attr("data-val-required"), button);
                        return false; //break loop
                    }
                });
                if (isFailed) {
                    event.stopPropagation(); //Cancel form submit
                    event.preventDefault();
                    return false;
                }

                $("#login-panel").addClass("login-loading");
            });

            /*
            $("#captcha").click(function () {
                utility.reloadImg($(this));
            });
            */

            $("#announcement").hover(
                function () { this.stop(); },
                function () { this.start(); }
            );
            //#endregion

            //#region initSubmitForm
            if ($("#btn-login")[0]) {
                utility.initSubmitForm($("#loginForm"), $("#btn-login"),
                    function (result) {
                        if(result.s && result.s == 5) {                            
                            window.location.href = "/zh-cn/LockPage.aspx?locktype=main&membername=" + result.member; 
                        }

                        if (result.fcp) { //Change password
                            $("#btn-changepassword").click();
                            $("#Password,#CheckCode").val("").blur();
                           // utility.reloadImg($("#captcha"));
                            $("#login-panel").removeClass("login-loading");
                        } else { //login success
                            // if login from sportsbook page, then have to refresh the whole page to force re-login the sportsbook odds page
                            var currentUrl = window.location.href;
                            if (currentUrl.substr(currentUrl.length - 11) == "/sportsbook" || currentUrl.substr(currentUrl.length - 12) == "/sportsbook/") {
                                winreload();
                            }
                            else if(currentUrl.substr(currentUrl.length - 16) == "/GameCenter.aspx") {
                                window.location.href="/ptcasino/launch.aspx?type=game";
                            }
                            else {
                                uv = result;
                                setClientdata(result, true); //body.addClass("login")
                                $("#LoginName,#Password,#CheckCode").val("").blur();
                            }
                        }
                    },
                    function (result) {
                       // utility.reloadImg($("#captcha"));
                        $("#Password,#CheckCode").val("").blur();
                        $("#login-panel").removeClass("login-loading");
                        $("#Password").focus();
                    },
                    false
                );
            }
            //#endregion
    },
    _validNavA: function (a$) {
        var href = a$.attr("href");
        return a$.attr("target") != "_self" && href != "#" && href != "javascript:void(0)" && !a$.attr("data-window") && !a$.attr("data-dialog");
    },
    setBalance: function (balance) {
        $("#lb-balance").html(balance);
    },
    highlightTab: function (tab) {
        // remove all and then highlight current page's tab
        $(">li>a", "#main-nav").removeClass("selected");
        $("#" + tab, "#main-nav").addClass("selected");
    }    
};
//#endregion

//#region document.ready
$(function () {
    if (!window.name) { window.name = "MAINWINDOW"; }

    header.init();
});
//#endregion



//#easing method
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

//#end easing method