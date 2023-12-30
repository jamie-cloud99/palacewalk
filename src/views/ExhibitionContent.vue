<template>
  <div class="relative z-[2000]">
    <img class="w-full" :src="exhibition?.images?.lg" :alt="exhibition.title" />
  </div>
  <div class="bg-light/50 overflow-hidden">
    <swiper-container
      ref="swiperEl"
      init="false"
      :slides-per-view="1"
      :draggable="false"
      :mousewheel="false"
      :keyboard="true"
    >
      <swiper-slide
        v-for="(item, index) in exhibitionCollections"
        :key="item.id"
        class="slide bg-[url('../images/home-bg-2.webp')] bg-light bg-cover relative"
        :data-src="item.images?.main"
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
        <div class="flex justify-center lg:items-center h-screen lg:px-40">
          <img
            ref="slideImage"
            class="w-auto h-3/5 md:h-4/5 lg:h-[90%] object-cover object-center shadow-lg"
            :src="item.images?.main"
            :alt="item.title"
          />
        </div>
      </swiper-slide>
    </swiper-container>
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
    <ExhibitionMenu :collection-list="exhibitionCollections" @change-item="goIndexItem" />
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
    <CollectionText :collection="curCollection" />
  </div>

  <div
    v-if="isOpen.collectionText || isOpen.exhibitionMenu"
    class="fixed inset-0 z-[100] bg-dark/50"
  ></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSlideStore } from '../stores/slideStore'
import { useStatusStore } from '../stores/statusStore.js'
import { getZeroBaseOrder } from '../composables/format'
import { useExhibitionStore } from '../stores/exhibitsStore'
import ExhibitionMenu from '../components/exhibition/ExhibitionMenu.vue'
import CollectionText from '../components/exhibition/CollectionText.vue'

const statusStore = useStatusStore()
const { isOpen, menuClass, exhibitionMenuCount } = storeToRefs(statusStore)
const { toggleSideMenu } = statusStore

const exhibitsStore = useExhibitionStore()
const { exhibitionCollections, exhibition } = storeToRefs(exhibitsStore)
const { fetchExhibition } = exhibitsStore

const slideStore = useSlideStore()
const { swiperEl, slides } = storeToRefs(slideStore)
const { goSlideNum } = slideStore

const slideImage = ref(null)

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

const curCollection = ref({})

watch(
  () => slides.value.curSlide,
  () => {
    const { curSlide, totalSlides } = slides.value
    slides.value.havePrev = curSlide <= 1 ? false : true
    slides.value.haveNext = curSlide >= totalSlides ? false : true
    curCollection.value.index = curSlide - 1
    curCollection.value = exhibitionCollections.value?.length
      ? { ...exhibitionCollections.value[curSlide - 1], index: curCollection.value.index }
      : { index: 0 }
  },
  { immediate: true }
)

const goNext = () => {
  swiperEl.value.swiper.slideNext()
  slides.value.curSlide++
}

const goPrev = () => {
  swiperEl.value.swiper.slidePrev()
  slides.value.curSlide--
}

const goIndexItem = (num) => {
  toggleSideMenu('exhibitionMenu')
  goSlideNum(num)
}

const route = useRoute()

watch(
  () => route.params.exhibitionId,
  async () => {
    const id = route.params.exhibitionId

    await fetchExhibition(id)
    slides.value.totalSlides = exhibitionCollections.value.length

    const { curSlide } = slides.value
    curCollection.value = exhibitionCollections.value?.length
      ? { ...exhibitionCollections.value[curSlide - 1], index: curCollection.value.index }
      : { index: 0 }
  },
  { immediate: true }
)

onMounted(() => {
  Object.assign(swiperEl.value, params)
  swiperEl.value.initialize()
})
</script>

<style>
:root {
  --dark-800: #525252;
  --dark: #121212;
}

.max-w {
  max-width: 500px;
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
