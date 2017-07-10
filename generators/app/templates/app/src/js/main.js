(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _var = require('./common/_var.js');

var _util = require('./common/_util.js');

/**
 * document ready and window onload
 * 
 */
$(function () {
    FastClick.attach(document.body);
});
window.onload = function () {
    console.log(_var.CommonVar);
    console.log(_util.UtilFn);
};

},{"./common/_util.js":2,"./common/_var.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 工具方法
 * @author Cc
 * 
 */

var UtilFn = {
    // 动态设置html的font-size，用于rem的计算
    setHtmlFontSize: function setHtmlFontSize(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function recalc() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = clientWidth * 0.1 + 'px';
        };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        // DOM加载之后及资源加载之前去执行，即对应jQuery中的document ready
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },

    // 获取location search参数，返回一个search对象
    getLocationSearchObj: function getLocationSearchObj(qstring) {
        var splitUrl = qstring.split("?");
        var strUrl = splitUrl.length > 1 ? decodeURIComponent(splitUrl[1]).split("&") : [];
        var str = "";
        var obj = {};
        for (var i = 0, l = strUrl.length; i < l; i++) {
            str = strUrl[i].split("=");
            obj[str[0]] = str[1];
        }
        return Array.prototype.sort.call(obj);
    },

    // 判断邮箱正则
    isEmail: function isEmail(str) {
        return (/^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]+)+)$/.test(str)
        );
    },

    // 判断环境
    isiOS: function isiOS() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    isAndriod: function isAndriod() {
        return (/android/.test(navigator.userAgent.toLowerCase())
        );
    },
    isWeChat: function isWeChat() {
        return (/micromessenger/.test(navigator.userAgent.toLowerCase())
        );
    },
    isPc: function isPc() {
        var userAgentInfo = navigator.userAgent.toLowerCase();
        var agents = ["android", "iphone", "ipad", "ipod", "symbianos", "windows phone"];
        var flag = true;
        for (var i = 0; i < agents.length; i++) {
            if (userAgentInfo.indexOf(agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },

    // 密码格式验证: 7-20位数字或者字母
    isPasswordValid: function isPasswordValid(str) {
        return (/^[a-zA-Z0-9]{7,20}$/.test(str)
        );
    },

    // 手机格式验证: 不少于7位数字
    isPhoneValid: function isPhoneValid(str) {
        return (/^[0-9]{7,}$/.test(str)
        );
    },

    // 时间戳转换格式
    date: function date(s, fmt) {
        if (typeof s == "string") {
            s = Number(s);
        }
        fmt = fmt || "yyyy-MM-dd hh:mm:ss";
        var date = new Date(s);
        if ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) == "object") {
            date = s;
        }
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
        return fmt;
    },

    // 设置cookie
    setCookie: function setCookie(name, value, days) {
        days = days || 0;
        var expires = "";
        if (days != 0) {
            //设置cookie过期时间  
            var date = new Date();
            var ms = days * 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + ms);
            expires = "; expires=" + date.toGMTString();
        }
        if (days == Infinity) {
            // 设置最大过期时间
            expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    // 获取cookie
    getCookie: function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';'); //把cookie分割成组  
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]; //取得字符串  
            while (c.charAt(0) == ' ') {
                //判断一下字符串有没有前导空格  
                c = c.substring(1, c.length); //有的话，从第二位开始取  
            }
            if (c.indexOf(nameEQ) == 0) {
                //如果含有我们要的name  
                return c.substring(nameEQ.length, c.length);
            }
        }
        return false;
    },

    // 清除cookies
    clearCookie: function clearCookie(name) {
        this.setCookie(name, "", -1);
    },

    // 去掉结尾空格
    removeLastBlank: function removeLastBlank(value) {
        return value.replace(/(\s*$)/g, "");
    },

    // 设置弹窗垂直居中
    setPopupVerticalMid: function setPopupVerticalMid(domObj) {
        if ($(domObj)) {
            var popupHeight = $(domObj).height();
            $(domObj).css({
                'top': (GlobalConfig.viewHeight - popupHeight) / 2
            });
        } else {
            alert("Popup is not exist！");
        }
    },

    // 生成弹窗
    addPopup: function addPopup(content, bClose) {
        this.delPopup();
        var that = this;
        $('body').append('<div class="m_popup" id="popup"><div class="mask" id="popupMask"></div>' + content + '</div>');
        if (bClose) {
            $('#popupMask').bind('click', function () {
                that.delPopup();
            });
        }
    },
    // 删除弹窗
    delPopup: function delPopup() {
        $('#popup').remove();
    },

    // 设置全局加载
    setLoading: function setLoading(sText) {
        var text = sText || $('#loadingDefaultText').text();
        this.addPopup('<div class="w_loading">' + text + '</div>');
    },

    /**
     * 设置对话框
     * oDialogParams: {
     *  title:              string 弹窗标题,
     *  content:            string 弹窗内容,
     *  isDoubleAction:     boolean 是否两个按钮,
     *  actionText:         string 单按钮文本,
     *  actionFunc:         function 单按钮方法,
     *  leftActionText:     string 左侧按钮文本,
     *  leftActionFunc:     function 左侧按钮方法,
     *  leftActionStyle:    string 左侧按钮样式,
     *  rightActionText:    string 左侧按钮文本,
     *  rightActionFunc:    function 右侧按钮方法,
     *  rightActionStyle:   string 右侧按钮样式,
     *  
     * }
     * 
     */
    setDialog: function setDialog(oDialogParams) {
        var that = this;
        var title = oDialogParams.title ? oDialogParams.title : $('#dialogTitle').text(),
            content = oDialogParams.content,
            actionText = oDialogParams.actionText ? oDialogParams.actionText : $('#dialogActionSubmit').text(),
            leftActionText = oDialogParams.leftActionText ? oDialogParams.leftActionText : $('#dialogActionCancel').text(),
            leftActionStyle = oDialogParams.leftActionStyle ? ' style="' + oDialogParams.leftActionStyle + '"' : '';
        rightActionText = oDialogParams.rightActionText ? oDialogParams.rightActionText : actionText;
        rightActionStyle = oDialogParams.rightActionStyle ? ' style="' + oDialogParams.rightActionStyle + '"' : '';

        var ActionTmpl;
        if (oDialogParams.isDoubleAction) {
            ActionTmpl = '<section class="ft ft_Double">' + '<a href="javascript:;" id="leftAction"' + leftActionStyle + '>' + leftActionText + '</a>' + '<a href="javascript:;" id="rightAction"' + rightActionStyle + '>' + rightActionText + '</a>' + '</section>';
        } else {
            ActionTmpl = '<section class="ft">' + '<a href="javascript:;" id="action">' + actionText + '</a>' + '</section>';
        }

        var tmpl = '<div class="m_dialog" id="dialog">' + '<section class="hd"><span class="title">' + title + '<span></section>' + '<section class="bd">' + content + '</section>' + ActionTmpl + '</div>';

        that.addPopup(tmpl);
        that.setPopupVerticalMid('#dialog');

        // 解决某些低端系统安卓机下（如nexus5、小米等），请求返回页面渲染的bug
        try {
            if (sharesdk) {
                setTimeout(function () {
                    $('body').css({
                        "top": Math.random() + "px"
                    });
                }, 500);
            }
        } catch (e) {}

        $('#action').bind('click', function () {
            that.delPopup();
            if (oDialogParams.actionFunc) {
                oDialogParams.actionFunc();
            }
        });
        $('#leftAction').bind('click', function () {
            that.delPopup();
            if (oDialogParams.leftActionFunc) {
                oDialogParams.leftActionFunc();
            }
        });
        $('#rightAction').bind('click', function () {
            that.delPopup();
            if (oDialogParams.rightActionFunc) {
                oDialogParams.rightActionFunc();
            }
        });
    },

    // 提示
    setTip: function setTip(sTip) {
        $('body').append('<span class="w_tip js_tip"><span class="text">' + sTip + '</span></span>');
        setTimeout(function () {
            $('.js_tip').remove();
        }, 1000);
    }
};

