const express=require('express');
const router=express.Router();
const courseSchema=require('../models/course');

const paymentController=require('../controllers/courseControllers'); 

const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./uploads/')
    },
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
    
})

/** My own file validation */

// const myfileFilter=(req,file,callback)=>{
  
//     if(file.mimetyoe =='image/jpeg' || file.mimetyoe=='image/jpg'){
//     callback(new Error("File Type not valid"),false)
   
    
//     }else{
//         callback(null,true)
    
//     }
// }


const upload=multer({storage:storage,
    limits:{
    fileSize:1024*1024*10  //max fileSize 10Mb
}//,
//fileFilter:myfileFilter
});





//get course
router.get('/display',async(req,res)=>{
   // courseSchema.find()
   // .then(course=>{
    //     console.log(course);
    //     res.json(course)
    // })
    // .catch(err=>{
    //     console.log("Course detail retriving error:"+err);
    // })

  let course= await courseSchema.find()//select({name:1,id:1}).limit(4).sort({name:1})
  res.json(course);


})


//store course

//paymentController.validateCourse
router.post('/store',upload.single('courseImge'),paymentController.validateCourse, (req,res)=>{
    
    console.log(req.file);
    
    const newCourse=new courseSchema;
    newCourse.name=req.body.name;
    newCourse.author=req.body.author;
    // newCourse.duration=req.body.duration;
    // newCourse.content=req.body.content;
    // newCourse.description=req.body.description;
    newCourse.courseImg=req.file.path;
    newCourse.save()
    .then(result=>{
        res.json(result)
        console.log(result);
    })
    .catch(err=>{
        res.json(err);
    })

//    let course= await newCourse.save()
//      if(course){
//          res.json(course);
//          console.log("Registration Sucessful");
//      }
//      else{
//          console.log("registration error");
//      }

})

//update exsiting course

router.put('/update/:id', async (req, res) => {
    console.log("IN course update Route");
    
  
    const course = await courseSchema.findByIdAndUpdate(req.params.id, {
         name: req.body.name ,
         author:req.body.author ,
         duration:req.body.duration, 
         content:req.body.content,
         description:req.body.description

    
    }, {
      new: true
    });
  
    if (!course) return res.status(404).send('The Course with the given ID was not found.');
    
    res.send(course);
  });


  // delete existing course
  router.delete('/delete/:id', async (req, res) => {
    console.log("IN course delete Route");
    const course = await courseSchema.findByIdAndRemove(req.params.id);
  
    if (!course) return res.status(404).send('The Course with the given ID was not found.');
  
    res.send(course);
  });
module.exports=router;