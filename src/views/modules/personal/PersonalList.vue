<template>
  <div>
    <el-tabs tab-position="left" @tab-click="inTheTAB">
      <el-tab-pane label="基本信息">
        <h2>基本信息</h2>
        <el-form ref="inforForm" :model="inforForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input
              v-model="inforForm.username"
              style="width: 280px"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
              v-model="inforForm.nickname"
              style="width: 280px"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              v-model="inforForm.sex"
              placeholder="请选择性别"
              style="width: 150px"
            >
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="inforForm.birth"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择日期时间"
              style="width: 200px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit()">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改头像">
        <h2>修改头像</h2>
        <vue-upload-imgs
          compress
          :before-read="beforeRead"
          :limit="1"
          :type="0"
          @exceed="exceed"
          v-model="files"
          :after-read="afterRead"
        >
        </vue-upload-imgs>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <h2>修改密码</h2>
        <el-form ref="passForm" :model="passForm" label-width="100px">
          <el-form-item label="旧密码">
            <el-input
              v-model="passForm.oldPass"
              style="width: 280px"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              v-model="passForm.newPass"
              style="width: 280px"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" label-width="100px">
            <el-input
              v-model="passForm.twoNewPass"
              style="width: 280px"
              placeholder="请确认新密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit()">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      inforForm: {
        username: "",
        nickname: "",
        sex: "",
        birth: "",
      },
      passForm: {
        oldPass: "",
        newPass: "",
        twoNewPass: "",
      },
      headImg: "",
      password: "",
    };
  },
  mounted() {
    this.inforData();
  },
  watch: {
    files: {
      handler() {
        //这个方法名就是为了输出新值和旧值，只要改变就触发
        if (this.files && this.files.length >= 1) {
          this.headImg = this.files[0].url;
        } else {
          this.headImg = "";
        }
      },
      immediate: true, //当这个属性true时输出刚开始的新值和旧值
      deep: true, //当这个属性为true时对象的属性发生变化也可以监听到
    },
  },
  methods: {
    //如果超出数量限制提醒用户
    exceed() {
      alert(`只能上传1张图片`);
    },
    //上传前判断图片类型
    beforeRead(files) {
      for (let i = 0, len = files.length; i < len; i++) {
        const file = files[i];
        if (file.type != "image/jpeg" && file.type != "image/png") {
          alert("只能上传jpg和png格式的图片");
          return false;
        }
      }
      return true;
    },
    //查看信息
    inforData() {
      this.$http({
        url: "/adminList",
        method: "post",
        data: {
          id: "601e47355d096432cc0168d0",
        },
      }).then(({ data }) => {
        if (data && data.success) {
          this.inforForm = this.recover(this.inforForm, data.information);
          this.files = [];
          var obj = { url: data.information.headImg };
          this.files.push(obj);
        }
      });
    },
    //保存成功调用接口
    submit() {
      this.$http({
        url: "/adminUpdata",
        method: "post",
        data: {
          _id: "601e47355d096432cc0168d0",
          ...this.inforForm,
          headImg: this.headImg,
          password: this.password,
        },
      }).then(({ data }) => {
        if (data && data.success) {
          this.$message({
            message: data.msg,
            type: "success",
          });
        }
      });
    },
    //保存成功前验证
    
    //切换标签重置信息
    inTheTAB() {
      this.inforData();
    },
    afterRead(){
      setTimeout(()=>{
        this.submit()
      },0)
    }
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 40px;
}
.vue-upload-imgs {
  margin-left: 40px;
}
</style>