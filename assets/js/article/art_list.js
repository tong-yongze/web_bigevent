$(function () {
    var layer = layui.layer
    var form = layui.form
    // 分页
    var laypage = layui.laypage;

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()

        var m = padZero(dt.getMonth() + 1)

        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        // return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    };


    initTable();
    initCate();
    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                // var htmlStr = template('tpl-table', {
                //     data: [
                //         { Id: 28476, title: "济南", pub_date: "2020-10-29 23:04:33.407", state: "已发布", cate_name: "改我头条试试" }]
                // });



                // 调用渲染分页方法是在什么情况下再去做呢？
                // 1. 先是通过发请求 获取到列表数据
                // 2. 获取成功后 通过模板引擎渲染页面数据  当我们的页面渲染出来后
                // 3.接下来需要调用分页的方法
                renderPage(res.total)
            }
        })
    }

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项 
                var htmlStr = template('tpl-cate', res)
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)

                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    // 为筛选表单绑定 submit 事件 
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        //根据最新的筛选条件  重新渲染表格中的数据
        initTable()
    })

    // 渲染分页求区域
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            elem: 'pageBox', // 存放分页的容器
            count: total,  // 数据总数
            limit: q.pagesize, // 每页显示的条数
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 4, 10],
            // 分页发生切换的时候 触发 jump 回调
            jump: function (obj, first) {
                // console.log(first);
                // console.log(obj.curr);
                // 把最新的页码值  赋值到q 这个查询参数对象中
                q.pagenum = obj.curr
                q.pagesize = obj.limit  // 当切换条目时 会触发jump 回调 通过obj.limit 拿到切换过后最新的条目数  然后赋值到q这个对象pagesize中 最后发请求拿数据
                // 如果不是ture  就是点击页码的时候 会触发jump回调
                // 如果是ture  就是调用了laypage.render()方法 
                if (!first) {
                    initTable()
                }
            }
        });
    }

    // 删除按钮
    $('tbody').on('click', '.btn-delete', function () {
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        // 获取按钮删除的个数
        var len = $('.btn-delete').length
        // console.log('ok'); 
        layer.confirm('你确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: `/my/article/delete/${id}`,

                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    // 当数据删除完成后  需要判断当前这一页中 是否还有剩余的数据   如果木有 就让页码值-1  再去调用 initTable 方法
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }

                    // 重新获取 渲染
                    initTable()
                }
            })

            layer.close(index);
        });
    })
})