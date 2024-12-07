<template>
    <div class="file" v-loading="load">
        <div class="item" v-for="(item,index) in list">
            <h2>{{ item.date }}</h2>
            <div class="wrap">
                <p v-for="obj in item.articles" @click="goToArticle(obj.id)"><span>{{ obj.title }}</span> <span>[{{ obj.releaseTime }}]</span></p>
            </div>
        </div>
    </div>
  
</template>

<script setup>
import {useRouter} from 'vue-router';
import axios from '@/utils';
import {ref,onMounted} from 'vue';
const router = useRouter();
const load = ref(false);
const list = ref([]);

const goToArticle = (val) => {
    router.push({path:'/article',query:{id:val}});
}
onMounted(async() => {
    load.value = true;
    await axios.get('/getFileList').then(res => {
        load.value = false;
        list.value = res.data.list;
    })
})
</script>

<style lang="scss">
    .file{
        width:100%;
        background-color: #ffffff;
        padding:30px;
        .item{
            width:100%;
            margin:0 auto 30px;
            >h2{
                font-size:22px;
                font-family: "kt";  
            }
           .wrap{
            width:100%;
            >p{
                margin:0 0 12px;
                span{
                    &:first-child{
                        text-decoration: underline;
                        cursor:pointer;
                    }
                    &:last-child{
                        color:#808080;
                    }
                }
                &:hover{
                    color:#003dbb;

                }
            }
           }
        }
    }
    @media screen and (max-width:768px) {
        .file{
            font-size:14px;
            .item{
                >h2{
                    font-size:16px;
                }
            }
        }
    }
</style>