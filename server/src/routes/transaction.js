const transaction = require('../db/model/transaction')

const express = require('express')
const router = express.Router()

router.get('/gettransaction/:restaurantId', async(req, res) => {
    res.send(await transaction.getTransaction(req.params.restaurantId))
})
router.get('/gettransactionbycategoryid/:restaurantId/:categoryId', async(req, res) => {
    res.send(await transaction.getTransactionByCategory(req.params.restaurantId,req.params.categoryId))
})
router.put('/changestatus/:transactionId/:statusId', async(req, res) => {
    res.send(await transaction.changeStatus(req.params.transactionId,req.params.statusId))
})

module.exports = router