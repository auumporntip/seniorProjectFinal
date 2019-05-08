const menu = require('../db/model/transaction')

const express = require('express')
const router = express.Router()

router.get('/gettransaction/:restaurantId', async(req, res) => {
    res.send(await menu.getTransaction(req.params.restaurantId))
})
router.get('/gettransactionbycategoryid/:restaurantId/:categoryId', async(req, res) => {
    res.send(await menu.getTransactionByCategory(req.params.restaurantId,req.params.categoryId))
})


module.exports = router