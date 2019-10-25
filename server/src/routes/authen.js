const accounts = require('../db/model/account')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

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
async function verify(token){
    try {
        jwt.verify(token,'secret')
        return {
            isSuccess:true
        }
    } catch (error) {
        return {
            isSuccess:false
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
                positionId:account[0].positionId,
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
        console.log(error);
        return { login: false }
    }
}

module.exports = router