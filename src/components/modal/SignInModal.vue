<template>
  <div
    ref="modal"
    data-te-modal-init
    class="fixed left-1/2 top-1/2 z-[1055] hidden -translate-x-1/2 -translate-y-1/2 overflow-hidden"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div
      data-te-modal-dialog-ref
      class="scrollbar-hidden overflow-auto h-[480px] w-[calc(100vw-1.5rem)] max-w-[480px] rounded-sm opacity-0 transition-all duration-300 ease-in-out"
    >
      <div class="rounded-sm bg-white shadow-lg">
        <div class="grid grid-cols-2 text-center">
          <div class="col-span-1">
            <button
              type="button"
              @click="changeForm(true)"
              class="w-full text-2xl font-bold py-6"
              :class="{ 'bg-black text-white': hasAccount }"
            >
              登入
            </button>
          </div>
          <div class="col-span-1">
            <button
              type="button"
              @click="changeForm(false)"
              class="w-full text-2xl font-bold py-6"
              :class="{ 'bg-black text-white': !hasAccount }"
            >
              註冊
            </button>
          </div>
        </div>

        <div
          v-if="hasAccount"
          class="overflow-y-auto scrollbar-hidden max-h-[300px] px-8 py-4 lg:py-6"
          data-te-modal-body-ref
        >
          <h5 class="mb-4 text-center text-xl font-semibold">會員登入，入宮暢行最自在</h5>
          <div class="mb-4">
            <label for="account" class="block mb-2">帳號</label>
            <input id="account" type="email"
            v-model="tempMember.email" placeholder="請輸入信箱" class="form-input w-full" />
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">密碼</label>
            <input
              id="password"
              type="password"
              v-model="tempMember.password"
              placeholder="請輸入密碼"
              class="form-input w-full"
            />
          </div>
        </div>

        <div
          v-else
          class="overflow-y-auto scrollbar-hidden max-h-[300px] px-8 py-4 lg:py-6"
          data-te-modal-body-ref
        >
          <h5 class="mb-4 text-center text-xl font-semibold">加入會員，坐擁宮中頂級美學</h5>
          <div class="mb-4">
            <label for="name" class="block mb-2">顯示暱稱</label>
            <input
              type="text"
              id="name"
              v-model="tempMember.name"
              class="form-input w-full"
              placeholder="請輸入暱稱"
            />
          </div>
          <div class="mb-4">
            <label for="account" class="block mb-2">帳號</label>
            <input
              id="account"
              type="email"
              v-model="tempMember.email"
              placeholder="請輸入信箱"
              class="form-input w-full"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">密碼</label>
            <input
              id="password"
              type="password"
              v-model="tempMember.password"
              placeholder="請輸入密碼"
              class="form-input w-full"
            />
          </div>
          <div class="mb-4">
            <label for="password-check" class="block mb-2">確認密碼</label>
            <input
              id="password-check"
              type="password"
              v-model="checkedPassword"
              placeholder="請再次輸入密碼"
              class="form-input w-full"
            />
          </div>
        </div>

        <div class="flex items-center justify-center gap-x-4 py-6">
          <button
            @click="closeModal"
            type="button"
            class="btn w-24 border border-dark hover:bg-dark hover:text-white"
            data-te-modal-dismiss
          >
            取消
          </button>

          <button
            v-if="hasAccount"
            type="button"
            class="btn w-24 bg-primary text-white hover:bg-dark"
            @click="logInMember(tempMember)"
          >
            登入
          </button>
          <button v-else type="button" class="btn w-24 bg-primary text-white hover:bg-dark"
          @click="registerMember(tempMember)">
            註冊
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal, initTE } from 'tw-elements'
import { ref, onMounted } from 'vue'
import { useMemberStore } from '../../stores/memberStore'
import { storeToRefs } from 'pinia'

const modal = ref(null)
const curModal = ref(null)
const hasAccount = ref(true)
const memberStore = useMemberStore()
const { tempMember } = storeToRefs(memberStore)
const { signUp, logIn } = memberStore

const checkedPassword = ref({})

defineExpose({
  curModal
})

const closeModal = () => {
  curModal.value.hide()
}

const changeForm = (status) => {
  hasAccount.value = status
  tempMember.value = {}
}

const logInMember = (member) => {
  const account = { email: member.email, password: member.password }
  logIn(account)
  curModal.value.hide()
}

const registerMember = (member) => {
  const data = { ...member, imageUrl: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }
  signUp(data)
  curModal.value.hide()
}

initTE({ Modal })

onMounted(() => {
  curModal.value = new Modal(modal.value)
})
</script>

<style>
.form-input {
  @apply focus:border-primary focus:ring-primary read-only:focus:border-dark-600 read-only:focus:ring-0;
}
</style>
