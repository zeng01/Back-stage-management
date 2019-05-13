<template>
    <div>
        <el-steps :active="+active" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <el-tabs v-model="active" tab-position="left">
            <el-tab-pane name='0' label="基本信息">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm users-table">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="ruleForm.goods_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight">
                        <el-input v-model="ruleForm.goods_weight" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_num">
                        <el-input v-model.number="ruleForm.goods_num"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane name='1' label="商品参数">商品参数</el-tab-pane>
            <el-tab-pane name='2' label="商品属性">商品属性</el-tab-pane>
            <el-tab-pane name='3' label="商品图片">商品图片</el-tab-pane>
            <el-tab-pane name='4' label="商品内容">商品内容</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active:"0",
            ruleForm: {
                goods_name:'',
                goods_weight:'',
                goods_num:'',
            },
            rules: {
                goods_name: [
                    { required: true, message: '商品名称不能为空',trigger: 'blur' },
                ],
                goods_weight: [
                    { required: true, message: '商品重量不能为空',trigger: 'blur' },
                ],
                goods_num: [
                    { required: true, message: '商品数量不能为空', trigger: 'blur'},
                ]
            },
            options:[{
               value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    }]
            }],
            // 选择后的数据
            selectedOptions:[],
            
        }
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (+this.active++ > 4) this.active = 4;
            this.active=this.active+'' 
          } else {
            return false;
          }
        })
        },
        handleChange(value) {
            console.log(value);
        }
    }
}
</script>

<style>

</style>
