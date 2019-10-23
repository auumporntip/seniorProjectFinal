const employee = require('../db/model/employee')

const express = require('express')
const router = express.Router()

router.get('/getallemployee', async (req, res) => {
  
        res.send(await employee.getAllEmployee())
 
})

router.post('/insertemployee', async (req, res) => {
        res.send(await employee.insertEmployee(req.body))

})

router.put('/updateemployee', async (req, res) => {

        res.send(await employee.updateEmployee(req.body))
})

router.delete('/deleteemployee/:employeeId', async (req, res) => {

        res.send(await employee.deleteEmployee(req.params.employeeId))

})





module.exports = router