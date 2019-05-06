<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户 -->
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click='addUsers'>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class='users-table'>
      <el-table-column prop="id" label="#" width="30"></el-table-column>
      <el-table-column prop="name" label="姓名" width="240"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="240"></el-table-column>
      <el-table-column prop="mobail" label="电话" width="240"></el-table-column>
      <el-table-column label="用户状态" width="80">
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" plain class="mini"></el-button>
          <el-button type="danger" icon="el-icon-check" plain class="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain class="mini"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="20" class='users-page'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
      return {
          value1: true,
        value2: true,
        tableData: [{
          id: '2',
          name: '王小虎',
          email:'123@qq.com',
          mobail:'1234567890',
        }, {
          id: '4',
          name: '王小虎',
          email:'123@qq.com',
          mobail:'1234567890',
        }, {
          id: '1',
          name: '王小虎',
          email:'123@qq.com',
          mobail:'1234567890',
        }, {
          id: '3',
          name: '王小虎',
          email:'123@qq.com',
          mobail:'1234567890',
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      addUsers(){
          
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
