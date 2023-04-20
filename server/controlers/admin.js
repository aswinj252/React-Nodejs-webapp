const express = require('express')
const UserModel = require('../models/user')
const AdminModel = require('../models/admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



module.exports = {

    adminLogin: async (req, res) => {
        try{
            console.log(req.body);
            const admin = await  AdminModel.findOne({email:req.body.email}) 
            console.log(admin,"admin");
            if(admin!=null){
             bcrypt.compare(req.body.password,admin.password).then((response)=>{
                 console.log(response,"lklklk")
                 if(response){
                     
                    const token = jwt.sign({  email: response.email, id: response._id }, 'WebAppSecretKey', { expiresIn: "180000" })
                     console.log('Login Sucess');
                     res.json({message:"Login Success",token})
                 }else{
                     console.log('pass not match');
                     res.json({message:"Password doesnot match",admin:null})
                 }
                
             }).catch((err)=>{
                 console.log(err)
                res.json({message:"Password comparing failed"})
             })
            }
            else{
             res.json({message:"No user found"})
            }
          } catch (error){
             console.log(error);
             res.json({message:"Connection Timeout"})
          }
},
getUsers:async(req,res)=>{
    const users = await  UserModel.find()
    if(users!=null){
        res.json({users})
    }
    else {
        res.json({message :"No users found"})
    }

},
deleteUser:async(req,res)=>{
    try {
          let result = await UserModel.deleteOne({_id:req.params.id})
    res.json(result)
    } catch (error) {
        res.json({message:"some thing went wrong"})
    }
        
},
addUser:async(req,res)=>{
    console.log(req.body);
    try {
        req.body.password = await bcrypt.hash(req.body.password,10)
        UserModel.create(req.body).then(()=>{
            res.json({status:'created'})
        }).catch(()=>{
            res.json({status:'error', error:"duplicate email"})
        })
        
    } catch (error) {
        console.log("time out ");
    }

},
getUserDetails:async(req,res)=>{
    try {
    let user = await UserModel.findOne({_id:req.params.id})
    if(user){
        res.json({user})

    }
    else{
        res.json({status:"error", error:"user not found"})
    }
        
    } catch (error) {
        console.log(error,"so went wrong");
        
    }

},
updateUser:async(req,res)=>{
    console.log(req.body);
    console.log(req.params.id,"fgfgfgsfgsfgsgsfg");
    const { name, email,phone} = req.body
    try {
     const  update = await UserModel.updateOne({_id:req.params.id},
            {$set:{
                name,
                email,
                phone
            }})
            console.log(update,"fdfdfd");
            res.json({message:"success"})

    } catch (error) {
        console.log(error);
        res.json({message:"some thing went wrong "})
        
    }
},
searchUser:async(req,res)=>{
    console.log(req.params.key,"key");
    try {
        
    result = await UserModel.find({
        "$or":[
            {
                name:{$regex:req.params.key}
            }
        ]
    });
    if(result.length!=0){
        console.log(result);
       res.json({message:"success",result}) 
    }
    else{
        res.json({message:"user not found"})
    }
    } catch (error) {
        
        console.log(error);
        res.json({message:"something went wrong"})
    }
    

}
}