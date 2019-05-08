<template>
    <div class="login">
        <div class='center'>
            <h3>用户登录</h3>
            <el-form label-position="top" label-width="80px">
                <el-form-item label="账户">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getLogin">登录</el-button>
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
            username:'',
            password:''
        }
    },
    methods: {
        getLogin(){
            if(this.username=='' || this.password==""){
                this.$message.warning('用户名或者密码不能为空')
                return
            }
            this.$axios.post('login',{
                username:this.username,
                password:this.password
            }).then(res=>{
                if(res.data.meta.status==200){
                    this.$message.success(res.data.meta.msg)
                    localStorage.setItem('token',res.data.data.token)
                    this.$router.push('/')
                }else{
                    this.$message.error(res.data.meta.msg)
                }
            })
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
