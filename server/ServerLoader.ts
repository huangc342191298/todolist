import mongoose = require('mongoose');
import express=require('express');
const bodyParser = require('body-parser');
import config from './config/config';
import {Todo} from './models/model';

const port = config.app.port;
class ServerLoader {
  private app: express.Application

  constructor() {
    this.app = express()
  }





  config() {
    console.log('config...');
    this.errorHandle()
    this.initMiddleware()
    this.registerRouters()
  }

  initMiddleware() {
    console.log('initMiddleware...');
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));

  }

  errorHandle() {
    this.app.use((err: Error & { status: number },request: express.Request, response: express.Response, next: express.NextFunction): void =>{
      console.log(err.stack);
      response.status(err.status || 500);
      response.json({
        error: "Server error"
      })
    });
  }

  /**
   * 注册路由
   */
  registerRouters() {

    this.app.use((request: express.Request, response: express.Response, next: express.NextFunction): void => {

          response.header("Access-Control-Allow-Origin", "*" );//若需要加入withCredentials,则需要将*改为具体域名
          response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });

    this.app.get('/',(request: express.Request, response: express.Response) => {
          response.send('Hello World!');
      });


      // 获取全部的todo
    this.app.get('/getAllItems', (request: express.Request, response: express.Response,next: express.NextFunction) => {
      Todo.find({}).sort({'date': -1}).exec((err: any, todoList: any) => {
              if (err) {
                  console.log(err);
              }else {
                  response.json(todoList);
              }
          })
      });

      // 添加todo
    this.app.post('/addItem',(request: express.Request, response: express.Response) =>{
          let newItem = request.body;
      Todo.create(newItem, (err: any) => {
              if (err) {
                  console.log(err);
              }else {
                Todo.find({}, (err: any, todoList: any) => {
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
    this.app.post('/deleteItem',(request: express.Request, response: express.Response) => {
          console.log(request.body);
          console.log(request.body._id);
          console.log(11111111111111111111111111);
          let delete_id = request.body._id
          Todo.deleteOne({_id: delete_id}, (err: any) => {
                  if (err) {
                      console.log(err)
                  }else {
                      response.json("success");
                  }
              });
          });
      // 更新todo
    this.app.post('/updateItem',(request: express.Request, response: express.Response) => {
          console.log(request.body);
          console.log(request.body._id);
          console.log(11111111111111111111111111);
          let update_id = request.body._id;
          // 生成参数
          const newContent={
              content: request.body.content
          };
           Todo.findByIdAndUpdate(update_id,newContent,  (err: any,result: any)=> {
              if (err) {
                  console.log(err)
              }else {
                Todo.find({}, (err: any, todoList: any) => {
                      if (err) {
                          console.log(err);
                      }else {
                          response.json(todoList);
                      }
                  });
              }
          })
      });

    console.log('registerRouters... completed');
  }

  listen() {
    this.config()
    this.app.listen(port)
    console.log('Server is listening port: ' + config.app.port)
    console.log(config.baseUrl)
  }

  static initialize() {
    console.log('Initialize server')
    const loader = new ServerLoader()
    loader.listen()
  }
}

export default ServerLoader