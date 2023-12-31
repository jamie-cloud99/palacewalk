<template>
  <div class="container pt-6 lg:pt-12">
    <div class="md:flex justify-between items-center space-y-3 md:space-y-0 mb-6 lg:mb-10">
      <BreadcrumbsComponent :nav-list="breadList" class="-ml-2 order-2" />
      <h2 class="font-bold text-2xl lg:text-8 order-1">新增展覽</h2>
    </div>
    <div class="flex justify-between mb-6 lg:mb-10">
      <div class="flex gap-3">
        <button
          type="button"
          class="btn px-6 border border-primary text-primary hover:border-dark hover:text-dark"
        >
          儲存草稿
        </button>
        <button
          type="button"
          class="btn px-6 border border-dark hover:border-primary hover:text-primary"
        >
          取消編輯
        </button>
      </div>
      <button type="button" class="btn px-6 bg-dark text-white hover:bg-primary">預覽</button>
    </div>

    <div class="border border-dashed border-dark-600 py-12 lg:py-20 text-center mb-6 lg:mb-10">
      <p class="text-dark-600 font-semibold text-lg mb-6 lg:mb-10 lg:text-2xl">請上傳展覽封面</p>
      <button type="button" class="btn inline-block px-6 bg-dark text-white hover:bg-primary">
        上傳圖片
      </button>
    </div>

    <form action="submit">
      <div class="mb-4 lg:mb-6 items-center space-y-2 md:flex md:space-y-0">
        <label for="title" class="inline-block mr-2 font-bold flex-shrink-0">展覽名稱：</label>
        <input id="title" type="text" class="form-input w-full border-dark-400 bg-dark-200" />
      </div>
      <div class="mb-4 lg:mb-6 items-center space-y-2 md:flex md:space-y-0">
        <label class="inline-block mr-2 font-bold flex-shrink-0">展覽時間：</label>
        <div class="flex items-center">
          <input
            id="startDate"
            type="text"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            class="form-input border-dark-400 bg-dark-200 w-40"
            placeholder="請填入開始時間"
          />
          <p class="mx-2">—</p>
          <input
            id="endDate"
            type="text"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            class="form-input border-dark-400 bg-dark-200 w-40"
            placeholder="請填入結束時間"
          />
        </div>
      </div>
      <div class="mb-4 lg:mb-6 items-center space-y-2">
        <label for="disciption" class="inline-block mr-2 font-bold flex-shrink-0">展覽概述：</label>
        <input id="disciption" type="text" class="form-input w-full border-dark-400 bg-dark-200" />
      </div>
      <div class="mb-4 lg:mb-6 items-center space-y-2">
        <label for="content" class="block mr-2 font-bold flex-shrink-0">展覽亮點：</label>
        <input id="content" type="text" class="form-input w-full border-dark-400 bg-dark-200" />
      </div>

      <div class="mb-4 lg:mb-6 items-center space-y-2">
        <label for="collections" class="inline-block mr-2 font-bold flex-shrink-0">展品：</label>
        <div class="border border-dashed border-dark-600 py-12 lg:py-20 text-center">
          <p class="text-dark-600 font-semibold text-lg mb-6 lg:mb-10 lg:text-2xl">
            請從下方拖曳展品至此
          </p>
          <!-- <button type="button" class="btn inline-block px-6 bg-dark text-white hover:bg-primary">
            預覽
          </button> -->
        </div>
      </div>
    </form>

    <div class="mb-4 lg:mb-8 items-center space-y-2">
      <div class="lg:flex justify-between items-center space-y-2 lg:space-y-0">
        <p class="mr-2 font-bold flex-shrink-0">展品列表：</p>
        <div class="flex gap-3 flex-wrap lg:flex-nowrap">
          <div class="flex items-center w-full max-w-[430px] lg:w-[600px]">
            <input
              class="peer form-input h-10 border-dark-400 bg-dark-200 flex-grow"
              type="text"
              placeholder="搜尋展品"
            />
            <button
              type="button"
              class="btn border border-dark h-10 w-10 bg-dark text-white ring-primary hover:bg-primary hover:border-primary peer-focus:ring-1"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <select
            name="sort"
            id="sort"
            class="form-select inline-block w-full max-w-[144px] lg:w-1/2 lg:flex-grow"
          >
            <option value="" disabled selected>排序</option>
            <option value="">由新到舊</option>
            <option value="">由舊到新</option>
          </select>
        </div>
      </div>
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <li class="col-span-1" v-for="item in collectionList" :key="item.collectionId">
        <div class="h-full">
          <CollectionListItem :collection-item="item" :show-fav-icon="false" />
        </div>
      </li>
    </ul>

    <div class="flex py-6 lg:py-10">
      <PageComponent :pages="pages" @change="turnPage" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import PageComponent from '../components/layout/PageComponent.vue'
import CollectionListItem from '../components/collection/CollectionListItem.vue'

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
    title: '新增展覽',
    path: '/curating/new'
  }
])

const collectionList = ref([
  {
    id: '20',
    collectionId: 'P020',
    title: '具區林屋 軸',
    author: '王蒙',
    time: '元'
  },
  {
    id: '204',
    collectionId: 'A004',
    title: '白套紅玻璃包袱紋鼻煙壺',
    author: '不詳',
    time: '清'
  },
  {
    id: '21',
    collectionId: 'P021',
    title: '八駿圖　軸',
    author: '郎世寧',
    time: '清'
  },
  {
    id: '16',
    collectionId: 'P016',
    title: '翠巘高秋圖　軸',
    author: '愛新覺羅弘旿',
    time: '清'
  },
  {
    id: '201',
    collectionId: 'A005',
    title: '琺瑯彩柳燕碗',
    author: '不詳',
    time: '清'
  },
  {
    id: '22',
    collectionId: 'P022',
    title: '摹顧愷之洛神圖 卷',
    author: '丁觀鵬',
    time: '清'
  },
  {
    id: '206',
    collectionId: 'A006',
    title: '金胎內填兼畫琺瑯西方仕女圖執壺',
    author: '不詳',
    time: '清'
  },
  {
    id: '23',
    collectionId: 'P023',
    title: '紅牡丹　單片',
    author: '鄭曼青',
    time: '民國'
  }
])
</script>

<style>
.form-select {
  @apply focus:border-primary focus:ring-primary read-only:focus:border-dark-600 read-only:focus:ring-0;
}
</style>
