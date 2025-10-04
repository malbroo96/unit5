function isPrime(num){
    if(typeof num!=="number" || Number.isNaN(num)){
        return false

    }



if(num<2)return false;
for(let i=2;i<=Math.sqrt(num);i++){
    if(num%i===0){
        return false;
    }
}
return true;
}



module.exports=isPrime;