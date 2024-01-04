const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./userRouter')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin: "http://localhost:3000"
}))
app.use(express.json())

app.use('/api', router)

mongoose.connect(process.env.MONGODB_CONNECTIN_STRING)
.then(()=>{
    console.log('db Connected')
}).catch(err =>{console.log(err)})

app.listen(8080, ()=>{
    console.log("Listning")
})
