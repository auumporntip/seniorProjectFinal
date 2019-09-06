
const menuservice = require('../db/model/menuservice')

const express = require('express')
const router = express.Router()

router.get('/getallmenuservice', async(req,res)=>{
    res.send(await menuservice.getAllMenuService())
})

router.post('/insertmenuservice', async(req,res)=>{
    res.send(await menuservice.insertMenuService(req.body))
})

router.put('/updatemenuservice', async(req,res)=>{
    res.send(await menuservice.updateMenuService(req.body))
})

router.delete('/deletemenuservice/:menuserviceId', async(req,res)=>{
    res.send(await menuservice.deleteMenuService(req.params.menuserviceId))
})


module.exports = router