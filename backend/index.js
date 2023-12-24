const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const UserModel = require('./Modules/User')
const session = require('express-session')
const app = express()
app.use(cors())
app.use(express.json())
app.use(session)
var userPW 

/*mongoose.connect('mongodb+srv://aianushka24:cFwsktNBq9Ypcyxb@cluster0.2azaf1a.mongodb.net/')
.then(()=>{
    console.log('db cpneccted')
    //UserModel.create({"username":"sdfsf", "password":'12313123'})

    UserModel.find().then(function (users){
        userPW = users[0]['_id']
        console.log(users[0]['_id'])
        
    }).catch(err => {console.log(err)})

}).catch(err =>{console.log(err)})
*/

app.get('/', (req,res) =>{
    console.log(req)
    UserModel.find().then(function (users){        
        res.json(users)
    }).catch(err => {console.log(err)})
})

app.listen(8080, () => {
    console.log('Server Listning')
    const password = "sdfdf"
    bcrypt.hash(password, 10)
    .then(hash=>{
        console.log(hash)
    })
})

app.post('/signin', (req,res) =>{
    res.json("old")    
})

app.post('/signup', (req,res)=>{
    res.json("created")
})

app.post('/signin2', (req,res)=>{
    const password = "sdfdf"
    bcrypt.hash(password, 10)
    .then(hash=>{
        console.log(hash)
    })
    res.json("matched")
})