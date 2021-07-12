/*
    INSERT INTO
        `user`
    ( `name`, `password`, `desc`, `email`, `phone`)
    VALUES
    ( 'c', '12222222222222222222222222222222', 'ss', '13129756249@qq.com', '1760758611')
*/

const SQL = require('./base.js');

const {
    User
} = require('../class.js');

const sql = new SQL({
    tableName: 'user'
});

//检测重复用户名
function checkUserIsNull(name) {
    return new Promise((res, rej) => {
        sql.find({
                name
            })
            .then(result => {
                if (!result.length) {
                    res(result)
                } else {
                    rej(result)
                }
            });
    })
}

function addUser(info) {
    return new Promise((resolve, rej) => {
        sql.insert(info)
            .then(res => {
                resolve(res);
            })
    })
}

function register(info) {
    return checkUserIsNull(info.name).then(res => {
        return addUser(info);
    })
}

function updataInfo(data, condition) {
    return sql.updata(data, condition);
}

let user = new User({
    register,
    updataInfo
});

// user.register({
//     desc: "小莫是个憨批",
//     name: "航",
//     email: "1819588531@qq.com",
//     password: "e10adc3949ba59abbe56e057f20f883e",
//     phone: "17607586113"
// }).then(res => {
//     console.log({
//         res
//     })
// }).catch(e => {
//     console.log("注册失败,用户已存在");
// })

module.exports = user;
