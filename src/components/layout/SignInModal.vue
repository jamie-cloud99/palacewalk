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
      class="scrollbar-hidden overflow-auto max-h-[500px] w-[480px] rounded-sm opacity-0 transition-all duration-300 ease-in-out"
    >
      <div class="rounded-sm bg-white shadow-lg">
        <div class="grid grid-cols-2 text-center">
          <div class="col-span-1">
            <button type="button" class="w-full bg-dark text-white text-2xl font-bold py-6">登入</button>
          </div>
          <div class="col-span-1">
            <button type="button" class="w-full text-2xl font-bold py-6">註冊</button>
          </div>
          
          
        </div>

        <div class="overflow-y-auto scrollbar-hidden max-h-[350px] px-8 py-4 lg:py-6" data-te-modal-body-ref>
          <h5 class="mb-4 text-center text-xl font-semibold">會員登入，入宮暢行最自在</h5>
          <div class="mb-4">
            <label for="account" class="block mb-2">帳號</label>
            <input id="account" type="email" placeholder="請輸入信箱" class="form-input w-full">
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">密碼</label>
            <input id="password" type="password" placeholder="請輸入密碼" class="form-input w-full">
          </div>
        </div>

        <div class="flex items-center justify-center gap-x-4 py-6">
          <button
            @click="closeModal"
            type="button"
            class="btn  w-24 border border-dark hover:bg-dark hover:text-white"
            data-te-modal-dismiss
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            取消
          </button>

          <button
            type="button"
            class="btn w-24 bg-primary text-white hover:bg-dark"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            登入
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal, initTE } from 'tw-elements'
import { ref, onMounted } from 'vue'

const modal = ref(null)
const curModal = ref(null)

defineExpose({
  curModal
})

const closeModal = () => {
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
