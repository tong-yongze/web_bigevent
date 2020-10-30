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
        $('.login-box').show()
        $('.reg-box').hide()
    })
})