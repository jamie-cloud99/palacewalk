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
      class="scrollbar-hidden overflow-auto h-[580px] w-[calc(100vw-1.5rem)] max-w-[480px] lg:max-w-[700px] rounded-sm opacity-0 transition-all duration-300 ease-in-out"
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
          <div class="container relative z-10">
            <!-- 展品 -->
            <div v-if="searchType === '展品'" class="flex gap-6 flex-wrap">
              <div class="w-1/2">
                <label class="block font-bold text-2xl mb-4" for="name">品名</label>
                <input class="bg-dark-200 w-full" type="text" id="name" name="name" placeholder="請輸入品名">
              </div>
              <div>
                <label class="block font-bold text-2xl mb-4" for="author">作者</label>
                <input class="bg-dark-200" type="text" id="author" name="author" placeholder="請輸入作者">
              </div>
              <div class="w-1/2">
                <label class="block font-bold text-2xl mb-4" for="category">分類</label>
                <select class="bg-dark-200 block w-full" data-te-select-init>
                  <option :value="null">請選擇</option>
                  <option value="1">精選展品</option>
                  <option value="2">繪畫</option>
                  <option value="3">器物</option>
                  <option value="4">硬幣古錢</option>
                  <option value="5">織品絲繡</option>
                  <option value="6">其他文物</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-2xl mb-4" for="order">排序</label>
                <select class="block bg-dark-200" data-te-select-init>
                  <option :value="null">請選擇</option>
                  <option value="2">依照朝代(由新到舊)</option>
                  <option value="3">依照朝代（由舊到新）</option>
                </select>
              </div>
              <div class="w-3/4">
                <h3 class="font-bold text-2xl">朝代</h3>
              </div>
              <div class="w-full">
                <input @change="handleChange" class="w-full cursor-pointer accent-warning" list="tickmarks" value="50" type="range" min="0" max="100" step="5"/>
                <span class="inline-block p-1 bg-[#D9D9D9]" v-text="yearly"></span>
                <datalist id="tickmarks" >
                  <option value="0"></option>
                  <option value="5"></option>
                  <option value="10"></option>
                  <option value="15"></option>
                  <option value="20"></option>
                  <option value="25"></option>
                  <option value="30"></option>
                  <option value="35"></option>
                  <option value="40"></option>
                  <option value="45"></option>
                  <option value="50"></option>
                  <option value="55"></option>
                  <option value="60"></option>
                  <option value="65"></option>
                  <option value="70"></option>
                  <option value="75"></option>
                  <option value="80"></option>
                  <option value="85"></option>
                  <option value="90"></option>
                  <option value="95"></option>
                  <option value="100"></option>
                </datalist>
              </div>

            </div>
            <!-- 展覽 -->
            <div v-else>
              <div class="mb-5">
                <label class="block font-bold text-2xl mb-4" for="name">展名</label>
                <input type="text" id="name" name="name">
              </div>
              <div>
                <label class="block font-bold text-2xl mb-4" for="order">排序</label>
                <select class="block" data-te-select-init>
                  <option :value="null">請選擇</option>
                  <option value="2">依照朝代(由新到舊)</option>
                  <option value="3">依照朝代（由舊到新）</option>
                </select>
              </div>
            </div>
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

          <button type="button" class="btn w-24 bg-primary text-white hover:bg-dark">
            <span>搜尋</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal, Select, initTE } from 'tw-elements'
import { reactive, ref, onMounted } from 'vue'
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

initTE({ Modal, Select })

onMounted(() => {
  curModal.value = new Modal(modal.value)
})


let dynastyList = reactive(['新石器時代', '新石器時代晚期', '商', '西周', '春秋', '戰國', '秦', '西漢', '新莽',
'東漢', '魏晉南北朝', '隋', '唐', '五代', '宋', '遼', '金', '元', '明', '清', '民國'])

const generateDynastyMap = (list) => {
  const dynastyMap = {}
  list.forEach((dynasty, i) => {
    dynastyMap[i * 5] = dynasty
  })
  return dynastyMap
};

const dynastyMap = generateDynastyMap(dynastyList)
const yearly = ref('魏晉南北朝')

const handleChange = (val) => {
  const selectedYear = dynastyMap[val.target.value]
  if (selectedYear !== undefined) {
    yearly.value = selectedYear
  }
};
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
