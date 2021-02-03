<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>Header</el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 内容 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.home-container{
  height: 100%;
}
.el-main{
  background-color: #F1F2F5;
}
.el-header {
  background-color: #1890FF;
}
.el-aside{
  background-color: #181922;
}
</style>