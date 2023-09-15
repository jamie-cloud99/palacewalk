<template>
  <swiper-container
    class="mb-10"
    :space-between="24"
    :slides-per-view="1"
    :breakpoints="{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }"
    ref="swiperEl"
  >
    <swiper-slide>
      <figure class="exhibit-item">
        <img
          class="w-full h-full object-cover object-centers"
          :src="`/images/exhibitions/exhibition-U006.jpg`"
          alt="U006"
        />
        <figcaption class="exhibit-item-title">明 永樂 青花人物紋如意耳扁壺</figcaption>
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="exhibit-item">
        <img
          class="w-full h-full object-cover object-center"
          :src="`/images/exhibitions/exhibition-U007.jpg`"
          alt="U007"
        />
        <figcaption class="exhibit-item-title">北宋 汝窯 青瓷蓮花式溫碗</figcaption>
      </figure>
    </swiper-slide>
    <swiper-slide>
      <figure class="exhibit-item">
        <img
          class="w-full h-full object-cover object-center"
          :src="`/images/exhibitions/exhibition-U008.jpg`"
          alt="U008"
        />
        <figcaption class="exhibit-item-title">清 翠玉白菜</figcaption>
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
import { onMounted, watch, ref } from 'vue'
import { useSlideStore } from '../../stores/slideStore'
import { storeToRefs } from 'pinia'

const slideStore = useSlideStore()
const { swiperEl, slides } = storeToRefs(slideStore)
const { goPrev, goNext, getSlide } = slideStore
const curSlideShowed = ref(1)

// totolSlides, rwdSlidePerView
getSlide(4, {
  default: 1,
  md: 2,
  lg: 3
})

watch(
  () => slides.value.curSlide,
  () => {
    slides.value.havePrev = slides.value.curSlide <= 1 ? false : true
    slides.value.haveNext =
      slides.value.curSlide >= slides.value.totalSlides - (curSlideShowed.value - 1) ? false : true
  }
)

onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      curSlideShowed.value = slides.value.slideShowed.default
    } else if (window.innerWidth < 1280) {
      curSlideShowed.value = slides.value.slideShowed.md
    } else {
      curSlideShowed.value = slides.value.slideShowed.lg
    }
  })
})
</script>

<style>
.exhibit-item {
  @apply w-full h-[300px] lg:h-[306px] relative;
}
.exhibit-item-title {
  @apply font-bold bg-amber-400 px-2 inline-block absolute left-0 bottom-2;
}
</style>
