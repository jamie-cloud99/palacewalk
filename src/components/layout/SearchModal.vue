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
      class="scrollbar-hidden overflow-auto h-[480px] w-[calc(100vw-1.5rem)] max-w-[480px] lg:max-w-[700px] rounded-sm opacity-0 transition-all duration-300 ease-in-out"
    >
      <div class="relative rounded-sm bg-white shadow-lg">
        <div
          class="absolute z-10 top-0 w-20 h-20 bg-[url('../images/collection/banner-bg.jpg')] opacity-90"
        ></div>
        <div class="relative z-10 flex justify-between items-start mb-2">
          <h3 class="text-8 font-bold pt-5 px-14">快速搜尋</h3>
          <button
            type="button"
            class="btn bg-dark text-white w-20 h-20 text-[28px]"
            data-te-modal-dismiss
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="flex items-start gap-x-6 px-10 text-2xl font-bold mb-8 lg:px-20 lg:mb-10">
          <button
            type="button"
            class="btn pb-1 border-primary hover:border-b-4"
            :class="{ 'border-b-4': searchType === '展覽' }"
            @click="changeSearchType('展覽')"
          >
            展覽
          </button>
          <button
            type="button"
            class="btn pb-1 border-primary hover:border-b-4"
            @click="changeSearchType('展品')"
            :class="{ 'border-b-4': searchType === '展品' }"
          >
            展品
          </button>
        </div>

        <div
          class="relative py-10 px-10 lg:px-20 bg-[url('../images/collection/banner-bg.jpg')] bg-right bg-cover"
        >
          <div class="absolute inset-0 bg-dark-200 opacity-50"></div>
          <div class="relative z-10 grid"></div>
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

          <button type="button" class="btn w-24 bg-primary text-white hover:bg-dark">
            <span>搜尋</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal, initTE } from 'tw-elements'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '../../stores/statusStore'

const modal = ref(null)
const curModal = ref(null)
const statusStore = useStatusStore()
const { searchType } = storeToRefs(statusStore)
const { changeSearchType } = statusStore

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

<style scoped>
.bg-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../images/collection/banner-bg.jpg');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.4;
}
</style>
