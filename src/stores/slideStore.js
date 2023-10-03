import { ref } from 'vue'
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

  const goNext = () => {
    swiperEl.value.swiper.slideNext()
    slides.value.curSlide++
  }
  const goPrev = () => {
    swiperEl.value.swiper.slidePrev()
    slides.value.curSlide--
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

  return { swiperEl, slides, curSlideShowed, goNext, goPrev, getSlide, turnSlide }
})
