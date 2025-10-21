const mongoose= require("mongoose");
const {Schema}=mongoose;
const enrollmentSchema= new Schema({
    studentId:{ type:Schema.Types.ObjectId,ref:"student"},
    courseId:{type:Schema.Types.ObjectId,ref:"course"},
    enrolledAt:{type:Date,default:Date.now},
    isActive:{type:Boolean,default:true}
})


module.exports=mongoose.model("Enrollment",enrollmentSchema);
