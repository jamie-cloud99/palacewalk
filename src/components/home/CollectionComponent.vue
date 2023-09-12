<template>
  <div class="group relative h-[300px] lg:h-[250px] text-white">
    <img
      class="object-cover object-center h-full w-full"
      :src="`/images/collection/collection-${item.collectionId}.jpg`"
      :alt="item.title"
    />
    <div class="hidden absolute inset-0 bg-dark/50 group-hover:block">
      <div class="flex flex-col justify-end h-full pb-15 px-4">
        <div class="relative mb-2">
          <h4 class="font-bold text-lg">{{ item.title }}</h4>
          <div class="absolute bottom-0 right-0 w-22 h-px bg-white"></div>
        </div>
        <h5 class="font-medium">{{ item.author }}</h5>
        <p class="self-end">{{ item.time }}</p>
      </div>
    </div>
    <div v-if="showFavorite" class="absolute top-2 right-2 text-xl z-[1]">
      <i class="fa-regular fa-heart icon-style" :id="item.collectionId"> </i>
    </div>
    <RouterLink
      class="stretched-link"
      :to="{ name: 'collectionInfo', params: { collectionId: item.collectionId } }"
    />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  item: Object,
  showFavorite: {
    type: Boolean,
    default: true
  }
})

const { item, showFavorite } = toRefs(props)
</script>
