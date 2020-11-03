$(function () {
    var layer = layui.layer
    var form = layui.form

    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                layer.msg('获取文章分类列表成功！')

                // 调用模板引擎  渲染分类下拉菜单
                var htmlStr = template('tpl-cate', res)

                $('[name=cate_id]').html(htmlStr)
                // 记得form 渲染
                form.render()
            }
        })


    }

})
