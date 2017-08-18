/**
 * 全局变量配置
 * 
 */
import $ from 'jquery';

class CommonVar {
    constructor() {
        this.listContentWidth = 0;
        this.currentTime = new Date();
        this.formError = {
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
    }
}

export default new CommonVar();