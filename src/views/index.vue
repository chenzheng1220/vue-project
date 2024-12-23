<template>
  <div class="index" v-loading="load">
    <div class="item" v-for="(item,index) in articleList" :key="index" @click="goToArticle(item)">
      <div class="artCover">
        <img :src="item.articleCover" />
      </div>
      <div class="text">
        <h2 class="title">{{ item.title }}</h2>
        <p class="introduction">{{ item.introduction }}</p>
        <div class="tag">
          <span><el-icon><Calendar /></el-icon> {{ item.releaseTime }}</span>
          <span v-if="item.tag.length !== 0"><el-icon><CollectionTag /></el-icon><label v-for="name in item.tag">{{ name }}</label></span>

        </div>
      </div>
    </div>

    <div class="page">
      <el-pagination
      background
      layout="prev, pager, next"
      v-model:current-page="state.pageNumber"
      v-model:page-size="state.pageSize"
      :page-size="state.pageSize"
      @update:current-page="handleChange"
      @size-change="handleSizeChange"
      :total = total
      />
    </div>
    <div>
      
    </div>
    
  </div>
  <!-- <Aside @updateValue="getCategoryName" /> -->
</template>

<script setup>
  import {ref,reactive,onMounted,toRefs,inject,watch} from 'vue';
  import Aside from '@/components/aside.vue';
  import axios from '@/utils';
  import {useRouter,useRoute} from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const load = ref(false);
  const query = ref(route.query.name);
  const state = reactive({
    pageNumber:1,
    pageSize:10,
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
    load.value = true;
    await axios.post('/getArticleList',state).then(res => {
      load.value = false;
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
    .item{
      width:100%;
      margin:0 auto 12px;
      height:150px;
      display:flex;
      border: 1px solid #EBEDF0;
      box-shadow: 0 0 2px #EBEDF0;
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
            .el-icon{
              font-size:20px;
            }
            &:last-child{
              margin-left:12px
            }
            label{
              display:inline-block;
              margin:0 2px;
              cursor: pointer;
              &:hover{
                color:#003dbb;
              }
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
</style>
