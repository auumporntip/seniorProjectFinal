const typeOfService = require('../db/model/typeOfService')

const express = require('express')
const router = express.Router()

router.get('/getalltypeofservice', async(req,res)=>{
    res.send(await typeOfService.getAllTypeOfService())
})

module.exports = router