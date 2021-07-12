
//业务方法类

class User {
    
    constructor(arg) {
        
        this.formatFn(arg);
        
    }
    
    formatInfo(arg){
        
       let list = ["name","password","desc","email","phone"];
       
       let info = {};
       
       for(let i = 0;i<list.length;i++){
           
           info[list[i]] = arg[list[i]];
           
           //{name:"chenxxx",password:"12222222222222222222222222222222",desc:"没有描述",email:"1819588531@qq.com",phone:"13129756249"}
           
       }
       
       return info;
    }
    
    formatFn(fn){
        
        for(let key in fn){
            
            this[key] = fn[key];
            
        }
        
    }
}

const moduleList = [];

module.exports = {
    User
}