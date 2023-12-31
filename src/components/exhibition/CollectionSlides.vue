<template>
  <swiper-container
    class="mb-10 pb-5"
    :space-between="24"
    :slides-per-view="1"
    :breakpoints="{
      768: { slidesPerView: 2, slidesPerGroup: 2 },
      1280: { slidesPerView: 3, slidesPerGroup: 3 }
    }"
    ref="swiperEl"
  >
    <swiper-slide v-for="item in exhibitionCollections" :key="item.id">
      <CollectionListItem :collection-item="item" />
    </swiper-slide>
  </swiper-container>
  <div class="absolute bottom-0 z-10 right-0 w-full h-15 text-dark">
    <div class="flex justify-between items-center">
      <ul class="flex gap-x-2">
        <li
          v-for="item in Math.ceil(slides.totalSlides / curSlideShowed)"
          :key="'slide' + item"
          class="bg-dark-400 w-6 h-1"
          :class="{ '!bg-primary': item === curSlidePage }"
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
import { storeToRefs } from 'pinia'
import { onMounted, watch, nextTick, ref } from 'vue'
import { useSlideStore } from '@/stores/slideStore'
import { useExhibitionStore } from '@/stores/exhibitsStore'
import CollectionListItem from '@/components/collection/CollectionListItem.vue'

const exhbitionStore = useExhibitionStore()
const { exhibitionCollections } = storeToRefs(exhbitionStore)

const slideStore = useSlideStore()
const { swiperEl, slides, curSlideShowed, curSlidePage } = storeToRefs(slideStore)
const { goPrev, goNext, turnSlide } = slideStore

const breakpoints = ref({
  md: 768,
  lg: 1280
})

watch(
  () => exhibitionCollections,
  async () => {
    await nextTick()
    swiperEl.value.swiper.update()
  },
  { deep: true }
)

watch(() => slides, turnSlide, { deep: true })

const changeSlidesPerView = (windowWidth) => {
  if (windowWidth < breakpoints.value?.md) {
    curSlideShowed.value = slides.value.slideShowed.default
  } else if (windowWidth < breakpoints.value?.lg) {
    curSlideShowed.value = slides.value.slideShowed.md
  } else {
    curSlideShowed.value = slides.value.slideShowed.lg
  }
}

changeSlidesPerView(window.innerWidth)

onMounted(() => {
  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth
    changeSlidesPerView(windowWidth)
  })
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
