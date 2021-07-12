var path = require('path');
var publicDir = path.join(__dirname, '../public');

var stylus = require('stylus'),
    nodes = stylus.nodes;

var fs = require('fs');

module.exports = (req, res, next) => {
    
    //stylus解析
    if (/\/css\//g.test(req.url) && /\_styl/g.test(req.url)) {
        
        let src;
        
        try{
            src = fs.readFileSync(`${publicDir}${req.url.replace('_styl.css','')}.styl`, "utf-8");
        }catch(e){
            res.sendStatus(404);
            return;
        }
        
        stylus.render(src, {
             filename: `${req.url.replace('_styl.css','')}_styl.css`
         }, (err, result) => {
             res.header("Content-Type","text/css; charset=UTF-8");
             res.end(result);
         })
    
        return;
    
    }
    
    next();
    
};
