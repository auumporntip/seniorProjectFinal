
const table = require('../db/model/table')

const express = require('express')
const router = express.Router()

router.get('/getalltable', async(req,res)=>{
    res.send(await table.getAllTablechairs())
})

router.post('/inserttable', async(req,res)=>{
    res.send(await table.insertTablechairs(req.body))
})

router.put('/updatetable', async(req,res)=>{
    res.send(await table.updateTablechairs(req.body))
})

router.delete('/deletetable/:tableId', async(req,res)=>{
    res.send(await table.deleteTablechairs(req.params.tableId))
})


module.exports = router