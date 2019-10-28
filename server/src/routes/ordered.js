const ordered = require('../db/model/ordered')

const express = require('express')
const router = express.Router()

router.get('/getallordered', async (req, res) => {
    res.send(await ordered.getAllOrdered())
})

router.get('/getorderbybillId/:billId', async (req, res) => {
    res.send(await ordered.getOrderedByBillId(req.params.billId))
})

router.get('/getorderbyrestaurantId/:restaurantId', async (req, res) => {
    res.send(await ordered.getOrderedByResturantId(req.params.restaurantId))
})
router.get('/getOrderedByStatusPrepareAndCooking/:restaurantId', async (req, res) => {
    res.send(await ordered.getOrderedByStatusPrepareAndCooking(req.params.restaurantId))
})
router.get('/getOrderedByStatusServing/:restaurantId', async (req, res) => {
    res.send(await ordered.getOrderedByStatusServing(req.params.restaurantId))
})

router.delete('/deleteordered/:orderId', async (req, res) => {
    res.send(await ordered.deleteOrdered(req.params.orderId))
})

router.put('/updateordered', async (req, res) => {
    res.send(await ordered.updateOrdered(req.body))
})

router.put('/changestatus/:orderId/:statusId', async (req, res) => {
    res.send(await ordered.changeStatus(req.params.orderId,req.params.statusId))
})

router.post('/insertordered', async (req, res) => {
    res.send(await ordered.insertOrdered(req.body))
})

module.exports = router