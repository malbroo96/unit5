const express = require("express")

const app = express();


const todoroutes=require("./routes/todoRoutes");


const PORT =3000;


app.use(express.json());


app.use("./todos",todoroutes);


app.use((req,res)=>{
    res.status(404).send("404 Not Found");
})



app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({error:err.message})
})



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})