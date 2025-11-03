import express, { text } from "express"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const app = express()

const PORT = 3000


app.get("/sendemail",async(req,res)=>{
    try{
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })


        const mailoptions={
            from : process.env.EMAIL_USER,
            to:[
                process.env.EMAIL_USER,
           "venugopal.burli@masaischool.com",
            ],
            subject : "test mail from akhil joseph",
            text:" hello sir  this mail is sent by  nodemailer"
        }


        const info=await transporter.sendMail(mailoptions);
        console.log("Email sent :",info.response);
        res.send("email send successfully")
    }catch(error){
        console.error("error sending email",error);
        res.status(500).send("failed to send email")
    }
})


app.listen(PORT,()=>{
    console.log(`server running at  http://localhost:${PORT} `)
})