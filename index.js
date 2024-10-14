import express, { urlencoded } from "express"
import router from './routes/url.js'
import CONNECTDB from './db/CONNECTDB.js'
import URL from "./models/url.model.js"

const app=express()
const port=process.env.PORT || 4000

CONNECTDB(`mongodb://localhost:27017/short-url`).then(()=>console.log("MongodbConnected")
)


app.use(express.json())
// app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use('/url',router)


app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId
    console.log(shortId);
    
    const entry=await URL.findOneAndUpdate({shortId},{$push:{visitHistory:{timestamp:Date.now()}}})
    res.redirect(entry.redirectUrl)
})

app.listen(port,()=>{console.log(`Server Started at Port ${port}`);
})