const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = {User}