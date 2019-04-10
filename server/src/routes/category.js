const category = require('../db/model/category')

const express = require('express')
const router = express.Router()

router.get('/getcategory/:restaurantId', async(req,res)=>{
    res.send(await category.getCategory(req.params.restaurantId))
})

router.post('/insertcategory', async(req,res)=>{
    res.send(await category.getCategory(req.body))
})


router.delete('/deletecategory', async(req,res)=>{
    res.send(await category.getCategory(req.body))
})

module.exports = router