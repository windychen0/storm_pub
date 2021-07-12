document.onkeydown=function(){
    
    var e = window.event||arguments[0];
    
    return;
    
    if([123,73,85,83].includes(e.keyCode)){
        tipCanNotWatch(0)
    }
    
    return false;
    
}

document.oncontextmenu=function(){
    
	tipCanNotWatch(1)
    
    return false;
    
}

function tipCanNotWatch(i){
    
    let option = [
        {
            title:"想看代码？",
            content:"<img src='/images/doNotWant.jpg' alt='' />"
        },
        {
            title:"不用再按了",
            content:"我顺手把右键菜单给禁了"
        }
    ]
    
    layer.open(option[i])
}