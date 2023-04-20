const express = require("express")
const cors = require("cors")
require("./db/config")
const app = express()
const path = require('path');


app.use(express.json())
app.use(cors())
app.use(express.static('public'));


const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')


// app.post("/register",async(req,res)=>{
//     console.log(req.body);
//     let user = new User(req.body)
//     let result = await user.save()
//     res.send(result)
// })

app.use('/api/user/',userRoutes)
app.use('/api/admin/',adminRoutes)
app.listen(4000)
