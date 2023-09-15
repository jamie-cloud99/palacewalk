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
      v-for="collection in collectionList"
      :key="collection.collectionId"
      :class="{ '-translate-x-20 md:-translate-x-40': translate }"
    >
      <CollectionListItem class="w-[250px]" :collection-item="collection" :show-fav-icon="false" />
    </div>
  </Vue3Marquee>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'
import CollectionListItem from '../collection/CollectionListItem.vue';

const props = defineProps({
  translate: {
    type: Boolean,
    default: false
  },
  collectionList: Object
})

const { translate, collectionList } = toRefs(props)
const direction = computed(() => {
  return translate.value ? 'reverse' : 'normal'
})
</script>
