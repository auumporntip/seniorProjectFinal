const menu = require('../db/model/menu')

const express = require('express')
const router = express.Router()

router.get('/getallmenu/:restaurantId', async(req, res) => {
    res.send(await menu.getAllMenu(req.params.restaurantId))
    // menu.getAllMenu(req.params.restaurantId, (result) => {
    //     res.send(result)
    // });
})

router.get('/getmenubyid/:menuId/:restaurantId', async(req, res) => {
    res.send(await menu.getAllMenu(req.params.menuId, req.params.restaurantId))
})

router.delete('/deletemenu/:menuId/:restaurantId', async(req, res) => {
    await menu.deleteMenu(req.params.menuId, req.params.restaurantId)
    res.send('delete success')
})

router.put('/updatemenu', async(req, res) => {
    await menu.updateMenu(req.body)
    res.end('update success')
})

router.post('/insertmenu', async(req, res) => {
    res.send(await menu.insertMenu(req.body))
})

module.exports = router