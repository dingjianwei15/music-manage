const mixin = {
  methods:{
    //提示消息
    notify(title,type){
      this.$notify({
        title: title,
        type: type
      })
    },
    //根据相对地址获取绝对地址
    getUrl(url){
      return `${this.$store.state.HOST}/${url}`
    },
    changeSex(value){
      let sex = '';
      if (value == 0){
        sex = '女';
      }else if (value == 1){
        sex = '男';
      }else if (value == 2){
        sex = '组合';
      }else if (value == 3){
        sex = '未知';
      }
      return sex;
    },
    //上传之前
    beforeUpload(file){
      let isJpg = (file.type === 'image/jpeg')||(file.type === 'image/png');
      if (!isJpg){
        this.$message.error('上传头像图片只能是JPG或PNG格式。');
        return false;
      }
      let is2M = (file.size/1024/1024)<2;
      if (!is2M){
        this.$message.error('上传头像图片不能超过2M。');
        return false;
      }
      return true;
    },
    //上传成功之后
    uploadSuccess(res,file){
      let _this =this;
      if (res.code == 1000){
        _this.querySinger();
        _this.notify(
          '上传成功',
          'success'
        );
      }else {
        _this.notify(
          '上传失败',
          'error'
        );
      }
    }
  }
}

//输出模块变量
export {mixin};
