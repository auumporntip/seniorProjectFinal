const account = require('../db/model/account')

const express = require('express')
const router = express.Router()

router.post('/register', async(req,res)=>{
    res.send(await account.insertAccount(req.body))
    // res.redirect('http://localhost:8080/Login')
})

router.post('/login',(req,res)=>{
})

module.exports = router