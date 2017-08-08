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
exports.UtilFn = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * 工具方法
                                                                                                                                                                                                                                                                               * @author Cc
                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                               */


var _var = require('./_var.js');

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
            symbol: $(target).parents('form').attr('data-symbol'), // 用于标记form表单的出错信息
            order: $(target).attr('data-order') // 用于决定提交时出错信息的顺序， 一般按结构升序排序，提示数值最小值对应的内容
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

        // 设置form信息到localstorage
        var localData = JSON.parse(localStorage.getItem(attrObj.symbol) || '{}'),
            errorList = localData.error && localData.error.length ? localData.error : [],
            errorItem = {
            id: attrObj.id,
            class: attrObj.class,
            order: attrObj.order
        },
            errorMsg = {
            'js_inputEm': _var.CommonVar.formError.email.empty,
            'js_inputPh': _var.CommonVar.formError.phone.empty,
            'js_inputPsw': _var.CommonVar.formError.password.empty,
            'js_inputPsw_Confirm': _var.CommonVar.formError.passwordConfirm.empty
        };
        errorItem['msg'] = errorMsg[attrObj.class];
        UtilFn.updateFormLSError(errorList, errorItem);
        localData.error = errorList; // 错误信息集合，用于提交时提示
        localData.inputBlur = "false"; // 失焦判定，用于提交时决定提示触发
        localData.inputIds ? localData.inputIds.push(attrObj.id) : localData.inputIds = [attrObj.id]; // 输入框id，用于无错误时提交获取填写内容
        localStorage.setItem(attrObj.symbol, JSON.stringify(localData));

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
                        errorMsg = value === '' ? _var.CommonVar.formError.email.empty : _var.CommonVar.formError.email.format;
                    }
                    break;
                case 'js_inputPh':
                    // 手机
                    if (UtilFn.isPhoneValid(value)) {
                        bValid = true;
                    } else {
                        bValid = false;
                        errorMsg = value === '' ? _var.CommonVar.formError.phone.empty : _var.CommonVar.formError.phone.empty;
                    }
                    break;
                case 'js_inputPsw':
                    // 密码
                    if (UtilFn.isPasswordValid(value)) {
                        bValid = true;
                        UtilFn.updateFormLS({
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
                                errorMsg = _var.CommonVar.formError.passwordConfirm.format;
                                // attrObj 为组件级别变量，因为检查对象有变化，所以对应的属性值也要对应变化
                                attrObj.id = $(oTarget).attr('id');
                                attrObj.class = $(oTarget).attr('class');
                                attrObj.order = $(oTarget).attr('data-order');
                            }
                        }
                    } else {
                        bValid = false;
                        errorMsg = value === '' ? _var.CommonVar.formError.password.empty : _var.CommonVar.formError.password.format;
                        // attrObj 为组件级别变量，因为检查对象有变化，所以对应的属性值也要对应变化
                        attrObj.id = $(oTarget).attr('id');
                        attrObj.class = $(oTarget).attr('class');
                        attrObj.order = $(oTarget).attr('data-order');
                    }
                    break;
                case 'js_inputPsw_Confirm':
                    // 确认密码
                    if (value !== '' && value === $('.js_inputPsw').val()) {
                        bValid = true;
                    } else {
                        bValid = false;
                        errorMsg = value === '' ? _var.CommonVar.formError.passwordConfirm.empty : _var.CommonVar.formError.passwordConfirm.format;
                    }
                    break;
                default:
                    break;
            }

            if (bValid) {
                UtilFn.updateFormLS({
                    bValid: bValid,
                    symbol: attrObj.symbol,
                    target: oTarget
                });
            } else {
                UtilFn.updateFormLS({
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
    // 更新localstorage里的form表单信息，用于提交时检查使用
    updateFormLS: function updateFormLS(oParams) {
        var bValid = oParams.bValid,
            symbol = oParams.symbol,
            target = oParams.target,
            id = oParams.id,
            cls = oParams.class,
            order = oParams.order,
            msg = oParams.msg;

        var localData = JSON.parse(localStorage.getItem(symbol)),
            errorList = localData.error.length ? localData.error : [],
            bUpdate = false; // 判断是否更新错误信息

        errorList.every(function (item, index, arr) {
            if (item.class === $(target).attr('class')) {
                bUpdate = true; // 已有错误信息，则更新
                bValid ? arr.splice(index, 1) : item.msg = msg;
                return false; // 终止循环
            }
            return true; // 继续循环
        });
        // 未有错误信息且验证有错，则添加
        if (!bUpdate && !bValid) {
            var errorItem = {
                id: id,
                class: cls,
                order: order,
                msg: msg
            };
            UtilFn.updateFormLSError(errorList, errorItem);
        }

        localData.error = errorList;
        localData.inputBlur = bValid ? "false" : "true";
        localStorage.setItem(symbol, JSON.stringify(localData));
        console.log(localStorage.getItem(symbol));
    },
    // 更新localstorage里的form表单错误信息
    updateFormLSError: function updateFormLSError(errorList, errorItem) {
        if (errorList.length) {
            errorList.every(function (item, index, arr) {
                if (Number(errorItem.order) < Number(item.order)) {
                    arr.splice(index, 0, errorItem);
                    return false;
                } else if (index + 1 === arr.length) {
                    arr.push(errorItem);
                }
                return true;
            });
        } else {
            errorList.push(errorItem);
        }
    },

    /**
     * 设置form表单提交按钮
     * 
     */
    setSubmitBtn: function setSubmitBtn(target, validCallback) {
        var symbol = $(target).parents('form').attr('data-symbol');
        $(target).bind('click', function () {
            $(this).parents('form').find('input').parent().removeClass('w_input_Warn'); // 重置表单内输入框的错误样式
            var localData = JSON.parse(localStorage.getItem(symbol)),
                errorList = localData.error.length ? localData.error : [];

            if (errorList.length) {
                errorList.forEach(function (item, index) {
                    $('#' + item.id).parent().addClass('w_input_Warn');
                });

                if (localData.inputBlur === 'true') {
                    // 输入框失焦，提示自身错误
                    localData.inputBlur = 'false';
                    localStorage.setItem(symbol, JSON.stringify(localData));
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

},{"./_var.js":3}],3:[function(require,module,exports){
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
    currentTime: new Date(),
    formError: {
        email: {
            empty: "邮箱不能为空",
            format: "邮箱格式不正确"
        },
        phone: {
            empty: "手机不能为空",
            format: "手机格式不正确"
        },
        password: {
            empty: "密码不能为空",
            format: "密码格式不正确"
        },
        passwordConfirm: {
            empty: "确认密码不能为空",
            format: "密码前后不一致"
        }
    }
};

exports.CommonVar = CommonVar;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2pzL21vZHVsZS9fZGVtby5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdXRpbC5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNJQTs7QUFDQTs7QUFMQTs7OztBQU9BLEVBQUUsWUFBVztBQUNULGNBQVUsTUFBVixDQUFpQixTQUFTLElBQTFCOztBQUVBLE1BQUUsYUFBRixFQUFpQixJQUFqQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQ3ZDLHFCQUFPLE1BQVAsQ0FBYyxLQUFkO0FBQ0gsS0FGRDs7QUFJQSxNQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLFlBQVk7QUFDMUMscUJBQU8sU0FBUCxDQUFpQjtBQUNiLG1CQUFPLGNBRE07QUFFYixxQkFBUyxnQkFGSTtBQUdiLDRCQUFnQjtBQUhILFNBQWpCO0FBS0gsS0FORDs7QUFRQSxNQUFFLGlCQUFGLEVBQXFCLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVk7QUFDM0MscUJBQU8sVUFBUDtBQUNILEtBRkQ7O0FBSUEsS0FBQyxZQUFNO0FBQ0gsVUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDNUIseUJBQWEsT0FBYixDQUFxQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsYUFBYixDQUFyQixFQUFrRCxFQUFsRDtBQUNILFNBRkQ7QUFHQSxVQUFFLFdBQUYsRUFBZSxJQUFmLENBQW9CLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDakMseUJBQU8sUUFBUCxDQUFnQixJQUFoQjtBQUNILFNBRkQ7QUFHQSxVQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDdEMseUJBQU8sWUFBUCxDQUFv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QUdPO0FBQUU7QUFDTCwyQkFBTyxNQUFQLENBQWMsVUFBVSxDQUFWLEVBQWEsR0FBM0I7QUFDSDtBQUNEO0FBQ0g7O0FBRUQsb0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDSCxTQXBCRDtBQXFCSDs7QUFoaUJRLENBQWI7O1FBb2lCUSxNLEdBQUEsTTs7Ozs7Ozs7QUMzaUJSOzs7O0FBSUEsSUFBSSxZQUFZO0FBQ1osc0JBQWtCLENBRE47QUFFWixpQkFBYSxJQUFJLElBQUosRUFGRDtBQUdaLGVBQVc7QUFDUCxlQUFPO0FBQ0gsbUJBQU8sUUFESjtBQUVILG9CQUFRO0FBRkwsU0FEQTtBQUtQLGVBQU87QUFDSCxtQkFBTyxRQURKO0FBRUgsb0JBQVE7QUFGTCxTQUxBO0FBU1Asa0JBQVU7QUFDTixtQkFBTyxRQUREO0FBRU4sb0JBQVE7QUFGRixTQVRIO0FBYVAseUJBQWlCO0FBQ2IsbUJBQU8sVUFETTtBQUViLG9CQUFRO0FBRks7QUFiVjtBQUhDLENBQWhCOztRQXVCUSxTLEdBQUEsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogZG9jdW1lbnQgcmVhZHkgYW5kIHdpbmRvdyBvbmxvYWRcclxuICogXHJcbiAqL1xyXG5pbXBvcnQge0NvbW1vblZhcn0gZnJvbSAnLi9jb21tb24vX3Zhci5qcyc7XHJcbmltcG9ydCB7VXRpbEZufSBmcm9tICcuL2NvbW1vbi9fdXRpbC5qcyc7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTtcclxuXHJcbiAgICAkKCcjdHJpZ2dlclRpcCcpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFV0aWxGbi5zZXRUaXAoJ1RJUCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI3RyaWdnZXJEaWFsb2cnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBVdGlsRm4uc2V0RGlhbG9nKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdEaWFsb2cgdGl0bGUnLFxyXG4gICAgICAgICAgICBjb250ZW50OiAnRGlhbG9nIGNvbnRlbnQnLFxyXG4gICAgICAgICAgICBpc0RvdWJsZUFjdGlvbjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoJyN0cmlnZ2VyTG9hZGluZycpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFV0aWxGbi5zZXRMb2FkaW5nKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICAgICQoJ2Zvcm0nKS5lYWNoKChpbmRleCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgkKGl0ZW0pLmF0dHIoJ2RhdGEtc3ltYm9sJyksICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCd0YWctaW5wdXQnKS5lYWNoKChpbmRleCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBVdGlsRm4uc2V0SW5wdXQoaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzX2Zvcm1TdWJtaXQnKS5lYWNoKChpbmRleCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBVdGlsRm4uc2V0U3VibWl0QnRuKGl0ZW0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KSgpXHJcbiAgICBcclxufSk7XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHt9IiwiLyoqXHJcbiAqIOW3peWFt+aWueazlVxyXG4gKiBAYXV0aG9yIENjXHJcbiAqIFxyXG4gKi9cclxuaW1wb3J0IHtDb21tb25WYXJ9IGZyb20gJy4vX3Zhci5qcyc7XHJcblxyXG5sZXQgVXRpbEZuID0ge1xyXG4gICAgLy8g5Yqo5oCB6K6+572uaHRtbOeahGZvbnQtc2l6Ze+8jOeUqOS6jnJlbeeahOiuoeeul1xyXG4gICAgc2V0SHRtbEZvbnRTaXplOiBmdW5jdGlvbiAoZG9jLCB3aW4pIHtcclxuICAgICAgICBsZXQgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxyXG4gICAgICAgICAgICByZXNpemVFdnQgPSAnb3JpZW50YXRpb25jaGFuZ2UnIGluIHdpbmRvdyA/ICdvcmllbnRhdGlvbmNoYW5nZScgOiAncmVzaXplJyxcclxuICAgICAgICAgICAgcmVjYWxjID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsaWVudFdpZHRoID0gZG9jRWwuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNsaWVudFdpZHRoKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBkb2NFbC5zdHlsZS5mb250U2l6ZSA9IChjbGllbnRXaWR0aCAqIDAuMSkgKyAncHgnO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIWRvYy5hZGRFdmVudExpc3RlbmVyKSByZXR1cm47XHJcbiAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIocmVzaXplRXZ0LCByZWNhbGMsIGZhbHNlKTtcclxuICAgICAgICAvLyBET03liqDovb3kuYvlkI7lj4rotYTmupDliqDovb3kuYvliY3ljrvmiafooYzvvIzljbPlr7nlupRqUXVlcnnkuK3nmoRkb2N1bWVudCByZWFkeVxyXG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcmVjYWxjLCBmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPlmxvY2F0aW9uIHNlYXJjaOWPguaVsO+8jOi/lOWbnuS4gOS4qnNlYXJjaOWvueixoVxyXG4gICAgZ2V0TG9jYXRpb25TZWFyY2hPYmo6IGZ1bmN0aW9uIChxc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNwbGl0VXJsID0gcXN0cmluZy5zcGxpdChcIj9cIik7XHJcbiAgICAgICAgbGV0IHN0clVybCA9IChzcGxpdFVybC5sZW5ndGggPiAxKSA/IGRlY29kZVVSSUNvbXBvbmVudChzcGxpdFVybFsxXSkuc3BsaXQoXCImXCIpIDogW107XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc3RyVXJsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHJVcmxbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBvYmpbc3RyWzBdXSA9IHN0clsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zb3J0LmNhbGwob2JqKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Yik5pat546v5aKDXHJcbiAgICBpc2lPUzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1xcKGlbXjtdKzsoIFU7KT8gQ1BVLitNYWMgT1MgWC8pO1xyXG4gICAgfSxcclxuICAgIGlzQW5kcmlvZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAvYW5kcm9pZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfSxcclxuICAgIGlzV2VDaGF0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIC9taWNyb21lc3Nlbmdlci8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfSxcclxuICAgIGlzUGM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdXNlckFnZW50SW5mbyA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgYWdlbnRzID0gW1wiYW5kcm9pZFwiLCBcImlwaG9uZVwiLCBcImlwYWRcIiwgXCJpcG9kXCIsIFwic3ltYmlhbm9zXCIsIFwid2luZG93cyBwaG9uZVwiXTtcclxuICAgICAgICBsZXQgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHVzZXJBZ2VudEluZm8uaW5kZXhPZihhZ2VudHNbaV0pID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOmCrueuseagvOW8j+mqjOivgVxyXG4gICAgaXNFbWFpbDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiAvXihbYS16QS1aMC05XFwuXy1dKStAKFthLXpBLVowLTlfLV0pKygoXFwuW2EtekEtWjAtOV8tXSspKykkLy50ZXN0KHN0cik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaJi+acuuagvOW8j+mqjOivgTog5LiN5bCR5LqON+S9jeaVsOWtl1xyXG4gICAgaXNQaG9uZVZhbGlkOiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIC9eWzAtOV17Nyx9JC8udGVzdChzdHIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDlr4bnoIHmoLzlvI/pqozor4E6IDctMjDkvY3mlbDlrZfmiJbogIXlrZfmr41cclxuICAgIGlzUGFzc3dvcmRWYWxpZDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiAvXlthLXpBLVowLTldezcsMjB9JC8udGVzdChzdHIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDml7bpl7TmiLPovazmjaLmoLzlvI9cclxuICAgIGRhdGU6IGZ1bmN0aW9uIChzLCBmbXQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHMgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBzID0gTnVtYmVyKHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmbXQgPSBmbXQgfHwgXCJ5eXl5LU1NLWRkIGhoOm1tOnNzXCI7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHMgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBkYXRlID0gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG8gPSB7XHJcbiAgICAgICAgICAgIFwiTStcIjogZGF0ZS5nZXRNb250aCgpICsgMSwgLy/mnIjku71cclxuICAgICAgICAgICAgXCJkK1wiOiBkYXRlLmdldERhdGUoKSwgLy/ml6VcclxuICAgICAgICAgICAgXCJoK1wiOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcbiAgICAgICAgICAgIFwibStcIjogZGF0ZS5nZXRNaW51dGVzKCksIC8v5YiGXHJcbiAgICAgICAgICAgIFwicytcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSXHJcbiAgICAgICAgICAgIFwicStcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuICAgICAgICAgICAgXCJTXCI6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICgvKHkrKS8udGVzdChmbXQpKSBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcclxuICAgICAgICBmb3IgKGxldCBrIGluIG8pIHtcclxuICAgICAgICAgICAgaWYgKG5ldyBSZWdFeHAoXCIoXCIgKyBrICsgXCIpXCIpLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aCA9PSAxKSA/IChvW2tdKSA6ICgoXCIwMFwiICsgb1trXSkuc3Vic3RyKChcIlwiICsgb1trXSkubGVuZ3RoKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm10O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDorr7nva5jb29raWVcclxuICAgIHNldENvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XHJcbiAgICAgICAgZGF5cyA9IGRheXMgfHwgMDtcclxuICAgICAgICBsZXQgZXhwaXJlcyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGRheXMgIT0gMCkgeyAvL+iuvue9rmNvb2tpZei/h+acn+aXtumXtCAgXHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgbGV0IG1zID0gZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIG1zKTtcclxuICAgICAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF5cyA9PSBJbmZpbml0eSkgeyAvLyDorr7nva7mnIDlpKfov4fmnJ/ml7bpl7RcclxuICAgICAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+WY29va2llXHJcbiAgICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgbGV0IG5hbWVFUSA9IG5hbWUgKyBcIj1cIjtcclxuICAgICAgICBsZXQgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTsgLy/miopjb29raWXliIblibLmiJDnu4QgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSBjYVtpXTsgLy/lj5blvpflrZfnrKbkuLIgIFxyXG4gICAgICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSB7IC8v5Yik5pat5LiA5LiL5a2X56ym5Liy5pyJ5rKh5pyJ5YmN5a+856m65qC8ICBcclxuICAgICAgICAgICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCk7IC8v5pyJ55qE6K+d77yM5LuO56ys5LqM5L2N5byA5aeL5Y+WICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT0gMCkgeyAvL+WmguaenOWQq+acieaIkeS7rOimgeeahG5hbWUgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOa4hemZpGNvb2tpZXNcclxuICAgIGNsZWFyQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuc2V0Q29va2llKG5hbWUsIFwiXCIsIC0xKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+W54m55a6abG9jYWxzdG9yYWdlXHJcbiAgICBnZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uIChrZXksIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWOu+aOiee7k+WwvuepuuagvFxyXG4gICAgcmVtb3ZlTGFzdEJsYW5rOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKFxccyokKS9nLCBcIlwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572u5by556qX5Z6C55u05bGF5LitXHJcbiAgICBzZXRQb3B1cFZlcnRpY2FsTWlkOiBmdW5jdGlvbiAoZG9tT2JqKSB7XHJcbiAgICAgICAgaWYgKCQoZG9tT2JqKSkge1xyXG4gICAgICAgICAgICBsZXQgcG9wdXBIZWlnaHQgPSAkKGRvbU9iaikuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICB3aW5IZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICQoZG9tT2JqKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCc6ICh3aW5IZWlnaHQgLSBwb3B1cEhlaWdodCkgLyAyLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiUG9wdXAgaXMgbm90IGV4aXN077yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g55Sf5oiQ5by556qXXHJcbiAgICBhZGRQb3B1cDogZnVuY3Rpb24gKGNvbnRlbnQsIGJDbG9zZSkge1xyXG4gICAgICAgIHRoaXMuZGVsUG9wdXAoKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1fcG9wdXBcIiBpZD1cInBvcHVwXCI+PGRpdiBjbGFzcz1cIm1hc2tcIiBpZD1cInBvcHVwTWFza1wiPjwvZGl2PicgKyBjb250ZW50ICsgJzwvZGl2PicpO1xyXG4gICAgICAgIGlmIChiQ2xvc2UpIHtcclxuICAgICAgICAgICAgJCgnI3BvcHVwTWFzaycpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWxQb3B1cCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8g5Yig6Zmk5by556qXXHJcbiAgICBkZWxQb3B1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyNwb3B1cCcpLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmj5DnpLpcclxuICAgIHNldFRpcDogZnVuY3Rpb24gKHNUaXAsIG9QYXJhbXMpIHtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8c3BhbiBjbGFzcz1cIndfdGlwIGpzX3RpcFwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPicgKyBzVGlwICsgJzwvc3Bhbj48L3NwYW4+Jyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5qc190aXAnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgaWYgKG9QYXJhbXMgJiYgb1BhcmFtcy5jYWxsYmFjaykgb1BhcmFtcy5jYWxsYmFjaygpO1xyXG4gICAgICAgIH0sIChvUGFyYW1zICYmIG9QYXJhbXMubXNlYyA/IG9QYXJhbXMubXNlYyA6IDEwMDApKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572u5YWo5bGA5Yqg6L29XHJcbiAgICBzZXRMb2FkaW5nOiBmdW5jdGlvbiAoc1RleHQpIHtcclxuICAgICAgICBsZXQgdGV4dCA9IHNUZXh0IHx8ICdMb2FkaW5nLi4uJztcclxuICAgICAgICB0aGlzLmFkZFBvcHVwKCc8ZGl2IGNsYXNzPVwid19sb2FkaW5nXCI+JyArIHRleHQgKyAnPC9kaXY+Jyk7XHJcbiAgICAgICAgdGhpcy5zZXRQb3B1cFZlcnRpY2FsTWlkKCcud19sb2FkaW5nJyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWvueivneahhlxyXG4gICAgICogb0RpYWxvZ1BhcmFtczoge1xyXG4gICAgICogIHRpdGxlOiAgICAgICAgICAgICAgc3RyaW5nIOW8ueeql+agh+mimCxcclxuICAgICAqICBjb250ZW50OiAgICAgICAgICAgIHN0cmluZyDlvLnnqpflhoXlrrksXHJcbiAgICAgKiAgaXNEb3VibGVBY3Rpb246ICAgICBib29sZWFuIOaYr+WQpuS4pOS4quaMiemSrixcclxuICAgICAqICBhY3Rpb25UZXh0OiAgICAgICAgIHN0cmluZyDljZXmjInpkq7mlofmnKwsXHJcbiAgICAgKiAgYWN0aW9uRnVuYzogICAgICAgICBmdW5jdGlvbiDljZXmjInpkq7mlrnms5UsXHJcbiAgICAgKiAgbGVmdEFjdGlvblRleHQ6ICAgICBzdHJpbmcg5bem5L6n5oyJ6ZKu5paH5pysLFxyXG4gICAgICogIGxlZnRBY3Rpb25GdW5jOiAgICAgZnVuY3Rpb24g5bem5L6n5oyJ6ZKu5pa55rOVLFxyXG4gICAgICogIGxlZnRBY3Rpb25TdHlsZTogICAgc3RyaW5nIOW3puS+p+aMiemSruagt+W8jyxcclxuICAgICAqICByaWdodEFjdGlvblRleHQ6ICAgIHN0cmluZyDlt6bkvqfmjInpkq7mlofmnKwsXHJcbiAgICAgKiAgcmlnaHRBY3Rpb25GdW5jOiAgICBmdW5jdGlvbiDlj7PkvqfmjInpkq7mlrnms5UsXHJcbiAgICAgKiAgcmlnaHRBY3Rpb25TdHlsZTogICBzdHJpbmcg5Y+z5L6n5oyJ6ZKu5qC35byPLFxyXG4gICAgICogfVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHNldERpYWxvZzogZnVuY3Rpb24gKG9EaWFsb2dQYXJhbXMsIGJDbG9zZSkge1xyXG4gICAgICAgIGxldCB0aXRsZSA9IG9EaWFsb2dQYXJhbXMudGl0bGUgPyBvRGlhbG9nUGFyYW1zLnRpdGxlIDogJ1RpdGxlJyxcclxuICAgICAgICAgICAgY29udGVudCA9IG9EaWFsb2dQYXJhbXMuY29udGVudCxcclxuICAgICAgICAgICAgYWN0aW9uVGV4dCA9IG9EaWFsb2dQYXJhbXMuYWN0aW9uVGV4dCA/IG9EaWFsb2dQYXJhbXMuYWN0aW9uVGV4dCA6ICdHZXQgaXQnLFxyXG4gICAgICAgICAgICBsZWZ0QWN0aW9uVGV4dCA9IG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblRleHQgPyBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25UZXh0IDogJ0NhbmNlbCcsXHJcbiAgICAgICAgICAgIGxlZnRBY3Rpb25TdHlsZSA9IG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvblN0eWxlID8gJyBzdHlsZT1cIicgKyBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25TdHlsZSArICdcIicgOiAnJyxcclxuICAgICAgICAgICAgcmlnaHRBY3Rpb25UZXh0ID0gb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvblRleHQgPyBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uVGV4dCA6ICdDb25maXJtJyxcclxuICAgICAgICAgICAgcmlnaHRBY3Rpb25TdHlsZSA9IG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25TdHlsZSA/ICcgc3R5bGU9XCInICsgb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvblN0eWxlICsgJ1wiJyA6ICcnO1xyXG5cclxuICAgICAgICBsZXQgQWN0aW9uVG1wbDtcclxuICAgICAgICBpZiAob0RpYWxvZ1BhcmFtcy5pc0RvdWJsZUFjdGlvbikge1xyXG4gICAgICAgICAgICBBY3Rpb25UbXBsID0gJzxzZWN0aW9uIGNsYXNzPVwiZnQgZnRfRG91YmxlXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGlkPVwibGVmdEFjdGlvblwiJyArIGxlZnRBY3Rpb25TdHlsZSArICc+JyArIGxlZnRBY3Rpb25UZXh0ICsgJzwvYT4nICtcclxuICAgICAgICAgICAgICAgICc8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgaWQ9XCJyaWdodEFjdGlvblwiJyArIHJpZ2h0QWN0aW9uU3R5bGUgKyAnPicgKyByaWdodEFjdGlvblRleHQgKyAnPC9hPicgK1xyXG4gICAgICAgICAgICAgICAgJzwvc2VjdGlvbj4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFjdGlvblRtcGwgPSAnPHNlY3Rpb24gY2xhc3M9XCJmdFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBpZD1cImFjdGlvblwiPicgKyBhY3Rpb25UZXh0ICsgJzwvYT4nICtcclxuICAgICAgICAgICAgICAgICc8L3NlY3Rpb24+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0bXBsID0gJzxkaXYgY2xhc3M9XCJtX2RpYWxvZ1wiIGlkPVwiZGlhbG9nXCI+JyArXHJcbiAgICAgICAgICAgICc8c2VjdGlvbiBjbGFzcz1cImhkXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPicgKyB0aXRsZSArICc8c3Bhbj48L3NlY3Rpb24+JyArXHJcbiAgICAgICAgICAgICc8c2VjdGlvbiBjbGFzcz1cImJkXCI+JyArIGNvbnRlbnQgKyAnPC9zZWN0aW9uPicgK1xyXG4gICAgICAgICAgICBBY3Rpb25UbXBsICtcclxuICAgICAgICAgICAgJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkUG9wdXAodG1wbCwgKGJDbG9zZSA/IHRydWUgOiBmYWxzZSkpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9wdXBWZXJ0aWNhbE1pZCgnI2RpYWxvZycpO1xyXG5cclxuICAgICAgICAvLyDop6PlhrPmn5DkupvkvY7nq6/ns7vnu5/lronljZPmnLrkuIvvvIjlpoJuZXh1czXjgIHlsI/nsbPnrYnvvInvvIzor7fmsYLov5Tlm57pobXpnaLmuLLmn5PnmoRidWdcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoc2hhcmVzZGspIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvcFwiOiBNYXRoLnJhbmRvbSgpICsgXCJweFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQoJyNhY3Rpb24nKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5kZWxQb3B1cCgpO1xyXG4gICAgICAgICAgICBpZiAob0RpYWxvZ1BhcmFtcy5hY3Rpb25GdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBvRGlhbG9nUGFyYW1zLmFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNsZWZ0QWN0aW9uJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsUG9wdXAoKTtcclxuICAgICAgICAgICAgaWYgKG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvbkZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIG9EaWFsb2dQYXJhbXMubGVmdEFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNyaWdodEFjdGlvbicpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIGlmIChvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uRnVuYykge1xyXG4gICAgICAgICAgICAgICAgb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvbkZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5mb3Jt6KGo5Y2V6L6T5YWl5qGGXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc2V0SW5wdXQ6IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAvLyDnlJ/miJDmqKHmnb9cclxuICAgICAgICBsZXQgYXR0ck9iaiA9IHtcclxuICAgICAgICAgICAgaWQ6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLWlkJyksXHJcbiAgICAgICAgICAgIGNsYXNzOiAkKHRhcmdldCkuYXR0cignZGF0YS1jbGFzcycpLFxyXG4gICAgICAgICAgICB0eXBlOiAkKHRhcmdldCkuYXR0cignZGF0YS10eXBlJyksXHJcbiAgICAgICAgICAgIHZhbHVlOiAkKHRhcmdldCkuYXR0cignZGF0YS12YWx1ZScpLFxyXG4gICAgICAgICAgICBsYWJlbDogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtbGFiZWwnKSxcclxuICAgICAgICAgICAgc3ltYm9sOiAkKHRhcmdldCkucGFyZW50cygnZm9ybScpLmF0dHIoJ2RhdGEtc3ltYm9sJyksIC8vIOeUqOS6juagh+iusGZvcm3ooajljZXnmoTlh7rplJnkv6Hmga9cclxuICAgICAgICAgICAgb3JkZXI6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLW9yZGVyJyksIC8vIOeUqOS6juWGs+WumuaPkOS6pOaXtuWHuumUmeS/oeaBr+eahOmhuuW6j++8jCDkuIDoiKzmjInnu5PmnoTljYfluo/mjpLluo/vvIzmj5DnpLrmlbDlgLzmnIDlsI/lgLzlr7nlupTnmoTlhoXlrrlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjdXN0b21UbXBsID0gJycsXHJcbiAgICAgICAgICAgIGlzUGFzc3dvcmQgPSBhdHRyT2JqLnR5cGUgPT09ICdwYXNzd29yZCcgJiYgJCgnLmpzX3Bzd1RvZ2dsZScpLmxlbmd0aCA9PT0gMCA/IHRydWUgOiBmYWxzZTsgLy8g5LiA5LiqZm9ybeihqOWNleWPquiDveacieS4gOS4quWunumZheeahOWvhueggeahhu+8jOS4jeeul+WvhueggeehruiupOahhlxyXG4gICAgICAgIGlmIChpc1Bhc3N3b3JkKSBjdXN0b21UbXBsID0gJzxzcGFuIGNsYXNzPVwid19pY29uIHdfaWNvbl9FeWVDbG9zZSBqc19wc3dUb2dnbGVcIj48L3NwYW4+JztcclxuICAgICAgICBsZXQgdG1wbCA9ICc8ZGl2IGNsYXNzPVwid19pbnB1dCcgKyAoaXNQYXNzd29yZCA/ICcgd19pbnB1dF9Qc3cnIDogJycpICsgJ1wiPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIicgKyBhdHRyT2JqLmlkICsgJ1wiIGNsYXNzPScgKyBhdHRyT2JqLmNsYXNzICsgJyB0eXBlPScgKyBhdHRyT2JqLnR5cGUgKyAnIHZhbHVlPVwiJyArIGF0dHJPYmoudmFsdWUgKyAnXCIgZGF0YS1vcmRlcj0nICsgYXR0ck9iai5vcmRlciArICcgLz5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JyArIGF0dHJPYmoubGFiZWwgKyAnPC9sYWJlbD5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICsgY3VzdG9tVG1wbCArICdcXFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XHJcbiAgICAgICAgJCh0YXJnZXQpLmFmdGVyKHRtcGwpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAvLyDorr7nva5mb3Jt5L+h5oGv5YiwbG9jYWxzdG9yYWdlXHJcbiAgICAgICAgbGV0IGxvY2FsRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYXR0ck9iai5zeW1ib2wpIHx8ICd7fScpLFxyXG4gICAgICAgICAgICBlcnJvckxpc3QgPSAobG9jYWxEYXRhLmVycm9yICYmIGxvY2FsRGF0YS5lcnJvci5sZW5ndGgpID8gbG9jYWxEYXRhLmVycm9yIDogW10sXHJcbiAgICAgICAgICAgIGVycm9ySXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBhdHRyT2JqLmlkLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6IGF0dHJPYmouY2xhc3MsXHJcbiAgICAgICAgICAgICAgICBvcmRlcjogYXR0ck9iai5vcmRlclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1zZyA9IHtcclxuICAgICAgICAgICAgICAgICdqc19pbnB1dEVtJzogQ29tbW9uVmFyLmZvcm1FcnJvci5lbWFpbC5lbXB0eSxcclxuICAgICAgICAgICAgICAgICdqc19pbnB1dFBoJzogQ29tbW9uVmFyLmZvcm1FcnJvci5waG9uZS5lbXB0eSxcclxuICAgICAgICAgICAgICAgICdqc19pbnB1dFBzdyc6IENvbW1vblZhci5mb3JtRXJyb3IucGFzc3dvcmQuZW1wdHksXHJcbiAgICAgICAgICAgICAgICAnanNfaW5wdXRQc3dfQ29uZmlybSc6IENvbW1vblZhci5mb3JtRXJyb3IucGFzc3dvcmRDb25maXJtLmVtcHR5LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIGVycm9ySXRlbVsnbXNnJ10gPSBlcnJvck1zZ1thdHRyT2JqLmNsYXNzXTtcclxuICAgICAgICBVdGlsRm4udXBkYXRlRm9ybUxTRXJyb3IoZXJyb3JMaXN0LCBlcnJvckl0ZW0pO1xyXG4gICAgICAgIGxvY2FsRGF0YS5lcnJvciA9IGVycm9yTGlzdDsgLy8g6ZSZ6K+v5L+h5oGv6ZuG5ZCI77yM55So5LqO5o+Q5Lqk5pe25o+Q56S6XHJcbiAgICAgICAgbG9jYWxEYXRhLmlucHV0Qmx1ciA9IFwiZmFsc2VcIjsgLy8g5aSx54Sm5Yik5a6a77yM55So5LqO5o+Q5Lqk5pe25Yaz5a6a5o+Q56S66Kem5Y+RXHJcbiAgICAgICAgbG9jYWxEYXRhLmlucHV0SWRzID8gbG9jYWxEYXRhLmlucHV0SWRzLnB1c2goYXR0ck9iai5pZCkgOiBsb2NhbERhdGEuaW5wdXRJZHMgPSBbYXR0ck9iai5pZF07IC8vIOi+k+WFpeahhmlk77yM55So5LqO5peg6ZSZ6K+v5pe25o+Q5Lqk6I635Y+W5aGr5YaZ5YaF5a65XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYXR0ck9iai5zeW1ib2wsIEpTT04uc3RyaW5naWZ5KGxvY2FsRGF0YSkpO1xyXG5cclxuICAgICAgICAvLyDogZrnhKbjgIHovpPlhaXjgIHlpLHnhKblpITnkIZcclxuICAgICAgICAkKCcuJyArIGF0dHJPYmouY2xhc3MpLmJpbmQoJ2ZvY3VzJywgZnVuY3Rpb24oKSB7IC8vIOiBmueEpu+8jOWkhOeQhuagt+W8j1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybiB3X2lucHV0X1ZhbGlkJykuYWRkQ2xhc3MoJ3dfaW5wdXRfQWN0aXZlJyk7XHJcbiAgICAgICAgfSkuYmluZCgna2V5dXAnLCBmdW5jdGlvbigpIHsgLy8g6L6T5YWl77yM5aSE55CG5qC35byP44CB5Yig6Zmk5oyJ6ZKuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKSxcclxuICAgICAgICAgICAgICAgICRkZWwgPSAkcGFyZW50LmNoaWxkcmVuKCcuanNfaW5wdXREZWwnKTtcclxuICAgICAgICAgICAgaWYgKCRkZWwpIHtcclxuICAgICAgICAgICAgICAgICRkZWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykudmFsKCkpIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZGVsVGVtcCA9ICc8c3BhbiBjbGFzcz1cIndfaWNvbiB3X2ljb25fSW5wdXREZWwganNfaW5wdXREZWxcIj48L3NwYW4+JztcclxuICAgICAgICAgICAgJHBhcmVudC5hcHBlbmQoZGVsVGVtcCk7XHJcbiAgICAgICAgICAgICRkZWwgPSAkcGFyZW50LmNoaWxkcmVuKCcuanNfaW5wdXREZWwnKTtcclxuICAgICAgICAgICAgJGRlbC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcuanNfdGlwJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoYXQpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmJpbmQoJ2JsdXInLCBmdW5jdGlvbigpIHsgLy8g5aSx54Sm77yM5aSE55CG5qC35byP44CB6ZSZ6K+v5o+Q56S6XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKSxcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnd19pbnB1dF9BY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOWGheWuueS4jeespuWQiOadoeS7tlxyXG4gICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCd3X2lucHV0X1dhcm4nKTtcclxuICAgICAgICAgICAgbGV0IG9UYXJnZXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgYlZhbGlkLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNc2c7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoJCh0aGlzKS5hdHRyKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc19pbnB1dEVtJzogLy8g6YKu566xXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVtVmFsID0gVXRpbEZuLnJlbW92ZUxhc3RCbGFuayh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxGbi5pc0VtYWlsKGVtVmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9IHZhbHVlID09PSAnJyA/IENvbW1vblZhci5mb3JtRXJyb3IuZW1haWwuZW1wdHkgOiBDb21tb25WYXIuZm9ybUVycm9yLmVtYWlsLmZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc19pbnB1dFBoJzogLy8g5omL5py6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxGbi5pc1Bob25lVmFsaWQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gdmFsdWUgPT09ICcnID8gQ29tbW9uVmFyLmZvcm1FcnJvci5waG9uZS5lbXB0eSA6IENvbW1vblZhci5mb3JtRXJyb3IucGhvbmUuZW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnanNfaW5wdXRQc3cnOiAvLyDlr4bnoIFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbEZuLmlzUGFzc3dvcmRWYWxpZCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbEZuLnVwZGF0ZUZvcm1MUyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IGF0dHJPYmouc3ltYm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBvVGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlhoXlrrnnrKblkIjmnaHku7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnd19pbnB1dF9XYXJuJykuYWRkQ2xhc3MoJ3dfaW5wdXRfVmFsaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiBlOWKqOajgOafpeehruiupOWvhueggVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRQc3dDb25maXJtID0gJy5qc19pbnB1dFBzd19Db25maXJtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBzd0NvbmZpcm1WYWwgPSAkKGlucHV0UHN3Q29uZmlybSkudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29uZmlybVBhcmVudCA9ICQoaW5wdXRQc3dDb25maXJtKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBzd0NvbmZpcm1WYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOajgOafpeWvueixoeiwg+aVtOS4uuiBlOWKqOWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb1RhcmdldCA9IGlucHV0UHN3Q29uZmlybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwc3dDb25maXJtVmFsID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb25maXJtUGFyZW50LnJlbW92ZUNsYXNzKCd3X2lucHV0X1dhcm4nKS5hZGRDbGFzcygnd19pbnB1dF9WYWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29uZmlybVBhcmVudC5yZW1vdmVDbGFzcygnd19pbnB1dF9WYWxpZCcpLmFkZENsYXNzKCd3X2lucHV0X1dhcm4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9IENvbW1vblZhci5mb3JtRXJyb3IucGFzc3dvcmRDb25maXJtLmZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhdHRyT2JqIOS4uue7hOS7tue6p+WIq+WPmOmHj++8jOWboOS4uuajgOafpeWvueixoeacieWPmOWMlu+8jOaJgOS7peWvueW6lOeahOWxnuaAp+WAvOS5n+imgeWvueW6lOWPmOWMllxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmouaWQgPSAkKG9UYXJnZXQpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9iai5jbGFzcyA9ICQob1RhcmdldCkuYXR0cignY2xhc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyT2JqLm9yZGVyID0gJChvVGFyZ2V0KS5hdHRyKCdkYXRhLW9yZGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSB2YWx1ZSA9PT0gJycgPyBDb21tb25WYXIuZm9ybUVycm9yLnBhc3N3b3JkLmVtcHR5IDogQ29tbW9uVmFyLmZvcm1FcnJvci5wYXNzd29yZC5mb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF0dHJPYmog5Li657uE5Lu257qn5Yir5Y+Y6YeP77yM5Zug5Li65qOA5p+l5a+56LGh5pyJ5Y+Y5YyW77yM5omA5Lul5a+55bqU55qE5bGe5oCn5YC85Lmf6KaB5a+55bqU5Y+Y5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmouaWQgPSAkKG9UYXJnZXQpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmouY2xhc3MgPSAkKG9UYXJnZXQpLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmoub3JkZXIgPSAkKG9UYXJnZXQpLmF0dHIoJ2RhdGEtb3JkZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc19pbnB1dFBzd19Db25maXJtJzogLy8g56Gu6K6k5a+G56CBXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJyAmJiB2YWx1ZSA9PT0gJCgnLmpzX2lucHV0UHN3JykudmFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSB2YWx1ZSA9PT0gJycgPyBDb21tb25WYXIuZm9ybUVycm9yLnBhc3N3b3JkQ29uZmlybS5lbXB0eSA6IENvbW1vblZhci5mb3JtRXJyb3IucGFzc3dvcmRDb25maXJtLmZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYlZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlsRm4udXBkYXRlRm9ybUxTKHtcclxuICAgICAgICAgICAgICAgICAgICBiVmFsaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBhdHRyT2JqLnN5bWJvbCxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG9UYXJnZXRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVXRpbEZuLnVwZGF0ZUZvcm1MUyh7XHJcbiAgICAgICAgICAgICAgICAgICAgYlZhbGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbDogYXR0ck9iai5zeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBvVGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBhdHRyT2JqLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiBhdHRyT2JqLmNsYXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiBhdHRyT2JqLm9yZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZzogZXJyb3JNc2dcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxGbi5zZXRUaXAoZXJyb3JNc2cpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDlhoXlrrnnrKblkIjmnaHku7ZcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnd19pbnB1dF9XYXJuJykuYWRkQ2xhc3MoJ3dfaW5wdXRfVmFsaWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5a+G56CB5pi+6ZqQ5aSE55CGXHJcbiAgICAgICAgaWYgKGlzUGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgJCgnLmpzX3Bzd1RvZ2dsZScpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50cygnZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3dfaWNvbl9FeWVDbG9zZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnd19pY29uX0V5ZUNsb3NlJykuYWRkQ2xhc3MoJ3dfaWNvbl9FeWVPcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKS5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtcHN3dG9nZ2xlXCI6IFwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3dfaWNvbl9FeWVPcGVuJykuYWRkQ2xhc3MoJ3dfaWNvbl9FeWVDbG9zZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl1bZGF0YS1wc3d0b2dnbGU9XCJ0cnVlXCJdJykuYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOabtOaWsGxvY2Fsc3RvcmFnZemHjOeahGZvcm3ooajljZXkv6Hmga/vvIznlKjkuo7mj5DkuqTml7bmo4Dmn6Xkvb/nlKhcclxuICAgIHVwZGF0ZUZvcm1MUzogZnVuY3Rpb24gKG9QYXJhbXMpIHtcclxuICAgICAgICBsZXQgYlZhbGlkID0gb1BhcmFtcy5iVmFsaWQsXHJcbiAgICAgICAgICAgIHN5bWJvbCA9IG9QYXJhbXMuc3ltYm9sLFxyXG4gICAgICAgICAgICB0YXJnZXQgPSBvUGFyYW1zLnRhcmdldCxcclxuICAgICAgICAgICAgaWQgPSBvUGFyYW1zLmlkLFxyXG4gICAgICAgICAgICBjbHMgPSBvUGFyYW1zLmNsYXNzLFxyXG4gICAgICAgICAgICBvcmRlciA9IG9QYXJhbXMub3JkZXIsXHJcbiAgICAgICAgICAgIG1zZyA9IG9QYXJhbXMubXNnO1xyXG5cclxuICAgICAgICBsZXQgbG9jYWxEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzeW1ib2wpKSxcclxuICAgICAgICAgICAgZXJyb3JMaXN0ID0gbG9jYWxEYXRhLmVycm9yLmxlbmd0aCA/IGxvY2FsRGF0YS5lcnJvciA6IFtdLFxyXG4gICAgICAgICAgICBiVXBkYXRlID0gZmFsc2U7IC8vIOWIpOaWreaYr+WQpuabtOaWsOmUmeivr+S/oeaBr1xyXG5cclxuICAgICAgICBlcnJvckxpc3QuZXZlcnkoKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3MgPT09ICQodGFyZ2V0KS5hdHRyKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICBiVXBkYXRlID0gdHJ1ZTsgLy8g5bey5pyJ6ZSZ6K+v5L+h5oGv77yM5YiZ5pu05pawXHJcbiAgICAgICAgICAgICAgICBiVmFsaWQgPyBhcnIuc3BsaWNlKGluZGV4LCAxKSA6IGl0ZW0ubXNnID0gbXNnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyDnu4jmraLlvqrnjq9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8g57un57ut5b6q546vXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5pyq5pyJ6ZSZ6K+v5L+h5oGv5LiU6aqM6K+B5pyJ6ZSZ77yM5YiZ5re75YqgXHJcbiAgICAgICAgaWYgKCFiVXBkYXRlICYmICFiVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IGVycm9ySXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6IGNscyxcclxuICAgICAgICAgICAgICAgIG9yZGVyLFxyXG4gICAgICAgICAgICAgICAgbXNnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFV0aWxGbi51cGRhdGVGb3JtTFNFcnJvcihlcnJvckxpc3QsIGVycm9ySXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbERhdGEuZXJyb3IgPSBlcnJvckxpc3Q7XHJcbiAgICAgICAgbG9jYWxEYXRhLmlucHV0Qmx1ciA9IGJWYWxpZCA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwiO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN5bWJvbCwgSlNPTi5zdHJpbmdpZnkobG9jYWxEYXRhKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oc3ltYm9sKSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5pu05pawbG9jYWxzdG9yYWdl6YeM55qEZm9ybeihqOWNlemUmeivr+S/oeaBr1xyXG4gICAgdXBkYXRlRm9ybUxTRXJyb3I6IGZ1bmN0aW9uIChlcnJvckxpc3QsIGVycm9ySXRlbSkge1xyXG4gICAgICAgIGlmIChlcnJvckxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGVycm9yTGlzdC5ldmVyeSgoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcihlcnJvckl0ZW0ub3JkZXIpIDwgTnVtYmVyKGl0ZW0ub3JkZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpbmRleCwgMCwgZXJyb3JJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ICsgMSA9PT0gYXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGVycm9ySXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3JMaXN0LnB1c2goZXJyb3JJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rmZvcm3ooajljZXmj5DkuqTmjInpkq5cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBzZXRTdWJtaXRCdG46IGZ1bmN0aW9uICh0YXJnZXQsIHZhbGlkQ2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgc3ltYm9sID0gJCh0YXJnZXQpLnBhcmVudHMoJ2Zvcm0nKS5hdHRyKCdkYXRhLXN5bWJvbCcpO1xyXG4gICAgICAgICQodGFyZ2V0KS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCdmb3JtJykuZmluZCgnaW5wdXQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnd19pbnB1dF9XYXJuJyk7IC8vIOmHjee9ruihqOWNleWGhei+k+WFpeahhueahOmUmeivr+agt+W8j1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzeW1ib2wpKSxcclxuICAgICAgICAgICAgICAgIGVycm9yTGlzdCA9IGxvY2FsRGF0YS5lcnJvci5sZW5ndGggPyBsb2NhbERhdGEuZXJyb3IgOiBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvckxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvckxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIGl0ZW0uaWQpLnBhcmVudCgpLmFkZENsYXNzKCd3X2lucHV0X1dhcm4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2NhbERhdGEuaW5wdXRCbHVyID09PSAndHJ1ZScpIHsgLy8g6L6T5YWl5qGG5aSx54Sm77yM5o+Q56S66Ieq6Lqr6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYXRhLmlucHV0Qmx1ciA9ICdmYWxzZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3ltYm9sLCBKU09OLnN0cmluZ2lmeShsb2NhbERhdGEpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIOmdnui+k+WFpeahhuWkseeEpu+8jOaPkOekuumrmOS8mOWFiOe6p+mUmeivr1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxGbi5zZXRUaXAoZXJyb3JMaXN0WzBdLm1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmo4Dmn6XpgJrov4flm57osIMnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7VXRpbEZufTsiLCIvKipcbiAqIOWFqOWxgOWPmOmHj+mFjee9rlxuICogXG4gKi9cbmxldCBDb21tb25WYXIgPSB7XG4gICAgbGlzdENvbnRlbnRXaWR0aDogMCxcbiAgICBjdXJyZW50VGltZTogbmV3IERhdGUoKSxcbiAgICBmb3JtRXJyb3I6IHtcbiAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgIGVtcHR5OiBcIumCrueuseS4jeiDveS4uuepulwiLFxuICAgICAgICAgICAgZm9ybWF0OiBcIumCrueuseagvOW8j+S4jeato+ehrlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBob25lOiB7XG4gICAgICAgICAgICBlbXB0eTogXCLmiYvmnLrkuI3og73kuLrnqbpcIixcbiAgICAgICAgICAgIGZvcm1hdDogXCLmiYvmnLrmoLzlvI/kuI3mraPnoa5cIlxuICAgICAgICB9LFxuICAgICAgICBwYXNzd29yZDoge1xuICAgICAgICAgICAgZW1wdHk6IFwi5a+G56CB5LiN6IO95Li656m6XCIsXG4gICAgICAgICAgICBmb3JtYXQ6IFwi5a+G56CB5qC85byP5LiN5q2j56GuXCJcbiAgICAgICAgfSxcbiAgICAgICAgcGFzc3dvcmRDb25maXJtOiB7XG4gICAgICAgICAgICBlbXB0eTogXCLnoa7orqTlr4bnoIHkuI3og73kuLrnqbpcIixcbiAgICAgICAgICAgIGZvcm1hdDogXCLlr4bnoIHliY3lkI7kuI3kuIDoh7RcIlxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQge0NvbW1vblZhcn07Il19
