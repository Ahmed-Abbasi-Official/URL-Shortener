import { getUser } from "../services/services.js";

async function isAuth(req,res,next) {
    const token=req.cookies?.userId
   const user= getUser(token)
   if(!user) res.redirect('/url/login')
    req.user=user
next()
    
}

export {isAuth}