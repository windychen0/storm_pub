// const md5 = require('js-md5');

// console.log(md5('123456'));







// const {addUser} = require('./mysql/user.js');

// addUser({name:"chenb",password:"12222222222222222222222222222222",desc:"没有描述",email:"1819588531@qq.com",phone:"13129756249"})
// .then(res=>{console.log({res})})


// const sql = new (require('./mysql/base.js'))({tableName:"user"});

// sql.updata({email:"chen00n@gmail.com"},{name:"chen",status:"1"}).then(res=>{console.log(res)});



const {register} = require('./api/user.js');

register({name:"chenleqiang",password:"12222222222222222222222222222222",desc:"没有描述",email:"1819588531@qq.com",phone:"13129756249"}).then(res=>{
    console.log(res);
}).catch(e =>{
    console.log(e);
})