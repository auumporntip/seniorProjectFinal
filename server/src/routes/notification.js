const notification = require('../db/model/notification')

const express = require('express')
const router = express.Router()

router.get('/getallnotification', async(req,res)=>{
    res.send(await notification.getAllNotification())
})

router.get('/getcheckbillnotification', async(req,res)=>{
    res.send(await notification.getCheckBill())
})
router.get('/getothernotification', async(req,res)=>{
    res.send(await notification.getOtherNotification())
})


router.delete('/deletenotification/:notificationId', async (req, res) => {
    res.send(await notification.deleteNotification(req.params.notificationId))
})

router.put('/updatenotification', async (req, res) => {
    res.send(await notification.updateNotification(req.body))
})

router.post('/insertnotification', async (req, res) => {
    res.send(await notification.insertNotification(req.body))
})


module.exports = router