const { MongoClient } = require('mongodb');
const conn = require('../db');
const TravelModel = require('../model/TravelModel');
const fs = require('fs');
// const multer = require('multer');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

//web端获取所有游记
exports.getAllData = async (req, res) => {
  try {
    const notes = await TravelModel.find();
    return res.send({
      status: 200,
      message: '查询成功',
      data: notes,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '查询失败',
    });
  }
};

exports.getDataByName = async (req, res) => {
  console.log('111111111111111');
  try {
    console.log(req.body);
    const name = req.body.searchText;
    let query = { is_approved: 1 }; // 添加is_approved条件

    if (name) {
      query = {
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { title: { $regex: name, $options: 'i' } },
        ],
      };
    }

    const notes = await TravelModel.find(query);
    // console.log('后端查询到的', notes);

    return res.send({
      status: 200,
      message: '查询成功',
      data: notes,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '查询失败',
    });
  }
};
//App端获取所有游记
exports.getMoreDiary = async (req, res) => {
  // try {
  //   const diary = await TravelModel.find();
  //   return res.send({
  //     status: 200,
  //     message: '查询成功',
  //     data: diary,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return res.send({
  //     status: 400,
  //     message: '查询失败',
  //   });
  // }
  try {
    const { page, limit } = req.body; // 从请求参数中获取页数和每页显示的数量
    console.log("page, limit",page, limit);
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 4;

    const skipCount = (pageNumber - 1) * limitNumber;

    const totalDiaryCount = await TravelModel.countDocuments(); // 获取游记总数

    const diary = await TravelModel.find()
      .skip(skipCount)
      .limit(limitNumber);

    return res.send({
      status: 200,
      message: '查询成功',
      data: {
        diary,
        totalPages: Math.ceil(totalDiaryCount / limitNumber), // 计算总页数
        currentPage: pageNumber, // 返回当前页数
      },
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '查询失败',
    });
  }


};
// App端添加游记
exports.addDiary = async (req, res) => {
  try {
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    const id = req.body.id;
    const name = req.body.name;
    const imageBase64 = req.body.image;
    const is_approved = req.body.is_approved;
    const is_deleted = req.body.is_deleted;

    function saveImage(imageBase64, i) {
      return new Promise((resolve, reject) => {
        const timestamp = Date.now();
        const imageName = `image_${timestamp}.jpg`;
        const imagePath = `./assets/${imageName}`;
        
        //创建一个Canvas画布
        const canvas = createCanvas();
        const ctx = canvas.getContext('2d');

        //加载图像
        loadImage(imageBase64).then((image) => {
          //设置画布尺寸与图象一致
          canvas.width = image.width;
          canvas.height = image.height;

          //绘制图像
          ctx.drawImage(image, 0, 0);

          //将Canves画布保存为JPG文件
          canvas.toBuffer('image/jpeg');
          fs.writeFile(imagePath, canvas.toBuffer('image/jpeg'), (error) => {
            if (error) {
              console.error(`Failed to save image ${i}: ${error}`);
              reject(error);
            } else {
              // 将图片名称与数据库名称保持一致
              const databaseName = imageName;
              const imageUrl = `http://localhost:5000/${databaseName}`;
              imageUrls.push(imageUrl);
              console.log(`Image ${i} saved successfully.`);
              resolve(databaseName);
            }
          });
        })
        .catch((error) => {
          console.error(`Failed to load image ${i}: ${error}`);
          reject(error);
        })

      });
    }

    const imageUrls = [];
    const saveImagePromises = imageBase64.map((imageBase64, i) =>
      saveImage(imageBase64, i)
    );

    // 等待所有图片保存完成
    Promise.all(saveImagePromises)
      .then(() => {
        console.log('All images saved successfully.');
        console.log(imageUrls);

        const newDiary = new TravelModel({
          _id: Date.now(),
          title: title,
          image: imageUrls,
          content: content,
          user_id: id,
          name: name,
          is_approved: is_approved,
          is_deleted: is_deleted,
        });

        return newDiary.save();
      })
      .then((newDiary) => {
        console.log('New diary saved successfully.');
        console.log('All images saved and processed.');
        console.log(imageUrls);
        return res.send({
          status: 200,
          message: '添加成功',
          data: newDiary,
        });
      })
      .catch((error) => {
        console.error('Failed to save and process images:', error);
      });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '添加失败',
    });
  }
};

exports.getDiaryById = async (req, res) => {
  try {
    const { user_id } = req.body;
    const diary = await TravelModel.find({ user_id, is_deleted: 1 }); // 添加筛选条件 is_deleted: 1
    return res.send({
      status: 200,
      message: '查询成功',
      data: diary,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '查询失败',
    });
  }
};
//web端审核
exports.checkDiary = async (req, res) => {
  try {
    console.log("status",req.body);
    const _id = req.body.id;
    console.log("status",typeof _id);
    const examinStatus = req.body.examinStatus;
    const reason = req.body.reason;
    const diary = await TravelModel.findById(_id);
    if (!diary) {
      return res.status(401).json({ message: '未找到对应的日记信息' });
    }
    // 更新日记信息中的 is_approved 字段为 examinStatus 的值，将 reason 存入日记信息中
    diary.is_approved = Number(examinStatus);
    diary.reason = reason;
    // 将更新后的日记信息保存回数据库
    await diary.save();
    return res.send({
      status: 200,
      message: '审核成功',
      data: diary
    })
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '审核失败'
    });
  }
}
// web端逻辑删除
exports.deleteDiary = async (req, res) => {
  try {
    const _id = req.body.id;
    const diary = await TravelModel.findById(_id);
    if (!diary) {
      return res.status(401).json({ message: '未找到对应的日记信息' });
    }
    diary.is_deleted = 0;
    // 将更新后的日记信息保存回数据库
    await diary.save();
    return res.send({
      code: 200,
      message: '删除成功',
      data: diary
    })
  } catch (err) {
    console.log(err);
    return res.send({
      code: 400,
      message: '删除失败'
    });
  }
}