<template>
  <CollectionBanner :title="'精選展品'" :bread-list="breadList"/>
  <div class="container">
    <div class="counter flex lg:flex-row flex-col flex-wrap -mx-3 items-start">
      <div
        class="relative flex flex-wrap w-full h-full lg:w-1/2 px-3 mb-[26px]"
        v-for="item in collectionsFiltered"
        :key="item.id"
      >
        <h3 class="master-title w-full mb-4 pl-8 bg-dark-800 text-white font-bold text-2xl">
          {{ item.title }}
        </h3>
        <figure class="w-full md:w-1/2 h-[345px]">
          <img
            class="w-full h-full object-cover object-center"
            :src="item.images?.main"
            :alt="item.title"
          />
        </figure>
        <div class="bg-dark-200 p-3 w-full md:w-1/2 md:h-[345px]">
          <div v-html="item.description" class="line-clamp-[10] description"></div>
        </div>
        <router-link
          class="w-full xl:absolute xl:w-[148px] right-3 bottom-0 py-3 btn bg-primary text-white hover:bg-black"
          :to="{ name: 'collectionInfo', params: { collectionId: item.id } }"
        >
          查看展品
        </router-link>
      </div>
    </div>
  </div>
  <div class="flex py-10 lg:py-15"></div>
  <BackgroundComponent />
</template>
<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectionStore } from '../stores/collectionStore'
import CollectionBanner from '../components/collection/CollectionBanner.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'

const collectionStore = useCollectionStore()
const { masterpieceIds, collectionsFiltered } = storeToRefs(collectionStore)
const { filterCollectionsByIds } = collectionStore

const breadList = reactive([
  {
    title: '首頁',
    path: '/'
  },
  {
    title: '藝術展品',
    path: '/collections'
  },
  {
    title: "精選展品",
    path: '/collections/masterpieces'
  }
])

filterCollectionsByIds(masterpieceIds.value)
</script>

<style>
.counter {
  counter-reset: listNum;
}
.master-title::before {
  counter-increment: listNum;
  content: '0' counter(listNum) '. ';
}

.description {
  @apply space-y-2;
}
</style>
