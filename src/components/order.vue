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
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="300"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="90"></el-table-column>
      <el-table-column label="是否付款" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.pay_status==0" type="danger" plain class="mini">未付款</el-button>
          <el-button v-else type="success" plain class="mini">已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop='is_send' label="是否发货" width="120"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="180">
        <template slot-scope="scope">
          {{scope.row.create_time | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" plain class="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="orderForm.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="orderForm.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class='users-page'>
    </el-pagination>
    <el-dialog title="修改订单地址" :visible.sync="editVisible" width="40%">
          <el-form ref='editForm' :model="editForm" label-width="80px">
            <el-form-item label="省市区/县">
              <el-cascader
                expand-trigger="hover"
                :options="options"
                v-model="selectedOptions">
              </el-cascader>

            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="editForm.address"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm()">确 定</el-button>
          </span>
    </el-dialog>
  </div>
  
</template>

<script>

import moment from 'moment'
import options from '../libs/city_data2017_element.js'

export default {
  name: "order",
  data() {
      return {
        orderForm:{
          query:'',
          pagenum:1,
          pagesize:10,
        },
        // 总页数
        total:undefined,
        
        tableData: [],

        // 修改地址
        editVisible:false,
        editForm:{
            address:''
        },

        // 省市数据
        options,
        // 选中的数据
        selectedOptions:[]
      }
    },
    methods: {
       
      // 级联选择器 
      submitForm(){
        console.log(this.selectedOptions);
        
      },
      handleSizeChange(val) {
        this.orderForm.pagesize=val
        this.getOrder()
      },
      handleCurrentChange(val) {
        this.orderForm.pagenum=val
        this.getOrder()
      },

      handleEdit(index,row){
        this.editVisible=true
      },
      getOrder(){
        this.$request.getOrder(this.orderForm).then(res=>{
          if(res.data.meta.status==200){
            this.tableData=res.data.data.goods
            this.total=res.data.data.total
          }
        })
      }
    },
    created() {
      this.getOrder()
    },
    filters:{
      formatTime(val){
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
      }
    }
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
