
const { response } = require('express');
var express = require('express');
var router = express.Router();

var User = require('../models/User')


// 统一返回格式

var responseDate;



router.use(function(req,res,next){
    responseDate = {
        code : 0,
        message :''
    }
    next();
}) 

//用户注册
//注册逻辑
//1.用户名不能为空
//2.密码不能为空
// 3.两次输入密码必须一致

// 1.用户是否被注册了  --数据库查询


// 


router.post('/user/register',function(req,res,next){
   var username = req.body.username;
   var password = req.body.password;
   var repassword = req.body.repassword;

   //用户是否为空

   if(username == ''){
       responseDate.code = 1;
       responseDate.message = '用户名不能为空';
       res.json(responseDate);
       return;
   }
   if(password == ''){
       responseDate.code = 2;
       responseDate.message = '密码不能为空';
       res.json(responseDate);
       return;
   }
   //两次输入的密码必须一致
   if( password != repassword) {
       responseDate.code = 3;
       responseDate.message = '两次输入的密码不一致';
       res.json(responseDate);
       return;
   } 


   //用户名是否已经被注册，如果数据库中已经存在了同样的名字，那么已经被注册
   User.findOne({
       username:username
   }).then(function(userInfo){
    if(!userInfo) {
        //数据库中有该记录
        responseDate.code  = 4;
        responseDate.message = "用户名已经被注册";
        res.json(responseDate);
        return;
    }      
    //保存用户注册的信息到数据库中
    var user = new User({
        username:username,
        password:password
    });
     return user.save();
    
    
    }).then(function(newUserInfo){
        console.log(newUserInfo);
        responseDate.message="注册成功";
        res.json(responseDate);
   
    responseDate.message='注册成功';
    res.json(responseDate);
   });
});

//登录
router.post('/user/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    if(username == '' || password == '') {
        responseDate.code = 1 ;
        responseDate.message = '用户名和密码不能为空';
        res.json(responseDate);
        return;
    }

    //查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功

    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        if(!userInfo) {
            responseDate.code = 2 ;
            responseDate.message = '用户名或密码错误';
            res.json(responseDate);
            return;
        }
        //用户名和密码是正确的 
        responseDate.message = '登录成功';
        responseDate.userInfo = {
            _id:userInfo._id,
            username:userInfo.username
        }
        req.cookies.set('userInfo',JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }));
        res.json(responseDate);
        return;
    })
})


module.exports = router;
