<template>
    <div class="article" v-loading="load">
      <div class="article-head item">
        <h1 class="title">{{ article.title }}</h1>
        <div class="tag">
            <el-tooltip content="发布时间" :offset=0><span><svg t="1742795629672" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3113" width="20" height="20"><path d="M928 128h-117.333333v-21.333333a21.333333 21.333333 0 0 0-42.666667 0v21.333333H554.666667v-21.333333a21.333333 21.333333 0 0 0-42.666667 0v21.333333H298.666667v-21.333333a21.333333 21.333333 0 0 0-42.666667 0v21.333333H138.666667a53.393333 53.393333 0 0 0-53.333334 53.333333v704a53.393333 53.393333 0 0 0 53.333334 53.333334h789.333333a53.393333 53.393333 0 0 0 53.333333-53.333334V181.333333a53.393333 53.393333 0 0 0-53.333333-53.333333zM138.666667 170.666667h117.333333v21.333333a21.333333 21.333333 0 0 0 42.666667 0v-21.333333h213.333333v21.333333a21.333333 21.333333 0 0 0 42.666667 0v-21.333333h213.333333v21.333333a21.333333 21.333333 0 0 0 42.666667 0v-21.333333h117.333333a10.666667 10.666667 0 0 1 10.666667 10.666666v160H128V181.333333a10.666667 10.666667 0 0 1 10.666667-10.666666z m789.333333 725.333333H138.666667a10.666667 10.666667 0 0 1-10.666667-10.666667V384h810.666667v501.333333a10.666667 10.666667 0 0 1-10.666667 10.666667zM384 490.666667a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m128 128a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m0 128a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334zM384 618.666667a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334zM256 490.666667a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m0 256a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m0-128a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m256-128a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m-128 256a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m298.666667-256a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1 0-42.666667h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333334z m170.666666 0a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1 0-42.666667h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333334z m0 128a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1 0-42.666667h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333334z m-170.666666 0a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1 0-42.666667h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333334z m0 128a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1 0-42.666667h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333334z" fill="#909399" p-id="3114"></path></svg> {{ article.releaseTime }}</span></el-tooltip>
           <span v-if="article && article.tag"><svg t="1742796856061" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15874" width="20" height="20"><path d="M362 312h300v60H362z" fill="#909399" p-id="15875"></path><path d="M772 162H212v699.999l60-34.641 240-150.111 240 150.111L812 862V162h-40zM572 642.607l-60-34.641-60 34.641-180 115.47V222h480v536.076L572 642.607z" fill="#909399" p-id="15876"></path></svg><label v-for="name in article?.tag" :key="name">{{ name }}</label></span>
            <el-tooltip content="阅读量" :offset=0><span><svg t="1742797344617" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19067" id="mx_n_1742797344618" width="20" height="20"><path d="M512.173 795c171.39 0 318.422-118.888 356.196-283.157C830.477 347.727 683.517 229 512.245 229c-171.39 0-318.422 118.888-356.197 283.157C193.941 676.273 340.9 795 512.173 795zM75.93 504.096C118.297 298.658 299.91 149 512.245 149c212.19 0 393.717 149.458 436.234 354.712a40 40 0 0 1 0.007 16.192C906.121 725.342 724.507 875 512.173 875c-212.191 0-393.718-149.458-436.235-354.712a40 40 0 0 1-0.007-16.192zM512 704c-106.039 0-192-85.961-192-192s85.961-192 192-192 192 85.961 192 192-85.961 192-192 192z m0-80c61.856 0 112-50.144 112-112s-50.144-112-112-112-112 50.144-112 112 50.144 112 112 112z" fill="#909399" p-id="19068"></path></svg>{{ article.views }}</span></el-tooltip>
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
   try{
    load.value = true;
    const res = await axios.get(`/getArticle?id=${id}`);
    article.value = res.data.data;
    mdEditor.value = res.data.data.content;
   }catch(err){
    ElMessage({
        type:'error',
        message:err.response.data.msg || '获取文章失败!' 
        })
   }finally{
    load.value = false;
   }
     
   
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
    min-height:100vh;
    overflow:hidden;
    >.item{
        box-shadow: 0 0 2px #ffffff;
        border-radius: 6px;
        padding:0 30px;
        background-color:#ffffff;
        margin:0 0 12px;
    }
    .text{
        width:100%;
        min-height:60vh;
    }
    .article-head{
        width:100%;
        min-height:120px;
        padding:20px;
        text-align:center;
        .title{
            font-size:26px;
            font-family:'楷体','KaiTi','STKaiti';
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .tag{
            width:100%;
            color:#606266;
            margin:12px 0 0;
            span{
                display:inline-flex;
                align-items:center;
                margin:0 6px;
                .icon{
                    margin:0 6px;
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
        color:#222;
        h2{
            font-size:24px;
            font-weight: bold;
            margin:12px 0;
            font-family:'楷体','KaiTi','STKaiti';
           
        }
        h3{
            font-size:22px;
            font-weight:bold;
            margin:6px 0; 
            font-family:'楷体','KaiTi','STKaiti';
          
        }
        p{
            font-size:16px;
            line-height:2em;
            text-indent:2em;
            text-align: justify;
            margin:0 0 6px;
          
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