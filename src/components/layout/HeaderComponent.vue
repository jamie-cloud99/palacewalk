<template>
  <div class="bg-white sticky top-0 z-[100] border-b border-dark-600">
    <div class="container flex justify-between py-6">
      <RouterLink to="/" class="flex gap-2 items-center">
        <img src="/images/logo.svg" alt="故宮走走" class="w-12 h-12 block" />
        <div class="">
          <h1 class="font-serif font-bold text-[28px] leading-tight tracking-widest">故宮走走</h1>
          <h2 class="text-[14px] leading-none font-serif font-medium tracking-wider">
            Content Curator
          </h2>
        </div>
      </RouterLink>
      <div v-if="!isOpen.menu" class="flex gap-6 items-center lg:gap-10">
        <button
          type="button"
          class="text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <div class="gap-6 items-center hidden md:flex lg:gap-10">
          <div class="relative">
            <button
              type="button"
              @click="toggleMenu('notice')"
              class="text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
            >
              <i class="fa-regular fa-bell"></i>
            </button>
            <div :class="menuClass.notice" class="absolute right-0 -bottom-6 translate-y-full transition-all duration-300">
              <NoticeDropdown />
            </div>
            
          </div>
          <button
            type="button"
            class=" text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
          >
            <i class="fa-regular fa-circle-user"></i>
          </button>
        </div>
        <button
          type="button"
          class="text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
          @click="toggleMenu('menu')"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
      <div v-if="isOpen.menu" class="">
        <button type="button" class="text-2xl lg:text-[28px] p-2" @click="toggleMenu('menu')">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </div>

  <div :class="menuClass.menu" class="fixed top-[97px] z-[100] w-full transition-all duration-500">
    <MenuComponent @toggle="toggleMenu('menu')" menu-open="menu" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import MenuComponent from './MenuComponent.vue'
import NoticeDropdown from './NoticeDropdown.vue'

const isOpen = reactive({
  menu: false,
  notice: false,
  member: false,
  search: false
})

const menuClass = reactive(
  {
    menu: 'max-0',
    notice: 'max-0'
  }
)

const toggleMenu = (item) => {
  isOpen[item] = !isOpen[item]

  for(const key in isOpen) {
    if(key !== item) isOpen[key] = false
    menuClass[key] = isOpen[key] ? 'max-h' : 'max-0'
  }
}
</script>

<style>
.max-h {
  @apply max-h-screen;
}

.max-0 {
  @apply max-h-0 overflow-hidden;
}
</style>
