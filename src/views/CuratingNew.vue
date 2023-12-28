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

      <label for="photo" class="btn w-32 inline-block px-6 bg-dark text-white hover:bg-primary"
        ><input
          type="file"
          id="photo"
          ref="fileInput"
          @change="uploadImage(newPhoto)"
          class="hidden"
        />上傳圖片
      </label>
    </div>

    <VForm v-slot="{ errors, isSubmitting, meta }" action="submit">
      <div class="mb-4 lg:mb-6 items-center space-y-2 md:flex md:space-y-0">
        <label for="title" class="inline-block mr-2 font-bold flex-shrink-0">展覽名稱：</label>
        <VField
          v-model.trim="curatingForm.title"
          id="title"
          type="text"
          placeholder="請輸入展覽名稱"
          label="展覽名稱"
          name="title"
          rules="required"
          class="form-input bg-dark-200  border-dark-400 w-full py-3 px-4 placeholder:text-dark-600"
          :class="{ 'is-invalid  !border-0': errors['title'] }"
        />
        <ErrorMessage as="div" name="title" class="form-error" v-slot="{ message }">
          <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
          <span>{{ message }}</span>
        </ErrorMessage>
      </div>
      <div class="mb-4 lg:mb-6 items-center space-y-2 md:flex md:space-y-0">
        <label class="inline-block mr-2 font-bold flex-shrink-0">展覽時間：</label>
        <div class="flex items-center">
          <div>
            <VField
              v-model.trim="curatingForm.startDate"
              id="startDate"
              type="text"
              onfocus="(this.type='date')"
              onblur="(this.type='text')"
              placeholder="請填入展覽起始日"
              label="展覽起始日"
              name="startDate"
              rules="required"
              class="form-input bg-dark-200  border-dark-400 w-full w-40 placeholder:text-dark-600"
              :class="{ 'is-invalid  !border-0': errors['startDate'] }"
            />
            <ErrorMessage as="div" name="startDate" class="form-error" v-slot="{ message }">
              <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
              <span>{{ message }}</span>
            </ErrorMessage>
          </div>
          <p class="mx-2">—</p>
          <div>
            <VField
              v-model.trim="curatingForm.endDate"
              id="endDate"
              type="text"
              onfocus="(this.type='date')"
              onblur="(this.type='text')"
              placeholder="請填入展覽結束日"
              label="展覽結束日"
              name="endDate"
              rules="required"
              class="form-input bg-dark-200  border-dark-400 w-full w-40 placeholder:text-dark-600"
              :class="{ 'is-invalid  !border-0': errors['endDate'] }"
            />
            <ErrorMessage as="div" name="endDate" class="form-error" v-slot="{ message }">
              <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
              <span>{{ message }}</span>
            </ErrorMessage>
          </div>
        </div>
      </div>
      <div class="mb-4 lg:mb-6 items-center space-y-2">
        <label for="description" class="inline-block mr-2 font-bold flex-shrink-0">展覽概述：</label>
        <input id="description" v-model="curatingForm.description" type="text" class="form-input w-full border-dark-400 bg-dark-200" />
      </div>
      <div class="mb-4 lg:mb-6 items-center space-y-2">
        <label for="content" class="block mr-2 font-bold flex-shrink-0">展覽亮點：</label>
        <input id="content" v-model="curatingForm.content" type="text" class="form-input w-full border-dark-400 bg-dark-200" />
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
    </VForm>

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

    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <li class="col-span-1" v-for="item in collectionList" :key="item.collectionId">
        <div class="h-full">
          <CollectionListItem :collection-item="item" :show-fav-icon="false" />
        </div>
      </li>
    </ul>

    <div class="flex py-6 lg:py-10">
      <PageComponent :pages="pages" @change="selectPage" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectionStore } from '../stores/collectionStore'
import { usePageStore } from '../stores/pageStore'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import PageComponent from '../components/layout/PageComponent.vue'
import CollectionListItem from '../components/collection/CollectionListItem.vue'

const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)
const { turnPage } = pageStore

const collectionStore = useCollectionStore()
const { collectionList, curCategory } = storeToRefs(collectionStore)
const { fetchPageCollections } = collectionStore

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

const fileInput = ref(null)
const curatingForm = ref({})

const newPhoto = computed(() => fileInput.value.files[0])

const selectPage = (page) => {
  turnPage(page, false)
  fetchPageCollections(curCategory.value.id, page)
}

const uploadImage = (imgFile) => {
  if (imgFile) {
    const reader = new FileReader()
    reader.readAsDataURL(imgFile)
    reader.addEventListener('load', () => {
      curatingForm.value.banner = reader.result
    })
  }
}

fetchPageCollections()
</script>

<style>
.form-select {
  @apply focus:border-primary focus:ring-primary read-only:focus:border-dark-600 read-only:focus:ring-0;
}
</style>
