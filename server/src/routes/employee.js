const employee = require('../db/model/employee')

const express = require('express')
const router = express.Router()

router.get('/getallemployee', async (req, res) => {
    try {
        res.send(await employee.getAllEmployee())
    } catch (error) {
        res.send(error)
    }
})

router.post('/insertemployee', async (req, res) => {
    try {
        res.send(await employee.insertEmployee(req.body))
    } catch (error) {
        res.send(error)
    }
})

router.put('/updateemployee', async (req, res) => {
    try {
        res.send(await employee.updateEmployee(req.body))
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deleteemployee/:employeeId', async (req, res) => {
    try {
        res.send(await employee.deleteEmployee(req.params.employeeId))
    } catch (error) {
        res.send(error)
    }
})





module.exports = router