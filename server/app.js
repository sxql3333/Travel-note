let express = require('express');
let app = express();
let cors = require('cors')
let bodyParser = require('body-parser')
let router = require('./router')
let multer = require('multer');

// 设置文件上传的最大限制
// let upload = multer({
//   limits: {
//     fileSize: 200 * 1024 * 1024, // 限制为200MB
//   },
// });
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));
// 配置静态文件路由，使前端可以访问到
app.use('/assets', express.static('./assets'));
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())   //允许所有来源的请求
// app.use(router)
app.use(router); // 将路由器与应用程序关联，指定前缀为'/api'

app.listen(5000, () => {
    console.log('服务器启动成功')
  })