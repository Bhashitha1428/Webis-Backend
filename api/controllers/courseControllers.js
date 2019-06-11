
const courseSchema=require('../models/course');
function validateCourse(req,res,next){
   const a=courseSchema.find({name:req.body.name});
if(a[0]){
    res.json("match");
}
else{
    console.log("hhsjfhjk");
next();
}
    




//    const duration=req.body.duration;
//    if(duration>2){
//        console.log("Duration is ok")
//        next();
//    }
//    else{
//        res.json("Duration is not enough");
//    }


}

module.exports={
    validateCourse:validateCourse
}