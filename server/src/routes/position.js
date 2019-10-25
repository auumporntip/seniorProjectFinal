const position = require('../db/model/position')

const express = require('express')
const router = express.Router()

router.get('/getallposition', async(req,res)=>{
    res.send(await position.getAllPosition())
})
router.get('/getExceptPosition/:positionId', async(req,res)=>{
    res.send(await position.getExceptPosition(req.params.positionId))
})

router.post('/insertposition', async(req,res)=>{
    res.send(await position.insertPosition(req.body))
})

router.put('/updateposition', async(req,res)=>{
    res.send(await position.updatePosition(req.body))
})

router.delete('/deleteposition/:positionId', async(req,res)=>{
    res.send(await position.deletePosition(req.params.positionId))
})


module.exports = router