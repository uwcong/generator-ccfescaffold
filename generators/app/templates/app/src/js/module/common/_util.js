/**
 * 工具方法
 * @author Cc
 * 
 */

let UtilFn = {
    // 动态设置html的font-size，用于rem的计算
    setHtmlFontSize: function (doc, win) {
        let docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                let clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = (clientWidth * 0.1) + 'px';
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        // DOM加载之后及资源加载之前去执行，即对应jQuery中的document ready
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },

    // 获取location search参数，返回一个search对象
    getLocationSearchObj: function (qstring) {
        let splitUrl = qstring.split("?");
        let strUrl = (splitUrl.length > 1) ? decodeURIComponent(splitUrl[1]).split("&") : [];
        let str = "";
        let obj = {};
        for (let i = 0, l = strUrl.length; i < l; i++) {
            str = strUrl[i].split("=");
            obj[str[0]] = str[1];
        }
        return Array.prototype.sort.call(obj);
    },

    // 判断环境
    isiOS: function () {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    isAndriod: function () {
        return /android/.test(navigator.userAgent.toLowerCase());
    },
    isWeChat: function () {
        return /micromessenger/.test(navigator.userAgent.toLowerCase());
    },
    isPc: function () {
        let userAgentInfo = navigator.userAgent.toLowerCase();
        let agents = ["android", "iphone", "ipad", "ipod", "symbianos", "windows phone"];
        let flag = true;
        for (let i = 0; i < agents.length; i++) {
            if (userAgentInfo.indexOf(agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },

    // 邮箱格式验证
    isEmail: function (str) {
        return /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]+)+)$/.test(str);
    },

    // 手机格式验证: 不少于7位数字
    isPhoneValid: function (str) {
        return /^[0-9]{7,}$/.test(str);
    },

    // 密码格式验证: 7-20位数字或者字母
    isPasswordValid: function (str) {
        return /^[a-zA-Z0-9]{7,20}$/.test(str);
    },

    // 时间戳转换格式
    date: function (s, fmt) {
        if (typeof s == "string") {
            s = Number(s);
        }
        fmt = fmt || "yyyy-MM-dd hh:mm:ss";
        let date = new Date(s);
        if (typeof s == "object") {
            date = s;
        }
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    },

    // 设置cookie
    setCookie: function (name, value, days) {
        days = days || 0;
        let expires = "";
        if (days != 0) { //设置cookie过期时间  
            let date = new Date();
            let ms = days * 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + ms);
            expires = "; expires=" + date.toGMTString();
        }
        if (days == Infinity) { // 设置最大过期时间
            expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    // 获取cookie
    getCookie: function (name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';'); //把cookie分割成组  
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]; //取得字符串  
            while (c.charAt(0) == ' ') { //判断一下字符串有没有前导空格  
                c = c.substring(1, c.length); //有的话，从第二位开始取  
            }
            if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name  
                return c.substring(nameEQ.length, c.length);
            }
        }
        return false;
    },

    // 清除cookies
    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    },

    // 获取特定localstorage
    getLocalStorage: function (key, callback) {
        let data = window.localStorage.getItem(key);
        if (data) {
            callback(data);
        } else {
            data = null;
        }
    },

    // 去掉结尾空格
    removeLastBlank: function (value) {
        return value.replace(/(\s*$)/g, "");
    },

    // 设置弹窗垂直居中
    setPopupVerticalMid: function (domObj) {
        if ($(domObj)) {
            let popupHeight = $(domObj).height(),
                winHeight = $(window).height();
            $(domObj).css({
                'top': (winHeight - popupHeight) / 2,
            })
        } else {
            alert("Popup is not exist！");
        }
    },

    // 生成弹窗
    addPopup: function (content, bClose) {
        this.delPopup();
        let that = this;
        $('body').append('<div class="m_popup" id="popup"><div class="mask" id="popupMask"></div>' + content + '</div>');
        if (bClose) {
            $('#popupMask').bind('click', function () {
                that.delPopup();
            });
        }
    },
    // 删除弹窗
    delPopup: function () {
        $('#popup').remove();
    },

    // 提示
    setTip: function (sTip, oParams) {
        $('body').append('<span class="w_tip js_tip"><span class="text">' + sTip + '</span></span>');
        setTimeout(function () {
            $('.js_tip').remove();
            if (oParams && oParams.callback) oParams.callback();
        }, (oParams && oParams.msec ? oParams.msec : 1000));
    },

    // 设置全局加载
    setLoading: function (sText) {
        let text = sText || 'Loading...';
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
    setDialog: function (oDialogParams, bClose) {
        let title = oDialogParams.title ? oDialogParams.title : 'Title',
            content = oDialogParams.content,
            actionText = oDialogParams.actionText ? oDialogParams.actionText : 'Get it',
            leftActionText = oDialogParams.leftActionText ? oDialogParams.leftActionText : 'Cancel',
            leftActionStyle = oDialogParams.leftActionStyle ? ' style="' + oDialogParams.leftActionStyle + '"' : '',
            rightActionText = oDialogParams.rightActionText ? oDialogParams.rightActionText : 'Confirm',
            rightActionStyle = oDialogParams.rightActionStyle ? ' style="' + oDialogParams.rightActionStyle + '"' : '';

        let ActionTmpl;
        if (oDialogParams.isDoubleAction) {
            ActionTmpl = '<section class="ft ft_Double">' +
                '<a href="javascript:;" id="leftAction"' + leftActionStyle + '>' + leftActionText + '</a>' +
                '<a href="javascript:;" id="rightAction"' + rightActionStyle + '>' + rightActionText + '</a>' +
                '</section>';
        } else {
            ActionTmpl = '<section class="ft">' +
                '<a href="javascript:;" id="action">' + actionText + '</a>' +
                '</section>';
        }

        let tmpl = '<div class="m_dialog" id="dialog">' +
            '<section class="hd"><span class="title">' + title + '<span></section>' +
            '<section class="bd">' + content + '</section>' +
            ActionTmpl +
            '</div>';

        this.addPopup(tmpl, (bClose ? true : false));
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

        let that = this;
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
    setInput: function (target) {
        // 生成模板
        let attrObj = {
            id: $(target).attr('data-id'),
            class: $(target).attr('data-class'),
            type: $(target).attr('data-type'),
            value: $(target).attr('data-value'),
            label: $(target).attr('data-label'),
            symbol: $(target).attr('data-symbol'), // 用于标记form表单的出错信息
            order: $(target).attr('data-order'), // 用于决定提交时出错信息的顺序， 从0开始严格升序排序，提示数值最小值对应的内容
        };
        let customTmpl = '',
            isPassword = attrObj.type === 'password' && $('.js_pswToggle').length === 0 ? true : false; // 一个form表单只能有一个实际的密码框，不算密码确认框
        if (isPassword) customTmpl = '<span class="w_icon w_icon_EyeClose js_pswToggle"></span>';
        let tmpl = '<div class="w_input' + (isPassword ? ' w_input_Psw' : '') + '">\
                        <input id="' + attrObj.id + '" class=' + attrObj.class + ' type=' + attrObj.type + ' value="' + attrObj.value + '" data-order=' + attrObj.order + ' />\
                        <label>' + attrObj.label + '</label>\
                        ' + customTmpl + '\
                    </div>';
        $(target).after(tmpl).remove();

        // 设置错误信息到localstorage
        let localData = JSON.parse(localStorage.getItem(attrObj.symbol) || '{}'),
            errorList = (localData.error && localData.error.length) ? localData.error : [],
            errorItem = {
                id: attrObj.id,
                class: attrObj.class,
                order: attrObj.order
            };
        switch (attrObj.class) {
            case 'js_inputEm': // 邮箱
                errorItem['msg'] = "邮箱不能为空";
                break;
            case 'js_inputPh': // 手机
                errorItem['msg'] = "手机不能为空";
                break;
            case 'js_inputPsw': // 密码
                errorItem['msg'] = "密码不能为空";
                break;
            case 'js_inputPsw_Confirm': // 确认密码
                errorItem['msg'] = "确认密码不能为空";
                break;
            default:
                break;
        }
        errorList.push(errorItem);
        localStorage.setItem(attrObj.symbol, JSON.stringify({"error": errorList, "inputBlur": "false"}));

        // 聚焦、输入、失焦处理
        $('.' + attrObj.class).bind('focus', function() { // 聚焦，处理样式
            let $parent = $(this).parent();
            $parent.removeClass('w_input_Warn w_input_Valid').addClass('w_input_Active');
        }).bind('keyup', function() { // 输入，处理样式、删除按钮
            let $parent = $(this).parent(),
                $del = $parent.children('.js_inputDel');
            if ($del) {
                $del.remove();
                if (!$(this).val()) return;
            }
            
            let that = this,
                delTemp = '<span class="w_icon w_icon_InputDel js_inputDel"></span>';
            $parent.append(delTemp);
            $del = $parent.children('.js_inputDel');
            $del.bind('click', function () {
                $(this).remove();
                $('.js_tip').remove();
                $(that).val('');
                that.focus();
            });
        }).bind('blur', function() { // 失焦，处理样式、错误提示
            let $parent = $(this).parent(),
                value = $(this).val();
            $parent.removeClass('w_input_Active');

            // 内容不符合条件
            $parent.addClass('w_input_Warn');
            let oTarget = this,
                bValid,
                errorMsg;
            switch ($(this).attr('class')) {
                case 'js_inputEm': // 邮箱
                    let emVal = UtilFn.removeLastBlank(value);
                    if (UtilFn.isEmail(emVal)) {
                        bValid = true;
                    } else {
                        bValid = false;
                        errorMsg = value === '' ? '邮箱不能为空' : '邮箱格式错误，请重新输入';
                    }
                    break;
                case 'js_inputPh': // 手机
                    if (UtilFn.isPhoneValid(value)) {
                        bValid = true;
                    } else {
                        bValid = false;
                        errorMsg = value === '' ? '手机不能为空' : '手机格式错误，请重新输入';
                    }
                    break;
                case 'js_inputPsw': // 密码
                    if (UtilFn.isPasswordValid(value)) {
                        bValid = true;
                        UtilFn.updateFormError({
                            bValid,
                            symbol: attrObj.symbol,
                            target: oTarget
                        });
                        // 内容符合条件
                        $parent.removeClass('w_input_Warn').addClass('w_input_Valid');

                        // 联动检查确认密码
                        let inputPswConfirm = '.js_inputPsw_Confirm',
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
                case 'js_inputPsw_Confirm': // 确认密码
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
                    bValid,
                    symbol: attrObj.symbol,
                    target: oTarget
                });
            } else {
                UtilFn.updateFormError({
                    bValid,
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
            $('.js_pswToggle').bind('click', function() {
                let $parent = $(this).parents('form');
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
    updateFormError: function (oParams) {
        let bValid = oParams.bValid,
            formSymbol = oParams.symbol,
            target = oParams.target,
            id = oParams.id,
            cls = oParams.class,
            order = oParams.order,
            msg = oParams.msg;

        let localData = JSON.parse(localStorage.getItem(formSymbol)),
            errorList = localData.error.length ? localData.error : [],
            bUpdate = false; // 判断是否更新错误信息

        errorList.every((item, index, arr) => {
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
            let errorItem = {
                id,
                class: cls,
                order,
                msg
            };

            // 设置提示排序
            // 从0开始严格按照升序排序，这时order只能小于或等于errorList.length
            if (Number(order) >= errorList.length) { // 添加到数组结尾
                errorList.push(errorItem);
            } else { // 添加到指定位置
                let afterIndex;
                errorList.every((item, index, arr) => {
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

        localStorage.setItem(formSymbol, JSON.stringify({"error": errorList, "inputBlur": (bValid ? "false" : "true")}));
        console.log(localStorage.getItem(formSymbol));
    },


    /**
     * 设置form表单提交按钮
     * 
     */
    setSubmitBtn: function (target, validCallback) {
        let attrObj = {
            symbol: $(target).attr('data-symbol'), // 用于标记form表单的出错信息
        };

        $(target).bind('click', function () {
            $(this).parents('form').find('input').parent().removeClass('w_input_Warn'); // 重置表单内输入框的错误样式
            let localData = JSON.parse(localStorage.getItem(attrObj.symbol)),
                errorList = localData.error.length ? localData.error : [];

            if (errorList.length) {
                errorList.forEach((item, index) => {
                    $('#' + item.id).parent().addClass('w_input_Warn');
                });

                if (localData.inputBlur === 'true') { // 输入框失焦，提示自身错误
                    localData.inputBlur = 'false';
                    localStorage.setItem(attrObj.symbol, JSON.stringify(localData));
                } else { // 非输入框失焦，提示高优先级错误
                    UtilFn.setTip(errorList[0].msg);
                }
                return;
            }

            console.log('检查通过回调');
        });
    }

}

export {UtilFn};