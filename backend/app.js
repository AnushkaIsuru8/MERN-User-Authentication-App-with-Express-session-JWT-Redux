const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./userRouter')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(session({
    secret: "Some secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false
}))

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use('/', router)

mongoose.connect(process.env.MONGODB_CONNECTIN_STRING)
.then(()=>{
    app.listen(5000, ()=>{
        console.log("Server Listning on PORT 5000")
    })
    
}).catch(err =>{console.log(err)})


