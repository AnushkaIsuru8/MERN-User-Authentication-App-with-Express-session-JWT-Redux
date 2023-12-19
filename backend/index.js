const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./Modules/User')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://aianushka24:cFwsktNBq9Ypcyxb@cluster0.2azaf1a.mongodb.net/')
.then(()=>{
    console.log('db cpneccted')
    UserModel.create({"username":"sdfsf", "password":'12313123'})
}).catch(err =>{console.log(err)})

app.get('/', (req,res) =>{
    UserModel.find().then(function (users){
        res.json(users)
    }).catch(err => {console.log(err)})
})

app.listen(8080, () => {
    console.log('Server Listning')
})
