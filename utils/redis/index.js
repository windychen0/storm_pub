const  config = require('./config.js');

const Redis = require('ioredis');

const redis = new Redis(config);


//从ioredis源代码抄来的两个函数

function convertObjectToArray(obj) {
    const result = [];
    const keys = Object.keys(obj);
    for (let i = 0, l = keys.length; i < l; i++) {
        result.push(keys[i], obj[keys[i]]);
    }
    return result;
}

function convertMapToArray(map) {
    const result = [];
    let pos = 0;
    map.forEach(function (value, key) {
        result[pos] = key;
        result[pos + 1] = value;
        pos += 2;
    });
    return result;
}

//重写hmset方法
Redis.Command.setArgumentTransformer("hmset", function (args) {
  if (args.length === 2) {
    if (typeof Map !== "undefined" && args[1] instanceof Map) {
      // utils is a internal module of ioredis
      return [args[0]].concat(convertMapToArray(args[1]));
    }
    if (typeof args[1] === "object" && args[1] !== null) {
      return [args[0]].concat(convertObjectToArray(args[1]));
    }
  }
  return args;
});

//监听
redis.on("message", function (channel, message) {
  console.log("Receive message %s from channel %s", message, channel);
});

redis.on("error", function (channel,err){
    console.log({err});
})

Redis.Command.setReplyTransformer("hgetall", function (result) {
  if (Array.isArray(result)) {
    var obj = {};
    for (var i = 0; i < result.length; i += 2) {
      obj[result[i]] = result[i + 1];
    }
    return obj;
  }
  return result;
});

// redis.hgetall("test-user",function(err,res){
//     console.log({err,res});
// })

module.exports = redis;