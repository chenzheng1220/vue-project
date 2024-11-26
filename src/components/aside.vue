<template>
    <aside>
        <div class="setting">
            <img class="avatar" :src="settings.avatar" />
            <h2 class="author">{{ settings.author }}</h2>
            <p class="introduction">{{ settings.introduction }}</p>
            <div class="total">
                <div class="item">
                    <p>{{ articleTotal }}</p>
                    <p>文章</p>
                </div>
                <div class="item">
                    <p>{{ categoryTotal }}</p>
                    <p>分类</p>
                </div>
                <div class="item">
                    <p>{{ tagsTotal }}</p>
                    <p>标签</p>
                </div>
            </div>
            <a class="btn" :href="settings.github" target="_blank">查看源码</a>

        </div>

        <div class="category" :class="!isShow ? 'isSticky':''">
            <h2><el-icon><FolderOpened /></el-icon>文章分类</h2>
            <div class="box">
                <div class="item" v-for="(item,index) in categoryList" @click="handleClick(item)"><span>{{ item.name }}</span><span>{{ item.value }}</span></div>
            </div>
        </div>

        <div class="catalog" v-if="isShow">
            <h2><el-icon><List /></el-icon>文章目录</h2>
            <MdCatalog :editorId="editorId" :scrollElement="scrollElement" :scrollElementOffsetTop="scrollElementOffsetTop" :offsetTop="offsetTop" />
        </div>
    </aside>
   
</template>

<script setup>
    import {ref,reactive,onMounted} from 'vue';
    import axios from '@/utils';
    import {useRouter,useRoute} from 'vue-router';
    import { MdCatalog } from 'md-editor-v3'; 
    import 'md-editor-v3/lib/preview.css';
    const router = useRouter();
    const route = useRoute();
    const categoryList = ref([]);
    const settings = reactive({
        avatar:'',
        author:'',
        introduction:'',
        github:''
    });
    const articleTotal = ref(0);
    const categoryTotal = ref(0);
    const tagsTotal = ref(0);
    const isShow = ref(false);
    const props = defineProps({
        editorId: String,
        scrollElement: Object,
        scrollElementOffsetTop:Number,
        offsetTop:Number
    });
 
    const emit = defineEmits(['updateValue']);
    const handleClick = (val) => {
        router.push({path:'/index',query:{name:val.name}});
        emit('updateValue',val.name);

    }

 
    
    onMounted(() => {
        route.query.id ? isShow.value = true : isShow.value = false;
        axios.post('/getArticleCategoryStatistics').then(res => {
            categoryList.value = res.data.list;
            categoryTotal.value = res.data.list.length;
            articleTotal.value = res.data.list.reduce((acc,item) => acc + item.value,0);
        })
        fetch('/api/getSettingsDetail',{
            method:'post'
        }).then(response => response.json()).then(res => {
            settings.avatar = res.data.avatar;
            settings.author = res.data.author;
            settings.introduction = res.data.introduction;
            settings.github = res.data.github;
        });
        fetch('/api/getTagList',{
            method:'post'
        }).then(response => response.json()).then(res => {
            tagsTotal.value = res.list.length;
        })
    })
</script>

<style lang="scss">
    aside{
        box-sizing:border-box;
        width:300px;
        padding-left:12px;
        >div{
            min-height:300px;
            border:1px solid #EBEDF0;
            box-shadow:0 0 2px #EBEDF0;
            border-radius:6px;
            padding:24px;
            background-color:#ffffff;
        }
        .setting{
            width:100%;
            font-family:"kt";
            .avatar{
                display:block;
                width:100px;
                border-radius:50%;
                margin:0 auto;
            }
            .author{
                text-align: center;
                font-weight: normal;
                font-size: 24px;
                letter-spacing: 2px;
                margin:12px auto;
            }
            .introduction{
                text-align:center;
                font-size:20px;
            }
            .total{
                width:100%;
                display:flex;
                justify-content: space-around;
                margin:12px auto;
                letter-spacing:1px;
                font-size:20px;
                .item{
                    text-align:center;
                }
            }
            .btn{
                display: block;
                width: 134px;
                height: 42px;
                line-height: 42px;
                text-align: center;
                margin: 0 auto;
                border-radius: 6px;
                letter-spacing: 2px;
                color:#ffffff;
                animation:changeColor 6s linear infinite;
                font-size:20px;
                font-family: 'kt';
            }
            @keyframes changeColor {
                0%{
                    background:linear-gradient(to right,red,orange);
                }
                20%{
                    background:linear-gradient(to right,orange,yellow);
                }
                40%{
                    background:linear-gradient(to right,yellow,green);
                }
                60%{
                    background:linear-gradient(to right,green,cyan);
                }
                80%{
                    background:linear-gradient(to right,cyan,blue);
                }
                100%{
                    background:linear-gradient(to right,blue,purple);
                }
            }
        }
        .category{
            width:100%;
            margin:12px 0;
          
            >h2{
                font-size:24px;
                display:flex;
                align-items:center;
                margin:0 0 12px;
                font-family: "kt";
                font-weight:normal;
            }
            .box{
                display:flex;
                flex-wrap:wrap;
                .item{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    width:100%;
                    height: 42px;
                    margin: 6px 4px;
                    padding:0 12px;
                    border: 1px solid #EBEDF0;
                    box-shadow: 0 0 2px #EBEDF0;
                    border-radius:4px;
                    cursor:pointer;
                    transition:all .5s;
                    &:hover{
                        box-shadow: 0 0 5px rgba(114, 124, 245, 0.5);
                        color: #003dbb;

                    }
                    >span:last-child{
                        display:inline-flex;
                        width:24px;
                        height:24px;
                        justify-content: center;
                        align-items: center;
                        border-radius:50%;
                        box-shadow:0 0 3px rgba(114, 124, 245, 0.8);
                        font-size:12px;
                        margin:0 4px;
                        
                    }
                }
            }
          
        }
        .isSticky{
            position:sticky;
            top:81px;
        }
        .catalog{
            position:sticky;
            top:83px;
            >h2{
                 font-size:24px;
                display:flex;
                align-items:center;
                margin:0 0 12px;
                font-weight:normal;
                font-family: "kt";
            }
        }
       
       
      
    }
    @media screen and (max-width:768px){
        aside{
            width:100%;
            padding:0;
            .category{
                font-size:14px;
                >h2{
                    font-size:20px;
                }
            }
            .catalog{
                font-size:14px;
                >h2{
                    font-size:20px;
                }
            }
        }
    }
</style>