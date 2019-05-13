<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加分类 -->
    <el-row>
      <el-col :span="24">
        <el-button type="warning" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" class='users-table' row-key="cat_id" border>
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="date" label="级别" width="180">
        <template slot-scope="scope">
          {{scope.row.cat_level==0?'一级':''}}
          {{scope.row.cat_level==1?'二级':''}}
          {{scope.row.cat_level==2?'三级':''}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="是否有效" width="180">
        <template slot-scope="scope">
          {{scope.row.cat_deleted=false?'无效':'有效'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" plain class="mini"></el-button>
          <el-button type="danger" icon="el-icon-check" plain class="mini"></el-button>
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
      return {
        tableData: [],
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

    },
    created() {
      this.$request.getCategories().then(res=>{
        if(res.data.meta.status==200){
          this.tableData = res.data.data
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
