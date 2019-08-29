import mongoose = require('mongoose');
import config from './config';
  const options = {server: {socketOptions: {keepAlive: 1}}};
  const uri = config.db_uri;
  console.log(`connect to  ${uri} ...`);
  mongoose.connect(uri,options,(err:any)=>{
    if(err){
      console.warn('数据库连接失败：'+err);
    }else {
      console.log('数据库成功连接到：'+uri);
    }
  });
  const db = mongoose.connection;//获取connection实例
  // //使用Connetion监听连接状态
  db.on('connected',function(err){
      if(err){
          console.log('连接数据库失败：'+err);
      }else{
          console.log('连接数据库成功！');
      }
  });
export { mongoose };
