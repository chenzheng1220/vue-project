<template>
    <div class="article" v-loading="load">
      <div class="article-head item">
        <h1 class="title">{{ article.title }}</h1>
        <div class="tag">
            <el-tooltip content="发布时间" :offset=0><span><el-icon><Calendar /></el-icon> {{ article.releaseTime }}</span></el-tooltip>
           <span v-if="article && article.tag"><el-icon><CollectionTag /></el-icon><label v-for="name in article?.tag">{{ name }}</label></span>
            <el-tooltip content="阅读量" :offset=0><span><el-icon><View /></el-icon>{{ article.views }}</span></el-tooltip>
        </div>
      </div>

      <div class="text item">
        <MdPreview :editorId="id" :modelValue="mdEditor" :codeFoldable="false" />
      </div>
      

       <div class="comments item">
            <Comments />
       </div>

       <el-backtop :right="100" :bottom="100" ><svg t="1719978087590" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6212" width="34" height="34"><path d="M509.44 267.52C504.32 262.4 498.56 259.84 492.8 258.56 488.96 256.64 484.48 256 480 256S471.04 256.64 467.2 258.56C461.44 259.84 455.68 262.4 450.56 267.52l-313.6 313.6c-14.08 14.08-14.08 35.84 0 49.92 14.08 14.08 35.84 14.08 49.92 0L448 369.92l0 558.08C448 945.92 462.08 960 480 960S512 945.92 512 928L512 369.92l261.12 261.12c14.08 14.08 35.84 14.08 49.92 0 14.08-14.08 14.08-35.84 0-49.92L509.44 267.52zM864 128l-768 0C78.08 128 64 142.08 64 160 64 177.92 78.08 192 96 192l768 0C881.92 192 896 177.92 896 160 896 142.08 881.92 128 864 128z" p-id="6213" fill="#707070"></path></svg></el-backtop>
    </div>
</template>

<script setup>
import Comments from '@/components/comments.vue';
import {ref,onMounted} from 'vue';
import {useRoute} from 'vue-router';
import axios from '@/utils';
import { MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
const id = 'preview-only';
const mdEditor = ref('');
const route = useRoute();
const load = ref(false);
const article = ref({});
const getArticle = async(id) => {
    load.value = true;
    await axios.get(`/getArticle?id=${id}`).then(res => {
        load.value = false;
        article.value = res.data.data;
        mdEditor.value = res.data.data.content;
    })
}
onMounted(async() => {
    
    let id = route.query.id || '';
    await getArticle(id);
    window.scrollTo(0,0);
})
</script>

<style lang="scss">
.article{
    max-width:900px;
    width:100%;
    overflow:hidden;
    >.item{
        border: 1px solid #EBEDF0;
        box-shadow: 0 0 2px #EBEDF0;
        border-radius: 6px;
        padding:0 30px;
        background-color:#ffffff;
        margin:0 0 12px;
    }
    .article-head{
        width:100%;
        padding:20px;
        text-align:center;
        .title{
            font-size:26px;
            font-family: "kt",'楷体','KaiTi','STKaiti';
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .tag{
            width:100%;
            color:#909399;
            margin:12px 0 0;
            span{
                display:inline-flex;
                align-items:center;
                margin:0 6px;
                .el-icon{
                    font-size:20px;
                }
                label{
                    display: inline-block;
                    margin: 0 2px; 
                    cursor:pointer;
                    &:hover{
                        color:#003dbb;
                    }
                }
            }
        }
    }
   
    .text{
        h2{
            font-size:24px;
            font-weight: bold;
            margin:12px 0;
            font-family: "kt",'楷体','KaiTi','STKaiti';
        }
        h3{
            font-size:22px;
            font-weight:bold;
            margin:6px 0; 
            font-family: "kt",'楷体','KaiTi','STKaiti';
        }
        p{
            font-size:16px;
            line-height:2em;
            text-indent:2em;
            text-align: justify;
            margin:0 0 12px;
        }
        img{
            display:block;
            margin:0 auto;
            max-width:100%;
        }
    }
    .comments{
        margin:0 auto 100px;
        padding:50px;
    }
    .el-backtop{
        width:50px;
        height:50px;
  }
}
.el-icon{
    padding:0 2px 0 0;
  }
  @media screen and (max-width:678px) {
    .article{
        width:100%;
        >.item{
            padding:10px 15px;
        }
        .article-head{
            margin:12px auto;
            .title{
                font-size:18px;
                font-family: normal ;
            }
            .tag{
                font-size:13px;
                margin:0 auto;
            }
        }
        .text{
            .md-editor-preview-wrapper{
                padding:0;
            }
            h2{
                font-size:18px;
                font-family: normal;
            }
            h3{
                font-size:16px;
                font-family: normal;
            }
            p{
                font-size:14px;
                margin:0 0 6px;
            }
        }
        .el-backtop{
            right:20px!important;
            bottom:20px!important;  
        }
        .comments{
            margin:0 auto 20px;
            
        }
    }
  }
</style>