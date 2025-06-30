<template>
  <div class="container">
    <Header></Header>
    <div class="content">
      <div class="showBox">
        <router-view v-slot="{Component,route}">
        <keep-alive>
          <component v-if="route.meta.keepAlive" :key="route.name" :is="Component" />
        </keep-alive>
        <component v-if="!route.meta.keepAlive" :key="route.name" :is="Component" />
      </router-view>
      </div>
     <div class="menuBox">
      <Aside></Aside>
     </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup>
import {RouterView} from 'vue-router';
import Header from './components/header.vue';
import Aside from './components/aside.vue';
import Footer from './components/footer.vue';

</script>
<style lang="scss">

.container{
  width:100%;
  .content{
    width:1200px;
    min-height:1150px;
    display:flex;
    margin:12px auto;
    overflow:hidden;
   .showBox{
    flex:1;
    
   }
   .menuBox{
    width:300px;
    margin-left:12px;
   }
  }

}
@media screen and (max-width:768px) {
  .container{
    .content{
      width:100%;
      flex-direction: column-reverse;
      padding:0 12px;
      .menuBox{
       width:100%;
       margin-left:0;
      }
    }
  }
 

}




</style>
