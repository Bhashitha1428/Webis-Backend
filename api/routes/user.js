const express = require('express');
const router = express.Router();
const app=express();
//var bodyparser=require('body-parser');




//app.use(bodyparser());

const user=require('../models/user');

router.get('/login',(req,res)=>{
           console.log("Login request")
           const Name=req.body.name;
           const Password=req.body.password;
            user.find({name:Name,password:Password})
            .exec()
            .then((user)=>{
           if(user[0]){
             console.log(user);
             console.log("Valid User");
           }
           else
             {  console.log("Invalid User");
               res.json("User Not Found");
            
            }


            })



            .catch(()=>console.log("Login error"));
   



})

router.post('/register',async(req,res)=>{
  console.log("sdnjkhjkdk")
  const newUser=new user();
  newUser.name=req.body.name;
  newUser.email =req.body.email;
  newUser.password=req.body.password;

  let user1 = await newUser.save();
  
  res.send(user1);


//   newUser.save(function(user,err){
//     if(err){
//         console.log("User Saving Error")
        
//     }
//     else{
//        res.json(user);
//        console.log(user);
//     }

// })

})

module.exports = router;