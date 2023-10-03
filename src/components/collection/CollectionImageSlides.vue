<template>
  <swiper-container
    class="overflow-hidden"
    :space-between="16"
    :slides-per-view="1"
    :breakpoints="{ 768: { slidesPerView: 2 } }"
    ref="swiperEl"
  >
    <swiper-slide v-for="image in collection.images?.list" :key="image">
      <figure class="w-full h-[210px] lg:h-[360px]">
        <img
          class="w-full h-full object-cover object-center"
          :src="image"
          :alt="`${collection.title}-細節圖`"
        />
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="w-full h-[210px] lg:h-[360px] bg-gradient-to-b from-dark/80 to-dark/90">
        <img
          class="w-full h-full object-contain object-center"
          :src="collection.images?.main"
          :alt="`${collection.title}-細節圖`"
        />
      </figure>
    </swiper-slide>
  </swiper-container>

  <button
    v-if="slides.havePrev"
    type="button"
    @click="goPrev"
    class="absolute top-1/2 -translate-y-1/2 left-4 lg:left-6 -translate-x-1/2 w-10 h-10 text-dark text-2xl z-10 flex items-center justify-center"
  >
    <i class="fa-solid fa-chevron-left"></i>
  </button>

  <button
    v-if="slides.haveNext"
    type="button"
    @click="goNext"
    class="absolute top-1/2 -translate-y-1/2 right-4 lg:right-6 translate-x-1/2 w-10 h-10 text-dark text-2xl z-10 flex items-center justify-center"
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

watch(() => slides.value.curSlide, turnSlide, { immediate: true })

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

onMounted(() => {
  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth
    changeSlidesPerView(windowWidth)
  })
})
</script>
