<template>
  <swiper-container
    class="overflow-hidden w-full"
    :modules="[Thumbs]"
    :thumbs="{ swiper: thumbsSwiper }"
    thumbs-swiper=".my-thumbs"
    ref="swiperEl"
    >
    <swiper-slide v-for="image in collection.images?.list" :key="image">
      <figure class="w-full h-[210px] lg:h-[415px]">
        <img
          class="w-full h-full object-cover object-center"
          :src="image"
          :alt="`${collection.title}-細節圖`"
        />
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="w-full h-[210px] lg:h-[415px] bg-gradient-to-b from-dark/80 to-dark/90">
        <img
          class="w-full h-full object-contain object-center"
          :src="collection.images?.main"
          :alt="`${collection.title}-細節圖`"
        />
      </figure>
    </swiper-slide>
  </swiper-container>
  <swiper-container
    class="my-thumbs overflow-hidden w-[90%] lg:w-full my-10 h-1/2 cursor-pointer"
    @swiper="setThumbsSwiper"
    :slides-per-view="3"
    :spaceBetween="10"
    :modules="[Thumbs]"
    :freeMode="true"
    watch-slides-progress
  >
    <swiper-slide v-for="image in collection.images?.list" :key="image">
      <figure class="w-full h-[100px]">
        <img
          class="w-full h-full object-cover object-center"
          :src="image"
          :alt="`${collection.title}-細節圖`"
        />
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="w-full h-[100px] bg-gradient-to-b from-dark/80 to-dark/90">
        <img
          class="w-full h-full object-contain object-center"
          :src="collection.images?.main"
          :alt="`${collection.title}-細節圖`"
        />
      </figure>
    </swiper-slide>
  </swiper-container>
  <!-- 左箭頭 -->
  <button
    v-if="slides.havePrev"
    type="button"
    @click="goPrev"
    class="absolute top-[30%] md:top-[15%] lg:top-[35%] -translate-y-1/2 left-6 -translate-x-1/2 w-10 h-10 text-dark text-2xl z-10 flex items-center justify-center"  >
    <i class="fa-solid fa-chevron-left"></i>
  </button>
  <!-- 右箭頭 -->
  <button
    v-if="slides.haveNext"
    type="button"
    @click="goNext"
    class="absolute top-[30%] md:top-[15%] lg:top-[35%] -translate-y-1/2 right-6 lg:right-[51%] translate-x-1/2 w-10 h-10 text-dark text-2xl z-10 flex items-center justify-center"    >
    <i class="fa-solid fa-chevron-right"></i>
  </button>

</template>

<script setup>
import { watch, nextTick, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Thumbs } from 'swiper/modules';
import { useSlideStore } from '@/stores/slideStore'
import { useCollectionStore } from '@/stores/collectionStore'

const slideStore = useSlideStore()
const { swiperEl, slides } = storeToRefs(slideStore)
const { turnSlide, goNext, goPrev } = slideStore

const collectionStore = useCollectionStore()
const { collection } = storeToRefs(collectionStore)

// const breakpoints = ref({
//   md: 768
// })

const route = useRoute()

watchEffect(() => {
  if (slides.value && route.path) {
    turnSlide()
  }
})

watch(
  () => collection.value.images,
  async () => {
    await nextTick()
    swiperEl.value.swiper.update()
  }
)
// 手機和電腦版顯示無差異，所以先註解
// const changeSlidesPerView = (windowWidth) => {
//   if (windowWidth < breakpoints.value?.md) {
//     curSlideShowed.value = slides.value.slideShowed.default
//   } else {
//     curSlideShowed.value = slides.value.slideShowed.md
//   }
// }

// onMounted(() => {
//   changeSlidesPerView(window.innerWidth)
//   window.addEventListener('resize', () => {
//     const windowWidth = window.innerWidth
//     changeSlidesPerView(windowWidth)
//   })
// })

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}
</script>
