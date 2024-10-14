import express from 'express'
import {GenerateUrl,getUrl,Home} from '../controllers/url.js'


const router=express.Router()

router.get('/',Home)
router.post('/',GenerateUrl)
router.get('/:shortId',getUrl)



export default router