<template>
  <div class="login-wrap">
    <div class="ms-title">music 后台管理登录</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" aria-placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" aria-placeholder="密码"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" v-on:click="submitForm">
            登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getLoginStatus} from "../api/index"
export default {
  data: function () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]

      }
    }
  },
  methods: {
    submitForm () {
      // alert('提交')
      let param = new URLSearchParams();
      param.append("username",this.ruleForm.username);
      param.append("password",this.ruleForm.password);
      getLoginStatus(param)
      .then((res) => {
        if (res.code == 1000){
          this.notify("登录成功","success");
        }else {
          this.notify("登录失败","error");
        }
      });
    }
  }
}

</script>

<style scoped>
.login-wrap {
  position: relative;
  background: url("../assets/img/background.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}
  .ms-login{
    position: absolute;
    width: 300px;
    height: 160px;
    left: 50%;
    top: 50%;
    margin-left: -190px;
    margin-top: -150px;
    padding: 40px;
    border-radius: 5px;
    background: #ffffff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width: 100%;
    height: 36px;
  }
</style>
