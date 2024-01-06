# MERN User Authentication App with Express-session, JWT, Redux

## 🤔 Overview

This is a full-stack MERN authentication  app. It provides user registration, login, and logout functionalities with JSON Web Token (JWT). Expresse-Session is used to store Authentication in backend and that session store in MongoDb using Connect-Mongodb-Session. Redux is used to store authentication data in frondend.

<br>

## ✅ Features

- User registration
- User login with JWT authentication
- Secure password hashing using bcrypt
- Protected routes for authenticated users
- Auth save in frond end using redux
<br>

## 🧑‍💻 Tech Stack

- ### Frontend:
  - **1. React**
  - **2. React Router Dom** for navigation
  - **3. Axios** for API requests
  - **4. Reduc** for store auth

- ### Backend:
  - **1. Express**
  - **2. Mongoose** 
  - **3. CORS** for allow secure cross-origin resource sharing, enabling the frontend to interact with the backend.
  - **4. DOTENV** for config env data like MONGODB_CONNECTIN_STRING$
  - **5. Express-session** Express for Session
  
  - **6. Connect-mongodb-session** for Mongodb-Session for session save in MongoDb
  - **7. Bcrypt** for Encrypt password
  - **8. Cookie-Parser** A middleware to parse and set cookies in the HTTP headers
  - **9. JWT** A compact, URL-safe means of representing claims to be transferred between two parties.

<br>

## ⚡ Setup

1. **Clone the repository:**
   ```bash
    git clone https://github.com/your-username/mern-authentication-app.git
   ```
2. **Install Packageous:**
    ```bash
      cd backend
    ```
    ```bash
      npm install
    ```

    ```bash
      cd ../client
    ```
    
    ```bash
      npm install
    ```


<br>

## 💻 **Screenshots**

#### 1. Enter Username

<p align="center">
  <img width="70%"  src="/README/Enter Username.png" alt="Enter Username">
</p>

#### 2. Register Page

<p align="center">
  <img width="70%"  src="/README/Register.png" alt="Register Page">
</p>

#### 3. Login Page

<p align="center">
  <img width="70%"  src="/README/Sign In.png" alt="Login Page">
</p>

#### 4. Protected Rout

<p align="center">
  <img width="70%"  src="/README/Protected Rout.png" alt="Protected Rout">
</p>

<br>

## ⭕ How fix errors

### 1. MongoDB Connection Error

**Error**
```
Error connecting to db: connect ECONNREFUSED ::1:27017
```

<br>

**🔥 Solution** 
<br>
Change connection String to "mongodb://0.0.0.0/test"
<br><br>

**Before fix**

```js
mongoose.connect('mongodb://localhost:27017/test')
```
**Fix**

```js
mongoose.connect('mongodb://0.0.0.0/test')
```



### 2. Backend Can't access req.body

**Error**
```
const { username } = req.body;
          ^

TypeError: Cannot destructure property 'username' of 'req.body' as it is undefined.
```

<br>

**🔥 Solution** 
<br>
Use json middle ware before route "app.use(express.json())"
<br><br>

**Fix**

```js
app.use(express.json())

app.use('/api', router)
```


### 3. Cookie not send to backend within Axios requests

<br>

**🔥 Solution** 
<br>
Change axios setting to "axios.defaults.withCredentials = true".

When declare in main componnet lik "App.js" it affect to whole application
<br><br>

**Fix**

```js
//in App.js
import axios from "axios";

axios.defaults.withCredentials = true
```