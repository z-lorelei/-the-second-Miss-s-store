$(function(){
    // 点击注册按钮触发事件
    $("#main>form>.mui-button-row>button").on("tap",function(){
        
        var clear = $("#main>form>div:nth-of-type(1)>input").val();
        var password = $("#main>form>div:nth-of-type(2)>input").val();
        var verifyPassword = $("#main>form>div:nth-of-type(3)>input").val();
        var mobile = $("#main>form>div:nth-of-type(4)>input").val();
        var vCode = $("#main>form>div:nth-of-type(5)>input").val();
        // 输入框的非空验证,有一个没输入就不请求Ajax
        if(!clear.toString()||!password.toString()||!verifyPassword.toString()||!mobile.toString()){
            mui.toast('请检查是否全部输入',{ duration:'long', type:'div' });
            return;
        }
        if(password!==verifyPassword){
            mui.toast('请检查两次密码输入是否一致',{ duration:'long', type:'div' });
            return;
        }
            else{
            $.ajax({
                url:"/user/register",
                data:{
                    username:clear,
                    password:password,
                    mobile:mobile,
                    vCode:vCode,
                },
                type:"post",
                success:function(data){
                    console.log(data);
                    if(data.error){
                        mui.toast(data.message,{ duration:'long', type:'div' });  
                    }else{
                        window.location="login.html";
                    }
                }
            })
        }
    })

    // 点击获取验证码
    $("#main>form>button").on("tap",function(){
        $.ajax({
            url:"/user/vCode",
            success:function(data){
                console.log(data.vCode)
            }
        })
    })
})