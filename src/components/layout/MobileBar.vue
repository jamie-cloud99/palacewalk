<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-[150] bg-dark-200 h-15 shadow-[0_35px_60px_15px_rgba(0,0,0,0.3)] md:hidden"
  >
    <div class="flex justify-between items-center h-full px-6">
      <button
        type="button"
        class="text-2xl lg:text-[28px] py-2 px-3 transition-all duration-300 rounded active:bg-white/80"
        @click="emit('toggleSearch')"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <div class="relative">
        <button
          type="button"
          @click="toggleMenu('notice')"
          class="text-2xl lg:text-[28px] py-2 px-3 transition-all duration-300 rounded active:bg-white/80"
        >
          <i class="fa-regular fa-bell"></i>
        </button>
        <div
          :class="menuClass.notice"
          class="fixed left-0 right-0 bottom-15 text-dark transition-all duration-300 sm:px-10"
        >
          <NoticeDropdown />
        </div>
      </div>
      <div class="relative">
        <button
          type="button"
          class="text-2xl lg:text-[28px] py-2 px-3 transition-all duration-300 rounded active:bg-white/80"
          @click="emit('toggleMember', 'member')"
        >
          <i class="fa-regular fa-circle-user"></i>
        </button>
        <div
          :class="menuClass.member"
          class="fixed right-0 bottom-15 text-dark transition-all duration-300"
        >
          <MemberDropdown />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStatusStore } from '../../stores/statusStore'
import NoticeDropdown from './NoticeDropdown.vue'
import MemberDropdown from './MemberDropdown.vue'

const statusStore = useStatusStore()
const { menuClass } = storeToRefs(statusStore)
const { toggleMenu } = statusStore

const emit = defineEmits(['toggleMember', 'toggleSearch'])
</script>

<style></style>
