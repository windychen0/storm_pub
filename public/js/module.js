'use strict';
window.$ = window.jQuery = layui.$;

//跳转方法
function goto(router){
    location.href = '/' + router
}

//监听回车
function onEnter(e,fn,objArg){
    if(e.keyCode === 13){
        fn(objArg);
    }
}

//- 自定义a标签title显示
 $(function() {
     var x = 20;
     var y = 30;
     $("a.tplink").mouseover(function(e) {
         this.myTitle = this.title;
         this.title = "";
         var tooltip = "<div id='tplink'>" + this.myTitle + "</div>"; //创建DIV元素
         $("body").append(tooltip); //追加到文档中
         $("#tplink").css({
             "top": (e.pageY + y) + "px",
             "left": (e.pageX + x) + "px"
         }).show(); //设置X  Y坐标， 并且显示
     }).mouseout(function() {
         this.title = this.myTitle;
         $("#tplink").remove(); //移除
     }).mousemove(function(e) {
         $("#tplink").css({
             "top": (e.pageY + y) + "px",
             "left": (e.pageX + x) + "px"
         });
     })
 });


 //- 登录注册表单提交
 layui.form.on('submit(formDemo)', function(data) {
     layer.msg(JSON.stringify(data.field));
     return false;
 });


//- 骚东西
document.addEventListener('visibilitychange', () => {
    if(document.visibilityState!=="visible"){
        document.nextTitle = document.title;
        document.title = "2020高清无码十大步兵番";
    }else{
        document.title = document.nextTitle || "陈的风暴酒馆";
    }
})

console.info("%c ", "background: url(http://localhost:4000/images/elephant.gif) no-repeat center;padding-left:400px;padding-bottom: 160px;background-size:400px");


