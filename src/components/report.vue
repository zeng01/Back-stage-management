<template>
<div>
   开始日期:<el-date-picker
      v-model="value1"
      type="daterange"
      start-placeholder="开始日期">
    </el-date-picker>
    结束日期:<el-date-picker
      v-model="value1"
      type="daterange"
      end-placeholder="结束日期">
    </el-date-picker>
</div>    
</template>

<script>
export default {
    data() {
        return {
            pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        }
    },
}
</script>

<style>

</style>
