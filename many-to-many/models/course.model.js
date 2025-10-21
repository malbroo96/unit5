const mongoose=require("mongoose");

const courseSchema = new mongoose.Schema({
    title:String,
    description:String,
    inActive:{type:Boolean,default:true}
})



module.exports=mongoose.model("Course",courseSchema);
