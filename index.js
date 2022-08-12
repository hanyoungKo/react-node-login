const express = require('express');
const mongoose = require('mongoose'); // 몽구스를 가져옴
const {User} =require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const  {auth} = require('./middleware/auth');
const app = express();



app.use(bodyParser.urlencoded({extended: true}));
// bodyParser 가 분석한(application/x-www-form-urlencoded) 데이터를 가져옴

app.use(bodyParser.json());
// bodyParser 가 json 파일을 분석해 가져옴

app.use(cookieParser());
// cookieparser 를 사용할수있게됨


const port = 3003;  //Bakend sever 를 5000번으로 지정
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false

}).then(()=>console.log("MongoDB Connect"))
.catch(err=>console.log("error"))


app.get('/',(req, res)=>res.send('Hello World! DB'))
app.listen(port,()=> console.log(`Example app ${port}`))


app.post('/api/users/register',(req,res)=>{
     
    // 클라이언트에서 보내주는 정보를 클라이언트에서 가져오면
     // DB 넣어줌 

     const user = new User(req.body);

     user.save((err, doc)=>{
        // save() : 몽고db 메서드
        if(err) return res.json({success: false, err}) // 에러
        return res.status(200).json({success:true});
        // status(200) : 성공

     }) 
})

app.post('/api/users/login',(req,res)=>{ // 로그인
    
    // 1. 요청된 이메일을 db에서 있는 지 찾음 
    User.findOne({email: req.body.email},(err,user)=>{
        // findOne : mogoose 에서 지원하는 메서드 / 찾는걸 도와줌
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
                
            })
        }
        
        // 2. 요청된 이메일의 비밀번호가 맞는지 확인함 
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) 
                return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})     
             // 3. 비밀번호까지 맞다면 토큰 생성하기 // jsonwebtoken
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    // 토큰을 저장한다 (쿠키) // 각기다른 저장소가 있음 (로컬스토리지 등등)
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true , userId: user._id})
                })
            })
    })
})


app.get('/api/users/auth', auth , (req,res)=>{
    // auth 가 true 상황
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

app.get('/api/users/logout' , auth , (req,res)=>{
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err,user)=>{
            if(err) return res.json({sucecc: false , err})
            return res.status(200).send({
                success: true
            })
        })
})
