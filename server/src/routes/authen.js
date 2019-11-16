const accounts = require('../db/model/account')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const bill = require('../db/model/bill')
const typeOfService = require('../db/model/typeOfService')

const express = require('express')
const router = express.Router()

router.post('/register', async (req, res) => {
    res.send(await accounts.insertAccount(req.body))
})

router.post('/login', async (req, res) => {
    res.send(await login(req.body.username, req.body.password))
})
router.post('/verify', async (req, res) => {
    res.send(await verify(req.body.token))
})
router.post('/verifyBill/:billId', async (req, res) => {
    res.send(await verifyBill(req.params.billId))
})

router.post('/checktable/:tablenumber', async (req, res) => {
    res.send(await checkTable(req.params.tablenumber))
})

router.post('/signjwt', async (req, res) => {
    res.send(await signJWT(req.body))
})

router.post('/verifytoken', async (req, res) => {
    res.send(await verifyToken(req.body))
})

function verifyToken(token) {
    try {
        jwt.verify(token.token, 'secret')
        return {
            tokenValid: true
        }
    } catch (error) {
        return {
            tokenValid: false
        }
    }
}

function signJWT(token) {
    return jwt.sign(token, 'secret')
}

async function checkTable(tableNumber) {
    var b = await bill.getBillForCheckTableNumber(tableNumber)
    if (b.length != 0) {
        return {
            tableAvailable: false
        }
    } else {
        return {
            tableAvailable: true
        }
    }
}

async function verifyBill(billId) {
    try {
        var b = await bill.getBillByBillId(billId)
        if (b.length != 0 && b[0].billStatus != 1) {
            var type = await typeOfService.getAllTypeOfServiceByTypeId(b[0].typeId)
            var data = {
                typeOfService: type[0],
                tableNumber: b[0].tableNumber,
                billId: b[0].billId
            }
            var token = jwt.sign(data,'secret')
            return {
                token:token,
                login: true
            }
        } else {
            return {
                login: false
            }
        }
    } catch (error) {
        return {
            login: false
        }
    }
}

async function verify(token) {
    try {
        jwt.verify(token, 'secret')
        return {
            isSuccess: true
        }
    } catch (error) {
        return {
            isSuccess: false
        }
    }

}

async function login(id, password) {
    try {
        account = await accounts.getAccountByUsername(id)
        if (account[0].password === md5(password)) {
            var token = jwt.sign({
                accountId: account[0].accountId,
                userName: account[0].userName,
                email: account[0].email,
                name: account[0].name,
                surname: account[0].surname,
                positionId: account[0].positionId,
                phone: account[0].phone,
                restaurantId: account[0].restaurantId
            }, 'secret')
            return {
                login: true,
                token: token
            }
        } else {
            return { login: false }
        }

    } catch (error) {
        return { login: false }
    }
}

module.exports = router