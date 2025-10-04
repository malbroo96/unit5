const {readfiledata, appendfiledata}= require("./fileOperation.js");


console.log("initial file content:");
readfiledata();


setTimeout(()=>{
    console.log("\nAppending data...");
    appendfiledata()
},500)


setTimeout(()=>{
    console.log("\nUpdated file content:");
    readfiledata()
},1000)