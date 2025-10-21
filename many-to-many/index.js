require("dotenv").config();
const express= require("express");
const mongoose=require("mongoose");
const app =express();



app.use(express.json());



const studentsRoutes=require("./routes/students.routes");
const courseRoutes=require("./routes/course.routes");
const enrollmentRoutes=require("./routes/enrollment.routes");




app.use("/students",studentsRoutes);
app.use("/courses",courseRoutes);
app.use("/enroll",enrollmentRoutes);



const PORT=process.env.PORT|| 5000
const MONGO_URL=process.env.MONGO_URL ||"mongodb://127.0.0.1:27017/manyToManyDB"




mongoose.connect(MONGO_URL).then(()=>{
    console.log("connected to mongoDB");
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
})
.catch(err=> console.error("MongoDB connection error:",err ))