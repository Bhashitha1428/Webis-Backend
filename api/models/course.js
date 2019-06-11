const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({

  name:{ type:String,},
  author:{type:String,},
  duration:{type:Number},
  content:{type:Array},
  description:{type:String},
  courseImg:{type:String},

});


module.exports=mongoose.model('course',courseSchema);