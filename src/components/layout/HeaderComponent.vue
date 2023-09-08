<template>
  <div class="bg-white sticky top-0 max-w-screen z-[100] border-b border-dark-600">
    <div class="container flex justify-between py-6 w-full">
      <RouterLink to="/" class="flex gap-2 items-center">
        <img src="/images/logo.svg" alt="故宮走走" class="w-12 h-12 block" />
        <div>
          <h1 class="font-serif font-bold text-[28px] leading-tight tracking-widest">故宮走走</h1>
          <h2 class="text-[14px] leading-none font-serif font-medium tracking-wider">
            Content Curator
          </h2>
        </div>
      </RouterLink>
      <div v-if="!isOpen.menu" class="flex gap-6 items-center lg:gap-10">
        <button
          type="button"
          class="hidden lg:block text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
          @click="startSearch"
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
            <div
              :class="menuClass.notice"
              class="hidden lg:block absolute right-0 -bottom-6 translate-y-full transition-all duration-300"
            >
              <NoticeDropdown />
            </div>
          </div>
          <button
            type="button"
            class="text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
            @click="enterMemberSpace"
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
      <div v-if="isOpen.menu">
        <button type="button" class="text-2xl lg:text-[28px] p-2" @click="toggleMenu('menu')">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </div>

  <div :class="menuClass.menu" class="fixed top-[97px] z-[200] w-full transition-all duration-500">
    <MenuComponent @toggle="toggleMenu('menu')" menu-open="menu" />
  </div>

  <SignInModal ref="signInModal" />
  <MobileBar @toggle-member="enterMemberSpace" @toggle-search="startSearch" />
  <SearchModal ref="searchModal" />
</template>

<script setup>
import { ref } from 'vue'
import { useStatusStore } from '../../stores/statusStore'
import MenuComponent from './MenuComponent.vue'
import NoticeDropdown from './NoticeDropdown.vue'
import SignInModal from './SignInModal.vue'
import SearchModal from './SearchModal.vue'
import MobileBar from './MobileBar.vue'
import { storeToRefs } from 'pinia'

const signInModal = ref(null)
const searchModal = ref(null)
const statusStore = useStatusStore()
const { isOpen, menuClass } = storeToRefs(statusStore)
const { toggleMenu } = statusStore

const enterMemberSpace = () => {
  openModal(signInModal)
}

const startSearch = () => {
  openModal(searchModal)
}

const openModal = (modal) => {
  modal.value.curModal.show()
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
