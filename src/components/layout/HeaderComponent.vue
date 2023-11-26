<template>
  <div class="bg-white sticky top-0 w-screen max-w-full z-[100] border-b border-dark-600">
    <div class="container flex justify-between py-6 w-full">
      <RouterLink to="/" class="flex gap-2 items-center flex-grow">
        <img src="/images/logo.svg" alt="故宮走走" class="w-12 h-12 block" />
        <div>
          <h1 class="font-serif font-bold text-[28px] leading-tight tracking-widest">故宮走走</h1>
          <h2 class="text-[14px] leading-none font-serif font-medium tracking-wider">
            Content Curator
          </h2>
        </div>
      </RouterLink>
      <div v-if="!isOpen.menu" class="flex gap-6 items-center lg:gap-10">
        <div class="gap-6 items-center hidden md:flex lg:gap-10">
          <button
            type="button"
            class="text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
            @click="startSearch"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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
              class="hidden md:block absolute right-0 -bottom-6 translate-y-full transition-all duration-300"
            >
              <NoticeDropdown />
            </div>
          </div>
          <div class="relative">
            <button
              type="button"
              class="text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
              @mouseover="enterMemberSpace('member')"
            >
              <div v-if="isLoggedIn" class="h-[42px] flex items-center">
                <img
                  :src="member.imageUrl"
                  :alt="member.name"
                  class="w-9 h-9 object-cover rounded-full"
                />
              </div>
              <span v-else class="flex items-center">
                <i class="fa-regular fa-circle-user"></i>
                <span class="ml-1 text-base lg:text-xl font-semibold sr-only">登入</span>
              </span>
            </button>
            <div
              :class="menuClass.member"
              class="hidden md:block absolute right-0 -bottom-6 translate-y-full transition-all duration-300"
            >
              <MemberDropdown />
            </div>
          </div>
        </div>
        <button
          type="button"
          class="text-2xl lg:text-[28px] p-2 transition-all duration-300 hover:text-primary"
          @click="toggleMenu('menu')"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
      <button v-else type="button" class="text-2xl lg:text-[28px] p-2" @click="toggleMenu('menu')">
        <i class="fa-solid fa-xmark"></i>
      </button>
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
import { storeToRefs } from 'pinia'
import { useStatusStore } from '../../stores/statusStore'
import { useMemberStore } from '../../stores/memberStore'
import MenuComponent from './MenuComponent.vue'
import NoticeDropdown from './NoticeDropdown.vue'
import SignInModal from '../modal/SignInModal.vue'
import SearchModal from '../modal/SearchModal.vue'
import MobileBar from './MobileBar.vue'
import MemberDropdown from './MemberDropdown.vue'

const signInModal = ref(null)
const searchModal = ref(null)
const memberStore = useMemberStore()
const statusStore = useStatusStore()
const { isLoggedIn, member } = storeToRefs(memberStore)
const { isOpen, menuClass } = storeToRefs(statusStore)
const { toggleMenu } = statusStore

const enterMemberSpace = (item) => {
  if (isLoggedIn.value) {
    toggleMenu(item)
  } else {
    openModal(signInModal)
  }
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
