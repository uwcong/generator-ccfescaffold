/**
 * 工具方法
 * @author Cc
 * 
 */
var UtilFn = {
    // 动态设置html的font-size，用于rem的计算
    setHtmlFontSize: function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
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
    getLocationSearchObj: function(qstring) {
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

    // 设置弹窗垂直居中
    setPopupVerticalMid: function(domObj) {
        if ($(domObj)) {
            var popupHeight = $(domObj).height(),
                widHeight = $(window).height();

            $(domObj).css({
                'top': (widHeight - popupHeight) / 2,
            })
        } else {
            alert("Popup is not exist！");
        }
    },

    // 判断邮箱正则
    isEmail: function(str) {
        return /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str);
    },

    // 判断环境
    isiOS: function() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    isAndriod: function() {
        return /android/.test(navigator.userAgent.toLowerCase());
    },
    isWeChat: function() {
        return /micromessenger/.test(navigator.userAgent.toLowerCase());
    },

    // jquery.countdown
    countDown: function() {
        ! function(a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery) }(function(a) {
            "use strict";

            function b(a) { if (a instanceof Date) return a; if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a); throw new Error("Couldn't cast `" + a + "` to a date object.") }

            function c(a) { var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"); return new RegExp(b) }

            function d(a) {
                return function(b) {
                    var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
                    if (d)
                        for (var f = 0, g = d.length; f < g; ++f) {
                            var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                                j = c(h[0]),
                                k = h[1] || "",
                                l = h[3] || "",
                                m = null;
                            h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString()))
                        }
                    return b = b.replace(/%%/, "%")
                }
            }

            function e(a, b) {
                var c = "s",
                    d = "";
                return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d
            }
            var f = [],
                g = [],
                h = { precision: 100, elapse: !1, defer: !1 };
            g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));
            var i = { Y: "years", m: "months", n: "daysToMonth", d: "daysToWeek", w: "weeks", W: "weeksToMonth", H: "hours", M: "minutes", S: "seconds", D: "totalDays", I: "totalHours", N: "totalMinutes", T: "totalSeconds" },
                j = function(b, c, d) { this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.firstTick = !0, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start() };
            a.extend(j.prototype, {
                start: function() {
                    null !== this.interval && clearInterval(this.interval);
                    var a = this;
                    this.update(), this.interval = setInterval(function() { a.update.call(a) }, this.options.precision)
                },
                stop: function() { clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped") },
                toggle: function() { this.interval ? this.stop() : this.start() },
                pause: function() { this.stop() },
                resume: function() { this.start() },
                remove: function() { this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance },
                setFinalDate: function(a) { this.finalDate = b(a) },
                update: function() { if (0 === this.$el.closest("html").length) return void this.remove(); var a, b = new Date; return a = this.finalDate.getTime() - b.getTime(), a = Math.ceil(a / 1e3), a = !this.options.elapse && a < 0 ? 0 : Math.abs(a), this.totalSecsLeft === a || this.firstTick ? void(this.firstTick = !1) : (this.totalSecsLeft = a, this.elapsed = b >= this.finalDate, this.offset = { seconds: this.totalSecsLeft % 60, minutes: Math.floor(this.totalSecsLeft / 60) % 60, hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24, days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368), weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7), weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4, months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368), years: Math.abs(this.finalDate.getFullYear() - b.getFullYear()), totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24), totalHours: Math.floor(this.totalSecsLeft / 60 / 60), totalMinutes: Math.floor(this.totalSecsLeft / 60), totalSeconds: this.totalSecsLeft }, void(this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))) },
                dispatchEvent: function(b) {
                    var c = a.Event(b + ".countdown");
                    c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c)
                }
            }), a.fn.countdown = function() {
                var b = Array.prototype.slice.call(arguments, 0);
                return this.each(function() {
                    var c = a(this).data("countdown-instance");
                    if (void 0 !== c) {
                        var d = f[c],
                            e = b[0];
                        j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
                    } else new j(this, b[0], b[1])
                })
            }
        });
    },

    // 时间戳转换格式
    date: function(s, fmt) {
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

    // 生成弹窗
    addDialogBox: function(content, contentId) {
        this.delDialogBox();
        $('body').append('<div class="m_dialog" id="dialogBox"><div class="mask" id="dialogBoxMask"></div>' + content + '</div>');
        if (contentId) UtilFn.setPopupVerticalMid(contentId);
    },
    // 删除弹窗
    delDialogBox: function() {
        $('#dialogBox').remove();
    },
}
/**
 * 全局变量配置
 * 
 */
var rebate_config = {
    listContentWidth: 0,
    currentTime: new Date(),
}
/**
 * document ready and window onload
 * 
 */
$(function() {});
window.onload = function() {
    // 设置列表宽度
    $('.js_listItem').each(function() {
        rebate_config.listContentWidth += $(this).outerWidth(true);
    });
    $('#listContent').css({ 'width': rebate_config.listContentWidth });

    // 倒计时
    UtilFn.countDown();
    var leftTimestamp = rebate_config.currentTime.getTime() + parseInt($('#leftTimeInSec').val()) * 1000;
    $('#countDown').countdown(leftTimestamp)
        .on('update.countdown', function(event) {
            var format = '%H : %M : %S';
            if (event.offset.totalDays > 0) {
                format = '%-d day%!d ' + format;
            }
            if (event.offset.weeks > 0) {
                format = '%-w week%!w ' + format;
            }
            $(this).html(event.strftime(format));
        })
        .on('finish.countdown', function(event) {
            $(this).html('00 : 00 : 00');
            $('#endText').html('活動已結束，敬請期待下次活動');
            $('.js_getAward').addClass('w_button_Disabled');
            $('.js_getAward').bind('click', function(e) {
                e.preventDefault();
            });
        });
}


/**
 * 交互操作
 * 
 */
$('#closeDialog').bind('click', function() {
    try {
        // ios
        if (UtilFn.isiOS() && webkit && webkit.messageHandlers) {
            webkit.messageHandlers.closeDialog.postMessage(null);
        }
        // android
        if (UtilFn.isAndroid() && sharesdk) {
            sharesdk.closeWindows();
        }
    } catch (e) {
        console.log(e);
    }
})