<template>
  <div class="bg-light/50 overflow-hidden">
    <swiper-container
      id="lightgallery"
      ref="swiperEl"
      init="false"
      :slides-per-view="1"
      :draggable="true"
      :mousewheel="true"
      :keyboard="true"
    >
      <swiper-slide
        v-for="(item, index) in collectionList"
        :key="item.id"
        class="slide bg-[url('../images/home-bg-2.webp')] bg-light bg-cover relative"
        :data-src="`/images/collection/collection-${item.imgId}.jpg`"
      >
        <div class="pt-12 pb-6 px-3 md:px-10 lg:absolute top-0 left-16 text-dark">
          <p class="text-2xl lg:text-4xl font-bold mb-1 lg:text-right lg:mb-4 drop-shadow">
            {{ getZeroBaseOrder(index + 1) }}
          </p>
          <h1
            class="text-2xl lg:text-4xl font-bold drop-shadow lg:max-h-[400px] lg:[writing-mode:vertical-rl] max-w-[300px]"
          >
            {{ item.title }}
          </h1>
        </div>
        <div
          class="flex justify-center lg:items-center h-screen lg:px-40"
          :class="{
            '!justify-start': isOpen.exhibitionMenu,
            '!justify-end': isOpen.collectionText
          }"
        >
          <img
            ref="slideImage"
            class="w-auto h-3/5 md:h-4/5 lg:h-[90%] object-cover object-center shadow-lg"
            :src="`/images/collection/collection-${item.imgId}.jpg`"
            :alt="item.title"
          />
        </div>
      </swiper-slide>
    </swiper-container>

    <!-- <ul id="selector1" class="flex gap-3">
      <li
        class="item"
        v-for="item in collectionList"
        :key="item.id"
        :data-src="`/images/collection/collection-${item.imgId}.jpg`"
      >
        <img :src="`/images/collection/collection-${item.imgId}.jpg`" alt="" />
      </li>
    </ul> -->
  </div>

  <div v-if="!isOpen.collectionText" class="fixed right-6 lg:right-10 top-10 z-[800]">
    <button
      v-if="!isOpen.exhibitionMenu"
      type="button"
      @click="[toggleSideMenu('exhibitionMenu'), exhibitionMenuCount++]"
      class="btn w-12 h-12 bg-dark bg-[url('/images/exhibitions/text-bg.webp')] border border-white text-white hover:bg-black"
      :class="{ 'shadow-twinkle': !exhibitionMenuCount }"
    >
      <i class="fa-solid fa-bars"></i>
    </button>
    <button
      v-else
      type="button"
      @click="toggleSideMenu('exhibitionMenu')"
      class="btn w-12 h-12 bg-dark bg-[url('/images/exhibitions/text-bg.webp')] border border-white text-white hover:bg-black"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>

  <div
    :class="menuClass.exhibitionMenu"
    class="fixed top-0 right-0 h-screen z-[500] transition-all duration-500 overflow-hidden"
  >
    <ExhibitionMenu :collection-list="collectionList"/>
  </div>

  <div
    v-if="!isOpen.exhibitionMenu"
    class="fixed bottom-0 right-0 w-full lg:w-fit z-[1000] lg:z-[400] lg:bottom-12 lg:right-24"
  >
    <div
      class="flex items-center justify-center lg:justify-end gap-4 px-10 pt-1 pb-2 lg:pb-5 whitespace-nowrap bg-dark-200 shadow-[0_35px_60px_15px_rgba(0,0,0,0.3)] lg:rounded-full lg:shadow-inner"
    >
      <button
        type="button"
        class="btn w-20 h-15 font-bold text-2xl lg:text-8 hover:text-primary -mt-2 lg:-mt-3"
        @click="viewGallery"
      >
        <i class="fa-solid fa-magnifying-glass-plus drop-shadow-lg"></i>
        <p class="text-xs drop-shadow-sm">查看細節</p>
      </button>
      <button
        type="button"
        class="btn w-20 h-15 font-bold text-2xl lg:text-8 hover:text-primary -mt-2 lg:-mt-3 disabled:text-dark/50"
        @click="goPrev"
        :disabled="!slides.havePrev"
      >
        <i class="fa-solid fa-circle-arrow-left drop-shadow-lg"></i>
        <p class="text-xs drop-shadow-sm">上一個</p>
      </button>
      <button
        type="button"
        class="btn w-20 h-15 font-bold text-2xl lg:text-8 hover:text-primary -mt-2 lg:-mt-3 disabled:text-dark/50"
        :disabled="!slides.haveNext"
        @click="goNext"
      >
        <i class="fa-solid fa-circle-arrow-right drop-shadow-lg"></i>
        <p class="text-xs drop-shadow-sm">下一個</p>
      </button>
      <button
        type="button"
        @click="toggleSideMenu('collectionText')"
        class="btn w-20 h-15 font-bold text-2xl lg:text-8 hover:text-primary -mt-2 lg:-mt-3"
      >
        <i class="fa-solid fa-book-open drop-shadow-lg"></i>
        <p class="text-xs drop-shadow-sm">展品資訊</p>
      </button>
    </div>
  </div>

  <div
    :class="menuClass.collectionText"
    class="fixed overflow-hidden top-0 left-0 h-screen z-[300] transition-all duration-500"
  >
    <CollectionText />
  </div>

  <div
    v-if="isOpen.collectionText || isOpen.exhibitionMenu"
    class="fixed inset-0 z-[100] bg-dark/50"
  ></div>
