const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js')
const passport = require('passport');
const user = require('./api/user');
const app = new express();


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//passport的初始化
app.use(passport.initialize());
app.use(passport.session());

//跨域解决
app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();  
});

//回调passport.js文件中
require('./config/passport')(passport);


// 指定api路径 all book jsonp
app.use(router);
const server = app.listen(8081,  ()=> {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})
