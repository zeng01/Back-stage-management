<template>
  <el-container class="container">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/images/logo.png" alt="">
        </el-col>
        <el-col :span="19">后台管理系统</el-col>
        <el-col :span="1">
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
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
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>权限列表
                </el-menu-item>
                <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>权限名称
                </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>用户列表
                </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>用户列表
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
  name: "index"
};
</script>

<style lang='scss'>
.container {
  height: 100%;
  .index-header {
    background: #74b8b8;
  }
  .index-aside {
    background: #fff;
  }
  .index-main {
    background: #b3d7dd;
  }
}
</style>
