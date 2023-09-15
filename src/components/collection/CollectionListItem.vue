<template>
  <div class="group relative h-[300px] lg:h-[250px] text-white">
    <img
      class="object-cover object-center h-full w-full"
      :src="`/images/collection/collection-${collectionItem.collectionId}.jpg`"
      :alt="collectionItem.title"
    />
    <div class="absolute inset-0 bg-dark/50 hover-style">
      <div class="flex flex-col justify-end h-full pb-15 px-4">
        <div class="flex flex-nowrap items-center justify-between mb-2">
          <h4 class="font-bold text-lg">{{ collectionItem.title }}</h4>
          <div class="w-22 h-px bg-white"></div>
        </div>
        <div class="flex items-center justify-between">
          <h5 class="font-medium">{{ collectionItem.author }}</h5>
          <p class="self-end">{{ collectionItem.time }}</p>
        </div>
      </div>
    </div>
    <!-- * saveFavorites 第一個參數之後打 api 應該會改成傳 id，暫時先傳整個物件 -->
    <button
      v-if="showFavIcon"
      @click="saveFavorites(collectionItem, 'collection')"
      type="button"
      class="absolute top-2 right-2 text-xl z-[1] hover:text-primary"
    >
      <i
        :id="collectionItem.collectionId"
        class="fa-regular fa-heart icon-style"
        :class="{ 'fa-solid': showFavorite }"
      >
      </i>
    </button>
    <RouterLink
      class="stretched-link"
      :to="{ name: 'collectionInfo', params: { collectionId: collectionItem.collectionId } }"
    />
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '../../stores/memberStore'

const memberStore = useMemberStore()
const { saveFavorites } = memberStore
const { favCollections } = storeToRefs(memberStore)

const props = defineProps({
  collectionItem: Object,
  showFavIcon: {
    type: Boolean,
    default: true
  }
})
const { collectionItem, showFavIcon } = toRefs(props)

const showFavorite = computed(() => {
  return favCollections.value.some(
    (item) => item.collectionId === collectionItem.value.collectionId
  )
})
</script>

<style scoped>
.hover-style {
  @apply opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out;
}
</style>
