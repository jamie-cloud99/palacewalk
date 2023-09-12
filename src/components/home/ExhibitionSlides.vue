<template>
  <swiper-container
    :slides-per-view="1"
    :space-between="24"
    :breakpoints="{ 1024: { slidesPerView: 2 } }"
    ref="swiperEl"
    class=""
  >
    <swiper-slide
      class="max-w-[300px] flex-shrink-0 md:max-w-[480px] lg:max-w-full relative"
      v-for="item in exhibitionList"
      :key="item.id"
    >
      <div class="group overflow-hidden w-full h-[210px] lg:h-[385px] mb-3 lg:mb-4">
        <img
          :src="`/images/exhibitions/exhibition-${item.imgId}.jpg`"
          class="w-full h-full group-hover:scale-110 transition-all duration-300"
        />
        <a href="#" class="stretched-link"></a>
      </div>
      <div class="flex gap-2 items-start">
        <div class="w-4 h-4 bg-primary mt-3 flex-shrink-0"></div>
        <div class="space-y-1">
          <h3 class="text-dark-800 text-2xl font-semibold line-clamp-1">
            {{ item.title }}
          </h3>
          <p class="text-dark-600">
            <time>{{ item.startDate }}</time> - <time>{{ item.endDate }}</time>
          </p>
        </div>
      </div>
    </swiper-slide>
    <div slot="container-end" class="absolute left-0 right-0 top-1/2 h-15 -translate-y-1/2 z-50">
      <button
        type="button"
        @click="goPrev"
        class="btn-prev btn-shadow btn hidden bg-white w-15 h-15 rounded-full disabled:opacity-50 hover:text-primary lg:block"
        :disabled="!slides.havePrev"
      >
        <i class="fa-solid fa-arrow-left align-middle leading-normal"></i>
      </button>
      <button
        type="button"
        @click="goNext"
        class="btn-next btn-shadow btn hidden bg-white w-15 h-15 rounded-full disabled:opacity-50 hover:text-primary lg:block"
        :disabled="!slides.haveNext"
      >
        <i class="fa-solid fa-arrow-right align-middle"></i>
      </button>
    </div>
  </swiper-container>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'
import { register } from 'swiper/element/bundle'

register()

const props = defineProps({
  exhibitionList: Array
})

const { exhibitionList } = toRefs(props)
const swiperEl = ref(null)

const slides = ref({
  totalSlides: exhibitionList.value.length,
  curSlide: 1,
  haveNext: true,
  havePrev: false
})

watch(
  () => slides.value.curSlide,
  () => {
    slides.value.havePrev = slides.value.curSlide <= 1 ? false : true
    slides.value.haveNext = slides.value.curSlide >= slides.value.totalSlides - 1 ? false : true
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
</script>

<style scoped>
swiper-container::part(container) {
  overflow: initial;
}

@media (min-width: 1024px) {
  swiper-container::part(container) {
    overflow: hidden;
  }
}

.btn-shadow {
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.3),
    0 1px 2px -1px rgba(0, 0, 0, 0.3);
}

swiper-container::part(wrapper),
swiper-container::part(container) {
  position: static;
}

.btn-prev {
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  left: -30px;
}

.btn-next {
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  right: -30px;
}
</style>
