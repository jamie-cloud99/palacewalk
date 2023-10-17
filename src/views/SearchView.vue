<template>
  <div class="mb-6 lg:mb-[68px]">
    <div class="container py-10">
      <div class="mb-6 lg:mb-10">
        <div class="sm:flex space-y-3 sm:space-y-0 justify-between items-center">
          <BreadcrumbsComponent class="sm:order-3" :nav-list="breadList" />
          <div class="relative">
            <span class="absolute w-3 h-10 bg-primary"></span>
            <h2 class="text-3xl font-serif font-bold ps-5">搜尋結果</h2>
          </div>
        </div>
      </div>

      <ul v-if="searchResult.collections" class="grid grid-cols-12 gap-4">
        <li
          v-for="item in searchResult.collections"
          :key="item.collectionId"
          class="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <CollectionListItem :collection-item="item" />
        </li>
      </ul>
      <ul v-if="searchResult.exhibitions" class="grid grid-cols-12 gap-4">
        <li
          v-for="item in exhibitionsFiltered"
          :key="item.exhibitionId"
          class="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <ExhibitionListItem :exhibition-item="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/statusStore'
import { useCollectionStore } from '@/stores/collectionStore'
import { useExhibitionStore } from '@/stores/exhibitsStore'
import BreadcrumbsComponent from '@/components/layout/BreadcrumbsComponent.vue'
import CollectionListItem from '@/components/collection/CollectionListItem.vue'
import ExhibitionListItem from '@/components/exhibition/ExhibitionListItem.vue'

const breadList = ref([
  {
    title: '首頁',
    path: '/'
  },
  {
    title: '搜尋結果',
    path: '/search'
  }
])

const searchResult = ref({})

const collectionStore = useCollectionStore()
const { collectionsFiltered } = storeToRefs(collectionStore)

const exhibitionStore = useExhibitionStore()
const { exhibitionsFiltered } = storeToRefs(exhibitionStore)

const statusStore = useStatusStore()
const { searchType } = storeToRefs(statusStore)

const updateSearchResult = () => {
  if(searchType.value.code === 'exhibitions') {
    if(!searchResult.value?.exhibitions?.length && exhibitionsFiltered.value.length) {
       searchResult.value.exhibitions = exhibitionsFiltered.value
       searchResult.value.collections = []
    }
  } else {
     if (!searchResult.value?.collections?.length && collectionsFiltered.value.length) {
    searchResult.value.collections = collectionsFiltered.value
    searchResult.value.exhibitions = []
  }
  }
 
}

updateSearchResult()
</script>

<style scoped></style>
