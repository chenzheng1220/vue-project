<template>
  <div class="container">
    <Header></Header>
    <div class="content">
       <router-view v-slot="{Component,route}">
          <keep-alive>
            <component v-if="route.meta.keepAlive" :key="route.name" :is="Component" />
          </keep-alive>
          <component v-if="!route.meta.keepAlive" :key="route.name" :is="Component" />
       </router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup>
import { RouterLink, RouterView} from 'vue-router';
import Header from './components/header.vue';
import Footer from './components/footer.vue';

</script>
<style lang="scss">

.container{
  width:100%;
  
  .content{
    width:1200px;
    display:flex;
    margin:12px auto;
   
  }

}
@media screen and (max-width:768px) {
  .container{
    .content{
      width:100%;
      flex-direction: column-reverse;
      padding:0 12px;
    }
  }
 

}




</style>
