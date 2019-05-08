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
        <el-input placeholder="请输入内容" v-model="usersData.query">
            <el-button slot="append" icon="el-icon-search" @click='getUsersList'></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click='dialogVisible = true'>添加用户</el-button>
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"  @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class='users-table'>
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column prop="username" label="姓名" width="240"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="240"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="240"></el-table-column>
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>  
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain class="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-check" plain class="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain class="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class='users-page'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
      return {
      usersData:{
        // 查询数据
        query:'',
        // 当前页码
        pagenum:1,
        // 页容量
        pagesize:10,
      },
      // 总数
      total:undefined,

      // 数据
        tableData: [],

                dialogVisible:false,
        form: {
          username: '',
          password:'',
          email:'',
          mobile:''
        },
        // 校验规则
      // rules: {
      //   username: [
      //   { required: true, //是否必填
      //     message: '用户名不能为空', //规则
      //     trigger: 'blur'  //何事件触发
      //   },
      //   //可以设置双重验证标准
      //   { min: 6, max: 12,  message: '长度在 6 到 12 个字符', }
      // ],
      // password: [
      //   { required: true, //是否必填
      //     message: '密码不能为空', //规则
      //     trigger: 'blur'  //何事件触发
      //   },
      //   //可以设置双重验证标准
      //   { min: 6, max: 12,  message: '长度在 6 到 12 个字符', }
      // ]
      // },
      }
    },
    methods: {
      // 获取用户列表
      getUsersList(){
        
        this.$request.getUsers(this.usersData).then(res=>{
          if(res.data.meta.status==200){
            // console.log(res);
            this.tableData=res.data.data.users
            this.total=res.data.data.total
          }else{
            sessionStorage.removeItem('token');
            this.$router.push('/login');
          }
        })
      },

      // 分页
      handleSizeChange(val) {
        this.pagesize=val
        this.getUsersList()
      },
      handleCurrentChange(val) {
         this.pagenum=val
        this.getUsersList()
      },
      handleClose() {
        console.log('000');
        
      },
      addUsers(){
        if(this.form.username==""||this.form.password==''){
          this.$message.error('用户名或者密码不能为空')
        }
        this.$axios.post('users',{
          username:this.form.username,
          password:this.form.password,
          email:this.form.email,
          mobile:this.form.mobile
        }).then(res=>{
          console.log(res);
          if(res.data.meta.status==200){
            this.$message.error(res.data.meta.msg)
            this.dialogVisible=true;
            this.getUsersList();
            this.form={}
          }else{
            this.$message.error(res.data.meta.msg)
          }
          
        })
      },

      // 操作时的回调函数
      handleEdit(index,row){
        console.log(index,row);
        
      },
      handleDelete(index,row){
        console.log(index,row);
        
      }

      // addUsers(){
          
        //   this.$prompt('角色名称','添加角色', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   inputPattern: '',
        //   inputErrorMessage: '邮箱格式不正确',
        // }).then(({ value }) => {
        //   this.$message({
        //     type: 'success',
        //     message: '你的邮箱是: ' + value
        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消输入'
        //   });       
        // });
        // }
    },
    created() {
    this.getUsersList()
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
