<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class='users-table'>
      <el-table-column prop="id" label="#" width="30"></el-table-column>
      <el-table-column prop="orderId" label="订单编号" width="300"></el-table-column>
      <el-table-column prop="price" label="订单价格" width="90"></el-table-column>
      <el-table-column label="是否付款" width="120">
          <el-button type="danger" plain class="mini">未付款</el-button>
      </el-table-column>
      <el-table-column prop='isSend' label="是否发货" width="120"></el-table-column>
      <el-table-column prop="date" label="下单时间" width="180"></el-table-column>
      <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" plain class="mini"></el-button>
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
  name: "goods",
  data() {
      return {
        tableData: [{
            id:'1',
            orderId: '王小虎',
            price:'188',
            isSend:'否',
            date: '2016-05-02',
        }, {
            id:'1',
            orderId: '王小虎',
            price:'188',
            isSend:'否',
            date: '2016-05-04',
        }, {
            id:'1',
            orderId: '王小虎',
            price:'188',
            isSend:'否',
            date: '2016-05-01',
        }, {
            id:'1',
            orderId: '王小虎',
            price:'188',
            isSend:'否',
            date: '2016-05-03',
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
.users-page{
    background: #fff;
    padding: 20px;
}
</style>
