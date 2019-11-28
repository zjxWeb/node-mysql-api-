const db = require('../DBfile/db.js')
const request = require('request');
const querystring = require('querystring');
const passport = require("passport");
const bcrypt = require('bcryptjs');
const tools = require('../config/tools');
const  jwt = require('jsonwebtoken');
//短信验证
let code = ('000000' + Math.floor(Math.random()*999999)).slice(-6);
exports.infomSent = (req,res) => {
    const queryData = querystring.stringify({
        "mobile":req.body.phone,  // 接受短信的用户手机号码
        "tpl_id": 19928,  // 您申请的短信模板ID，根据实际情况修改
        "tpl_value": `#code#=${code}`,  // 您设置的模板变量，根据实际情况修改
        "key":' 1899c0809ae404d49522c786d32e3252',  // 应用APPKEY(应用详细页查询)
    });
    const queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 打印接口返回内容
            
            const jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
            jsonObj.code = code;
            res.json(jsonObj)
            // res.json(code)
          
        } else {
            console.log('请求异常');
        }
    }) 
   
}

//注册
exports.register = (req,res) => {
    let respone = {
        'Sphone':req.body.Sphone,
        'Sname':req.body.Sname,
        'Spassword':tools.enbcrypt(req.body.Spassword),
        'tpassword':tools.enbcrypt(req.body.tpassword),
        // "code":req.body.code
    }
    if(req.body.Spassword == req.body.tpassword){
        let sql = 'select * from username where Sname=?';
        let data = [respone.Sname]
        db.base(sql,data,(result)=>{
          if(result.length >=1){
              res.json({flag:1,msg:'用户已存在'});
          }else{
              let sql = 'insert into username set ?';
              db.base(sql,respone,(result)=>{
                if(result.affectedRows >= 1){
                    res.json({flag:1,msg:"注册成功"});
                }else{
                    res.json({flag:2,msg:"注册失败"});
                }
              })
          }
        })
    }else{
        res.json({flag:2,msg:'两次密码不一致'})
    }
  
}

//登录
exports.login = (req,res)=>{
    let respone = {
        "Sphone":req.body.Sphone,
        "Spassword":req.body.Spassword,
    }
    let sql = `select * from username where Sphone=${respone.Sphone}`;
    db.base(sql,null,(result)=>{
        //查到后验证

        if(bcrypt.compareSync(respone.Spassword, result[0].Spassword)){
            const payload = { Sphone:result[0].Sphone, Sname:result[0].Sname};
            const token = jwt.sign( payload,'secret',{expiresIn:3600});
            res.json({flag:1,msg:'登录成功',token:"Bearer " + token});
        }else{
            res.json({flag:2,msg:'请你注册'});
        }
    })
}

//忘记密码,修改密码
exports.forgit = (req,res)=>{
    let respone = {
        "Sphone":req.body.Sphone,
        "Spassword":req.body.Spassword,
        "tpassword":req.body.tpassword ,
        // "code":req.body.code
    }
    if(respone.Spassword == respone.tpassword){
    let sql = `select * from username where Sphone=${respone.Sphone}`;
    db.base(sql,null,(result)=>{
        if(result.length>=1){
            let sql = 'update username  set Spassword=?,tpassword=? where Sphone=?;';
            let data = [respone.Spassword,respone.tpassword,respone.Sphone]
            db.base(sql,data,(result)=>{
                if(result.affectedRows >= 1){
                    res.json({flag:1,msg:'修改成功'});
                }else{
                    res.json({flag:2,msg:'修改失败'});
                }
            })
        }else{
            res.json({flag:2});
        }
    })
    }else{
        res.json({flag:2,msg:'两次密码不一致'})
    }
}

//用接口地址，返回用户信息

exports.current = (req,res) =>{
    res.json({
        Sphone: req.user[0].Sphone,
        Sname: req.user[0].Sname
    })
}