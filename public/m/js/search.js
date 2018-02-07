$(function(){
    // 1.1点击搜索获取输入框的内容
    $("#main form a").on("click",function(){
        var val = $(this).siblings().val();
        console.log(!val)
        console.log(!val.toString())
        console.log(!0)
        // 把val转成字符串,取反是为了判断有没有输入内容  返回false 就进入这里   return  不执行下面的代码,并提示(提示也可以不写)
        if(!val.toString())return mui.toast('请输入搜索内容',{duration:'long',type:'div'});
        // 1.2读取本地存储  并将字符串转成数组
        var history= JSON.parse(localStorage.getItem("historyData"))||[];
        //1.4 检测历史记录中是否存在val(>-1代表有该val),有就删除该val      从它开始删除一个
        history.indexOf(val)>-1?history.splice(history.indexOf(val),1):'';
        //1.5 将val 值push 到数组里
        history.push(val);
        console.log(history);
        // 1.6调用模板 将history渲染到页面上;                反转数据
        var html = template("historylist",{data:history.reverse()});
        $("#main div").html(html);
        //1.3存入本地  将数组转成字符串 并存入localStorage             反转数组
        localStorage.setItem("historyData",JSON.stringify(history.reverse()));
        // localStorage.getItem("historyData");
        console.log(localStorage.getItem("historyData"));
        window.location='searchList.html?val='+val;
    });
    //2一开始将数据渲染到页面上
    srender();

    //3.1 找到X  ,点击删除对应整条数据 
    $("#main div").on("click","li a:last-of-type",function(){
        //3.2获取点击对应的兄弟a 的html内容
        var val=$(this).siblings().data('val').toString();
        // 1.2读取本地存储  并将字符串转成数组
        var history= JSON.parse(localStorage.getItem("historyData"))||[];
        // 3.3 删除数组中的val
        console.log(history.indexOf(val));
        history.splice(history.indexOf(val),1);
        //1.6调用模板 将history渲染到页面上;
        var html = template("historylist",{data:history.reverse()});
        $("#main div").html(html);
        //1.3存入本地  将数组转成字符串 并存入localStorage             反转数组
        localStorage.setItem("historyData",JSON.stringify(history.reverse()));
    })
    // 4.1  点击删除全部,删除全部
    $("#main .p-right").on("click",function(){
        localStorage.clear("historyData");
        srender();
    })
})
function srender(){
    // 1.2读取本地存储  并将字符串转成数组
    var history= JSON.parse(localStorage.getItem("historyData"))||[];
    //1.6调用模板 将history渲染到页面上;
    var html = template("historylist",{data:history.reverse()});
    $("#main div").html(html);
}