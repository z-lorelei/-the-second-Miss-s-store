$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators:false, //是否显示滚动条
        bounce: true //是否启用回弹
    });
    $.ajax({
        url:"/category/queryTopCategory",
        success:function(data){
            console.log(data);
            var content=template('top-cate',data);
            //console.log(content);
            $("#main .cate-left").html(content);
        }
    });
    $("#main .cate-left").on("click","li a",function(){
        //console.log(this.getAttribute('index'));
        var index = this.getAttribute('index');
        get(index);
        $(this).parent().addClass('active').siblings().removeClass('active');
    })
    function get(id){
        $.ajax({
            url:"/category/querySecondCategory",
            data:{
                id:id,
            },
            success:function(data){
                console.log(data);
                $("#main .mui-row").html(template('second-cate',data));
            }
        })
    }
    get(1);
})