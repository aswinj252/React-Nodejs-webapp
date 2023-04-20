const express = require('express');
const bcrypt = require ('bcrypt')
const userModel = require('../models/user');
const jwt = require('jsonwebtoken')
const fs = require('fs');     
const directoryPath = 'public/'
module.exports={
    userSignup:async(req,res)=>{
        console.log("okookookko");
           console.log(req.body);

           try {
            req.body.password = await bcrypt.hash(req.body .password,10)
            console.log(req.body,"after hash");
            userModel.create(req.body).then(()=>{
                res.json({status:'created'})
            }).catch(()=>{
                res.json({status:'error', error: "duplicate email"})
            })
                
            

           } catch (error) {
            console.log("Connection time out");
            
           }
            
         },
      
    userLogin: async (req,res)=>{
        console.log(req.body,'hitting in user controller')
         try{
           const user = await  userModel.findOne({email:req.body.email}) 
           console.log(user);
           if(user!=null){
            bcrypt.compare(req.body.password,user.password).then((response)=>{
                console.log(response)
                if(response){
                    const token = jwt.sign({ name: user.name, email: user.email, id: user._id }, 'WebAppSecretKey', { expiresIn: "180000" })
                    console.log(token,'its token');
                    console.log('Login Sucess');
                    res.json({message:"Login Success",token,user: user.name,id:user._id})
                }else{
                    console.log('pass not match');
                    res.json({message:"Password doesnot match",user:null})
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
    getUser:async(req,res)=>{

        try {
            const user = await userModel.findOne({_id:req.params.id})
            if(user){
                res.json({user})
            }
            else{
                res.json({message:"user not found"})
            }

        } catch (error) {
            console.log(error,"something went wrong");

            
        }

    },
    verifyToken:async(req,res)=>{
        try {  const Token = req.body.Token
            const decoded = jwt.verify(Token, 'WebAppSecretKey')
            const email = decoded.email
            const user = await userModel.findOne({ email: email })
            console.log(user,"user details");
            if (user.image) user.image = `http://localhost:4000/${user.image}`
            else user.image = `https://mdbootstrap.com/img/new/standard/city/062.webp`
            
            return res.status(200).json({ message: "token valid", user });
        } 
        catch (error) {
            console.log(error);
            res.json({ status: 'error', error: "invalid token" })
        }
    },
    UploadImage:async(req,res)=>{
        try {
            console.log(req.params.body,"id ............");
            const Token = req.params.body
            const decoded = jwt.verify(Token, 'WebAppSecretKey')
            console.log( decoded.id ,"decoded id");
            const user = await userModel.findOne({ _id: decoded.id })
            if (user) {
                const update = await userModel.updateOne({ _id: user.id }, {
                    $set: {
                        image: req.files.image[0].filename
                    }
                })
            }
            const image = `http://localhost:4000/${req.files.image[0].filename}`
            console.log(image,"llllklklk");
            return res.json({ message: "user found", image });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "something went wrong" });
        }
    }
}