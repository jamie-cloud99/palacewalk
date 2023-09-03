<template>
  <div class="pt-5">
    <ul class="grid grid-cols-2 mb-4">
      <li class="col-span-1" v-for="item in tabList" :key="item.title">
        <button
          type="button"
          class="btn w-full border-b-4 border-dark-600"
          :class="{ '!border-warning': curTab.title === item.title }"
          @click="changeTab(item)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
    <ul v-if="curTab.title === tabList[0].title" class="grid grid-cols-2 gap-6">
      <li v-for="i in 10" :key="i + 'i'" class="col-span-2 lg:col-span-1">
        <div class="relative">
          <!-- card 元件 -->
          <div class="bg-dark-600 h-[250px]"></div>
          <div class="group absolute top-2 right-3">
            <button type="button" class="">
              <span class="text-primary text-xl"><i class="fa-solid fa-heart"></i></span>
            </button>
            <div
              class="hidden absolute -top-9 -left-1 -translate-x-1/2 pointer-events-none group-hover:block"
            >
              <p class="whitespace-nowrap bg-dark text-white p-1 triangle">取消收藏</p>
              <span></span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul v-else class="grid grid-cols-6 gap-6">
      <li v-for="i in 10" :key="i + 'i'" class="col-span-6 md:col-span-3 xl:col-span-2">
        <div class="relative">
          <!-- card 元件 -->
          <div class="bg-dark-600 h-[250px]"></div>
        </div>
      </li>
    </ul>
  </div>
  <div class="flex py-15">
    <PageComponent :pages="pages" @change="turnPage" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useMemberStore } from '../stores/memberStore'
import PageComponent from '../components/layout/PageComponent.vue'
import { storeToRefs } from 'pinia'

const memberStore = useMemberStore()
const { pages } = storeToRefs(memberStore)
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

<style>
.triangle::after {
  @apply content-[''] block absolute left-[55%]  border-8 border-x-transparent border-b-0 border-dark;
}
</style>
