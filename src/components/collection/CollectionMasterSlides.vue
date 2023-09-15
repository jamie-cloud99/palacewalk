<template>
  <swiper-container
    :space-between="24"
    :scrollbar="true"
    :slides-per-view="1"
    :breakpoints="{
      576: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 }
    }"
  >
    <swiper-slide v-for="item in MasterPeiceList" :key="item.collectionId">
      <CollectionListItem :collection-item="item" />
    </swiper-slide>
  </swiper-container>
</template>

<script setup>
import { ref } from 'vue'
import CollectionListItem from './CollectionListItem.vue'

const MasterPeiceList = ref([
  {
    id: '401',
    collectionId: 'K004',
    title: '緙繡九羊啟泰 軸',
    author: '不詳',
    time: '清'
  },
  {
    id: '14',
    collectionId: 'P014',
    title: '畫春花三種 軸',
    author: '錢維城',
    time: '清'
  },
  {
    id: '15',
    collectionId: 'P015',
    title: '奔馬行空　單片',
    author: '徐悲鴻',
    time: '民國'
  },
  {
    id: '16',
    collectionId: 'P016',
    title: '翠巘高秋圖　軸',
    author: '愛新覺羅弘旿',
    time: '清'
  },
  {
    id: '18',
    collectionId: 'P018',
    title: '畫山水 軸',
    author: '趙孟頫',
    time: '元'
  }
])
</script>
