<template>
  <div class="bg-white lg:border-t border-dark-600 p-4 shadow-lg h-fit overflow-hidden">
    <ul class="space-y-2 px-2 divide-y divide-dark-600 w-[150px]">
      <li class="flex gap-2 items-center py-2 relative">

          <img :src="member.imageUrl" alt="" class="flex-shrink-0 rounded-full w-8 h-8" />
        <RouterLink to="/member" @click="toggleMenu('member')" class="stretched-link font-bold"
          >會員專區</RouterLink
        >
      </li>
      <li>
        <button
          type="button"
          class="font-bold block text-left w-full py-2"
          @click="logOut(), toggleMenu('member')"
        >
          <i class="fa-solid fa-arrow-right-from-bracket text-lg mx-2"></i>
          登出
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStatusStore } from '../../stores/statusStore'
import { useMemberStore } from '../../stores/memberStore'

const statusStore = useStatusStore()
const memberStore = useMemberStore()
const { member } = storeToRefs(memberStore)
const { toggleMenu } = statusStore
const { logOut } = memberStore

</script>
