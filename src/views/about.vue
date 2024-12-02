<template>
    <div class="about" v-loading="load">
        <MdPreview editorId="editor" :modelValue="mdEditor" />
    </div>
    <Aside />
</template>

<script setup>
import {ref,onMounted} from 'vue';
import Aside from '@/components/aside.vue';
import { MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
const mdEditor = ref('');
const load = ref(false);
onMounted(async() => {
    load.value = true;
    await fetch('/api/getSettingsDetail',{method:'get'}).then(response => response.json()).then(res => {
        load.value = false;
        mdEditor.value = res.data.about;
       
    })
})
</script>

<style lang="scss">
    .about{
        flex:1;
        background-color:#ffffff;
        padding:0 30px 50px;
        h3{
            font-size:22px;
            font-weight:bold;   
            margin:6px 0; 
            font-family:"kt";
        }
        p{
            font-size:16px;
            line-height:2em!important;
            text-indent:2em;
            text-align: justify;
            margin:0 0 12px!important;
        }
        img{
            display:block;
            margin:0 auto;
            max-width:100%;
        }
    }
    @media screen and (max-width:768px) {
        .about{
            padding:0;
            h3{
                font-size:16px;
            }
            p{
                font-size:14px;
                margin:0 0 6px!important;
            }
        }
    }
</style>