import express=require('express');

//引入mogoose模块
const mongoose = require('mongoose');
//连接mongodb
var URL = 'mongodb://localhost:27017/runoob';

mongoose.connect(URL,function(err){
    if(err){
        console.warn('数据库连接失败：'+err);
    }else {
        console.log('数据库成功连接到：'+URL);
    }
});

var db = mongoose.connection;//获取connection实例
//使用Connetion监听连接状态
db.on('connected',function(err){
    if(err){
        console.log('连接数据库失败：'+err);
    }else{
        console.log('连接数据库成功！');
    }
});

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
//     content: '上午面试',
//     date: '2019-08-28'
// });

// TodoBox.save();
const app:express.Application=express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*" );//若需要加入withCredentials,则需要将*改为具体域名
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',function(req,res){
    res.send('Hello World!');
});


// 获取全部的todo
app.get('/getAllItems', (req, res, next) => {
	TodoBox.find({}).sort({'date': -1}).exec((err, todoList) => {
		if (err) {
			console.log(err);
		}else {
			res.json(todoList);
		}
	})
});

// 添加todo
app.post('/addItem', (req, res, next) => {
	let newItem = req.body;
	TodoBox.create(newItem, (err) => {
		if (err) {
			console.log(err);
		}else {
			TodoBox.find({}, (err, todoList) => {
				if (err) {
					console.log(err);
				}else {
					res.json(todoList);
				}
			});
		}
	})
})

// 删除todo
app.post('/deleteItem', (req, res, next) => {
	console.log(req.body);
	let delete_id = req.body._id
	TodoBox.remove({_id: delete_id}, (err, result) => {
		if (err) {
			console.log(err)
		}else {
			res.json(result);
		}
	});
});

app.listen(8888,function(){
    console.log('Example app listening on port 8888!');
})