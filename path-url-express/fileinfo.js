const path = require("path");



function getfileinfo(){
    return{
        fileName:path.basename(filePath),
        extension:path.extname(filePath),
        directory:path.dirname(filePath)
    }
}


module.exports = getfileinfo;