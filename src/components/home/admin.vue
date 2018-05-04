<template>
  <div id="temp">
    <el-container>
      <el-aside width="200px">
        <ul id="list">
          <li v-if="ishowadmin" @click="getAdmin">管理员管理</li>
          <li v-for="item in arr" @click="getMes(item.id)">{{item.txt}}</li>
        </ul>

      </el-aside>
      <el-container>
        <el-header>
          <h1 >瞳美幼儿启蒙教育网站后台管理系统</h1>
        </el-header>
        <el-main>
          <div v-show="ishow3">
            <div style="overflow: hidden;margin-bottom: 20px;">
            <el-row style="float: left;">
              <el-button type="primary" @click="giveAdmin">注册管理员账号</el-button>
            </el-row>
            </div>
            <el-dialog
              :visible.sync="dialogVisible0"
              width="40%" style="background: transparent;">
              <!--登录界面-->
              <div id="panel">
                <!--面板的头部-->
                <div class="panel-header">
                  <h2>账号注册</h2>
                </div>
                <!--面板的中间内容-->
                <!--<form >-->
                <div class="panel-content">
                  <!--昵称-->
                  <div class="user-pwd">
                    <img src="../../../static/img/login/icon_people.png">

                    <input placeholder="请输入昵称" name="user" v-model="name">
                  </div>
                  <!--账号输入框-->
                  <div class="user-pwd">
                    <i class="el-icon-phone"></i>
                    <input placeholder="手机号" name="number" v-model="tel">
                  </div>
                  <!--密码输入框-->
                  <div class="user-pwd">
                    <img src="../../../static/img/login/icon_password.png">
                    <input placeholder="请输入密码" type="password" name="pwd" v-model="pwd">
                  </div>
                  <!--确认密码输入框-->
                  <div class="user-pwd">
                    <img src="../../../static/img/login/icon_password.png">
                    <input placeholder="请确认密码" type="password" name="pwd" v-model="pwd2">
                  </div>
                  <!--确认密码输入框-->
                  <div class="user-pwd">
                    <i class="el-icon-view"></i>
                    <input placeholder="宝宝的年龄" type="number" name="age" v-model="age">
                  </div>
                  <div style="margin: 20px auto;width: 40%;">
                    <div class="userImg" id="title_img"  :style="{backgroundImage: 'url(' + HeadImageUrl + ')'}" >
                      <input class="Cover_three"  name="pic[]" multiple id="myinput"
                             type="file" ref="coverImg"  @change="changeFile($event)"
                             accept="image/*"  multiple placeholder="请上传头像" style="opacity: 0">
                    </div>
                    <span style="text-align: center;width: 60%;display: inline-block">请上传头像</span>
                  </div>
                  <!--登录按钮-->
                  <button class="login-btn" @click="resgiter">注册</button>
                </div>
              </div>
            </el-dialog>
            <el-dialog
              :visible.sync="dialogVisible"
              width="30%">
              <span>确认删除该用户信息？</span>
              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delUser()">确 定</el-button>
  </span>
            </el-dialog>
            <table class="tables">
              <tr >
                <th>用户ID</th>
                <th>昵称</th>
                <th>用户宝宝年龄</th>
                <th>用户角色</th>
                <th>用户电话号码</th>
                <th>操作</th>
              </tr>
              <tr  v-for="item in adminMes">
                <td>{{item.id}}</td>
                <td>{{item.user_name}}</td>
                <td>{{item.age}}</td>
                <td>管理员</td>
                <td>{{item.tel}}</td>
                <td><el-row>
                  <el-button type="danger" @click="delUser1(item.id)">删除</el-button>
                </el-row></td>
              </tr>
            </table>
          </div>
          <div v-show="ishow1">
          <div id="box1" class="clearfix">
            <div>
              <i class="el-icon-search" ></i>
              <input type="text" v-model="logo" placeholder="请搜索" >
            </div>
          </div>

            <el-dialog
              :visible.sync="dialogVisible"
              width="30%">
              <span>确认删除该用户信息？</span>
              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delUser()">确 定</el-button>
  </span>
            </el-dialog>

          <table class="tables">
            <tr >
              <th>用户ID</th>
              <th>昵称</th>
              <th>用户宝宝年龄</th>
              <th>用户角色</th>
              <th>用户电话号码</th>
              <th>操作</th>
            </tr>
            <tr  v-for="item in filteredData">
              <td>{{item.id}}</td>
              <td>{{item.user_name}}</td>
              <td>{{item.age}}</td>
              <td>普通用户</td>
              <td>{{item.tel}}</td>
              <td><el-row>
                <el-button type="danger" @click="delUser1(item.id)">删除</el-button>
              </el-row></td>
            </tr>
          </table>

          </div>
          <div v-show="ishow2">
          <div id="box2" class="clearfix">
            <div>
              <i class="el-icon-search" ></i>
              <input type="text" v-model="logo1" placeholder="请搜索" >
            </div>
          </div>

            <el-dialog
              :visible.sync="dialogVisible1"
              width="30%">
              <span>确认删除该用户信息？</span>
              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="delMes()">确 定</el-button>
  </span>
            </el-dialog>

          <table class="tables">
            <tr >
              <th>用户</th>
              <th>时间</th>
              <th>留言内容</th>
              <th>操作</th>
            </tr>
            <tr  v-for="item in filteredData1">
              <td>{{item.userID}}</td>
              <td>{{item.time}}</td>
              <td>{{item.content}}</td>
              <td><el-row>
                <el-button type="danger" @click="delMes1(item.id)">删除</el-button>
              </el-row></td>
            </tr>
          </table>

            <el-pagination style="margin:20px -60px; "
                           @current-change="handleCurrentChange"
                           background
                           layout="prev, pager, next"
                           :total="pagecount ">
            </el-pagination>

          </div>
          <div v-show="ishow4">
            <div id="box4" class="clearfix">
              <div>
                <i class="el-icon-search" ></i>
                <input type="text" v-model="logo2" placeholder="请搜索" >
              </div>
            </div>
            <el-dialog
              :visible.sync="dialogVisible2"
              width="20%">
              <span>确认删除该内容？</span>
              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="delshare()">确 定</el-button>
  </span>
            </el-dialog>
            <el-dialog
              :visible.sync="dialogVisible3"
              width="30%">
              <div>
                <div>
                  <p>分享时间：{{shareObj.time}}</p>
                  <p style="text-align: center;">标题图片</p>
                  <img :src="uerimg(shareObj.image)" alt="" style="width: 70%;">
                </div>
                <div>
                  <h3>分享内容</h3>
                  <div v-for="items in shareObj.obj">
                    <p v-if="items.type">{{items.content}}</p>
                    <div v-if="!items.type">
                      <img :src="uerimg(items.content)" alt="" style="width: 70%;" ></div>
                  </div>
                </div>
                <div></div>

              </div>

    <el-button type="primary" @click="dialogVisible3 = false" style="margin-top: 30px;">关闭</el-button>

            </el-dialog>
            <table class="tables">
              <tr >
                <th>文章名字</th>
                <th>分享时间</th>
                <!--<th>用户宝宝年龄</th>-->
                <th>操作</th>
              </tr>
              <tr  v-for="item in filteredData2">
                <td>{{item.name}}</td>
                <td>{{item.time}}</td>
                <td>
                  <el-row>
                    <el-button type="primary" @click="Getshare(item)">查看详情</el-button>
                    <el-button type="primary" @click="Getshare(item)">审核结果</el-button>
                    <el-button type="success" icon="el-icon-check" circle></el-button>
                    <el-button type="danger" icon="el-icon-error" circle></el-button>
                    <el-button type="danger" @click="delShare(item.name)">删除</el-button>
                </el-row></td>
              </tr>
            </table>
          </div>
          <div v-show="ishow5">
            <div>
            <el-row >
              <el-button type="primary" @click="addStory" style="float: left;">添加绘本信息</el-button>
            </el-row>
            </div>
            <el-dialog
              :visible.sync="dialogVisible4"
              width="40%">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="标题图片">
                  <div >
                    <li   class="userImg"    id="title_img1" style="position: relative;">
                      <img :src="uerimg(form.HeadUrlTitle)" alt="" style="width: 300px;height: 100px;float: left;" >
                      <input class="Cover_three"  name="pic0[]" multiple id="myinput1"
                             type="file" ref="coverImg"  @change="changeFile1($event)"
                             accept="image/*"  multiple style="position: absolute;left: 0;top: 0;opacity: 0" >
                      <p style="text-align:center;line-height: 50vw;">
                      </p>
                    </li>
                  </div>
                </el-form-item>

                <hr>
                <h2>绘画内容</h2>
                <el-form-item >
                  <ul >
                    <li v-for="item in storyObj">
                      <div v-if="!item.type" style="width: 500px;">{{item.content}}</div>
                      <div v-if="item.type" ><img :src="uerimg(item.content)" alt="" style="width: 250px;"></div>
                    </li>
                  </ul>
                </el-form-item>



                <el-form-item label="发表文字">
                  <el-input type="textarea" v-model="form.desc" ></el-input>
                  <img :src="uerimg('1/btn1.png')" alt="" style="width: 300px;height: 40px;float: left; " @click="submitText" >
                </el-form-item>


                <el-form-item label="发表图片">
                  <img :src="uerimg('1/btn2.png')" alt="" style="width: 300px;height: 40px;float: left;">
                  <input class="Cover_three"  name="pic2[]" multiple id="myinput2"
                         type="file" ref="coverImg"  @change="changeFile2($event)"
                         accept="image/*"  multiple style="position: absolute;left: 0;top: 0;opacity: 0" >
                </el-form-item>


                <el-form-item>
                  <el-button type="primary"  @click="submitStory">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

            <table class="tables">
              <tr >
                <th>标题</th>
                <th>时间</th>
                <th>点赞数量</th>
                <th>浏览次数</th>
              </tr>
              <tr  v-for="item in arrStory">
                <td>{{item.title}}</td>
                <td>{{item.time}}</td>
                <td>{{item.add}}</td>
                <td>{{item.seenum}}</td>
                <td>
                  <el-row>
                  <el-button type="danger" @click="delMes1(item.id)">删除</el-button>
                </el-row></td>
              </tr>
            </table>
          </div>
          <div v-show="ishow6">
            <el-dialog
              :visible.sync="dialogVisible6"
              width="40%">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程分类:">
                  <el-radio-group v-model="courseobj.courseId">
                    <el-radio :label="'poem'">唐诗</el-radio>
                    <el-radio :label="'idoms'">成语</el-radio>
                    <el-radio :label="'handmake'">手工制作</el-radio>
                    <el-radio :label="'paint'">绘画</el-radio>
                    <el-radio :label="'music'">童谣</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="课程名称:">
                  <el-input v-model="courseobj.name"></el-input>
                </el-form-item>
               <el-form-item label="课程封面:">
                 <div class="userImg"  :style="{backgroundImage: 'url(' + uerimg(courseobj.headimg) + ')'}" >
                   <input class="Cover_three"  name="picCourse" multiple id="myinputcourse"
                          type="file" ref="coverImg"  @change="changeFile3($event)"
                          accept="image/*"  multiple placeholder="请上传头像" style="opacity: 0">
                 </div>
                </el-form-item>
                <el-form-item label="上传课程:">
                  <div class="userImg"    >
                    <input class="Cover_three"  name="srcCourse" multiple id="myinputsrc"
                           type="file" ref="coverImg"
                           accept="*"  multiple placeholder="请上传视频" style="display: inline-block" >
                    <input type="button" @change="changeFile4($event)"  style="display: inline-block" value="上传">
                  </div>
                </el-form-item>
              </el-form>
              <el-row>
                <el-button type="primary" @click="CourseSubmit">创建</el-button>
              </el-row>
            </el-dialog>
            <div>
              <el-row>
              <el-button type="primary" @click="addCourse" style="float: left;">添加课程信息</el-button>
                <el-button type="warning" icon="el-icon-message" @click="getCourse">全部</el-button>
                <el-button type="warning" icon="el-icon-message" @click="changeCourse('poem')">唐诗</el-button>
                <el-button type="warning" icon="el-icon-message" @click="changeCourse('idoms')">成语故事</el-button>
                <el-button type="warning" icon="el-icon-message" @click="changeCourse('handmake')">手工制作</el-button>
                <el-button type="warning" icon="el-icon-message" @click="changeCourse('paint')">绘画</el-button>
                <el-button type="warning" icon="el-icon-message" @click="changeCourse('music')">童谣</el-button>

              </el-row></div>
            <table class="tables">
              <tr >
                <th>id</th>
                <th>类型</th>
                <th>标题</th>
                <th>标题图片</th>
                <th>浏览次数</th>
                <th>操作</th>
              </tr>
              <tr  v-for="item in courseArr">
                <td>{{item.Id}}</td>
                <td v-show="item.typeCourse=='poem'">唐诗</td>
                <td v-show="item.typeCourse=='idoms'">成语故事</td>
                <td v-show="item.typeCourse=='handmake'">手工制作</td>
                <td v-show="item.typeCourse=='paint'">绘画</td>
                <td v-show="item.typeCourse=='music'">童谣</td>
                <td>{{item.name}}</td>
                <td><img :src="uerimg(item.img)" alt="" style="width: 60px;" ></td>
                <td>{{item.plus}}</td>
                <td>
                  <el-row>
                    <el-button type="danger" @click="delCourse(item.Id)">删除</el-button>
                  </el-row></td>
              </tr>
            </table>

          </div>
          <div v-show="ishow7">
            <div>
              <el-row>
              <el-button type="primary" @click="addMusic" style="float: left;">添加视频</el-button>
              <el-button type="warning" icon="el-icon-message" @click="getmusic()">全部</el-button>
              <el-button type="warning" icon="el-icon-message" @click="changeMuisc('age')">字头歌</el-button>
              <el-button type="warning" icon="el-icon-message" @click="changeMuisc('gir')">连锁调歌</el-button>
              <el-button type="warning" icon="el-icon-message" @click="changeMuisc('music')">教诲儿歌</el-button>
              <el-button type="warning" icon="el-icon-message" @click="changeMuisc('sleep')">摇篮曲</el-button>
            </el-row>
            </div>

            <el-dialog
              :visible.sync="dialogVisible7"
              width="50%">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程分类">
                  <el-radio-group v-model="musicobj.courseId">
                    <el-radio :label="'age'">字头歌</el-radio>
                    <el-radio :label="'gir'">连锁调歌</el-radio>
                    <el-radio :label="'music'">教诲儿歌</el-radio>
                    <el-radio :label="'sleep'">摇篮曲</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="视频名称">
                  <el-input v-model="musicobj.name"></el-input>
                </el-form-item>
                <el-form-item label="视频封面">
                  <div class="userImg" id=""  :style="{backgroundImage: 'url(' + uerimg(musicobj.headimg) + ')'}" >
                    <input class="Cover_three"  name="picCourse1" multiple id="myinputcourse1"
                           type="file" ref="coverImg"  @change="changeFile5($event)"
                           accept="image/*"  multiple placeholder="请上传头像" style="opacity: 0">
                  </div>
                </el-form-item>
                <el-form-item label="上传课程">
                  <div class="userImg"    >
                    <input class="Cover_three"  name="srcCourse1" multiple id="myinputsrc1"
                           type="file" ref="coverImg"
                           accept="*"  multiple placeholder="请上传视频" style="display: inline-block" >
                    <input type="button" @change="changeFile6($event)"  style="display: inline-block" value="上传">
                  </div>
                </el-form-item>
              </el-form>
              <el-row>
                <el-button type="primary" @click="MusicSubmit">创建</el-button>
              </el-row>
            </el-dialog>

            <table class="tables">
              <tr >
                <th>id</th>
                <th>类型</th>
                <th>标题</th>
                <th>标题图片</th>
                <th>浏览次数</th>
                <th>操作</th>
              </tr>
              <tr  v-for="item in musicArr">
                <td>{{item.id}}</td>
                <!--<td>{{item.typeMusic}}</td>-->
                <td v-show="item.typeMusic=='age'">字头歌</td>
                <td v-show="item.typeMusic=='gir'">连锁调歌</td>
                <td v-show="item.typeMusic=='music'">教诲儿歌</td>
                <td v-show="item.typeMusic=='sleep'">摇篮曲</td>
                <td>{{item.title}}</td>
                <td><img :src="uerimg(item.img)" alt="" style="width: 60px;" ></td>
                <td>{{item.plus}}</td>
                <td>
                  <el-row>
                    <el-button type="danger" @click="delMusic(item.id)">删除</el-button>
                  </el-row></td>
              </tr>
            </table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg:"ass",
      arr:[
        {txt:"用户管理",id:"user"},
        {txt:"留言板管理",id:"leames"},
        {txt:"分享管理",id:"publish"},
        {txt:"绘本管理",id:"story"},
        {txt:"课程管理",id:"course"},
        {txt:"音乐模板管理",id:"music"},
      ],
      userMes:[],
      logo:"",
      ishow1:false,
      ishow2:false,
      ishow3:false,
      ishow4:false,
      ishow5:false,
      ishow6:false,
      ishow7:false,
      dialogVisible:false,
      dialogVisible1:false,
      dialogVisible0:false,
      dialogVisible2:false,
      dialogVisible3:false,
      dialogVisible4:false,
      dialogVisible6:false,
      dialogVisible7:false,
      delId:0,
      comments_list:[],
      pagecount:0,
      num:1,
      logo1:"",
      logo2:"",
      mesId:0,
      ishowadmin:false,
      adminMes:[],
      name:'',
      age:'',
      tel:'',
      pwd:'',
      pwd2:'',
      image:"",
      HeadImageUrl: "../../../static/img/upload.jpg" ,  //标题默认图片
      CourseImageUrl:"../../../static/img/upload.jpg",
      HeadImageTitle: "" ,  //标题默认图片
      arrShare:[], //分享页面的数据
      shareID:0,
      shareObj:{},
      arrStory:[],
      form: {
        name: '',
        HeadUrlTitle:"1/headimg_0321.png",
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      courseobj:{
        name:"",
        courseId:'',
        headimg:"/1/upload.jpg",
        src:""
      },
      musicobj:{
        name:"",
        courseId:'',
        headimg:"/1/upload.jpg",
        src:""
      },
      storyObj:[],
      courseArr:[],
      musicArr:[],


    }},
     created(){
    if(this.$route.query.roleId == "super"){
        this.ishowadmin = true;
    }
     },
  computed: {
//    过滤器

    filteredData: function () {
      var self = this;
      return this.userMes.filter(function (item) {
        return item.user_name.toLowerCase().indexOf(self.logo.toLowerCase()) !== -1;
      })
    },
    filteredData1: function () {
      var self = this;
      return this.comments_list.filter(function (item) {

          return String(item.userID).indexOf(self.logo1) != -1;
      })
    },
    filteredData2: function () {
      var self = this;
      return this.arrShare.filter(function (item) {

        return item.name.toLowerCase().indexOf(self.logo2.toLowerCase()) !== -1;
      })}
  },

  methods:{
    MusicSubmit(){
//      alert("创建")
      if(!this.musicobj.courseId){
        alert("请输入课程的类型");
        return false;
      }
      else if(this.musicobj.headimg == "/1/upload.jpg"){
        alert("请选择封面图片")
        return false;
      }
      else if(!this.musicobj.src){
        alert("请输入课程视频");
        return false;
      }
      else{
        alert(this.musicobj.courseId)

        this.dialogVisible7 = false;
        var url = 'http://127.0.0.1/dip/diplomaProject/php/music.php';
        this.$http.get(url,{
          params:{
            type:'add',
            courseType:this.musicobj.courseId,
            name:this.musicobj.name,
            headimg:this.musicobj.headimg,
            src:this.musicobj.src,
          }
        }).then(function (res) {
          console.log(res);
          this.getmusic();
        })


      }
    },
    addMusic(){
      this.dialogVisible7 = true;
    },
    changeMuisc(id){
      var url = "http://127.0.0.1/dip/diplomaProject/php/music.php";
      this.$http.get(url,{
          params:{
            type:'getMusicType',
            musicType:id
          }
        }
      ).then(
        function (res) {
          this.musicArr = JSON.parse(res.bodyText);
        },
        function (err) {
          console.log(err);
        }
      )
    },

       //加载音乐
    getmusic(){
      this.$http.get('http://127.0.0.1/dip/diplomaProject/php/music.php', {
        params: {
          type: 'get_Music'
        }
      }).then(function (res) {
        this.musicArr = res.body;
        console.log(this.musicArr);

      })
    },
    delMusic(id){
      alert(id)
      this.$http.get('http://127.0.0.1/dip/diplomaProject/php/music.php', {
        params: {
          type: 'del',
          id:id,
        }
      }).then(function (res) {
        console.log(res);
        this.getmusic();

      })
    },
    Coursechange(cou){
      this.courseobj.courseId = cou;
    },
       //添加课程信息
    CourseSubmit(){
     if(!this.courseobj.courseId){
        alert("请输入课程的类型");
        return false;
      }
      else if(this.courseobj.headimg == "/1/upload.jpg"){
        alert("请选择封面图片")
        return false;
      }
      else if(!this.courseobj.src){
        alert("请输入课程视频");
         return false;
      }
      else{
        this.dialogVisible6 = false;
       var url = 'http://127.0.0.1/dip/diplomaProject/php/course.php';
       this.$http.get(url,{
         params:{
           type:'add',
           courseType:this.courseobj.courseId,
           name:this.courseobj.name,
           headimg:this.courseobj.headimg,
           src:this.courseobj.src,
         }
       }).then(function (res) {
         console.log(res);
         this.getCourse();
       })


      }


    },
       //添加课程
    addCourse(){
      this.dialogVisible6 = true;
    },
       //删除课程信息
    delCourse(id){
      alert("确认删除该课程的信息？")
      var url = 'http://127.0.0.1/dip/diplomaProject/php/course.php';
      this.$http.get(url,{
        params:{
          type:'del',
          id:id,
        }
      }).then(function (res) {
        console.log(res);
        this.getCourse();
      })
    },
    submitStory(){
      if(!this.form.name){
        alert("请输入标题名字")
        return false ;
      }
      else if(!this.storyObj.length){
        alert("请输入内容");
        return false;
      }
      else if(this.form.HeadUrlTitle=="1/headimg_0321.png"
      ){
        alert("请上传封面图片");
        return false ;
      }
      else{
        let data = {};
        data.name = this.form.name;
        data.obj = JSON.stringify(this.storyObj);
        data.url = this.form.HeadUrlTitle;
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        data.time = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
        console.log(data);
        var url = 'http://127.0.0.1/dip/diplomaProject/php/story.php';
        this.$http.get(url,{
          params:{
            type:'add_story',
            headimg:data.url,
            title:data.name,
            obj:data.obj,
            time:data.time
          }
        }).then(function (res) {
          console.log(res);
          this.getstory();
        })
      }
    },
    submitText(){
      if(!this.form.desc){
        alert("请输入内容");
      }else{
        let obj = {};
        obj.type= 0;
        obj.content= this.form.desc ;
        let scope = this;
        console.log(obj);
        scope.storyObj.push(obj);
        console.log(scope.storyObj);
        scope.form.desc = ""
      }

    },
    uerimg(imgurl) {
      return "http://127.0.0.1/dip/diplomaProject/php/Upload/uploads/" + imgurl;
    },
    changeFile2(e) {
//---------------获取图片的数据流------------------
      var scope = this;
//     ---------获取图片的具体的信息,并上传到服务器,并返回--------
      var fd = new FormData();
      fd.append("pic2", document.getElementById("myinput2").files[0]);
      var url = "http://127.0.0.1/dip/diplomaProject/php/Upload/upload.php";
      $.ajax({
        url: url,
        type: "post",
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
          console.log(res);
//            保存图片的地址以及图片的路径
          let obj= {};
          obj.type = 1;
          obj.content = res.data.pic2.savepath + res.data.pic2.savename;
          scope.storyObj.push(obj);
          console.log(scope.storyObj);

        },
        dataType: "json"
      })

    },
    changeFile1(e) {
//---------------获取图片的数据流------------------
   var scope = this;
//     ---------获取图片的具体的信息,并上传到服务器,并返回--------
      var fd = new FormData();
      fd.append("pic0", document.getElementById("myinput1").files[0]);
      var url = "http://127.0.0.1/dip/diplomaProject/php/Upload/upload.php";
      $.ajax({
        url: url,
        type: "post",
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
          console.log(res);
//            保存图片的地址以及图片的路径
          scope.form.HeadUrlTitle = res.data.pic0.savepath + res.data.pic0.savename;
          console.log(scope.form.HeadUrlTitle)

        },
        dataType: "json"
      })

    },
    changeFile3(e) {
//---------------获取图片的数据流------------------
      var scope = this;
//     ---------获取图片的具体的信息,并上传到服务器,并返回--------
      var fd = new FormData();
      fd.append("picCourse", document.getElementById("myinputcourse").files[0]);
      var url = "http://127.0.0.1/dip/diplomaProject/php/Upload/upload.php";
      $.ajax({
        url: url,
        type: "post",
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
          console.log(res);
//            保存图片的地址以及图片的路径
          scope.courseobj.headimg = res.data.picCourse.savepath + res.data.picCourse.savename;
          console.log(scope.courseobj.headimg)

        },
        dataType: "json"
      })

    },
    changeFile5(e) {
//---------------获取图片的数据流------------------
      var scope = this;
//     ---------获取图片的具体的信息,并上传到服务器,并返回--------
      var fd = new FormData();
      fd.append("picCourse1", document.getElementById("myinputcourse1").files[0]);
      var url = "http://127.0.0.1/dip/diplomaProject/php/Upload/upload.php";
      $.ajax({
        url: url,
        type: "post",
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
          console.log(res);
//            保存图片的地址以及图片的路径
          scope.musicobj.headimg = res.data.picCourse1.savepath + res.data.picCourse1.savename;
          console.log(scope.musicobj.headimg)

        },
        dataType: "json"
      })

    },
    changeFile4(e) {
//---------------获取图片的数据流------------------
      var scope = this;
//     ---------获取图片的具体的信息,并上传到服务器,并返回--------
      var fd = new FormData();
      fd.append("srcCourse", document.getElementById("myinputsrc").files[0]);
      var url = "http://127.0.0.1/dip/diplomaProject/php/Upload/upload.php";
      $.ajax({
        url: url,
        type: "post",
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
          console.log(res);
//            保存图片的地址以及图片的路径
          scope.courseobj.src = res.data.srcCourse.savepath + res.data.srcCourse.savename;
          console.log(scope.courseobj.src)

        },
        dataType: "json"
      })

    },
    changeFile6(e) {
//---------------获取图片的数据流------------------
      var scope = this;
//     ---------获取图片的具体的信息,并上传到服务器,并返回--------
      var fd = new FormData();
      fd.append("srcCourse1", document.getElementById("myinputsrc1").files[0]);
      var url = "http://127.0.0.1/dip/diplomaProject/php/Upload/upload.php";
      $.ajax({
        url: url,
        type: "post",
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
          console.log(res);
//            保存图片的地址以及图片的路径
          scope.musicobj.src = res.data.srcCourse1.savepath + res.data.srcCourse1.savename;
          console.log(scope.musicobj.src)

        },
        dataType: "json"
      })

    },
    addStory(){
     this.dialogVisible4 = true;
    },
    uerimg(imgurl) {
      return "http://127.0.0.1/dip/diplomaProject/php/Upload/uploads/" + imgurl;
    },
    Getshare(mes){
      this.dialogVisible3 = true;
      this.shareObj = mes;
      console.log(this.shareObj);
    },
    delShare(id){ //分享删除页面
      this.dialogVisible2 = true;
      this.dialogVisible = false;
      this.shareID = id;
    },
    delshare(){ //确认删除
      this.dialogVisible2 = false;
      var url = 'http://127.0.0.1/dip/php.php';
      this.$http.get(url,{
        params:{
          type:'delshare',
          id:this.shareID,
        }
      }).then(function (res) {
        console.log(res);
        this.getshare();
      })
    },
    changeFile(e) {
//---------------获取图片的数据流------------------
      var scope = this
      let file = e.target.files[0];
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onloadend = function (e) {
          scope.HeadImageUrl = e.target.result
        };
      };
