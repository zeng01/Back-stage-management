<template>
    <div class='error'>
        <img src="../assets/images/error.png" alt="">
        <router-link to="/">返回首页</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
body{
    background: #f2f2f2;
}
.error{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    a{
        font-size:14px;
        color:#666;
        text-decoration: none;
    }
}
</style>
