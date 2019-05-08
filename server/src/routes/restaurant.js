const restaurant = require('../db/model/restaurant')

const express = require('express')
const router = express.Router()

router.post('/insertrestaurant', async(req,res)=>{
    res.send(await restaurant.insertRestuarant(req.body))
})

router.get('/getrestaurant/:accountId', async(req,res)=>{
    res.send(await restaurant.getRestaurant(req.params.accountId))
})

module.exports = router