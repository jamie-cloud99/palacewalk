<template>
  <div class="mb-6 lg:mb-[68px]">
    <div class="container py-10 min-h-[calc(100vh-250px)]">
      <div class="mb-6 lg:mb-10">
        <div class="sm:flex space-y-3 sm:space-y-0 justify-between items-center">
          <BreadcrumbsComponent class="sm:order-3" :nav-list="breadList" />
          <div class="relative">
            <span class="absolute w-3 h-10 bg-primary"></span>
            <h2 class="text-3xl font-serif font-bold ps-5">搜尋結果</h2>
          </div>
        </div>
      </div>

      <div class="space-y-5 lg:space-y-10">
        <div v-if="searchResult.exhibitions?.length" class="relative">
          <p
            class="absolute -top-3 left-3 text-4xl xl:-top-10 xl:text-9xl italic font-cormo font-semibold whitespace-nowrap text-warning/30"
          >
            EXHIBITIONS
            <span class="font-serif text-2xl xl:text-8xl"
              >({{ searchResult.exhibitions?.length }})</span
            >
          </p>
          <ul class="grid grid-cols-12 gap-4 py-28">
            <li
              v-for="item in searchResult.exhibitions"
              :key="item.exhibitionId"
              class="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <ExhibitionListItem :exhibition-item="item" />
            </li>
          </ul>
        </div>
        <div v-if="searchResult.collections?.length" class="relative">
          <p
            class="absolute -top-3 right-3 text-4xl xl:-top-10 xl:text-9xl italic font-cormo font-semibold whitespace-nowrap text-primary/30"
          >
            COLLECTIONS
            <span class="font-serif text-2xl xl:text-8xl"
              >({{ searchResult.collections?.length }})</span
            >
          </p>
          <ul class="grid grid-cols-12 gap-4 py-28">
            <li
              v-for="item in searchResult.collections"
              :key="item.collectionId"
              class="col-span-12 md:col-span-4 lg:col-span-3"
            >
              <CollectionListItem :collection-item="item" />
            </li>
          </ul>
        </div>
      </div>
      <div v-if="!searchResult.collections?.length && !searchResult.exhibitions?.length">
        <p class="text-xl lg:text-8 pt-10 pb-2 font-semibold">沒有符合您搜尋的展覽或展品</p>
        <p class="text-dark-600">請嘗試使用其他關鍵字搜尋</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
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
const { fetchCollectionsRecord } = collectionStore

const exhibitionStore = useExhibitionStore()
const { exhibitionsFiltered } = storeToRefs(exhibitionStore)
const { fetchExhibitionsRecord } = exhibitionStore

const statusStore = useStatusStore()
const { searchType, hasSearchRecord, searchNum } = storeToRefs(statusStore)

const updateSearchResult = () => {
  const { exhibitions: hasExhibitions, collections: hasCollections } = hasSearchRecord.value
  const { code: searchTypeCode } = searchType.value || {}

  if (!hasExhibitions && !hasCollections) {
    searchResult.value.collections = []
    searchResult.value.exhibitions = []
    return
  }

  if (searchTypeCode === 'all' || (hasExhibitions && hasCollections)) {
    searchResult.value.exhibitions = exhibitionsFiltered.value
    searchResult.value.collections = collectionsFiltered.value
  } else if (searchTypeCode === 'exhibitions' && hasExhibitions) {
    searchResult.value.exhibitions = exhibitionsFiltered.value
    searchResult.value.collections = []
  } else if (searchTypeCode === 'collections' || hasCollections) {
    searchResult.value.collections = collectionsFiltered.value
    searchResult.value.exhibitions = []
  }
}

watchEffect(() => {
  if (exhibitionsFiltered.value && collectionsFiltered.value) {
    updateSearchResult()
  }
})

watch(
  () => searchNum,
  () => {
    fetchCollectionsRecord()
    fetchExhibitionsRecord()
  },
  { deep: true, immediate: true }
)
</script>
