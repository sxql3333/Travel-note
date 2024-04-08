let express = require('express')
let router = express.Router()
let login = require('./API/login')
let travel = require('./API/travel')

router.post('/login', login.login)
router.post('/register', login.register)
router.get('/getAllData', travel.getAllData)
// router.get('/task', task.gettask)
// router.post('/task', task.addtask)
// router.delete('/task/:id', task.deletetask)


// app端
router.post('/app/login', login.appLogin)
module.exports = router