const bill = require('../db/model/bill')

const express = require('express')
const router = express.Router()

router.get('/getallbill', async (req, res) => {
    res.send(await bill.getAllBill())
})

router.get('/getallbillbyrestaurantId/:restaurantId', async (req, res) => {
    res.send(await bill.getBillByRestaurantId(req.params.restaurantId))
})

router.get('/getbillbybillId/:billId', async (req, res) => {
    res.send(await bill.getBillByBillId(req.params.billId))
})

router.delete('/deletebill/:billId', async (req, res) => {
    res.send(await bill.deleteBill(req.params.billId))
})

router.put('/updatebill', async (req, res) => {
    res.send(await bill.updateBill(req.body))
})

router.post('/insertbill', async (req, res) => {
    res.send(await bill.insertBill(req.body))
})

module.exports = router