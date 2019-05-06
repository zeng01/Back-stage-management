<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class='users-table'>
      <el-table-column prop="id" label="#" width="30"></el-table-column>
      <el-table-column prop="name" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="stratum" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
      return {
        tableData: [{
          id: '2',
          name: '王小虎',
          path:'goods',
          stratum: '一级'
        }, {
          id: '4',
          name: '王小虎',
          path:'goods',
          stratum: '一级'
        }, {
          id: '1',
          name: '王小虎',
          path:'goods',
          stratum: '一级'
        }, {
          id: '3',
          name: '王小虎',
          path:'goods',
          stratum: '一级'
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
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
