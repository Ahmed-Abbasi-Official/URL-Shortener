import express from 'express'
import GenerateUrl from '../controllers/url.js'


const router=express.Router()

router.post('/',GenerateUrl)




export default router