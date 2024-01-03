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

  return res.status(201).json({ message: "to Register" });
};

const register = async (req, res, next) => {
  let username = req.session.username

  if (username) {
    const { password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({
      username,
      password: hashedPassword
    })

    // const asdf =  await User.create({username, password})
    // console.log(String(asdf._id))

    await User.create({ username, password }).then((err, result) => {

      const token = jwt.sign(
        {
          id: username
        }, process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2s"
        }
      );

      res.cookie(String(username), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 3600),
        httpOnly: true,
        sameSite: "lax"
      })

      return res.status(201).json({ message: "Account Created" })
    })
  } else {
    return res.status(401).json({ message: "sdf" })
  }

}

const login = async (req, res, next) => {  
  let username = req.session.username
  if (username) {
    const { password } = req.body

    const matchedUser = await User.findOne({ username })
    const isPasswordCorrect = bcrypt.compareSync(password, matchedUser.password);

    if (isPasswordCorrect) {
      next()
    } else {
      return res.status(204).json({ message: "" })
    }

  } else {
    return res.status(401).json({ message: "" })
  }
}

const loginSuccessfull = async (req, res, next) => {
  let username = req.session.username
  const token = jwt.sign(
    {
      id: username
    }, process.env.JWT_SECRET_KEY,
    {
      expiresIn:"1s"
    }
  );

  res.cookie(String(username), token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 3600),
    sameSite: "lax"
  })

  return res.status(200).json({ message: "" })
}

const verifyToken = async (req, res, next) => {
  const token = req.headers.cookie.split(req.session.username + "=")[1]
  console.log(req.headers.cookie)
  if (!token) {
    res.status(404).json({ message: "No token found" })
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      //console.log(err)
      return res.status(400).json({ message: "Invalid token" })
    }
    console.log(user.id)
    req.id = user.id
  })

  next()
}


exports.setUsername = setUsername;
exports.register = register;
exports.login = login;
exports.verifyToken = verifyToken
exports.loginSuccessfull = loginSuccessfull
