const express = require('express')
const router = express.Router()

const {
    signUp,
    } = require('./userController')

/*
router.get('/', (req,res, next)=>{
    res.send("Hello world")
})
*/

router.post('/signup', signUp);

module.exports = router