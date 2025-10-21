const Enrollment=require("../models/enrollment.model");
const Student=require("../models/student.model");
const Course=require("../models/course.model");




exports.enrollStudent=async(req,res)=>{
    try{
        const { studentId,courseId}=req.body;



        const student = await Student.findById(studentId);
        const course=await Course.findById(courseId);


        if(!student?.isActive || !course?.isActive){
            return res.status(400).json({message:"Inactive student or course"});

        }



        const existing =await Enrollment.findOne({studentId,courseId,isActive:true});
        if(existing)return res.status(400).json({message:"Already enrolled"});



        const enrollment=await Enrollment.create({studentId,courseId});
        res.status(201).json(enrollment);

    }catch(err){
        res.status(500).json({ error: err.message})
    }
}