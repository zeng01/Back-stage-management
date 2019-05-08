<template>
    <div class="login">
        <div class='center'>
            <h3>用户登录</h3>
            <el-form label-position="top" label-width="80px" :rules='loginRules' :model="loginForm" ref='loginForm'>
                <el-form-item label="账户" prop='username'>
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop='password'>
                    <el-input v-model="loginForm.password" type='password'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'login',
    data() {
        return {
            loginForm:{
                username:'',
                password:''
            },
           
                loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
          ],
            }
        }
    },
    methods: {
        submitForm(formName){
            // if(this.loginForm.username=='' || this.loginForm.password==""){
            //     this.$message.warning('用户名或者密码不能为空')
            //     return
            // }
            this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('login',{
                username:this.loginForm.username,
                password:this.loginForm.password
            }).then(res=>{
                if(res.data.meta.status==200){
                    this.$message.success(res.data.meta.msg)
                    localStorage.setItem('token',res.data.data.token)
                    this.$router.push('/')
                }else{
                    this.$message.error(res.data.meta.msg)
                }
            })
          } else {
            
            return false;
          }
        });
            
        }
    },
    created() {
        this.$request.sayHi()
    },
}
</script>

<style lang='scss'>
.login{
    height: 100%;
    background: #315267;
    display: flex;
    justify-content: center;
    align-items: center;
    .center{
        width:560px;
        height: 360px;
        background: #fff;
        border-radius: 10px;
        padding: 20px;
        .el-button{
            width:100%;
        }
    }
}
        
    
</style>
