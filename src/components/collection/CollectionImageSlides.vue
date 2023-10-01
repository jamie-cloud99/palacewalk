<template>
  <div v-if="item.images">
    <swiper-container
      class="overflow-hidden"
      :space-between="16"
      :slides-per-view="1"
      :breakpoints="{ 768: { slidesPerView: 2 } }"
      ref="swiperEl"
      init="false"
    >
      <swiper-slide v-for="image in item.images.list" :key="image" class="md:w-1/2">
        <figure class="w-full h-[210px] lg:h-[360px] ">
          <img
            class="w-full h-full object-cover object-center"
            :src="image"
            :alt="`${item.title}-細節圖`"
          />
        </figure>
      </swiper-slide>
      <swiper-slide  class="md:w-1/2">
        <figure class="w-full h-[210px] lg:h-[360px] bg-gradient-to-b from-dark/80 to-dark/90">
          <img
            class="w-full h-full object-contain object-center"
            :src="item.images.main"
            :alt="`${item.title}-細節圖`"
          />
        </figure>
      </swiper-slide>
    </swiper-container>
  </div>

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
import { ref, toRefs, onMounted, watch } from 'vue'
import { useSlideStore } from '../../stores/slideStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  item: Object
})
const { item } = toRefs(props)
const slideStore = useSlideStore()
const { swiperEl, slides, curSlideShowed } = storeToRefs(slideStore)
const { getSlide, turnSlide, goNext, goPrev } = slideStore
const totalImages = ref(1)

watch(
  () => item?.value?.images,
  () => {
    totalImages.value = item.value.images.list.length
    getSlide(totalImages.value, {
      default: 1,
      md: 2
    })
    turnSlide()
  },
  { deep: true }
)

watch(() => slides.value.curSlide, turnSlide, {immediate: true})
watch(
  () => slides.value.totalSlides,
  () => {
    if (slides.value.totalSlides <= curSlideShowed.value) {
      // slides.value.haveNext = false
      slides.value.havePrev = false
    }
  },
  { immediate: true}
)

watch(()=> swiperEl, () => {
  console.log(swiperEl.value)
  if(swiperEl.value) swiperEl.value.initialize()
}, {immediate: true, deep:true})

const changeSlidesPerView = () => {
  if (window.innerWidth < 768) {
    curSlideShowed.value = slides.value.slideShowed.default
  } else {
    curSlideShowed.value = slides.value.slideShowed.md
  }
}

onMounted(() => {
  if(item?.value.title) {
    console.log(item.value)
    swiperEl.value.initialize()
  }
  window.addEventListener('resize', () => changeSlidesPerView())
})
</script>
