<template>
  <div class="container pt-6 lg:pt-12">
    <div class="lg:grid lg:grid-cols-12 gap-6">
      <div class="col-span-3">
        <div class="text-lg font-semibold mb-10 lg:mb-32">
          <div class="pb-2 font-bold border-b border-dark">
            <h2 class="text-lg">會員專區</h2>
            <p class="font-cormo lg:text-2xl uppercase">Member Area</p>
          </div>
          <ul class="grid grid-cols-2 lg:block mb-4 lg:mb-20">
            <li class="col-span-1" v-for="item in menuList" :key="item.title">
              <RouterLink
                to="#"
                class="block text-center transition-all duration-300 w-full border-b border-x border-dark-400 px-2 py-3 lg:text-left lg:border-x-0"
                :class="{
                  'hover:bg-dark/10': curPage.title !== item.title,
                  'bg-primary text-white': item.title === curPage.title
                }"
                @click="changeMenuItem(item)"
              >
                {{ item.title }}
              </RouterLink>
            </li>
          </ul>
          <RouterLink
            to="/curating"
            target="_blank"
            class="btn flex justify-between w-full rounded-none bg-dark text-white text-left px-2 py-3 hover:bg-primary transition-all duration-500"
          >
            <span>我要策展</span>
            <span><i class="fa-regular fa-user"></i></span>
          </RouterLink>
        </div>
      </div>
      <div class="col-span-9">
        <div
          class="md:flex justify-between items-center pb-3 border-b border-dark space-y-2 md:space-y-0"
        >
          <BreadcrumbsComponent :nav-list="breadList" class="order-2 -mx-2" />
          <h3 class="text-xl font-black order-1">{{ curPage.title }}</h3>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMemberStore } from '../stores/memberStore';
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import { storeToRefs } from 'pinia';

const memberStore = useMemberStore()
const { isLoggedIn } = storeToRefs(memberStore)
const { checkLogin } = memberStore

const menuList = reactive([
  {
    title: '會員資料',
    path: '/member/info',
    name: 'memberInfo'
  },
  {
    title: '收藏清單',
    path: '/member/favorites',
    name: 'memberFavorites'
  },
  {
    title: '我的留言',
    path: '/member/messages',
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

const curPage = computed(() => {
  return menuList.find((item) => item.name === route.name)
})

watch(
  () => route.path,
  () => {
    breadList[breadList.length - 1] = curPage.value
  },
  { immediate: true }
)

const changeMenuItem = (page) => {
  if (page.title !== '登出') {
    router.push(page.path)
    curPage.value = page
  }
}

checkLogin()

watch (
  () => isLoggedIn,
  () => {
    if(!isLoggedIn.value) {
      router.push('/')
    }
  },
  {immediate: true }
)


</script>
