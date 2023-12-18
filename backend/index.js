const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(8080, () => {
    console.log('Server Listning')
})

app.post('/', (req,res) =>{
    res.json(req.body)
})