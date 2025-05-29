<template>
  <div class="index">
    <div class="skeleton-container" v-if="loading">
      <div class="item skeleton-item" v-for="i in 12" :key="i">
      </div>
  </div>
   
  <div class="skeleton-container" else>
    <div class="item" v-for="item in articleList" :key="item.id" v-track="{type:'图文列表',target:item.title}" @click="goToArticle(item)">
      <div class="artCover">
        <img v-lazyload="item.articleCover" src="" width="120px" height="120px" alt="articleCover" />
      </div>
      <div class="text">
        <h2 class="title">{{ item.title }}</h2>
        <p class="introduction">{{ item.introduction }}</p>
        <div class="tag">
          <span><svg t="1742795629672" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3113" width="20" height="20"><path d="M928 128h-117.333333v-21.333333a21.333333 21.333333 0 0 0-42.666667 0v21.333333H554.666667v-21.333333a21.333333 21.333333 0 0 0-42.666667 0v21.333333H298.666667v-21.333333a21.333333 21.333333 0 0 0-42.666667 0v21.333333H138.666667a53.393333 53.393333 0 0 0-53.333334 53.333333v704a53.393333 53.393333 0 0 0 53.333334 53.333334h789.333333a53.393333 53.393333 0 0 0 53.333333-53.333334V181.333333a53.393333 53.393333 0 0 0-53.333333-53.333333zM138.666667 170.666667h117.333333v21.333333a21.333333 21.333333 0 0 0 42.666667 0v-21.333333h213.333333v21.333333a21.333333 21.333333 0 0 0 42.666667 0v-21.333333h213.333333v21.333333a21.333333 21.333333 0 0 0 42.666667 0v-21.333333h117.333333a10.666667 10.666667 0 0 1 10.666667 10.666666v160H128V181.333333a10.666667 10.666667 0 0 1 10.666667-10.666666z m789.333333 725.333333H138.666667a10.666667 10.666667 0 0 1-10.666667-10.666667V384h810.666667v501.333333a10.666667 10.666667 0 0 1-10.666667 10.666667zM384 490.666667a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m128 128a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m0 128a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334zM384 618.666667a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334zM256 490.666667a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m0 256a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m0-128a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m256-128a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m-128 256a21.333333 21.333333 0 1 1-21.333333-21.333334 21.333333 21.333333 0 0 1 21.333333 21.333334z m298.666667-256a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1 0-42.666667h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333334z m170.666666 0a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1 0-42.666667h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333334z m0 128a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1 0-42.666667h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333334z m-170.666666 0a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1 0-42.666667h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333334z m0 128a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1 0-42.666667h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333334z" fill="#909399" p-id="3114"></path></svg> {{ item.releaseTime }}</span>
          <span v-if="item.tag.length !== 0"><svg t="1742796856061" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15874" width="20" height="20"><path d="M362 312h300v60H362z" fill="#909399" p-id="15875"></path><path d="M772 162H212v699.999l60-34.641 240-150.111 240 150.111L812 862V162h-40zM572 642.607l-60-34.641-60 34.641-180 115.47V222h480v536.076L572 642.607z" fill="#909399" p-id="15876"></path></svg><label v-for="name in item.tag" :key="name">{{ name }}</label></span>

        </div>
      </div>
    </div>
  </div>

    <div class="page" >
      <el-config-provider  :locale="language">
        <el-pagination
            background
            layout="prev, pager, next,total"
            v-model:current-page="state.pageNumber"
            v-model:page-size="state.pageSize"
            :page-size="state.pageSize"
            @update:current-page="handleChange"
            @size-change="handleSizeChange"
            :total = total
            />
      </el-config-provider>
     
    </div>
    <!-- <img v-draggable src="http://lejibiji.cn:8081/uploads/ced5ab49-ab07-4fe5-91c6-adbac2cc5e19-avatar.jpg"/> -->
    <div>
      
    </div>
    
  </div>


</template>

