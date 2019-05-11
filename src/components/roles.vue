<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class='users-menu'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户 -->
    <el-row>
      <el-col :span="24">
        <el-button type="danger" plain @click='addVisible=true'>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class='users-table'>
        <el-table-column label="" width="30" type="expand">
          <template slot-scope="scope">
            <div v-if='scope.row._children.length==0' class='noRight'>未分配权限</div>
            <!-- 一级标签 -->
            <el-row v-for="(level, index) in scope.row._children" :key="index">
             <el-col :span="6">
               <el-tag :key="level.id" closable @close='deleteRight(scope.row,level.id)'> {{level.authName}}</el-tag>
               <span class='el-icon-arrow-right'></span>
             </el-col>
             <el-col :span="18">
               <!-- 二级标签 -->
               <el-row v-for="(level2, i) in level.children" :key="i" type='success' @close='deleteRight(scope.row,level2.id)'>
                  <el-col :span="6">
                    <el-tag :key="level2.id" closable> {{level2.authName}}</el-tag>
                    <span class='el-icon-arrow-right'></span>
                  </el-col>
                  <el-col :span="18">
                    <!-- 三级标签 -->
                    <el-tag v-for="(level3, j) in level2.children" :key="j" closable type='warning' class='my-tag' @close='deleteRight(scope.row,level3.id)'> {{level3.authName}}</el-tag>
                  </el-col>
                </el-row>
             </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="40"></el-table-column> 
      <el-table-column prop="roleName" label="角色名称" width="300"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain class="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" plain class="mini" @click="handleRole(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain class="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addVisible" width="40%" >
          <el-form ref="addFrom" :model="addFrom" :rules='roleRules' label-width="80px">
            <el-form-item label="角色名称" prop='roleName'>
              <el-input v-model="addFrom.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop='roleDesc'>
              <el-input v-model="addFrom.roleDesc"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm('addFrom')">确 定</el-button>
          </span>
        </el-dialog>
    <!-- 编辑角色 -->
     <el-dialog title="编辑角色" :visible.sync="editVisible" width="40%" >
          <el-form ref="editForm" :model="editForm" :rules='roleRules' label-width="80px">
            <el-form-item label="角色名称" prop='roleName'>
              <el-input v-model="editForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop='roleDesc'>
              <el-input v-model="editForm.roleDesc"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm('editForm')">确 定</el-button>
          </span>
    </el-dialog>
    <!-- 修改角色权限 -->
    <el-dialog title="修改角色权限" :visible.sync="rightsVisible" width="40%" >
          
            <el-tree :data="rightsData" :props="rightsProps" show-checkbox node-key="id"
            :default-checked-keys="defaultCheckedKeys"
            default-expand-all
            ref="tree"
            ></el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="rightsVisible = false">取 消</el-button>
            <el-button type="primary"  @click="setRights">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
      return {
        tableData: [],
        // 新增
        addVisible:false,
        addFrom:{
          roleName:'',
          roleDesc:''
        },
        roleRules: {
        roleName: [
            { required: true, message: '角色名不能为空',trigger: 'blur' },
            { min: 2, max: 8,  message: '长度在 2 到 8 个字符', trigger: "change"}
          ],
          roleDesc: [
            { min: 2, max: 12,  message: '长度在 2 到 12 个字符', trigger: "change"}
          ]
        },
        // 编辑角色
        editVisible:false,
        editForm:{
          roleName:'',
          roleDesc:''
        },
        // 修改角色权限
        rightsVisible:false,
        rightsForm:{},
        // 所有权限列表
        rightsData:[],
        rightsProps:{
          children: 'children',
          label:'authName'
        },
        // 默认的选中权限
      defaultCheckedKeys: []
      }
    },
    methods: {

      // 获取所有角色
      getRoles(){
        this.$request.getRoles().then(res=>{
        if(res.data.meta.status==200){
          // children字段会被element-ui认做树形结构渲染，会报错
          // 解决方案，用其他字段替代children
          let data=res.data.data
          // for循环
          data.forEach(v => {
            v._children=v.children

            // 删除v.children属性
            delete v.children
          });
          this.tableData=data
        }
        
      })
      },
        // 进入编辑角色框
        handleEdit(index,row){
          
          this.$request.getRolesById(row.id).then(res=>{
            if(res.data.meta.status==200){
                this.editForm=res.data.data
                this.editVisible=true
            }
          })
        },

        // 修改角色权限
        handleRole(index,row){
          this.rightsVisible=true,
          this.rightsForm=row
          this.$request.getRightsTree().then(res=>{
            this.rightsData=res.data.data
            // 设置选中的值
            let checkedIds = [];
            // // 一级
            // row._children.forEach(v1 => {
            //   checkedIds.push(v1.id);
            //   // 二级
            //   v1.children.forEach(v2 => {
            //     checkedIds.push(v2.id);
            //     // 三级
            //     v2.children.forEach(v3 => {
            //       checkedIds.push(v3.id);
            //     });
            //   });
            // });

          // 使用递归来赋值
            function getCheckedKeys(item) {
            // 查找后代的children 如果有 就遍历 并且 添加到数组中
            item._children.forEach(v => {
              checkedIds.push(v.id);
              // 如果有后代就去找后代
              if (v.children) {
                // 为了保证代码的一致 重新赋值 _children属性
                v._children = v.children;
                getCheckedKeys(v);
                }
              });
            }
            getCheckedKeys(row);
            this.defaultCheckedKeys=checkedIds
          })
        },
        // 角色授权
        setRights(){
            // console.log(this.$refs.tree.getCheckedKeys());
            // 选中的id ,使用，拼接起来
            const rids=this.$refs.tree.getCheckedKeys().join(',')

            this.$request.setRight({
              roleId:this.rightsForm.id,
              rids
            }).then(res=>{
                if(res.data.meta.status==200){
                  this.getRoles()
                  this.rightsVisible=false
              }
            })
        },

        // 删除角色
        handleDelete(index,row){
          this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.deleteRoles(row.id).then(res=>{
            if(res.data.meta.status==200){
                  this.getRoles();
              }
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
        },


        submitForm(fromName){
            //   添加角色
            if(fromName=='addFrom'){
              this.$request.addRoles(this.addFrom).then(res=>{
                if(res.data.meta.status==201){
                  this.getRoles()
                  this.addVisible=false
                  this.$refs[formName].resetFields();
                }
              })
              // 编辑用户
            }else if(fromName=='editForm'){
              this.$request.updateRoles(this.editForm).then(res=>{
                if(res.data.meta.status==200){
                  this.getRoles()
                  this.editVisible=false
                }
              })
            }
        },

        // 删除指定权限
        deleteRight(row,rightId){
            this.$request.delRight({
              roleId:row.id,
              rightId
            }).then(res=>{
              // 重新赋值
              row._children=res.data.data
            })
        }
    },
    created() {
      this.getRoles()
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
.my-tag{
  margin-right:10px;
  margin-bottom: 10px;
}
.noRight{
  text-align: center;
}
</style>
