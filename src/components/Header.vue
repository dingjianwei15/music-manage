<template>
    <div class="header">
      <div class="collapse-btn" @click="collapseChange">
        <i class="el-icon-menu"></i>
      </div>
      <div class="logo">music后台管理</div>
      <div class="header-right">
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip :content="fullScreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <div class="user-avator">
          <img src="../assets/img/jenine.jpg">
        </div>
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{userName}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
  import bus from '../assets/js/bus'
  export default {
    name: 'Header',
    data(){
      return{
        collapse:false,
        fullScreen:false
      }
    },
    methods:{
      //折叠菜单方法
      collapseChange(){
        this.collapse=!this.collapse;
        bus.$emit('collapse',this.collapse);
      },
      //全屏方法
      handleFullScreen(){
        if (this.fullScreen){
          if (document.exitFullscreen()){
            document.exitFullscreen();
          }else if (document.webkitCancelFullScreen){  //safari  chrome
            document.webkitCancelFullScreen();
          }else if (document.mozCancelFullScreen){  //firefox
            document.mozCancelFullScreen();
          }else if (document.msExitFullScreen){  //ie
            document.msExitFullScreen
          }
        }else {
          let element = document.documentElement;
          if (element.requestFullscreen){
            element.requestFullscreen();
          }else if (element.webkitRequestFullScreen){  //safari  chrome
            element.webkitRequestFullScreen();
          }else if (element.mozRequestFullScreen){  //firefox
            element.mozRequestFullScreen();
          }else if (element.msRequestFullScreen){  //ie
            element.msRequestFullScreen();
          }
        }
        this.fullScreen = !this.fullScreen;
      },

      //退出登录
      handleCommand(command){
        if (command == 'logout'){
          localStorage.removeItem('username');
          this.$router.push('/');
        }
      }
    },
    computed:{
      userName(){
        return localStorage.getItem('username');
      }
    }
  }
</script>

<style scoped>
  .header{
    position: relative;
    background-color: #253041;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: white;
  }
  .collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  .header .logo{
    position: relative;
    float: left;
    line-height: 70px;
  }
  .header-right{
    float: right;
    padding-right: 50px;
    display: flex;
    height: 70px;
    align-items: center;
  }
  .btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }
  .user-avator{
    margin-left: 20px;
  }
  .user-avator img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .user-name{
    margin-left: 10px;
  }
  .el-dropdown-link{
    color: white;
    cursor: pointer;
  }
</style>
