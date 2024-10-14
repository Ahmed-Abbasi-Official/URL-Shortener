import { nanoid } from "nanoid";
import URL from '../models/url.model.js'

async function GenerateUrl(req,res) {
   try {
    const body=req.body
    console.log(body);
    
    if(!body) return res.status(400).json({error:"URL is Required : "})
    const shortId=nanoid(8)
    const url=await URL.create({
        shortId,redirectUrl:body.url,visitHistory:[]
    })
    console.log(url);
    

    return res.status(201).json({id:shortId})
   } catch (error) {
    console.log(error);
    
   }
}

export default GenerateUrl