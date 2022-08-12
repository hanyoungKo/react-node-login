const {User} = require('../models/User');
 
// 인증을 처리하는 곳

let auth =(req,res,next)=>{
    // 클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;
    
    // 토큰을 복호화 하여 유저를 찾음
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error: true})
        
        // req에 token 과 user를 담아 넘겨줌
        req.token = token;
        req.user = user;
        next(); // 미들웨어에서 벗어날수있게
    });
   
}

module.exports = {auth}