exports.UtilFn = UtilFn;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 全局变量配置
 * 
 */
var CommonVar = {
  listContentWidth: 0,
  currentTime: new Date()
};

exports.CommonVar = CommonVar;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2pzL21vZHVsZS9fbWFpbi5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdXRpbC5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNJQTs7QUFDQTs7QUFMQTs7OztBQU9BLEVBQUUsWUFBVztBQUNULGNBQVUsTUFBVixDQUFpQixTQUFTLElBQTFCO0FBQ0gsQ0FGRDtBQUdBLE9BQU8sTUFBUCxHQUFnQixZQUFXO0FBQ3ZCLFlBQVEsR0FBUjtBQUNBLFlBQVEsR0FBUjtBQUNILENBSEQ7Ozs7Ozs7Ozs7O0FDVkE7Ozs7OztBQU1BLElBQUksU0FBUztBQUNUO0FBQ0EscUJBQWlCLHlCQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQ2pDLFlBQUksUUFBUSxJQUFJLGVBQWhCO0FBQUEsWUFDSSxZQUFZLHVCQUF1QixNQUF2QixHQUFnQyxtQkFBaEMsR0FBc0QsUUFEdEU7QUFBQSxZQUVJLFNBQVMsU0FBVCxNQUFTLEdBQVk7QUFDakIsZ0JBQUksY0FBYyxNQUFNLFdBQXhCO0FBQ0EsZ0JBQUksQ0FBQyxXQUFMLEVBQWtCO0FBQ2xCLGtCQUFNLEtBQU4sQ0FBWSxRQUFaLEdBQXdCLGNBQWMsR0FBZixHQUFzQixJQUE3QztBQUNILFNBTkw7O0FBUUEsWUFBSSxDQUFDLElBQUksZ0JBQVQsRUFBMkI7QUFDM0IsWUFBSSxnQkFBSixDQUFxQixTQUFyQixFQUFnQyxNQUFoQyxFQUF3QyxLQUF4QztBQUNBO0FBQ0EsWUFBSSxnQkFBSixDQUFxQixrQkFBckIsRUFBeUMsTUFBekMsRUFBaUQsS0FBakQ7QUFDSCxLQWZROztBQWlCVDtBQUNBLDBCQUFzQiw4QkFBVSxPQUFWLEVBQW1CO0FBQ3JDLFlBQUksV0FBVyxRQUFRLEtBQVIsQ0FBYyxHQUFkLENBQWY7QUFDQSxZQUFJLFNBQVUsU0FBUyxN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LFVBQUUsYUFBRixFQUFpQixJQUFqQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQ3ZDLGlCQUFLLFFBQUw7QUFDQSxnQkFBSSxjQUFjLGNBQWxCLEVBQWtDO0FBQzlCLDhCQUFjLGNBQWQ7QUFDSDtBQUNKLFNBTEQ7QUFNQSxVQUFFLGNBQUYsRUFBa0IsSUFBbEIsQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBWTtBQUN4QyxpQkFBSyxRQUFMO0FBQ0EsZ0JBQUksY0FBYyxlQUFsQixFQUFtQztBQUMvQiw4QkFBYyxlQUFkO0FBQ0g7QUFDSixTQUxEO0FBTUgsS0F4UFE7O0FBMFBUO0FBQ0EsWUFBUSxnQkFBVSxJQUFWLEVBQWdCO0FBQ3BCLFVBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsbURBQW1ELElBQW5ELEdBQTBELGdCQUEzRTtBQUNBLG1CQUFXLFlBQVk7QUFDbkIsY0FBRSxTQUFGLEVBQWEsTUFBYjtBQUNILFNBRkQsRUFFRyxJQUZIO0FBR0g7QUFoUVEsQ0FBYjs7UUFtUVEsTSxHQUFBLE07Ozs7Ozs7O0FDelFSOzs7O0FBSUEsSUFBSSxZQUFZO0FBQ1osb0JBQWtCLENBRE47QUFFWixlQUFhLElBQUksSUFBSjtBQUZELENBQWhCOztRQUtRLFMsR0FBQSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBkb2N1bWVudCByZWFkeSBhbmQgd2luZG93IG9ubG9hZFxyXG4gKiBcclxuICovXHJcbmltcG9ydCB7Q29tbW9uVmFyfSBmcm9tICcuL2NvbW1vbi9fdmFyLmpzJztcclxuaW1wb3J0IHtVdGlsRm59IGZyb20gJy4vY29tbW9uL191dGlsLmpzJztcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xyXG59KTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coQ29tbW9uVmFyKTtcclxuICAgIGNvbnNvbGUubG9nKFV0aWxGbik7XHJcbn0iLCIvKipcclxuICog5bel5YW35pa55rOVXHJcbiAqIEBhdXRob3IgQ2NcclxuICogXHJcbiAqL1xyXG5cclxubGV0IFV0aWxGbiA9IHtcclxuICAgIC8vIOWKqOaAgeiuvue9rmh0bWznmoRmb250LXNpemXvvIznlKjkuo5yZW3nmoTorqHnrpdcclxuICAgIHNldEh0bWxGb250U2l6ZTogZnVuY3Rpb24gKGRvYywgd2luKSB7XHJcbiAgICAgICAgdmFyIGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudCxcclxuICAgICAgICAgICAgcmVzaXplRXZ0ID0gJ29yaWVudGF0aW9uY2hhbmdlJyBpbiB3aW5kb3cgPyAnb3JpZW50YXRpb25jaGFuZ2UnIDogJ3Jlc2l6ZScsXHJcbiAgICAgICAgICAgIHJlY2FsYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGllbnRXaWR0aCA9IGRvY0VsLmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjbGllbnRXaWR0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZG9jRWwuc3R5bGUuZm9udFNpemUgPSAoY2xpZW50V2lkdGggKiAwLjEpICsgJ3B4JztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCFkb2MuYWRkRXZlbnRMaXN0ZW5lcikgcmV0dXJuO1xyXG4gICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKHJlc2l6ZUV2dCwgcmVjYWxjLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gRE9N5Yqg6L295LmL5ZCO5Y+K6LWE5rqQ5Yqg6L295LmL5YmN5Y675omn6KGM77yM5Y2z5a+55bqUalF1ZXJ55Lit55qEZG9jdW1lbnQgcmVhZHlcclxuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlY2FsYywgZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5Zsb2NhdGlvbiBzZWFyY2jlj4LmlbDvvIzov5Tlm57kuIDkuKpzZWFyY2jlr7nosaFcclxuICAgIGdldExvY2F0aW9uU2VhcmNoT2JqOiBmdW5jdGlvbiAocXN0cmluZykge1xyXG4gICAgICAgIHZhciBzcGxpdFVybCA9IHFzdHJpbmcuc3BsaXQoXCI/XCIpO1xyXG4gICAgICAgIHZhciBzdHJVcmwgPSAoc3BsaXRVcmwubGVuZ3RoID4gMSkgPyBkZWNvZGVVUklDb21wb25lbnQoc3BsaXRVcmxbMV0pLnNwbGl0KFwiJlwiKSA6IFtdO1xyXG4gICAgICAgIHZhciBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0clVybC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgc3RyID0gc3RyVXJsW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgb2JqW3N0clswXV0gPSBzdHJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc29ydC5jYWxsKG9iaik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIpOaWremCrueuseato+WImVxyXG4gICAgaXNFbWFpbDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiAvXihbYS16QS1aMC05XFwuXy1dKStAKFthLXpBLVowLTlfLV0pKygoXFwuW2EtekEtWjAtOV8tXSspKykkLy50ZXN0KHN0cik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIpOaWreeOr+Wig1xyXG4gICAgaXNpT1M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9cXChpW147XSs7KCBVOyk/IENQVS4rTWFjIE9TIFgvKTtcclxuICAgIH0sXHJcbiAgICBpc0FuZHJpb2Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gL2FuZHJvaWQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIH0sXHJcbiAgICBpc1dlQ2hhdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAvbWljcm9tZXNzZW5nZXIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIH0sXHJcbiAgICBpc1BjOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJBZ2VudEluZm8gPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIGFnZW50cyA9IFtcImFuZHJvaWRcIiwgXCJpcGhvbmVcIiwgXCJpcGFkXCIsIFwiaXBvZFwiLCBcInN5bWJpYW5vc1wiLCBcIndpbmRvd3MgcGhvbmVcIl07XHJcbiAgICAgICAgdmFyIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWdlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyQWdlbnRJbmZvLmluZGV4T2YoYWdlbnRzW2ldKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDlr4bnoIHmoLzlvI/pqozor4E6IDctMjDkvY3mlbDlrZfmiJbogIXlrZfmr41cclxuICAgIGlzUGFzc3dvcmRWYWxpZDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiAvXlthLXpBLVowLTldezcsMjB9JC8udGVzdChzdHIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmiYvmnLrmoLzlvI/pqozor4E6IOS4jeWwkeS6jjfkvY3mlbDlrZdcclxuICAgIGlzUGhvbmVWYWxpZDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiAvXlswLTldezcsfSQvLnRlc3Qoc3RyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pe26Ze05oiz6L2s5o2i5qC85byPXHJcbiAgICBkYXRlOiBmdW5jdGlvbiAocywgZm10KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgcyA9IE51bWJlcihzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm10ID0gZm10IHx8IFwieXl5eS1NTS1kZCBoaDptbTpzc1wiO1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUocyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgZGF0ZSA9IHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvID0ge1xyXG4gICAgICAgICAgICBcIk0rXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9XHJcbiAgICAgICAgICAgIFwiZCtcIjogZGF0ZS5nZXREYXRlKCksIC8v5pelXHJcbiAgICAgICAgICAgIFwiaCtcIjogZGF0ZS5nZXRIb3VycygpLCAvL+Wwj+aXtlxyXG4gICAgICAgICAgICBcIm0rXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhlxyXG4gICAgICAgICAgICBcInMrXCI6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL+enklxyXG4gICAgICAgICAgICBcInErXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmXHJcbiAgICAgICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoLyh5KykvLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoZGF0ZS5nZXRGdWxsWWVhcigpICsgXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKFwiKFwiICsgayArIFwiKVwiKS50ZXN0KGZtdCkpIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGggPT0gMSkgPyAob1trXSkgOiAoKFwiMDBcIiArIG9ba10pLnN1YnN0cigoXCJcIiArIG9ba10pLmxlbmd0aCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZtdDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572uY29va2llXHJcbiAgICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xyXG4gICAgICAgIGRheXMgPSBkYXlzIHx8IDA7XHJcbiAgICAgICAgdmFyIGV4cGlyZXMgPSBcIlwiO1xyXG4gICAgICAgIGlmIChkYXlzICE9IDApIHsgLy/orr7nva5jb29raWXov4fmnJ/ml7bpl7QgIFxyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBtcyA9IGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBtcyk7XHJcbiAgICAgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRheXMgPT0gSW5maW5pdHkpIHsgLy8g6K6+572u5pyA5aSn6L+H5pyf5pe26Ze0XHJcbiAgICAgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IEdNVFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPlmNvb2tpZVxyXG4gICAgZ2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBuYW1lRVEgPSBuYW1lICsgXCI9XCI7XHJcbiAgICAgICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7IC8v5oqKY29va2ll5YiG5Ymy5oiQ57uEICBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjID0gY2FbaV07IC8v5Y+W5b6X5a2X56ym5LiyICBcclxuICAgICAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09ICcgJykgeyAvL+WIpOaWreS4gOS4i+Wtl+espuS4suacieayoeacieWJjeWvvOepuuagvCAgXHJcbiAgICAgICAgICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpOyAvL+acieeahOivne+8jOS7juesrOS6jOS9jeW8gOWni+WPliAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09IDApIHsgLy/lpoLmnpzlkKvmnInmiJHku6zopoHnmoRuYW1lICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmuIXpmaRjb29raWVzXHJcbiAgICBjbGVhckNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLnNldENvb2tpZShuYW1lLCBcIlwiLCAtMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWOu+aOiee7k+WwvuepuuagvFxyXG4gICAgcmVtb3ZlTGFzdEJsYW5rOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKFxccyokKS9nLCBcIlwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572u5by556qX5Z6C55u05bGF5LitXHJcbiAgICBzZXRQb3B1cFZlcnRpY2FsTWlkOiBmdW5jdGlvbiAoZG9tT2JqKSB7XHJcbiAgICAgICAgaWYgKCQoZG9tT2JqKSkge1xyXG4gICAgICAgICAgICB2YXIgcG9wdXBIZWlnaHQgPSAkKGRvbU9iaikuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICQoZG9tT2JqKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IChHbG9iYWxDb25maWcudmlld0hlaWdodCAtIHBvcHVwSGVpZ2h0KSAvIDIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJQb3B1cCBpcyBub3QgZXhpc3TvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDnlJ/miJDlvLnnqpdcclxuICAgIGFkZFBvcHVwOiBmdW5jdGlvbiAoY29udGVudCwgYkNsb3NlKSB7XHJcbiAgICAgICAgdGhpcy5kZWxQb3B1cCgpO1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibV9wb3B1cFwiIGlkPVwicG9wdXBcIj48ZGl2IGNsYXNzPVwibWFza1wiIGlkPVwicG9wdXBNYXNrXCI+PC9kaXY+JyArIGNvbnRlbnQgKyAnPC9kaXY+Jyk7XHJcbiAgICAgICAgaWYgKGJDbG9zZSkge1xyXG4gICAgICAgICAgICAkKCcjcG9wdXBNYXNrJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyDliKDpmaTlvLnnqpdcclxuICAgIGRlbFBvcHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3BvcHVwJykucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9ruWFqOWxgOWKoOi9vVxyXG4gICAgc2V0TG9hZGluZzogZnVuY3Rpb24gKHNUZXh0KSB7XHJcbiAgICAgICAgdmFyIHRleHQgPSBzVGV4dCB8fCAkKCcjbG9hZGluZ0RlZmF1bHRUZXh0JykudGV4dCgpO1xyXG4gICAgICAgIHRoaXMuYWRkUG9wdXAoJzxkaXYgY2xhc3M9XCJ3X2xvYWRpbmdcIj4nICsgdGV4dCArICc8L2Rpdj4nKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lr7nor53moYZcclxuICAgICAqIG9EaWFsb2dQYXJhbXM6IHtcclxuICAgICAqICB0aXRsZTogICAgICAgICAgICAgIHN0cmluZyDlvLnnqpfmoIfpopgsXHJcbiAgICAgKiAgY29udGVudDogICAgICAgICAgICBzdHJpbmcg5by556qX5YaF5a65LFxyXG4gICAgICogIGlzRG91YmxlQWN0aW9uOiAgICAgYm9vbGVhbiDmmK/lkKbkuKTkuKrmjInpkq4sXHJcbiAgICAgKiAgYWN0aW9uVGV4dDogICAgICAgICBzdHJpbmcg5Y2V5oyJ6ZKu5paH5pysLFxyXG4gICAgICogIGFjdGlvbkZ1bmM6ICAgICAgICAgZnVuY3Rpb24g5Y2V5oyJ6ZKu5pa55rOVLFxyXG4gICAgICogIGxlZnRBY3Rpb25UZXh0OiAgICAgc3RyaW5nIOW3puS+p+aMiemSruaWh+acrCxcclxuICAgICAqICBsZWZ0QWN0aW9uRnVuYzogICAgIGZ1bmN0aW9uIOW3puS+p+aMiemSruaWueazlSxcclxuICAgICAqICBsZWZ0QWN0aW9uU3R5bGU6ICAgIHN0cmluZyDlt6bkvqfmjInpkq7moLflvI8sXHJcbiAgICAgKiAgcmlnaHRBY3Rpb25UZXh0OiAgICBzdHJpbmcg5bem5L6n5oyJ6ZKu5paH5pysLFxyXG4gICAgICogIHJpZ2h0QWN0aW9uRnVuYzogICAgZnVuY3Rpb24g5Y+z5L6n5oyJ6ZKu5pa55rOVLFxyXG4gICAgICogIHJpZ2h0QWN0aW9uU3R5bGU6ICAgc3RyaW5nIOWPs+S+p+aMiemSruagt+W8jyxcclxuICAgICAqICBcclxuICAgICAqIH1cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBzZXREaWFsb2c6IGZ1bmN0aW9uIChvRGlhbG9nUGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0aXRsZSA9IG9EaWFsb2dQYXJhbXMudGl0bGUgPyBvRGlhbG9nUGFyYW1zLnRpdGxlIDogJCgnI2RpYWxvZ1RpdGxlJykudGV4dCgpLFxyXG4gICAgICAgICAgICBjb250ZW50ID0gb0RpYWxvZ1BhcmFtcy5jb250ZW50LFxyXG4gICAgICAgICAgICBhY3Rpb25UZXh0ID0gb0RpYWxvZ1BhcmFtcy5hY3Rpb25UZXh0ID8gb0RpYWxvZ1BhcmFtcy5hY3Rpb25UZXh0IDogJCgnI2RpYWxvZ0FjdGlvblN1Ym1pdCcpLnRleHQoKSxcclxuICAgICAgICAgICAgbGVmdEFjdGlvblRleHQgPSBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25UZXh0ID8gb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uVGV4dCA6ICQoJyNkaWFsb2dBY3Rpb25DYW5jZWwnKS50ZXh0KCksXHJcbiAgICAgICAgICAgIGxlZnRBY3Rpb25TdHlsZSA9IG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblN0eWxlID8gJyBzdHlsZT1cIicgKyBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25TdHlsZSArICdcIicgOiAnJztcclxuICAgICAgICAgICAgcmlnaHRBY3Rpb25UZXh0ID0gb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvblRleHQgPyBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uVGV4dCA6IGFjdGlvblRleHQ7XHJcbiAgICAgICAgICAgIHJpZ2h0QWN0aW9uU3R5bGUgPSBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uU3R5bGUgPyAnIHN0eWxlPVwiJyArIG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25TdHlsZSArICdcIicgOiAnJztcclxuXHJcbiAgICAgICAgdmFyIEFjdGlvblRtcGw7XHJcbiAgICAgICAgaWYgKG9EaWFsb2dQYXJhbXMuaXNEb3VibGVBY3Rpb24pIHtcclxuICAgICAgICAgICAgQWN0aW9uVG1wbCA9ICc8c2VjdGlvbiBjbGFzcz1cImZ0IGZ0X0RvdWJsZVwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBpZD1cImxlZnRBY3Rpb25cIicgKyBsZWZ0QWN0aW9uU3R5bGUgKyAnPicgKyBsZWZ0QWN0aW9uVGV4dCArICc8L2E+JyArXHJcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGlkPVwicmlnaHRBY3Rpb25cIicgKyByaWdodEFjdGlvblN0eWxlICsgJz4nICsgcmlnaHRBY3Rpb25UZXh0ICsgJzwvYT4nICtcclxuICAgICAgICAgICAgICAgICc8L3NlY3Rpb24+JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBBY3Rpb25UbXBsID0gJzxzZWN0aW9uIGNsYXNzPVwiZnRcIj4nICtcclxuICAgICAgICAgICAgICAgICc8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgaWQ9XCJhY3Rpb25cIj4nICsgYWN0aW9uVGV4dCArICc8L2E+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9zZWN0aW9uPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdG1wbCA9ICc8ZGl2IGNsYXNzPVwibV9kaWFsb2dcIiBpZD1cImRpYWxvZ1wiPicgK1xyXG4gICAgICAgICAgICAnPHNlY3Rpb24gY2xhc3M9XCJoZFwiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj4nICsgdGl0bGUgKyAnPHNwYW4+PC9zZWN0aW9uPicgK1xyXG4gICAgICAgICAgICAnPHNlY3Rpb24gY2xhc3M9XCJiZFwiPicgKyBjb250ZW50ICsgJzwvc2VjdGlvbj4nICtcclxuICAgICAgICAgICAgQWN0aW9uVG1wbCArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICB0aGF0LmFkZFBvcHVwKHRtcGwpO1xyXG4gICAgICAgIHRoYXQuc2V0UG9wdXBWZXJ0aWNhbE1pZCgnI2RpYWxvZycpO1xyXG5cclxuICAgICAgICAvLyDop6PlhrPmn5DkupvkvY7nq6/ns7vnu5/lronljZPmnLrkuIvvvIjlpoJuZXh1czXjgIHlsI/nsbPnrYnvvInvvIzor7fmsYLov5Tlm57pobXpnaLmuLLmn5PnmoRidWdcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoc2hhcmVzZGspIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvcFwiOiBNYXRoLnJhbmRvbSgpICsgXCJweFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuXHJcbiAgICAgICAgJCgnI2FjdGlvbicpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIGlmIChvRGlhbG9nUGFyYW1zLmFjdGlvbkZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIG9EaWFsb2dQYXJhbXMuYWN0aW9uRnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnI2xlZnRBY3Rpb24nKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5kZWxQb3B1cCgpO1xyXG4gICAgICAgICAgICBpZiAob0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uRnVuYykge1xyXG4gICAgICAgICAgICAgICAgb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uRnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnI3JpZ2h0QWN0aW9uJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsUG9wdXAoKTtcclxuICAgICAgICAgICAgaWYgKG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25GdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uRnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaPkOekulxyXG4gICAgc2V0VGlwOiBmdW5jdGlvbiAoc1RpcCkge1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwid190aXAganNfdGlwXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+JyArIHNUaXAgKyAnPC9zcGFuPjwvc3Bhbj4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmpzX3RpcCcpLnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxufVxyXG5cclxuZXhwb3J0IHtVdGlsRm59OyIsIi8qKlxuICog5YWo5bGA5Y+Y6YeP6YWN572uXG4gKiBcbiAqL1xubGV0IENvbW1vblZhciA9IHtcbiAgICBsaXN0Q29udGVudFdpZHRoOiAwLFxuICAgIGN1cnJlbnRUaW1lOiBuZXcgRGF0ZSgpLFxufVxuXG5leHBvcnQge0NvbW1vblZhcn07Il19
