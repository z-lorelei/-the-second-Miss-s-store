/**
 * Created by zhy on 2018/1/28.
 */
window.addEventListener('load',function () {
    var init=new Init();
    init.initCarousel();
    init.initScroll();
});
function Init() {

}
Init.prototype={
    initCarousel:function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    initScroll:function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }
}