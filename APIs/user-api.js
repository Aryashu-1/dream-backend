//create admin mini express app
const exp = require('express');
const adminApp = exp.Router();


//get request handler
adminApp.get('/user',(req,res)=>{

    res.send({"message":"admins list", "payload":"admins"})
})

//get user collection app
adminApp.use((req,res,next)=>{
    chatcollection= req.app.get('Chat')
   
    next();
})



//exporting
module.exports = adminApp;