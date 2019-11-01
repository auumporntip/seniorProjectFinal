const ordered = require('../db/model/ordered')

const express = require('express')
const router = express.Router()

router.get('/getallordered', async (req, res) => {
    res.send(await ordered.getAllOrdered())
})

router.get('/getorderbybillId/:billId', async (req, res) => {
    res.send(await ordered.getOrderedByBillId(req.params.billId))
})

router.get('/getorderbyrestaurantId/:restaurantId', async (req, res) => {
    res.send(await ordered.getOrderedByResturantId(req.params.restaurantId))
})
router.get('/getOrderedByStatusPrepareAndCooking/:restaurantId', async (req, res) => {
    
    var prepare = await ordered.getOrderedByStatusPreparing(req.params.restaurantId)
    var cooking = await ordered.getOrderedByStatusCooking(req.params.restaurantId)
    const data = cooking.concat(prepare)
    res.send(data)
})
router.get('/getOrderedByStatusServing/:restaurantId', async (req, res) => {
    res.send(await ordered.getOrderedByStatusServing(req.params.restaurantId))
})

router.delete('/deleteordered/:orderId', async (req, res) => {
    res.send(await ordered.deleteOrdered(req.params.orderId))
})

router.put('/updateordered', async (req, res) => {
    res.send(await ordered.updateOrdered(req.body))
})

router.put('/changestatus/:orderId/:statusId', async (req, res) => {
    res.send(await ordered.changeStatus(req.params.orderId, req.params.statusId))
})

router.post('/insertordered', async (req, res) => {
    res.send(await ordered.insertOrdered(req.body))
})

router.get('/getordersamemenu/:restaurantId', async (req, res) => {
    res.send(await manageSameMenu(req.params.restaurantId))
})

async function sameMenu(menu) {
    const distinctMenu = [...new Set(menu.map(items=>items.menuName))]
    const data = []
    for (let index = 0; index < distinctMenu.length; index++) {
        const sameMenu = menu.filter(items=>items.menuName===distinctMenu[index])
        var totalAmount = 0
        for (let index = 0; index < sameMenu.length; index++) {
            totalAmount += sameMenu[index].amount           
        }
        const item = {
            menuName: distinctMenu[index],
            amount : totalAmount,
            statusName:sameMenu[0].statusName,
            time:sameMenu[0].created_at,
            items:sameMenu
        }
        data.push(item)
    }
    
    return data
}

async function manageSameMenu(restaurantId) {
    var prepare = await ordered.getOrderedByStatusPreparing(restaurantId)
    var cooking = await ordered.getOrderedByStatusCooking(restaurantId)
    const p =await sameMenu(prepare)
    const c =await sameMenu(cooking)

    const data = c.concat(p)
    return data 
}


module.exports = router