<template>
  <CollectionBanner :title="'展品目錄'" />
  <!-- TODO: router-view, other category(except painting) layout -->
  <div class="container">
    <div class="lg:grid grid-cols-12 gap-6">
      <!-- Left Side -->
      <div class="col-span-3">
        <div class="text-lg font-semibold">
          <p class="flex flex-col border-b border-dark">
            展品類別
            <span class="font-cormo text-2xl">CATEGORY</span>
          </p>
          <div class="mb-6 lg:mb-20">
            <SideMenu
              :menu="categoryList"
              :selected-option="curCategory"
              :show-num="true"
              @select-item="selectCategory"
            />
          </div>
        </div>
      </div>
      <!-- Right Side -->
      <div class="col-span-9">
        <ul class="grid grid-cols-12 gap-4">
          <li
            v-for="item in collectionList"
            :key="item.collectionId"
            class="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <CollectionListItem :collection-item="item" />
          </li>
        </ul>
        <div class="flex py-10 lg:py-15">
          <PageComponent :pages="pages" @change="selectPage" />
        </div>
      </div>
    </div>
  </div>
  <BackgroundComponent />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCollectionStore } from '../stores/collectionStore'
import { usePageStore } from '../stores/pageStore'
import SideMenu from '../components/layout/SideMenu.vue'
import CollectionBanner from '../components/collection/CollectionBanner.vue'
import PageComponent from '../components/layout/PageComponent.vue'
import CollectionListItem from '../components/collection/CollectionListItem.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'
import { watch } from 'vue'

const collectionStore = useCollectionStore()
const pageStore = usePageStore()
const { collectionList, categoryList, curCategory, route } = storeToRefs(collectionStore)
const { fetchPageCollections, fetchCategoryList, selectCategory } = collectionStore
const { pages } = storeToRefs(pageStore)
const { turnPage } = pageStore

const router = useRouter()

const selectPage = (page) => {
  turnPage(page)
  fetchPageCollections(curCategory.value, page)
  router.push({ path: '/collections', query: { category: curCategory.value.title, page } })
}

const updateCurCategory = () => {
  const categoryTitle = route.value?.query?.category

  if (categoryTitle) {
    curCategory.value = categoryList.value.find((category) => category.title === categoryTitle)
  }
}

watch(
  () => route.value?.query,
  async () => {
    if(categoryList.value.length <= 1) await fetchCategoryList()
    await updateCurCategory()
    const queryPage = route.value?.query.page
    if (queryPage) {
      turnPage(Number(queryPage))
    }
    await fetchPageCollections(curCategory.value.id, pages.value.curPage)
  },
  { immediate: true }
)
</script>
