import express from 'express'
import {GenerateUrl,getUrl,Home,SignUp,Login} from '../controllers/url.js'


const router=express.Router()

router.get('/',Home)
router.get('/signup',(req,res)=>{res.render('signup')})
router.get('/login',(req,res)=>{res.render('Login')})
router.post('/login',Login)
router.post('/signup',SignUp)
router.post('/',GenerateUrl)
router.get('/:shortId',getUrl)



export default router