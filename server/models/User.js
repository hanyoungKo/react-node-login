const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, 
        //trim : 빈공간을 없애줌
        unique: 1,
        // unique : 1 1개만 존재해야함
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{ // 유효성
        type: String
    },
    tokenExp:{ // 유효기간 , 토큰을 사용할수 있는 기간
        type: Number
    }

})

userSchema.pre('save',function (next){
    // .pre : mogoose 전용 메서드 'save' 하기 전에 수행한다는 의미
    var user = this; // 스키마를 뜻함
    
    if(user.isModified('password')){ // 스키마에 비밀번호가 변경되면
        // 비밀번호를 암호화 시킴
       bcrypt.genSalt(saltRounds,function(err, salt){
           if(err) return next(err)
           bcrypt.hash(user.password , salt, function(err,hash){
               if(err) return next(err)
               user.password = hash 
               next();         
           } )
       })
    }else{
        next();
    }
    
});

// 비밀번호를 확인하는 methods 를 만듬
userSchema.methods.comparePassword = function(plainPassword, cbf){
    // 들어온값 plainPassword 를 암호화하여 db 의 password 와 비교함
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cbf(err)
        cbf(null, isMatch) 
    })
}

// 토큰을 생성하는 methods 
userSchema.methods.generateToken = function(cbf){
    // jsonwebtoken 을 이용해서 token 생성
    var user = this;

    var token = jwt.sign(user._id.toHexString(),'secretToken');
    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token
    user.save(function(err,user){
        if(err) return cbf(err)
        cbf(null, user)
    })
}

userSchema.statics.findByToken = function( token, cbf){
    var user = this;

    // 토큰을 decode 한다.
    jwt.verify(token,'secretToken',function(err,decode){
        
        // 유저아이디를 이용해서 유저를 찾고
        // 클라이언트에서 가져온 token 과 db에 보관된 토큰이 일치하는지
        // 확인
        user.findOne({"_id": decode, "token": token},function(err,user){
            if(err) return cbf(err);
                cbf(null, user)
        })

    });
}

const User = mongoose.model('User', userSchema);

module.exports = {User}