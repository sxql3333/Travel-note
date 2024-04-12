const { MongoClient } = require('mongodb');
const conn = require('../db');
const UserModel = require('../model/UserModel');
const AppUserModel = require('../model/AppUserModel');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    const name = req.body.username;
    const password = req.body.password;
    const auth = req.body.auth;

    const user = await UserModel.findOne({ name: name });

    if (!user) {
      return res.send({
        status: 401,
        message: '用户名不存在',
      });
    }

    if (user.password === password) {
      if (user.auth === auth) {
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
          expiresIn: '1h',
        });
        return res.send({
          status: 200,
          message: '登录成功',
          data: {
            user: user,
            token: token,
          },
        });
      }
    } else {
      return res.send({
        status: 402,
        message: '密码错误或权限不一致',
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '查询用户失败',
    });
  }
};

exports.register = async (req, res) => {
  // console.log('进入登录函数');
  try {
    const name = req.body.name;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({ name: name });

    if (existingUser) {
      return res.send({
        status: 202,
        message: '用户名已存在',
      });
    }

    const newUser = new UserModel({
      name: name,
      password: password,
    });

    await newUser.save();

    return res.send({
      status: 200,
      message: '注册成功',
    });
  } catch (err) {
    return res.send({
      status: 400,
      message: '注册失败',
    });
  }
};
exports.appLogin = async (req, res) => {
  try {
    const name = req.body.username;
    const password = req.body.password;

    const user = await AppUserModel.findOne({ name: name });

    if (!user) {
      return res.send({
        code: 401,
        message: '用户名不存在',
      });
    }

    if (user.password === password) {
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h',
      });
      return res.send({
        code: 200,
        message: '登录成功',
        data: {
          user: user,
          token: token,
        },
      });
    } else {
      return res.send({
        code: 402,
        message: '密码错误',
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      code: 400,
      message: '查询用户失败',
    });
  }
};
exports.appRegister = async (req, res) => {
  try {
    const name = req.body.username;
    const password = req.body.password;

    const existingUser = await AppUserModel.findOne({ name: name });

    if (existingUser) {
      return res.send({
        code: 202,
        message: '用户名已存在',
      });
    }

    const newUser = new AppUserModel({
      name: name,
      password: password,
    });

    await newUser.save();

    return res.send({
      code: 200,
      message: '注册成功',
    });
  } catch (err) {
    return res.send({
      code: 400,
      message: '注册失败',
    });
  }
};
