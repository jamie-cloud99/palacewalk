<template>
  <div class="text-center mb-12 lg:mb-16">
    <p class="mb-4 font-cormo font-semibold text-5xl lg:text-7xl text-dark-400 uppercase">
      {{ text.engTitle }}
    </p>
    <div class="relative">
      
      <h2 class="text-2xl lg:text-4xl font-bold  leading-normal">{{ text.title }}</h2>
      <span
        class="absolute -bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-[140px] h-2 bg-primary lg:w-40"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';


const props = defineProps({	
  text: {
    type: Object,
    default: () => ({})
  }
})

const  { text } = toRefs(props)


</script>

