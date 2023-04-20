const express = require('express')
const {adminLogin,getUsers,deleteUser,addUser,getUserDetails,updateUser,searchUser}= require('../controlers/admin')
 const router = express.Router()

router.post('/adminlogin',adminLogin)
router.get('/users',getUsers)
router.delete("/delUser/:id",deleteUser)
router.post("/addUser",addUser)
router.get("/getuser/:id",getUserDetails)
router.put("/updateUser/:id",updateUser)
router.get("/searchUser/:key",searchUser)

module.exports = router;