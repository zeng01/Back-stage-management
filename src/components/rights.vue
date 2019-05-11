<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class='users-table' v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-table-column type='index' width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
      return {
        tableData: [],
        loading:true
      }
    },

    created() {
      this.loading=true
      this.$request.getRights().then(res=>{
        setTimeout(()=>{
            this.loading=false
        },1000)
        
        this.tableData=res.data.data
        // 遍历
        this.tableData.forEach(v=>{
          if(v.level=="0"){
            v.level='一级'
          }else if(v.level=="1"){
            v.level='二级'
          }else{
            v.level='三级'
          }
        })
        
      })
    },
};
</script>

<style lang='scss'>
.users-menu{
    line-height: 36px;
    background: #c5dde8;
    margin-bottom: 20px;
}
.users-table{
    margin-top: 20px;
}

</style>
