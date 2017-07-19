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

    (function () {
        $('form').each(function (index, item) {
            localStorage.setItem($(item).attr('data-symbol'), '');
        });
        $('tag-input').each(function (index, item) {
            _util.UtilFn.setInput(item);
        });
        $('.js_formSubmit').each(function (index, item) {
            _util.UtilFn.setSubmitBtn(item);
        });
    })();
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

    // 提示
    setTip: function setTip(sTip, oParams) {
        $('body').append('<span class="w_tip js_tip"><span class="text">' + sTip + '</span></span>');
        setTimeout(function () {
            $('.js_tip').remove();
            if (oParams && oParams.callback) oParams.callback();
        }, oParams && oParams.msec ? oParams.msec : 1000);
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
     * 设置form表单输入框
     * 
     */
    setInput: function setInput(target) {
        // 生成模板
        var attrObj = {
            id: $(target).attr('data-id'),
            class: $(target).attr('data-class'),
            type: $(target).attr('data-type'),
            value: $(target).attr('data-value'),
            label: $(target).attr('data-label'),
            symbol: $(target).attr('data-symbol'), // 用于标记form表单的出错信息
            order: $(target).attr('data-order') // 用于决定提交时出错信息的顺序， 从0开始严格升序排序，提示数值最小值对应的内容
        };
        var customTmpl = '',
            isPassword = attrObj.type === 'password' && $('.js_pswToggle').length === 0 ? true : false; // 一个form表单只能有一个实际的密码框，不算密码确认框
        if (isPassword) customTmpl = '<span class="w_icon w_icon_EyeClose js_pswToggle"></span>';
        var tmpl = '<div class="w_input' + (isPassword ? ' w_input_Psw' : '') + '">\
                        <input id="' + attrObj.id + '" class=' + attrObj.class + ' type=' + attrObj.type + ' value="' + attrObj.value + '" data-order=' + attrObj.order + ' />\
                        <label>' + attrObj.label + '</label>\
                        ' + customTmpl + '\
                    </div>';
        $(target).after(tmpl).remove();

        // 设置错误信息到localstorage
        var localData = JSON.parse(localStorage.getItem(attrObj.symbol) || '{}'),
            errorList = localData.error && localData.error.length ? localData.error : [],
            errorItem = {
            id: attrObj.id,
            class: attrObj.class,
            order: attrObj.order
        };
        switch (attrObj.class) {
            case 'js_inputEm':
                // 邮箱
                errorItem['msg'] = "邮箱不能为空";
                break;
            case 'js_inputPh':
                // 手机
                errorItem['msg'] = "手机不能为空";
                break;
            case 'js_inputPsw':
                // 密码
                errorItem['msg'] = "密码不能为空";
                break;
            case 'js_inputPsw_Confirm':
                // 确认密码
                errorItem['msg'] = "确认密码不能为空";
                break;
            default:
                break;
        }
        errorList.push(errorItem);
        localStorage.setItem(attrObj.symbol, JSON.stringify({ "error": errorList, "inputBlur": "false" }));

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
            var oTarget = this,
                bValid = void 0,
                errorMsg = void 0;
            switch ($(this).attr('class')) {
                case 'js_inputEm':
                    // 邮箱
                    var emVal = UtilFn.removeLastBlank(value);
                    if (UtilFn.isEmail(emVal)) {
                        bValid = true;
                    } else {
                        bValid = false;
                        errorMsg = value === '' ? '邮箱不能为空' : '邮箱格式错误，请重新输入';
                    }
                    break;
                case 'js_inputPh':
                    // 手机
                    if (UtilFn.isPhoneValid(value)) {
                        bValid = true;
                    } else {
                        bValid = false;
                        errorMsg = value === '' ? '手机不能为空' : '手机格式错误，请重新输入';
                    }
                    break;
                case 'js_inputPsw':
                    // 密码
                    if (UtilFn.isPasswordValid(value)) {
                        bValid = true;
                        UtilFn.updateFormError({
                            bValid: bValid,
                            symbol: attrObj.symbol,
                            target: oTarget
                        });
                        // 内容符合条件
                        $parent.removeClass('w_input_Warn').addClass('w_input_Valid');

                        // 联动检查确认密码
                        var inputPswConfirm = '.js_inputPsw_Confirm',
                            pswConfirmVal = $(inputPswConfirm).val(),
                            $confirmParent = $(inputPswConfirm).parent();
                        if (pswConfirmVal) {
                            // 检查对象调整为联动对象
                            oTarget = inputPswConfirm;
                            if (pswConfirmVal === value) {
                                $confirmParent.removeClass('w_input_Warn').addClass('w_input_Valid');
                            } else {
                                $confirmParent.removeClass('w_input_Valid').addClass('w_input_Warn');
                                bValid = false;
                                errorMsg = '两次密码不一致';
                                attrObj.id = $(oTarget).attr('id');
                                attrObj.class = $(oTarget).attr('class');
                                attrObj.order = $(oTarget).attr('data-order');
                            }
                        }
                    } else {
                        bValid = false;
                        errorMsg = value === '' ? '密码不能为空' : '密码格式错误，请重新输入';
                        attrObj.id = $(oTarget).attr('id');
                        attrObj.class = $(oTarget).attr('class');
                        attrObj.order = $(oTarget).attr('data-order');
                    }
                    break;
                case 'js_inputPsw_Confirm':
                    // 确认密码
                    if (value === $('.js_inputPsw').val()) {
                        bValid = true;
                    } else {
                        bValid = false;
                        errorMsg = '两次密码不一致';
                    }
                    break;
                default:
                    break;
            }

            if (bValid) {
                UtilFn.updateFormError({
                    bValid: bValid,
                    symbol: attrObj.symbol,
                    target: oTarget
                });
            } else {
                UtilFn.updateFormError({
                    bValid: bValid,
                    symbol: attrObj.symbol,
                    target: oTarget,
                    id: attrObj.id,
                    class: attrObj.class,
                    order: attrObj.order,
                    msg: errorMsg
                });
                return UtilFn.setTip(errorMsg);
            }

            // 内容符合条件
            $parent.removeClass('w_input_Warn').addClass('w_input_Valid');
        });

        // 密码显隐处理
        if (isPassword) {
            $('.js_pswToggle').bind('click', function () {
                var $parent = $(this).parents('form');
                if ($(this).hasClass('w_icon_EyeClose')) {
                    $(this).removeClass('w_icon_EyeClose').addClass('w_icon_EyeOpen');
                    $parent.find('input[type="password"]').attr({
                        "type": "text",
                        "data-pswtoggle": "true"
                    });
                } else {
                    $(this).removeClass('w_icon_EyeOpen').addClass('w_icon_EyeClose');
                    $parent.find('input[type="text"][data-pswtoggle="true"]').attr({
                        "type": "password"
                    });
                }
            });
        }
    },
    // 更新localstorage里的错误信息，用于提交时检查使用
    updateFormError: function updateFormError(oParams) {
        var bValid = oParams.bValid,
            formSymbol = oParams.symbol,
            target = oParams.target,
            id = oParams.id,
            cls = oParams.class,
            order = oParams.order,
            msg = oParams.msg;

        var localData = JSON.parse(localStorage.getItem(formSymbol)),
            errorList = localData.error.length ? localData.error : [],
            bUpdate = false; // 判断是否更新错误信息

        errorList.every(function (item, index, arr) {
            if (item.class === $(target).attr('class')) {
                bUpdate = true; // 已有错误信息，则更新
                bValid ? arr.splice(index, 1) : item.msg = msg;
                return false; // 终止循环
            } else {
                return true; // 继续循环
            }
        });
        // 未有错误信息且验证有错，则添加
        if (!bUpdate && !bValid) {
            var errorItem = {
                id: id,
                class: cls,
                order: order,
                msg: msg
            };

            // 设置提示排序
            // 从0开始严格按照升序排序，这时order只能小于或等于errorList.length
            if (Number(order) >= errorList.length) {
                // 添加到数组结尾
                errorList.push(errorItem);
            } else {
                // 添加到指定位置
                var afterIndex = void 0;
                errorList.every(function (item, index, arr) {
                    if (Number(order) + 1 === Number(item.order)) {
                        afterIndex = index;
                        return false; // 终止循环
                    } else {
                        return true; // 继续循环
                    }
                });
                errorList.splice(afterIndex, 0, errorItem);
            }
        }

        localStorage.setItem(formSymbol, JSON.stringify({ "error": errorList, "inputBlur": bValid ? "false" : "true" }));
        console.log(localStorage.getItem(formSymbol));
    },

    /**
     * 设置form表单提交按钮
     * 
     */
    setSubmitBtn: function setSubmitBtn(target, validCallback) {
        var attrObj = {
            symbol: $(target).attr('data-symbol') // 用于标记form表单的出错信息
        };

        $(target).bind('click', function () {
            $(this).parents('form').find('input').parent().removeClass('w_input_Warn'); // 重置表单内输入框的错误样式
            var localData = JSON.parse(localStorage.getItem(attrObj.symbol)),
                errorList = localData.error.length ? localData.error : [];

            if (errorList.length) {
                errorList.forEach(function (item, index) {
                    $('#' + item.id).parent().addClass('w_input_Warn');
                });

                if (localData.inputBlur === 'true') {
                    // 输入框失焦，提示自身错误
                    localData.inputBlur = 'false';
                    localStorage.setItem(attrObj.symbol, JSON.stringify(localData));
                } else {
                    // 非输入框失焦，提示高优先级错误
                    UtilFn.setTip(errorList[0].msg);
                }
                return;
            }

            console.log('检查通过回调');
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2pzL21vZHVsZS9fZGVtby5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdXRpbC5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNJQTs7QUFDQTs7QUFMQTs7OztBQU9BLEVBQUUsWUFBVztBQUNULGNBQVUsTUFBVixDQUFpQixTQUFTLElBQTFCOztBQUVBLE1BQUUsYUFBRixFQUFpQixJQUFqQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQ3ZDLHFCQUFPLE1BQVAsQ0FBYyxLQUFkO0FBQ0gsS0FGRDs7QUFJQSxNQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLFlBQVk7QUFDMUMscUJBQU8sU0FBUCxDQUFpQjtBQUNiLG1CQUFPLGNBRE07QUFFYixxQkFBUyxnQkFGSTtBQUdiLDRCQUFnQjtBQUhILFNBQWpCO0FBS0gsS0FORDs7QUFRQSxNQUFFLGlCQUFGLEVBQXFCLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVk7QUFDM0MscUJBQU8sVUFBUDtBQUNILEtBRkQ7O0FBSUEsS0FBQyxZQUFNO0FBQ0gsVUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDNUIseUJBQWEsT0FBYixDQUFxQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsYUFBYixDQUFyQixFQUFrRCxFQUFsRDtBQUNILFNBRkQ7QUFHQSxVQUFFLFdBQUYsRUFBZSxJQUFmLENBQW9CLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDakMseUJBQU8sUUFBUCxDQUFnQixJQUFoQjtBQUNILFNBRkQ7QUFHQSxVQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDdEMseUJBQU8sWUFBUCxDQUFv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VUFBVSxLQUFuQyxHQUEyQyxFQUQzRDs7QUFHQSxnQkFBSSxVQUFVLE1BQWQsRUFBc0I7QUFDbEIsMEJBQVUsT0FBVixDQUFrQixVQUFDLElBQUQsRUFBTyxLQUFQLEVBQWlCO0FBQy9CLHNCQUFFLE1BQU0sS0FBSyxFQUFiLEVBQWlCLE1BQWpCLEdBQTBCLFFBQTFCLENBQW1DLGNBQW5DO0FBQ0gsaUJBRkQ7O0FBSUEsb0JBQUksVUFBVSxTQUFWLEtBQXdCLE1BQTVCLEVBQW9DO0FBQUU7QUFDbEMsOEJBQVUsU0FBVixHQUFzQixPQUF0QjtBQUNBLGlDQUFhLE9BQWIsQ0FBcUIsUUFBUSxNQUE3QixFQUFxQyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXJDO0FBQ0gsaUJBSEQsTUFHTztBQUFFO0FBQ0wsMkJBQU8sTUFBUCxDQUFjLFVBQVUsQ0FBVixFQUFhLEdBQTNCO0FBQ0g7QUFDRDtBQUNIOztBQUVELG9CQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0gsU0FwQkQ7QUFxQkg7O0FBdGlCUSxDQUFiOztRQTBpQlEsTSxHQUFBLE07Ozs7Ozs7O0FDaGpCUjs7OztBQUlBLElBQUksWUFBWTtBQUNaLG9CQUFrQixDQUROO0FBRVosZUFBYSxJQUFJLElBQUo7QUFGRCxDQUFoQjs7UUFLUSxTLEdBQUEsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogZG9jdW1lbnQgcmVhZHkgYW5kIHdpbmRvdyBvbmxvYWRcclxuICogXHJcbiAqL1xyXG5pbXBvcnQge0NvbW1vblZhcn0gZnJvbSAnLi9jb21tb24vX3Zhci5qcyc7XHJcbmltcG9ydCB7VXRpbEZufSBmcm9tICcuL2NvbW1vbi9fdXRpbC5qcyc7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTtcclxuXHJcbiAgICAkKCcjdHJpZ2dlclRpcCcpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFV0aWxGbi5zZXRUaXAoJ1RJUCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI3RyaWdnZXJEaWFsb2cnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBVdGlsRm4uc2V0RGlhbG9nKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdEaWFsb2cgdGl0bGUnLFxyXG4gICAgICAgICAgICBjb250ZW50OiAnRGlhbG9nIGNvbnRlbnQnLFxyXG4gICAgICAgICAgICBpc0RvdWJsZUFjdGlvbjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoJyN0cmlnZ2VyTG9hZGluZycpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFV0aWxGbi5zZXRMb2FkaW5nKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICAgICQoJ2Zvcm0nKS5lYWNoKChpbmRleCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgkKGl0ZW0pLmF0dHIoJ2RhdGEtc3ltYm9sJyksICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCd0YWctaW5wdXQnKS5lYWNoKChpbmRleCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBVdGlsRm4uc2V0SW5wdXQoaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzX2Zvcm1TdWJtaXQnKS5lYWNoKChpbmRleCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBVdGlsRm4uc2V0U3VibWl0QnRuKGl0ZW0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KSgpXHJcbiAgICBcclxufSk7XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHt9IiwiLyoqXHJcbiAqIOW3peWFt+aWueazlVxyXG4gKiBAYXV0aG9yIENjXHJcbiAqIFxyXG4gKi9cclxuXHJcbmxldCBVdGlsRm4gPSB7XHJcbiAgICAvLyDliqjmgIHorr7nva5odG1s55qEZm9udC1zaXpl77yM55So5LqOcmVt55qE6K6h566XXHJcbiAgICBzZXRIdG1sRm9udFNpemU6IGZ1bmN0aW9uIChkb2MsIHdpbikge1xyXG4gICAgICAgIGxldCBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXHJcbiAgICAgICAgICAgIHJlc2l6ZUV2dCA9ICdvcmllbnRhdGlvbmNoYW5nZScgaW4gd2luZG93ID8gJ29yaWVudGF0aW9uY2hhbmdlJyA6ICdyZXNpemUnLFxyXG4gICAgICAgICAgICByZWNhbGMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xpZW50V2lkdGggPSBkb2NFbC5jbGllbnRXaWR0aDtcclxuICAgICAgICAgICAgICAgIGlmICghY2xpZW50V2lkdGgpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGRvY0VsLnN0eWxlLmZvbnRTaXplID0gKGNsaWVudFdpZHRoICogMC4xKSArICdweCc7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICghZG9jLmFkZEV2ZW50TGlzdGVuZXIpIHJldHVybjtcclxuICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcihyZXNpemVFdnQsIHJlY2FsYywgZmFsc2UpO1xyXG4gICAgICAgIC8vIERPTeWKoOi9veS5i+WQjuWPiui1hOa6kOWKoOi9veS5i+WJjeWOu+aJp+ihjO+8jOWNs+WvueW6lGpRdWVyeeS4reeahGRvY3VtZW50IHJlYWR5XHJcbiAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZWNhbGMsIGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+WbG9jYXRpb24gc2VhcmNo5Y+C5pWw77yM6L+U5Zue5LiA5Liqc2VhcmNo5a+56LGhXHJcbiAgICBnZXRMb2NhdGlvblNlYXJjaE9iajogZnVuY3Rpb24gKHFzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc3BsaXRVcmwgPSBxc3RyaW5nLnNwbGl0KFwiP1wiKTtcclxuICAgICAgICBsZXQgc3RyVXJsID0gKHNwbGl0VXJsLmxlbmd0aCA+IDEpID8gZGVjb2RlVVJJQ29tcG9uZW50KHNwbGl0VXJsWzFdKS5zcGxpdChcIiZcIikgOiBbXTtcclxuICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdHJVcmwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0clVybFtpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgIG9ialtzdHJbMF1dID0gc3RyWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNvcnQuY2FsbChvYmopO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDliKTmlq3njq/looNcclxuICAgIGlzaU9TOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvXFwoaVteO10rOyggVTspPyBDUFUuK01hYyBPUyBYLyk7XHJcbiAgICB9LFxyXG4gICAgaXNBbmRyaW9kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIC9hbmRyb2lkLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcbiAgICB9LFxyXG4gICAgaXNXZUNoYXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gL21pY3JvbWVzc2VuZ2VyLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcbiAgICB9LFxyXG4gICAgaXNQYzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB1c2VyQWdlbnRJbmZvID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBhZ2VudHMgPSBbXCJhbmRyb2lkXCIsIFwiaXBob25lXCIsIFwiaXBhZFwiLCBcImlwb2RcIiwgXCJzeW1iaWFub3NcIiwgXCJ3aW5kb3dzIHBob25lXCJdO1xyXG4gICAgICAgIGxldCBmbGFnID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodXNlckFnZW50SW5mby5pbmRleE9mKGFnZW50c1tpXSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmxhZztcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6YKu566x5qC85byP6aqM6K+BXHJcbiAgICBpc0VtYWlsOiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIC9eKFthLXpBLVowLTlcXC5fLV0pK0AoW2EtekEtWjAtOV8tXSkrKChcXC5bYS16QS1aMC05Xy1dKykrKSQvLnRlc3Qoc3RyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5omL5py65qC85byP6aqM6K+BOiDkuI3lsJHkuo435L2N5pWw5a2XXHJcbiAgICBpc1Bob25lVmFsaWQ6IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICByZXR1cm4gL15bMC05XXs3LH0kLy50ZXN0KHN0cik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWvhueggeagvOW8j+mqjOivgTogNy0yMOS9jeaVsOWtl+aIluiAheWtl+avjVxyXG4gICAgaXNQYXNzd29yZFZhbGlkOiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIC9eW2EtekEtWjAtOV17NywyMH0kLy50ZXN0KHN0cik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaXtumXtOaIs+i9rOaNouagvOW8j1xyXG4gICAgZGF0ZTogZnVuY3Rpb24gKHMsIGZtdCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcyA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHMgPSBOdW1iZXIocyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZtdCA9IGZtdCB8fCBcInl5eXktTU0tZGQgaGg6bW06c3NcIjtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHMpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcyA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGRhdGUgPSBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbyA9IHtcclxuICAgICAgICAgICAgXCJNK1wiOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG4gICAgICAgICAgICBcImQrXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgICAgICBcImgrXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7ZcclxuICAgICAgICAgICAgXCJtK1wiOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy/liIZcclxuICAgICAgICAgICAgXCJzK1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICAgICAgXCJxK1wiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6plxyXG4gICAgICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKC8oeSspLy50ZXN0KGZtdCkpIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiXCIpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpO1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gbykge1xyXG4gICAgICAgICAgICBpZiAobmV3IFJlZ0V4cChcIihcIiArIGsgKyBcIilcIikudGVzdChmbXQpKSBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChSZWdFeHAuJDEubGVuZ3RoID09IDEpID8gKG9ba10pIDogKChcIjAwXCIgKyBvW2tdKS5zdWJzdHIoKFwiXCIgKyBvW2tdKS5sZW5ndGgpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9rmNvb2tpZVxyXG4gICAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcclxuICAgICAgICBkYXlzID0gZGF5cyB8fCAwO1xyXG4gICAgICAgIGxldCBleHBpcmVzID0gXCJcIjtcclxuICAgICAgICBpZiAoZGF5cyAhPSAwKSB7IC8v6K6+572uY29va2ll6L+H5pyf5pe26Ze0ICBcclxuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBsZXQgbXMgPSBkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMDtcclxuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgbXMpO1xyXG4gICAgICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXlzID09IEluZmluaXR5KSB7IC8vIOiuvue9ruacgOWkp+i/h+acn+aXtumXtFxyXG4gICAgICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9RnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBHTVRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5Zjb29raWVcclxuICAgIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBsZXQgbmFtZUVRID0gbmFtZSArIFwiPVwiO1xyXG4gICAgICAgIGxldCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpOyAvL+aKimNvb2tpZeWIhuWJsuaIkOe7hCAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYyA9IGNhW2ldOyAvL+WPluW+l+Wtl+espuS4siAgXHJcbiAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSAnICcpIHsgLy/liKTmlq3kuIDkuIvlrZfnrKbkuLLmnInmsqHmnInliY3lr7znqbrmoLwgIFxyXG4gICAgICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKTsgLy/mnInnmoTor53vvIzku47nrKzkuozkvY3lvIDlp4vlj5YgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PSAwKSB7IC8v5aaC5p6c5ZCr5pyJ5oiR5Lus6KaB55qEbmFtZSAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5riF6ZmkY29va2llc1xyXG4gICAgY2xlYXJDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDb29raWUobmFtZSwgXCJcIiwgLTEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5bnibnlrppsb2NhbHN0b3JhZ2VcclxuICAgIGdldExvY2FsU3RvcmFnZTogZnVuY3Rpb24gKGtleSwgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Y675o6J57uT5bC+56m65qC8XHJcbiAgICByZW1vdmVMYXN0Qmxhbms6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8oXFxzKiQpL2csIFwiXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDorr7nva7lvLnnqpflnoLnm7TlsYXkuK1cclxuICAgIHNldFBvcHVwVmVydGljYWxNaWQ6IGZ1bmN0aW9uIChkb21PYmopIHtcclxuICAgICAgICBpZiAoJChkb21PYmopKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3B1cEhlaWdodCA9ICQoZG9tT2JqKS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgJChkb21PYmopLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAndG9wJzogKHdpbkhlaWdodCAtIHBvcHVwSGVpZ2h0KSAvIDIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJQb3B1cCBpcyBub3QgZXhpc3TvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDnlJ/miJDlvLnnqpdcclxuICAgIGFkZFBvcHVwOiBmdW5jdGlvbiAoY29udGVudCwgYkNsb3NlKSB7XHJcbiAgICAgICAgdGhpcy5kZWxQb3B1cCgpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibV9wb3B1cFwiIGlkPVwicG9wdXBcIj48ZGl2IGNsYXNzPVwibWFza1wiIGlkPVwicG9wdXBNYXNrXCI+PC9kaXY+JyArIGNvbnRlbnQgKyAnPC9kaXY+Jyk7XHJcbiAgICAgICAgaWYgKGJDbG9zZSkge1xyXG4gICAgICAgICAgICAkKCcjcG9wdXBNYXNrJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyDliKDpmaTlvLnnqpdcclxuICAgIGRlbFBvcHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3BvcHVwJykucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaPkOekulxyXG4gICAgc2V0VGlwOiBmdW5jdGlvbiAoc1RpcCwgb1BhcmFtcykge1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwid190aXAganNfdGlwXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+JyArIHNUaXAgKyAnPC9zcGFuPjwvc3Bhbj4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmpzX3RpcCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBpZiAob1BhcmFtcyAmJiBvUGFyYW1zLmNhbGxiYWNrKSBvUGFyYW1zLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSwgKG9QYXJhbXMgJiYgb1BhcmFtcy5tc2VjID8gb1BhcmFtcy5tc2VjIDogMTAwMCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDorr7nva7lhajlsYDliqDovb1cclxuICAgIHNldExvYWRpbmc6IGZ1bmN0aW9uIChzVGV4dCkge1xyXG4gICAgICAgIGxldCB0ZXh0ID0gc1RleHQgfHwgJ0xvYWRpbmcuLi4nO1xyXG4gICAgICAgIHRoaXMuYWRkUG9wdXAoJzxkaXYgY2xhc3M9XCJ3X2xvYWRpbmdcIj4nICsgdGV4dCArICc8L2Rpdj4nKTtcclxuICAgICAgICB0aGlzLnNldFBvcHVwVmVydGljYWxNaWQoJy53X2xvYWRpbmcnKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5a+56K+d5qGGXHJcbiAgICAgKiBvRGlhbG9nUGFyYW1zOiB7XHJcbiAgICAgKiAgdGl0bGU6ICAgICAgICAgICAgICBzdHJpbmcg5by556qX5qCH6aKYLFxyXG4gICAgICogIGNvbnRlbnQ6ICAgICAgICAgICAgc3RyaW5nIOW8ueeql+WGheWuuSxcclxuICAgICAqICBpc0RvdWJsZUFjdGlvbjogICAgIGJvb2xlYW4g5piv5ZCm5Lik5Liq5oyJ6ZKuLFxyXG4gICAgICogIGFjdGlvblRleHQ6ICAgICAgICAgc3RyaW5nIOWNleaMiemSruaWh+acrCxcclxuICAgICAqICBhY3Rpb25GdW5jOiAgICAgICAgIGZ1bmN0aW9uIOWNleaMiemSruaWueazlSxcclxuICAgICAqICBsZWZ0QWN0aW9uVGV4dDogICAgIHN0cmluZyDlt6bkvqfmjInpkq7mlofmnKwsXHJcbiAgICAgKiAgbGVmdEFjdGlvbkZ1bmM6ICAgICBmdW5jdGlvbiDlt6bkvqfmjInpkq7mlrnms5UsXHJcbiAgICAgKiAgbGVmdEFjdGlvblN0eWxlOiAgICBzdHJpbmcg5bem5L6n5oyJ6ZKu5qC35byPLFxyXG4gICAgICogIHJpZ2h0QWN0aW9uVGV4dDogICAgc3RyaW5nIOW3puS+p+aMiemSruaWh+acrCxcclxuICAgICAqICByaWdodEFjdGlvbkZ1bmM6ICAgIGZ1bmN0aW9uIOWPs+S+p+aMiemSruaWueazlSxcclxuICAgICAqICByaWdodEFjdGlvblN0eWxlOiAgIHN0cmluZyDlj7PkvqfmjInpkq7moLflvI8sXHJcbiAgICAgKiB9XHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc2V0RGlhbG9nOiBmdW5jdGlvbiAob0RpYWxvZ1BhcmFtcywgYkNsb3NlKSB7XHJcbiAgICAgICAgbGV0IHRpdGxlID0gb0RpYWxvZ1BhcmFtcy50aXRsZSA/IG9EaWFsb2dQYXJhbXMudGl0bGUgOiAnVGl0bGUnLFxyXG4gICAgICAgICAgICBjb250ZW50ID0gb0RpYWxvZ1BhcmFtcy5jb250ZW50LFxyXG4gICAgICAgICAgICBhY3Rpb25UZXh0ID0gb0RpYWxvZ1BhcmFtcy5hY3Rpb25UZXh0ID8gb0RpYWxvZ1BhcmFtcy5hY3Rpb25UZXh0IDogJ0dldCBpdCcsXHJcbiAgICAgICAgICAgIGxlZnRBY3Rpb25UZXh0ID0gb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uVGV4dCA/IG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblRleHQgOiAnQ2FuY2VsJyxcclxuICAgICAgICAgICAgbGVmdEFjdGlvblN0eWxlID0gb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uU3R5bGUgPyAnIHN0eWxlPVwiJyArIG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblN0eWxlICsgJ1wiJyA6ICcnLFxyXG4gICAgICAgICAgICByaWdodEFjdGlvblRleHQgPSBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uVGV4dCA/IG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25UZXh0IDogJ0NvbmZpcm0nLFxyXG4gICAgICAgICAgICByaWdodEFjdGlvblN0eWxlID0gb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvblN0eWxlID8gJyBzdHlsZT1cIicgKyBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uU3R5bGUgKyAnXCInIDogJyc7XHJcblxyXG4gICAgICAgIGxldCBBY3Rpb25UbXBsO1xyXG4gICAgICAgIGlmIChvRGlhbG9nUGFyYW1zLmlzRG91YmxlQWN0aW9uKSB7XHJcbiAgICAgICAgICAgIEFjdGlvblRtcGwgPSAnPHNlY3Rpb24gY2xhc3M9XCJmdCBmdF9Eb3VibGVcIj4nICtcclxuICAgICAgICAgICAgICAgICc8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgaWQ9XCJsZWZ0QWN0aW9uXCInICsgbGVmdEFjdGlvblN0eWxlICsgJz4nICsgbGVmdEFjdGlvblRleHQgKyAnPC9hPicgK1xyXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBpZD1cInJpZ2h0QWN0aW9uXCInICsgcmlnaHRBY3Rpb25TdHlsZSArICc+JyArIHJpZ2h0QWN0aW9uVGV4dCArICc8L2E+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9zZWN0aW9uPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgQWN0aW9uVG1wbCA9ICc8c2VjdGlvbiBjbGFzcz1cImZ0XCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGlkPVwiYWN0aW9uXCI+JyArIGFjdGlvblRleHQgKyAnPC9hPicgK1xyXG4gICAgICAgICAgICAgICAgJzwvc2VjdGlvbj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRtcGwgPSAnPGRpdiBjbGFzcz1cIm1fZGlhbG9nXCIgaWQ9XCJkaWFsb2dcIj4nICtcclxuICAgICAgICAgICAgJzxzZWN0aW9uIGNsYXNzPVwiaGRcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+JyArIHRpdGxlICsgJzxzcGFuPjwvc2VjdGlvbj4nICtcclxuICAgICAgICAgICAgJzxzZWN0aW9uIGNsYXNzPVwiYmRcIj4nICsgY29udGVudCArICc8L3NlY3Rpb24+JyArXHJcbiAgICAgICAgICAgIEFjdGlvblRtcGwgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgdGhpcy5hZGRQb3B1cCh0bXBsLCAoYkNsb3NlID8gdHJ1ZSA6IGZhbHNlKSk7XHJcbiAgICAgICAgdGhpcy5zZXRQb3B1cFZlcnRpY2FsTWlkKCcjZGlhbG9nJyk7XHJcblxyXG4gICAgICAgIC8vIOino+WGs+afkOS6m+S9juerr+ezu+e7n+WuieWNk+acuuS4i++8iOWmgm5leHVzNeOAgeWwj+exs+etie+8ie+8jOivt+axgui/lOWbnumhtemdoua4suafk+eahGJ1Z1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChzaGFyZXNkaykge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9wXCI6IE1hdGgucmFuZG9tKCkgKyBcInB4XCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJCgnI2FjdGlvbicpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIGlmIChvRGlhbG9nUGFyYW1zLmFjdGlvbkZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIG9EaWFsb2dQYXJhbXMuYWN0aW9uRnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnI2xlZnRBY3Rpb24nKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5kZWxQb3B1cCgpO1xyXG4gICAgICAgICAgICBpZiAob0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uRnVuYykge1xyXG4gICAgICAgICAgICAgICAgb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uRnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnI3JpZ2h0QWN0aW9uJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsUG9wdXAoKTtcclxuICAgICAgICAgICAgaWYgKG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25GdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uRnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rmZvcm3ooajljZXovpPlhaXmoYZcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBzZXRJbnB1dDogZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIC8vIOeUn+aIkOaooeadv1xyXG4gICAgICAgIGxldCBhdHRyT2JqID0ge1xyXG4gICAgICAgICAgICBpZDogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtaWQnKSxcclxuICAgICAgICAgICAgY2xhc3M6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLWNsYXNzJyksXHJcbiAgICAgICAgICAgIHR5cGU6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLXR5cGUnKSxcclxuICAgICAgICAgICAgdmFsdWU6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLXZhbHVlJyksXHJcbiAgICAgICAgICAgIGxhYmVsOiAkKHRhcmdldCkuYXR0cignZGF0YS1sYWJlbCcpLFxyXG4gICAgICAgICAgICBzeW1ib2w6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLXN5bWJvbCcpLCAvLyDnlKjkuo7moIforrBmb3Jt6KGo5Y2V55qE5Ye66ZSZ5L+h5oGvXHJcbiAgICAgICAgICAgIG9yZGVyOiAkKHRhcmdldCkuYXR0cignZGF0YS1vcmRlcicpLCAvLyDnlKjkuo7lhrPlrprmj5DkuqTml7blh7rplJnkv6Hmga/nmoTpobrluo/vvIwg5LuOMOW8gOWni+S4peagvOWNh+W6j+aOkuW6j++8jOaPkOekuuaVsOWAvOacgOWwj+WAvOWvueW6lOeahOWGheWuuVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGN1c3RvbVRtcGwgPSAnJyxcclxuICAgICAgICAgICAgaXNQYXNzd29yZCA9IGF0dHJPYmoudHlwZSA9PT0gJ3Bhc3N3b3JkJyAmJiAkKCcuanNfcHN3VG9nZ2xlJykubGVuZ3RoID09PSAwID8gdHJ1ZSA6IGZhbHNlOyAvLyDkuIDkuKpmb3Jt6KGo5Y2V5Y+q6IO95pyJ5LiA5Liq5a6e6ZmF55qE5a+G56CB5qGG77yM5LiN566X5a+G56CB56Gu6K6k5qGGXHJcbiAgICAgICAgaWYgKGlzUGFzc3dvcmQpIGN1c3RvbVRtcGwgPSAnPHNwYW4gY2xhc3M9XCJ3X2ljb24gd19pY29uX0V5ZUNsb3NlIGpzX3Bzd1RvZ2dsZVwiPjwvc3Bhbj4nO1xyXG4gICAgICAgIGxldCB0bXBsID0gJzxkaXYgY2xhc3M9XCJ3X2lucHV0JyArIChpc1Bhc3N3b3JkID8gJyB3X2lucHV0X1BzdycgOiAnJykgKyAnXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiJyArIGF0dHJPYmouaWQgKyAnXCIgY2xhc3M9JyArIGF0dHJPYmouY2xhc3MgKyAnIHR5cGU9JyArIGF0dHJPYmoudHlwZSArICcgdmFsdWU9XCInICsgYXR0ck9iai52YWx1ZSArICdcIiBkYXRhLW9yZGVyPScgKyBhdHRyT2JqLm9yZGVyICsgJyAvPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD4nICsgYXR0ck9iai5sYWJlbCArICc8L2xhYmVsPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgKyBjdXN0b21UbXBsICsgJ1xcXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+JztcclxuICAgICAgICAkKHRhcmdldCkuYWZ0ZXIodG1wbCkucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIC8vIOiuvue9rumUmeivr+S/oeaBr+WIsGxvY2Fsc3RvcmFnZVxyXG4gICAgICAgIGxldCBsb2NhbERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGF0dHJPYmouc3ltYm9sKSB8fCAne30nKSxcclxuICAgICAgICAgICAgZXJyb3JMaXN0ID0gKGxvY2FsRGF0YS5lcnJvciAmJiBsb2NhbERhdGEuZXJyb3IubGVuZ3RoKSA/IGxvY2FsRGF0YS5lcnJvciA6IFtdLFxyXG4gICAgICAgICAgICBlcnJvckl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogYXR0ck9iai5pZCxcclxuICAgICAgICAgICAgICAgIGNsYXNzOiBhdHRyT2JqLmNsYXNzLFxyXG4gICAgICAgICAgICAgICAgb3JkZXI6IGF0dHJPYmoub3JkZXJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBzd2l0Y2ggKGF0dHJPYmouY2xhc3MpIHtcclxuICAgICAgICAgICAgY2FzZSAnanNfaW5wdXRFbSc6IC8vIOmCrueusVxyXG4gICAgICAgICAgICAgICAgZXJyb3JJdGVtWydtc2cnXSA9IFwi6YKu566x5LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnanNfaW5wdXRQaCc6IC8vIOaJi+aculxyXG4gICAgICAgICAgICAgICAgZXJyb3JJdGVtWydtc2cnXSA9IFwi5omL5py65LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnanNfaW5wdXRQc3cnOiAvLyDlr4bnoIFcclxuICAgICAgICAgICAgICAgIGVycm9ySXRlbVsnbXNnJ10gPSBcIuWvhueggeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2pzX2lucHV0UHN3X0NvbmZpcm0nOiAvLyDnoa7orqTlr4bnoIFcclxuICAgICAgICAgICAgICAgIGVycm9ySXRlbVsnbXNnJ10gPSBcIuehruiupOWvhueggeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZXJyb3JMaXN0LnB1c2goZXJyb3JJdGVtKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShhdHRyT2JqLnN5bWJvbCwgSlNPTi5zdHJpbmdpZnkoe1wiZXJyb3JcIjogZXJyb3JMaXN0LCBcImlucHV0Qmx1clwiOiBcImZhbHNlXCJ9KSk7XHJcblxyXG4gICAgICAgIC8vIOiBmueEpuOAgei+k+WFpeOAgeWkseeEpuWkhOeQhlxyXG4gICAgICAgICQoJy4nICsgYXR0ck9iai5jbGFzcykuYmluZCgnZm9jdXMnLCBmdW5jdGlvbigpIHsgLy8g6IGa54Sm77yM5aSE55CG5qC35byPXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnd19pbnB1dF9XYXJuIHdfaW5wdXRfVmFsaWQnKS5hZGRDbGFzcygnd19pbnB1dF9BY3RpdmUnKTtcclxuICAgICAgICB9KS5iaW5kKCdrZXl1cCcsIGZ1bmN0aW9uKCkgeyAvLyDovpPlhaXvvIzlpITnkIbmoLflvI/jgIHliKDpmaTmjInpkq5cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpLFxyXG4gICAgICAgICAgICAgICAgJGRlbCA9ICRwYXJlbnQuY2hpbGRyZW4oJy5qc19pbnB1dERlbCcpO1xyXG4gICAgICAgICAgICBpZiAoJGRlbCkge1xyXG4gICAgICAgICAgICAgICAgJGRlbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS52YWwoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBkZWxUZW1wID0gJzxzcGFuIGNsYXNzPVwid19pY29uIHdfaWNvbl9JbnB1dERlbCBqc19pbnB1dERlbFwiPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAkcGFyZW50LmFwcGVuZChkZWxUZW1wKTtcclxuICAgICAgICAgICAgJGRlbCA9ICRwYXJlbnQuY2hpbGRyZW4oJy5qc19pbnB1dERlbCcpO1xyXG4gICAgICAgICAgICAkZGVsLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICQoJy5qc190aXAnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICQodGhhdCkudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuYmluZCgnYmx1cicsIGZ1bmN0aW9uKCkgeyAvLyDlpLHnhKbvvIzlpITnkIbmoLflvI/jgIHplJnor6/mj5DnpLpcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCd3X2lucHV0X0FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgLy8g5YaF5a655LiN56ym5ZCI5p2h5Lu2XHJcbiAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ3dfaW5wdXRfV2FybicpO1xyXG4gICAgICAgICAgICBsZXQgb1RhcmdldCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBiVmFsaWQsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1zZztcclxuICAgICAgICAgICAgc3dpdGNoICgkKHRoaXMpLmF0dHIoJ2NsYXNzJykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2pzX2lucHV0RW0nOiAvLyDpgq7nrrFcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW1WYWwgPSBVdGlsRm4ucmVtb3ZlTGFzdEJsYW5rKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbEZuLmlzRW1haWwoZW1WYWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gdmFsdWUgPT09ICcnID8gJ+mCrueuseS4jeiDveS4uuepuicgOiAn6YKu566x5qC85byP6ZSZ6K+v77yM6K+36YeN5paw6L6T5YWlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc19pbnB1dFBoJzogLy8g5omL5py6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxGbi5pc1Bob25lVmFsaWQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gdmFsdWUgPT09ICcnID8gJ+aJi+acuuS4jeiDveS4uuepuicgOiAn5omL5py65qC85byP6ZSZ6K+v77yM6K+36YeN5paw6L6T5YWlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc19pbnB1dFBzdyc6IC8vIOWvhueggVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsRm4uaXNQYXNzd29yZFZhbGlkKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsRm4udXBkYXRlRm9ybUVycm9yKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5bWJvbDogYXR0ck9iai5zeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG9UYXJnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWGheWuueespuWQiOadoeS7tlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCd3X2lucHV0X1dhcm4nKS5hZGRDbGFzcygnd19pbnB1dF9WYWxpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6IGU5Yqo5qOA5p+l56Gu6K6k5a+G56CBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dFBzd0NvbmZpcm0gPSAnLmpzX2lucHV0UHN3X0NvbmZpcm0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHN3Q29uZmlybVZhbCA9ICQoaW5wdXRQc3dDb25maXJtKS52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb25maXJtUGFyZW50ID0gJChpbnB1dFBzd0NvbmZpcm0pLnBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHN3Q29uZmlybVZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5qOA5p+l5a+56LGh6LCD5pW05Li66IGU5Yqo5a+56LGhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvVGFyZ2V0ID0gaW5wdXRQc3dDb25maXJtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBzd0NvbmZpcm1WYWwgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbmZpcm1QYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybicpLmFkZENsYXNzKCd3X2lucHV0X1ZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb25maXJtUGFyZW50LnJlbW92ZUNsYXNzKCd3X2lucHV0X1ZhbGlkJykuYWRkQ2xhc3MoJ3dfaW5wdXRfV2FybicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gJ+S4pOasoeWvhueggeS4jeS4gOiHtCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9iai5pZCA9ICQob1RhcmdldCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyT2JqLmNsYXNzID0gJChvVGFyZ2V0KS5hdHRyKCdjbGFzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmoub3JkZXIgPSAkKG9UYXJnZXQpLmF0dHIoJ2RhdGEtb3JkZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9IHZhbHVlID09PSAnJyA/ICflr4bnoIHkuI3og73kuLrnqbonIDogJ+WvhueggeagvOW8j+mUmeivr++8jOivt+mHjeaWsOi+k+WFpSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmouaWQgPSAkKG9UYXJnZXQpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmouY2xhc3MgPSAkKG9UYXJnZXQpLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmoub3JkZXIgPSAkKG9UYXJnZXQpLmF0dHIoJ2RhdGEtb3JkZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc19pbnB1dFBzd19Db25maXJtJzogLy8g56Gu6K6k5a+G56CBXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAkKCcuanNfaW5wdXRQc3cnKS52YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9ICfkuKTmrKHlr4bnoIHkuI3kuIDoh7QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxGbi51cGRhdGVGb3JtRXJyb3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIGJWYWxpZCxcclxuICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IGF0dHJPYmouc3ltYm9sLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogb1RhcmdldFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBVdGlsRm4udXBkYXRlRm9ybUVycm9yKHtcclxuICAgICAgICAgICAgICAgICAgICBiVmFsaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBhdHRyT2JqLnN5bWJvbCxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG9UYXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGF0dHJPYmouaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IGF0dHJPYmouY2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXI6IGF0dHJPYmoub3JkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXNnOiBlcnJvck1zZ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbEZuLnNldFRpcChlcnJvck1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOWGheWuueespuWQiOadoeS7tlxyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCd3X2lucHV0X1dhcm4nKS5hZGRDbGFzcygnd19pbnB1dF9WYWxpZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlr4bnoIHmmL7pmpDlpITnkIZcclxuICAgICAgICBpZiAoaXNQYXNzd29yZCkge1xyXG4gICAgICAgICAgICAkKCcuanNfcHN3VG9nZ2xlJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnRzKCdmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnd19pY29uX0V5ZUNsb3NlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCd3X2ljb25fRXllQ2xvc2UnKS5hZGRDbGFzcygnd19pY29uX0V5ZU9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1wc3d0b2dnbGVcIjogXCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnd19pY29uX0V5ZU9wZW4nKS5hZGRDbGFzcygnd19pY29uX0V5ZUNsb3NlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXVtkYXRhLXBzd3RvZ2dsZT1cInRydWVcIl0nKS5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8g5pu05pawbG9jYWxzdG9yYWdl6YeM55qE6ZSZ6K+v5L+h5oGv77yM55So5LqO5o+Q5Lqk5pe25qOA5p+l5L2/55SoXHJcbiAgICB1cGRhdGVGb3JtRXJyb3I6IGZ1bmN0aW9uIChvUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IGJWYWxpZCA9IG9QYXJhbXMuYlZhbGlkLFxyXG4gICAgICAgICAgICBmb3JtU3ltYm9sID0gb1BhcmFtcy5zeW1ib2wsXHJcbiAgICAgICAgICAgIHRhcmdldCA9IG9QYXJhbXMudGFyZ2V0LFxyXG4gICAgICAgICAgICBpZCA9IG9QYXJhbXMuaWQsXHJcbiAgICAgICAgICAgIGNscyA9IG9QYXJhbXMuY2xhc3MsXHJcbiAgICAgICAgICAgIG9yZGVyID0gb1BhcmFtcy5vcmRlcixcclxuICAgICAgICAgICAgbXNnID0gb1BhcmFtcy5tc2c7XHJcblxyXG4gICAgICAgIGxldCBsb2NhbERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGZvcm1TeW1ib2wpKSxcclxuICAgICAgICAgICAgZXJyb3JMaXN0ID0gbG9jYWxEYXRhLmVycm9yLmxlbmd0aCA/IGxvY2FsRGF0YS5lcnJvciA6IFtdLFxyXG4gICAgICAgICAgICBiVXBkYXRlID0gZmFsc2U7IC8vIOWIpOaWreaYr+WQpuabtOaWsOmUmeivr+S/oeaBr1xyXG5cclxuICAgICAgICBlcnJvckxpc3QuZXZlcnkoKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3MgPT09ICQodGFyZ2V0KS5hdHRyKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICBiVXBkYXRlID0gdHJ1ZTsgLy8g5bey5pyJ6ZSZ6K+v5L+h5oGv77yM5YiZ5pu05pawXHJcbiAgICAgICAgICAgICAgICBiVmFsaWQgPyBhcnIuc3BsaWNlKGluZGV4LCAxKSA6IGl0ZW0ubXNnID0gbXNnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyDnu4jmraLlvqrnjq9cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyDnu6fnu63lvqrnjq9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOacquaciemUmeivr+S/oeaBr+S4lOmqjOivgeaciemUme+8jOWImea3u+WKoFxyXG4gICAgICAgIGlmICghYlVwZGF0ZSAmJiAhYlZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlcnJvckl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIGNsYXNzOiBjbHMsXHJcbiAgICAgICAgICAgICAgICBvcmRlcixcclxuICAgICAgICAgICAgICAgIG1zZ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8g6K6+572u5o+Q56S65o6S5bqPXHJcbiAgICAgICAgICAgIC8vIOS7jjDlvIDlp4vkuKXmoLzmjInnhafljYfluo/mjpLluo/vvIzov5nml7ZvcmRlcuWPquiDveWwj+S6juaIluetieS6jmVycm9yTGlzdC5sZW5ndGhcclxuICAgICAgICAgICAgaWYgKE51bWJlcihvcmRlcikgPj0gZXJyb3JMaXN0Lmxlbmd0aCkgeyAvLyDmt7vliqDliLDmlbDnu4Tnu5PlsL5cclxuICAgICAgICAgICAgICAgIGVycm9yTGlzdC5wdXNoKGVycm9ySXRlbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIOa3u+WKoOWIsOaMh+WumuS9jee9rlxyXG4gICAgICAgICAgICAgICAgbGV0IGFmdGVySW5kZXg7XHJcbiAgICAgICAgICAgICAgICBlcnJvckxpc3QuZXZlcnkoKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKG9yZGVyKSArIDEgPT09IE51bWJlcihpdGVtLm9yZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8g57uI5q2i5b6q546vXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIOe7p+e7reW+queOr1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JMaXN0LnNwbGljZShhZnRlckluZGV4LCAwLCBlcnJvckl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShmb3JtU3ltYm9sLCBKU09OLnN0cmluZ2lmeSh7XCJlcnJvclwiOiBlcnJvckxpc3QsIFwiaW5wdXRCbHVyXCI6IChiVmFsaWQgPyBcImZhbHNlXCIgOiBcInRydWVcIil9KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oZm9ybVN5bWJvbCkpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5mb3Jt6KGo5Y2V5o+Q5Lqk5oyJ6ZKuXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc2V0U3VibWl0QnRuOiBmdW5jdGlvbiAodGFyZ2V0LCB2YWxpZENhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGF0dHJPYmogPSB7XHJcbiAgICAgICAgICAgIHN5bWJvbDogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtc3ltYm9sJyksIC8vIOeUqOS6juagh+iusGZvcm3ooajljZXnmoTlh7rplJnkv6Hmga9cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKHRhcmdldCkuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50cygnZm9ybScpLmZpbmQoJ2lucHV0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybicpOyAvLyDph43nva7ooajljZXlhoXovpPlhaXmoYbnmoTplJnor6/moLflvI9cclxuICAgICAgICAgICAgbGV0IGxvY2FsRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYXR0ck9iai5zeW1ib2wpKSxcclxuICAgICAgICAgICAgICAgIGVycm9yTGlzdCA9IGxvY2FsRGF0YS5lcnJvci5sZW5ndGggPyBsb2NhbERhdGEuZXJyb3IgOiBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvckxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvckxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIGl0ZW0uaWQpLnBhcmVudCgpLmFkZENsYXNzKCd3X2lucHV0X1dhcm4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2NhbERhdGEuaW5wdXRCbHVyID09PSAndHJ1ZScpIHsgLy8g6L6T5YWl5qGG5aSx54Sm77yM5o+Q56S66Ieq6Lqr6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYXRhLmlucHV0Qmx1ciA9ICdmYWxzZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYXR0ck9iai5zeW1ib2wsIEpTT04uc3RyaW5naWZ5KGxvY2FsRGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8g6Z2e6L6T5YWl5qGG5aSx54Sm77yM5o+Q56S66auY5LyY5YWI57qn6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbEZuLnNldFRpcChlcnJvckxpc3RbMF0ubXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ajgOafpemAmui/h+WbnuiwgycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtVdGlsRm59OyIsIi8qKlxuICog5YWo5bGA5Y+Y6YeP6YWN572uXG4gKiBcbiAqL1xubGV0IENvbW1vblZhciA9IHtcbiAgICBsaXN0Q29udGVudFdpZHRoOiAwLFxuICAgIGN1cnJlbnRUaW1lOiBuZXcgRGF0ZSgpLFxufVxuXG5leHBvcnQge0NvbW1vblZhcn07Il19
