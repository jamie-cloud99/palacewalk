<template>
  <div class="container pt-6 lg:pt-12">
    <div class="md:flex justify-between items-center space-y-3 md:space-y-0 lg:mb-1">
      <BreadcrumbsComponent :nav-list="breadList" class="-ml-2 order-2" />
      <h2 class="font-bold text-2xl lg:text-8 order-1">我的展覽</h2>
    </div>
    <h3 class="mb-4 text-lg font-semibold lg:mb-6 lg:text-xl">故宮走走，讓你也能成為策展大師</h3>
    <p class="border-t-2 border-dark py-2 md:py-3 lg:text-lg">
      利用故宮的珍貴展品，結合你的獨特視角，打造屬於自己的展覽。翻閱千年文物，選擇你心儀的藝術品，並按照自己的喜好、主題或故事串聯起來，營造出一場獨一無二的展覽體驗。
    </p>
    <div class="flex justify-center border-b-2 border-dark py-2 md:hidden mb-4 lg:mb-6">
      <RouterLink to="/curating/new" class="btn w-full bg-black text-white order-2">新增展覽</RouterLink>
    </div>
    <div class="md:flex justify-between mb-6 lg:mb-8">
      <RouterLink to="/curating/new" class="hidden btn bg-black text-white order-2 px-6 md:block">
        新增展覽
      </RouterLink>
      <ul class="flex divide-x divide-dark-600">
        <li v-for="item in statusList" :key="item.code" class="flex-grow">
          <div v-if="item.subType" class="relative">
            <button
              type="button"
              class="peer btn w-full whitespace-nowrap bg-dark-400 hover:bg-dark-800 hover:text-white lg:w-32"
            >
              {{ item.title }}
              <i class="fa-solid fa-caret-down ml-3"></i>
            </button>
            <ul
              class="hidden absolute z-10 top-10 border border-dark divide-y divide-dark peer-hover:block hover:block"
            >
              <li v-for="subItem in item.subType" :key="subItem.code">
                <button
                  type="button"
                  class="btn w-32 whitespace-nowrap bg-dark-200 hover:bg-dark-800 hover:text-white"
                  @click="toggleStatus(subItem)"
                  :class="{ '!bg-dark-800 text-white': curStatus.code === subItem.code }"
                >
                  {{ subItem.title }}
                </button>
              </li>
            </ul>
          </div>
          <button
            v-else
            type="button"
            class="btn w-full whitespace-nowrap bg-dark-400 hover:bg-dark-800 hover:text-white lg:px-10"
            @click="toggleStatus(item)"
            :class="{ '!bg-dark-800 text-white': curStatus.code === item.code }"
          >
            {{ item.title }}
          </button>
        </li>
      </ul>
    </div>

    <ul class="space-y-4 lg:space-y-6">
      <li
        v-for="item in curatingList"
        :key="item.id"
        class="lg:grid grid-cols-2 gap-x-6 shadow-[0_2px_10px_2px_rgba(0,0,0,0.10)]"
      >
        <div class="col-span-1">
          <div class="relative">
            <img
              :src="`/images/curating/curating-${item.imgId}.jpg`"
              alt=""
              class="object-cover object-center w-full h-[200px] lg:h-[230px]"
            />
            <div class="absolute top-5 left-2">
              <div class="btn w-32 border-dark border-2 rounded-full bg-white font-bold">
                {{ getStatus(item.status) }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex flex-col justify-between py-6 px-4 lg:pl-0 lg:pr-6 h-full">
            <div class="mb-6">
              <h4 class="text-2xl font-bold mb-2 text-warning-600">{{ item.title }}</h4>
              <p class="text-dark-800">
                <time class="mr-1">{{ item.startDate }}</time
                >-<time class="ml-1">{{ item.endDate }}</time>
              </p>
            </div>
            <div v-if="item.status === 'released'" class="flex gap-x-5">
              <RouterLink
                to="/curating/2/messages"
                class="btn px-6 border border-dark hover:bg-dark hover:text-white"
              >
                查看留言
              </RouterLink>
              <RouterLink to="/exhibitions/2" class="btn px-6 text-white bg-primary hover:bg-dark">
                前往展覽
              </RouterLink>
            </div>
            <div v-else class="flex gap-x-5">
              <button
                type="button"
                class="btn px-6 border border-dark hover:border-primary hover:text-primary"
                :class="{
                  'bg-dark text-white hover:bg-primary hover:!text-white':
                    item.status === 'underReview' || item.status === 'prepared'
                }"
              >
                預覽
              </button>
              <button
                type="button"
                class="btn px-6 text-white bg-dark hover:bg-primary disabled:border disabled:border-dark-600 disabled:text-dark-600 disabled:bg-white"
                :disabled="item.status === 'underReview' || item.status === 'prepared'"
              >
                編輯
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="flex py-10 lg:py-15">
      <PageComponent :pages="pages" @change="turnPage" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import PageComponent from '../components/layout/PageComponent.vue'

