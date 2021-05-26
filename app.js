

//加载express模块
var express = require('express');  

//加载模板处理模块
var swig = require('swig');

//加载数据库模块
var mongoose = require('mongoose');

//加载body-parse.用来处理post提交的请求
var bodyParser = require('body-parser');

//加载cookies模块
const Cookies = require('cookies');

//创建app应用 => NodeJS http.createServer();
var app = express();

//设置静态文件托管
//当用户访问的url以/public开始,那么直接返回对应__dirname + '/public'下的文件
app.use('/public',express.static(__dirname + '/public'));


//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数，模板引擎的名称，同时也是模板文件的后缀
//第二个参数  模板的处理方法 


app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');

//在开发中，需要取消模板缓存
//可以将缓存所关闭 从而可以不需要通过重启app.js 来刷新缓存而达到修改页面的效果 
swig.setDefaults({cache:false});

//设置cookie
app.use(function(req,res,next){
  req.cookies = new Cookies(req,res);

  //解析登录用户的cookie信息
  req.userInfo = {};
  if(req.cookies.get('userInfo')) {
   
    try {
        req.userInfo = JSON.parse(rq.cookies.get('userInfo'));
    }catch(e){}
  }
  
  next();
})
//bodyparser设置
app.use(bodyParser.urlencoded({extended:true}));


//   首页 
//   req request对象
//   res response对象

//根据不同的功能划分模块


app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

//监听http请求
mongoose.connect('mongodb://localhost:27018/blog',{useUnifiedTopology:true,useNewUrlParser:true},function(err){
  if(err){
    console.log('数据库连接失败');
  }else {
    console.log('数据库连接成功');
    app.listen(8081)
  }
})


//   next 函数

app.get('/',function(req,res,next) {
    
    // 读取views 目录下的指定文件，解析并返回给客户端
    //第一个参数，表示模板的文件，相对于views目录  views/index.html
    //第二个参数，传递给模板使用的数据

    res.render('main/index');
})

app.get('/main.css',function(req,res,next){
  res.setHeader('content-type','text/css');
  res.send("body {bockground: red;}");
})
   //监听http请求


//总流程 用户发送http请求 ->url ->找到匹配的规则 -> 指定绑定函数,返回对应内容至客户端

//public -> 静态 -> 直接读取指定目录下的文件，返回给用户 -> 动态 -> 处理业务逻辑，加载模板，解析模板 -> 返回给用户

