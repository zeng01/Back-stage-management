<template>
  <div class="users-container">
    <!-- 面包屑菜单 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="users-menu">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 图形 -->
    <div id="main" style="width: 90%;height:600px"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: "report",
  data() {
    return {
      option: {
        title: {
          text: '数据报表'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  // dom渲染完成后
  mounted() {
    


    this.$request.getReport().then(res=>{
      console.log(res);
      if(res.data.meta.status==200){
        const data=res.data.data
        for (const key in data) {
          this.option[key]=data[key]
        }
        this.option.xAxis[0].type="category"
        this.option.xAxis[0].boundaryGap=false
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option);
      }
      // this.legend=res.data.data.legend
      // this.yAxis=res.data.data.yAxis

      // this.xAxis=res.data.data.xAxis
      // this.xAxis[0].type="category"
      // this.xAxis[0].boundaryGap=false

      // this.series=res.data.data.series


      // // 基于准备好的dom，初始化echarts实例
      // var myChart = echarts.init(document.getElementById('main'));
      // // 使用刚指定的配置项和数据显示图表。
      // myChart.setOption(this.option);
    })
  },
};
</script>

<style lang='scss'>
.users-menu {
  line-height: 36px;
  background: #c5dde8;
  margin-bottom: 20px;
}
.users-table {
  margin-top: 20px;
}
</style>
