var express = require('express');
var router = express.Router();
let title = '陈的风暴酒馆'

/* GET home page. */
router.all('/', toIndex);

router.all('/index', toIndex);

function toIndex( req, res, next) {
    res.render('home', {
        title,
    });
}

const route = [
    'login',
    'register',
    'search'
]

route.forEach( item => {
    router.all(`/${item}`,(req,res,next)=>{
        res.render(`${item}`, {
            title,
        });
    })
})


module.exports = router;
