
const express = require('express');
const router = express.Router();
const service = require('./api/book');
const user = require('./api/user');
const passport = require("passport");
const multer  = require('multer');
const  fs = require('fs');
var storage = multer.memoryStorage()
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //先创建路径在保存
        createFileDirectory('./upload');
        //指定文件保存路径
        cb(null, './upload/');
    },
    filename: function(req, file, cb) {
        console.log(file)
            // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        // cb(null, Date.now() + '-' + file.originalname);
         cb(null,  file.originalname);


    }
})
var createFileDirectory = function(path) {
    try {
        //检测文件夹是否存在，不存在抛出错误
        fs.accessSync(path);
    } catch (error) {
        //创建文件夹
        fs.mkdirSync(path);
    }
}
var upload = multer({ storage: storage })

//短信验证
router.post('/duanxi_send',user.infomSent);
//短信验证
// router.post('/avatar',multipartMiddleware,user.avatar);
router.post('/avatar',upload.single('upload'), user.avatar);

//注册
router.post('/register',user.register);

//忘记密码,修改密码
router.post('/forgit',user.forgit); 


//登录
router.post('/login',user.login);


//用接口地址，返回用户信息  npm install express-passport 验证中间件
router.get('/current',passport.authenticate("jwt",{session:false}),user.current)

//查询所有的图书
router.get('/books',service.allBooks)
//根据id查询书
router.get('/books/book/:id',service.bookId)
//插入图书
router.post('/books/book',service.addBook);
//编辑图书
router.put('/books/book',service.editBook);
//删除图书
router.delete('/books/book/:id',service.deleteBook);



module.exports = router;

