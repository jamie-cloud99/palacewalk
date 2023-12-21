<template>
  <div class="mx-3 mb-20 lg:mb-24 xl:ms-[18%] lg:ms-[24%] md:ms-[30%] relative overflow-hidden">
    <swiper-container :grabCursor="true" :slidesPerView="'auto'" :slides-per-view="1"
      :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow' }"
      :pagination="{ clickable: true, el: '.comment-pagination' }" :space-between="20" :breakpoints="{
        768: { slidesPerView: 2, spaceBetween: 20 },
        1280: { slidesPerView: 4, spaceBetween: 20 }
      }" ref="swiperEl">
      <swiper-slide class="flex-shrink-0 sm:max-w-4/5" v-for="(item, i) in comments" :key="item.content">
        <div class="p-6 bg-slate-100 border border-slate-00 mx-auto">
          <div class="mb-4 flex gap-2 items-center">
            <img :src="`/images/user-${i + 1}.webp`" :alt="item.name" class="w-[50px] h-[50px] block flex-shrink-0" />
            <h4 class="text-dark-800 text-lg font-semibold line-clamp-1">{{ item.name }}</h4>
          </div>
          <p class="min-h-[96px] line-clamp-4 mb-2">
            {{ item.content }}
          </p>
          <p class="text-right text-dark-600">{{ item.date }}</p>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
  <div class="left-auto right-24 lg:left-24 prevArrow arrow">
    <i class="fa-solid fa-chevron-left"></i>
  </div>
  <div class="left-auto right-10 lg:left-40 nextArrow arrow">
    <i class="fa-solid fa-chevron-right"></i>
  </div>
  <div class="comment-pagination relative left-1/2 md:left-24 -translate-x-2/4 md:translate-x-0 top-auto bottom-12 md:bottom-24 flex justify-start w-[120px]"></div>
</template>

<script setup>
import { ref } from 'vue'
import { Navigation, Pagination } from 'swiper/modules'

const swiperEl = document.querySelector('swiper-container');

const params = {
  modules: [Navigation, Pagination],
  injectStylesUrls: [
    'path/to/navigation-element.min.css',
    'path/to/pagination-element.min.css',
  ],
};

Object.assign(swiperEl, params);

swiperEl.initialize();

const comments = ref([
  {
    name: '文化探索者',
    date: '2023.08.08',
    content:
      '之前去故宮看過一次這檔展覽，沒想到還有線上展可以重溫，琺瑯彩瓷的美歷經百年也不會褪色！'
  },
  {
    name: '評論達人',
    date: '2023.08.21',
    content: '第一次體驗當策展人，將自己喜歡的展品蒐羅到一起好好玩！'
  },
  {
    name: '見聞者',
    date: '2023.07.13',
    content:
      '最喜歡〈銅胎畫琺瑯方盤〉這件作品！淡雅的配色跟曲線的優雅活力，都讓人想一看再看呢！已經加入我的收藏清單了～～'
  },
  {
    name: '匿名藝術家',
    date: '2023.09.02',
    content: '搜尋展品很方便，看大家自己策展也很新奇呢！'
  },
  {
    name: '王牌藝術家',
    date: '2023.09.10',
    content: '我很喜歡可以線上策展的功能！每個人都可以讓大家看到自己的策展精華觀點！'
  }
])
</script>

<style>
swiper-container::part(container) {
  overflow: initial;
}

.arrow {
  @apply absolute top-16 md:top-12 lg:top-[calc(50%+24px)] lg:right-auto flex justify-center items-center drop-shadow text-black font-bold bg-white w-[48px] h-[48px] rounded-full z-10 hover:bg-slate-200 hover:transition;
}

.arrow.swiper-button-disabled {
  opacity: 0.3;
}

.comment-pagination .swiper-pagination-bullet {
  @apply bg-slate-300 block w-6 h-1 mr-2;
}

.comment-pagination .swiper-pagination-bullet-active {
  @apply bg-primary
}
</style>
