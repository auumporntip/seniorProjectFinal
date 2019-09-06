const restaurant = require('../db/model/restaurant')

const express = require('express')
const router = express.Router()

router.post('/insertrestaurant', async(req,res)=>{
    res.send(await restaurant.insertRestuarant(req.body))
})

router.delete('/deleterestaurant/:restaurantId', async(req,res)=>{
    res.send(await restaurant.deleteRestaurant(req.params.restaurantId))
})

router.put('/updaterestaurant', async(req,res)=>{
    res.send(await restaurant.updateRestaurant(req.body))
})

router.get('/getallrestaurant', async(req,res)=>{
    res.send(await restaurant.getAllRestaurant())
})

router.get('/getrestaurant/:accountId', async(req,res)=>{
    res.send(await restaurant.getRestaurant(req.params.accountId))
})

router.get('/getrestaurantByRestaurantId/:restaurantId', async(req,res)=>{
    res.send(await restaurant.getRestaurantByRestaurantId(req.params.restaurantId))
})


module.exports = router