<template>
    <div class="resource" v-loading="load">
        <div class="item">
            <h2>学习文档</h2>
            <div class="wrap">
                <a v-for="item in list1" :key="item.id" :href="item.url" target="_blank">{{ item.name }}</a>
            </div>
        </div>

        <div class="item">
            <h2>在线工具</h2>
            <div class="wrap">
                <a v-for="item in list2" :key="item.id" :href="item.url" target="_blank">{{ item.name }}</a>
            </div>
        </div>

        <div class="item">
            <h2>资源下载</h2>
            <div class="wrap">
                <a v-for="item in list3" :key="item.id" :href="item.url" target="_blank">{{ item.name }}</a>
            </div>
        </div>

        <div class="item">
            <h2>技术博主</h2>
            <div class="wrap">
                <a v-for="item in list4" :key="item.id" :href="item.url" target="_blank">{{ item.name }}</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from '@/utils';
import {ref,reactive, onMounted } from 'vue';
const list1 = ref([]);
const list2 = ref([]);
const list3 = ref([]);
const list4 = ref([]);
const load = ref(false);
const state = reactive({
    pageNumber:1,
    pageSize:50,
    selectType:''
})
const getResourceList = async(type) => {
    load.value = true;
    state.selectType = type;
     await axios.post('/getResourceList',state).then(res => {
        load.value = false
        if(type === '学习文档'){
            
            list1.value = res.data.list;
        }
        if(type === '在线工具'){
            list2.value = res.data.list;
        }
        if(type === '资源下载'){
            list3.value = res.data.list;
        }
        if(type === '技术博主'){
           
            list4.value = res.data.list;
        }
    })
}
onMounted(async() => {
    getResourceList('学习文档');
    getResourceList('在线工具');
    getResourceList('资源下载');
    getResourceList('技术博主');
})
</script>

<style lang="scss">
    .resource{
        width:100%;
        min-height:600px;
        .item{
            width:100%;
            min-height:122px;
            box-shadow: 0 0 2px #ffffff;
            padding:12px;
            margin:0 0 12px;
            background-color:#ffffff;
            >h2{
                font-size:22px;
                font-family: "kt";
            }
            .wrap{
                width:100%;
                display:flex;
                flex-wrap:wrap;

                >a{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 150px;
                    width:calc(20% - 24px); // 减去两个边距和两个边框的宽度
                    height: 42px;
                    margin: 12px;
                    border: 1px solid #eef0fc;
                    box-shadow: 0 0 2px #eef0fc;
                    border-radius: 4px;
                    transition:all .6s;
                    color:#2c3e50;
                    &:hover{
                        box-shadow: 0 0 5px rgba(114, 124, 245, 0.5);
                        color:#003dbb;
                    }
                }
            }
        }
    }
    @media screen and (max-width:768px){
      .resource{
        .item{
            >h2{
                font-size:16px;
            }
            .wrap{
                >a{
                    width:calc(50% - 12px); // 减去两个边距和两个边框的宽度
                    margin:6px;
                    font-size:14px;
                }
            }
        }
      }
        
    }
</style>