<template>
  <div class="container pt-6 lg:pt-12">
    <div class="lg:grid lg:grid-cols-12 gap-6">
      <div class="col-span-3">
        <div class="text-lg font-semibold mb-10 lg:mb-32">
          <div class="pb-2 font-bold border-b border-dark">
            <h2>會員專區</h2>
            <p class="font-cormo lg:text-2xl uppercase">Member Area</p>
          </div>
          <ul class="grid grid-cols-2 lg:block mb-4 lg:mb-[90px]">
            <li
              class="border-b border-x border-dark-600 col-span-1"
              v-for="item in menuList"
              :key="item.title"
              :class="{ 'bg-primary text-white': item.title === curPageTitle }"
            >
              <RouterLink
                to="#"
                class="block text-center transition-all duration-300 w-full px-2 py-3 hover:bg-primary/10 lg:text-left"
                @click="changeMenuItem(item)"
              >
                {{ item.title }}
              </RouterLink>
            </li>
          </ul>
          <RouterLink
            to="/curating"
            target="_blank"
            class="btn flex justify-between w-full rounded-none bg-dark text-white text-left px-2 py-3 hover:bg-warning transition-all duration-500"
          >
            <span>我要策展</span>
            <span><i class="fa-regular fa-user"></i></span>
          </RouterLink>
        </div>
      </div>
      <div class="col-span-9">
        <div class="flex flex-wrap justify-between items-center pb-3 border-b border-dark">
          <h3 class="text-xl font-black">{{ curPageTitle }}</h3>
          <BreadcrumbsComponent :nav-list="breadList" />
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'

const menuList = reactive([
  {
    title: '會員資料',
    path: 'info',
    name: 'memberInfo'
  },
  {
    title: '收藏清單',
    path: 'favorites',
    name: 'memberFavorites'
  },
  {
    title: '我的留言',
    path: 'messages',
    name: 'memberMessages'
  },
  {
    title: '登出'
  }
])

const route = useRoute()
const router = useRouter()

const breadList = reactive([
  {
    title: '首頁',
    path: '/'
  },
  {
    title: '會員專區',
    path: '/member'
  },
  {
    title: '會員資料',
    path: '/member/info'
  }
])

const curPageTitle = computed(() => {
  return menuList.find((item) => item.name === route.name).title
})

const changeMenuItem = (page) => {
  if (page.title !== '登出') {
    router.push(`/member/${page.path}`)
    breadList.pop()
    breadList.push(page)
  }
}
</script>
