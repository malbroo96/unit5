const isPrime=require("./isPrime");



const numbers=[2,10,17,21,29,-5,"hello"];



numbers.forEach((num)=>{
    if(isPrime(num)){
        console.log(`${num} is a prime number`);

    }else {
        console.log(`${num} is not a prime number`);

    }
})