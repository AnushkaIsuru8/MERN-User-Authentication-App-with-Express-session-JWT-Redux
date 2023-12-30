const User = require('./Modules/User')

const signUp = async (req, res, next) => {
    
    const { username, password } = req.body;
    
    let alreadySaved
    try{
        alreadySaved = await User.findOne({username:username})
    }catch (err){
        console.log(err)
    }

    if(alreadySaved){
        return res.status(400).json({message : "already have that username"})
    }

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