<template>
  <el-container class="container">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/images/logo.png" alt="">
        </el-col>
        <el-col :span="19" class='header-center'>后台管理系统</el-col>
        <el-col :span="1">
          <el-button type="danger" icon="el-icon-delete" circle @click="logout"></el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="index-aside">
        <!-- 写上router 会解析成路径 -->
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="users">
                <i class="el-icon-menu"></i>用户列表
                </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="roles">
                <i class="el-icon-menu"></i>角色列表
                </el-menu-item>
                <el-menu-item index="rights">
                <i class="el-icon-menu"></i>权限列表
                </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="goods">
                <i class="el-icon-menu"></i>商品列表
                </el-menu-item>
                <el-menu-item index="params">
                <i class="el-icon-menu"></i>分类参数
                </el-menu-item>
                <el-menu-item index="categories">
                <i class="el-icon-menu"></i>商品分类
                </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
              <el-menu-item index="order">
                <i class="el-icon-menu"></i>订单列表
                </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="report">
                <i class="el-icon-menu"></i>数据报表
                </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    if(!sessionStorage.getItem('token')){
      this.$message.error('请先登录')
    }
  },
  methods: {
    logout(){
      
      this.$confirm('真的要走吗?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          sessionStorage.removeItem('token')
          this.$router.push('login')
        })
      
    }
  },
};
</script>

<style lang='scss'>
.container {
  height: 100%;
  .index-header {
    background: #92b2c4;
    line-height: 60px;
    img{
      height: 60px;
    }
    .header-center{
      color:#fff;
      font-size: 26px;
      text-align: center;
    }
  }
  .index-aside {
    background: #fff;
  }
  .index-main {
    background: #dee9f3;
  }
}
</style>