//     ---------获取图片的具体的信息,并上传到服务器,并返回--------
      var fd = new FormData();
      fd.append("pic", document.getElementById("myinput").files[0]);
      var url = "http://127.0.0.1/dip/diplomaProject/php/Upload/upload.php";
      $.ajax({
        url: url,
        type: "post",
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
//            保存图片的地址以及图片的路径
          scope.HeadUrl = res.data.pic.savepath + res.data.pic.savename;
          scope.image = scope.HeadUrl;

        },
        dataType: "json"
      })

    },
    //输入错误的弹出框
    open(mes,user,name) {
      this.$alert('请输入正确的密码', "111", {
        confirmButtonText: '确定',
        callback: action => {
          if(name == 1){
          }
        }
      });
    },
    resgiter(){

      //判断是否是手机号码的正则
      let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if(this.name.length == 0)
      {
        return false;

      }
      else if(this.name.length > 14){

        return false;

      }
      else if(this.tel.length == 0){
        alert("请输入电话号码");
        return false;
      }
      else if(!myreg.test(this.tel)){
        alert("请检查是否输入正确的电话号码");
        return false;
      }
      else if(this.pwd.length == 0){
        alert("请输入电话号码")
        return false;
      }
      else if(this.pwd2.length == 0){
        alert("请输入确认电话号码")
        return false;
      }
      else if(this.pwd != this.pwd2){
        alert("两次密码输入不正确,请重新输入");
        return false;

      }
      else if(this.age == 0){
        alert("请输入宝宝年龄");
        return false;
      }
      else if(!(/(^[1-9]\d*$)/.test(this.age))){
        alert("请输入正确的宝宝年龄");
        return false;

      }
      else if(!this.image){
        alert("请上传图片");
        return false
      }
      else{
        this.resgiter2()
      }

    },


    resgiter2(){
      let that=this;
      this.$http.get('http://127.0.0.1/dip/php.php',{
        params:{
          type:'res',
          name:that.name,
          tel:that.tel,
          pwd:that.pwd,
          age:that.age,
          image:that.image,
          roleId:2
        }
      }).then(function (res) {
       alert("管理员注册成功");
        this.dialogVisible0 = false;
        this.getAdmin()
      })
    },

    giveAdmin(){
      this.dialogVisible0 = true;
    },
    getAdmin(){
      this.ishow3 = true;
      this.ishow1 = false;
      this.ishow2 = false;
      this.ishow4 = false;
      this.ishow5 = false;
      this.ishow6 = false;
      this.ishow7 = false;
      var obj ={};
      obj.user = this.user;
      obj.password = this.password;
      var url = 'http://127.0.0.1/dip/php.php';
      this.$http.get(url,{
        params:{
          type:'getadmin',
    }
    }).then(function (res) {
        console.log(res.body);
        this.adminMes = res.body;

      })
    },
    delMes() {  //删除
      this.dialogVisible1 = false;
      this.data = JSON.parse(localStorage.getItem('user_mes'));
      this.$http.get('http://127.0.0.1/dip/diplomaProject/php/weibo.php?act=del&id='+this.mesId).then(function (res) {
        this.lesmes()
      })},
    delMes1(id){
      this.dialogVisible1 = true;
      this.mesId = id
    },
    //获取页码
    getpagecount(){
      let url = "http://127.0.0.1/dip/diplomaProject/php/weibo.php?act=get_page_count";
      this.$http.get(url).then(function (res) {
        this.pagecount =eval(res.bodyText);
        this.pagecount = this.pagecount*10
      })
    },
    handleCurrentChange(num) {
      this.num = num;
      this.lesmes();
    },
    delUser1(id){
      this.dialogVisible = true;
      this.delId = id

    },
    delUser(){
      this.dialogVisible = false;
      var url = 'http://127.0.0.1/dip/php.php';
      this.$http.get(url,{
        params:{
          type:'deluser',
          id:this.delId,
        }
      }).then(function (res) {
        console.log(res);
        this.login()
      })
    },
    getMes(id){
      //用户管理
      if(id=="user"){
        this.ishow1 = true;
        this.ishow2 = false;
        this.ishow3 = false;
        this.ishow4 = false;
        this.ishow5 = false;
        this.ishow6 = false;
        this.ishow7 = false;
        this.login();
      }
      //留言板管理
      else if(id=="leames"){
        this.ishow1 = false;
        this.ishow2 = true;
        this.ishow3 = false;
        this.ishow4 = false;
        this.ishow5 = false;
        this.ishow6 = false;
        this.ishow7 = false;
        this.lesmes();
        this.getpagecount()
      }
      //分享管理
      else if(id=="publish"){
        this.ishow1 = false;
        this.ishow2 = false;
        this.ishow3 = false;
        this.ishow5 = false;
        this.ishow4 = true;
        this.ishow6 = false;
        this.ishow7 = false;
        this.getshare();
      }
      //绘本管理
      else if(id=="story"){
        this.ishow1 = false;
        this.ishow2 = false;
        this.ishow3 = false;
        this.ishow5 = true;
        this.ishow4 = false;
        this.ishow6 = false;
        this.ishow7 = false;
        this.getstory();
      }
      //课程管理
      else if(id=="course"){
        this.ishow1 = false;
        this.ishow2 = false;
        this.ishow3 = false;
        this.ishow5 = false;
        this.ishow4 = false;
        this.ishow6 = true;
        this.ishow7 = false;
        this.getCourse()

      }
      //音乐管理
      else if(id=="music"){
        this.ishow1 = false;
        this.ishow2 = false;
        this.ishow3 = false;
        this.ishow5 = false;
        this.ishow4 = false;
        this.ishow6 = false;
        this.ishow7 = true;
        this.getmusic();
      }
    },
    changeCourse(id){
      let url = 'http://127.0.0.1/dip/diplomaProject/php/course.php';
      this.$http.get(url,{
        params:{
          type:'getCourse',
          courseDetail: id
        }
      }).then(function (res) {
        this.courseArr = JSON.parse(res.bodyText);
      })
    },
    //发表课程
    getCourse(){
      this.$http.get('http://127.0.0.1/dip/diplomaProject/php/course.php', {
        params: {
          type: 'get_Course'
        }
      }).then(function (res) {
        this.courseArr = res.body;

      })
    },
    getshare(){
      this.$http.get('http://127.0.0.1/dip/php.php', {
        params: {
          type: 'get_save',
          pass:0
        }
      }).then(function (res) {
        this.arrShare = res.body;
        console.log(this.arrShare);
        for(var i=0;i< this.arrShare.length;i++){
          this.arrShare[i].obj = JSON.parse(this.arrShare[i].obj);
        }
      })
    },
    getstory(){
      this.$http.get('http://127.0.0.1/dip/diplomaProject/php/story.php', {
        params: {
          type: 'get'
        }
      }).then(function (res) {
        this.arrStory = res.body;
        console.log(this.arrStory);

      })
    },
    lesmes(){
      let url = "http://127.0.0.1/dip/diplomaProject/php/weibo.php?act=get&page="+this.num;
      this.$http.get(url).then(
        function (res) {
          this.comments_list = eval(res.bodyText);
          console.log(this.comments_list);
          for (var i = 0; i < this.comments_list.length; i++) {
            var date = new Date(this.comments_list[i].time * 1000);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            this.comments_list[i].time = Y + M + D + h + m + s;
    }})},
    login(){
      var obj ={};
      obj.user = this.user;
      obj.password = this.password;
      var url = 'http://127.0.0.1/dip/php.php';
      this.$http.get(url,{
        params:{
          type:'getuser',
        }
      }).then(function (res) {
        console.log(res);
        this.userMes = res.body;

      })
    },

  }
}
</script>

