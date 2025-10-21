const express=require("express");
const router=express.Router();
const Author=require("../models/authorModel");


router.post("/",async(requestAnimationFrame,res)=>{
    try{
        const author=await Author.create(requestAnimationFrame.body);
        res.status(201).json(author)
    }catch(err){
        res.status(400).json({error:err.message})
    }
})



router.get("/author",async(requestAnimationFrame,res)=>{
    const author=await Author.find()
    res.json(authors)
console.log(res)
})
// console

module.exports=router;