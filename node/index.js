/*
 * @Author: your name
 * @Date: 2021-01-26 16:26:16
 * @LastEditTime: 2021-01-26 17:12:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /公众号测试/node/index.js
 */
// /*
//  * @Author: your name
//  * @Date: 2021-01-26 16:26:16
//  * @LastEditTime: 2021-01-26 16:28:14
//  * @LastEditors: Please set LastEditors
//  * @Description: In User Settings Edit
//  * @FilePath: /公众号测试/node/index.js
//  */
const express = require('express')
const app = express()
const port = 5500
var crypto =  require('crypto');
var config = {
    token:"dsg603"
};


app.get('/',function(req,res){
    console.dir(req,"获取微信服务器Get请求的参数")
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature,//微信加密签名
        timestamp = req.query.timestamp,//时间戳
            nonce = req.query.nonce,//随机数
          echostr = req.query.echostr;//随机字符串
  
    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [config.token,timestamp,nonce];
    array.sort();
  
    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型 
    var resultCode = hashCode.update(tempStr,'utf8').digest('hex'); //对传入的字符串进行加密
  
    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(resultCode === signature){
        res.send(echostr);
    }else{
        res.send('mismatch');
    }
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


