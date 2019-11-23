
const express = require('express');
const router = express.Router();
const service = require('./api/book');
const user = require('./api/user');
const passport = require("passport");


//短信验证
router.post('/duanxi_send',user.infomSent);

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

