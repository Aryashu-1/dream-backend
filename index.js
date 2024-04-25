
const exp = require('express');
const app = exp();
const path = require('path')
const cors = require('cors');

// // //deploy react app
// // app.use(exp.static(path.join(__dirname,'../Client/blog/build')))

// // Enable CORS for all routes
// app.use(cors());
require('dotenv').config() //process(gobal object)

//mongo client
const mongoClient =require('mongodb').MongoClient;



//connecting to db 
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db object
    const chat = client.db('dream')
    //get collection
    const chatcollection = chat.collection('Chat');
    
    //share collection obj with express app
    app.set('Chat',chatcollection)

    //cofirming connection
    console.log("Connected to DB")
})
.catch(err=>{
    console.log("Error in connecting to db", err)
    
})

//parse body of request
app.use(exp.json())
//importing api routes
const adminApp = require('./APIs/admin-api');
const userApp = require('./APIs/user-api')


//if path starts with /admin-api use user API
app.use('/admin-api',adminApp)


//if path starts with /user-api use user API
app.use('/user-api',userApp)

// //refresh
// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../Client/blog/build/index.html'))
// })

//express error handler
app.use((err,req,res,next)=>{
    res.send({"message": "error","payload":err.message })
})




//assigning port number
const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log("Server started on port: ",port)
console.log(process.env.DB_URL)
})