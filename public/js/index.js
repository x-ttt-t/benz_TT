



$(function(){

    var $loginBox = $("#loginBox");
    var $reginBox = $("#registerBox");
    var $userInfo = $('#userInfo')    
    //切换到注册面板
    $loginBox.find('a.colMint').on('click',function(){
        $loginBox.hide();
        $reginBox.show();
    });
    //切换到登录面板
    $reginBox.find('a.colMint').on('click',function(){
        $reginBox.hide();
        $loginBox.show();
    });

    //注册
    $reginBox.find('button').on('click',function(){
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username: $reginBox.find('[name="username"]').val(),
                password:$reginBox.find('[name="password"]').val(),
                repassword:$reginBox.find('[name=repassword]').val()
            },
            dataType:'json',
            success:  function(result){
                console.log(result);
                $reginBox.find(".colWarning ").html(result.message);
                //如果code 不存在  则注册成功
                if(!result.code){
                    //注册成功
                    setTimeout(() => {
                    $reginBox.hide();
                    $loginBox.show();
                    },1000);
                }
            }
        })
    });



//登录
    $loginBox.find('button').on('click',function(){
        //通过ajax 提交请求
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username: $loginBox.find('[name="username"]').val(),
                password: $loginBox.find('[name="password"]').val(),
            },
            dataType:'json',
            success:function(result){
                // console.log(result);
                $loginBox.find('.colWarning').html(result.message);
                if(!result.code) {
                    //登录成功

                    // console.log("111");
                    // $loginBox.hide();
                    // userInfo.show();

                    // $userInfo.find('.username').html(result.userInfo.username);
                    // $userInfo.find('.info').html('你好欢迎光临我的博客')
                    setTimeout(function(result) {
                        console.log("111");
                        $loginBox.hide();
                        $userInfo.show();
                        //显示登录用户的信息

                        $userInfo.find('.username').html(result.userInfo.username);
                        $userInfo.find('.info').html('你好欢迎光临我的博客')
                    },1000);
                }
            }
        })
    });

})
