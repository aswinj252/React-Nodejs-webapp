const express = require ("express")
const router = express.Router()
    
const{userSignup,userLogin,getUser,verifyToken,UploadImage} = require('../controlers/user')
const {uploadSingleFile} = require('../db/multer')

router.post("/register",userSignup)
router.post("/login",userLogin)
router.get('/getUser/:id',getUser)
router.post('/verifyToken',verifyToken)
router.post('/addImage/:body',uploadSingleFile,UploadImage)
module.exports = router