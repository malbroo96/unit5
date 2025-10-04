const factorial=require("./factorial")


const numbers=[5,7,10,-3,"abc",0];


numbers.forEach(num=>{
    console.log(`factorial of ${num}is:${factorial(num)}`);
    
})