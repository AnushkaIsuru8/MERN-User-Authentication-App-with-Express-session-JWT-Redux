const express = require('express')

const {signUp} = require('./userController')

const router = express.Router()

router.get('/', (req,res, next)=>{
    res.send("Hello world")
})


router.post('/signup', signUp)

module.exports = router