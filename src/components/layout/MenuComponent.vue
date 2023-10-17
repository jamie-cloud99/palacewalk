<template>
  <div class="bg-white h-screen md:flex justify-center overflow-y-auto">
    <div class="container px-5 md:w-3/4 xl:w-1/2">
      <div class="md:grid grid-cols-2 justify-center items-start gap-x-20 pt-4 pb-40 md:pb-8">
        <div class="col-span-1">
          <ul class="space-y-8 flex-grow mb-4">
            <li v-for="category in menuContent" :key="category.title">
              <div class="flex gap-2 items-start py-4">
                <div class="w-4 h-4 bg-primary mt-2 flex-shrink-0"></div>
                <h3 class="text-2xl font-semibold">{{ category.title }}</h3>
              </div>
              <ul>
                <li v-for="item in category.items" :key="item.title" @click="emit('toggle')">
                  <router-link
                    :to="item.path"
                    class="block px-6 py-4 text-dark-800 text-lg hover:text-dark"
                    >{{ item.title }}</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="col-span-1">
          <div class="md:mt-4 flex-grow">
            <div class="pt-8 pb-8 pl-6 border-t border-dark-600 md:border-0 md:pt-0">
              <p class="text-lg font-semibold mb-1">專人接洽</p>
              <p class="text-dark-800 text-8 mb-4">
                <a href="tel:+886-2-28812021">02-2881-2021</a>
              </p>
              <ul class="text-dark-800 space-y-1">
                <li>平日 12:00-19:00</li>
                <li>週末 09:00-19:00</li>
              </ul>
            </div>
            <RouterLink
              to="/curating"
              @click="emit('toggle', menuOpen)"
              class="btn w-full lg:w-[300px] bg-primary text-white hover:bg-dark"
            >
              我要策展
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
const emit = defineEmits(['toggle'])

const props = defineProps({
  menuOpen: String
})

const { menuOpen } = toRefs(props)

const menuContent = reactive([
  {
    title: '展覽空間',
    items: [
      {
        title: '當期展覽',
        path: '/exhibitions?period=當期展覽'
      },
      {
        title: '近期展覽',
        path: '/exhibitions?period=近期展覽'
      }
    ]
  },
  {
    title: '藝術展品',
    items: [
      {
        title: '精選展品',
        path: '/collections/masterpieces'
      },
      {
        title: '展品目錄',
        path: '/collections'
      }
    ]
  }
])
</script>
