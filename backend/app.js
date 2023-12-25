const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routerController')
const app = express()

/*
mongoose.connect('mongodb+srv://aianushka24:cFwsktNBq9Ypcyxb@cluster0.2azaf1a.mongodb.net/')
.then(()=>{
    console.log('db cpneccted')
}).catch(err =>{console.log(err)})
*/

app.use('/', router)
app.use(express.json())

app.listen(8080, ()=>{
    console.log("Listning")
})