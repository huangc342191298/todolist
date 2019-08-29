import express=require('express');
import bodyParser = require('body-parser');
// 解析application/json数据
const jsonParser = bodyParser.json();
// 解析application/x-www-form-urlencoded数据
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//引入mogoose模块
import mongoose = require('mongoose');
//连接mongodb
let URL = 'mongodb://localhost:27017/runoob';

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

const Schema = mongoose.Schema;

//Todo Schema
const Todo = new Schema({
	content: {
		type: String, 
		required: true
	},
	date: {
		type: String, 
		required: true
	}
});
const TodoBox = mongoose.model('TodoBox', Todo);

// var TodoBox = new TodoBox({
//     content: '面试',
//     date: '2019-08-28'
// });

// TodoBox.save();
const app:express.Application=express();

// app.use(function(req, res, next) {
app.use((request: express.Request, response: express.Response, next: express.NextFunction): void => {

	response.header("Access-Control-Allow-Origin", "*" );//若需要加入withCredentials,则需要将*改为具体域名
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',(request: express.Request, response: express.Response) => {
	response.send('Hello World!');
});


// 获取全部的todo
app.get('/getAllItems', (request: express.Request, response: express.Response,next: express.NextFunction) => {
	TodoBox.find({}).sort({'date': -1}).exec((err: any, todoList: any) => {
		if (err) {
			console.log(err);
		}else {
			response.json(todoList);
		}
	})
});

// 添加todo
app.post('/addItem',urlencodedParser,(request: express.Request, response: express.Response) =>{
	let newItem = request.body;
	TodoBox.create(newItem, (err: any) => {
		if (err) {
			console.log(err);
		}else {
			TodoBox.find({}, (err: any, todoList: any) => {
				if (err) {
					console.log(err);
				}else {
					response.json(todoList);
				}
			});
		}
	})
})

// 删除todo
app.post('/deleteItem',urlencodedParser,(request: express.Request, response: express.Response) => {
    console.log(request.body);
    console.log(request.body._id);
    console.log(11111111111111111111111111);
	let delete_id = request.body._id
	TodoBox.deleteOne({_id: delete_id}, (err: any) => {
		if (err) {
			console.log(err)
		}else {
			response.json("success");
		}
	});
});
// 更新todo
app.post('/updateItem',urlencodedParser,(request: express.Request, response: express.Response) => {
    console.log(request.body);
    console.log(request.body._id);
    console.log(11111111111111111111111111);
    let update_id = request.body._id;
    // 生成参数
    const newContent={
        content: request.body.content
    };
	TodoBox.findByIdAndUpdate(update_id,newContent,  (err: any,result: any)=> {
        if (err) {
			console.log(err)
		}else {
			TodoBox.find({}, (err: any, todoList: any) => {
				if (err) {
					console.log(err);
				}else {
					response.json(todoList);
				}
			});
		}
    })
});


app.listen(8888,()=>{
    console.log('Example app listening on port 8888!');
})