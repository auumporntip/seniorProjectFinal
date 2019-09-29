const typeOfService = require('../db/model/typeOfService')

const express = require('express')
const router = express.Router()

router.get('/getalltypeofservice', async(req,res)=>{
    res.send(await typeOfService.getAllTypeOfService())
})

router.get('/gettypeofservice/:restaurantId', async(req,res)=>{
    res.send(await typeOfService.getTypeOfServiceByRestaurantId(req.params.restaurantId))
})

router.delete('/deletetypeOfService/:typeOfServiceId', async (req, res) => {
    res.send(await typeOfService.deleteTypeOfService(req.params.typeOfServiceId))
})

router.put('/updatetypeOfService', async (req, res) => {
    res.send(await typeOfService.updateTypeOfService(req.body))
})

router.post('/inserttypeOfService', async (req, res) => {
    var result
    try {
        result = await typeOfService.insertTypeOfService(req.body)
    } catch (error) {
        result= error
    }
    res.send(result)
})

module.exports = router