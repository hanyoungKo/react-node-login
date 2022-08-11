const express = require('express');
const mongoose = require('mongoose'); // 몽구스를 가져옴
const {User} =require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');

const app = express();



app.use(bodyParser.urlencoded({extended: true}));
// bodyParser 가 분석한(application/x-www-form-urlencoded) 데이터를 가져옴

app.use(bodyParser.json());
// bodyParser 가 json 파일을 분석해 가져옴


const port = 3003;  //Bakend sever 를 5000번으로 지정
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false

}).then(()=>console.log("MongoDB Connect"))
.catch(err=>console.log("error"))


app.get('/',(req, res)=>res.send('Hello World! DB'))
app.post('/register',(req,res)=>{
     
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

app.listen(port,()=> console.log(`Example app ${port}`))

