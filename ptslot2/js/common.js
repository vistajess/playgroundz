/// <reference path="Lib/jquery-1.4.4-vsdoc.js" />
$(function(){
//    jQuery.validator.setDefaults({
//        errorPlacement: function(error, element){
//            var errorLeft = element.position().left;
//            var elementTop = element.position().top + element.offsetParent().scrollTop();
//            
//            error.css('left', errorLeft);
//            error.css('top', elementTop);
//            error.css("font-size", "12px");
//			
//
//            error.css("color", "#F4ABA1");
//            //error.css("display","block");
//            error.insertAfter(element);
//            error.width(element.width());
//            error.hide();
//            
//            var errorTop = elementTop - error.height() - 4;
//            if (errorTop < 0) {
//                errorTop = elementTop + element.height() + 4;
//            }
//            
//            error.css('left', errorLeft);
//            error.css('top', errorTop);
            
//            element.mouseover(function(e){
//                if (element.hasClass('error')) {
//                    error.show();
//                }
//            });
//            element.mouseout(function(){
//                error.hide();
////            });
//        }
//    });
    //    jQuery.validator.setDefaults({
    //        errorPlacement: function(error, element){
    //            var errorDiv = jQuery('<div/>', {
    //				"class":"input-tips"
    //            }).css("display","block");
    //			
    //			
    //           jQuery.validator.setDefaults({    
    //    errorPlacement: function(error, element) {                                         
    //         var errorLeft = element.position().left;
    //         var elementTop = element.position().top + element.offsetParent().scrollTop();    
    //         
    //         error.css('left', errorLeft);
    //         error.css('top', elementTop);
    //         error.insertAfter(element);                                         
    //         error.width(element.width());
    //         error.hide();
    //         
    //         var errorTop = elementTop - error.height() - 4;
    //         if(errorTop < 0){
    //             errorTop = elementTop + element.height() + 4;
    //         }
    //
    //         error.css('left', errorLeft);
    //         error.css('top', errorTop);
    //                                          
    //         element.mouseover(function(e){
    //             if(element.hasClass('error')){
    //                 error.show();
    //             }
    //         });
    //         element.mouseout(function(){
    //             error.hide();
    //         });
    //     }
    //});
    //        }
    //    });
});
//#region Resources
var r = {
    "en-gb": {
        OK: "OK",
        Cancel: "Cancel",
        Message: "Message",
        UpdatedSuccess: "Updated Success",
        lc: "Live Chat",
        Deposit: "deposit",
        Withdrawal: "withdrawal",
        Transfer: "transfer",
        PaymentLimit: "Your {3} limit allowed by the system is as follow:<br /> Minimum {3} amount: <em>{0} {1}</em><br /> Maximum {3} amount: <em>{0} {2}</em>",
        ConfirmTransfer: "Please confirm your {0} request."
    },
    "zh-cn": {
        OK: "确定",
        Cancel: "取消",
        Message: "消息",
        UpdatedSuccess: "修改成功",
        lc: "在线客服",
        Deposit: "存款",
        Withdrawal: "提款",
        Transfer: "转帐",
        PaymentLimit: "本公司所设定的{3}限额为下：<br />最低{3}限额：<em>{0} {1}</em><br />最高{3}限额：<em>{0} {2}</em><br />",
        ConfirmTransfer: "您确定要进行{0}？"
    },
    "zh-tw": {
        OK: "確定",
        Cancel: "取消",
        Message: "消息",
        UpdatedSuccess: "修改成功",
        lc: "在線客服",
        Deposit: "存款",
        Withdrawal: "提款",
        Transfer: "轉帳",
        PaymentLimit: "本公司所設定的{3}限額為下：<br />最低{3}限額：<em>{0} {1}</em><br />最高{3}限額：<em>{0} {2}</em><br />",
        ConfirmTransfer: "您確定要進行{0}？"
    },
    "id-id": {
        OK: "OK",
        Cancel: "Batal",
        Message: "Pesan",
        UpdatedSuccess: "Diperbarui",
        lc: "Chat Live",
        Deposit: "deposit",
        Withdrawal: "withdrawal",
        Transfer: "transfer",
        PaymentLimit: "Batas {3} anda yang diizinkan oleh sistem adalah sebagai berikut: <br /> Minimum {3} jumlah: <em> {0} {1} </em> <br /> Maksimum {3} jumlah: <em> {0} {2} </ em>",
        ConfirmTransfer: "Sila konfirmasi permintaan {0} anda."
    },
    "vi-vn": {
        OK: "OK",
        Cancel: "Hủy bỏ",
        Message: "Tin nhắn",
        UpdatedSuccess: "Cập nhật thành công",
        lc: "Trò chuyện trực tuyến",
        Deposit: "Gửi tiền",
        Withdrawal: "Rút tiền",
        Transfer: "Chuyển khoản",
        PaymentLimit: "Giới hạn {3} của bạn được cho phép bởi hệ thống như sau:  <br /> Số tiền {3} tối thiểu: <em> {0} {1} </em> <br /> Số tiền  {3} tối đa: <em> {0} {2} </ em>",
        ConfirmTransfer: "Vui lòng xác nhận yêu cầu {0} của bạn."
    }
};

