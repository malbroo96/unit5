const express= require("express");



const app = express();


const PORT=3000;




app.get("/home",(req,res)=>{
    res.send("this is home page")
});




app.get("/contactus",(req,res)=>{
    res.send("Welcome to the about page!")
});




app.get("/about",(req,res)=>{
    res.send("welcome to the about page");
});




app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})