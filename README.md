# 项目目录

* server---后端文件夹
  * 启动方式：
    ```
    cd server
    node app.js/npm start
    ```
* Travel-note-management---管理系统
  * 启动方式
    ```
    cd Travel-note-management
    npm start
    ```
* TravelApp---旅行日记App端
  * 启动方式
  * ```
    npm start
    ```

数据库设计

游记

```
_id: String, // ID，假设它是唯一标识符，使用字符串（String）数据类型
标题: String, // 游记标题，使用字符串（String）数据类型存储标题
内容: String, // 游记内容，再次使用字符串（String）数据类型存储内容
图片: [String], // 图片列表，假设它是指向图片的URL，使用字符串（String）数据类型存储    创建日期: Date, // 使用日期（Date）数据类型存储创建日期
是否审核通过: Boolean, // 使用布尔（Boolean）数据类型表示游记是否审核通过
浏览量: Number, // 使用数字（Number）数据类型存储浏览量，这个字段可以根据需要进行扩展
用户ID: String// 假设这是与游记关联的用户的唯一标识符，使用字符串（String）数据类型存储
```

App用户
