// sysinfo
const os =require("os");



function getsystem(){
    console.log("System Information");
    console.log("--------------------------------")

// architecture
    console.log(`Architecture:${os.arch()}`)

// CPU info

    const cpus=os.cpus();

    console.log(`CPU cores:${cpus.length}`);
    console.log(`CPU Model :${cpus[0].model}`);
    console.log(`CPU Speed:${(cpus[0].speed/1000).toFixed(2)}GHz`)



// memory



    const totalmem=(os.totalmem()/(1024**3)).toFixed(2);
    const freemem=(os.freemem()/(1024**3)).toFixed(2)


    console.log(`Total Memory: ${totalmem}GB`);
    console.log(`Free Memory:${freemem}GB`);






// heap memory usage



    const memoryUsage=process.memoryUsage();
    const heapUsed = (memoryUsage.heapUsed/(1024**2)).toFixed(2);
    const heapTotal=(memoryUsage.heapTotal/(1024**2)).toFixed(2);
    console.log(`Heap Memory Used:${heapUsed}MB`);
    console.log(`Heap Memory Total:${heapTotal}MB`);


// host and os info





    console.log(`Hostname:${os.hostname()}`);
    console.log(`OS Type:${os.type()}`)

}
// getsystem()
module.exports={getsystem};