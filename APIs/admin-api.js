//create admin mini express app
const exp = require('express');
const adminApp = exp.Router();


//get user collection app
adminApp.use((req,res,next)=>{
    chatcollection= req.app.get('Chat')
   
    next();
})


//get request handler
adminApp.get('/admin',(req,res)=>{

    res.send({"message":"admins list", "payload":"admins"})
})

//get chat by id
adminApp.get('/admin/:id',async (req,res)=>{
    let urlid =Number(req.params.id) 
    console.log(urlid)
    let list = await chatcollection.find({userid:urlid}).sort({ _id: -1 }).toArray()
    console.log(list)
    list.map((item,id)=>{
       console.log(item._id.getTimestamp())
    })
    res.send({"message":"admins list", "payload":list})
})

//post chat
adminApp.post('/msg', async(req,res)=>{
    //getting chat object from request
    let msg = req.body;
    console.log(msg);

    //getting Indian Standard Time (IST) timestamp
    const istTimestamp = new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'});
   
    let finalmsg = {...msg, "time":istTimestamp}
    
    //posting into db
    let result = await chatcollection.insertOne(finalmsg)
    console.log(result)
    res.send({"message":"admins list", "payload":"list"});
});



//exporting
module.exports = adminApp;