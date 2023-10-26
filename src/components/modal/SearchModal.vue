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
      class="scrollbar-hidden overflow-auto h-[580px] w-[calc(100vw-1.5rem)] max-w-[480px] lg:max-w-[700px] rounded-sm opacity-0 transition-all duration-300 ease-in-out"
    >
      <div class="relative rounded-sm bg-white shadow-lg">
        <div
          class="absolute z-10 top-0 w-20 h-20 bg-[url('../images/collection/banner-bg.jpg')] opacity-90"
        ></div>
        <div class="relative z-10 flex justify-between items-start mb-2">
          <h3 class="text-8 font-bold pt-5 px-14">快速搜尋</h3>
          <button
            @click="closeModal"
            type="button"
            class="btn bg-dark text-white w-20 h-20 text-[28px]"
            data-te-modal-dismiss
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <ul class="flex items-start gap-x-6 px-10 text-2xl font-bold mb-8 lg:px-20 lg:mb-10">
          <li v-for="item in searchTypeList" :key="item.id">
            <button
              type="button"
              class="btn pb-1 border-transparent border-b-4 hover:border-dark-400"
              :class="{ ' !border-primary ': searchType.code === item.code }"
              @click="changeSearchType(item.code)"
            >
              {{ item.title }}
            </button>
          </li>

        </ul>

        <div
          class="relative py-10 px-10 lg:px-20 bg-[url('../images/collection/banner-bg.jpg')] bg-right bg-cover"
        >
          <!-- CHECK: 待修 -->
          <LoadingComponent/>
          <div class="absolute inset-0 bg-dark-200 opacity-50">
          </div>
          <div class="container relative z-10">
            <!-- 展品 -->
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
                <label class="form-label" for="category">分類</label>
                <select
                  v-model="filterFields.collections.categoryId"
                  class="bg-dark-200 form-select py-2"
                >
                  <option value="null" disabled selected class="text-dark-600 aria-selected:text-dark-600">請選擇分類</option>
                  <option v-for="item in categoryList" :key="item.id" :value="item.id" class="">
                    {{ item.title }}
                  </option>
                </select>
              </div>
              <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                <label class="form-label" for="order">排序</label>
                <select
                  v-model="filterFields.collections.sort"
                  class="bg-dark-200 form-select py-2"
                >
                  <option value="" disabled selected class="text-dark-600">請選擇排序</option>
                  <option value="1">依照朝代(由新到舊)</option>
                  <option value="2">依照朝代（由舊到新）</option>
                </select>
              </div>
              <div class="w-3/4 px-3">
                <h3 class="form-label">朝代</h3>
              </div>
              <div class="w-full px-3">
                <input
                  @change="handleChange"
                  class="w-full cursor-pointer accent-warning"
                  list="tickmarks"
                  value="50"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                />
                <span class="inline-block p-1 bg-[#D9D9D9]" v-text="yearly"></span>
                <datalist id="tickmarks">
                  <option value="0"></option>
                  <option value="5"></option>
                  <option value="10"></option>
                  <option value="15"></option>
                  <option value="20"></option>
                  <option value="25"></option>
                  <option value="30"></option>
                  <option value="35"></option>
                  <option value="40"></option>
                  <option value="45"></option>
                  <option value="50"></option>
                  <option value="55"></option>
                  <option value="60"></option>
                  <option value="65"></option>
                  <option value="70"></option>
                  <option value="75"></option>
                  <option value="80"></option>
                  <option value="85"></option>
                  <option value="90"></option>
                  <option value="95"></option>
                  <option value="100"></option>
                </datalist>
              </div>
            </div>
            <!-- 展覽 -->
            <div v-else class="flex flex-wrap -mx-3">
              <div class="w-full lg:w-1/2 px-3 mb-4 lg:mb-6">
                <label class="form-label" for="name">展名</label>
                <input
                  v-model="filterFields.exhibitions.title"
                  class="bg-dark-200 w-full"
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
                  class="block bg-dark-200 w-full"
                  data-te-select-init
                >
                  <option :value="null">請選擇</option>
                  <option :value="SORT_ORDER.fromNewest">依照日期(由新到舊)</option>
                  <option :value="SORT_ORDER.fromOldest">依照日期（由舊到新）</option>
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
</template>

<script setup>
import { Modal, initTE } from 'tw-elements'
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useStatusStore } from '../../stores/statusStore'
import { useExhibitionStore } from '../../stores/exhibitsStore'
import { useCollectionStore } from '../../stores/collectionStore'
import { SORT_ORDER } from '@/utils/constant/sort'
import LoadingComponent from '@/components/layout/LoadingComponent.vue'

const modal = ref(null)
const curModal = ref(null)
const statusStore = useStatusStore()
const { searchType, searchTypeList } = storeToRefs(statusStore)
const { changeSearchType } = statusStore

const exhibitionStore = useExhibitionStore()
const { filterExhibitions } = exhibitionStore

const collectionStore = useCollectionStore()
const { categoryList } = storeToRefs(collectionStore)
const { filterCollections, fetchCategoryList } = collectionStore

const filterFields = ref({
  exhibitions: {},
  collections: {
    categoryId: null
  }
})

const router = useRouter()

defineExpose({
  curModal
})

const closeModal = () => {
  curModal.value.hide()
}

initTE({ Modal })

const goSearch = async (fields) => {
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
  curModal.value = new Modal(modal.value)
})

let dynastyList = reactive([
  '新石器時代',
  '新石器時代晚期',
  '商',
  '西周',
  '春秋',
  '戰國',
  '秦',
  '西漢',
  '新莽',
  '東漢',
  '魏晉南北朝',
  '隋',
  '唐',
  '五代',
  '宋',
  '遼',
  '金',
  '元',
  '明',
  '清',
  '民國'
])

const generateDynastyMap = (list) => {
  const dynastyMap = {}
  list.forEach((dynasty, i) => {
    dynastyMap[i * 5] = dynasty
  })
  return dynastyMap
}

const dynastyMap = generateDynastyMap(dynastyList)
const yearly = ref('魏晉南北朝')

const handleChange = (val) => {
  const selectedYear = dynastyMap[val.target.value]
  if (selectedYear !== undefined) {
    yearly.value = selectedYear
  }
}
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
  @apply block font-bold text-xl lg:text-2xl mb-2 lg:mb-4;
}
</style>
