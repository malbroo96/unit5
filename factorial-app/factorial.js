function factorial(n){
    if(typeof n!== "number"|| isNaN(n)){
        return "Error : input must be a number";
    }
    if(n<0){
        return "Error : factorial is not defined for negative number";

    }
    if(n === 0){
        return 1
    }


    let result =1
    for(let i=1 ;i<=n ;i++){
        result*=i;
    }
    return result
}

module.exports =factorial;