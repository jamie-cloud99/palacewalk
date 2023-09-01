<template>
  <div class="banner"></div>
  <div class="collection">
    <div  v-for="item in test" :key="item.id">
      <!-- TODO: css 編號計算-->
      <h2>{{ item.header }}</h2>
      <img :src=`${item.url}-${item.id}` alt="item.title">
      <p>{{ item.content }}</p>
      <a href="">查看展品</a>
    </div>
  </div>
</template>
<script setup>

</script>