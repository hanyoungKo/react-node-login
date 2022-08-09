const express = require('express');
const mongoose = require('mongoose'); // 몽구스를 가져옴

const app = express();
const port = 3003;  //Bakend sever 를 5000번으로 지정
mongoose.connect('mongodb+srv://kos:123000@clone01.mhhbcdh.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false

}).then(()=>console.log("MongoDB Connect"))
.catch(err=>console.log("error"))



app.get('/',(req, res)=>res.send('Hello World!'))

app.listen(port,()=> console.log(`Example app ${port}`))