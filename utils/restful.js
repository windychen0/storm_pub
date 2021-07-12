class Restful {
    constructor(arg) {
        
        let codeList = {
            success: 200,
            null: 404,
            systemError: 500,
            userError: 400,
            miss: "000",
        };
        
        let messageList = {
            success: "ok",
            duplicate_user:"重复的用户名",
            simple_password:"密码过于简单",
            format_error_password:"错误的密码格式",
            format_error_phone:"错误的号码格式",
        }
        
        this.code = codeList[arg.code] || arg.code || 200;
        
        this.message = arg.message || "ok";
        
        this.data = JSON.stringify(arg.data);
        
    }
}

module.exports = Restful;
