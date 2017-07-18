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

    $('#triggerLoading').bind('click', function () {
        _util.UtilFn.setLoading();
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

    // 邮箱格式验证
    isEmail: function isEmail(str) {
        return (/^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]+)+)$/.test(str)
        );
    },

    // 手机格式验证: 不少于7位数字
    isPhoneValid: function isPhoneValid(str) {
        return (/^[0-9]{7,}$/.test(str)
        );
    },

    // 密码格式验证: 7-20位数字或者字母
    isPasswordValid: function isPasswordValid(str) {
        return (/^[a-zA-Z0-9]{7,20}$/.test(str)
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
        var text = sText || 'Loading...';
        this.addPopup('<div class="w_loading">' + text + '</div>');
        this.setPopupVerticalMid('.w_loading');
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
     * }
     * 
     */
    setDialog: function setDialog(oDialogParams, bClose) {
        var title = oDialogParams.title ? oDialogParams.title : 'Title',
            content = oDialogParams.content,
            actionText = oDialogParams.actionText ? oDialogParams.actionText : 'Get it',
            leftActionText = oDialogParams.leftActionText ? oDialogParams.leftActionText : 'Cancel',
            leftActionStyle = oDialogParams.leftActionStyle ? ' style="' + oDialogParams.leftActionStyle + '"' : '',
            rightActionText = oDialogParams.rightActionText ? oDialogParams.rightActionText : 'Confirm',
            rightActionStyle = oDialogParams.rightActionStyle ? ' style="' + oDialogParams.rightActionStyle + '"' : '';

        var ActionTmpl = void 0;
        if (oDialogParams.isDoubleAction) {
            ActionTmpl = '<section class="ft ft_Double">' + '<a href="javascript:;" id="leftAction"' + leftActionStyle + '>' + leftActionText + '</a>' + '<a href="javascript:;" id="rightAction"' + rightActionStyle + '>' + rightActionText + '</a>' + '</section>';
        } else {
            ActionTmpl = '<section class="ft">' + '<a href="javascript:;" id="action">' + actionText + '</a>' + '</section>';
        }

        var tmpl = '<div class="m_dialog" id="dialog">' + '<section class="hd"><span class="title">' + title + '<span></section>' + '<section class="bd">' + content + '</section>' + ActionTmpl + '</div>';

        this.addPopup(tmpl, bClose ? true : false);
        this.setPopupVerticalMid('#dialog');

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

        var that = this;
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

    /**
     * 设置输入框
     * 
     */
    setInput: function setInput(target) {
        // 生成模板
        var attrObj = {
            id: $(target).attr('data-id') ? $(target).attr('data-id') : '',
            class: $(target).attr('data-class'),
            type: $(target).attr('data-type'),
            value: $(target).attr('data-value'),
            label: $(target).attr('data-label')
        };
        var customTmpl = '',
            isPassword = attrObj.type === 'password' && $('.js_pswToggle').length === 0 ? true : false; // 一个form表单只能有一个实际的密码框，不算密码确认框
        if (isPassword) customTmpl = '<span class="w_icon w_icon_EyeClose js_pswToggle"></span>';
        var tmpl = '<div class="w_input' + (isPassword ? ' w_input_Psw' : '') + '">\
                        <input id="' + attrObj.id + '" class=' + attrObj.class + ' type=' + attrObj.type + ' value="' + attrObj.value + '" />\
                        <label>' + attrObj.label + '</label>\
                        ' + customTmpl + '\
                    </div>';
        $(target).after(tmpl).remove();

        // 聚焦、输入、失焦处理
        $('.' + attrObj.class).bind('focus', function () {
            // 聚焦，处理样式
            var $parent = $(this).parent();
            $parent.removeClass('w_input_Warn w_input_Valid').addClass('w_input_Active');
        }).bind('keyup', function () {
            // 输入，处理样式、删除按钮
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
        }).bind('blur', function () {
            // 失焦，处理样式、错误提示
            var $parent = $(this).parent(),
                value = $(this).val();
            $parent.removeClass('w_input_Active');

            // 内容不符合条件
            $parent.addClass('w_input_Warn');
            if (value === '') return;
            switch ($(this).attr('class')) {
                case 'js_inputEm':
                    // 邮箱
                    var emVal = UtilFn.removeLastBlank(value);
                    if (!UtilFn.isEmail(emVal)) return UtilFn.setTip('邮箱格式错误，请重新输入');
                    break;
                case 'js_inputPh':
                    // 手机
                    if (!UtilFn.isPhoneValid(value)) return UtilFn.setTip('手机格式错误，请重新输入');
                    break;
                case 'js_inputPsw':
                    // 密码
                    if (!UtilFn.isPasswordValid(value)) return UtilFn.setTip('密码格式错误，请重新输入');
                    // 联动检查确认密码
                    var pswConfirmVal = $('.js_inputPsw_Confirm').val(),
                        _$parent = $('.js_inputPsw_Confirm').parent();
                    console.log(_$parent);
                    if (pswConfirmVal) {
                        if (pswConfirmVal === value) {
                            _$parent.removeClass('w_input_Warn').addClass('w_input_Valid');
                        } else {
                            _$parent.removeClass('w_input_Valid').addClass('w_input_Warn');
                            UtilFn.setTip('两次密码不一致');
                        }
                    }
                    break;
                case 'js_inputPsw_Confirm':
                    // 确认密码
                    if (value !== $('.js_inputPsw').val()) return UtilFn.setTip('两次密码不一致');
                    break;
                default:
                    break;
            }

            // 内容符合条件
            $parent.removeClass('w_input_Warn').addClass('w_input_Valid');
        });

        // 密码显隐处理
        if (isPassword) {
            $('.js_pswToggle').bind('click', function () {
                var $parent = $(this).parents('form.js_form');
                if ($(this).hasClass('w_icon_EyeClose')) {
                    $(this).removeClass('w_icon_EyeClose').addClass('w_icon_EyeOpen');
                    $parent.find('input[type="password"]').attr({
                        "type": "text"
                    });
                } else {
                    $(this).removeClass('w_icon_EyeOpen').addClass('w_icon_EyeClose');
                    $parent.find('input[type="text"]').attr({
                        "type": "password"
                    });
                }
            });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2pzL21vZHVsZS9fZGVtby5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdXRpbC5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNJQTs7QUFDQTs7QUFMQTs7OztBQU9BLEVBQUUsWUFBVztBQUNULGNBQVUsTUFBVixDQUFpQixTQUFTLElBQTFCOztBQUVBLE1BQUUsYUFBRixFQUFpQixJQUFqQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQ3ZDLHFCQUFPLE1BQVAsQ0FBYyxLQUFkO0FBQ0gsS0FGRDs7QUFJQSxNQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLFlBQVk7QUFDMUMscUJBQU8sU0FBUCxDQUFpQjtBQUNiLG1CQUFPLGNBRE07QUFFYixxQkFBUyxnQkFGSTtBQUdiLDRCQUFnQjtBQUhILFNBQWpCO0FBS0gsS0FORDs7QUFRQSxNQUFFLGlCQUFGLEVBQXFCLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVk7QUFDM0MscUJBQU8sVUFBUDtBQUNILEtBRkQ7O0FBSUEsTUFBRSxXQUFGLEVBQWUsSUFBZixDQUFvQixZQUFXO0FBQzNCLHFCQUFPLFFBQVAsQ0FBZ0IsSUFBaEI7QUFDSCxLQUZEO0FBR0gsQ0F0QkQ7QUF1QkEsT0FBTyxNQUFQLEdBQWdCLFlBQVcsQ0FBRSxDQUE3Qjs7Ozs7Ozs7Ozs7QUM5QkE7Ozs7OztBQU1BLElBQUksU0FBUztBQUNUO0FBQ0EscUJBQWlCLHlCQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQ2pDLFlBQUksUUFBUSxJQUFJLGVBQWhCO0FBQUEsWUFDSSxZQUFZLHVCQUF1QixNQUF2QixHQUFnQyxtQkFBaEMsR0FBc0QsUUFEdEU7QUFBQSxZQUVJLFNBQVMsU0FBVCxNQUFTLEdBQVk7QUFDakIsZ0JBQUksY0FB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QztBQUNyQyxzQkFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixpQkFBcEIsRUFBdUMsUUFBdkMsQ0FBZ0QsZ0JBQWhEO0FBQ0EsNEJBQVEsSUFBUixDQUFhLHdCQUFiLEVBQXVDLElBQXZDLENBQTRDO0FBQ3hDLGdDQUFRO0FBRGdDLHFCQUE1QztBQUdILGlCQUxELE1BS087QUFDSCxzQkFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixnQkFBcEIsRUFBc0MsUUFBdEMsQ0FBK0MsaUJBQS9DO0FBQ0EsNEJBQVEsSUFBUixDQUFhLG9CQUFiLEVBQW1DLElBQW5DLENBQXdDO0FBQ3BDLGdDQUFRO0FBRDRCLHFCQUF4QztBQUdIO0FBQ0osYUFiRDtBQWNIO0FBQ0osS0EvV1E7O0FBaVhUO0FBQ0EsWUFBUSxnQkFBVSxJQUFWLEVBQWdCLE9BQWhCLEVBQXlCO0FBQzdCLFVBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsbURBQW1ELElBQW5ELEdBQTBELGdCQUEzRTtBQUNBLG1CQUFXLFlBQVk7QUFDbkIsY0FBRSxTQUFGLEVBQWEsTUFBYjtBQUNBLGdCQUFJLFdBQVcsUUFBUSxRQUF2QixFQUFpQyxRQUFRLFFBQVI7QUFDcEMsU0FIRCxFQUdJLFdBQVcsUUFBUSxJQUFuQixHQUEwQixRQUFRLElBQWxDLEdBQXlDLElBSDdDO0FBSUg7QUF4WFEsQ0FBYjs7UUEyWFEsTSxHQUFBLE07Ozs7Ozs7O0FDallSOzs7O0FBSUEsSUFBSSxZQUFZO0FBQ1osb0JBQWtCLENBRE47QUFFWixlQUFhLElBQUksSUFBSjtBQUZELENBQWhCOztRQUtRLFMsR0FBQSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBkb2N1bWVudCByZWFkeSBhbmQgd2luZG93IG9ubG9hZFxyXG4gKiBcclxuICovXHJcbmltcG9ydCB7Q29tbW9uVmFyfSBmcm9tICcuL2NvbW1vbi9fdmFyLmpzJztcclxuaW1wb3J0IHtVdGlsRm59IGZyb20gJy4vY29tbW9uL191dGlsLmpzJztcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgICQoJyN0cmlnZ2VyVGlwJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVXRpbEZuLnNldFRpcCgnVElQJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjdHJpZ2dlckRpYWxvZycpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFV0aWxGbi5zZXREaWFsb2coe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0RpYWxvZyB0aXRsZScsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdEaWFsb2cgY29udGVudCcsXHJcbiAgICAgICAgICAgIGlzRG91YmxlQWN0aW9uOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJCgnI3RyaWdnZXJMb2FkaW5nJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVXRpbEZuLnNldExvYWRpbmcoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ3RhZy1pbnB1dCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgVXRpbEZuLnNldElucHV0KHRoaXMpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7fSIsIi8qKlxyXG4gKiDlt6Xlhbfmlrnms5VcclxuICogQGF1dGhvciBDY1xyXG4gKiBcclxuICovXHJcblxyXG5sZXQgVXRpbEZuID0ge1xyXG4gICAgLy8g5Yqo5oCB6K6+572uaHRtbOeahGZvbnQtc2l6Ze+8jOeUqOS6jnJlbeeahOiuoeeul1xyXG4gICAgc2V0SHRtbEZvbnRTaXplOiBmdW5jdGlvbiAoZG9jLCB3aW4pIHtcclxuICAgICAgICBsZXQgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxyXG4gICAgICAgICAgICByZXNpemVFdnQgPSAnb3JpZW50YXRpb25jaGFuZ2UnIGluIHdpbmRvdyA/ICdvcmllbnRhdGlvbmNoYW5nZScgOiAncmVzaXplJyxcclxuICAgICAgICAgICAgcmVjYWxjID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsaWVudFdpZHRoID0gZG9jRWwuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNsaWVudFdpZHRoKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBkb2NFbC5zdHlsZS5mb250U2l6ZSA9IChjbGllbnRXaWR0aCAqIDAuMSkgKyAncHgnO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIWRvYy5hZGRFdmVudExpc3RlbmVyKSByZXR1cm47XHJcbiAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIocmVzaXplRXZ0LCByZWNhbGMsIGZhbHNlKTtcclxuICAgICAgICAvLyBET03liqDovb3kuYvlkI7lj4rotYTmupDliqDovb3kuYvliY3ljrvmiafooYzvvIzljbPlr7nlupRqUXVlcnnkuK3nmoRkb2N1bWVudCByZWFkeVxyXG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcmVjYWxjLCBmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPlmxvY2F0aW9uIHNlYXJjaOWPguaVsO+8jOi/lOWbnuS4gOS4qnNlYXJjaOWvueixoVxyXG4gICAgZ2V0TG9jYXRpb25TZWFyY2hPYmo6IGZ1bmN0aW9uIChxc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNwbGl0VXJsID0gcXN0cmluZy5zcGxpdChcIj9cIik7XHJcbiAgICAgICAgbGV0IHN0clVybCA9IChzcGxpdFVybC5sZW5ndGggPiAxKSA/IGRlY29kZVVSSUNvbXBvbmVudChzcGxpdFVybFsxXSkuc3BsaXQoXCImXCIpIDogW107XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc3RyVXJsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHJVcmxbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBvYmpbc3RyWzBdXSA9IHN0clsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zb3J0LmNhbGwob2JqKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Yik5pat546v5aKDXHJcbiAgICBpc2lPUzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1xcKGlbXjtdKzsoIFU7KT8gQ1BVLitNYWMgT1MgWC8pO1xyXG4gICAgfSxcclxuICAgIGlzQW5kcmlvZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAvYW5kcm9pZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfSxcclxuICAgIGlzV2VDaGF0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIC9taWNyb21lc3Nlbmdlci8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfSxcclxuICAgIGlzUGM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdXNlckFnZW50SW5mbyA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgYWdlbnRzID0gW1wiYW5kcm9pZFwiLCBcImlwaG9uZVwiLCBcImlwYWRcIiwgXCJpcG9kXCIsIFwic3ltYmlhbm9zXCIsIFwid2luZG93cyBwaG9uZVwiXTtcclxuICAgICAgICBsZXQgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHVzZXJBZ2VudEluZm8uaW5kZXhPZihhZ2VudHNbaV0pID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOmCrueuseagvOW8j+mqjOivgVxyXG4gICAgaXNFbWFpbDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiAvXihbYS16QS1aMC05XFwuXy1dKStAKFthLXpBLVowLTlfLV0pKygoXFwuW2EtekEtWjAtOV8tXSspKykkLy50ZXN0KHN0cik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaJi+acuuagvOW8j+mqjOivgTog5LiN5bCR5LqON+S9jeaVsOWtl1xyXG4gICAgaXNQaG9uZVZhbGlkOiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIC9eWzAtOV17Nyx9JC8udGVzdChzdHIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDlr4bnoIHmoLzlvI/pqozor4E6IDctMjDkvY3mlbDlrZfmiJbogIXlrZfmr41cclxuICAgIGlzUGFzc3dvcmRWYWxpZDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiAvXlthLXpBLVowLTldezcsMjB9JC8udGVzdChzdHIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDml7bpl7TmiLPovazmjaLmoLzlvI9cclxuICAgIGRhdGU6IGZ1bmN0aW9uIChzLCBmbXQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHMgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBzID0gTnVtYmVyKHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmbXQgPSBmbXQgfHwgXCJ5eXl5LU1NLWRkIGhoOm1tOnNzXCI7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHMgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBkYXRlID0gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG8gPSB7XHJcbiAgICAgICAgICAgIFwiTStcIjogZGF0ZS5nZXRNb250aCgpICsgMSwgLy/mnIjku71cclxuICAgICAgICAgICAgXCJkK1wiOiBkYXRlLmdldERhdGUoKSwgLy/ml6VcclxuICAgICAgICAgICAgXCJoK1wiOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcbiAgICAgICAgICAgIFwibStcIjogZGF0ZS5nZXRNaW51dGVzKCksIC8v5YiGXHJcbiAgICAgICAgICAgIFwicytcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSXHJcbiAgICAgICAgICAgIFwicStcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuICAgICAgICAgICAgXCJTXCI6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICgvKHkrKS8udGVzdChmbXQpKSBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcclxuICAgICAgICBmb3IgKGxldCBrIGluIG8pIHtcclxuICAgICAgICAgICAgaWYgKG5ldyBSZWdFeHAoXCIoXCIgKyBrICsgXCIpXCIpLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aCA9PSAxKSA/IChvW2tdKSA6ICgoXCIwMFwiICsgb1trXSkuc3Vic3RyKChcIlwiICsgb1trXSkubGVuZ3RoKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm10O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDorr7nva5jb29raWVcclxuICAgIHNldENvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XHJcbiAgICAgICAgZGF5cyA9IGRheXMgfHwgMDtcclxuICAgICAgICBsZXQgZXhwaXJlcyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGRheXMgIT0gMCkgeyAvL+iuvue9rmNvb2tpZei/h+acn+aXtumXtCAgXHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgbGV0IG1zID0gZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIG1zKTtcclxuICAgICAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF5cyA9PSBJbmZpbml0eSkgeyAvLyDorr7nva7mnIDlpKfov4fmnJ/ml7bpl7RcclxuICAgICAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+WY29va2llXHJcbiAgICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgbGV0IG5hbWVFUSA9IG5hbWUgKyBcIj1cIjtcclxuICAgICAgICBsZXQgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTsgLy/miopjb29raWXliIblibLmiJDnu4QgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSBjYVtpXTsgLy/lj5blvpflrZfnrKbkuLIgIFxyXG4gICAgICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSB7IC8v5Yik5pat5LiA5LiL5a2X56ym5Liy5pyJ5rKh5pyJ5YmN5a+856m65qC8ICBcclxuICAgICAgICAgICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCk7IC8v5pyJ55qE6K+d77yM5LuO56ys5LqM5L2N5byA5aeL5Y+WICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT0gMCkgeyAvL+WmguaenOWQq+acieaIkeS7rOimgeeahG5hbWUgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOa4hemZpGNvb2tpZXNcclxuICAgIGNsZWFyQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuc2V0Q29va2llKG5hbWUsIFwiXCIsIC0xKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+W54m55a6abG9jYWxzdG9yYWdlXHJcbiAgICBnZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uIChrZXksIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWOu+aOiee7k+WwvuepuuagvFxyXG4gICAgcmVtb3ZlTGFzdEJsYW5rOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKFxccyokKS9nLCBcIlwiKTtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvLyDorr7nva7lvLnnqpflnoLnm7TlsYXkuK1cclxuICAgIHNldFBvcHVwVmVydGljYWxNaWQ6IGZ1bmN0aW9uIChkb21PYmopIHtcclxuICAgICAgICBpZiAoJChkb21PYmopKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3B1cEhlaWdodCA9ICQoZG9tT2JqKS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgJChkb21PYmopLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAndG9wJzogKHdpbkhlaWdodCAtIHBvcHVwSGVpZ2h0KSAvIDIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJQb3B1cCBpcyBub3QgZXhpc3TvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDnlJ/miJDlvLnnqpdcclxuICAgIGFkZFBvcHVwOiBmdW5jdGlvbiAoY29udGVudCwgYkNsb3NlKSB7XHJcbiAgICAgICAgdGhpcy5kZWxQb3B1cCgpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibV9wb3B1cFwiIGlkPVwicG9wdXBcIj48ZGl2IGNsYXNzPVwibWFza1wiIGlkPVwicG9wdXBNYXNrXCI+PC9kaXY+JyArIGNvbnRlbnQgKyAnPC9kaXY+Jyk7XHJcbiAgICAgICAgaWYgKGJDbG9zZSkge1xyXG4gICAgICAgICAgICAkKCcjcG9wdXBNYXNrJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyDliKDpmaTlvLnnqpdcclxuICAgIGRlbFBvcHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3BvcHVwJykucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9ruWFqOWxgOWKoOi9vVxyXG4gICAgc2V0TG9hZGluZzogZnVuY3Rpb24gKHNUZXh0KSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBzVGV4dCB8fCAnTG9hZGluZy4uLic7XHJcbiAgICAgICAgdGhpcy5hZGRQb3B1cCgnPGRpdiBjbGFzcz1cIndfbG9hZGluZ1wiPicgKyB0ZXh0ICsgJzwvZGl2PicpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9wdXBWZXJ0aWNhbE1pZCgnLndfbG9hZGluZycpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWvueivneahhlxyXG4gICAgICogb0RpYWxvZ1BhcmFtczoge1xyXG4gICAgICogIHRpdGxlOiAgICAgICAgICAgICAgc3RyaW5nIOW8ueeql+agh+mimCxcclxuICAgICAqICBjb250ZW50OiAgICAgICAgICAgIHN0cmluZyDlvLnnqpflhoXlrrksXHJcbiAgICAgKiAgaXNEb3VibGVBY3Rpb246ICAgICBib29sZWFuIOaYr+WQpuS4pOS4quaMiemSrixcclxuICAgICAqICBhY3Rpb25UZXh0OiAgICAgICAgIHN0cmluZyDljZXmjInpkq7mlofmnKwsXHJcbiAgICAgKiAgYWN0aW9uRnVuYzogICAgICAgICBmdW5jdGlvbiDljZXmjInpkq7mlrnms5UsXHJcbiAgICAgKiAgbGVmdEFjdGlvblRleHQ6ICAgICBzdHJpbmcg5bem5L6n5oyJ6ZKu5paH5pysLFxyXG4gICAgICogIGxlZnRBY3Rpb25GdW5jOiAgICAgZnVuY3Rpb24g5bem5L6n5oyJ6ZKu5pa55rOVLFxyXG4gICAgICogIGxlZnRBY3Rpb25TdHlsZTogICAgc3RyaW5nIOW3puS+p+aMiemSruagt+W8jyxcclxuICAgICAqICByaWdodEFjdGlvblRleHQ6ICAgIHN0cmluZyDlt6bkvqfmjInpkq7mlofmnKwsXHJcbiAgICAgKiAgcmlnaHRBY3Rpb25GdW5jOiAgICBmdW5jdGlvbiDlj7PkvqfmjInpkq7mlrnms5UsXHJcbiAgICAgKiAgcmlnaHRBY3Rpb25TdHlsZTogICBzdHJpbmcg5Y+z5L6n5oyJ6ZKu5qC35byPLFxyXG4gICAgICogfVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHNldERpYWxvZzogZnVuY3Rpb24gKG9EaWFsb2dQYXJhbXMsIGJDbG9zZSkge1xyXG4gICAgICAgIGxldCB0aXRsZSA9IG9EaWFsb2dQYXJhbXMudGl0bGUgPyBvRGlhbG9nUGFyYW1zLnRpdGxlIDogJ1RpdGxlJyxcclxuICAgICAgICAgICAgY29udGVudCA9IG9EaWFsb2dQYXJhbXMuY29udGVudCxcclxuICAgICAgICAgICAgYWN0aW9uVGV4dCA9IG9EaWFsb2dQYXJhbXMuYWN0aW9uVGV4dCA/IG9EaWFsb2dQYXJhbXMuYWN0aW9uVGV4dCA6ICdHZXQgaXQnLFxyXG4gICAgICAgICAgICBsZWZ0QWN0aW9uVGV4dCA9IG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblRleHQgPyBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25UZXh0IDogJ0NhbmNlbCcsXHJcbiAgICAgICAgICAgIGxlZnRBY3Rpb25TdHlsZSA9IG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblN0eWxlID8gJyBzdHlsZT1cIicgKyBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25TdHlsZSArICdcIicgOiAnJyxcclxuICAgICAgICAgICAgcmlnaHRBY3Rpb25UZXh0ID0gb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvblRleHQgPyBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uVGV4dCA6ICdDb25maXJtJyxcclxuICAgICAgICAgICAgcmlnaHRBY3Rpb25TdHlsZSA9IG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25TdHlsZSA/ICcgc3R5bGU9XCInICsgb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvblN0eWxlICsgJ1wiJyA6ICcnO1xyXG5cclxuICAgICAgICBsZXQgQWN0aW9uVG1wbDtcclxuICAgICAgICBpZiAob0RpYWxvZ1BhcmFtcy5pc0RvdWJsZUFjdGlvbikge1xyXG4gICAgICAgICAgICBBY3Rpb25UbXBsID0gJzxzZWN0aW9uIGNsYXNzPVwiZnQgZnRfRG91YmxlXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGlkPVwibGVmdEFjdGlvblwiJyArIGxlZnRBY3Rpb25TdHlsZSArICc+JyArIGxlZnRBY3Rpb25UZXh0ICsgJzwvYT4nICtcclxuICAgICAgICAgICAgICAgICc8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgaWQ9XCJyaWdodEFjdGlvblwiJyArIHJpZ2h0QWN0aW9uU3R5bGUgKyAnPicgKyByaWdodEFjdGlvblRleHQgKyAnPC9hPicgK1xyXG4gICAgICAgICAgICAgICAgJzwvc2VjdGlvbj4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFjdGlvblRtcGwgPSAnPHNlY3Rpb24gY2xhc3M9XCJmdFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBpZD1cImFjdGlvblwiPicgKyBhY3Rpb25UZXh0ICsgJzwvYT4nICtcclxuICAgICAgICAgICAgICAgICc8L3NlY3Rpb24+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0bXBsID0gJzxkaXYgY2xhc3M9XCJtX2RpYWxvZ1wiIGlkPVwiZGlhbG9nXCI+JyArXHJcbiAgICAgICAgICAgICc8c2VjdGlvbiBjbGFzcz1cImhkXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPicgKyB0aXRsZSArICc8c3Bhbj48L3NlY3Rpb24+JyArXHJcbiAgICAgICAgICAgICc8c2VjdGlvbiBjbGFzcz1cImJkXCI+JyArIGNvbnRlbnQgKyAnPC9zZWN0aW9uPicgK1xyXG4gICAgICAgICAgICBBY3Rpb25UbXBsICtcclxuICAgICAgICAgICAgJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkUG9wdXAodG1wbCwgKGJDbG9zZSA/IHRydWUgOiBmYWxzZSkpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9wdXBWZXJ0aWNhbE1pZCgnI2RpYWxvZycpO1xyXG5cclxuICAgICAgICAvLyDop6PlhrPmn5DkupvkvY7nq6/ns7vnu5/lronljZPmnLrkuIvvvIjlpoJuZXh1czXjgIHlsI/nsbPnrYnvvInvvIzor7fmsYLov5Tlm57pobXpnaLmuLLmn5PnmoRidWdcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoc2hhcmVzZGspIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvcFwiOiBNYXRoLnJhbmRvbSgpICsgXCJweFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQoJyNhY3Rpb24nKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5kZWxQb3B1cCgpO1xyXG4gICAgICAgICAgICBpZiAob0RpYWxvZ1BhcmFtcy5hY3Rpb25GdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBvRGlhbG9nUGFyYW1zLmFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNsZWZ0QWN0aW9uJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsUG9wdXAoKTtcclxuICAgICAgICAgICAgaWYgKG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvbkZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNyaWdodEFjdGlvbicpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIGlmIChvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uRnVuYykge1xyXG4gICAgICAgICAgICAgICAgb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rui+k+WFpeahhlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHNldElucHV0OiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgLy8g55Sf5oiQ5qih5p2/XHJcbiAgICAgICAgbGV0IGF0dHJPYmogPSB7XHJcbiAgICAgICAgICAgIGlkOiAkKHRhcmdldCkuYXR0cignZGF0YS1pZCcpID8gJCh0YXJnZXQpLmF0dHIoJ2RhdGEtaWQnKSA6ICcnLFxyXG4gICAgICAgICAgICBjbGFzczogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtY2xhc3MnKSxcclxuICAgICAgICAgICAgdHlwZTogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtdHlwZScpLFxyXG4gICAgICAgICAgICB2YWx1ZTogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtdmFsdWUnKSxcclxuICAgICAgICAgICAgbGFiZWw6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLWxhYmVsJylcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjdXN0b21UbXBsID0gJycsXHJcbiAgICAgICAgICAgIGlzUGFzc3dvcmQgPSBhdHRyT2JqLnR5cGUgPT09ICdwYXNzd29yZCcgJiYgJCgnLmpzX3Bzd1RvZ2dsZScpLmxlbmd0aCA9PT0gMCA/IHRydWUgOiBmYWxzZTsgLy8g5LiA5LiqZm9ybeihqOWNleWPquiDveacieS4gOS4quWunumZheeahOWvhueggeahhu+8jOS4jeeul+WvhueggeehruiupOahhlxyXG4gICAgICAgIGlmIChpc1Bhc3N3b3JkKSBjdXN0b21UbXBsID0gJzxzcGFuIGNsYXNzPVwid19pY29uIHdfaWNvbl9FeWVDbG9zZSBqc19wc3dUb2dnbGVcIj48L3NwYW4+JztcclxuICAgICAgICBsZXQgdG1wbCA9ICc8ZGl2IGNsYXNzPVwid19pbnB1dCcgKyAoaXNQYXNzd29yZCA/ICcgd19pbnB1dF9Qc3cnIDogJycpICsgJ1wiPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIicgKyBhdHRyT2JqLmlkICsgJ1wiIGNsYXNzPScgKyBhdHRyT2JqLmNsYXNzICsgJyB0eXBlPScgKyBhdHRyT2JqLnR5cGUgKyAnIHZhbHVlPVwiJyArIGF0dHJPYmoudmFsdWUgKyAnXCIgLz5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JyArIGF0dHJPYmoubGFiZWwgKyAnPC9sYWJlbD5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICsgY3VzdG9tVG1wbCArICdcXFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XHJcbiAgICAgICAgJCh0YXJnZXQpLmFmdGVyKHRtcGwpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAvLyDogZrnhKbjgIHovpPlhaXjgIHlpLHnhKblpITnkIZcclxuICAgICAgICAkKCcuJyArIGF0dHJPYmouY2xhc3MpLmJpbmQoJ2ZvY3VzJywgZnVuY3Rpb24oKSB7IC8vIOiBmueEpu+8jOWkhOeQhuagt+W8j1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybiB3X2lucHV0X1ZhbGlkJykuYWRkQ2xhc3MoJ3dfaW5wdXRfQWN0aXZlJyk7XHJcbiAgICAgICAgfSkuYmluZCgna2V5dXAnLCBmdW5jdGlvbigpIHsgLy8g6L6T5YWl77yM5aSE55CG5qC35byP44CB5Yig6Zmk5oyJ6ZKuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKSxcclxuICAgICAgICAgICAgICAgICRkZWwgPSAkcGFyZW50LmNoaWxkcmVuKCcuanNfaW5wdXREZWwnKTtcclxuICAgICAgICAgICAgaWYgKCRkZWwpIHtcclxuICAgICAgICAgICAgICAgICRkZWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykudmFsKCkpIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZGVsVGVtcCA9ICc8c3BhbiBjbGFzcz1cIndfaWNvbiB3X2ljb25fSW5wdXREZWwganNfaW5wdXREZWxcIj48L3NwYW4+JztcclxuICAgICAgICAgICAgJHBhcmVudC5hcHBlbmQoZGVsVGVtcCk7XHJcbiAgICAgICAgICAgICRkZWwgPSAkcGFyZW50LmNoaWxkcmVuKCcuanNfaW5wdXREZWwnKTtcclxuICAgICAgICAgICAgJGRlbC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcuanNfdGlwJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoYXQpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmJpbmQoJ2JsdXInLCBmdW5jdGlvbigpIHsgLy8g5aSx54Sm77yM5aSE55CG5qC35byP44CB6ZSZ6K+v5o+Q56S6XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKSxcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnd19pbnB1dF9BY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOWGheWuueS4jeespuWQiOadoeS7tlxyXG4gICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCd3X2lucHV0X1dhcm4nKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnJykgcmV0dXJuO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCQodGhpcykuYXR0cignY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnanNfaW5wdXRFbSc6IC8vIOmCrueusVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbVZhbCA9IFV0aWxGbi5yZW1vdmVMYXN0QmxhbmsodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbEZuLmlzRW1haWwoZW1WYWwpKSByZXR1cm4gVXRpbEZuLnNldFRpcCgn6YKu566x5qC85byP6ZSZ6K+v77yM6K+36YeN5paw6L6T5YWlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc19pbnB1dFBoJzogLy8g5omL5py6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlsRm4uaXNQaG9uZVZhbGlkKHZhbHVlKSkgcmV0dXJuIFV0aWxGbi5zZXRUaXAoJ+aJi+acuuagvOW8j+mUmeivr++8jOivt+mHjeaWsOi+k+WFpScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnanNfaW5wdXRQc3cnOiAvLyDlr4bnoIFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVV0aWxGbi5pc1Bhc3N3b3JkVmFsaWQodmFsdWUpKSByZXR1cm4gVXRpbEZuLnNldFRpcCgn5a+G56CB5qC85byP6ZSZ6K+v77yM6K+36YeN5paw6L6T5YWlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6IGU5Yqo5qOA5p+l56Gu6K6k5a+G56CBXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBzd0NvbmZpcm1WYWwgPSAkKCcuanNfaW5wdXRQc3dfQ29uZmlybScpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50ID0gJCgnLmpzX2lucHV0UHN3X0NvbmZpcm0nKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkcGFyZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHN3Q29uZmlybVZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHN3Q29uZmlybVZhbCA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybicpLmFkZENsYXNzKCd3X2lucHV0X1ZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCd3X2lucHV0X1ZhbGlkJykuYWRkQ2xhc3MoJ3dfaW5wdXRfV2FybicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbEZuLnNldFRpcCgn5Lik5qyh5a+G56CB5LiN5LiA6Ie0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc19pbnB1dFBzd19Db25maXJtJzogLy8g56Gu6K6k5a+G56CBXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAkKCcuanNfaW5wdXRQc3cnKS52YWwoKSkgcmV0dXJuIFV0aWxGbi5zZXRUaXAoJ+S4pOasoeWvhueggeS4jeS4gOiHtCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5YaF5a6556ym5ZCI5p2h5Lu2XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybicpLmFkZENsYXNzKCd3X2lucHV0X1ZhbGlkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWvhueggeaYvumakOWkhOeQhlxyXG4gICAgICAgIGlmIChpc1Bhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICQoJy5qc19wc3dUb2dnbGUnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudHMoJ2Zvcm0uanNfZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3dfaWNvbl9FeWVDbG9zZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnd19pY29uX0V5ZUNsb3NlJykuYWRkQ2xhc3MoJ3dfaWNvbl9FeWVPcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKS5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3dfaWNvbl9FeWVPcGVuJykuYWRkQ2xhc3MoJ3dfaWNvbl9FeWVDbG9zZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaPkOekulxyXG4gICAgc2V0VGlwOiBmdW5jdGlvbiAoc1RpcCwgb1BhcmFtcykge1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwid190aXAganNfdGlwXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+JyArIHNUaXAgKyAnPC9zcGFuPjwvc3Bhbj4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmpzX3RpcCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBpZiAob1BhcmFtcyAmJiBvUGFyYW1zLmNhbGxiYWNrKSBvUGFyYW1zLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSwgKG9QYXJhbXMgJiYgb1BhcmFtcy5tc2VjID8gb1BhcmFtcy5tc2VjIDogMTAwMCkpO1xyXG4gICAgfSwgXHJcbn1cclxuXHJcbmV4cG9ydCB7VXRpbEZufTsiLCIvKipcbiAqIOWFqOWxgOWPmOmHj+mFjee9rlxuICogXG4gKi9cbmxldCBDb21tb25WYXIgPSB7XG4gICAgbGlzdENvbnRlbnRXaWR0aDogMCxcbiAgICBjdXJyZW50VGltZTogbmV3IERhdGUoKSxcbn1cblxuZXhwb3J0IHtDb21tb25WYXJ9OyJdfQ==