<style scoped>
  #box0 ,#box1, #box2,#box4{
    width: 100%;
    height: 60px;
    border-bottom:1px solid silver;
  }

  #box0 div,#box1 div, #box2 div,#box4 div{
    border: 1px solid silver;
    width: 220px;
    height: 40px;
    background: white;
    border-radius: 8px;
    float: left;
    margin-top: 10px;
    margin-right: 60px;
  }
  #box0 div input,#box1 div input,#box2 div input,#box4 div input{
    border:none;
    outline:none;
  }
  #temp{
    margin-top: -60px;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
#list{
  width: 100%;
  height: 100%;
}
#list li{
  width: 100%;
  height: 20px;
  cursor: pointer;
}
a {
  color: #42b983;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height:20px;
  font-size: 20px;
  font-weight:bolder;
}
#list1{
  width: 100%;
  height: 40px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 80px;
  font-size:20px;
  height: 700px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 40px;
}

body > .el-container {
  /*margin-bottom: 40px;*/
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
  .tables{
    width: 95%;
    border: 1px solid black;
    margin-top: 20px;
  }
  .tables tr{
    width: 100%;
    height: 30px;

  }
  .tables td,th{
    width: 20%;
    height: 40px;
    border: 1px solid silver;

  }
  /*面板*/
  #panel{
    width:400px;
    height: 600px;
    background-color: white;
    /*重写*/
    text-align: left;
    border-radius: 5px;
    /*box-shadow: -10px 20px 100px black;*/
    /*定位*/
    margin: -10px auto;
    box-shadow: -2px 2px 60px #9aabb8;
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
    color:silver;

    position: relative;
  }

  .panel-content .user-pwd img{
    position: absolute;
    top: 7px;
    left: 6px;
  }
  i{
    position: absolute;
    top: 8px;
    left: 7px;
    font-size: 24px;
    color: #d1d1d1;
    border-right: 1px solid #d1d1d1 ;
    padding-right:5px;
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
    /*box-shadow: 0 0 10px #475ee0;*/
  }

  .setting a{
    color: darkgray;
    font-size: 13px;
  }

  .setting a {
    float: right;
  }

  /*按钮*/
  .login-btn{
    margin: 15px 0;
    /*margin-top: 15px;*/
    width: 100%;
    height: 38px;
    background-color: #475ee0;
    /*去除边框*/
    border: 0;
    font-size: 20px;
    color: white;
    border-radius: 5px;
  }

  .login-btn:focus{
    outline: none;
  }
  .userImg {
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
    display: block;
    margin-top: 14px;
    position: relative;
  }
  .userImg{
    width:100px;
    height: 100px;
    -webkit-background-size: 100%;
    background-size: 100%;
    /*background: no-repeat;*/
  }
  .reg{
    text-align: center;
    /*margin-bottom: 15px;*/
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

  .user-sex span{
    display:inline-block;
    margin-left:10px;
  }
  input[type='checkbox']{
    width: 20px;
    height: 20px;
    margin-left:10px;
  }
  #tiaoli{
    color:blue;
    padding: 10px;
  }
  #tiaoli span:hover{
    /*text-decoration: underline;*/
    border-bottom: 1px solid orange;
  }


</style>
