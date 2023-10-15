<template>
  <swiper-container
    class="overflow-hidden w-[90%] lg:w-3/5 my-10"
    :slides-per-view="1"
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
      <figure class="w-3/5  h-[210px] lg:h-[360px] bg-gradient-to-b from-dark/80 to-dark/90">
        <img
          class="w-full h-full object-contain object-center"
          :src="collection.images?.main"
          :alt="`${collection.title}-細節圖`"
        />
      </figure>
    </swiper-slide>
  </swiper-container>
  <!-- CHECK: 箭頭跑版記得修 -->
  <!-- 左箭頭 -->
  <button
    v-if="slides.havePrev"
    type="button"
    @click="goPrev"
    class="absolute top-1/2 md:top-[16%] lg:top-1/2 -translate-y-1/2 left-3 lg:left-6 -translate-x-1/2 w-10 h-10 text-dark text-2xl z-10 flex items-center justify-center"
  >
    <i class="fa-solid fa-chevron-left"></i>
  </button>
  <!-- 右箭頭 -->
  <button
    v-if="slides.haveNext"
    type="button"
    @click="goNext"
    class="absolute top-1/2 md:top-[16%] lg:top-1/2 -translate-y-1/2 right-3 lg:right-[36%] translate-x-1/2 w-10 h-10 text-dark text-2xl z-10 flex items-center justify-center"
  >
    <i class="fa-solid fa-chevron-right"></i>
  </button>
</template>

<script setup>
import { onMounted, watch, nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSlideStore } from '../../stores/slideStore'
import { useCollectionStore } from '../../stores/collectionStore'

const slideStore = useSlideStore()
const { swiperEl, slides, curSlideShowed } = storeToRefs(slideStore)
const { turnSlide, goNext, goPrev } = slideStore

const collectionStore = useCollectionStore()
const { collection } = storeToRefs(collectionStore)

const breakpoints = ref({
  md: 768
})

watch(() => slides, turnSlide, { deep:true })

const changeSlidesPerView = (windowWidth) => {
  if (windowWidth < breakpoints.value?.md) {
    curSlideShowed.value = slides.value.slideShowed.default
  } else {
    curSlideShowed.value = slides.value.slideShowed.md
  }
}

watch(
  () => collection.value.images,
  async () => {
    await nextTick()
    swiperEl.value.swiper.update()
  }
)

changeSlidesPerView(window.innerWidth)

onMounted(() => {
  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth
    changeSlidesPerView(windowWidth)
  })
})
</script>
