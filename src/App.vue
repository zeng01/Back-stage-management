<template>
    <router-view></router-view>
</template>

<script>
export default {
    name:'App',
    // 关闭页面清除localStorage
    // mounted: function () {
    //      //此方法刷新页面时也会执行
    //      window.addEventListener('beforeunload',()=>{
    //         localStorage.removeItem('token');
    //     });
    // },

}
</script>

<style lang='scss'>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body{
        height:100%;
}
</style>
