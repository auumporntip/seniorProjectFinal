const category = require('../db/model/category')

const express = require('express')
const router = express.Router()

router.get('/getallcategory', async(req,res)=>{
    res.send(await category.getAllCategory())
})

router.get('/getcategory/:restaurantId', async(req,res)=>{
    res.send(await category.getCategory(req.params.restaurantId))
})

router.post('/insertcategory', async(req,res)=>{
    res.send(await category.insertCategory(req.body))
})

router.put('/updatecategory', async(req,res)=>{
    res.send(await category.updateCategory(req.body))
})

router.delete('/deletecategory/:categoryId', async(req,res)=>{
    res.send(await category.deleteCategory(req.params.categoryId))
})

module.exports = router