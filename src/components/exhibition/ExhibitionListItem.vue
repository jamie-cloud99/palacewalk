<template>
  <li v-for="(item, index) in exhibitList" :key="item.id"
    class="w-[300px] flex-shrink-0 md:w-[336px] xs:w-[100%] col-span-6 lg:w-full relative overflow-hidden ">
    <div class="absolute top-2 right-2 text-xl z-[1]" @click="addClass(index)">
      <i 
        class="fa-regular fa-heart icon-style" 
        v-if="isActive !== index">
      </i>
      <i class="fa-solid fa-heart icon-style" v-else></i>
    </div>
    <router-link to="exhibitionIntro" class="ease-in-out duration-300 relative">
      <img :src="`images/exhibitions/exhibition-${item.exhibitionId}.jpg`"
        class="w-full ease-in-out duration-300 hover:scale-110 ">
      <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
        <h3 class="font-semibold text-xl line-clamp-1 mb-1">{{ item.title }}</h3>
        <p class="font-medium">{{ item.startDate }} - {{ item.endDate }}</p>
      </div>
    </router-link>
  </li>
</template>

<script setup>
import { ref,toRefs } from 'vue'

const props = defineProps({
  exhibitList: Array
})

const isActive = ref('')

const addClass = (id) => {
  isActive.value = isActive.value === id ? '' : id
}

const { exhibitList } = toRefs(props)
</script>
<style>
.icon-style{
  @apply text-white hover:text-primary ease-in-out duration-300;
}
</style>