<template>
     <header>
      <div class="header-wrap">
        
        <div class="logo" @click="handleReload">
          <span style="--i:1">乐</span>
          <span style="--i:2">记</span>
          <span style="--i:3">笔</span>
          <span style="--i:4">记</span>
        </div>
        <nav v-if="isMobile">
            <div class="box" @click="toggleClass" :class="isShow ? 'act' : ''">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
        </nav>
        <nav v-else>
          <router-link to="/index">首页</router-link>
          <router-link to="/file">归档</router-link>
          <router-link to="/resource">在线资源</router-link>
          <router-link to="/about">关于博客</router-link>
          <a href="http://lejibiji.cn/vue3-admin/login" target="_blank">开放式后台</a>
        </nav>
       <transition name="el-zoom-in-top">
        <div class="menu" v-show="isShow">
          <router-link to="/index" @click.native="handleClick">首页</router-link>
          <router-link to="/file" @click.native="handleClick">归档</router-link>
          <router-link to="/resource" @click.native="handleClick">在线资源</router-link>
          <router-link to="/about" @click.native="handleClick">关于博客</router-link>
          <a href="http://lejibiji.cn/vue3-admin/login">开放式后台</a>
        </div>
       </transition>
      </div>
    </header>
</template>

<script setup>
  import {ref,onMounted} from 'vue';
  const isShow = ref(false);
  const isMobile = ref(false);
  const toggleClass = () => {

    isShow.value = !isShow.value;
    console.log(isShow.value)
  }

  const handleClick = () => {
    isShow.value = false;
    window.scrollTo({
        top: 690,
        behavior: 'smooth'
      });
  }

  const handleReload = () => {
    window.location.reload(true);
  }

  const handleReSize = () => {
    isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  }

  handleReSize();

  window.addEventListener('resize',handleReSize);

</script>

<style lang="scss">
$navTextColor:#000000;
$navTextActColor:#003dbb;
header{
   position:sticky;
   z-index:999;
   left:0;
   top:0;
   width:100%;
   background-color:#ffffff;
   border-bottom: 1px solid #EBEDF0;
   box-shadow: 0 0 2px #EBEDF0;
   .header-wrap{
    width:1200px;
    height:68px;
    margin:0 auto;
    display:flex;
    justify-content:space-between;
    align-items:center;
    .logo{
      font-size:30px;
      font-family:"kt";
      color: #000000;
      letter-spacing: 2px;
      text-align: center;
      margin: 0;
      padding: 12px 0;
      user-select: none;
      cursor: pointer;
      >span{
        display:inline-block;
        animation:bounce 1.5s ease-in-out infinite;
        animation-delay: calc(.1s * var(--i));
      }
    }
    nav{
      font-family: "kt";
      font-size:22px;
      a {
        display: inline-block;
        padding: 0 1rem;
        border-left: 1px solid var(--color-border);
        color:$navTextColor;
       &:hover{
        color: $navTextActColor;
       }
      }


      a.router-link-exact-active {
        color: $navTextActColor;
      }

      a.router-link-exact-active:hover {
        
      }

      a:first-of-type {
        border: 0;
      }
    }
   }

  }
  @media screen and (max-width:768px){
   header{
     width:100%;
    .header-wrap{
      position:relative;
      width:100%;
      padding:0 30px;
      .logo{
        font-size:28px;
      }
      nav{
        position:relative;
        .box{
          box-sizing:border-box;
          width:24px;
          height:24px;
          display:flex;
          display:-webkit-flex;
          flex-direction:column;
          align-items:center;
          justify-content:space-around;
          cursor:pointer;
          .line{
            width:90%;
            height:2px;
            background-color:#333;
            transition:0.3s linear;
            -webkit-transition:0.3s linear;
          }
          &.act{
            .line:nth-of-type(1){
              transform:translateY(8px) rotate(45deg);
              -webkit-transform:translateY(8px) rotate(45deg);
            }
            .line:nth-of-type(2){
              opacity:0;
            }
            .line:nth-of-type(3){
              transform:translateY(-8px) rotate(-45deg);
              -webkit-transform:translateY(-8px) rotate(-45deg);
            }
           }
          }
         
        }
        .menu{
            position:absolute;
            width:100%;
            left:0;
            top:68px;
            a{
              display: block;
              width:100%;
              text-align:center;
              background-color:#00000080;
              color:#ffffff;
              padding:6px 0;
              font-size:18px;
              letter-spacing: 1px;
              border-bottom:1px solid #ffffff33;
              font-family:'kt';
            }
            .router-link-active{
              background-color:#003dbb;
            }
          }
      }
    }
   }
   @keyframes bounce{
    0%{
      transform:translateY(0);
    }
    20%{
      transform:translateY(-20px);
    }
   50%,100%{
      transform:translateY(0);
    }
   }
  
</style>