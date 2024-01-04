const User = require("./Modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const setUsername = async (req, res, next) => {
  const { username } = req.body;

  let alreadySaved;
  try {
    alreadySaved = await User.findOne({ "username": username });
  } catch (err) {
    console.log(err);
    return res.status(400).json({message : "Bad Request"})
  }

  req.session.username = username;
console.log(alreadySaved)
  if (alreadySaved) {
    return res.status(200).json({ message: "Already Registerd" });
  }

  return res.status(201).json({ message: "to register" });
};

const register = async (req, res, next) => {
  let username = req.session.username
console.log(username)
  if (username) {
    const { password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = await User.create({ username, password: hashedPassword })
    req.session.loggedUserID = String(newUser._id)
    next()
  } else {
    return res.status(401).json({ message: "Unauthorized" })
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
    return res.status(401).json({ message: "Unauthorized" })
  }
}

const loginSuccessfull = async (req, res, next) => {
  req.session.username = null
  req.session.cookie.expires = new Date(Date.now() + 3600 * 1000 * 24)
  let userID = req.session.loggedUserID
  const token = jwt.sign(
    {
      id: userID
    }, process.env.JWT_SECRET_KEY,
    {
      expiresIn: "3600s"
    }
  );

  res.cookie("userID", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 3600),
    sameSite: "lax"
  })

  //return res.status(200).json({ message: "Login Successfull" })
  req.id = userID
  next()
}

const verifyToken = async (req, res, next) => {
  let token
  try {
    token = req.headers.cookie.split("userID=")[1]
  } catch (err) {

  }

  if (!token || !req.session.loggedUserID) {
    return res.status(401).json({ message: "Unauthorised" })
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ message: "Invalid token" })
    } else {
      req.id = user.id
      next()
    }
  })
}

const getUser = async (req, res, next) => {
  let user
  try {
    user = await User.findById(req.id)
  } catch (eer) {
    console.log(err)
  }

  if (user) {
    return res.status(202).json({
      username: user.username,
      role: user.role,
      userId: user._id
    })
  } else {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

const refreshAuth = async (req, res, next) => {
  const token = jwt.sign(
    {
      id: req.id
    }, process.env.JWT_SECRET_KEY,
    {
      expiresIn: "3600s"
    }
  );

  res.cookie("userID", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 3600),
    sameSite: "lax"
  })

  req.session.cookie.expires = new Date(req.session.cookie.expires.getTime() + 3600 * 1000)
  return res.status(202).json({ message: "Auth refreshed" })
}
const logout = (req, res, next) => {
  res.clearCookie("userID")
  res.clearCookie("connect.sid");
  req.session = null

  res.status(202).json({ message: "Logout" })
}

const clearCookie2 = async (req, res, next) => {
  //res.clearCookie("connect.sid");
  return res.status(200).json({ message: "clear" })
}

exports.setUsername = setUsername;
exports.register = register;
exports.login = login;
exports.loginSuccessfull = loginSuccessfull
exports.verifyToken = verifyToken
exports.getUser = getUser
exports.refreshAuth = refreshAuth
exports.logout = logout
exports.clearCookie2 = clearCookie2
