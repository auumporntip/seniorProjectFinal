const typeOfRestaurant = require('../db/model/typeOfRestaurant')

const express = require('express')
const router = express.Router()

router.post('/insertTypeOfRestaurant', async(req,res)=>{
    res.send(await typeOfRestaurant.insertTypeOfRestaurant(req.body))
})

router.get('/getTypeOfRestaurant',async(req,res)=>{
    res.send(await typeOfRestaurant.getTypeOfRestaurant())
})

module.exports = router