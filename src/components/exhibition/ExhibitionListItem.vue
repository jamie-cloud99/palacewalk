<template>
  <div class="group relative text-white overflow-hidden">
<<<<<<< HEAD
    <button
      type="button"
      class="absolute top-0 right-0 p-2 text-xl z-[1] hover:text-primary"
      @click="saveFavorites(exhibitionItem, 'exhibition')"
    >
      <i class="fa-regular fa-heart" :class="{ 'fa-solid': showFavorite }"> </i>
    </button>
    <img
      :src="`/images/exhibitions/exhibition-${exhibitionItem.exhibitionId}.jpg`"
      class="w-full h-[250px] xl:h-[320px] object-cover transition-all ease-in-out duration-300 group-hover:scale-110"
    />
=======
    <button type="button" class="absolute top-0 right-0 p-2 text-xl z-[1] group-hover:text-primary"
      @click="saveFavorites(exhibitionItem, 'exhibition')">
      <i class="fa-regular fa-heart" :class="{ 'fa-solid': showFavorite }"> </i>
    </button>
    <img :src="`/images/exhibitions/exhibition-${exhibitionItem.exhibitionId}.jpg`"
      class="w-full object-cover transition-all ease-in-out duration-300 group-hover:scale-110" />
>>>>>>> 5ae4881bf0fcb4034cb4f50fad687f286b990e4e
    <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
      <h3 class="font-semibold text-xl line-clamp-1 mb-1">{{ exhibitionItem.title }}</h3>
      <p class="font-medium">{{ exhibitionItem.startDate }} - {{ exhibitionItem.endDate }}</p>
    </div>

<<<<<<< HEAD
    <RouterLink
      class="stretched-link"
      :to="{ name: 'exhibitionIntro', params: { exhibitionId: exhibitionItem.exhibitionId } }"
    />
=======
    <RouterLink class="stretched-link"
      :to="{ name: 'exhibitionIntro', params: { exhibitionId: exhibitionItem.exhibitionId } }" />
>>>>>>> 5ae4881bf0fcb4034cb4f50fad687f286b990e4e
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '../../stores/memberStore'

const props = defineProps({
  exhibitionItem: Object
})
const { exhibitionItem } = toRefs(props)

const memberStore = useMemberStore()
const { saveFavorites } = memberStore
const { favExhibitions } = storeToRefs(memberStore)

const showFavorite = computed(() => {
  return favExhibitions.value.some(
    (item) => item.exhibitionId === exhibitionItem.value.exhibitionId
  )
})
</script>
