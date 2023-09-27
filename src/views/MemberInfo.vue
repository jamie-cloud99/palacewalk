<template>
  <div class="lg:grid grid-cols-9 gap-6 mb-8 lg:mb-10">
    <div class="col-span-4" :class="{ 'order-2': isEdit }">
      <div class="flex flex-col items-center bg-dark-200 pt-10 lg:pt-14 pb-10 font-semibold">
        <p v-if="isEdit" class="text-center mb-4">更換大頭貼</p>
        <img
          :src="member.imageUrl"
          alt=""
          class="block mb-4 w-32 h-32 rounded-full object-cover"
          referrerpolicy="no-referrer"
        />
        <p class="mb-6 text-xl" :class="{ '!mb-16': !isEdit }">{{ member.name }}</p>
        <p v-if="isEdit" class="text-dark-600 mb-10 px-2 lg:px-6 lg:mb-16">
          圖片尺寸限制為 1024px * 1024px 以下
        </p>
        <button
          v-if="!isEdit"
          type="button"
          class="btn w-32 border border-dark transition-all duration-500 hover:bg-dark hover:text-white"
          @click="toggleEdit(true)"
        >
          修改會員資料
        </button>
        <button
          v-else
          type="button"
          class="btn w-32 border border-dark transition-all duration-500 hover:bg-dark hover:text-white"
        >
          上傳圖片
        </button>
      </div>
    </div>
    <div class="col-span-5">
      <div class="pt-5 font-medium">
        <div class="mb-4 lg:mb-6">
          <label for="name" class="block font-semibold mb-2 lg:mb-4">顯示暱稱</label>
          <input
            type="text"
            id="name"
            class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
            :class="{ 'bg-dark-200 !border-0': !tempMember.name }"
            placeholder="請輸入新暱稱"
            :readonly="!isEdit"
            v-model="memberName"
          />
        </div>
        <div class="mb-4 lg:mb-6">
          <label for="email" class="block font-semibold mb-2 lg:mb-4"> 會員信箱</label>
          <input
            type="email"
            id="email"
            class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
            :class="{ 'bg-dark-200 !border-0': !tempMember.email }"
            placeholder="請輸入新信箱"
            :readonly="!isEdit"
            v-model="memberEmail"
          />
        </div>
        <div v-if="isEdit">
          <div class="mb-4 lg:mb-6">
            <label for="password" class="block mb-2 lg:mb-4">原始密碼</label>
            <input
              type="password"
              id="password"
              class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
              :class="{ 'bg-dark-200 !border-0': !oldPassword }"
              placeholder="請輸入原始密碼"
              v-model="oldPassword"
            />
          </div>
          <div class="mb-4 lg:mb-6">
            <label for="password-new" class="block mb-2 lg:mb-4">變更密碼</label>
            <input
              type="password"
              id="password-new"
              class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
              :class="{ 'bg-dark-200 !border-0': !tempMember.newPassword }"
              placeholder="請輸入新密碼"
              v-model="tempMember.newPassword"
            />
          </div>
          <div class="mb-4 lg:mb-6">
            <label for="password-check" class="block mb-2 lg:mb-4">確認變更密碼</label>
            <input
              type="password"
              id="password-check"
              class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
              :class="{ 'bg-dark-200 !border-0': !passwordCheck }"
              placeholder="請再次輸入新密碼"
              v-model="passwordCheck"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isEdit" class="flex justify-center gap-6 mb-20 lg:mb-40">
    <button
      type="button"
      class="btn w-32 border border-dark hover:bg-dark hover:text-white"
      @click="toggleEdit(false)"
    >
      取消
    </button>
    <button
      type="button"
      class="btn w-32 bg-primary text-white hover:bg-dark disabled:bg-dark-400"
      :disabled="!enableSubmit"
      @click="submitForm(tempMember)"
    >
      確認修改
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '../stores/memberStore'

const memberStore = useMemberStore()
const oldPassword = ref('')
const passwordCheck = ref('')
const { member, tempMember } = storeToRefs(memberStore)
const { UpdateMember } = memberStore

const isEdit = ref(false)

const memberName = computed({
  get: () => {
    return isEdit.value ? tempMember.value.name : member.value.name
  },
  set: (val) => {
    tempMember.value.name = val
  }
})

const memberEmail = computed({
  get: () => {
    return isEdit.value ? tempMember.value.email : member.value.email
  },
  set: (val) => {
    tempMember.value.email = val
  }
})

const enableSubmit = computed(() => {
  // 使用 json server auth 模擬，無法先確認原始密碼再允許修改
  const condition =
    tempMember.value.newPassword === '' ||
    (passwordCheck.value === tempMember.value.newPassword &&
      oldPassword.value !== tempMember.value.newPassword)
  return condition ? true : false
})

watch(
  member,
  () => {
    tempMember.value = { ...member.value }
    tempMember.value.newPassword = ''
  },
  { deep: true, immediate: true }
)

const toggleEdit = (status) => {
  isEdit.value = status
  oldPassword.value = ''
  tempMember.value.newPassword = ''
  passwordCheck.value = ''
}

const submitForm = async (member) => {
  let { name, email, newPassword: password, imageUrl } = member

  if (member.newPassword === '') {
    password = member.password
  }

  const user = { name, email, password, imageUrl }
  await UpdateMember(user)
  toggleEdit(false)
}
</script>

<style>
.form-input {
  @apply focus:border-primary focus:ring-primary read-only:focus:border-dark-600 read-only:focus:ring-0;
}
</style>