var l = (gv && gv.lang) ? r[gv.lang] : {};
//#endregion

//#region Data.Prototype
Date.prototype.format = function(format){
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) 
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) 
        if (new RegExp("(" + k + ")").test(format)) 
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

Date.prototype.toDateTimeString = function(){
    return this.format("yyyy-MM-dd  hh:mm:ss");
};
Date.prototype.toDateTimeString2 = function(){
    return this.format("yyyy/MM/dd hh:mm:ss");
};
//#endregion

//#region jQuery.cookie
jQuery.cookie = function(name, value, options){
    if (typeof value != 'undefined') {// name and value given, set cookie
        options = options ||
        {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            }
            else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
            // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    }
    else {// only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
//#endregion

//#region windowSync
var childWindows = [];
var windowSync = {
    _validWin: function(win, sourceWindow){
        try {
            return win && win != window && win != sourceWindow && !win.closed && win.windowSync;
        } 
        catch (ex) {
            return false;
        }
    },
    setSessionLost: function(msg, sourceWindow){
        utility.sessionLost(msg, window);
        for (var i = 0; i < childWindows.length; i++) {
            var win = childWindows[i];
            if (windowSync._validWin(win, sourceWindow)) {
                win.utility.sessionLost(msg, window);
            }
        }
        if (windowSync._validWin(window.opener, sourceWindow)) {
            window.opener.windowSync.setSessionLost(msg, window);
        }
        if (windowSync._validWin(window.parent, sourceWindow)) {
            window.parent.windowSync.setSessionLost(msg, window);
        }
    },
    setClientdata: function(response, sourceWindow){
        if (window.setClientdata) {
            window.setClientdata(response);
        };
        for (var i = 0; i < childWindows.length; i++) {
            var win = childWindows[i];
            if (windowSync._validWin(win, sourceWindow)) {
                win.setClientdata(response, window);
            }
        }
        if (windowSync._validWin(window.opener, sourceWindow)) {
            window.opener.windowSync.setClientdata(response, window);
        }
        if (windowSync._validWin(window.parent, sourceWindow)) {
            window.parent.windowSync.setClientdata(response, window);
        }
    },
    setlogout: function(sourceWindow){
        var isTop = true;
        if (windowSync._validWin(window.opener, sourceWindow)) {
            isTop = false;
            window.opener.windowSync.setlogout(window);
        }
        if (windowSync._validWin(window.parent, sourceWindow)) {
            isTop = false;
            window.parent.windowSync.setlogout(window);
        }
        for (var i = 0; i < childWindows.length; i++) {
            var win = childWindows[i];
            //if (windowSync._validWin(win, window))
            try {
                win.close();
            } 
            catch (ex) {//live casino page will throw exception in some browsers.
            }
        }
        if (isTop) {
            //            var homeurl = $("#logo").attr("href");
            //            if (homeurl) {
            //                window.location.href = homeurl;
            //            }
            //            else {
            window.location.reload();
            //            }
        }
        else {
            window.open('', '_self', '');
            //prevent prompt message when window opened by ctrl + clicking link
            window.close();
        }
    },
    closeAndBackTohome: function(homeurl, sourceWindow){
        var isTop = true;
        if (windowSync._validWin(window.opener, sourceWindow)) {
            isTop = false;
            window.opener.windowSync.closeAndBackTohome(window);
        }
        if (windowSync._validWin(window.parent, sourceWindow)) {
            isTop = false;
            window.parent.windowSync.closeAndBackTohome(window);
        }
        for (var i = 0; i < childWindows.length; i++) {
            var win = childWindows[i];
            if (windowSync._validWin(win, sourceWindow)) {
                win.open('', '_self', '');
                //prevent promot message when window opened by ctrl + clicking link
                win.close();
            }
        }
        if (isTop) {
            //if (typeof (homeurl) == String) {
            if (String(typeof(homeurl)) == "string") {
                window.location.href = homeurl;
            }
        }
        else {
            window.open('', '_self', '');
            //prevent promot message when window opened by ctrl + clicking link
            window.close();
        }
    },
    regChildWindow: function(win){
        childWindows.push(win);
    }
};
//#endregion

//#region utility
var utility = {
    isLogined: function(){
        return (typeof uv.l != "undefined" && typeof uv.l.mn != "undefined" && uv.l.mn != "") ? true : false;
    },
    stopRequest: false,
    
    //#region dateDeserialize
    dateDeserialize: function(dateStr){
        return eval("new Date(" + dateStr + ")");
    },
    //#endregion
    
    //#region now
    now: function(){
        return new Date(new Date() - uv.gap);
    },
    //#endregion
    
    //#region getValueFromHash
    getValueFromHash: function(href, key, defaultValue){
        if (defaultValue == null) 
            defaultValue = "";
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?#]" + key + "=([^##]*)");
        var qs = regex.exec(href);
        if (qs == null) 
            return defaultValue;
        else 
            return qs[1];
    },
    //#endregion
    
    //#region updateLocation
    updateLocation: function(location, key, value, isUpdateHash){
        var regex;
        var urlPart;
        if (isUpdateHash) {
            regex = new RegExp("([#|&])" + key + "=.*?(#|$)", "i");
            urlPart = location.hash;
        }
        else {
            regex = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
            urlPart = location.search;
        }
        var result;
        if (urlPart.match(regex)) {
            result = urlPart.replace(regex, '$1' + key + "=" + value + '$2');
        }
        else {
            var linkedChar = isUpdateHash ? '#' : '?';
            if (urlPart.indexOf(linkedChar) >= 0) 
                linkedChar = '&';
            result = urlPart + linkedChar + key + "=" + value;
        }
        if (isUpdateHash) {
            location.hash = result;
        }
        else {
            location.search = result;
        }
    },
    //#endregion
    
    //#region initSubmitForm
    initSubmitForm: function(form$, btnSubmit$, submitSuccessCallBack, failedCallBack, setFocus, beforeSend){
    
        if (setFocus == null) {
            setFocus = true;
        }
        
        var inputs = $('input[type!="hidden"]', form$).focus(function(){
            var parent = $(this).parent();
            if (parent.hasClass("field-c")) {
                parent.addClass("focus");
            }
            
            //var errortip = $(this).next().next();
            var errortip = $(this).siblings(".error-tip");
            var position = $(this).position();
            errortip.css("left", position.left).css("top", position.top + 30);
            if (errortip.hasClass("error-tip") && errortip.find(">p:first").html() != "" && $(this).attr("tagName") != "SELECT") {
                errortip.show();
            }
        }).blur(function(){
            $(this).parent().removeClass("focus");
            //var errortip = $(this).next().next();
            var errortip = $(this).siblings(".error-tip");
            if (errortip.hasClass("error-tip")) {
                errortip.hide();
            }
        }).bind("validate-error", function(event, error, container){
            container.next().find(">p:first").html(error.html());
            if (container.parent().hasClass("focus") && $(this).attr("tagName") != "SELECT") {
                container.next().show();
            }
        }).bind("validate-success", function(event, error, container){
            container.next().hide().find(">p:first").html("");
        }).keydown(function(event){
            if (event.keyCode == 13) {
                $(this).blur();
                // prevent the button.click run 2 times
                btnSubmit$.click();
            }
        });
        
        if (setFocus) {
            inputs.each(function(){
                var this$ = $(this);
                if (!this$.attr("readonly") && !this$.attr("disabled")) {
                    this$.focus();
                    return false;
                    //break
                }
            });
        }
        
        var currentForm = form$.validate().currentForm;
        var errorTip = $('<div class="error-tip"><p class="error-tip-c"></p></div>');
        
        //$(currentForm).find("span.field-validation-valid").click(function () {
        $(currentForm).find("span.field-validation").click(function(){
            $(this).prev().focus();
        }).after(errorTip);
        
        btnSubmit$.click(function(event){
            if (!form$.valid()) {
                event.stopPropagation();
                return;
            }
            
            if (!event.isPropagationStopped() && !btnSubmit$.hasClass("disabled")) {
                if (beforeSend) {
                    if (!beforeSend()) {
                        event.stopPropagation();
                        event.preventDefault();
                        return;
                    }
                }
                btnSubmit$.attr("disabled", "disabled").addClass("disabled");
                //btnSubmit$.hide();
                var url = form$.attr("action");
                utility.service(url, form$.serialize(), function(result){
                    btnSubmit$.removeAttr("disabled").removeClass("disabled");
                    //btnSubmit$.show();
	                    submitSuccessCallBack(result);
                }, function(result){
                    if (result) {
                        if (failedCallBack) {
                            failedCallBack(result);
                        }
                    }
                    btnSubmit$.removeAttr("disabled").removeClass("disabled");
                    //btnSubmit$.show();
                }, form$.attr("method"), form$.attr("dataType"));
            }
            
            //return false;
            event.stopPropagation();
            event.preventDefault();
            
        }).removeAttr("disabled");
        
    },
    //#endregion
    
    //#region getCultureUrl
    getCultureUrl: function(url){
        if (url.indexOf("http") == 0) {
            //do nothing;
        }
        else {
            //var culUrl = "/" + gv.lang + "/";
            // modify by 2012-11-15
            var culUrl = "";
            if (url.indexOf(culUrl) != 0) {
                url = culUrl + url;
            }
        }
        return url;
    },
    //#endregion
    
    //#region service
    service: function(url, parameter, successCallBack, errorCallBack, type, dataType){
        //        if (utility.stopRequest) {
        //            return;
        //        }
        
        var paramObj = {
            url: url,
            cache: false,
            data: parameter,
            async: true,
            //timeout : 10000,
            success: function(response){
                if (response == "" || response == null) {
                    response = null;
                }
                else {
                    if (response._sl) {//Session lost, reload current page
                        windowSync.setSessionLost(response._err);
                        return;
                    }
                    else 
                        if (response._err) {
                            if (errorCallBack) {
                                errorCallBack(response);
                            }
                            else {
                                dialog.error(l.Message, response._err);
                            }
                            return;
                        }
                }
                
                if (successCallBack) {
                    successCallBack(response);
                }
                response = null;
            },
            error: function(jqXHR, textStatus, exception){
                if (errorCallBack) {
                    errorCallBack(jqXHR, textStatus, exception);
                }
                else 
                    if (jqXHR.responseText) {
                    }
                    else {
                    }
            }
        };
        
        if (type == "GET") {
            paramObj.type = "GET";
        }
        else {
            paramObj.type = "POST";
        }
        if (dataType) {
            paramObj.dataType = dataType;
        }
        if (parameter && parameter._timeout) {
            paramObj.timeout = parameter._timeout;
            delete parameter._timeout;
        }
        
        paramObj.url = utility.getCultureUrl(paramObj.url);
//        console.log(JSON.stringify(paramObj));
        //        if (responseDataType) {
        //            var dataTypeObj = {
        //                dataType: responseDataType
        //            };
        //            $.extend(paramObj, dataTypeObj);
        //        }
        console.log(paramObj);
        return $.ajax(paramObj);
    } //#endregion
    //#region sessionLost
    ,
    sessionLost: function(msg){
        /*
         if (!$("body").hasClass("login")) {
         return;
         }
         */
        var button = {};
        button[l.OK] = function(){
            windowSync.setlogout();
        };
        dialog.error(l.Message, msg, button);
    } //#endregion
    //#region reloadImg
    ,
    reloadImg: function(img$){
        var src = img$.attr("src").split("?")[0] + "?r=" + Math.random();
        img$.attr('src', src);
    } //#endregion
    //#region showPopUp
    ,
    showPopUp: function(url, title, width, height){
        var livechatUrl = "#";
        //utility.getCultureUrl("home/livechat");
        
        $("#popup").remove();
        var $div = window.top.$('<div id="popup"></div>');
        $div.html('<iframe height="100%" weight="auto" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" src="' + url + '" />');
        $div.css("width", width);
        $div.find("iframe").css("width", width);
        $div.dialog({
            height: height,
            width: width,
            resizable: false,
            modal: true,
            title: title,
            dialogClass: 'popup'
        });
        //.parent().find(">div.ui-dialog-titlebar>span").after('<a href="' + livechatUrl + '" target="_blank" class="popup-live-chat" data-window="livechat|700|470">' + l.lc + '</a>');
    
    } //#endregion
    //#region showWarePopUp
    ,
    showWarePopUp: function(url, title, width, height, param, callback, closeCallBack){
        var template = _.template($(url).html());
        var html = template(param);
        var livechatUrl = "#";
        //utility.getCultureUrl("home/livechat");
        
        $("#popup").remove();
        var $div = window.top.$('<div id="popup" ></div>');
        $div.html('<div  >' + html + '</div>');
        //console.log(html);
        $div.css("width", width);
        //$div.find("div").css("width", width);
        //$div.find("div").css("height", height);
        $div.dialog({
            height: height,
            width: width,
            resizable: false,
            modal: true,
            title: title,
            dialogClass: 'popup',
            close: closeCallBack
        });
        //.parent().find(">div.ui-dialog-titlebar>span").after('<a href="' + livechatUrl + '" target="_blank" class="popup-live-chat" data-window="livechat|700|470">' + l.lc + '</a>');
        //$("#popup").height("auto");
        if (callback) {
            if (!isString(callback)) {
                callback();
            }
            else {
                eval(callback);
            }
        }
        
        //if(callback)
        //{callback();}
    
    } //#endregion
    //#region showPopUp2
    ,
    showPopUp2: function(url, title, width, height, closefn){
        $("#popup").remove();
        var $div = window.top.$('<div id="popup"></div>');
        $div.html('<iframe height="100%" weight="auto" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" src="' + url + '" />');
        $div.css("width", width);
        $div.find("iframe").css("width", width);
        $div.dialog({
            height: height,
            width: width,
            resizable: false,
            modal: true,
            title: title,
            dialogClass: 'popup',
            close: closefn
        });
    } //#endregion
    //#region closePopUp
    ,
    closePopUp: function(){
        window.top.$("#popup").dialog("close").remove();
    } //#endregion
    //#region openWindow
    ,
    openWindow: function(url, name, width, height){
        var x = 0, y = 0, w = 800, h = 600;
        // default value: width=800, height=600
        if (width) 
            w = width;
        if (height) 
            h = height;
        try {
            x = (screen.width - w) / 2;
            y = (screen.height - h) / 2;
        } 
        catch (e) {
        }
        var features = "resizable=1, scrollbars=1, left=" + x + ", top=" + y + ", width=" + w + ", height=" + h;
        var hostname = document.location.hostname.replace(/\./g, "");
        // remove dot from hostname
        var win = window.top.open(url, hostname + name, features);
        win.focus();
        windowSync.regChildWindow(win);
        return win;
    } //#endregion
    //#region Get Query String
    ,
    UrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    } //#endregion
    ,
    FmtMoney: function(s, n){
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
};
//#endregion

//#region dialog
var dialog = {
    openned: false,
    //#region close
    close: function(){
        $('#dialog').dialog("close").remove();
        dialog.openned = false;
    } //#endregion
    //#region _getHTML
    ,
    _getHTML: function(htmlArray){
        if (htmlArray.join) {
            return "<div class='msg'><p>" + htmlArray.join("</p><p>") + "</p></div>";
        }
        else {
            return "<div class='msg'><p>" + htmlArray + "</p></div>";
        }
    } //#endregion
    //#region _show
    ,
    _show: function(title, messageHtml, buttons){
        var _buttons;
        if (buttons.each) {
            _buttons = {};
            buttons.each(function(){
                var href = $(this).attr("href");
                _buttons[$(this).html()] = function(){
                    window.location.href = href;
                };
            });
        }
        else {
            _buttons = buttons;
        }
        dialog.close();
        var $div = window.top.$('<div id="dialog"></div>');
        $div.html('<div class="field-c">' + messageHtml + '</div>');
        $div.dialog({
            resizable: false,
            modal: true,
            buttons: _buttons,
            title: title,
            dialogClass: 'dialog',
            minWidth: 360,
            minHeight: 200
        });
        dialog.openned = true;
    },
    //#endregion
    
    //#region info
    info: function(title, messageHtml, buttons){
        if (messageHtml == null) {
            messageHtml = l.UpdatedSuccess;
        }
        if (buttons == null) {
            buttons = {};
            buttons[l.OK] = function(){
                dialog.close();
            };
        }
        dialog._show(title, '<span class="icon true"></span>' + dialog._getHTML(messageHtml), buttons);
    },
    //#endregion
    
    //#region error
    error: function(title, messageHtml, buttons){
        if (messageHtml == null) {
            messageHtml = l.UpdatedSuccess;
        }
        if (buttons == null) {
            buttons = {};
            buttons[l.OK] = function(){
                dialog.close();
            };
        }
        dialog._show(title, '<span class="icon error1"></span>' + dialog._getHTML(messageHtml), buttons);
    },
    //#endregion
    
    //#region confirm
    confirm: function(title, messageHtml, buttons){
        if (messageHtml == null) {
            messageHtml = l.UpdatedSuccess;
        }
        if (buttons == null) {
            buttons = {};
            buttons[l.OK] = function(){
                dialog.close();
            };
        }
        dialog._show(title, '<span class="icon confirm"></span>' + dialog._getHTML(messageHtml), buttons);
    }
    //#endregion
};
//#endregion

//#region document.ready
$(function(){
    //#region Ajax Loading
    $('#loading, .load').hide().ajaxStart(function(){
        $(this).show();
    }).ajaxStop(function(){
        $(this).hide();
    });
    //#endregion
    
    //#region Language
    $("#sel-language>div.languageDisplay").click(function(event){
        $("#language").toggleClass("hidden");
        event.stopPropagation();
        event.preventDefault();
    });
    
    if ($("#sel-language")[0]) {
        $("body").click(function(){
            $("#language").addClass("hidden");
        });
    }
    //#endregion
    
    //#region Date and Time
    var time$ = $("#time");
    if (time$.length > 0) {
        //$("#time").html(new Date());
        // $("#timezone").html(uv.tz + " ");
        //$("#timezone").html("GMT +8" + " ");
        window.setInterval(function(){
            try {
                var now = new Date();
                $("#time").html(now.toDateTimeString());
            } 
            catch (e) {
                //    Do nothing, Close window will cause exception
            }
        }, 1000);
    }
    
    if ($.datepicker && gv) {
        $.datepicker.setDefaults($.datepicker.regional[gv.lang]);
    }
    //#endregion
    
    //#region document.click
    $(document).click(function(event){//For popup and window.open
        var srcElement;
        
        if (event.srcElement) {
            srcElement = event.srcElement;
        }
        else {
            srcElement = event.target;
        }
        
        if (srcElement.tagName.toLowerCase() != "a") {
            srcElement = $(srcElement).parent()[0];
        }
        
        if (typeof srcElement == "undefined") 
            return;
        
        if (srcElement.tagName && srcElement.tagName.toLowerCase() == "a") {
            var par = $(srcElement).attr("data-window");
            var tokens;
            
            if (par) {
                event.preventDefault();
                tokens = par.split("|");
                //myaccount|974|600|a-l|please click this button after you login
                if (tokens[3] && tokens[3] == "a-l") {//after login
                    if (!$("body").hasClass("login")) {
                        dialog.error(l.Message, tokens[4]);
                        return;
                    }
                }
                utility.openWindow($(srcElement).attr("href"), tokens[0], tokens[1], tokens[2]);
                return;
            }
            
            par = $(srcElement).attr("data-dialog");
            
            if (par) {
                event.preventDefault();
                tokens = par.split("|");
                //Join Us|974|600|a-l|please click this button after you login
                if (tokens[3] && tokens[3] == "a-l") {//after login
                    if (!$("body").hasClass("login")) {
                        dialog.error(l.Message, tokens[4]);
                        return;
                    }
                }
                utility.showPopUp($(srcElement).attr("href"), tokens[0], tokens[1], tokens[2]);
                return;
            }
            
            par = $(srcElement).attr("data-waredialog");
            
            if (par) {
                event.preventDefault();
                tokens = par.split("|");
                //Join Us|974|600|a-l|please click this button after you login
                if (tokens[3] && tokens[3] == "a-l") {//after login
                    if (!$("body").hasClass("login")) {
                        dialog.error(l.Message, tokens[4]);
                        return;
                    }
                }
                var fnName = $(srcElement).attr("callBack");
                
                utility.showWarePopUp($(srcElement).attr("href"), tokens[0], tokens[1], tokens[2], {}, fnName);
                return;
            }
        }
    });
    //#endregion
    
    //#region Set Max Length
    $("input[data-val-length-max]").each(function(){
        var $this = $(this);
        $this.attr("maxlength", $this.attr("data-val-length-max"));
    });
    //#endregion
    
    //#region Show/Hide Terms & Conditions
    $("h4.t-c").click(function(){
        var $this = $(this);
        $this.next().slideToggle();
        $this.parent().toggleClass("show-hide");
    });
    //#endregion
});
//#endregion
function isFunction(fn){
    return !!fn && !fn.nodeName && fn.constructor != String && fn.constructor != RegExp && fn.constructor != Array && /function/i.test(fn + "");
}

function isString(str){
    return (typeof str == 'string') && str.constructor == String;
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function FloatAdd(arg1, arg2){
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } 
    catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } 
    catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function(arg){
    return accAdd(arg, this);
};
Array.prototype.contains = function(element){
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}
function deepCopy(p, c){
    var c = c ||
    {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        }
        else 
            c[i] = p[i];
    }
    return c;
}

var config = {
    //url: "http://192.168.1.113:8080",
    url : "http://174.139.25.34:8765",
    dataType: "jsonp",
    timeout: 10000
};

function switchAccountType(mode){
    mode = mode + "";
    var resultAccountName = mode;
    switch (mode) {
        //alipay
        case "-1":
            resultAccountName = "主账户";
            break;
        //thirdpay
        case "0":
            resultAccountName = "PLAYTECH";
            break;
        case "1":
            resultAccountName = "AG";
            break;
    }
    return resultAccountName;
}

function switchStatusToStatusName(mode){
    mode = mode + "";
    var resultAccountName = mode;
    switch (mode) {
        //alipay
        case "0":
            resultAccountName = "待处理";
            break;
        case "1":
            resultAccountName = "处理中";
            break;
        case "2":
            resultAccountName = "失败";
            break;
        //thirdpay
        case "3":
            resultAccountName = "成功";
            break;
    }
    return resultAccountName;
}

function isArray(v){
    return toString.apply(v) === '[object Array]';
}

function switchPaymentMethodToPaymentName(mode){
    mode = mode + "";
    var resultAccountName = mode;
    switch (mode) {
        //alipay
        case "2":
            resultAccountName = "支付宝";
            break;
        //thirdpay
        case "0":
            resultAccountName = "第三方支付";
            break;
    }
    return resultAccountName;
}

var bankEntityList = [{
    bankName: "农业银行",
    bankCode: "0",
    bankENName: "ABC"
}, {
    bankName: "工商银行",
    bankCode: "1",
    bankENName: "ICBC"
}, {
    bankName: "建设银行",
    bankCode: "2",
    bankENName: "CCB"
}, {
    bankName: "交通银行",
    bankCode: "3",
    bankENName: "BCOM"
}, {
    bankName: "中国银行",
    bankCode: "4",
    bankENName: "BOC"
}, {
    bankName: "招商银行",
    bankCode: "5",
    bankENName: "CMB"
}, {
    bankName: "民生银行",
    bankCode: "6",
    bankENName: "CMBC"
}, {
    bankName: "光大银行",
    bankCode: "7",
    bankENName: "CEBB"
}, {
    bankName: "兴业银行",
    bankCode: "8",
    bankENName: "CIB"
}, {
    bankName: "中国邮政",
    bankCode: "9",
    bankENName: "PSBC"
}, {
    bankName: "平安银行",
    bankCode: "10",
    bankENName: "SPABANK"
}, {
    bankName: "宁波银行",
    bankCode: "11",
    bankENName: "NBB"
}, {
    bankName: "北京银行",
    bankCode: "12",
    bankENName: "BOB"
}, {
    bankName: "华夏银行",
    bankCode: "13",
    bankENName: "HXB"
}, {
    bankName: "浦发银行",
    bankCode: "14",
    bankENName: "SPDB"
}, {
    bankName: "东亚银行",
    bankCode: "15",
    bankENName: "BEA"
}, {
    bankName: "杭州银行",
    bankCode: "16",
    bankENName: "HZB"
}, {
    bankName: "上海银行",
    bankCode: "17",
    bankENName: "SHRCB"
}];


function switchBankCodeToBankName(val){
    val = val + "";
    var bankName = val;
    bankEntityList.forEach(function(element, index, array){
        if (element.bankCode == val) {
            bankName = element.bankName;
        };
            });
    return bankName;
}

function switchPaymentMethodToPaymentENName(mode){
    mode = mode + "";
    var resultAccountName = mode;
    switch (mode) {
        case "2":
            resultAccountName = "ALIPAY";
            break;
        //thirdpay
        case "0":
            resultAccountName = "";
            break;
        default:
            resultAccountName = "";
    }
    return resultAccountName;
}
