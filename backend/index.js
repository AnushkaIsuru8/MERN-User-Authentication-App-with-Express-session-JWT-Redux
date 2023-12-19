const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./Modules/User')

const app = express()
app.use(cors())
app.use(express.json())
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
        
        //if(req.body.)
        res.json(users)
    }).catch(err => {console.log(err)})
})

app.listen(8080, () => {
    console.log('Server Listning')
})

app.post('/signin', (req,res) =>{
    res.json("old")    
})

app.post('/signup', (req,res)=>{
    res.json("created")
})

app.post('/signin2', (req,res)=>{
    res.json("matched")
})