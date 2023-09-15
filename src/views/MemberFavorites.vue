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
    <ul v-if="curTab.title === tabList[0].title" class="flex flex-wrap lg:grid grid-cols-12 gap-6">
      <ExhibitionListItem :exhibit-list="favExhibitions" />
    </ul>
    <ul v-else class="grid grid-cols-6 gap-4">
      <li
        v-for="item in favCollections"
        :key="item.collectionId"
        class="col-span-6 md:col-span-3 xl:col-span-2"
      >
        <CollectionListItem :collection-item="item" />
      </li>
    </ul>
  </div>
  <div class="flex py-15">
    <PageComponent :pages="pages" @change="turnPage" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '../stores/memberStore'
import PageComponent from '../components/layout/PageComponent.vue'
import ExhibitionListItem from '../components/exhibition/ExhibitionListItem.vue'
import CollectionListItem from '../components/collection/CollectionListItem.vue'

const memberStore = useMemberStore()
const { pages, favCollections, favExhibitions } = storeToRefs(memberStore)
const { turnPage } = memberStore

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
