const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./Modules/User')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/M')
.then(()=>{
    console.log('db cpneccted')
}).catch(err =>{console.log(err)})

app.get('/fgd', (req,res) =>{
    UserModel.find().then(function (users){
        res.json(users)
    }).catch(err => {console.log(err)})
})

app.listen(8080, () => {
    console.log('Server Listning')
})
