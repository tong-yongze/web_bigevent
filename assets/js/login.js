$(function () {
    // 去注册
    $('#link_reg').on('click', function () {
        // 隐藏登录框
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 去登录
    $('#link_login').on('click', function () {
        // 隐藏注册框
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 通过形参拿到确认密码框内的内容
            // 需要拿到密码框的内容
            // 进行一次判断 如果不一致就返回提示
            var pwd = $('.reg-box[name=password]').val();
            if (pwd !== value) {
                return '两次输入不一致'
            }
        }
    }
    )
})