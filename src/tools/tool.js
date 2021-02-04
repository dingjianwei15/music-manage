const mixin = {
  methods:{
    //提示消息
    notify(title,type){
      this.$notify({
        title: title,
        type: type
      })
    }
  }
}

//输出模块变量
export {mixin};
