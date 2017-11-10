<template>
  <div id="app">
    <header>
      <el-row>
        <el-col :span="4" class='title'>
          <i class="el-icon-view"></i> &nbsp;&nbsp;选课系统</el-col>
        <el-col :span="20">
          <div class="userPic"></div>
        </el-col>
      </el-row>
    </header>
    <article>
      <el-row>
        <el-col :span="4" class='navLeft'>
          <el-menu
            router=true
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="/student">
              <template slot="title">
                <i class="el-icon-location"></i>

                <span>学生管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/student/info" class="trriger">档案</el-menu-item>
                <el-menu-item index="/student/test">成绩</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
             <el-submenu index="/course">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>课程管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/course/info">课程</el-menu-item>
                <el-menu-item index="/course/test">信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
             <el-submenu index="/clazz">
              <template slot="title">
                <i class="el-icon-printer"></i>
                <span>班级管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/clazz/info">班级</el-menu-item>
                <el-menu-item index="/clazz/test">信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/sc">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>选课管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/sc/info">已选课程</el-menu-item>
                <el-menu-item index="/sc/test">选课</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>  
        </el-col>
        <el-col :span="20" class='container'>
          <!--当路由发生改变，路由对应的模块显示到这里-->
          <router-view></router-view>
        </el-col>
      </el-row>
    </article>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'app',
  mounted:function(){
    $('.navLeft').height($(window).height()-58);
    $('.container').height($(window).height()-58);
    // $('.navLeft li.el-menu-item.trriger.is-active').trigger('click');
  }
}

</script>

<style>
  body{
    margin: 0;
    padding:0;
  }
  header {
    background-color: #1f2d3d;
  }
  header .title {
    height: 58px;
    line-height: 58px;
    text-align: center;
    font-size: 20px;
    color: #fff;
  }
  header .userPic{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: orange;
    float: right;
    margin: 9px 30px;
    background: url('./assets/xpos.jpg');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navLeft{
    background-color: #545c64;
  }
  .container{
    overflow-y: auto;
    /*padding:10px;*/
  }
</style>
