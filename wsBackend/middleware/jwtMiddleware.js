const jwt =require('jsonwebtoken')
const jwtMiddleware =(req,res,next)=>{
    console.log("Inside jwt Middleware")
    console.log(req.headers.authorization.slice(7))
    try{
        const token = req.headers.authorization.slice(7)
        const jwtVerification = jwt.verify(token,process.env.jwtKey)
        console.log(jwtVerification)

        req.payload = jwtVerification.userMail
    }
    catch(err){
        res.status(402).json("Authoriation error "+err)
    }

    next()
}
module.exports = jwtMiddleware