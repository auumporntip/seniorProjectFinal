const notification = require('../db/model/notification')

const express = require('express')
const router = express.Router()

router.get('/getallnotification', async(req,res)=>{
    res.send(await notification.getAllNotification())
})

router.delete('/deletenotification/:notificationId', async (req, res) => {
    res.send(await notification.deleteNotification(req.params.notificationId))
})

router.put('/updatebill', async (req, res) => {
    res.send(await notification.updateBill(req.body))
})

router.post('/insertbill', async (req, res) => {
    res.send(await notification.insertBill(req.body))
})


module.exports = router