<script setup>
  import {ref,reactive,onMounted,toRefs,inject,watch} from 'vue';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import Aside from '@/components/aside.vue';
  import axios from '@/utils';
  import {useRouter,useRoute} from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const loading = ref(true);
  const query = ref(route.query.name);
  const language = ref(zhCn)
  const state = reactive({
    pageNumber:1,
    pageSize:12,
    keyword:''
  })
  const total = ref(0);
  const articleList = ref([]);
 
  const handleChange = async(val) => {
    state.pageNumber = val; 
    await getArticleList();
  }

  const handleSizeChange = async(val) => {
    state.pageSize = val;
    await getArticleList();
  }
  const getArticleList = async() => {
    loading.value = true;
    await axios.post('/getArticleList',state).then(res => {
      loading.value = false;
      articleList.value = res.data.list;
      total.value = res.data.totalNum;
    });
  }

  const getCategoryName = async(val) => {
    state.keyword = val || '';
    await getArticleList();
  }

  const goToArticle = (val) => {
    router.push({path:'/article',query:{id:val.id}});
  }

  watch(() => route.query.name, async(newVal) => {
    query.value = newVal;
    await getCategoryName(query.value);
    window.scrollTo(0,0);
});

  onMounted(async() => {
   
    let name = route.query.name || '';
    await getCategoryName(name);
    window.scrollTo(0,0);
  
  })

</script>

<style lang="scss">
  .index{
    width:100%;
    min-height:100vh;
    .skeleton-item{
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite ;
    }
    .item{
      width:100%;
      margin:0 auto 12px;
      height:150px;
      display:flex;
      box-shadow: 0 0 2px #ffffff;
      border-radius:6px;
      padding: 12px 12px 12px 6px;
      background-color:#ffffff;
      &:hover{
        box-shadow: 0 0 5px rgba(114, 124, 245, 0.5);
        img{
          transform:scale(1.1);
        }
        .text .title{
          background-position-x: left;
          background-size:100% 2px;
        }
      
      }
      cursor:pointer;
      .artCover{
        width:160px;
        display:flex;
        justify-content: center;
        align-items:center;
        >img{
          display:inline-block;
          width:120px;
          height:120px;
          border-radius:6px;
          transition:all 1.2s;
          object-fit:cover;
          object-position:center top;
          overflow:hidden;
        }
      }
      .text{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        
        .title{
          max-width: 720px;
          width:fit-content;
          font-size:22px;
          font-weight:bold;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-family:'楷体','KaiTi','STKaiti';
          background-image: linear-gradient(to right, #0800fe, #00f92e);
          background-repeat: no-repeat;
          background-position: right bottom;
          background-size:0 2px;
          transition:background-size 1.2s;
        }
        .introduction{
          height:50px;
          display:-webkit-box;
          overflow:hidden;
          text-overflow:ellipsis;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          font-size:16px;
          line-height:1.6em;
          color:#606266;
        }
        .tag{
          width:100%;
          color:#909399;
          span{
            display:inline-flex;
            align-items:center;
            
            label{
              display:inline-block;
              cursor: pointer;
              margin-right:2px;
              &:hover{
                color:#003dbb;
              }
            }
            .icon{
              display:inline-block;
              margin:0 6px;
            }
          }
        }
      }
    }
    .page{
      display:flex;
      justify-content: center;
      margin:30px auto;
    }
  }
  .el-icon{
    padding:0 2px 0 0;
  }
  @media screen and (max-width:768px){
    .index{
      width:100%;
      .item{
        height:100px;
        padding: 6px 6px 6px 0px;
        .artCover{
          width:80px;
          >img{
            width:60px;
            height:60px;
          }
        }
        .text{
          width:calc(100% - 80px);
          .title{
            width:100%;
            font-size:14px;
            font-family:normal;
          }
          .introduction{
            display: inline-block;
            width:100%;
            height:24px;
            font-size:13px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .tag{
            font-size:12px;
          }
        }
      }
    }
  }

  
@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
