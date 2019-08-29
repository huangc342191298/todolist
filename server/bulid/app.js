"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
// 解析application/json数据
var jsonParser = bodyParser.json();
// 解析application/x-www-form-urlencoded数据
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//引入mogoose模块
var mongoose = require("mongoose");
//连接mongodb
var URL = 'mongodb://localhost:27017/runoob';
mongoose.connect(URL, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.warn('数据库连接失败：' + err);
    }
    else {
        console.log('数据库成功连接到：' + URL);
    }
});
// var db = mongoose.connection;//获取connection实例
// //使用Connetion监听连接状态
// db.on('connected',function(err){
//     if(err){
//         console.log('连接数据库失败：'+err);
//     }else{
//         console.log('连接数据库成功！');
//     }
// });
var Schema = mongoose.Schema;
//Todo Schema
var Todo = new Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
var TodoBox = mongoose.model('TodoBox', Todo);
// var TodoBox = new TodoBox({
//     content: '面试',
//     date: '2019-08-28'
// });
// TodoBox.save();
var app = express();
// app.use(function(req, res, next) {
app.use(function (err, request, response, next) {
    response.header("Access-Control-Allow-Origin", "*"); //若需要加入withCredentials,则需要将*改为具体域名
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (request, response) {
    response.send('Hello World!');
});
// 获取全部的todo
app.get('/getAllItems', function (request, response, next) {
    TodoBox.find({}).sort({ 'date': -1 }).exec(function (err, todoList) {
        if (err) {
            console.log(err);
        }
        else {
            response.json(todoList);
        }
    });
});
// 添加todo
app.post('/addItem', urlencodedParser, function (request, response) {
    var newItem = request.body;
    TodoBox.create(newItem, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            TodoBox.find({}, function (err, todoList) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(todoList);
                }
            });
        }
    });
});
// 删除todo
app.post('/deleteItem', urlencodedParser, function (request, response) {
    console.log(request.body);
    console.log(request.body._id);
    console.log(11111111111111111111111111);
    var delete_id = request.body._id;
    TodoBox.remove({ _id: delete_id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            response.json("success");
        }
    });
});
// 更新todo
app.post('/updateItem', urlencodedParser, urlencodedParser, function (request, response) {
    console.log(request.body);
    console.log(request.body._id);
    console.log(11111111111111111111111111);
    var update_id = request.body._id;
    // 生成参数
    var newContent = {
        content: request.body.content
    };
    TodoBox.findByIdAndUpdate(update_id, newContent, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            TodoBox.find({}, function (err, todoList) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(todoList);
                }
            });
        }
    });
});
app.listen(8888, function () {
    console.log('Example app listening on port 8888!');
});
