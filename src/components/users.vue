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
        <el-input placeholder="请输入内容" v-model="usersData.query" @keyup.enter.native='getUsersList'>
            <el-button slot="append" icon="el-icon-search" @click='getUsersList'></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click='addVisible = true'>添加用户</el-button>
        <el-dialog title="添加用户" :visible.sync="addVisible" width="40%" >
          <el-form ref="addForm" :model="addForm" :rules='addRules' label-width="80px">
            <el-form-item label="用户名" prop='username'>
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='password'>
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm('addForm')">确 定</el-button>
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
          <el-switch v-model="scope.row.mg_state" @change='statusChange(scope.row)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>  
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain class="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-check" plain class="mini" @click="handleInfo(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain class="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="usersData.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="usersData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class='users-page'>
    </el-pagination>
    <el-dialog title="编辑用户" :visible.sync="editVisible" width="40%">
          <el-form ref='editForm' :model="editForm" :rules="addRules" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm('editForm')">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="用户角色权限" :visible.sync="roleVisible" width="40%">
           <el-form ref='roleForm'  :model="roleForm" :rules="addRules" label-width="80px">
            <el-form-item label="用户名" prop='username'>
              <el-input v-model="roleForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="roleValue" placeholder="请选择">
                <el-option label='未分配角色' :value='-1'></el-option>
                <el-option
                  v-for="item in roles"
                  :key="item.value"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="roleVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm('roleForm')">确 定</el-button>
          </span>
        </el-dialog>
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

      // 添加数据验证
      addVisible:false,
      addForm: {
          username: '',
          password:'',
          email:'',
          mobile:''
        },
        // 校验规则
      addRules: {
        username: [
          { required: true, message: '用户名不能为空',trigger: 'blur' },
          { min: 5, max: 12,  message: '长度在 6 到 12 个字符', trigger: "change"}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur'},
          { min: 6, max: 12,  message: '长度在 6 到 12 个字符', trigger: "change"}
        ]
      },
      // 编辑用户
      editVisible:false,
      editForm:{
        username:'',
        email:'',
        mobile:''
      },
      // 用户角色权限
      roleVisible: false,
      roleForm:{},
        
      roleValue:"",
      // 角色数据
      roles:[]
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
          }
        })
      },

      // 分页
      handleSizeChange(val) {
        this.usersData.pagesize=val
        this.getUsersList()
      },
      handleCurrentChange(val) {
         this.usersData.pagenum=val
        this.getUsersList()
      },

      // 添加用户
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 添加用户
            if(formName=='addForm'){
              this.$request.addUsers(this.addForm).then(res=>{
                if(res.data.meta.status==201){
                  this.addVisible=false;
                  this.getUsersList();
                  this.$refs[formName].resetFields();
                  this.addForm.email=''
                  this.addForm.mobile=''
                }
              })
              // 编辑用户
            }else if((formName=='editForm')){
              this.$request.editUser(this.editForm).then(res=>{
                  if(res.data.meta.status==200){
                    this.editVisible=false
                    this.getUsersList();
                  }
              })
              // 修改用户权限
            }else{
              
              this.$request.updateRoles({
                id:this.roleForm.id,
                rid:this.roleValue
                }).then(res=>{
                if(res.data.meta.status==200){
                    this.roleVisible=false
                    this.getUsersList();
                  }
              })
            }
             
          } else {
            this.$message.error("数据格式不对!!!")
            return false;
          }
        });
      },

      // 修改状态
      statusChange(row){
        this.$request.updateStatus({uId:row.id,type:row.mg_state})
      },


      //  编辑用户
      handleEdit(index,row){
        this.editVisible=true
        this.$request.userInfo(row.id).then(res=>{
          if(res.data.meta.status==200){
            this.editForm=res.data.data
          }
        })
      },

      // 删除用户
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.deleteUsers(row.id).then(res=>{
            if(res.data.meta.status==200){
                    this.getUsersList();
                     
              }
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      // 弹出角色框
      handleInfo(index,row){
        this.$request.userInfo(row.id).then(res=>{
          
            this.roleForm=res.data.data
            this.$request.getRoles().then(res=>{
              if(res.data.meta.status==200){
                this.roles=res.data.data
                this.roleValue=this.roleForm.rid
                 this.roleVisible=true
              }
            })
          })
      }
      
      
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
