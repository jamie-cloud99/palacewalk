<template>
  <div class="pt-5">
    <ul class="grid grid-cols-2 mb-4">
      <li class="col-span-1" v-for="item in tabList" :key="item.title">
        <button
          type="button"
          class="btn w-full font-semibold text-lg border-b-4 border-dark-600 lg:text-xl"
          :class="{ '!border-warning': curTab.title === item.title }"
          @click="changeTab(item)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
    <div v-if="curTab.title === tabList[0].title">
      <ul v-if="favExhibitions.length" class="grid grid-cols-12 gap-4">
        <li
          class="col-span-12 md:col-span-6"
          v-for="item in favExhibitions"
          :key="item.exhibitionId"
        >
          <ExhibitionListItem :exhibition-item="item" />
        </li>
      </ul>
      <div v-else class="py-10 text-lg lg:text-2xl lg:py-3">
        <p>目前沒有收藏的展覽喔！</p>
      </div>
    </div>
    <div v-else>
      <ul v-if="favCollections.length" class="grid grid-cols-6 gap-4">
        <li
          v-for="item in favCollections"
          :key="item.collectionId"
          class="col-span-6 md:col-span-3 xl:col-span-2"
        >
          <CollectionListItem :collection-item="item" />
        </li>
      </ul>
      <div v-else class="py-10 text-lg lg:text-2xl lg:py-3">
        <p>目前沒有收藏的展品喔！</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '../stores/memberStore'
import ExhibitionListItem from '../components/exhibition/ExhibitionListItem.vue'
import CollectionListItem from '../components/collection/CollectionListItem.vue'

const memberStore = useMemberStore()
const { favCollections, favExhibitions } = storeToRefs(memberStore)

const tabList = reactive([
  {
    title: '展覽'
  },
  {
    title: '展品'
  }
])
const curTab = ref(tabList[0])

const changeTab = (tab) => {
  curTab.value = tab
}
</script>
