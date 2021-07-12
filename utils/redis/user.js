const redis = require('./index.js');

// redis.rpop("userErrorList",(err,res)=>{
//     console.log();
// })

function addUser(data) {
    return new Promise((resolve, rej) => {
        redis.hmset( "username" + data.name , data, (err, res) => {
            if (!err) {
                redis.sadd("userNameList",data.name);
                resolve(res);
            }
        })
    })
}

module.exports = {
    register:addUser,
}