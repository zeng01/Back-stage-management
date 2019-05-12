<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 警告 -->
    <el-alert
        title="注意"
        type="warning"
        description="只允许为第三级分类设置相关参数！"
        show-icon>
    </el-alert>
    <!-- 级联 -->
    <div class='product'>
        请选择要选择的商品：&nbsp;&nbsp;
        <el-cascader
            expand-trigger="hover"
            :options="options"
            @change="handleChange"
           :props='props'>
        </el-cascader>
    </div>
    <!-- tab标签 -->
    <el-tabs v-model="activeName">
    <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" disabled class='small'>添加动态参数</el-button>
        <!-- 表格 -->
        <el-table :data="dynamicTable" style="width: 100%" class='users-table' border>
            <el-table-column type="index" label="#" width="40"></el-table-column>
            <el-table-column prop="attr_name" label="商品参数" width="400"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" plain class="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" plain class="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态参数" name="second">
        <el-button type="primary" disabled class='small'>添加静态参数</el-button>
        <!-- 表格 -->
        <el-table :data="statusTable" style="width: 100%" class='users-table' border>
          <el-table-column type="index" label="#" width="40"></el-table-column>
            <el-table-column prop="attr_name" label="属性名" width="180"></el-table-column>
            <el-table-column prop="attr_vals" label="属性值" width="400"></el-table-column>
            <el-table-column label="操作" width="180">
               <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" plain class="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" plain class="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
  </el-tabs>
    
  </div>
</template>

<script>
export default {
  name: "params",
  data() {
      return {
        tableData: [],
        options: [],
        // 级联选择器的对应关系
        props: {
          label: "cat_name",
          value: "cat_id",
          children: "children"
        },
        activeName: 'second',
        // 静态数据
        statusTable:[],
        // 动态数据
        dynamicTable:[]
      }
    },
    methods: {
        // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    //   级联 选择三级后方法
      handleChange(value) {
        if(value.length==3){
          const id=value[2]
          // 静态数据
          this.$request.getStatus(id).then(res=>{
            console.log(res);
            if(res.data.meta.status==200){
              this.statusTable=res.data.data
            }
          })
          // 动态数据
          this.$request.getDynamic(id).then(res=>{
            console.log(res);
            if(res.data.meta.status==200){
              this.dynamicTable=res.data.data
            }
          })
        }
      },
      handleEdit(index,row){},
      handleDelete(index,row){}
    },
    created() {
      this.$request.getCategories().then(res=>{
        console.log(res);
        if(res.data.meta.status==200){
          this.options = res.data.data
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
.product{
    margin-top: 20px;
}
</style>
