<template>
    <div class="resource">
        <div class="item">
            <h2>学习文档</h2>
            <div class="wrap">
                <a v-for="(item,index) in list1" :href="item.url" target="_blank">{{ item.name }}</a>
            </div>
        </div>

        <div class="item">
            <h2>在线工具</h2>
            <div class="wrap">
                <a v-for="(item,index) in list2" :href="item.url" target="_blank">{{ item.name }}</a>
            </div>
        </div>

        <div class="item">
            <h2>资源下载</h2>
            <div class="wrap">
                <a v-for="(item,index) in list3" :href="item.url" target="_blank">{{ item.name }}</a>
            </div>
        </div>

        <div class="item">
            <h2>技术博主</h2>
            <div class="wrap">
                <a v-for="(item,index) in list4" :href="item.url" target="_blank">{{ item.name }}</a>
            </div>
        </div>
    </div>
    <Aside />
</template>

<script setup>
import Aside from '@/components/aside.vue';
import axios from '@/utils';
import {ref,reactive, onMounted } from 'vue';
const list1 = ref([]);
const list2 = ref([]);
const list3 = ref([]);
const list4 = ref([]);
const state = reactive({
    pageNumber:1,
    pageSize:50,
    selectType:''
})
const getResourceList = (type) => {
    state.selectType = type;
     axios.post('/getResourceList',state).then(res => {
        if(type === '学习文档'){
            list1.value = res.data.list;
        }
        if(type === '在线工具'){
            list2.value = res.data.list;
        }
        if(type === '资源下载'){
            list3.value = res.data.list;
        }
        if(type === '优秀博主'){
            list4.value = res.data.list;
        }
    })
}
onMounted(() => {
     getResourceList('学习文档');
     getResourceList('在线工具');
     getResourceList('资源下载');
     getResourceList('优秀博主');
})
</script>

<style lang="scss">
    .resource{
        flex:1;
        .item{
            border: 1px solid #EBEDF0;
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
                    width: 150px;
                    height: 42px;
                    margin: 12px;
                    border: 1px solid #EBEDF0;
                    box-shadow: 0 0 2px #EBEDF0;
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
                    margin:6px;
                    font-size:14px;
                }
            }
        }
      }
        
    }
</style>