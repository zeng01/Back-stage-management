<template>
    <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="goodsData.query" @keyup.enter.native='getgoodsList'>
            <el-button slot="append" icon="el-icon-search" @click='getgoodsList'></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click='$router.push("/goods/addGoods")'>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class='users-table'>
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="560"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="120">
          <template slot-scope="scope">
              {{scope.row.add_time | formatTime}}
          </template>
      </el-table-column>
      <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" plain class="mini"></el-button>
          <el-button type="danger" icon="el-icon-check" plain class="mini"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsData.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="goodsData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class='users-page'>
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name:'goodsList',
    data() {
      return {
          goodsData:{
              query:'',
              pagenum:1,
              pagesize:10
          },
          addVisible:false,
        //   商品列表数据
        tableData: [],
        total:0
      }
    },
    methods: {
      handleSizeChange(val) {
          this.goodsData.pagesize=val
          this.getgoodsList()
      },
      handleCurrentChange(val) {
          this.goodsData.pagenum=val
          this.getgoodsList()
      },
    //   获取商品
      getgoodsList(){
          this.$request.getGoods(this.goodsData).then(res=>{
              
              if(res.data.meta.status==200){
                   this.tableData=res.data.data.goods
                    this.total=res.data.data.total
                }
          })
      }
    },
    created() {
        this.getgoodsList()
    },
    filters:{
      formatTime(val){
        return moment(val).format('YYYY-MM-DD');
      }
    }
}
</script>

<style>

</style>
