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
    <el-table :data="tableData" style="width: 100%" class='users-table'>
      <el-table-column label="分类名称" width="180">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-table-column>
      <el-table-column prop="date" label="级别" width="180"></el-table-column>
      <el-table-column prop="name" label="是否有效" width="180"></el-table-column>
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
        }, {
          date: '2016-05-04',
          name: '王小虎',
        }, {
          date: '2016-05-01',
          name: '王小虎',
        }, {
          date: '2016-05-03',
          name: '王小虎',
        }],
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 树形控件后的方法
      handleNodeClick(data) {
        console.log(data);
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
