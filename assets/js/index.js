$(function () {
    // 获取用户的基本信息
    getUserInfo()
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!');
            }
            renderAvatat(res.data)
        },

        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 1.清空 token
        //         localStorage.removeItem('token');
        //         // 2 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }

    })
}

function renderAvatat(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;:' + name);
    // 3.按需渲染头像
    if (user.user_pic !== null) {
        // 3.1 如果不为空 就显示layui头像 隐藏文本头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 如果是空  就隐藏layui   显示文本头像  并把首字 大写
        $('.layui-nav-img').hide()
        // name.charAt(0)
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
getUserInfo()
var layer = layui.layer
$('#btnLogout').on('click', function () {
    layer.confirm('你确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        // 1.清空本地token
        localStorage.removeItem('token')
        // 2.跳转到登录页
        location.href = '/login.html'
        // 3.关闭确认框
        layer.close(index);
    });
})