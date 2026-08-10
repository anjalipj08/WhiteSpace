const jwt =require('jsonwebtoken')
const adminMiddleware =(req,res,next)=>{
    console.log("Inside admin Jwt Middleware")
    console.log(req.headers.authorization.slice(7))
    try{
        const token = req.headers.authorization.slice(7)
        const jwtVerification = jwt.verify(token,process.env.jwtKey)
        console.log(jwtVerification)
        req.payload = jwtVerification.userMail

        if(jwtVerification.role=='admin'){
            next()
        }
        else{
            res.status(403).json("Authoriation error...admin can only access ")
        }
    }
    catch(err){
        res.status(402).json("Authoriation error "+err)
    }

    
}
module.exports = adminMiddleware