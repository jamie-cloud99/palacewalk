<template>
  <div class="group relative h-[300px] lg:h-[250px] text-white">
    <img
      class="object-cover object-center h-full w-full"
      :src="`/images/collection/collection-${collectionItem.collectionId}.jpg`"
      :alt="collectionItem.title"
    />
    <div class="hidden absolute inset-0 bg-dark/50 group-hover:block">
      <div class="flex flex-col justify-end h-full pb-15 px-4">
        <div class="flex flex-nowrap items-center justify-between mb-2">
          <h4 class="font-bold text-lg">{{ collectionItem.title }}</h4>
          <div class="w-22 h-px bg-white"></div>
        </div>
        <div class="flex items-center justify-between">
          <h5 class="font-medium">{{ collectionItem.author }}</h5>
          <p class="">{{ collectionItem.time }}</p>
        </div>
      </div>
    </div>

    <!-- * saveFavorites 第一個參數之後打 api 應該會改成傳 id，暫時先傳整個物件 -->
    <button
      v-if="showFavorite"
      type="button"
      class="absolute top-0 right-0 p-2 text-xl z-[1] group-hover:text-primary"
      :class="{
        '!fa-solid': favCollections.find(
          (item) => item.collectionId === collectionItem.collectionId
        )
      }"
      @click="saveFavorites(collectionItem, 'collection')"
    >
      <i
        class="fa-regular fa-heart icon-style"
        :id="collectionItem.collectionId"
        :class="{
          'fa-solid': favCollections.find(
            (item) => item.collectionId === collectionItem.collectionId
          )
        }"
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
import { toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '../stores/memberStore'

const memberStore = useMemberStore()
const { saveFavorites } = memberStore
const { favCollections } = storeToRefs(memberStore)

const props = defineProps({
  collectionItem: Object,
  showFavorite: {
    type: Boolean,
    default: true
  }
})

const { collectionItem, showFavorite } = toRefs(props)
</script>
