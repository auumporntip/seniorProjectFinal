const account = require('../db/model/account')

const express = require('express')
const router = express.Router()

router.get('/getallaccount', async(req,res)=>{
    res.send(await account.getAllAccount()) 
})

router.get('/getAccountbyusername/:username',async(req,res)=>{
    res.send(await account.getAccountByUsername(req.params.username))
})

router.get('/getAccountbyId/:accountId',async(req,res)=>{
    res.send(await account.getAccountById(req.params.accountId))
})

router.put('/updateAccount',async(req,res)=>{
    await account.updateAccount(req.body)
    res.send('update success')
})

router.delete('/deleteAccount/:accountId',async(req,res)=>{
    await account.deleteAccount(req.params.accountId)
    res.send('delete success')
})

module.exports = router