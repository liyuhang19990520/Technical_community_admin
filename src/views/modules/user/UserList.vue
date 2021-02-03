<template>
  <div>
    <el-button @click="$refs['UserList'].init('add', '')" type="primary" style="margin-bottom: 20px">添加</el-button>
    <el-table
      border
      style="width: 100%"
      :data="userDataList"
      v-loading="loading"
    >
      <el-table-column label="用户名" align="center" prop="username">
      </el-table-column>
      <el-table-column label="昵称" align="center" prop="nickname">
      </el-table-column>
      <el-table-column label="头像" align="center" width="110">
        <img
          :src="scope.row.headImg"
          alt=""
          slot-scope="scope"
          class="headImg"
        />
      </el-table-column>
      <el-table-column label="生日" align="center">
        <span slot-scope="scope">
          {{ $moment(scope.row.birth).format("YYYY-MM-DD") }}
        </span>
      </el-table-column>
      <el-table-column label="性别" align="center" prop="sex">
      </el-table-column>
      <el-table-column label="密码" align="center" prop="password">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$refs['UserList'].init('view', scope.row._id)"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="$refs['UserList'].init('edit', scope.row._id)"
            >修改</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <UserList ref="UserList" @submitSuccess="submitSuccess"/>
  </div>
</template>

<script>
import UserList from "./UserForm";
export default {
  data() {
    return {
      userDataList: [], //列表信息
      total: 0, //总数据数
      pageNumber: 1, //页数
      branchesNumber: 10, //条数
      loading: false,
    };
  },
  components: {
    UserList,
  },
  mounted() {
    this.requestList();
  },
  methods: {
    //获取列表数据
    requestList() {
      this.loading = true;
      this.$http({
        url: "/userList",
        method: "post",
        data: {
          pageNumber: this.pageNumber,
          branchesNumber: this.branchesNumber,
        },
      }).then(({ data }) => {
        if (data && data.success) {
          this.userDataList = data.page.list;
          this.total = data.page.count;
          this.loading = false;
        }
      });
    },
    // 改变条数
    handleSizeChange(val) {
      this.branchesNumber = val;
      this.requestList();
    },
    //改变页数
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.requestList();
    },
    //修改成功刷新列表
    submitSuccess(){
      this.requestList();
    }
  },
};
</script>

<style lang="scss" scoped>
.headImg {
  width: 50px;
  height: 50px;
}
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>