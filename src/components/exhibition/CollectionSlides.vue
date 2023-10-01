<template>
  <swiper-container
    class="mb-10 pb-5"
    :space-between="24"
    :slides-per-view="1"
    :breakpoints="{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }"
    ref="swiperEl"
  >
    <swiper-slide>
      <figure class="exhibit-item">
        <img
          class="w-full h-full object-cover object-centers"
          :src="`/images/exhibitions/exhibition-U009.jpg`"
          alt="U009"
        />
        <figcaption class="exhibit-item-title">
          清 雍正 銅胎畫琺瑯黑地五彩流雲玉兔秋香鼻煙壺
        </figcaption>
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="exhibit-item">
        <img
          class="w-full h-full object-cover object-center"
          :src="`/images/exhibitions/exhibition-U010.jpg`"
          alt="U010"
        />
        <figcaption class="exhibit-item-title">
          清 雍正 白色料鼻煙壺 帶銅胎畫琺瑯黑地夔龍紋套匣
        </figcaption>
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="exhibit-item">
        <img
          class="w-full h-full object-cover object-center"
          :src="`/images/exhibitions/exhibition-U011.jpg`"
          alt="U011"
        />
        <figcaption class="exhibit-item-title">
          清 乾隆 金屬胎掐絲琺瑯與畫琺瑯西洋人物雙耳鼻煙壺
        </figcaption>
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="exhibit-item">
        <img
          class="w-full h-full object-cover object-center"
          :src="`/images/exhibitions/exhibition-U003.jpg`"
          alt="U004"
        />
        <figcaption class="exhibit-item-title">明 唐寅採蓮圖</figcaption>
      </figure>
    </swiper-slide>
  </swiper-container>
  <div class="absolute bottom-0 z-10 right-0 w-full h-15 text-dark">
    <div class="flex justify-between items-center">
      <ul class="flex gap-x-2">
        <li
          v-for="item in slides.totalSlides - curSlideShowed + 1"
          :key="'slide' + item"
          class="bg-dark-400 w-6 h-1"
          :class="{ '!bg-primary': item === slides.curSlide }"
        ></li>
      </ul>
      <div class="flex gap-x-2">
        <button
          type="button"
          class="btn text-primary disabled:text-dark-400 py-1 px-2.5 rounded text-xl"
          @click="goPrev"
          :class="{ 'hover:bg-dark-200': slides.havePrev }"
          :disabled="!slides.havePrev"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button
          type="button"
          class="btn text-primary disabled:text-dark-400 py-1 px-2.5 rounded text-xl"
          @click="goNext"
          :class="{ 'hover:bg-dark-200': slides.haveNext }"
          :disabled="!slides.haveNext"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useSlideStore } from '@/stores/slideStore'
import { storeToRefs } from 'pinia'

import { useExhibitionStore } from '@/stores/exhibitsStore'
import { useRouterStore } from '@/stores/routerStore'

const exhbitionStore = useExhibitionStore()

const routerStore = useRouterStore()
const { exhibitionId } = storeToRefs(routerStore)

const slideStore = useSlideStore()
const { swiperEl, slides, curSlideShowed } = storeToRefs(slideStore)
const { goPrev, goNext, getSlide, turnSlide } = slideStore



// totolSlides, rwdSlidePerView
getSlide(4, {
  default: 1,
  md: 2,
  lg: 3
})

watch(() => slides.value.curSlide, turnSlide)

const changeSlidesPerView = () => {
  if (window.innerWidth < 768) {
      curSlideShowed.value = slides.value.slideShowed.default
    } else if (window.innerWidth < 1280) {
      curSlideShowed.value = slides.value.slideShowed.md
    } else {
      curSlideShowed.value = slides.value.slideShowed.lg
    }
}

onMounted(() => {
  window.addEventListener('resize', () => changeSlidesPerView())
})
</script>

<style scoped>
.exhibit-item {
  @apply w-full h-[300px] lg:h-[306px] relative;
}

.exhibit-item-title {
  @apply font-bold bg-amber-400 px-2 inline-block absolute left-0 bottom-2;
}
</style>
