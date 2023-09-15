<template>
  <swiper-container
    class="lg:overflow-hidden"
    :space-between="24"
    :scrollbar="true"
    :slides-per-view="2"
    :breakpoints="{ 1024: { slidesPerView: 4 } }"
  >
    <swiper-slide>
      <figure class="w-full h-[210px] lg:h-[215px]">
        <img
          class="w-full h-full object-cover object-centers"
          :src="`/images/collection/collection-P001.jpg`"
          alt="P001"
        />
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="w-full h-[210px] lg:h-[215px]">
        <img
          class="w-full h-full object-cover object-center"
          :src="`/images/collection/collection-P002.jpg`"
          alt="P002"
        />
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="w-full h-[210px] lg:h-[215px]">
        <img
          class="w-full h-full object-cover object-center"
          :src="`/images/collection/collection-P003.jpg`"
          alt="P003"
        />
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="w-full h-[210px] lg:h-[215px]">
        <img
          class="w-full h-full object-cover object-center"
          :src="`/images/collection/collection-P003.jpg`"
          alt="P003"
        />
      </figure>
    </swiper-slide>
  </swiper-container>
</template>

<script setup>
import { ref } from 'vue'
// import CollectionListItem from './CollectionListItem.vue'

const MasterPeiceList  = ref([
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
      id: '1',
      collectionId: 'U001',
      title: '翠玉白菜',
      author: '不詳',
      time: '明末清初'
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
      id: '201',
      collectionId: 'A005',
      title: '琺瑯彩柳燕碗',
      author: '不詳',
      time: '清'
    }])

</script>
