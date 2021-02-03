<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="25%"
      @closed="closed"
    >
      <el-form
        :model="inputForm"
        ref="inputForm"
        label-width="100px"
        class="demo-ruleForm"
        :disabled="method == 'view'"
      >
        <el-form-item label="头像" prop="headImg">
          <!-- :rules="[{ required: true, message: '请选择头像', trigger: 'blur' }]" -->
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            class="avatar-uploader"
            :show-file-list="false"
            :headers="{ dataType: 'jsonp' }"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="inputForm.headImg"
              :src="inputForm.headImg"
              class="avatar"
              width="100"
              height="100"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: validator.isMobile, trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="inputForm.username"
            style="width: 250px"
            :disabled="method != 'add' ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          prop="nickname"
          :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]"
        >
          <el-input
            v-model="inputForm.nickname"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              validator: validator.isPass,
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="inputForm.password"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
          :rules="[{ required: true, message: '请选择性别', trigger: 'blur' }]"
        >
          <el-select
            v-model="inputForm.sex"
            placeholder="请选择性别"
            style="width: 200px"
          >
            <el-option label="男" value="男"> </el-option>
            <el-option label="女" value="女"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="生日"
          prop="birth"
          :rules="[{ required: true, message: '请选择生日', trigger: 'blur' }]"
        >
          <el-date-picker
            v-model="inputForm.birth"
            type="datetime"
            format="yyyy-MM-dd"
            placeholder="选择日期时间"
            style="width: 200px"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()" v-if="method != 'view'"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, //对话框显示开关
      title: "", //标题显示
      method: "", //判断是调用的场景
      imageUrl: "",
      inputForm: {
        //表单
        _id: "",
        username: "",
        nickname: "",
        password: "",
        sex: "",
        birth: "",
        headImg: "",
      },
    };
  },
  methods: {
    //初始化
    init(method, id) {
      this.method = method;
      this.inputForm._id = id;
      if (method == "view") {
        this.title = "查看用户信息";
      } else if (method == "add") {
        this.title = "添加用户信息";
      } else if (method == "edit") {
        this.title = "修改用户信息";
      }
      this.dialogVisible = true;
      this.$nextTick(() => {
        if (method == "view" || method == "edit") {
          //修改或查看
          this.$http({
            url: "/userDetail",
            method: "get",
            params: {
              id,
            },
          }).then(({ data }) => {
            if (data && data.success) {
              this.inputForm = this.recover(this.inputForm, data.information);
              // console.log(data);
            }
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.inputForm.headImg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //提交表单
    submit() {
      this.$http({
        url: "/save",
        method: "post",
        data: this.inputForm,
      }).then(({ data }) => {
        if (data && data.success) {
          this.$message({
            message: data.msg,
            type: "success",
          });
          this.dialogVisible = false;
          this.$emit('submitSuccess')
        }
      });
    },
    //关闭时清空数据
    closed() {
      this.$refs["inputForm"].resetFields();
      Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>