const menu = require('../db/model/menu')

const express = require('express')
const router = express.Router()

router.get('/getallmenu', async (req, res) => {
    res.send(await menu.getAllMenu())
    // });
})

router.get('/getallmenu/:restaurantId', async (req, res) => {
    res.send(await menu.getAllMenuByRestuarantId(req.params.restaurantId))
})

router.get('/getMenuByTypeOfServiceId/:typeId', async (req, res) => {
    res.send(await menu.getMenuByTypeOfServiceId(req.params.typeId))
})

router.get('/getmenubyid/:menuId/:restaurantId', async (req, res) => {
    res.send(await menu.getAllMenu(req.params.menuId, req.params.restaurantId))
})

router.get('/getmenubycategory/:categoryId/:restaurantId', async (req, res) => {
    res.send(await menu.getMenuByCategory(req.params.categoryId, req.params.restaurantId))
})



router.delete('/deletemenu/:menuId/:restaurantId', async (req, res) => {
    res.send(await menu.deleteMenu(req.params.menuId, req.params.restaurantId))
})

router.put('/updatemenu', async (req, res) => {
    res.send(await menu.updateMenu(req.body))
})

router.post('/insertmenu', async (req, res) => {
    res.send(await menu.insertMenu(req.body))
})

module.exports = router