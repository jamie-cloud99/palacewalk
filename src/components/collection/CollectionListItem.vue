<template>
  <div class="group relative h-[300px] lg:h-[250px] text-white">
    <img
      class="object-cover object-center h-full w-full"
      :src="`/images/collection/collection-${collectionItem.collectionId}.jpg`"
      :alt="collectionItem.title"
    />
    <div class="absolute inset-0 bg-dark/50 hover-style">
      <div class="flex flex-col justify-end h-full pb-15 px-4">
        <div class="relative mb-2 hover-style">
          <h4 class="font-bold text-lg">{{ collectionItem.title }}</h4>
          <div class="absolute bottom-0 right-0 w-22 h-px bg-white"></div>
        </div>
        <h5 class="font-medium hover-style">{{ collectionItem.author }}</h5>
        <p class="self-end hover-style">{{ collectionItem.time }}</p>
      </div>
    </div>
    <div class="absolute top-2 right-2 text-xl z-[1] hover-style">
      <i
      class="fa-regular fa-heart icon-style cursor-pointer"
      @click="showFavorite(collectionItem)"
      :class="{ 'fa-solid': collectionItem.isActive }"></i>
    </div>
    <RouterLink
      class="stretched-link"
      :to="{ name: 'collectionInfo', params: { collectionId: collectionItem.collectionId } }"
    />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  collectionItem: Object,
})
const { collectionItem }  = toRefs(props)

const showFavorite = (item) => {
  item.isActive = !item.isActive
}
</script>

<style scoped>
.hover-style {
  @apply opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-1000 group-hover:ease-in-out;
}
</style>