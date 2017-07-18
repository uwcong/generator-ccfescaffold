/**
 * document ready and window onload
 * 
 */
import {CommonVar} from './common/_var.js';
import {UtilFn} from './common/_util.js';

$(function() {
    FastClick.attach(document.body);

    $('#triggerTip').bind('click', function () {
        UtilFn.setTip('TIP');
    });

    $('#triggerDialog').bind('click', function () {
        UtilFn.setDialog({
            title: 'Dialog title',
            content: 'Dialog content',
            isDoubleAction: true
        });
    });
    
    $('#triggerLoading').bind('click', function () {
        UtilFn.setLoading();
    });

    $('tag-input').each(function() {
        UtilFn.setInput(this);
    });
});
window.onload = function() {}