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

    $('#triggerTip').bind('click', function () {
        _util.UtilFn.setTip('TIP');
    });

    $('#triggerDialog').bind('click', function () {
        _util.UtilFn.setDialog({
            title: 'Dialog title',
            content: 'Dialog content',
            isDoubleAction: true
        });
    });

    $('tag-input').each(function () {
        _util.UtilFn.setInput(this);
    });
});
window.onload = function () {};

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

    // 获取特定localstorage
    getLocalStorage: function getLocalStorage(key, callback) {
        var data = window.localStorage.getItem(key);
        if (data) {
            callback(data);
        } else {
            data = null;
        }
    },

    // 去掉结尾空格
    removeLastBlank: function removeLastBlank(value) {
        return value.replace(/(\s*$)/g, "");
    },

    // 设置弹窗垂直居中
    setPopupVerticalMid: function setPopupVerticalMid(domObj) {
        if ($(domObj)) {
            var popupHeight = $(domObj).height(),
                winHeight = $(window).height();
            $(domObj).css({
                'top': (winHeight - popupHeight) / 2
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
        var title = oDialogParams.title ? oDialogParams.title : 'Title',
            content = oDialogParams.content,
            actionText = oDialogParams.actionText ? oDialogParams.actionText : 'Get it',
            leftActionText = oDialogParams.leftActionText ? oDialogParams.leftActionText : 'Cancel',
            leftActionStyle = oDialogParams.leftActionStyle ? ' style="' + oDialogParams.leftActionStyle + '"' : '',
            rightActionText = oDialogParams.rightActionText ? oDialogParams.rightActionText : 'Confirm',
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

    // 设置input框
    setInput: function setInput(target) {
        var attrObj = {
            id: $(target).attr('id'),
            type: $(target).attr('type'),
            value: $(target).attr('value'),
            label: $(target).attr('label')
        };
        var customTmpl = '';
        if (attrObj.type === 'password') customTmpl = '<span class="w_icon w_icon_EyeClose js_pswToggle"></span>';
        var tmpl = '<div class="w_input' + (attrObj.type === 'password' ? ' w_input_Psw' : '') + '">\
                        <input type=' + attrObj.type + ' value="' + attrObj.value + '" id=' + attrObj.id + ' />\
                        <label>' + attrObj.label + '</label>\
                        ' + customTmpl + '\
                    </div>';
        $(target).after(tmpl).remove();

        // handler
        $('#' + attrObj.id).bind('focus', function () {
            var $parent = $(this).parent();
            $parent.removeClass('w_input_Warn w_input_Valid').addClass('w_input_Active');
        }).bind('blur', function () {
            var $parent = $(this).parent();
            $parent.removeClass('w_input_Active');
        }).bind('keyup', function () {
            var $parent = $(this).parent(),
                $del = $parent.children('.js_inputDel');
            if ($del) {
                $del.remove();
                if (!$(this).val()) return;
            }

            var that = this,
                delTemp = '<span class="w_icon w_icon_InputDel js_inputDel"></span>';
            $parent.append(delTemp);
            $del = $parent.children('.js_inputDel');
            $del.bind('click', function () {
                $(this).remove();
                $('.js_tip').remove();
                $(that).val('');
                that.focus();
            });
        });
    },

    // 提示
    setTip: function setTip(sTip, oParams) {
        $('body').append('<span class="w_tip js_tip"><span class="text">' + sTip + '</span></span>');
        setTimeout(function () {
            $('.js_tip').remove();
            if (oParams && oParams.callback) oParams.callback();
        }, oParams && oParams.msec ? oParams.msec : 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2pzL21vZHVsZS9fZGVtby5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdXRpbC5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNJQTs7QUFDQTs7QUFMQTs7OztBQU9BLEVBQUUsWUFBVztBQUNULGNBQVUsTUFBVixDQUFpQixTQUFTLElBQTFCOztBQUVBLE1BQUUsYUFBRixFQUFpQixJQUFqQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQ3ZDLHFCQUFPLE1BQVAsQ0FBYyxLQUFkO0FBQ0gsS0FGRDs7QUFJQSxNQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLFlBQVk7QUFDMUMscUJBQU8sU0FBUCxDQUFpQjtBQUNiLG1CQUFPLGNBRE07QUFFYixxQkFBUyxnQkFGSTtBQUdiLDRCQUFnQjtBQUhILFNBQWpCO0FBS0gsS0FORDs7QUFRQSxNQUFFLFdBQUYsRUFBZSxJQUFmLENBQW9CLFlBQVc7QUFDM0IscUJBQU8sUUFBUCxDQUFnQixJQUFoQjtBQUNILEtBRkQ7QUFHSCxDQWxCRDtBQW1CQSxPQUFPLE1BQVAsR0FBZ0IsWUFBVyxDQUFFLENBQTdCOzs7Ozs7Ozs7OztBQzFCQTs7Ozs7O0FBTUEsSUFBSSxTQUFTO0FBQ1Q7QUFDQSxxQkFBaUIseUJBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0I7QUFDakMsWUFBSSxRQUFRLElBQUksZUFBaEI7QUFBQSxZQUNJLFlBQVksdUJBQXVCLE1BQXZCLEdBQWdDLG1CQUFoQyxHQUFzRCxRQUR0RTtBQUFBLFlBRUksU0FBUyxTQUFULE1BQVMsR0FBWTtBQUNqQixnQkFBSSxjQUFjLE1BQU0sV0FBeEI7QUFDQSxnQkFBSSxDQUFDLFdBQUwsRUFBa0I7QUFDbEIsa0JBQU0sS0FBTixDQUFZLFFBQVosR0FBd0IsY0FBYyxH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VUFBVSwwREFEZDtBQUVBLG9CQUFRLE1BQVIsQ0FBZSxPQUFmO0FBQ0EsbUJBQU8sUUFBUSxRQUFSLENBQWlCLGNBQWpCLENBQVA7QUFDQSxpQkFBSyxJQUFMLENBQVUsT0FBVixFQUFtQixZQUFZO0FBQzNCLGtCQUFFLElBQUYsRUFBUSxNQUFSO0FBQ0Esa0JBQUUsU0FBRixFQUFhLE1BQWI7QUFDQSxrQkFBRSxJQUFGLEVBQVEsR0FBUixDQUFZLEVBQVo7QUFDQSxxQkFBSyxLQUFMO0FBQ0gsYUFMRDtBQU1ILFNBeEJEO0FBeUJILEtBbFRROztBQW9UVDtBQUNBLFlBQVEsZ0JBQVUsSUFBVixFQUFnQixPQUFoQixFQUF5QjtBQUM3QixVQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLG1EQUFtRCxJQUFuRCxHQUEwRCxnQkFBM0U7QUFDQSxtQkFBVyxZQUFZO0FBQ25CLGNBQUUsU0FBRixFQUFhLE1BQWI7QUFDQSxnQkFBSSxXQUFXLFFBQVEsUUFBdkIsRUFBaUMsUUFBUSxRQUFSO0FBQ3BDLFNBSEQsRUFHSSxXQUFXLFFBQVEsSUFBbkIsR0FBMEIsUUFBUSxJQUFsQyxHQUF5QyxJQUg3QztBQUlIO0FBM1RRLENBQWI7O1FBOFRRLE0sR0FBQSxNOzs7Ozs7OztBQ3BVUjs7OztBQUlBLElBQUksWUFBWTtBQUNaLG9CQUFrQixDQUROO0FBRVosZUFBYSxJQUFJLElBQUo7QUFGRCxDQUFoQjs7UUFLUSxTLEdBQUEsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogZG9jdW1lbnQgcmVhZHkgYW5kIHdpbmRvdyBvbmxvYWRcclxuICogXHJcbiAqL1xyXG5pbXBvcnQge0NvbW1vblZhcn0gZnJvbSAnLi9jb21tb24vX3Zhci5qcyc7XHJcbmltcG9ydCB7VXRpbEZufSBmcm9tICcuL2NvbW1vbi9fdXRpbC5qcyc7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTtcclxuXHJcbiAgICAkKCcjdHJpZ2dlclRpcCcpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFV0aWxGbi5zZXRUaXAoJ1RJUCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI3RyaWdnZXJEaWFsb2cnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBVdGlsRm4uc2V0RGlhbG9nKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdEaWFsb2cgdGl0bGUnLFxyXG4gICAgICAgICAgICBjb250ZW50OiAnRGlhbG9nIGNvbnRlbnQnLFxyXG4gICAgICAgICAgICBpc0RvdWJsZUFjdGlvbjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgndGFnLWlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICBVdGlsRm4uc2V0SW5wdXQodGhpcyk7XHJcbiAgICB9KTtcclxufSk7XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHt9IiwiLyoqXHJcbiAqIOW3peWFt+aWueazlVxyXG4gKiBAYXV0aG9yIENjXHJcbiAqIFxyXG4gKi9cclxuXHJcbmxldCBVdGlsRm4gPSB7XHJcbiAgICAvLyDliqjmgIHorr7nva5odG1s55qEZm9udC1zaXpl77yM55So5LqOcmVt55qE6K6h566XXHJcbiAgICBzZXRIdG1sRm9udFNpemU6IGZ1bmN0aW9uIChkb2MsIHdpbikge1xyXG4gICAgICAgIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXHJcbiAgICAgICAgICAgIHJlc2l6ZUV2dCA9ICdvcmllbnRhdGlvbmNoYW5nZScgaW4gd2luZG93ID8gJ29yaWVudGF0aW9uY2hhbmdlJyA6ICdyZXNpemUnLFxyXG4gICAgICAgICAgICByZWNhbGMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xpZW50V2lkdGggPSBkb2NFbC5jbGllbnRXaWR0aDtcclxuICAgICAgICAgICAgICAgIGlmICghY2xpZW50V2lkdGgpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGRvY0VsLnN0eWxlLmZvbnRTaXplID0gKGNsaWVudFdpZHRoICogMC4xKSArICdweCc7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICghZG9jLmFkZEV2ZW50TGlzdGVuZXIpIHJldHVybjtcclxuICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcihyZXNpemVFdnQsIHJlY2FsYywgZmFsc2UpO1xyXG4gICAgICAgIC8vIERPTeWKoOi9veS5i+WQjuWPiui1hOa6kOWKoOi9veS5i+WJjeWOu+aJp+ihjO+8jOWNs+WvueW6lGpRdWVyeeS4reeahGRvY3VtZW50IHJlYWR5XHJcbiAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZWNhbGMsIGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+WbG9jYXRpb24gc2VhcmNo5Y+C5pWw77yM6L+U5Zue5LiA5Liqc2VhcmNo5a+56LGhXHJcbiAgICBnZXRMb2NhdGlvblNlYXJjaE9iajogZnVuY3Rpb24gKHFzdHJpbmcpIHtcclxuICAgICAgICB2YXIgc3BsaXRVcmwgPSBxc3RyaW5nLnNwbGl0KFwiP1wiKTtcclxuICAgICAgICB2YXIgc3RyVXJsID0gKHNwbGl0VXJsLmxlbmd0aCA+IDEpID8gZGVjb2RlVVJJQ29tcG9uZW50KHNwbGl0VXJsWzFdKS5zcGxpdChcIiZcIikgOiBbXTtcclxuICAgICAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgICAgICB2YXIgb2JqID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdHJVcmwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0clVybFtpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgIG9ialtzdHJbMF1dID0gc3RyWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNvcnQuY2FsbChvYmopO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDliKTmlq3pgq7nrrHmraPliJlcclxuICAgIGlzRW1haWw6IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICByZXR1cm4gL14oW2EtekEtWjAtOVxcLl8tXSkrQChbYS16QS1aMC05Xy1dKSsoKFxcLlthLXpBLVowLTlfLV0rKSspJC8udGVzdChzdHIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDliKTmlq3njq/looNcclxuICAgIGlzaU9TOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvXFwoaVteO10rOyggVTspPyBDUFUuK01hYyBPUyBYLyk7XHJcbiAgICB9LFxyXG4gICAgaXNBbmRyaW9kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIC9hbmRyb2lkLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcbiAgICB9LFxyXG4gICAgaXNXZUNoYXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gL21pY3JvbWVzc2VuZ2VyLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcbiAgICB9LFxyXG4gICAgaXNQYzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB1c2VyQWdlbnRJbmZvID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBhZ2VudHMgPSBbXCJhbmRyb2lkXCIsIFwiaXBob25lXCIsIFwiaXBhZFwiLCBcImlwb2RcIiwgXCJzeW1iaWFub3NcIiwgXCJ3aW5kb3dzIHBob25lXCJdO1xyXG4gICAgICAgIHZhciBmbGFnID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodXNlckFnZW50SW5mby5pbmRleE9mKGFnZW50c1tpXSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmxhZztcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5a+G56CB5qC85byP6aqM6K+BOiA3LTIw5L2N5pWw5a2X5oiW6ICF5a2X5q+NXHJcbiAgICBpc1Bhc3N3b3JkVmFsaWQ6IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICByZXR1cm4gL15bYS16QS1aMC05XXs3LDIwfSQvLnRlc3Qoc3RyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5omL5py65qC85byP6aqM6K+BOiDkuI3lsJHkuo435L2N5pWw5a2XXHJcbiAgICBpc1Bob25lVmFsaWQ6IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICByZXR1cm4gL15bMC05XXs3LH0kLy50ZXN0KHN0cik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaXtumXtOaIs+i9rOaNouagvOW8j1xyXG4gICAgZGF0ZTogZnVuY3Rpb24gKHMsIGZtdCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcyA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHMgPSBOdW1iZXIocyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZtdCA9IGZtdCB8fCBcInl5eXktTU0tZGQgaGg6bW06c3NcIjtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHMpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcyA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGRhdGUgPSBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbyA9IHtcclxuICAgICAgICAgICAgXCJNK1wiOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG4gICAgICAgICAgICBcImQrXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgICAgICBcImgrXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7ZcclxuICAgICAgICAgICAgXCJtK1wiOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy/liIZcclxuICAgICAgICAgICAgXCJzK1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICAgICAgXCJxK1wiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6plxyXG4gICAgICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKC8oeSspLy50ZXN0KGZtdCkpIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiXCIpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpO1xyXG4gICAgICAgIGZvciAodmFyIGsgaW4gbykge1xyXG4gICAgICAgICAgICBpZiAobmV3IFJlZ0V4cChcIihcIiArIGsgKyBcIilcIikudGVzdChmbXQpKSBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChSZWdFeHAuJDEubGVuZ3RoID09IDEpID8gKG9ba10pIDogKChcIjAwXCIgKyBvW2tdKS5zdWJzdHIoKFwiXCIgKyBvW2tdKS5sZW5ndGgpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9rmNvb2tpZVxyXG4gICAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcclxuICAgICAgICBkYXlzID0gZGF5cyB8fCAwO1xyXG4gICAgICAgIHZhciBleHBpcmVzID0gXCJcIjtcclxuICAgICAgICBpZiAoZGF5cyAhPSAwKSB7IC8v6K6+572uY29va2ll6L+H5pyf5pe26Ze0ICBcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgbXMgPSBkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMDtcclxuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgbXMpO1xyXG4gICAgICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXlzID09IEluZmluaXR5KSB7IC8vIOiuvue9ruacgOWkp+i/h+acn+aXtumXtFxyXG4gICAgICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9RnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBHTVRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5Zjb29raWVcclxuICAgIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgbmFtZUVRID0gbmFtZSArIFwiPVwiO1xyXG4gICAgICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpOyAvL+aKimNvb2tpZeWIhuWJsuaIkOe7hCAgXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYyA9IGNhW2ldOyAvL+WPluW+l+Wtl+espuS4siAgXHJcbiAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSAnICcpIHsgLy/liKTmlq3kuIDkuIvlrZfnrKbkuLLmnInmsqHmnInliY3lr7znqbrmoLwgIFxyXG4gICAgICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKTsgLy/mnInnmoTor53vvIzku47nrKzkuozkvY3lvIDlp4vlj5YgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PSAwKSB7IC8v5aaC5p6c5ZCr5pyJ5oiR5Lus6KaB55qEbmFtZSAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5riF6ZmkY29va2llc1xyXG4gICAgY2xlYXJDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDb29raWUobmFtZSwgXCJcIiwgLTEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5bnibnlrppsb2NhbHN0b3JhZ2VcclxuICAgIGdldExvY2FsU3RvcmFnZTogZnVuY3Rpb24gKGtleSwgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Y675o6J57uT5bC+56m65qC8XHJcbiAgICByZW1vdmVMYXN0Qmxhbms6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8oXFxzKiQpL2csIFwiXCIpO1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8vIOiuvue9ruW8ueeql+WeguebtOWxheS4rVxyXG4gICAgc2V0UG9wdXBWZXJ0aWNhbE1pZDogZnVuY3Rpb24gKGRvbU9iaikge1xyXG4gICAgICAgIGlmICgkKGRvbU9iaikpIHtcclxuICAgICAgICAgICAgdmFyIHBvcHVwSGVpZ2h0ID0gJChkb21PYmopLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgd2luSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAkKGRvbU9iaikuY3NzKHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiAod2luSGVpZ2h0IC0gcG9wdXBIZWlnaHQpIC8gMixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIlBvcHVwIGlzIG5vdCBleGlzdO+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOeUn+aIkOW8ueeql1xyXG4gICAgYWRkUG9wdXA6IGZ1bmN0aW9uIChjb250ZW50LCBiQ2xvc2UpIHtcclxuICAgICAgICB0aGlzLmRlbFBvcHVwKCk7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtX3BvcHVwXCIgaWQ9XCJwb3B1cFwiPjxkaXYgY2xhc3M9XCJtYXNrXCIgaWQ9XCJwb3B1cE1hc2tcIj48L2Rpdj4nICsgY29udGVudCArICc8L2Rpdj4nKTtcclxuICAgICAgICBpZiAoYkNsb3NlKSB7XHJcbiAgICAgICAgICAgICQoJyNwb3B1cE1hc2snKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVsUG9wdXAoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOWIoOmZpOW8ueeql1xyXG4gICAgZGVsUG9wdXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcjcG9wdXAnKS5yZW1vdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572u5YWo5bGA5Yqg6L29XHJcbiAgICBzZXRMb2FkaW5nOiBmdW5jdGlvbiAoc1RleHQpIHtcclxuICAgICAgICB2YXIgdGV4dCA9IHNUZXh0IHx8ICQoJyNsb2FkaW5nRGVmYXVsdFRleHQnKS50ZXh0KCk7XHJcbiAgICAgICAgdGhpcy5hZGRQb3B1cCgnPGRpdiBjbGFzcz1cIndfbG9hZGluZ1wiPicgKyB0ZXh0ICsgJzwvZGl2PicpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWvueivneahhlxyXG4gICAgICogb0RpYWxvZ1BhcmFtczoge1xyXG4gICAgICogIHRpdGxlOiAgICAgICAgICAgICAgc3RyaW5nIOW8ueeql+agh+mimCxcclxuICAgICAqICBjb250ZW50OiAgICAgICAgICAgIHN0cmluZyDlvLnnqpflhoXlrrksXHJcbiAgICAgKiAgaXNEb3VibGVBY3Rpb246ICAgICBib29sZWFuIOaYr+WQpuS4pOS4quaMiemSrixcclxuICAgICAqICBhY3Rpb25UZXh0OiAgICAgICAgIHN0cmluZyDljZXmjInpkq7mlofmnKwsXHJcbiAgICAgKiAgYWN0aW9uRnVuYzogICAgICAgICBmdW5jdGlvbiDljZXmjInpkq7mlrnms5UsXHJcbiAgICAgKiAgbGVmdEFjdGlvblRleHQ6ICAgICBzdHJpbmcg5bem5L6n5oyJ6ZKu5paH5pysLFxyXG4gICAgICogIGxlZnRBY3Rpb25GdW5jOiAgICAgZnVuY3Rpb24g5bem5L6n5oyJ6ZKu5pa55rOVLFxyXG4gICAgICogIGxlZnRBY3Rpb25TdHlsZTogICAgc3RyaW5nIOW3puS+p+aMiemSruagt+W8jyxcclxuICAgICAqICByaWdodEFjdGlvblRleHQ6ICAgIHN0cmluZyDlt6bkvqfmjInpkq7mlofmnKwsXHJcbiAgICAgKiAgcmlnaHRBY3Rpb25GdW5jOiAgICBmdW5jdGlvbiDlj7PkvqfmjInpkq7mlrnms5UsXHJcbiAgICAgKiAgcmlnaHRBY3Rpb25TdHlsZTogICBzdHJpbmcg5Y+z5L6n5oyJ6ZKu5qC35byPLFxyXG4gICAgICogIFxyXG4gICAgICogfVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHNldERpYWxvZzogZnVuY3Rpb24gKG9EaWFsb2dQYXJhbXMpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gb0RpYWxvZ1BhcmFtcy50aXRsZSA/IG9EaWFsb2dQYXJhbXMudGl0bGUgOiAnVGl0bGUnLFxyXG4gICAgICAgICAgICBjb250ZW50ID0gb0RpYWxvZ1BhcmFtcy5jb250ZW50LFxyXG4gICAgICAgICAgICBhY3Rpb25UZXh0ID0gb0RpYWxvZ1BhcmFtcy5hY3Rpb25UZXh0ID8gb0RpYWxvZ1BhcmFtcy5hY3Rpb25UZXh0IDogJ0dldCBpdCcsXHJcbiAgICAgICAgICAgIGxlZnRBY3Rpb25UZXh0ID0gb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uVGV4dCA/IG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblRleHQgOiAnQ2FuY2VsJyxcclxuICAgICAgICAgICAgbGVmdEFjdGlvblN0eWxlID0gb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uU3R5bGUgPyAnIHN0eWxlPVwiJyArIG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblN0eWxlICsgJ1wiJyA6ICcnLFxyXG4gICAgICAgICAgICByaWdodEFjdGlvblRleHQgPSBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uVGV4dCA/IG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25UZXh0IDogJ0NvbmZpcm0nLFxyXG4gICAgICAgICAgICByaWdodEFjdGlvblN0eWxlID0gb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvblN0eWxlID8gJyBzdHlsZT1cIicgKyBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uU3R5bGUgKyAnXCInIDogJyc7XHJcblxyXG4gICAgICAgIHZhciBBY3Rpb25UbXBsO1xyXG4gICAgICAgIGlmIChvRGlhbG9nUGFyYW1zLmlzRG91YmxlQWN0aW9uKSB7XHJcbiAgICAgICAgICAgIEFjdGlvblRtcGwgPSAnPHNlY3Rpb24gY2xhc3M9XCJmdCBmdF9Eb3VibGVcIj4nICtcclxuICAgICAgICAgICAgICAgICc8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgaWQ9XCJsZWZ0QWN0aW9uXCInICsgbGVmdEFjdGlvblN0eWxlICsgJz4nICsgbGVmdEFjdGlvblRleHQgKyAnPC9hPicgK1xyXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBpZD1cInJpZ2h0QWN0aW9uXCInICsgcmlnaHRBY3Rpb25TdHlsZSArICc+JyArIHJpZ2h0QWN0aW9uVGV4dCArICc8L2E+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9zZWN0aW9uPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgQWN0aW9uVG1wbCA9ICc8c2VjdGlvbiBjbGFzcz1cImZ0XCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGlkPVwiYWN0aW9uXCI+JyArIGFjdGlvblRleHQgKyAnPC9hPicgK1xyXG4gICAgICAgICAgICAgICAgJzwvc2VjdGlvbj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRtcGwgPSAnPGRpdiBjbGFzcz1cIm1fZGlhbG9nXCIgaWQ9XCJkaWFsb2dcIj4nICtcclxuICAgICAgICAgICAgJzxzZWN0aW9uIGNsYXNzPVwiaGRcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+JyArIHRpdGxlICsgJzxzcGFuPjwvc2VjdGlvbj4nICtcclxuICAgICAgICAgICAgJzxzZWN0aW9uIGNsYXNzPVwiYmRcIj4nICsgY29udGVudCArICc8L3NlY3Rpb24+JyArXHJcbiAgICAgICAgICAgIEFjdGlvblRtcGwgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgdGhhdC5hZGRQb3B1cCh0bXBsKTtcclxuICAgICAgICB0aGF0LnNldFBvcHVwVmVydGljYWxNaWQoJyNkaWFsb2cnKTtcclxuXHJcbiAgICAgICAgLy8g6Kej5Yaz5p+Q5Lqb5L2O56uv57O757uf5a6J5Y2T5py65LiL77yI5aaCbmV4dXM144CB5bCP57Gz562J77yJ77yM6K+35rGC6L+U5Zue6aG16Z2i5riy5p+T55qEYnVnXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHNoYXJlc2RrKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIjogTWF0aC5yYW5kb20oKSArIFwicHhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcblxyXG4gICAgICAgICQoJyNhY3Rpb24nKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5kZWxQb3B1cCgpO1xyXG4gICAgICAgICAgICBpZiAob0RpYWxvZ1BhcmFtcy5hY3Rpb25GdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBvRGlhbG9nUGFyYW1zLmFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNsZWZ0QWN0aW9uJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsUG9wdXAoKTtcclxuICAgICAgICAgICAgaWYgKG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvbkZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNyaWdodEFjdGlvbicpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIGlmIChvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uRnVuYykge1xyXG4gICAgICAgICAgICAgICAgb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDorr7nva5pbnB1dOahhlxyXG4gICAgc2V0SW5wdXQ6IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBsZXQgYXR0ck9iaiA9IHtcclxuICAgICAgICAgICAgaWQ6ICQodGFyZ2V0KS5hdHRyKCdpZCcpLFxyXG4gICAgICAgICAgICB0eXBlOiAkKHRhcmdldCkuYXR0cigndHlwZScpLFxyXG4gICAgICAgICAgICB2YWx1ZTogJCh0YXJnZXQpLmF0dHIoJ3ZhbHVlJyksXHJcbiAgICAgICAgICAgIGxhYmVsOiAkKHRhcmdldCkuYXR0cignbGFiZWwnKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGN1c3RvbVRtcGwgPSAnJztcclxuICAgICAgICBpZiAoYXR0ck9iai50eXBlID09PSAncGFzc3dvcmQnKSBjdXN0b21UbXBsID0gJzxzcGFuIGNsYXNzPVwid19pY29uIHdfaWNvbl9FeWVDbG9zZSBqc19wc3dUb2dnbGVcIj48L3NwYW4+JztcclxuICAgICAgICBsZXQgdG1wbCA9ICc8ZGl2IGNsYXNzPVwid19pbnB1dCcgKyAoYXR0ck9iai50eXBlID09PSAncGFzc3dvcmQnID8gJyB3X2lucHV0X1BzdycgOiAnJykgKyAnXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9JyArIGF0dHJPYmoudHlwZSArICcgdmFsdWU9XCInICsgYXR0ck9iai52YWx1ZSArICdcIiBpZD0nICsgYXR0ck9iai5pZCArICcgLz5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JyArIGF0dHJPYmoubGFiZWwgKyAnPC9sYWJlbD5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICsgY3VzdG9tVG1wbCArICdcXFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XHJcbiAgICAgICAgJCh0YXJnZXQpLmFmdGVyKHRtcGwpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAvLyBoYW5kbGVyXHJcbiAgICAgICAgJCgnIycgKyBhdHRyT2JqLmlkKS5iaW5kKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybiB3X2lucHV0X1ZhbGlkJykuYWRkQ2xhc3MoJ3dfaW5wdXRfQWN0aXZlJyk7XHJcbiAgICAgICAgfSkuYmluZCgnYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfQWN0aXZlJyk7XHJcbiAgICAgICAgfSkuYmluZCgna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpLFxyXG4gICAgICAgICAgICAgICAgJGRlbCA9ICRwYXJlbnQuY2hpbGRyZW4oJy5qc19pbnB1dERlbCcpO1xyXG4gICAgICAgICAgICBpZiAoJGRlbCkge1xyXG4gICAgICAgICAgICAgICAgJGRlbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS52YWwoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBkZWxUZW1wID0gJzxzcGFuIGNsYXNzPVwid19pY29uIHdfaWNvbl9JbnB1dERlbCBqc19pbnB1dERlbFwiPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAkcGFyZW50LmFwcGVuZChkZWxUZW1wKTtcclxuICAgICAgICAgICAgJGRlbCA9ICRwYXJlbnQuY2hpbGRyZW4oJy5qc19pbnB1dERlbCcpO1xyXG4gICAgICAgICAgICAkZGVsLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICQoJy5qc190aXAnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICQodGhhdCkudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaPkOekulxyXG4gICAgc2V0VGlwOiBmdW5jdGlvbiAoc1RpcCwgb1BhcmFtcykge1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwid190aXAganNfdGlwXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+JyArIHNUaXAgKyAnPC9zcGFuPjwvc3Bhbj4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmpzX3RpcCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBpZiAob1BhcmFtcyAmJiBvUGFyYW1zLmNhbGxiYWNrKSBvUGFyYW1zLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSwgKG9QYXJhbXMgJiYgb1BhcmFtcy5tc2VjID8gb1BhcmFtcy5tc2VjIDogMTAwMCkpO1xyXG4gICAgfSwgXHJcbn1cclxuXHJcbmV4cG9ydCB7VXRpbEZufTsiLCIvKipcbiAqIOWFqOWxgOWPmOmHj+mFjee9rlxuICogXG4gKi9cbmxldCBDb21tb25WYXIgPSB7XG4gICAgbGlzdENvbnRlbnRXaWR0aDogMCxcbiAgICBjdXJyZW50VGltZTogbmV3IERhdGUoKSxcbn1cblxuZXhwb3J0IHtDb21tb25WYXJ9OyJdfQ==
