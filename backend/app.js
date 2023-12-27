const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routerController')
const app = express()


mongoose.connect('mongodb://localhost:27017/test')
.then(()=>{
    console.log('db Connected')
}).catch(err =>{console.log(err)})


app.use('/', router)
app.use(express.json())

app.listen(8080, ()=>{
    console.log("Listning")
})