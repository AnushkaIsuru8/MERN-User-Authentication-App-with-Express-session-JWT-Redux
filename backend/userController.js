const User = require('./Modules/User')

const signUp = async (req, res, next) => {
    
    const { username, password } = req.body;
    const user = new User({
        username,
        password
    })

    try{
        await user.save()
    }catch(err){
        console.log(err)
    }

    return res.status(201).json({message:"SAVED "})
}

exports.signUp = signUp