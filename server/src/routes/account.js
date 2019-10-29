const account = require('../db/model/account')

const express = require('express')
const router = express.Router()

router.get('/getallaccount', async (req, res) => {
    res.send(await account.getAllAccount())
})

router.get('/getaccountbyusername/:username', async (req, res) => {
    res.send(await account.getAccountByUsername(req.params.username))
})

router.get('/getaccountbyposition/:restaurantId/:positionId', async (req, res) => {
    res.send(await account.getAllAccountByRestaurantIdAndPositionId(req.params.restaurantId, req.params.positionId))
})

router.get('/getaccountbyId/:accountId', async (req, res) => {
    res.send(await account.getAccountById(req.params.accountId))
})

router.put('/updateaccount', async (req, res) => {
    await account.updateAccount(req.body)
    res.send('update success')
})

router.post('/insertaccount', async (req, res) => {
    res.send(await account.insertAccount(req.body))
})

router.delete('/deleteAccount/:accountId', async (req, res) => {
    await account.deleteAccount(req.params.accountId)
    res.send('delete success')
})

module.exports = router