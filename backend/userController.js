const User = require("./Modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const setUsername = async (req, res, next) => {
  const { username } = req.body;

  let alreadySaved;
  try {
    alreadySaved = await User.findOne({ username: username });
  } catch (err) {
    console.log(err);
  }

  req.session.username = username;

  if (alreadySaved) {
    return res.status(200).json({ message: "Already Registerd" });
  }

  return res.status(201).json({ message: "to register" });
};

const register = async (req, res, next) => {
  let username = req.session.username

  if (username) {
    const { password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = await User.create({ username, password: hashedPassword })
    req.session.loggedUserID = String(newUser._id)
    next()
  } else {
    return res.status(401).json({ message: "Expired" })
  }

}

const login = async (req, res, next) => {
  let username = req.session.username
  if (username) {
    const { password } = req.body

    const matchedUser = await User.findOne({ username })

    const isPasswordCorrect = bcrypt.compareSync(password, matchedUser.password);

    if (isPasswordCorrect) {
      req.session.loggedUserID = String(matchedUser._id)
      next()
    } else {
      return res.status(204).json({ message: "Password not matched" })
    }

  } else {
    return res.status(401).json({ message: "Expired" })
  }
}

const loginSuccessfull = async (req, res, next) => {
  req.session.username = ""
  req.session.cookie.expires = new Date(Date.now() + 3600 * 1000 * 24)
  let userID = req.session.loggedUserID
  const token = jwt.sign(
    {
      id: userID
    }, process.env.JWT_SECRET_KEY,
    {
      expiresIn: "60s"
    }
  );

  res.cookie(userID, token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60),
    sameSite: "lax"
  })

  return res.status(200).json({ message: "Login Successfull" })
}

exports.setUsername = setUsername;
exports.register = register;
exports.login = login;
exports.loginSuccessfull = loginSuccessfull
