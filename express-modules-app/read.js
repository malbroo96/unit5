const fs = require("fs");
const path = require("path");




function readfiledata(){
    const filepath = path.join(__dirname,"data.txt");
    try{
        const data=fs.readFileSync(filepath,"utf8");
        return data
    }catch(err){
        return "Error reading file!";
    }
}
module.exports={readfiledata}
// console.log(readfiledata())