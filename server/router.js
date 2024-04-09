let express = require('express')
let router = express.Router()
let login = require('./API/login')
let travel = require('./API/travel')
//后台审核端
router.post('/login', login.login)
router.post('/register', login.register)
router.get('/getAllData', travel.getAllData)

// app端
router.post('/app/login', login.appLogin)
router.post('/app/register', login.appRegister)
router.post('/getDataByName', travel.getDataByName)
router.post('/app/addDiary', travel.addDiary)

module.exports = router