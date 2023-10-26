<template>
  <div
    ref="modal"
    data-te-modal-init
    class="fixed left-1/2 top-1/2 z-[1055] hidden -translate-x-1/2 -translate-y-1/2 overflow-hidden"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div
      data-te-modal-dialog-ref
      class="scrollbar-hidden overflow-auto h-fit max-h-[600px] lg:h-[500px] 2xl:h-[650px] w-[calc(100vw-1.5rem)] max-w-[480px] lg:max-w-[700px] rounded-sm opacity-0 transition-all duration-300 ease-in-out"
    >
      <div class="relative rounded-sm bg-white shadow-lg">
        <div class="fixed w-full bg-white z-40">
          <div
            class="absolute z-10 top-0 w-4 h-14 lg:w-20 lg:h-20 bg-[url('../images/collection/banner-bg.jpg')] opacity-70"
          ></div>
          <div class="relative z-10 flex justify-between items-start mb-2">
            <h3 class="text-3xl lg:text-8 font-bold pt-3 pl-10 lg:pt-5 lg:pl-14">搜尋</h3>
            <button
              @click="closeModal"
              type="button"
              class="btn text-dark text-lg w-14 h-14 lg:w-20 lg:h-20 lg:text-[28px]"
              data-te-modal-dismiss
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div class="pt-14 lg:pt-20"></div>
        <div
          v-if="!isOpen.advancedSearch"
          class="flex flex-wrap items-center gap-x-4 px-4 py-3 lg:px-10 lg:pt-5"
        >
          <label for="search" class="font-medium mb-2 lg:mb-0">快速搜尋</label>
          <div class="flex flex-grow">
            <input
              id="search"
              type="text"
              v-model.trim.lazy="tempKeywords"
              class="form-input border-0 bg-dark-200 lg:w-full peer"
            />
            <button
              type="button"
              class="btn bg-dark-600 text-white peer-focus:ring-1 peer-focus:ring-dark-800 hover:bg-dark hover:border-dark"
              @click="goSearchAll(tempKeywords)"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div class="flex items-center px-4 py-3 text-dark-800 lg:px-10">
          <p v-if="!isOpen.advancedSearch">想根據分類篩選嗎？試試</p>
          <button
            type="button"
            class="btn px-2 underline hover:text-primary"
            @click="openAdvancedSearch('advancedSearch')"
          >
            <span v-if="!isOpen.advancedSearch">進階搜尋</span>
          </button>
          <button type="button" class="ml-auto" @click="openAdvancedSearch('advancedSearch')">
            <span v-if="isOpen.advancedSearch" class="hover:text-primary"
              ><i class="fa-solid fa-caret-left mr-2"></i>返回</span
            >
          </button>
        </div>
        <div v-if="isOpen.advancedSearch">
          <ul class="flex gap-x-6 px-10 text-2xl font-bold mb-2 lg:px-20">
            <li v-for="item in searchTypeList.slice(0, 2)" :key="item.id">
              <button
                type="button"
                class="btn pb-1 border-transparent border-b-4 hover:border-dark-400"
                :class="{ '!border-primary': searchType.code === item.code }"
                @click="changeSearchType(item.code)"
              >
                {{ item.title }}
              </button>
            </li>
          </ul>
          <div
            class="relative py-10 px-10 lg:px-20 bg-[url('../images/collection/banner-bg.jpg')] bg-right bg-cover"
          >
            <div class="absolute inset-0 bg-dark-200 opacity-50"></div>
            <div class="container relative z-10">
              <!-- collections -->
              <div v-if="searchType.code === 'collections'" class="flex flex-wrap -mx-3">
                <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                  <label class="form-label" for="name">品名</label>
                  <input
                    v-model="filterFields.collections.title"
                    class="bg-dark-200 w-full form-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="請輸入品名"
                  />
                </div>
                <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                  <label class="form-label" for="author">作者</label>
                  <input
                    v-model="filterFields.collections.author"
                    class="bg-dark-200 w-full form-input"
                    type="text"
                    id="author"
                    name="author"
                    placeholder="請輸入作者"
                  />
                </div>
                <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                  <label class="form-label" for="category">類別</label>
                  <select
                    v-model="filterFields.collections.categoryId"
                    class="bg-dark-200 form-select py-2"
                  >
                    <option
                      value="null"
                      disabled
                      selected
                      class="text-dark-600 aria-selected:text-dark-600"
                    >
                      請選擇類別
                    </option>
                    <option v-for="item in categoryList" :key="item.id" :value="item.id">
                      {{ item.title }}
                    </option>
                  </select>
                </div>
                <!-- <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                  <label class="form-label" for="order">排序</label>
                  <select
                    v-model="filterFields.collections.sort"
                    class="bg-dark-200 form-select py-2"
                  >
                    <option value="null" disabled selected class="text-dark-600">請選擇排序</option>
                    <option :value="SORT_ORDER.fromNewest">依照朝代(由新到舊)</option>
                    <option :value="SORT_ORDER.fromOldest">依照朝代（由舊到新）</option>
                  </select>
                </div> -->
                <div class="px-3">
                  <h3 class="form-label">朝代</h3>
                  <ul class="flex flex-wrap">
                    <li v-for="item in dynastyList" :key="item" class="flex items-center px-3 py-1">
                      <input
                        v-model="filterFields.collections.dynasties[item]"
                        type="checkbox"
                        name="dynasty"
                        :id="item"
                        class="form-checkbox"
                      />
                      <label :for="item" class="ml-2">{{ item }}</label>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- exhibitions -->
              <div v-else class="flex flex-wrap -mx-3">
                <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                  <label class="form-label" for="name">展名</label>
                  <input
                    v-model="filterFields.exhibitions.title"
                    class="bg-dark-200 form-select py-2"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="請輸入展名"
                  />
                </div>
                <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                  <label class="form-label" for="order">排序</label>
                  <select
                    v-model="filterFields.exhibitions.sort"
                    class="block bg-dark-200 form-select py-2"
                    data-te-select-init
                  >
                    <option value="null" selected disabled>請選擇排序</option>
                    <option :value="SORT_ORDER.fromNewest">依照日期(由新到舊)</option>
                    <option :value="SORT_ORDER.fromOldest">依照日期（由舊到新）</option>
                  </select>
                </div>
                <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                  <label class="form-label" for="category">類別</label>
                  <select
                    id="category"
                    v-model="filterFields.exhibitions.categoryId"
                    class="block bg-dark-200 form-select py-2"
                    data-te-select-init
                  >
                    <option value="null" selected disabled>請選擇類別</option>
                    <option
                      v-for="item in exhibitionCategories"
                      :key="item.code"
                      :value="item.code"
                    >
                      {{ item.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-x-4 py-6">
            <button
              @click="closeModal"
              type="button"
              class="btn w-24 border border-dark hover:bg-dark hover:text-white"
              data-te-modal-dismiss
            >
              取消
            </button>
            <button
              @click="goSearch(filterFields)"
              type="button"
              class="btn w-24 bg-primary text-white hover:bg-dark"
            >
              <span>搜尋</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal, initTE } from 'tw-elements'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useStatusStore } from '@/stores/statusStore'
