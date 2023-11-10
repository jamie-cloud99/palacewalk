import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSlideStore = defineStore('slide', () => {
  const swiperEl = ref(null)
  const curSlideShowed = ref(1)
  const slides = ref({
    totalSlides: 4,
    curSlide: 1,
    haveNext: true,
    havePrev: false,
    slideShowed: {
      default: 1,
      md: 2,
      lg: 3
    }
  })

  const curSlidePage = computed(() => {
    return curSlideShowed.value === 1
      ? slides.value.curSlide
      : Math.floor(slides.value.curSlide / curSlideShowed.value) + 1
  })

  const goNext = () => {
    swiperEl.value.swiper.slideNext()
    slides.value.curSlide += curSlideShowed.value
  }
  const goPrev = () => {
    swiperEl.value.swiper.slidePrev()
    slides.value.curSlide -= curSlideShowed.value
  }

  const getSlide = (total, showed) => {
    slides.value.totalSlides = total
    slides.value.slideShowed = showed
  }

  const turnSlide = () => {
    slides.value.havePrev = slides.value.curSlide > 1
    slides.value.haveNext =
      slides.value.curSlide < slides.value.totalSlides - (curSlideShowed.value - 1)
  }

  const goSlideNum = (index) => {
    swiperEl.value.swiper.slideTo(index)
    slides.value.curSlide = index + 1
  }

  const resetSlides = (total, showed) => {
    slides.value.curSlide = 1,
    getSlide(total, showed)
  }

  return {
    swiperEl,
    slides,
    curSlideShowed,
    curSlidePage,
    goNext,
    goPrev,
    getSlide,
    turnSlide,
    goSlideNum,
    resetSlides
  }
})
