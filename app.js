const express = require('express');
const app = express();

const mongoose=require('mongoose');
const bodyparser=require('body-parser');

 const userRoutes=require('./api/routes/user');
 const courseRoutes=require('./api/routes/course');

app.use('/uploads',express.static('uploads'));

 app.use(bodyparser.urlencoded({extended:false}));  
 app.use(bodyparser.json());
 app.use(bodyparser());

 ////////////////////////////
 app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){ 
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
});
 ////////////////



const db='mongodb://localhost:27017/w2';

mongoose.connect(db,function(err){
    if(err){
        console.log("Error "+err)
    }
    else{
        console.log("Database is working properly")
    }
});

app.get('/', (req, res, next) => {
    console.log("Hello ClzMate");
    res.status(200).json({
        state: true
    })
})


const port = process.env.PORT || 8080;
app.listen(port,function(){
    console.log("server is running on port :"+port);
});



 app.use('/user',userRoutes);
 app.use('/course',courseRoutes);


