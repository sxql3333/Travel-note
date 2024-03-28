let express = require('express');
let app = express();
let cors = require('cors')
let bodyParser = require('body-parser')
let router = require('./router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())   //允许所有来源的请求
// app.use(router)
app.use(router); // 将路由器与应用程序关联，指定前缀为'/api'

app.listen(5000, () => {
    console.log('服务器启动成功')
  })