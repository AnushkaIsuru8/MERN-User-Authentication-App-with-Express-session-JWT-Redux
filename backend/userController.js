const User = require('./Modules/User')
const bcrypt = require('bcrypt')
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

    return res.status(201).json({ message: "SAVED " })
}

exports.signUp = signUp