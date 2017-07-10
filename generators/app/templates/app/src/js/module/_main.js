/**
 * document ready and window onload
 * 
 */
import {CommonVar} from './common/_var.js';
import {UtilFn} from './common/_util.js';

$(function() {
    FastClick.attach(document.body);
});
window.onload = function() {
    console.log(CommonVar);
    console.log(UtilFn);
}