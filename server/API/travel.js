const { MongoClient } = require('mongodb');
const conn= require('../db');
const TravelModel = require('../model/TravelModel');

//web端获取所有游记
exports.getAllData = async (req, res) => {
    try {
      const notes = await TravelModel.find();
      return res.send({
        status: 200,
        message: '查询成功',
        data: notes
      })
    } catch (err) {
      console.log(err);
      return res.send({
        status: 400,
        message: '查询失败'
      })
    }
}
//App端根据游记标题或者用户名获取游记卡片内容
exports.getDataByName = async (req, res) => {
  console.log("111111111111111");
  try {
    console.log(req.body);
    const name= req.body.searchText;
    const notes = await TravelModel.find({
      $or: [
        { username: { $regex: name, $options: 'i' } },
        { title: { $regex: name, $options: 'i' } }
      ]
    });

    return res.send({
      status: 200,
      message: '查询成功',
      data: notes
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '查询失败'
    });
  }
};
// exports.addtask = async (req, res) => {
//     try {
//       const title = req.body.title;
//       const description = req.body.description;
//       const priority = req.body.priority;
//       const newTask = new TaskModel({
//         title: title,
//         description: description,
//         priority: priority
//       });
//       await newTask.save();
//       return res.send({
//         status: 200,
//         message: '添加成功',
//         data: newTask
//       });
//     } catch (err) {
//       console.log(err);
//       return res.send({
//         status: 400,
//         message: '添加失败'
//       });
//     }
// }

// exports.deletetask = async (req, res) => {
//     try {
//       console.log(req.params);
//       const id = req.params.id;
//       await TaskModel.findByIdAndDelete(id);
//       return res.send({
//         status: 200,
//         message: '删除成功'
//       });
//     } catch (err) {
//       console.log(err);
//       return res.send({
//         status: 400,
//         message: '删除失败'
//       });
//     }
// }
// App端添加游记
exports.addDiary = async (req, res) => {
  try {
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    const name = req.body.name;
    const image = req.body.image;
    const newDiary = new TravelModel({
      _id: Date.now(),
      title: title,
      image: image,
      content: content,
      name: name
    });
    await newDiary.save();
    return res.send({
      status: 200,
      message: '添加成功',
      data: newDiary
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 400,
      message: '添加失败'
    }
    );
  }
}