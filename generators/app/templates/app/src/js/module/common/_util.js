/**
 * 工具方法
 * @author Cc
 * 
 */

let UtilFn = {
    // 动态设置html的font-size，用于rem的计算
    setHtmlFontSize: function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
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
        var splitUrl = qstring.split("?");
        var strUrl = (splitUrl.length > 1) ? decodeURIComponent(splitUrl[1]).split("&") : [];
        var str = "";
        var obj = {};
        for (var i = 0, l = strUrl.length; i < l; i++) {
            str = strUrl[i].split("=");
            obj[str[0]] = str[1];
        }
        return Array.prototype.sort.call(obj);
    },

    // 判断邮箱正则
    isEmail: function (str) {
        return /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]+)+)$/.test(str);
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
    isPasswordValid: function (str) {
        return /^[a-zA-Z0-9]{7,20}$/.test(str);
    },

    // 手机格式验证: 不少于7位数字
    isPhoneValid: function (str) {
        return /^[0-9]{7,}$/.test(str);
    },

    // 时间戳转换格式
    date: function (s, fmt) {
        if (typeof s == "string") {
            s = Number(s);
        }
        fmt = fmt || "yyyy-MM-dd hh:mm:ss";
        var date = new Date(s);
        if (typeof s == "object") {
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
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    },

    // 设置cookie
    setCookie: function (name, value, days) {
        days = days || 0;
        var expires = "";
        if (days != 0) { //设置cookie过期时间  
            var date = new Date();
            var ms = days * 24 * 60 * 60 * 1000;
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
        var nameEQ = name + "=";
        var ca = document.cookie.split(';'); //把cookie分割成组  
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]; //取得字符串  
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

    // 去掉结尾空格
    removeLastBlank: function (value) {
        return value.replace(/(\s*$)/g, "");
    },

    // 设置弹窗垂直居中
    setPopupVerticalMid: function (domObj) {
        if ($(domObj)) {
            var popupHeight = $(domObj).height();
            $(domObj).css({
                'top': (GlobalConfig.viewHeight - popupHeight) / 2,
            })
        } else {
            alert("Popup is not exist！");
        }
    },

    // 生成弹窗
    addPopup: function (content, bClose) {
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
    delPopup: function () {
        $('#popup').remove();
    },

    // 设置全局加载
    setLoading: function (sText) {
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
    setDialog: function (oDialogParams) {
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
            ActionTmpl = '<section class="ft ft_Double">' +
                '<a href="javascript:;" id="leftAction"' + leftActionStyle + '>' + leftActionText + '</a>' +
                '<a href="javascript:;" id="rightAction"' + rightActionStyle + '>' + rightActionText + '</a>' +
                '</section>';
        } else {
            ActionTmpl = '<section class="ft">' +
                '<a href="javascript:;" id="action">' + actionText + '</a>' +
                '</section>';
        }

        var tmpl = '<div class="m_dialog" id="dialog">' +
            '<section class="hd"><span class="title">' + title + '<span></section>' +
            '<section class="bd">' + content + '</section>' +
            ActionTmpl +
            '</div>';

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
    setTip: function (sTip) {
        $('body').append('<span class="w_tip js_tip"><span class="text">' + sTip + '</span></span>');
        setTimeout(function () {
            $('.js_tip').remove();
        }, 1000);
    },
}

export {UtilFn};