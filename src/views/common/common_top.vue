<template>
  <div class="header">
    <div>
      <img
        src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"
        alt=""
      />
      <span>技术社区管理平台</span>
    </div>
    <el-button size='small'>退出</el-button>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    span{
      margin-left: 10px;
      font-size: 20px;
      font-weight: 800;
      color: #fff;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>