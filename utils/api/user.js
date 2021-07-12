const mysql = require('../mysql/user.js');
const redis = require('../redis/user.js');


module.exports = {
    register:function(info){
        console.log(info);
        return Promise.all([mysql.register(info),redis.register(info)])
    }
}