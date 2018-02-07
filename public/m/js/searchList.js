$(function(){
    
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: false,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                // console.log(123);
                search(true);
               
            } 
          },
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:false,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                // console.log(123);
                //当数据刷新完毕结束上拉刷新
                // mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                setTimeout('search(false);',1000);
            } 
          }
        
          
        }
      });

    //   点击搜索框  获取里头输入查询的内容
    // 移动端用tap  不用click;
      $(".mui-scroll form>a").on("tap",function(){
          var value = $(this).siblings("input").val();
          $.ajax({
              url:"/product/queryProduct",
              data:{
                proName:value,
                page:1,
                pageSize:10,
              },
              success:function(date){
                //   渲染到页面
                  $(".mui-content .mui-row").html(template("reveal",date));
              }
          })
      })
    //   点击价格 箭头朝上(升序).再点击朝下(降序)
    $("#sort a").on("tap",function(){
        // 判断有没有active类   有将它孩子的类有就变成没有,没有变成有
        $(this).hasClass("active")?$(this).find("i").toggleClass("fa-angle-down").toggleClass('fa-angle-up'):'';
        // 点击哪个就给哪个添加一个active的类,它的其他兄弟移除这个类,它的孩子添加向下箭头的类,删除向上箭头的类
        $(this).addClass('active').siblings().removeClass('active').find("i").addClass("fa-angle-down").removeClass("fa-angle-up");
        // data 直接放在函数里,不好操作   ,拿出来重新定义
        var datalist={page:1,pageSize:10};
        // 如果下面的i  有向下的类,就返回2,否则返回1(参数在接口里面找的)
        var stae=$(this).find("i").hasClass("fa-angle-down")?2:1;
        // 点击的这个有没有type  有就找到它的type  ,  没有就为空
       $(this).data('type')?datalist[$(this).data('type')]=stae:"";
       $.ajax({
           url:"/product/queryProduct",
           data:datalist,
           success:function(data){
        //    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            $(".mui-content .mui-row").html(template("reveal",data));
           }
       })
    })

    // 点击按钮转跳到商品详情页面 
    $(".mui-content .mui-row").on("tap",".mui-col-xs-6 .show>button",function(){
        window.location="detail.html?id="+$(this).data("id");
    })



    // 调用地址栏传参数
    var val =  getQueryString("val");
    $.ajax({
        url:"/product/queryProduct",
        data:{
            page:1,
            pageSize:10,
            proName:val,
        },
        success:function(data){
            $(".mui-content .mui-row").html(template("reveal",data));
        }
    })

    // 把搜索页面搜索的内容渲染到这个页面
    $(".mui-scroll>form>input").val(val);
})
var a=0;
// 传参  当trigger 为true 执行刷新完毕结束下拉刷新
function search(trigger){
    // 穿值判断是上拉还是下拉,
    trigger?a=1:a++;
    $.ajax({
        url:"/product/queryProduct",
        data:{
            page:a,
            pageSize:2,
        },
        success:function(date){
            console.log(date);
            // 当data的长度==0  
            if(date.data.length==0){
                // 就显示  ontentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                console.log(123);
                // return;
            }
            // 如果向下拉,则HTml中的内容为0
            trigger?$(".mui-content .mui-row").html(""):"";
            $(".mui-content .mui-row").append(template("reveal",date));
        }
    })
    // 当传的参为true 则执行前面代码,否则执行后面的代码
    if (trigger){
        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        // 重置上拉(不加这句下拉刷新后不能下拉加载了)
        mui('#refreshContainer').pullRefresh().refresh(true);
    }else {
        mui('#refreshContainer').pullRefresh().endPullupToRefresh();
    }
     //当数据刷新完毕结束下拉刷新
    //  mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); 
}
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