const Course=require("../models/course.model");
const Enrollment=require("../models/enrollment.model")



exports.createCourse=async(req,res)=>{
    try{
        const course=await Course.create(req.body);
        res.status(201).json(course);
    }catch(err){
        res.status(500).json({error:err.message})
    }
}



exports.deleteCourse=async(req,res)=>{
    try{
        const {id}=req.params;
        await Course.findByIdAndDelete(id,{isActive:false});
        await Enrollment.updateMany({courseId:id},{isActive:false});
        res.json({message:"course and related enrollments deactivated"});
    }catch(err){
        res.status(500).json({error:err.message})
    }
}


exports.getCourseStudents=async(req,res)=>{
    try{
        const {id}=req.params;
        const students=await Enrollment.find({ courseId:id,isActive:true})
        .populate("studentId","name email");
        res.json(students.map(e=>e.studentId));

        }catch(err){
            res.status(500).json({error: err.message})
        }
}