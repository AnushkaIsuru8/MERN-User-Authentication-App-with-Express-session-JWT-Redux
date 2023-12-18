const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    role:{
        type:String,
        default:'guest'
    }
})

const UserModel = mongoose.model.apply("User", UserSchema)

module.exports = UserModel