const pages = ref({
  totalPages: 3,
  curPage: 1,
  havePre: false,
  haveNext: true
})

const turnPage = (page) => {
  pages.value.curPage = page
  pages.value.havePre = page > 1
  pages.value.haveNext = page < pages.value.totalPages
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const breadList = reactive([
  {
    title: '首頁',
    path: '/'
  },
  {
    title: '策展專區',
    path: '/curating'
  },
  {
    title: '我的展覽',
    path: '/curating'
  }
])

const statusList = ref([
  {
    code: 'M1-all',
    title: '全部'
  },
  {
    code: 'M3-released',
    status: 'released',
    title: '已上架'
  },
  {
    code: 'M2-unreleased',
    title: '未上架',
    subType: [
      {
        code: 'S1-draft',
        status: 'draft',
        title: '草稿'
      },
      {
        code: 'S2-underReview',
        status: 'underReview',
        title: '審核中'
      },
      {
        code: 'S3-prepared',
        status: 'prepared',
        title: '即將上線'
      },
      {
        code: 'S4-rejected',
        status: 'rejected',
        title: '退回'
      }
    ]
  },
  {
    code: 'M4-expired',
    status: 'expired',
    title: '已下架'
  }
])

const curStatus = ref({
  code: 'M1-all',
  title: '全部'
})

const curatingList = ref([
  {
    id: '1',
    title: '風格故事—琺瑯彩瓷特展',
    startDate: '2023.07.07',
    endDate: '2024.07.16',
    status: 'released',
    imgId: 'U001'
  },
  {
    id: '2',
    title: '光影錯金—銅鍍金畫琺瑯懷錶展',
    startDate: '2023.10.07',
    endDate: '2024.10.16',
    status: 'draft',
    imgId: 'U002'
  },
  {
    id: '3',
    title: '文脈縱深—故宮歷史與藝術之旅',
    startDate: '2023.9.27',
    endDate: '2024.5.16',
    status: 'prepared',
    imgId: 'U003'
  },
  {
    id: '4',
    title: '乾隆皇的奇珍古玩：多寶格特展',
    startDate: '2023.11.15',
    endDate: '2024.12.16',
    status: 'underReview',
    imgId: 'U004'
  },
  {
    id: '5',
    title: '文字瑰寶—藏滿大藏經特展',
    startDate: '2023.08.07',
    endDate: '2024.6.30',
    status: 'rejected',
    imgId: 'U005'
  }
])

const getStatus = (status) => {
  switch (status) {
    case 'released':
      return '已上架'
    case 'draft':
      return '草稿'
    case 'underReview':
      return '審核中'
    case 'prepared':
      return '即將上線'
    case 'rejected':
      return '退回'
    case 'expired':
      return '已下架'
  }
}

const toggleStatus = (status) => {
  curStatus.value = status
}
</script>
