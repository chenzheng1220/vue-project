<template>
    <div>
        <el-form
        ref="ruleFormRef"
        :model="state.ruleForm"
        :rules="state.rules"
        label-position="top"
        label-width="auto"
        >
         
            <el-form-item  label="请输入昵称" prop="nickname">
                <el-input size="large" style="width:100%;" placeholder="请输入昵称" v-model="state.ruleForm.nickname"/>
            </el-form-item>
            <el-form-item label="请输入邮箱" prop="email">
                <el-input size="large" style="width:100%;" placeholder="请输入邮箱地址，邮箱地址不会对外展示" v-model="state.ruleForm.email"/>
            </el-form-item>
          
            <el-form-item label="请输入评论内容" prop="content"> 
                <el-input size="large" style="width:100%;" type="textarea" placeholder="请发表和文章内容相关的评论，评论发表后，审核通过后方能显示" v-model="state.ruleForm.content" />
            </el-form-item>

            <el-form-item>
                <p style="color:red;font-size:12px;">注意事项：每个ip每篇文章最多只能发布三条评论</p> 
            </el-form-item>
         
            
           
           <el-form-item>
            <el-button size="large" type="primary" @click="onSubmit">
             发表评论
            </el-button>
           </el-form-item>
          
        </el-form>
          
      
       

        <div class="commentsList">
            <h2  v-if="total">本篇文章共有 {{total}} 条评论</h2>
            <div class="item" v-for="(item,index) in commentsList">
                <p class="nickname"><img :src="item.avatar" />{{ item.nickname }}</p>
                <p class="contentBox">{{ item.content }}</p>
                <p class="date">{{ item.date }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,reactive,onMounted} from 'vue';
import axios from '@/utils';
import {useRoute} from 'vue-router';
import { ElMessage } from 'element-plus';
const route = useRoute();
const ruleFormRef = ref(null);
const commentsList = ref([]);
const total = ref(0);
const state = reactive({
    ruleForm:{
        ip:localStorage.getItem('ip'),
        city:localStorage.city,
        content:'',
        nickname:'',
        email:''
    },
    rules:{
        content:[
            {required:true,message:'评论内容不能为空！',trigger:'blur'},
        ],
        nickname:[
            {required:true,message:'昵称不能为空！',trigger:'blur'},
            {min:2,message:'昵称长度至少两位',trigger:'blur'}
        ],
        email:[
            {required:true,message:'邮箱不能为空！',trigger:'blur'},
            {pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'这不是一个有效的邮箱！',trigger:'blur'}
        ]
    }
})

const onSubmit = () => {
    if(!ruleFormRef.value) return;
    ruleFormRef.value.validate(async(valid,fields) => {
        if(valid){
            state.ruleForm.articleId = route.query.id;
            axios.post('/comments',state.ruleForm).then(res => {
                if(res.data.code === 200){
                    ElMessage({type:'success',message:res.data.msg});
                }
            }).catch(err => {
                ElMessage({type:'warning',message:err.response.data.msg});
            });
           
        }else{
            console.log('error submit!',fields);
        }
    })
}

onMounted(() => {
    axios.post('/getArticleComments',{articleId:route.query.id}).then(res => {
        commentsList.value = res.data.list;
        total.value = res.data.total;
    })
})
</script>

<style lang="scss">
    .commentsList{
        width:100%;
        >h2{
            text-align:center;
            font-size:24px;
            font-family: "楷体", "KaiTi", "STKaiti";
        }
        .item{
            width:100%;
            padding:12px 0;
            border-bottom:1px dashed #dcdfe6;
            .nickname{
                font-size:22px;
                font-family: "kt",'楷体','KaiTi','STKaiti';
                font-weight:bold;
                >img{
                    display:inline-block;
                    width:40px;
                    vertical-align: middle;
                    border-radius: 50%;
                    margin:0 6px 0 0;
                }
            }
            .contentBox{
                text-indent:46px;
            }
            .date{
                text-align:right;
            }
        }
    }
    .el-textarea__inner{
        min-height:240px!important;
    }
    @media screen and (max-width:768px){
        .commentsList{
            width:100%;
            >h2{
                font-size:18px;
            }
            .item{
                width:100%;
                .nickname{
                    font-size:16px;
                    font-family: normal;
                }
            }
            .contentBox{
                font-size:12px;
            }
            .date{
                font-size:12px;
            }
        }
    }
</style>