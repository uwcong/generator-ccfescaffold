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