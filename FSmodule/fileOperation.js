const fs=require("fs");
const path=require("path");




const filepath=path.join(__dirname,"data.txt");



function readfiledata(){
    fs.readFile(filepath,"utf-8",(err,data)=>{
        if(err){
            if(err.code==="ENOENT"){
                console.log("file not found.creating new file...");
                fs.writeFile(filepath,"",(err)=>{
                    if(err) throw err;
                    console.log("empty file created.")
                })

            }else{
                throw err;
            }
        }else{
            console.log("file content:\n"+(data || "(file is empty"));

        }
    })
}

function appendfiledata(){
    const content=" this is appended data \n";
    fs.appendFile(filepath,content,(err)=>{
        if(err)throw err;
        console.log("data appended successfully!");
    })
}


module.exports={readfiledata,appendfiledata};