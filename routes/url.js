import express from 'express'
import {GenerateUrl,getUrl,Home,SignUp,Login} from '../controllers/url.js'
import { isAuth } from '../middlewares/isAuth.js'


const router=express.Router()

router.get('/',isAuth,Home)
router.get('/signup',(req,res)=>{res.render('signup')})
router.get('/login',(req,res)=>{res.render('Login')})
router.post('/login',Login)
router.post('/signup',SignUp)
router.post('/',isAuth,GenerateUrl)
router.get('/:shortId',getUrl)



export default router