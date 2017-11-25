import Style from '../sass/main.scss';
import $ from 'jquery';
import FastClick from 'fastclick';
import CommonVar from './module/common/_var.js';
import UtilFn from './module/common/_util.js';

$(function() {
    FastClick.attach(document.body);

    $.get('/femock/getDemo?id=1', function( data ) {
        console.log(data);
    });

    $.ajax({
        url: '/femock/postDemo',
        type: 'POST',
        data: {
            "id": "1"
        },
        dataType: 'JSON',
        success: function (data, textStatus, jqXHR) {
            console.log("%c mock response: ", "background: green;color: #fff", data);
        },
        timeout: 10000,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("%c mock response: ", "background: red;color: #fff", jqXHR);
            console.log("%c mock response: ", "background: red;color: #fff", textStatus);
        }
    });

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

    (() => {
        $('form').each((index, item) => {
            localStorage.setItem($(item).attr('data-symbol'), '');
        });
        $('tag-input').each((index, item) => {
            UtilFn.setInput(item);
        });
        $('.js_formSubmit').each((index, item) => {
            UtilFn.setSubmitBtn(item);
        })
    })() 
});
