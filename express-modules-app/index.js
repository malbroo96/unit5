const express = require("express");
const os = require("os");
const dns = require("dns");
const { readfiledata } = require("./read");

const app = express();
const PORT=3000;





app.get("/test",(req,res)=>{
    res.send(" test route is working!");
});




app.get("/readfile",(req,res)=>{
    const content = readfiledata();
    res.send(content);
});


app.get("/systemdetails",(req,res)=>{
    const details={
        platform:os.platform(),
        totalMemory:(os.totalmem()/1024**3).toFixed(2)+"GB",
        freeMemory:(os.freemem()/1024**3).toFixed(2)+"GB",
        cpuModel:os.cpus()[0].model,
        cpuCores:os.cpus().length
    };



    res.json(details)
});





app.get ("/getip",(req,res)=>{
    const hostname="masaischool.com";
    dns.lookup(hostname,(err,address,family)=>{
        if(err){
            res.json({error:"unable to resolve IP"});
        }else{
            res.json({hostname,ipaddress:address})
        }
    })
})





app.listen (PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})