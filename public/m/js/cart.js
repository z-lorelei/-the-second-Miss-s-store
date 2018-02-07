$(function(){
    // 点击编辑按钮,编辑数据   多处使用,封装函数
    result();
    // 点击编辑按钮,渲染页面,   注意,现在html 写script循环模板,存入需要查询的值 data-type="{{value.***}}"  ,然后直接取值
    $("#main").on("tap","ul>li>div:nth-of-type(1)>a:nth-of-type(1)",function(){
        // 定义一个对象,等会要存数据
        var data = {};
        // 定义一个空的数组,用来放鞋码
        var arr = [];
        var $id=$(this).data("id");
        var $size=$(this).data("size");
        var $nowsize = $(this).data("nowsize");
        var nums=$(this).data("nums");
        // 鞋码最小 第一个是字符串 /1 将它转成数字
        var min = $size.split("-")[0]/1;
        var max = $size.split("-")[1];
        // 循环鞋码尺寸,并push 到刚定义的arr数组中
        for(var i = min; i<=max;i++){
            arr.push(i);
        }
       data.nums=nums;
       data.arrr=arr;
       data.size = $nowsize;
    //    data.num = $(this).data("num");
       var number = template("number",data);
       console.log(data);
        mui.confirm(number,'编辑商品', ['确定', '取消'],function (e) {
            if(e.index==0){
                var updatasize = $("#automatic>ul>li.active").html();
                var updatanum =  mui("#automatic>div>div").numbox().getValue();
                console.log(updatasize,updatanum);
                $.ajax({
                    url:"/cart/updateCart",
                    data:{
                        id:$id,
                        size:updatasize,
                        num:updatanum,
                    },
                    type:"post",
                    success:function(data){
                        if(data.success){
                            result();
                        }
                    }
                })
            }
        });
        // 让选择按钮点按
    mui("#automatic>div>div").numbox().setValue($(this).data("num"));
    })
    // 点击哪个li标签让它高亮
    $("body").on("tap","#automatic>ul>li",function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
    
    // 点击删除按钮,删除数据
    $("#main").on("tap","ul>li>div:nth-of-type(1)>a:nth-of-type(2)",function(){
        //     console.log($(this).data("id"));
        //     $(this).data("id");
        //     $.ajax({
        //         url:"/cart/deleteCart",
        //         data:{
        //             id:$(this).data("id"),
        //         },
        //         success:function(data){
        //             console.log(data);
        //             if(data.success){
        //                 result();
        //             }
        //         }
        //     })
        // })
    var $id=$(this).data("id");
    mui.confirm("确认要删除吗？",'温馨提示', ['是', '否'],function (e) {
        if(e.index==0){
            $.ajax({
                url:'/cart/deleteCart',
                data:{
                    id:$id
                },
                success:function (data) {
                    if(data.success){
                        result();
                    }
                }
            })
        }
    });
});
// 定义一个原始价格
// var price = 0;


// 点击框框,拿到价格和数量,进行运算
$("#main").on("tap",".mui-table-view>li .cart-left>input",function(){
   var status= $(this).prop('checked')
    var price = $(this).data("price");
   var className = $(this).data("cname");
   var num= $("."+className).html()
    // totaprice += price ;
    // console.log($(this).data("price"));
    console.log($(this).prop('checked'));
    var finalPrice=$('.finalprice').html()/1;
    finalPrice= status?finalPrice-price*num:finalPrice+price*num
    $('.finalprice').html(finalPrice);
    console.log(className,price*num,finalPrice,$('.finalprice')[0]);
})
})

// 封装的函数
function result(){
     // 请求后台,检测用户有没有登陆
 $.ajax({
    url:"/cart/queryCart",
    success:function(data){
        console.log(data);
        data.reverse();
        // setTimeout(function () {
        //     console.log(data.reverse());
        // },1000);
        if(data.error){
            window.location="login.html";
        }else{
          $("#main").html(template("shopCar",{data1:data}))
        //   console.log(template("shopCar",{data1:data}));
        }
    }
  })
}
