const fs = require('fs');

const path = require('path');

const redis = require('../utils/redis/index.js');

//间隔time分钟切换列表并记录日志
const time = 60;

class Logger {

    constructor(arg) {

        this.logList = [];

        this.waitList = [];

        this.status = true;

        this.module = arg.module;

        this.path = path.join(__dirname, arg.module + '.txt');

        setTimeout(() => {
            this.startWriteData();
        }, 1000 * 60 * time);

    }

    add(data) {

        let formatData = JSON.stringify({
            "data": JSON.stringify(data),
            "time": new Date().toLocaleString(),
            // "position":
        });
        
        let at = new Error().stack.match(/\\(\w+)(.js)/g)[1].replace("\\","");
        
        let position = new Error().stack.match(/\d+:\d+/g)[1];
        

        (this.status ? this.logList : this.waitList).push(formatData);

    }

    startWriteData() {

        this.status = !this.status;

        let list = this.status ? this.logList : this.waitList;

        if(list.length){
            
            this.writeData(list);
            
        }else{
            
            this.resetTime();
            
        }
    }

    resetTime() {
        setTimeout(() => {
            this.startWriteData();
        }, 1000 * 60 * time);
    }

    writeData(list) {

        let data = list.pop();

        if (data) {
            
            this.writeToRedis(data);
            this.writeToFile(data);
            
        }else{
            
            this.resetTime();
            
        }

    }

    writeToRedis(data) {
        redis.rpush(this.module + "ErrorList",data,(err,len)=>{
            
        })
    }

    writeToFile(data) {
        fs.appendFile(this.path, data+"\n", err => {

        })
    }
    
}

module.exports = Logger;
