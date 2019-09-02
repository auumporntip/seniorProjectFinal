const status = require('../db/model/status')

const express = require('express')
const router = express.Router()

router.get('/getallstatus', async(req,res)=>{
    res.send(await status.getAllStatus())
})

router.get('/insertstatus', async(req,res)=>{
    res.send(await status.insertStatus(req.body))
})

router.get('/updatestatus', async(req,res)=>{
    res.send(await status.updateStatus(req.body))
})

router.get('/deletestatus/:statusId', async(req,res)=>{
    res.send(await status.deleteStatus(req.params.statusId))
})


module.exports = router