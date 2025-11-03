const rateLimit=require("express-rate-limit")
const loginLimiter= rateLimit({
    windowMs:15*60*1000,
    max:10,
    message:{
        message:"too many login attempts .try again later."
    }
})

const forgotPasswordLimiter= rateLimit({
    windowMs:60*60*1000,
    max:5,
    message:{
        message:"too many password reset attempts. try again later"
    }
})
module.exports={loginLimiter,forgotPasswordLimiter};