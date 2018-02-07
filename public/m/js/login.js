$(function(){
    // 点击登陆按钮提交数据
    $("#main>form>.mui-button-row>a").on("click",function(){
        // 找到用户名的val
        var username=$("#main>form .mui-input-clear").val();
        var password=$("#main>form .mui-input-password").val();
        if(!username.toString()||!password.toString()){
            mui.toast('请输入用户名和密码',{ duration:'long', type:'div' });
            return;
        }else{
           $.ajax({
            url:"/user/login",
            data:{
                username:username,
                password:password,
            },
            type:"post",
            success:function(data){
                if(data.error){
                    mui.toast(data.message,{ duration:'long', type:'div' });
                }else{
                    window.location="userCenter.html";
                }
            }
        }) 
       }
    })
})
