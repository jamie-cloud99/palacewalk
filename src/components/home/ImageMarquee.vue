<template>
  <Vue3Marquee
    :clone="true"
    :gradient="true"
    :gradient-color="[255, 255, 255]"
    gradient-length="10%"
    :direction="direction"
    :duration="50"
    :pause-on-hover="true"
  >
    <div
      class="relative"
      v-for="i in 5"
      :key="'i' + i"
      :class="{ '-translate-x-20 md:-translate-x-40': translate }"
    >
      <img class="w-[250px] flex-shrink-0 mx-1" src="https://fakeimg.pl/250" />
    </div>
  </Vue3Marquee>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'

const props = defineProps({
  translate: {
    type: Boolean,
    default: false
  }
})

const { translate } = toRefs(props)
const direction = computed(() => {
  return translate.value ? 'reverse' : 'normal'
})
</script>
