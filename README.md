# MERN Authentication App with Session, Redux

## 🤔 Overview

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) authentication app. It provides user registration, login, and logout functionalities with JSON Web Token (JWT), Expresse-Session and Redux.

- **Backend:**

- **Frontend:**


## Features

- User registration
- User login with JWT authentication
- Secure password hashing using bcrypt
- Protected routes for authenticated users

## Tech Stack

- **Frontend:**
  - React
  - React Router for navigation
  - Axios for API requests

- **Backend:**
  - Express
  - CORS
  - DOTENV
  - Express-Session
  - Mongoose
  - Connect-Mongodb-Session
  - Bcrypt
  - Cookie-Parser
  - JWT

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


## 📸 **Screenshots**

### 🔺 Enter Username

<p align="center">
  <img width="70%"  src="/README/Enter Username.png" alt="Enter Username">
</p>

### 🔺 Register Page

<p align="center">
  <img width="70%"  src="/README/Register.png" alt="Register Page">
</p>

### 🔺 Login Page

<p align="center">
  <img width="70%"  src="/README/Sign In.png" alt="Login Page">
</p>

### 🔺 Protected Rout

<p align="center">
  <img width="70%"  src="/README/Protected Rout.png" alt="Protected Rout">
</p>

## How fix errors

### MongoDB Connection Error

Solution is change connection String to "mongodb://0.0.0.0/test"
**Before fix:**
```javasricpt
mongoose.connect('mongodb://localhost:27017/test')
```
**After fix:**
```javasricpt
mongodb://0.0.0.0/test
```