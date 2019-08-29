import express=require('express');
import bodyParser = require('body-parser');
// 解析application/json数据
var jsonParser = bodyParser.json();
// 解析application/x-www-form-urlencoded数据
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//引入mogoose模块
import mongoose = require('mongoose');
//连接mongodb
var URL = 'mongodb://localhost:27017/runoob';

mongoose.connect(URL,{ useNewUrlParser: true },function(err){
    if(err){
        console.warn('数据库连接失败：'+err);
    }else {
        console.log('数据库成功连接到：'+URL);
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
const app:express.Application=express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*" );//若需要加入withCredentials,则需要将*改为具体域名
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',function(req,res){
    res.send('Hello World!');
});


// 获取全部的todo
app.get('/getAllItems', (req, res, next) => {
	TodoBox.find({}).sort({'date': -1}).exec((err: any, todoList: any) => {
		if (err) {
			console.log(err);
		}else {
			res.json(todoList);
		}
	})
});

// 添加todo
app.post('/addItem',urlencodedParser,function(req,res){
	let newItem = req.body;
	TodoBox.create(newItem, (err: any) => {
		if (err) {
			console.log(err);
		}else {
			TodoBox.find({}, (err: any, todoList: any) => {
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
app.post('/deleteItem',urlencodedParser,function(req,res) {
    console.log(req.body);
    console.log(req.body._id);
    console.log(11111111111111111111111111);
	let delete_id = req.body._id
	TodoBox.remove({_id: delete_id}, (err: any) => {
		if (err) {
			console.log(err)
		}else {
			res.json("success");
		}
	});
});
// 更新todo
app.post('/updateItem',urlencodedParser,function(req,res) {
    console.log(req.body);
    console.log(req.body._id);
    console.log(11111111111111111111111111);
    let update_id = req.body._id;
    // 生成参数
    const newContent={
        content: req.body.content
    };
	TodoBox.findByIdAndUpdate(update_id,newContent, function (err: any,result: any) {
        if (err) {
			console.log(err)
		}else {
			TodoBox.find({}, (err: any, todoList: any) => {
				if (err) {
					console.log(err);
				}else {
					res.json(todoList);
				}
			});
		}
    })
});


app.listen(8888,function(){
    console.log('Example app listening on port 8888!');
})