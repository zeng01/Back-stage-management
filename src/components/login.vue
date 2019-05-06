<template>
    <div class="login">
        <div class='center'>
            <h3>用户登录</h3>
            <el-form label-position="top" label-width="80px">
                <el-form-item label="账户">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'login'
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
