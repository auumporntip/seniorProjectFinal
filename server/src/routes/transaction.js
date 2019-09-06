const transaction = require('../db/model/transaction')

const express = require('express')
const router = express.Router()

router.get('/getalltransaction', async(req, res) => {
    res.send(await transaction.getAllTransaction())
})

router.post('/inserttransaction', async(req,res)=>{
    res.send(await transaction.insertTransaction(req.body))
})

router.put('/updatetransaction', async(req,res)=>{
    res.send(await transaction.updateTransaction(req.body))
})

router.delete('/deletetransaction/:transactionId', async(req,res)=>{
    res.send(await transaction.deleteTransaction(req.params.transactionId))
})

module.exports = router