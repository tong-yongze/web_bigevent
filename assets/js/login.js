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
        ]
    }
    )
})