import { useExhibitionStore } from '@/stores/exhibitsStore'
import { useCollectionStore } from '@/stores/collectionStore'
import { SORT_ORDER } from '@/utils/constant/sort'
const modal = ref(null)
const curModal = ref(null)
const statusStore = useStatusStore()
const { searchType, searchTypeList, isOpen } = storeToRefs(statusStore)
const { changeSearchType, toggleMenu, addSearchNum } = statusStore

const exhibitionStore = useExhibitionStore()
const { filterExhibitions, searchExhibitions, exhibitionCategories } = exhibitionStore

const collectionStore = useCollectionStore()
const { categoryList, dynastyList } = storeToRefs(collectionStore)
const { filterCollections, fetchCategoryList, searchCollections } = collectionStore

const filterFields = ref({
  exhibitions: {
    sort: null,
    categoryId: null
  },
  collections: {
    categoryId: null,
    sort: null,
    dynasties: {}
  }
})

const tempKeywords = ref('')

const router = useRouter()

defineExpose({
  curModal
})

const closeModal = () => {
  curModal.value.hide()
}

initTE({ Modal })

const openAdvancedSearch = (item) => {
  if (searchType.value?.code === 'all') {
    changeSearchType('exhibitions')
  }
  toggleMenu(item)
}

const clearSearchRecord = async () => {
  localStorage.removeItem('searchedCollectionIds')
  localStorage.removeItem('searchedExhibitionIds')
}

const goSearchAll = async (keywords) => {
  changeSearchType('all')
  addSearchNum()
  clearSearchRecord()
  await Promise.all([searchExhibitions(keywords), searchCollections(keywords)])
  await closeModal()
  router.push({ path: '/search' })
}

const goSearch = async (fields) => {
  addSearchNum()
  clearSearchRecord()
  if (searchType.value.code === 'collections') {
    await filterCollections(fields.collections)
  } else {
    await filterExhibitions(fields.exhibitions)
  }

  closeModal()
  router.push({ path: '/search' })
}

fetchCategoryList()

onMounted(() => {
  isOpen.value.advancedSearch = false
  curModal.value = new Modal(modal.value)
})
</script>

<style scoped>
.bg-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../images/collection/banner-bg.jpg');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.4;
}
.form-label {
  @apply block font-bold text-xl lg:text-2xl mb-2;
}
</style>
