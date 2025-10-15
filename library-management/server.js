const app=require("./app");
const connectDB=require("./config/db");
const PORT=8080;


connectDB()



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})