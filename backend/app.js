const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./userRouter')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

mongoose.connect('mongodb://0.0.0.0/test')
.then(()=>{
    console.log('db Connected')
}).catch(err =>{console.log(err)})

app.listen(8080, ()=>{
    console.log("Listning")
})
