<template>
  <swiper-container
    class="mb-10 pb-10"
    ref="swiper2"
    :space-between="16"
    :slides-per-view="1"
    :breakpoints="{
      576: { slidesPerView: 2, slidesPerGroup: 2 },
      1024: { slidesPerView: 3, slidesPerGroup: 3 },
      1280: { slidesPerView: 4, slidesPerGroup: 4 }
    }"
  >
    <swiper-slide v-for="item in relatedCollectionList" :key="item.id">
      <CollectionListItem :collection-item="item" />
    </swiper-slide>
  </swiper-container>

  <div class="absolute bottom-0 z-10 right-0 w-full h-9 text-dark">
    <div class="flex justify-between items-center">
      <ul v-if="curSlideShowed" class="flex gap-x-2">
        <li
          v-for="item in Math.ceil(slides.totalSlides / curSlideShowed)"
          :key="'slide' + item"
          class="bg-dark-400 w-3 md:w-6 h-1"
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
import { watch, onMounted, ref, computed, nextTick, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCollectionStore } from '@/stores/collectionStore'
import CollectionListItem from './CollectionListItem.vue'

const collectionStore = useCollectionStore()
const { relatedCollectionList } = storeToRefs(collectionStore)
const route = useRoute()
const swiper2 = ref(null)
const curSlideShowed = ref(1)
const slides = ref({
  totalSlides: 0,
  curSlide: 1,
  haveNext: true,
  havePrev: false,
  slideShowed: {
    default: 1,
    md: 2,
    lg: 3
  }
})

const breakpoints = ref({
  sm: 576,
  md: 1024,
  lg: 1280
})

const curSlidePage = computed(() => {
  return curSlideShowed.value === 1
    ? slides.value.curSlide
    : Math.floor(slides.value.curSlide / curSlideShowed.value) + 1
})

const goNext = () => {
  swiper2.value.swiper.slideNext()
  slides.value.curSlide += curSlideShowed.value
}
const goPrev = () => {
  swiper2.value.swiper.slidePrev()
  slides.value.curSlide -= curSlideShowed.value
}

const resetSlides = (total, showed) => {
  slides.value.curSlide = 1
  getSlide(total, showed)
}

const getSlide = (total, showed) => {
  slides.value.totalSlides = total
  slides.value.slideShowed = showed
}

const turnSlide = () => {
  slides.value.havePrev = slides.value.curSlide <= 1 ? false : true
  slides.value.haveNext =
    slides.value.curSlide >= slides.value.totalSlides - (curSlideShowed.value - 1) ? false : true
}

const changeSlidesPerView = (windowWidth) => {
  if (windowWidth < breakpoints.value?.sm) {
    curSlideShowed.value = slides.value.slideShowed.default
  } else if (windowWidth < breakpoints.value?.md) {
    curSlideShowed.value = slides.value.slideShowed.md
  } else if (windowWidth < breakpoints.value?.lg) {
    curSlideShowed.value = slides.value.slideShowed.lg
  } else {
    curSlideShowed.value = slides.value.slideShowed.xl
  }
}

watch(
  () => relatedCollectionList,
  async () => {
    if (relatedCollectionList.value?.length) {
      resetSlides(relatedCollectionList.value?.length, {
        default: 1,
        md: 2,
        lg: 3,
        xl: 4
      })
    }
    await nextTick()
    swiper2.value.swiper.update()
  },
  { immediate: true, deep: true }
)

watchEffect(() => {
  if (slides.value && route.path) {
    turnSlide()
  }
})

watchEffect(() => {
  if (window.innerWidth && swiper2.value) {
    changeSlidesPerView(window.innerWidth)
  }
})

onMounted(() => {
  changeSlidesPerView(window.innerWidth)
  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth
    changeSlidesPerView(windowWidth)
  })
})
</script>
