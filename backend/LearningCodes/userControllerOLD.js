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

    const token = jwt.sign({ id: username }, process.env.JWT_SECRET_KEY, { expiresIn: "2 days" })

    res.cookie(String(username), token, {
        path:"/",
        expires: new Date(Date.now() + 1000 * 1800),
        httpOnly: true,
        sameSite : "lax",
        Secure: true
    })

    return res.status(201).json({ message: "SAVED ", token })
}

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie
    const token = cookies.split("=")[1]

    if (!token) {
        return res.status(404).json({ message: "No token found" })
    }

    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) { return res.status(400).json({ message: "Invalid token" }) }
        console.log(user.id)
    })
}

exports.signUp = signUp
exports.verifyToken = verifyToken