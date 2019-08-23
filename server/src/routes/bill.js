const bill = require('../db/model/bill')

const express = require('express')
const router = express.Router()

router.get('/getallbill', async (req, res) => {
    res.send(await bill.getAllBill())
})

router.delete('/deletebill/:billId', async (req, res) => {
    res.send(await bill.deleteBill(req.params.billId))
})

router.put('/updatebill', async (req, res) => {
    res.send(await bill.updateBill(req.body))
})

module.exports = router