const employee = require('../db/model/employee')

const express = require('express')
const router = express.Router()

router.get('/getallemployee', async(req,res)=>{
    res.send(await employee.getAllEmployee())
})







module.exports = router