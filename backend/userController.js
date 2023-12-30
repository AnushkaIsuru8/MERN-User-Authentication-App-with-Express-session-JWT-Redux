const User = require('./Modules/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res, next) => {

    const { username, password } = req.body;

    let alreadySaved
    try {
        alreadySaved = await User.findOne({ username: username })
    } catch (err) {
        console.log(err)
    }

    if (alreadySaved) {
        return res.status(400).json({ message: "already have that username" })
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
        username,
        password: hashedPassword
    })

    try {
        await user.save()
    } catch (err) {
        console.log(err)
    }
    const token = jwt.sign({id : username}, process.env.JWT_SECRET_KEY, {expiresIn : "2 days"})
    return res.status(201).json({ message: "SAVED " , token})
}

exports.signUp = signUp