const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true, unique : true},
    password:{type:String, required:true},
    role:{
        type:String,
        enum:['0', '1','2'],
        default:'1'
    }
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel