<template>
  <ul class="flex mb-20 gap-6 overflow-hidden lg:grid grid-cols-12 lg:mb-24">
    <li class="w-[300px] flex-shrink-0 lg:w-full lg:col-span-3" v-for="(item, i) in comments" :key="item.content">
      <div class="p-6 bg-dark-200">
        <div class="mb-4 flex gap-2 items-center">
          <img :src="`/images/user-${i+1}.webp`" :alt="item.name" class="w-[50px] h-[50px] block flex-shrink-0" />
          <div class="flex flex-wrap items-center gap-x-2">
            <h4 class="text-dark-800 text-lg font-semibold line-clamp-1">{{ item.name }}</h4>
            <p class="text-dark-600">{{ item.date }}</p>
          </div>
        </div>
        <p class="font-sans min-h-[96px] line-clamp-4">
          {{ item.content }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const comments = ref([
  {
    name: '文化探索者',
    date: '2023.08.08',
    content: '之前去故宮看過一次這檔展覽，沒想到還有線上展可以重溫，琺瑯彩瓷的美歷經百年也不會褪色！',
  },
  {
    name: '評論達人',
    date: '2023.08.21',
    content: '第一次體驗當策展人，將自己喜歡的展品蒐羅到一起好好玩！',
  },
  {
    name: '見聞者',
    date: '2023.07.13',
    content: '最喜歡〈銅胎畫琺瑯方盤〉這件作品！淡雅的配色跟曲線的優雅活力，都讓人想一看再看呢！已經加入我的收藏清單了～～',
  },
  {
    name: '匿名藝術家',
    date: '2023.09.02',
    content: '搜尋展品很方便，看大家自己策展也很新奇呢！',
  }
])

</script>

<style lang="scss" scoped></style>
