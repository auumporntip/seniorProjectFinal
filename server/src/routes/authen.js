const account = require('../db/model/account')

const express = require('express')
const router = express.Router()

router.post('/register', async(req,res)=>{
    res.send(await account.insertAccount(req.body))
})

router.post('/login',(req,res)=>{
})

module.exports = router