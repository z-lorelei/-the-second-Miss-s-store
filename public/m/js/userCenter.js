$(function(){
    // 点击退出登陆按钮,登出用户
    $("#main>div>a").on("tap",function(){
        $.ajax({
            url:"/user/logout",
            success:function(){
                window.location="login.html";
            }
        })
    })
})