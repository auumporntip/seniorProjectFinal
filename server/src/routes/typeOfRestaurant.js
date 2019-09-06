const typeOfRestaurant = require('../db/model/typeOfRestaurant')

const express = require('express')
const router = express.Router()

router.post('/insertTypeOfRestaurant', async(req,res)=>{
    res.send(await typeOfRestaurant.insertTypeOfRestaurant(req.body))
})

router.get('/getAllTypeOfRestaurant',async(req,res)=>{
    res.send(await typeOfRestaurant.getAllTypeOfRestaurant())
})

router.put('/updatetypeOfRestaurant', async(req,res)=>{
    res.send(await typeOfRestaurant.updateTypeOfRestaurant(req.body))
})

router.delete('/deletetypeOfRestaurant/:typeOfRestaurantId', async(req,res)=>{
    res.send(await typeOfRestaurant.deleteTypeOfRestaurant(req.params.typeOfRestaurantId))
})

module.exports = router