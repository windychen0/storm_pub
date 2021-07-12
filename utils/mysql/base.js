//构造入参
/*
 *   tableName String 表名
 * 
 */

const {

    escape

} = require("mysql");

const pool = require('./index.js');

function trimObj(obj){
    if(obj instanceof Object){
        
        let newObj = {};
        
        for(let key in obj){
            if(obj){
                if( !obj.trim || obj.trim()!==""){
                    newObj[key] = obj[key]
                }
            }
        }
        
        return newObj;
    }else{
        return obj;
    }
}


class SQL {

    constructor(arg) {
        this.config = arg;
    }


    //增
    insert(obj) {
        
        obj = trimObj({status:"1",...obj});

        let query =
            `INSERT INTO \`${this.config.tableName}\` ${this.insertParse(obj)[0]} VALUES ${this.insertParse(obj)[1]} ;`;

        return this.run(query);
    }

    //删
    del(condition) {
        
        condition = trimObj({status:"1",...condition});

        let query =
            `UPDATE \`${this.config.tableName}\` SET \`status \`='0' WHERE ${this.conditionParse(condition)} ;`;

        return this.run(query);

    }

    //改
    updata(data, condition) {
        
        data = trimObj(data);
        
        condition = trimObj({status:"1",...condition});

        let query =
            `UPDATE \`${this.config.tableName}\` SET ${this.conditionParse(data,true)} WHERE ${this.conditionParse(condition)} ;`;

        return this.run(query);
    }


    //查
    find(fields, condition) {

        if (!condition) {
            
            condition = fields;
            
            fields = "*";
            
        }
        
        condition = trimObj({status:"1",...condition});

        let query =
            `SELECT ${this.findParseLeft(fields)} FROM \`${this.config.tableName}\` WHERE ${this.conditionParse(condition)} ;`;

        return this.run(query);
    }



    run(query) {

        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err) {

                    reject(err);


                } else {

                    connection.query(query, (errs, row) => {

                        if (errs) {

                            reject(errs);

                        } else {

                            resolve(row);

                        }

                        connection.release();
                        
                    });

                }

            })

        });
    }

    insertParse(obj) {

        let left = '( ';

        Object.keys(obj).forEach(item => {

            item = "\`" + item + "\`, ";

            left += item;

        });

        left = left.slice(0, left.length - 2);

        left += " ";

        left += ')';

        let right = '( ';

        Object.values(obj).forEach(item => {

            item = escape(item) + ", ";

            right += item;

        });

        right = right.slice(0, right.length - 2);

        right += " ";

        right += ')';

        return [left, right];
    }

    findParseLeft(fields) {
        
        if (fields === "*") {
            return fields
        };

        return `\`${fields.join("` , `")}\``;
    }

    conditionParse(condition, isLeft) {
        
        let res = '';

        for (let key in condition) {
            res += ` \`${key}\` = ${escape(condition[key])} ${isLeft ? ',':'AND'}`;
        };

        res = res.slice(0, res.length - (isLeft ? 1 : 3));

        return res;
    }
}

module.exports = SQL;
