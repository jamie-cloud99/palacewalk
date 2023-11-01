<template>
  <div class="group relative text-white overflow-hidden">
    <button
      type="button"
      class="absolute top-0 right-0 p-2 text-xl z-[1] hover:text-primary"
      @click="updateFavorites(exhibitionItem.id, 'exhibitions')"
    >
      <i class="fa-regular fa-heart" :class="{ 'fa-solid': showFavorite }"> </i>
    </button>
    <img
      :src="exhibitionItem.images.sm"
      class="w-full aspect-[4/3] object-cover transition-all ease-in-out duration-300 group-hover:scale-110"
    />
    <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
      <h3 class="font-semibold text-xl line-clamp-1 mb-1">{{ exhibitionItem.title }}</h3>
      <p class="font-medium">{{ usePeriod(exhibitionItem.startDate, exhibitionItem.endDate)}}</p>
    </div>

    <RouterLink
      class="stretched-link"
      :to="{ name: 'exhibitionIntro', params: { exhibitionId: exhibitionItem.id } }"
    />
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '../../stores/memberStore'
import { usePeriod } from '../../composables/format';

const props = defineProps({
  exhibitionItem: Object
})
const { exhibitionItem } = toRefs(props)

const memberStore = useMemberStore()
const { updateFavorites } = memberStore
const { favExhibitions } = storeToRefs(memberStore)

const showFavorite = computed(() => {
  return favExhibitions.value.some(
    (item) => item.exhibitionId === exhibitionItem.value.exhibitionId
  )
})
</script>
