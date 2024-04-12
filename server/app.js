let express = require('express');
let app = express();
let cors = require('cors')
let bodyParser = require('body-parser')
let router = require('./router')
let helmet = require('helmet');
// let multer = require('multer');

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));
app.use(express.static('./assets'));  // 配置静态文件路由，使前端可以访问到
app.use(bodyParser.json())

app.use(cors())   //允许所有来源的请求
app.use(router); // 将路由器与应用程序关联，指定前缀为'/api'
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'"],
    fontSrc: ["'self'"],
    connectSrc: ["'self'"],
    frameSrc: ["'self'"]
  }
}));
app.listen(5000, () => {
    console.log('服务器启动成功')
  })