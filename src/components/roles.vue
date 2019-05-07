<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户 -->
    <el-row>
      <el-col :span="24">
        <el-button type="danger" plain @click='addRoles'>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class='users-table'>
        <el-table-column label="" width="30">&lt;</el-table-column>
        <el-table-column prop="id" label="#" width="30"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="300"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
      <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" plain class="mini"></el-button>
          <el-button type="danger" icon="el-icon-check" plain class="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain class="mini"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
      return {
        tableData: []
      }
    },
    methods: {
        //   添加角色
        addRoles(){
            this.$prompt('角色名称','添加角色', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: '',
          inputErrorMessage: '邮箱格式不正确',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
        }
    },
    created() {
      this.$axios.get('roles').then(res=>{
        console.log(res.data.data);
        if(res.data.meta.status==200){
          // this.tableData=res.data.data
        }
        
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
.users-page{
    background: #fff;
    padding: 20px;
}
</style>
