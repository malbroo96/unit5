setTimeout(()=>{
    console.log("hello guys")
},2000)


const test=setInterval(()=>{
   console.log("duck!!") 
},1000)


setTimeout(()=>{
    clearInterval(test)
},6000)