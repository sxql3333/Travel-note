const { MongoClient } = require('mongodb');
const conn= require('../db');
const UserModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
      const name = req.body.name;
      const password = req.body.password;
  
      const user = await UserModel.findOne({ name: name });
  
      if (!user) {
        return res.send({
          status: 401,
          message: '用户名不存在'
        });
      }
  
      if (user.password === password) {
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        return res.send({
          status: 200,
          message: '登录成功',
          data: {
            user: user,
            token: token
          }
        });
      }
  
      return res.send({
        status: 402,
        message: '密码错误'
      });
    } catch (err) {
      console.log(err);
      return res.send({
        status: 400,
        message: '查询用户失败'
      });
    }
  };

  exports.register = async (req, res) => {
    try {
      const name = req.body.name;
      const password = req.body.password;
  
      const existingUser = await UserModel.findOne({ name: name });
  
      if (existingUser) {
        return res.send({
          status: 202,
          message: '用户名已存在'
        });
      }
  
      const newUser = new UserModel({
        name: name,
        password: password
      });
  
      await newUser.save();
  
      return res.send({
        status: 200,
        message: '注册成功'
      });
    } catch (err) {
      return res.send({
        status: 400,
        message: '注册失败'
      });
    }
  };