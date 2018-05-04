<template>
  <div id="temp">
    <!--登录界面-->
    <div id="panel">
      <!--面板的头部-->
      <div class="panel-header">
        <h2>登录</h2>
      </div>
      <!--面板的中间内容-->
      <div class="panel-content">
        <!--账号输入框-->
        <div class="user-pwd">
          <img src="../../../static/img/login/icon_people.png">
          <input placeholder="请输入用户名/手机号" name="user" v-model="user">
        </div>

        <!--密码输入框-->
        <div class="user-pwd">
          <img src="../../../static/img/login/icon_password.png">
          <input placeholder="请输入密码" type="password" name="pwd" v-model="password">
        </div>
        <!--默认的设置-->
        <div class="setting">

        </div>
        <!--登录按钮-->
        <button class="login-btn" @click="login" @keyup.enter="login">登&nbsp;录</button>
        <!--立即注册-->

      </div>
    </div>






  </div>
</template>

<script>
  export default {
    data () {
      return {
        user:"",
        password:"",
        mes:"",
        img:"",

        url:"",
        userID:0
      }
    },
    created:function (){

    },
    methods:{
      login(){
        var obj ={};
        obj.user = this.user;
        obj.password = this.password;
        var url = 'http://127.0.0.1/dip/php.php';
        this.$http.get(url,{
          params:{
            type:'login',
            name:obj.user,
            pwd:obj.password,
            roleId:obj.roleId
          }
        }).then(function (res){
          if(res.body.length==0){
            this.mes =  "该用户不存在";
            let user = "用户名";
          }else{
            for(var i=0;i<res.body.length;i++){
              if(res.body[i].psw==obj.password&&res.body[i].user_name==obj.user&&res.body[i].roleId==2){
//                this.image = res.body[i].image;
                this.userID = res.body[i].id;

                //设置一个对象存放数据,把登录的信息传放在临时存储中
                let obj = {};
                obj.userID =  this.userID;
                localStorage.setItem('login_mes', JSON.stringify(obj));
                console.log(JSON.stringify(obj));
                alert("登录成功");
                this.$router.push('/admin')
              }
              else if(res.body[i].psw==obj.password&&res.body[i].user_name==obj.user&&res.body[i].roleId==3){
                this.userID = res.body[i].id;
                let obj = {};
                obj.userID =  this.userID;
                localStorage.setItem('login_mes', JSON.stringify(obj));
                this.$router.push('/admin?roleId=super')
              }

            }
          }
        })
      }


    }
  }
</script>

<style scoped>
  *{
    margin: 0;
  }

  p{
    width: 100px;
    /*height: 2000px;*/
    background: darkblue;
  }

  /*面板*/
  #panel{
    width:400px;
    height: 400px;
    background-color: white;
    /*重写*/
    text-align: left;
    border-radius: 5px;

    box-shadow: -2px 2px 60px #f3f5f2;
    /*定位*/
    margin: 0 40%;
  }

  .panel-header{
    width:100%;
    height:64px;
    background-color: #475ee0;
    border-radius: 5px 5px 0 0;
    line-height: 64px;
    color:white;
    text-align: center;
    margin-bottom: 10px;
    cursor: move;
  }

  /*中间的主要内容*/
  .panel-content{
    padding: 20px;
  }

  .panel-content .user-pwd{
    margin-bottom: 15px;
    height: 40px;

    position: relative;
  }

  .panel-content .user-pwd img{
    position: absolute;
    top: 7px;
    left: 6px;
  }

  .panel-content .user-pwd input{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /*设置内边距*/
    padding-left: 38px;
    border-radius: 5px;
    border:1px solid #dddddd;

  }

  .panel-content .user-pwd input:focus{
    outline: none;
    border: 1px solid #475ee0;
    box-shadow: 0 0 10px #dfe5e9;
  }

  .setting a{
    color: darkgray;
    font-size: 13px;
  }

  .setting a.pull-right{
    float: right;
  }

  /*按钮*/
  .login-btn{
    margin: 15px 0;
    width: 100%;
    height: 38px;
    background-color: #475ee0;;
    /*去除边框*/
    border: 0;
    font-size: 20px;
    color: white;
    border-radius: 5px;
  }

  .login-btn:focus{
    outline: none;
  }

  .reg{
    text-align: center;
    margin-bottom: 15px;
    color: darkgray;
    font-size: 13px;
  }

  .reg a{
    color: orangered;
  }


  /*尾部*/
  .panel-footer{
    padding:0 20px;
    height: 44px;
    line-height: 44px;
  }

  .panel-footer img{
    width: 30px;
    vertical-align: middle;
  }
  #temp{
    width: 100%;
    margin-bottom: -30px;
    -webkit-background-size:100%;
    background-size: 100%;
    padding-top:70px;
    padding-bottom:60px;

  }

</style>
