//生成一个token
const jwt = require('jsonwebtoken');

// jwt.verify(_token, "123456", (error, decoded) => {
    
//     if (error) {
//         console.log(error.message);
//     }
    
//     a = decoded;
// })


module.exports = {
    getToken : (info) => {
        return new Promise((res,rej)=>{
            jwt.sign({
                name: info.name,
                start: parseInt(new Date().getTime()/1000),
                long: info.long || 12 * 3600    //12小时
            }, info.password, (err, token) => {
                res(token);
            });
        })
    }
}