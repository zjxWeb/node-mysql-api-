
//应用npm i passport-jwt中间件验证

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../DBfile/db')
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


module.exports = passport => {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log(jwt_payload);
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
    let sql = 'select * from username where Sphone=? '
    let data = [jwt_payload.Sphone];
    db.base(sql,data,(result,error)=>{
     if(error){
      res.status(500).send('数据库错误').end();
     }
     else{
      if (data.length == 0) {
        return done(null, false);
      }else{
        return done(null, result); //这里会把在登录时候的加密字段传到使用的接口中
      }
     }
    })
}));
};
