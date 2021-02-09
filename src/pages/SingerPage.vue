<template>
    <div class="table">
      <div class="container">
        <div class="handle-box">
          <el-button type="primary" size="mini" @click="centerDialogVisible=true">添加歌手</el-button>
        </div>
      </div>
      <el-dialog title="添加歌手" :visible.sync="centerDialogVisible" width="400px" center>
        <el-form :model="registerForm" ref="registerForm" Label-width="80px">
          <el-form-item prop="name" Label="歌手名" size="mini">
            <el-input v-model="registerForm.name" placeholder="歌手名"></el-input>
          </el-form-item>

          <el-form-item Label="性别" size="mini">
            <el-radio-group v-model="registerForm.sex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">组合</el-radio>
              <el-radio :label="3">未知</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="birth" Label="生日" size="mini">
            <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%"></el-date-picker>
          </el-form-item>

          <el-form-item prop="location" Label="地区" size="mini">
            <el-input v-model="registerForm.location" placeholder="地区"></el-input>
          </el-form-item>

          <el-form-item prop="introduction" Label="简介" size="mini">
            <el-input v-model="registerForm.introduction" placeholder="简介" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button size="mini" @click="centerDialogVisible=false">取消</el-button>
          <el-button size="mini" @click="addSinger">确定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {addSinger} from '../api'
  import {mixin} from '../tools/tool'

  export default {
    name: 'InfoPage',
    mixins:[mixin],
    data(){
      return {
        centerDialogVisible:false,
        registerForm:{
          name:'',
          sex:'',
          birth:'',
          location:'',
          introduction:''
        }
      }
    },
    methods:{
      //添加歌手
      addSinger(){
        let date = this.registerForm.birth;
        let birth = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        //console.log(birth);
        let param = new URLSearchParams();
        //let data = {"pid":"","name":this.registerForm.name,"sex":this.registerForm.sex,"picture":"","birth":birth,"location":this.registerForm.location,"introduction": this.registerForm.introduction};
        //let datas = {pid:'',name:this.registerForm.name,sex:this.registerForm.sex,picture:'',birth:birth,location:this.registerForm.location,introduction: this.registerForm.introduction};
        param.append('pid','');
        param.append('name',this.registerForm.name);
        param.append('sex',this.registerForm.sex);
        param.append('picture','');
        param.append('birth',birth);
        param.append('location',this.registerForm.location);
        param.append('introduction',this.registerForm.introduction);

        addSinger(param)
          .then((res)=>{
            if (res.code == 1000){
              this.notify("添加成功。","success");
            }else {
              this.notify("添加失败！","error");
            }
            this.centerDialogVisible = false;
          })
          .catch(err=>{
            console.log(err);
            this.centerDialogVisible = false;
          });
      }
    }
  }
</script>

<style scoped>


  .handle-box{
    margin-bottom: 20px;
  }
</style>