</template>

<script setup>
import lightGallery from 'lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/statusStore.js'
import { getZeroBaseOrder } from '../composables/format'
import ExhibitionMenu from '../components/exhibition/ExhibitionMenu.vue'
import CollectionText from '../components/exhibition/CollectionText.vue'

import { register } from 'swiper/element/bundle'
register()

const statusStore = useStatusStore()
const { isOpen, menuClass, exhibitionMenuCount } = storeToRefs(statusStore)
const { toggleSideMenu } = statusStore

const swiperEl = ref(null)
const slideImage = ref(null)
const collectionList = ref([
  {
    id: '1',
    title: '清 翠玉白菜',
    imgId: 'U001'
  },
  {
    id: '2',
    title: '清 肉形石',
    imgId: 'U002'
  },
  {
    id: '3',
    title: '漢 銅熊尊',
    imgId: 'U003'
  },
  {
    id: '4',
    title: '清 乾隆 玉熊尊',
    imgId: 'U004'
  },
  {
    id: '5',
    title: '東漢 玉辟邪',
    imgId: 'U005'
  }
])

const params = {
  effect: 'creative',
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400]
    },
    next: {
      translate: ['100%', 0, 0]
    }
  }
}

const slides = ref({
  totalSlides: collectionList.value.length,
  curSlide: 1,
  haveNext: true,
  havePrev: false
})

watch(
  () => slides.value.curSlide,
  () => {
    slides.value.havePrev = slides.value.curSlide <= 1 ? false : true
    slides.value.haveNext = slides.value.curSlide >= slides.value.totalSlides ? false : true
  }
)

const goNext = () => {
  swiperEl.value.swiper.slideNext()
  slides.value.curSlide++
}

const goPrev = () => {
  swiperEl.value.swiper.slidePrev()
  slides.value.curSlide--
}

// const viewGallery = () => {
//   lightGallery(document.getElementById('selector1'), {
//     selector: '.item',
//     plugins: [lgZoom, lgThumbnail],
//     controls: true
//   })
// }

// const viewGallery = () => {
//   lightGallery(swiperEl.value.swiper.el.querySelector('.swiper-wrapper'), {
//     selector: '.slide',
//     plugins: [lgZoom, lgThumbnail],
//     controls: true
//   })
// }

onMounted(() => {
  Object.assign(swiperEl.value, params)
  swiperEl.value.initialize()
})
</script>

<style>
@import 'lightgallery/css/lightgallery.css';
@import 'lightgallery/css/lg-thumbnail.css';
@import 'lightgallery/css/lg-zoom.css';

:root {
  --dark-800: #525252;
  --dark: #121212;
}

.max-w {
  max-width: 500px;
}

.bg-radial-dark {
  background: radial-gradient(farthest-corner at 40px 200px, var(--dark-800), var(--dark));
}

.shadow-twinkle {
  box-shadow: 0 3px 2px 0 white;
  animation: twinkle 1s linear infinite both;
}

.shadow-twinkle:hover {
  animation: paused;
}

@keyframes twinkle {
  0% {
    box-shadow: 0 3px 5px 1px rgb(167, 167, 167);
  }
  100% {
    box-shadow:
      1px 1px 2px 1px rgba(230, 226, 226, 0.779),
      -1px -1px 2px 0 white;
  }
}
</style>
