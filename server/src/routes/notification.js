const notification = require('../db/model/notification')

const express = require('express')
const router = express.Router()

router.get('/getallnotification', async(req,res)=>{
    res.send(await notification.getAllNotification())
})

module.exports = router