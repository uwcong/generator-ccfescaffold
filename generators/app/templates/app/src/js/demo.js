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
                    if (value !== '' && value === $('.js_inputPsw').val()) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2pzL21vZHVsZS9fZGVtby5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdXRpbC5qcyIsImFwcC9zcmMvanMvbW9kdWxlL2NvbW1vbi9fdmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNJQTs7QUFDQTs7QUFMQTs7OztBQU9BLEVBQUUsWUFBVztBQUNULGNBQVUsTUFBVixDQUFpQixTQUFTLElBQTFCOztBQUVBLE1BQUUsYUFBRixFQUFpQixJQUFqQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQ3ZDLHFCQUFPLE1BQVAsQ0FBYyxLQUFkO0FBQ0gsS0FGRDs7QUFJQSxNQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLFlBQVk7QUFDMUMscUJBQU8sU0FBUCxDQUFpQjtBQUNiLG1CQUFPLGNBRE07QUFFYixxQkFBUyxnQkFGSTtBQUdiLDRCQUFnQjtBQUhILFNBQWpCO0FBS0gsS0FORDs7QUFRQSxNQUFFLGlCQUFGLEVBQXFCLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVk7QUFDM0MscUJBQU8sVUFBUDtBQUNILEtBRkQ7O0FBSUEsS0FBQyxZQUFNO0FBQ0gsVUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDNUIseUJBQWEsT0FBYixDQUFxQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsYUFBYixDQUFyQixFQUFrRCxFQUFsRDtBQUNILFNBRkQ7QUFHQSxVQUFFLFdBQUYsRUFBZSxJQUFmLENBQW9CLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDakMseUJBQU8sUUFBUCxDQUFnQixJQUFoQjtBQUNILFNBRkQ7QUFHQSxVQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDdEMseUJBQU8sWUFBUCxDQUFv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QUFnQixNQUFoQixHQUF5QixVQUFVLEtBQW5DLEdBQTJDLEVBRDNEOztBQUdBLGdCQUFJLFVBQVUsTUFBZCxFQUFzQjtBQUNsQiwwQkFBVSxPQUFWLENBQWtCLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDL0Isc0JBQUUsTUFBTSxLQUFLLEVBQWIsRUFBaUIsTUFBakIsR0FBMEIsUUFBMUIsQ0FBbUMsY0FBbkM7QUFDSCxpQkFGRDs7QUFJQSxvQkFBSSxVQUFVLFNBQVYsS0FBd0IsTUFBNUIsRUFBb0M7QUFBRTtBQUNsQyw4QkFBVSxTQUFWLEdBQXNCLE9BQXRCO0FBQ0EsaUNBQWEsT0FBYixDQUFxQixRQUFRLE1BQTdCLEVBQXFDLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBckM7QUFDSCxpQkFIRCxNQUdPO0FBQUU7QUFDTCwyQkFBTyxNQUFQLENBQWMsVUFBVSxDQUFWLEVBQWEsR0FBM0I7QUFDSDtBQUNEO0FBQ0g7O0FBRUQsb0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDSCxTQXBCRDtBQXFCSDs7QUF0aUJRLENBQWI7O1FBMGlCUSxNLEdBQUEsTTs7Ozs7Ozs7QUNoakJSOzs7O0FBSUEsSUFBSSxZQUFZO0FBQ1osb0JBQWtCLENBRE47QUFFWixlQUFhLElBQUksSUFBSjtBQUZELENBQWhCOztRQUtRLFMsR0FBQSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBkb2N1bWVudCByZWFkeSBhbmQgd2luZG93IG9ubG9hZFxyXG4gKiBcclxuICovXHJcbmltcG9ydCB7Q29tbW9uVmFyfSBmcm9tICcuL2NvbW1vbi9fdmFyLmpzJztcclxuaW1wb3J0IHtVdGlsRm59IGZyb20gJy4vY29tbW9uL191dGlsLmpzJztcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgICQoJyN0cmlnZ2VyVGlwJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVXRpbEZuLnNldFRpcCgnVElQJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjdHJpZ2dlckRpYWxvZycpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFV0aWxGbi5zZXREaWFsb2coe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0RpYWxvZyB0aXRsZScsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdEaWFsb2cgY29udGVudCcsXHJcbiAgICAgICAgICAgIGlzRG91YmxlQWN0aW9uOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJCgnI3RyaWdnZXJMb2FkaW5nJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVXRpbEZuLnNldExvYWRpbmcoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICgoKSA9PiB7XHJcbiAgICAgICAgJCgnZm9ybScpLmVhY2goKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCQoaXRlbSkuYXR0cignZGF0YS1zeW1ib2wnKSwgJycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJ3RhZy1pbnB1dCcpLmVhY2goKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIFV0aWxGbi5zZXRJbnB1dChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanNfZm9ybVN1Ym1pdCcpLmVhY2goKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIFV0aWxGbi5zZXRTdWJtaXRCdG4oaXRlbSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pKClcclxuICAgIFxyXG59KTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge30iLCIvKipcclxuICog5bel5YW35pa55rOVXHJcbiAqIEBhdXRob3IgQ2NcclxuICogXHJcbiAqL1xyXG5cclxubGV0IFV0aWxGbiA9IHtcclxuICAgIC8vIOWKqOaAgeiuvue9rmh0bWznmoRmb250LXNpemXvvIznlKjkuo5yZW3nmoTorqHnrpdcclxuICAgIHNldEh0bWxGb250U2l6ZTogZnVuY3Rpb24gKGRvYywgd2luKSB7XHJcbiAgICAgICAgbGV0IGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudCxcclxuICAgICAgICAgICAgcmVzaXplRXZ0ID0gJ29yaWVudGF0aW9uY2hhbmdlJyBpbiB3aW5kb3cgPyAnb3JpZW50YXRpb25jaGFuZ2UnIDogJ3Jlc2l6ZScsXHJcbiAgICAgICAgICAgIHJlY2FsYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjbGllbnRXaWR0aCA9IGRvY0VsLmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjbGllbnRXaWR0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZG9jRWwuc3R5bGUuZm9udFNpemUgPSAoY2xpZW50V2lkdGggKiAwLjEpICsgJ3B4JztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCFkb2MuYWRkRXZlbnRMaXN0ZW5lcikgcmV0dXJuO1xyXG4gICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKHJlc2l6ZUV2dCwgcmVjYWxjLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gRE9N5Yqg6L295LmL5ZCO5Y+K6LWE5rqQ5Yqg6L295LmL5YmN5Y675omn6KGM77yM5Y2z5a+55bqUalF1ZXJ55Lit55qEZG9jdW1lbnQgcmVhZHlcclxuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlY2FsYywgZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5Zsb2NhdGlvbiBzZWFyY2jlj4LmlbDvvIzov5Tlm57kuIDkuKpzZWFyY2jlr7nosaFcclxuICAgIGdldExvY2F0aW9uU2VhcmNoT2JqOiBmdW5jdGlvbiAocXN0cmluZykge1xyXG4gICAgICAgIGxldCBzcGxpdFVybCA9IHFzdHJpbmcuc3BsaXQoXCI/XCIpO1xyXG4gICAgICAgIGxldCBzdHJVcmwgPSAoc3BsaXRVcmwubGVuZ3RoID4gMSkgPyBkZWNvZGVVUklDb21wb25lbnQoc3BsaXRVcmxbMV0pLnNwbGl0KFwiJlwiKSA6IFtdO1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIGxldCBvYmogPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHN0clVybC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgc3RyID0gc3RyVXJsW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgb2JqW3N0clswXV0gPSBzdHJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc29ydC5jYWxsKG9iaik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIpOaWreeOr+Wig1xyXG4gICAgaXNpT1M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9cXChpW147XSs7KCBVOyk/IENQVS4rTWFjIE9TIFgvKTtcclxuICAgIH0sXHJcbiAgICBpc0FuZHJpb2Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gL2FuZHJvaWQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIH0sXHJcbiAgICBpc1dlQ2hhdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAvbWljcm9tZXNzZW5nZXIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIH0sXHJcbiAgICBpc1BjOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHVzZXJBZ2VudEluZm8gPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IGFnZW50cyA9IFtcImFuZHJvaWRcIiwgXCJpcGhvbmVcIiwgXCJpcGFkXCIsIFwiaXBvZFwiLCBcInN5bWJpYW5vc1wiLCBcIndpbmRvd3MgcGhvbmVcIl07XHJcbiAgICAgICAgbGV0IGZsYWcgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWdlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyQWdlbnRJbmZvLmluZGV4T2YoYWdlbnRzW2ldKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDpgq7nrrHmoLzlvI/pqozor4FcclxuICAgIGlzRW1haWw6IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICByZXR1cm4gL14oW2EtekEtWjAtOVxcLl8tXSkrQChbYS16QS1aMC05Xy1dKSsoKFxcLlthLXpBLVowLTlfLV0rKSspJC8udGVzdChzdHIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmiYvmnLrmoLzlvI/pqozor4E6IOS4jeWwkeS6jjfkvY3mlbDlrZdcclxuICAgIGlzUGhvbmVWYWxpZDogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiAvXlswLTldezcsfSQvLnRlc3Qoc3RyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5a+G56CB5qC85byP6aqM6K+BOiA3LTIw5L2N5pWw5a2X5oiW6ICF5a2X5q+NXHJcbiAgICBpc1Bhc3N3b3JkVmFsaWQ6IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICByZXR1cm4gL15bYS16QS1aMC05XXs3LDIwfSQvLnRlc3Qoc3RyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pe26Ze05oiz6L2s5o2i5qC85byPXHJcbiAgICBkYXRlOiBmdW5jdGlvbiAocywgZm10KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgcyA9IE51bWJlcihzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm10ID0gZm10IHx8IFwieXl5eS1NTS1kZCBoaDptbTpzc1wiO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUocyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgZGF0ZSA9IHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvID0ge1xyXG4gICAgICAgICAgICBcIk0rXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9XHJcbiAgICAgICAgICAgIFwiZCtcIjogZGF0ZS5nZXREYXRlKCksIC8v5pelXHJcbiAgICAgICAgICAgIFwiaCtcIjogZGF0ZS5nZXRIb3VycygpLCAvL+Wwj+aXtlxyXG4gICAgICAgICAgICBcIm0rXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhlxyXG4gICAgICAgICAgICBcInMrXCI6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL+enklxyXG4gICAgICAgICAgICBcInErXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmXHJcbiAgICAgICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoLyh5KykvLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoZGF0ZS5nZXRGdWxsWWVhcigpICsgXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBvKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKFwiKFwiICsgayArIFwiKVwiKS50ZXN0KGZtdCkpIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGggPT0gMSkgPyAob1trXSkgOiAoKFwiMDBcIiArIG9ba10pLnN1YnN0cigoXCJcIiArIG9ba10pLmxlbmd0aCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZtdDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572uY29va2llXHJcbiAgICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xyXG4gICAgICAgIGRheXMgPSBkYXlzIHx8IDA7XHJcbiAgICAgICAgbGV0IGV4cGlyZXMgPSBcIlwiO1xyXG4gICAgICAgIGlmIChkYXlzICE9IDApIHsgLy/orr7nva5jb29raWXov4fmnJ/ml7bpl7QgIFxyXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGxldCBtcyA9IGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBtcyk7XHJcbiAgICAgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRheXMgPT0gSW5maW5pdHkpIHsgLy8g6K6+572u5pyA5aSn6L+H5pyf5pe26Ze0XHJcbiAgICAgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IEdNVFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPlmNvb2tpZVxyXG4gICAgZ2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIGxldCBuYW1lRVEgPSBuYW1lICsgXCI9XCI7XHJcbiAgICAgICAgbGV0IGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7IC8v5oqKY29va2ll5YiG5Ymy5oiQ57uEICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gY2FbaV07IC8v5Y+W5b6X5a2X56ym5LiyICBcclxuICAgICAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09ICcgJykgeyAvL+WIpOaWreS4gOS4i+Wtl+espuS4suacieayoeacieWJjeWvvOepuuagvCAgXHJcbiAgICAgICAgICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpOyAvL+acieeahOivne+8jOS7juesrOS6jOS9jeW8gOWni+WPliAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09IDApIHsgLy/lpoLmnpzlkKvmnInmiJHku6zopoHnmoRuYW1lICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmuIXpmaRjb29raWVzXHJcbiAgICBjbGVhckNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLnNldENvb2tpZShuYW1lLCBcIlwiLCAtMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPlueJueWummxvY2Fsc3RvcmFnZVxyXG4gICAgZ2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBkYXRhID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGF0YSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDljrvmjonnu5PlsL7nqbrmoLxcclxuICAgIHJlbW92ZUxhc3RCbGFuazogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyhcXHMqJCkvZywgXCJcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9ruW8ueeql+WeguebtOWxheS4rVxyXG4gICAgc2V0UG9wdXBWZXJ0aWNhbE1pZDogZnVuY3Rpb24gKGRvbU9iaikge1xyXG4gICAgICAgIGlmICgkKGRvbU9iaikpIHtcclxuICAgICAgICAgICAgbGV0IHBvcHVwSGVpZ2h0ID0gJChkb21PYmopLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgd2luSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAkKGRvbU9iaikuY3NzKHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiAod2luSGVpZ2h0IC0gcG9wdXBIZWlnaHQpIC8gMixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIlBvcHVwIGlzIG5vdCBleGlzdO+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOeUn+aIkOW8ueeql1xyXG4gICAgYWRkUG9wdXA6IGZ1bmN0aW9uIChjb250ZW50LCBiQ2xvc2UpIHtcclxuICAgICAgICB0aGlzLmRlbFBvcHVwKCk7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtX3BvcHVwXCIgaWQ9XCJwb3B1cFwiPjxkaXYgY2xhc3M9XCJtYXNrXCIgaWQ9XCJwb3B1cE1hc2tcIj48L2Rpdj4nICsgY29udGVudCArICc8L2Rpdj4nKTtcclxuICAgICAgICBpZiAoYkNsb3NlKSB7XHJcbiAgICAgICAgICAgICQoJyNwb3B1cE1hc2snKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVsUG9wdXAoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOWIoOmZpOW8ueeql1xyXG4gICAgZGVsUG9wdXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcjcG9wdXAnKS5yZW1vdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5o+Q56S6XHJcbiAgICBzZXRUaXA6IGZ1bmN0aW9uIChzVGlwLCBvUGFyYW1zKSB7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ3X3RpcCBqc190aXBcIj48c3BhbiBjbGFzcz1cInRleHRcIj4nICsgc1RpcCArICc8L3NwYW4+PC9zcGFuPicpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuanNfdGlwJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGlmIChvUGFyYW1zICYmIG9QYXJhbXMuY2FsbGJhY2spIG9QYXJhbXMuY2FsbGJhY2soKTtcclxuICAgICAgICB9LCAob1BhcmFtcyAmJiBvUGFyYW1zLm1zZWMgPyBvUGFyYW1zLm1zZWMgOiAxMDAwKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9ruWFqOWxgOWKoOi9vVxyXG4gICAgc2V0TG9hZGluZzogZnVuY3Rpb24gKHNUZXh0KSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBzVGV4dCB8fCAnTG9hZGluZy4uLic7XHJcbiAgICAgICAgdGhpcy5hZGRQb3B1cCgnPGRpdiBjbGFzcz1cIndfbG9hZGluZ1wiPicgKyB0ZXh0ICsgJzwvZGl2PicpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9wdXBWZXJ0aWNhbE1pZCgnLndfbG9hZGluZycpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lr7nor53moYZcclxuICAgICAqIG9EaWFsb2dQYXJhbXM6IHtcclxuICAgICAqICB0aXRsZTogICAgICAgICAgICAgIHN0cmluZyDlvLnnqpfmoIfpopgsXHJcbiAgICAgKiAgY29udGVudDogICAgICAgICAgICBzdHJpbmcg5by556qX5YaF5a65LFxyXG4gICAgICogIGlzRG91YmxlQWN0aW9uOiAgICAgYm9vbGVhbiDmmK/lkKbkuKTkuKrmjInpkq4sXHJcbiAgICAgKiAgYWN0aW9uVGV4dDogICAgICAgICBzdHJpbmcg5Y2V5oyJ6ZKu5paH5pysLFxyXG4gICAgICogIGFjdGlvbkZ1bmM6ICAgICAgICAgZnVuY3Rpb24g5Y2V5oyJ6ZKu5pa55rOVLFxyXG4gICAgICogIGxlZnRBY3Rpb25UZXh0OiAgICAgc3RyaW5nIOW3puS+p+aMiemSruaWh+acrCxcclxuICAgICAqICBsZWZ0QWN0aW9uRnVuYzogICAgIGZ1bmN0aW9uIOW3puS+p+aMiemSruaWueazlSxcclxuICAgICAqICBsZWZ0QWN0aW9uU3R5bGU6ICAgIHN0cmluZyDlt6bkvqfmjInpkq7moLflvI8sXHJcbiAgICAgKiAgcmlnaHRBY3Rpb25UZXh0OiAgICBzdHJpbmcg5bem5L6n5oyJ6ZKu5paH5pysLFxyXG4gICAgICogIHJpZ2h0QWN0aW9uRnVuYzogICAgZnVuY3Rpb24g5Y+z5L6n5oyJ6ZKu5pa55rOVLFxyXG4gICAgICogIHJpZ2h0QWN0aW9uU3R5bGU6ICAgc3RyaW5nIOWPs+S+p+aMiemSruagt+W8jyxcclxuICAgICAqIH1cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBzZXREaWFsb2c6IGZ1bmN0aW9uIChvRGlhbG9nUGFyYW1zLCBiQ2xvc2UpIHtcclxuICAgICAgICBsZXQgdGl0bGUgPSBvRGlhbG9nUGFyYW1zLnRpdGxlID8gb0RpYWxvZ1BhcmFtcy50aXRsZSA6ICdUaXRsZScsXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBvRGlhbG9nUGFyYW1zLmNvbnRlbnQsXHJcbiAgICAgICAgICAgIGFjdGlvblRleHQgPSBvRGlhbG9nUGFyYW1zLmFjdGlvblRleHQgPyBvRGlhbG9nUGFyYW1zLmFjdGlvblRleHQgOiAnR2V0IGl0JyxcclxuICAgICAgICAgICAgbGVmdEFjdGlvblRleHQgPSBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25UZXh0ID8gb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uVGV4dCA6ICdDYW5jZWwnLFxyXG4gICAgICAgICAgICBsZWZ0QWN0aW9uU3R5bGUgPSBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25TdHlsZSA/ICcgc3R5bGU9XCInICsgb0RpYWxvZ1BhcmFtcy5sZWZ0QWN0aW9uU3R5bGUgKyAnXCInIDogJycsXHJcbiAgICAgICAgICAgIHJpZ2h0QWN0aW9uVGV4dCA9IG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25UZXh0ID8gb0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvblRleHQgOiAnQ29uZmlybScsXHJcbiAgICAgICAgICAgIHJpZ2h0QWN0aW9uU3R5bGUgPSBvRGlhbG9nUGFyYW1zLnJpZ2h0QWN0aW9uU3R5bGUgPyAnIHN0eWxlPVwiJyArIG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25TdHlsZSArICdcIicgOiAnJztcclxuXHJcbiAgICAgICAgbGV0IEFjdGlvblRtcGw7XHJcbiAgICAgICAgaWYgKG9EaWFsb2dQYXJhbXMuaXNEb3VibGVBY3Rpb24pIHtcclxuICAgICAgICAgICAgQWN0aW9uVG1wbCA9ICc8c2VjdGlvbiBjbGFzcz1cImZ0IGZ0X0RvdWJsZVwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBpZD1cImxlZnRBY3Rpb25cIicgKyBsZWZ0QWN0aW9uU3R5bGUgKyAnPicgKyBsZWZ0QWN0aW9uVGV4dCArICc8L2E+JyArXHJcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGlkPVwicmlnaHRBY3Rpb25cIicgKyByaWdodEFjdGlvblN0eWxlICsgJz4nICsgcmlnaHRBY3Rpb25UZXh0ICsgJzwvYT4nICtcclxuICAgICAgICAgICAgICAgICc8L3NlY3Rpb24+JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBBY3Rpb25UbXBsID0gJzxzZWN0aW9uIGNsYXNzPVwiZnRcIj4nICtcclxuICAgICAgICAgICAgICAgICc8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgaWQ9XCJhY3Rpb25cIj4nICsgYWN0aW9uVGV4dCArICc8L2E+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9zZWN0aW9uPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdG1wbCA9ICc8ZGl2IGNsYXNzPVwibV9kaWFsb2dcIiBpZD1cImRpYWxvZ1wiPicgK1xyXG4gICAgICAgICAgICAnPHNlY3Rpb24gY2xhc3M9XCJoZFwiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj4nICsgdGl0bGUgKyAnPHNwYW4+PC9zZWN0aW9uPicgK1xyXG4gICAgICAgICAgICAnPHNlY3Rpb24gY2xhc3M9XCJiZFwiPicgKyBjb250ZW50ICsgJzwvc2VjdGlvbj4nICtcclxuICAgICAgICAgICAgQWN0aW9uVG1wbCArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFBvcHVwKHRtcGwsIChiQ2xvc2UgPyB0cnVlIDogZmFsc2UpKTtcclxuICAgICAgICB0aGlzLnNldFBvcHVwVmVydGljYWxNaWQoJyNkaWFsb2cnKTtcclxuXHJcbiAgICAgICAgLy8g6Kej5Yaz5p+Q5Lqb5L2O56uv57O757uf5a6J5Y2T5py65LiL77yI5aaCbmV4dXM144CB5bCP57Gz562J77yJ77yM6K+35rGC6L+U5Zue6aG16Z2i5riy5p+T55qEYnVnXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHNoYXJlc2RrKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIjogTWF0aC5yYW5kb20oKSArIFwicHhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAkKCcjYWN0aW9uJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsUG9wdXAoKTtcclxuICAgICAgICAgICAgaWYgKG9EaWFsb2dQYXJhbXMuYWN0aW9uRnVuYykge1xyXG4gICAgICAgICAgICAgICAgb0RpYWxvZ1BhcmFtcy5hY3Rpb25GdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcjbGVmdEFjdGlvbicpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbFBvcHVwKCk7XHJcbiAgICAgICAgICAgIGlmIChvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25GdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBvRGlhbG9nUGFyYW1zLmxlZnRBY3Rpb25GdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcjcmlnaHRBY3Rpb24nKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5kZWxQb3B1cCgpO1xyXG4gICAgICAgICAgICBpZiAob0RpYWxvZ1BhcmFtcy5yaWdodEFjdGlvbkZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIG9EaWFsb2dQYXJhbXMucmlnaHRBY3Rpb25GdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572uZm9ybeihqOWNlei+k+WFpeahhlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHNldElucHV0OiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgLy8g55Sf5oiQ5qih5p2/XHJcbiAgICAgICAgbGV0IGF0dHJPYmogPSB7XHJcbiAgICAgICAgICAgIGlkOiAkKHRhcmdldCkuYXR0cignZGF0YS1pZCcpLFxyXG4gICAgICAgICAgICBjbGFzczogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtY2xhc3MnKSxcclxuICAgICAgICAgICAgdHlwZTogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtdHlwZScpLFxyXG4gICAgICAgICAgICB2YWx1ZTogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtdmFsdWUnKSxcclxuICAgICAgICAgICAgbGFiZWw6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLWxhYmVsJyksXHJcbiAgICAgICAgICAgIHN5bWJvbDogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtc3ltYm9sJyksIC8vIOeUqOS6juagh+iusGZvcm3ooajljZXnmoTlh7rplJnkv6Hmga9cclxuICAgICAgICAgICAgb3JkZXI6ICQodGFyZ2V0KS5hdHRyKCdkYXRhLW9yZGVyJyksIC8vIOeUqOS6juWGs+WumuaPkOS6pOaXtuWHuumUmeS/oeaBr+eahOmhuuW6j++8jCDku44w5byA5aeL5Lil5qC85Y2H5bqP5o6S5bqP77yM5o+Q56S65pWw5YC85pyA5bCP5YC85a+55bqU55qE5YaF5a65XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY3VzdG9tVG1wbCA9ICcnLFxyXG4gICAgICAgICAgICBpc1Bhc3N3b3JkID0gYXR0ck9iai50eXBlID09PSAncGFzc3dvcmQnICYmICQoJy5qc19wc3dUb2dnbGUnKS5sZW5ndGggPT09IDAgPyB0cnVlIDogZmFsc2U7IC8vIOS4gOS4qmZvcm3ooajljZXlj6rog73mnInkuIDkuKrlrp7pmYXnmoTlr4bnoIHmoYbvvIzkuI3nrpflr4bnoIHnoa7orqTmoYZcclxuICAgICAgICBpZiAoaXNQYXNzd29yZCkgY3VzdG9tVG1wbCA9ICc8c3BhbiBjbGFzcz1cIndfaWNvbiB3X2ljb25fRXllQ2xvc2UganNfcHN3VG9nZ2xlXCI+PC9zcGFuPic7XHJcbiAgICAgICAgbGV0IHRtcGwgPSAnPGRpdiBjbGFzcz1cIndfaW5wdXQnICsgKGlzUGFzc3dvcmQgPyAnIHdfaW5wdXRfUHN3JyA6ICcnKSArICdcIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCInICsgYXR0ck9iai5pZCArICdcIiBjbGFzcz0nICsgYXR0ck9iai5jbGFzcyArICcgdHlwZT0nICsgYXR0ck9iai50eXBlICsgJyB2YWx1ZT1cIicgKyBhdHRyT2JqLnZhbHVlICsgJ1wiIGRhdGEtb3JkZXI9JyArIGF0dHJPYmoub3JkZXIgKyAnIC8+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPicgKyBhdHRyT2JqLmxhYmVsICsgJzwvbGFiZWw+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyArIGN1c3RvbVRtcGwgKyAnXFxcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nO1xyXG4gICAgICAgICQodGFyZ2V0KS5hZnRlcih0bXBsKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgLy8g6K6+572u6ZSZ6K+v5L+h5oGv5YiwbG9jYWxzdG9yYWdlXHJcbiAgICAgICAgbGV0IGxvY2FsRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYXR0ck9iai5zeW1ib2wpIHx8ICd7fScpLFxyXG4gICAgICAgICAgICBlcnJvckxpc3QgPSAobG9jYWxEYXRhLmVycm9yICYmIGxvY2FsRGF0YS5lcnJvci5sZW5ndGgpID8gbG9jYWxEYXRhLmVycm9yIDogW10sXHJcbiAgICAgICAgICAgIGVycm9ySXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBhdHRyT2JqLmlkLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6IGF0dHJPYmouY2xhc3MsXHJcbiAgICAgICAgICAgICAgICBvcmRlcjogYXR0ck9iai5vcmRlclxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIHN3aXRjaCAoYXR0ck9iai5jbGFzcykge1xyXG4gICAgICAgICAgICBjYXNlICdqc19pbnB1dEVtJzogLy8g6YKu566xXHJcbiAgICAgICAgICAgICAgICBlcnJvckl0ZW1bJ21zZyddID0gXCLpgq7nrrHkuI3og73kuLrnqbpcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdqc19pbnB1dFBoJzogLy8g5omL5py6XHJcbiAgICAgICAgICAgICAgICBlcnJvckl0ZW1bJ21zZyddID0gXCLmiYvmnLrkuI3og73kuLrnqbpcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdqc19pbnB1dFBzdyc6IC8vIOWvhueggVxyXG4gICAgICAgICAgICAgICAgZXJyb3JJdGVtWydtc2cnXSA9IFwi5a+G56CB5LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnanNfaW5wdXRQc3dfQ29uZmlybSc6IC8vIOehruiupOWvhueggVxyXG4gICAgICAgICAgICAgICAgZXJyb3JJdGVtWydtc2cnXSA9IFwi56Gu6K6k5a+G56CB5LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlcnJvckxpc3QucHVzaChlcnJvckl0ZW0pO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGF0dHJPYmouc3ltYm9sLCBKU09OLnN0cmluZ2lmeSh7XCJlcnJvclwiOiBlcnJvckxpc3QsIFwiaW5wdXRCbHVyXCI6IFwiZmFsc2VcIn0pKTtcclxuXHJcbiAgICAgICAgLy8g6IGa54Sm44CB6L6T5YWl44CB5aSx54Sm5aSE55CGXHJcbiAgICAgICAgJCgnLicgKyBhdHRyT2JqLmNsYXNzKS5iaW5kKCdmb2N1cycsIGZ1bmN0aW9uKCkgeyAvLyDogZrnhKbvvIzlpITnkIbmoLflvI9cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCd3X2lucHV0X1dhcm4gd19pbnB1dF9WYWxpZCcpLmFkZENsYXNzKCd3X2lucHV0X0FjdGl2ZScpO1xyXG4gICAgICAgIH0pLmJpbmQoJ2tleXVwJywgZnVuY3Rpb24oKSB7IC8vIOi+k+WFpe+8jOWkhOeQhuagt+W8j+OAgeWIoOmZpOaMiemSrlxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCksXHJcbiAgICAgICAgICAgICAgICAkZGVsID0gJHBhcmVudC5jaGlsZHJlbignLmpzX2lucHV0RGVsJyk7XHJcbiAgICAgICAgICAgIGlmICgkZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAkZGVsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKHRoaXMpLnZhbCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGRlbFRlbXAgPSAnPHNwYW4gY2xhc3M9XCJ3X2ljb24gd19pY29uX0lucHV0RGVsIGpzX2lucHV0RGVsXCI+PC9zcGFuPic7XHJcbiAgICAgICAgICAgICRwYXJlbnQuYXBwZW5kKGRlbFRlbXApO1xyXG4gICAgICAgICAgICAkZGVsID0gJHBhcmVudC5jaGlsZHJlbignLmpzX2lucHV0RGVsJyk7XHJcbiAgICAgICAgICAgICRkZWwuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzX3RpcCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGF0KS52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5iaW5kKCdibHVyJywgZnVuY3Rpb24oKSB7IC8vIOWkseeEpu+8jOWkhOeQhuagt+W8j+OAgemUmeivr+aPkOekulxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfQWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAvLyDlhoXlrrnkuI3nrKblkIjmnaHku7ZcclxuICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnd19pbnB1dF9XYXJuJyk7XHJcbiAgICAgICAgICAgIGxldCBvVGFyZ2V0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGJWYWxpZCxcclxuICAgICAgICAgICAgICAgIGVycm9yTXNnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCQodGhpcykuYXR0cignY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnanNfaW5wdXRFbSc6IC8vIOmCrueusVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbVZhbCA9IFV0aWxGbi5yZW1vdmVMYXN0QmxhbmsodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsRm4uaXNFbWFpbChlbVZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSB2YWx1ZSA9PT0gJycgPyAn6YKu566x5LiN6IO95Li656m6JyA6ICfpgq7nrrHmoLzlvI/plJnor6/vvIzor7fph43mlrDovpPlhaUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2pzX2lucHV0UGgnOiAvLyDmiYvmnLpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbEZuLmlzUGhvbmVWYWxpZCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSB2YWx1ZSA9PT0gJycgPyAn5omL5py65LiN6IO95Li656m6JyA6ICfmiYvmnLrmoLzlvI/plJnor6/vvIzor7fph43mlrDovpPlhaUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2pzX2lucHV0UHN3JzogLy8g5a+G56CBXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxGbi5pc1Bhc3N3b3JkVmFsaWQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxGbi51cGRhdGVGb3JtRXJyb3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBhdHRyT2JqLnN5bWJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogb1RhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5YaF5a6556ym5ZCI5p2h5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybicpLmFkZENsYXNzKCd3X2lucHV0X1ZhbGlkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDogZTliqjmo4Dmn6Xnoa7orqTlr4bnoIFcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0UHN3Q29uZmlybSA9ICcuanNfaW5wdXRQc3dfQ29uZmlybScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwc3dDb25maXJtVmFsID0gJChpbnB1dFBzd0NvbmZpcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbmZpcm1QYXJlbnQgPSAkKGlucHV0UHN3Q29uZmlybSkucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwc3dDb25maXJtVmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmo4Dmn6Xlr7nosaHosIPmlbTkuLrogZTliqjlr7nosaFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9UYXJnZXQgPSBpbnB1dFBzd0NvbmZpcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHN3Q29uZmlybVZhbCA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29uZmlybVBhcmVudC5yZW1vdmVDbGFzcygnd19pbnB1dF9XYXJuJykuYWRkQ2xhc3MoJ3dfaW5wdXRfVmFsaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbmZpcm1QYXJlbnQucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfVmFsaWQnKS5hZGRDbGFzcygnd19pbnB1dF9XYXJuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSAn5Lik5qyh5a+G56CB5LiN5LiA6Ie0JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyT2JqLmlkID0gJChvVGFyZ2V0KS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJPYmouY2xhc3MgPSAkKG9UYXJnZXQpLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9iai5vcmRlciA9ICQob1RhcmdldCkuYXR0cignZGF0YS1vcmRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYlZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gdmFsdWUgPT09ICcnID8gJ+WvhueggeS4jeiDveS4uuepuicgOiAn5a+G56CB5qC85byP6ZSZ6K+v77yM6K+36YeN5paw6L6T5YWlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9iai5pZCA9ICQob1RhcmdldCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9iai5jbGFzcyA9ICQob1RhcmdldCkuYXR0cignY2xhc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9iai5vcmRlciA9ICQob1RhcmdldCkuYXR0cignZGF0YS1vcmRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2pzX2lucHV0UHN3X0NvbmZpcm0nOiAvLyDnoa7orqTlr4bnoIFcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09ICcnICYmIHZhbHVlID09PSAkKCcuanNfaW5wdXRQc3cnKS52YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9ICfkuKTmrKHlr4bnoIHkuI3kuIDoh7QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxGbi51cGRhdGVGb3JtRXJyb3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIGJWYWxpZCxcclxuICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IGF0dHJPYmouc3ltYm9sLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogb1RhcmdldFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBVdGlsRm4udXBkYXRlRm9ybUVycm9yKHtcclxuICAgICAgICAgICAgICAgICAgICBiVmFsaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBhdHRyT2JqLnN5bWJvbCxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG9UYXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGF0dHJPYmouaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IGF0dHJPYmouY2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXI6IGF0dHJPYmoub3JkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXNnOiBlcnJvck1zZ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbEZuLnNldFRpcChlcnJvck1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOWGheWuueespuWQiOadoeS7tlxyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCd3X2lucHV0X1dhcm4nKS5hZGRDbGFzcygnd19pbnB1dF9WYWxpZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlr4bnoIHmmL7pmpDlpITnkIZcclxuICAgICAgICBpZiAoaXNQYXNzd29yZCkge1xyXG4gICAgICAgICAgICAkKCcuanNfcHN3VG9nZ2xlJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnRzKCdmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnd19pY29uX0V5ZUNsb3NlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCd3X2ljb25fRXllQ2xvc2UnKS5hZGRDbGFzcygnd19pY29uX0V5ZU9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1wc3d0b2dnbGVcIjogXCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnd19pY29uX0V5ZU9wZW4nKS5hZGRDbGFzcygnd19pY29uX0V5ZUNsb3NlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXVtkYXRhLXBzd3RvZ2dsZT1cInRydWVcIl0nKS5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8g5pu05pawbG9jYWxzdG9yYWdl6YeM55qE6ZSZ6K+v5L+h5oGv77yM55So5LqO5o+Q5Lqk5pe25qOA5p+l5L2/55SoXHJcbiAgICB1cGRhdGVGb3JtRXJyb3I6IGZ1bmN0aW9uIChvUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IGJWYWxpZCA9IG9QYXJhbXMuYlZhbGlkLFxyXG4gICAgICAgICAgICBmb3JtU3ltYm9sID0gb1BhcmFtcy5zeW1ib2wsXHJcbiAgICAgICAgICAgIHRhcmdldCA9IG9QYXJhbXMudGFyZ2V0LFxyXG4gICAgICAgICAgICBpZCA9IG9QYXJhbXMuaWQsXHJcbiAgICAgICAgICAgIGNscyA9IG9QYXJhbXMuY2xhc3MsXHJcbiAgICAgICAgICAgIG9yZGVyID0gb1BhcmFtcy5vcmRlcixcclxuICAgICAgICAgICAgbXNnID0gb1BhcmFtcy5tc2c7XHJcblxyXG4gICAgICAgIGxldCBsb2NhbERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGZvcm1TeW1ib2wpKSxcclxuICAgICAgICAgICAgZXJyb3JMaXN0ID0gbG9jYWxEYXRhLmVycm9yLmxlbmd0aCA/IGxvY2FsRGF0YS5lcnJvciA6IFtdLFxyXG4gICAgICAgICAgICBiVXBkYXRlID0gZmFsc2U7IC8vIOWIpOaWreaYr+WQpuabtOaWsOmUmeivr+S/oeaBr1xyXG5cclxuICAgICAgICBlcnJvckxpc3QuZXZlcnkoKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3MgPT09ICQodGFyZ2V0KS5hdHRyKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICBiVXBkYXRlID0gdHJ1ZTsgLy8g5bey5pyJ6ZSZ6K+v5L+h5oGv77yM5YiZ5pu05pawXHJcbiAgICAgICAgICAgICAgICBiVmFsaWQgPyBhcnIuc3BsaWNlKGluZGV4LCAxKSA6IGl0ZW0ubXNnID0gbXNnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyDnu4jmraLlvqrnjq9cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyDnu6fnu63lvqrnjq9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOacquaciemUmeivr+S/oeaBr+S4lOmqjOivgeaciemUme+8jOWImea3u+WKoFxyXG4gICAgICAgIGlmICghYlVwZGF0ZSAmJiAhYlZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBlcnJvckl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIGNsYXNzOiBjbHMsXHJcbiAgICAgICAgICAgICAgICBvcmRlcixcclxuICAgICAgICAgICAgICAgIG1zZ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8g6K6+572u5o+Q56S65o6S5bqPXHJcbiAgICAgICAgICAgIC8vIOS7jjDlvIDlp4vkuKXmoLzmjInnhafljYfluo/mjpLluo/vvIzov5nml7ZvcmRlcuWPquiDveWwj+S6juaIluetieS6jmVycm9yTGlzdC5sZW5ndGhcclxuICAgICAgICAgICAgaWYgKE51bWJlcihvcmRlcikgPj0gZXJyb3JMaXN0Lmxlbmd0aCkgeyAvLyDmt7vliqDliLDmlbDnu4Tnu5PlsL5cclxuICAgICAgICAgICAgICAgIGVycm9yTGlzdC5wdXNoKGVycm9ySXRlbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIOa3u+WKoOWIsOaMh+WumuS9jee9rlxyXG4gICAgICAgICAgICAgICAgbGV0IGFmdGVySW5kZXg7XHJcbiAgICAgICAgICAgICAgICBlcnJvckxpc3QuZXZlcnkoKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKG9yZGVyKSArIDEgPT09IE51bWJlcihpdGVtLm9yZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8g57uI5q2i5b6q546vXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIOe7p+e7reW+queOr1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JMaXN0LnNwbGljZShhZnRlckluZGV4LCAwLCBlcnJvckl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShmb3JtU3ltYm9sLCBKU09OLnN0cmluZ2lmeSh7XCJlcnJvclwiOiBlcnJvckxpc3QsIFwiaW5wdXRCbHVyXCI6IChiVmFsaWQgPyBcImZhbHNlXCIgOiBcInRydWVcIil9KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oZm9ybVN5bWJvbCkpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5mb3Jt6KGo5Y2V5o+Q5Lqk5oyJ6ZKuXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc2V0U3VibWl0QnRuOiBmdW5jdGlvbiAodGFyZ2V0LCB2YWxpZENhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGF0dHJPYmogPSB7XHJcbiAgICAgICAgICAgIHN5bWJvbDogJCh0YXJnZXQpLmF0dHIoJ2RhdGEtc3ltYm9sJyksIC8vIOeUqOS6juagh+iusGZvcm3ooajljZXnmoTlh7rplJnkv6Hmga9cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKHRhcmdldCkuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50cygnZm9ybScpLmZpbmQoJ2lucHV0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3dfaW5wdXRfV2FybicpOyAvLyDph43nva7ooajljZXlhoXovpPlhaXmoYbnmoTplJnor6/moLflvI9cclxuICAgICAgICAgICAgbGV0IGxvY2FsRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYXR0ck9iai5zeW1ib2wpKSxcclxuICAgICAgICAgICAgICAgIGVycm9yTGlzdCA9IGxvY2FsRGF0YS5lcnJvci5sZW5ndGggPyBsb2NhbERhdGEuZXJyb3IgOiBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvckxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvckxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIGl0ZW0uaWQpLnBhcmVudCgpLmFkZENsYXNzKCd3X2lucHV0X1dhcm4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2NhbERhdGEuaW5wdXRCbHVyID09PSAndHJ1ZScpIHsgLy8g6L6T5YWl5qGG5aSx54Sm77yM5o+Q56S66Ieq6Lqr6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYXRhLmlucHV0Qmx1ciA9ICdmYWxzZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYXR0ck9iai5zeW1ib2wsIEpTT04uc3RyaW5naWZ5KGxvY2FsRGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8g6Z2e6L6T5YWl5qGG5aSx54Sm77yM5o+Q56S66auY5LyY5YWI57qn6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbEZuLnNldFRpcChlcnJvckxpc3RbMF0ubXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ajgOafpemAmui/h+WbnuiwgycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtVdGlsRm59OyIsIi8qKlxuICog5YWo5bGA5Y+Y6YeP6YWN572uXG4gKiBcbiAqL1xubGV0IENvbW1vblZhciA9IHtcbiAgICBsaXN0Q29udGVudFdpZHRoOiAwLFxuICAgIGN1cnJlbnRUaW1lOiBuZXcgRGF0ZSgpLFxufVxuXG5leHBvcnQge0NvbW1vblZhcn07Il19
