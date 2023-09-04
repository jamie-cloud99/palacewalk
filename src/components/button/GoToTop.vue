<template>
  <button
    ref="goToTopBtn"
    class="fixed hidden bottom-20 right-6 lg:right-10 btn bg-dark-200 z-[100] hover:text-white lg:hover:bg-primary">
    <i class="fa-solid fa-chevron-up"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const goToTopBtn = ref(null)
const scrollPosition = ref(0)

const scrollFunction = () => {
  scrollPosition.value = window.scrollY
  scrollPosition.value > 100 ?
  goToTopBtn.value.classList.remove('hidden') : goToTopBtn.value.classList.add('hidden')
};
const backToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
};

onMounted(() => {
  window.addEventListener('scroll', scrollFunction)
  goToTopBtn.value.addEventListener('click', backToTop)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollFunction)
  goToTopBtn.value.removeEventListener('click', backToTop)
})
</script>
