$(function () {
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    //  main 滚动条 
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


    // 获取地址栏的参数,传id
    var getid = getQueryString("id");
    // console.log(getQueryString("id"));
    $.ajax({
        url: "/product/queryProductDetail",
        data: {
            id: getid,
        },
        success: function (data) {
            var min = data.size.split("-");
            data.sizenum = [];
            console.log(min);
            // -1  把第一个强行转成数字 +1(不能先+1,会解析成拼接字符串)
            for (var i = min[0] - 1 + 1; i <= min[1]; i++) {
                data.sizenum.push(i);
            }
            console.log(data);
            $(".mui-scroll").html(template("detail", data));
            // 数字输入框  调用
            mui(".mui-numbox").numbox();
        }
    });
    //点击哪个尺码,对应的尺码高亮
    $(".mui-scroll-wrapper .mui-scroll").on("tap", "#main>ul>li", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
    })



    // 点击加入购物车按钮,获取选中码数及数量
    $("#footers .mui-row>div:nth-of-type(2)").on("tap", "a", function () {
        var lihtml = $("#main>ul>li.active").html();
        //   console.log(lival);
        if (lihtml == null) {
            mui.toast('请选择码数', {
                duration: 'long',
                type: 'div'
            });
            return;
        }
        var inputval = mui(".mui-numbox").numbox().getValue();
        //   console.log(inputval);
        if (inputval == 0) {
            mui.toast('请选择数量', { duration: 'long',type: 'div'})
            return;
        }
        // 请求后台获取id 数量 码数
        $.ajax({
            url: "/cart/addCart",
            data: {
                productId: getQueryString("id"),
                num: inputval,
                size: lihtml,
            },
            type: "post",
            success: function (data) {
                console.log(data);
                if(data.success){
                    // mui.toast('请先登陆', { duration: 'long',type: 'div'})
                    window.location="cart.html";
                }else{
                    window.location="login.html";
                }
            }
        })
    })


})

// 获取地址栏的参数
function getQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}