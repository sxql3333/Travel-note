let express = require('express')
let router = express.Router()
let login = require('./API/login')
let travel = require('./API/travel')
//pc端
router.post('/login', login.login)
router.post('/register', login.register)
router.get('/getAllData', travel.getAllData)
router.post('/checkDiary', travel.checkDiary)
router.post('/deleteDiary', travel.deleteDiary)

// app端
router.post('/app/login', login.appLogin)
router.post('/app/register', login.appRegister)
router.post('/app/getDataByName', travel.getDataByName)
router.post('/app/addDiary', travel.addDiary)
router.post('/app/getPersonalDiary', travel.getDiaryById)
router.post('/app/getAllDiary', travel.getAllDiary)


module.exports = router