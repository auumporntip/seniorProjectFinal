const bill = require('../db/model/status')

const express = require('express')
const router = express.Router()

router.get('/getallstatus', async(req,res)=>{
    res.send(await bill.getAllStatus())
})

module.exports = router