<template>
    <div class="table">
      <div class="container">
        <div class="handle-box">
          <el-input v-model="singerName" size="mini" placeholder="请输入歌手姓名" class="handle-input">添加歌手</el-input>
          <el-button type="primary" size="mini" @click="centerDialogVisible=true">添加歌手</el-button>
        </div>
      </div>
      <el-table size="mini" border style="width: 100%;height: 700px;" :data="data">
        <el-table-column label="歌手图片" width="110" align="center">
          <template slot-scope="scope">
            <div class="singer-img">
              <img :src="getUrl(scope.row.picture)" style="width: 100%">
            </div>
            <el-upload :action="uploadPic(scope.row.pid)" :before-upload="beforeUpload" :on-success="uploadSuccess">
              <el-button size="mini">更新图片</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="歌手姓名" width="110" align="center"></el-table-column>
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">
            {{changeSex(scope.row.sex)}}
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" width="150" align="center"></el-table-column>
        <el-table-column prop="location" label="地区" width="150" align="center"></el-table-column>
        <el-table-column prop="introduction" label="简介" align="center"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout = "total,prev,pager,next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <el-dialog title="添加歌手" :visible.sync="centerDialogVisible" width="400px" center>
        <el-form :model="registerForm" ref="registerForm" Label-width="80px">
          <el-form-item prop="name" label="歌手名" size="mini">
            <el-input v-model="registerForm.name" placeholder="歌手名"></el-input>
          </el-form-item>

          <el-form-item label="性别" size="mini">
            <el-radio-group v-model="registerForm.sex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">组合</el-radio>
              <el-radio :label="3">未知</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="birth" label="生日" size="mini">
            <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%"></el-date-picker>
          </el-form-item>

          <el-form-item prop="location" label="地区" size="mini">
            <el-input v-model="registerForm.location" placeholder="地区"></el-input>
          </el-form-item>

          <el-form-item prop="introduction" label="简介" size="mini">
            <el-input v-model="registerForm.introduction" placeholder="简介" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button size="mini" @click="centerDialogVisible=false">取消</el-button>
          <el-button size="mini" @click="addSinger">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="编辑歌手" :visible.sync="editVisible" width="400px" center>
        <el-form :model="editForm" ref="editForm" Label-width="80px">
          <el-form-item prop="name" label="歌手名" size="mini">
            <el-input v-model="editForm.name" placeholder="歌手名"></el-input>
          </el-form-item>

          <el-form-item label="性别" size="mini">
            <el-radio-group v-model="editForm.sex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">组合</el-radio>
              <el-radio :label="3">未知</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="birth" label="生日" size="mini">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth" style="width: 100%"></el-date-picker>
          </el-form-item>

          <el-form-item prop="location" label="地区" size="mini">
            <el-input v-model="editForm.location" placeholder="地区"></el-input>
          </el-form-item>

          <el-form-item prop="introduction" label="简介" size="mini">
            <el-input v-model="editForm.introduction" placeholder="简介" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button size="mini" @click="editVisible=false">取消</el-button>
          <el-button size="mini" @click="editSinger">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="添加歌手" :visible.sync="delVisible" width="250px" center>
        <div align="center">确定删除吗？</div>
        <span slot="footer">
          <el-button size="mini" @click="delVisible=false">取消</el-button>
          <el-button size="mini" @click="delSinger">确定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {addSinger, querySingers,updateSinger,deleteSinger} from '../api'
  import {mixin} from '../tools/tool'

  export default {
    name: 'InfoPage',
    mixins:[mixin],
    data(){
      return {
        centerDialogVisible:false,
        editVisible:false,
        delVisible:false,
        registerForm:{//添加歌手
          name:'',
          sex:'',
          birth:'',
          location:'',
          introduction:''
        },
        editForm:{//编辑歌手
          pid:'',
          name:'',
          sex:'',
          picture:'',
          birth:'',
          location:'',
          introduction:''
        },
        delForm:{
          pid:'',
          name:'',
          sex:'',
          picture:'',
          birth:'',
          location:'',
          introduction:''
        },
        tableData:[],
        tempData:[],
        singerName:'',
        pageSize:5,
        currentPage:1
      }
    },
    created () {
      this.querySinger();
    },
    methods:{
      //查询歌手
      querySinger(){
        this.tableData = [];
        querySingers().then(res =>{
          if (res.code == 1000){
            this.tableData = res.data;
            this.tempData = res.data;
          }
        }).catch(err =>{
          console.log(err);
        })
      },
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
              this.querySinger();
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
      },
      //编辑歌手
      editSinger(){
        let date = new Date(this.editForm.birth);
        let birth = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        let param = new URLSearchParams();
        param.append('pid',this.editForm.pid);
        param.append('name',this.editForm.name);
        param.append('sex',this.editForm.sex);
        param.append('picture',this.editForm.picture);
        param.append('birth',birth);
        param.append('location',this.editForm.location);
        param.append('introduction',this.editForm.introduction);

        updateSinger(param)
          .then((res)=>{
            if (res.code == 1000){
              this.notify("修改成功。","success");
              this.querySinger();
            }else {
              this.notify("修改失败！","error");
            }
            this.editVisible = false;
          })
          .catch(err=>{
            console.log(err);
            this.editVisible = false;
          });
      },
      //更改图片
      uploadPic(pid){
        return `${this.$store.state.HOST}/singer/updateSingerPic?pid=${pid}`;
      },
      //分页
      handleCurrentChange(value){
        this.currentPage = value;
      },
      //编辑
      handleEdit(singer){
        this.editVisible = true;
        this.editForm = singer;
      },
      //删除
      handleDle(singer){
        this.delVisible = true;
        this.delForm = singer;
        console.log("delForm"+JSON.stringify(this.delForm))
      },
      delSinger(){
        deleteSinger(JSON.stringify(this.delForm)).then(res =>{
          if (res.code == 1000){
            this.querySinger();
            this.notify('删除成功！','success');
            this.delVisible = false;
          }else{
            this.notify('删除失败，请稍后重试！','error');
            this.delVisible = false;
          }
        }).catch(err => {
          console.log(err);
        })
      }

    },
    watch:{
      singerName:function () {
        if (this.singerName == ''){
          this.tableData = this.tempData;
        }else{
          this.tableData = [];
          for (let item of this.tempData){
            if (item.name.includes(this.singerName)){
              this.tableData.push(item);
            }
          }
        }
      }
    },
    computed:{
      data(){
        return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    }
  }
</script>

<style scoped>


  .handle-box{
    margin-bottom: 20px;
  }
  .singer-img{
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }
  .handle-input{
    width: 300px;
    display: inline-block;
  }
  .pagination{
    display: flex;
    justify-content: center;
  }
</style>
