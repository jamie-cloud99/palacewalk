<template>
  <VForm v-slot="{ errors, isSubmitting, meta }" ref="formMember">
    <div class="lg:grid grid-cols-9 gap-6 mb-8 lg:mb-10">
      <div class="col-span-4" :class="{ 'order-2': isEdit }">
        <div class="flex flex-col items-center bg-dark-200 pt-10 lg:pt-14 pb-10 font-semibold">
          <p v-if="isEdit" class="text-center mb-4">更換大頭貼</p>
          <img
            :src="memberPhoto"
            alt=""
            class="block mb-4 w-32 h-32 rounded-full object-cover"
            referrerpolicy="no-referrer"
          />

          <p class="mb-6 text-xl" :class="{ '!mb-16': !isEdit }">{{ memberName }}</p>
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
          <label
            v-else
            for="photo"
            class="btn w-32 border border-dark hover:bg-dark hover:text-white"
            ><input
              type="file"
              id="photo"
              ref="fileInput"
              @change="uploadImage(newPhoto)"
              class="hidden"
            />上傳圖片
          </label>
        </div>
      </div>
      <div class="col-span-5">
        <div class="pt-5 font-medium">
          <div class="mb-4 lg:mb-6">
            <label for="name" class="block font-semibold mb-2 lg:mb-4">顯示暱稱</label>
            <VField
              v-model.trim="memberName"
              id="name"
              type="text"
              placeholder="請輸入新暱稱"
              label="暱稱"
              name="name"
              rules="required"
              class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
              :class="{ 'bg-dark-200 !border-0 is-invalid': errors['name'] }"
              :readonly="!isEdit"
            />
            <ErrorMessage as="div" name="name" class="form-error" v-slot="{ message }">
              <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
              <span>{{ message }}</span>
            </ErrorMessage>
          </div>
          <div class="mb-4 lg:mb-6">
            <label for="email" class="block font-semibold mb-2 lg:mb-4"> 會員信箱</label>
            <VField
              v-model.trim="memberEmail"
              type="email"
              id="account"
              placeholder="請輸入新信箱"
              name="email"
              rules="email|required"
              class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
              :class="{ 'bg-dark-200 !border-0 is-invalid': errors['email'] }"
              :readonly="!isEdit"
            />
            <ErrorMessage as="div" name="email" class="form-error" v-slot="{ message }">
              <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
              <span>{{ message }}</span>
            </ErrorMessage>
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
              <VField
                v-model.trim="tempMember.newPassword"
                id="password-new"
                type="password"
                placeholder="請輸入新密碼"
                label="新密碼"
                name="password-new"
                :rules="updatePassword"
                class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
                :class="{
                  'bg-dark-200 !border-0': !tempMember.newPassword,
                  ' is-invalid': errors['password-new']
                }"
              />
              <ErrorMessage as="div" name="password-new" class="form-error" v-slot="{ message }">
                <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
                <span>{{ message }}</span>
              </ErrorMessage>
            </div>
            <div class="mb-4 lg:mb-6">
              <label for="password-check" class="block mb-2 lg:mb-4">確認變更密碼</label>
              <VField
                v-model.trim="passwordCheck"
                id="password-check"
                type="password"
                placeholder="請再次輸入新密碼"
                label="確認密碼"
                name="password-check"
                :rules="checkPassword"
                class="form-input border-dark-600 w-full py-3 px-4 placeholder:text-dark-600"
                :class="{
                  'bg-dark-200 !border-0': !passwordCheck,
                  ' is-invalid': errors['password']
                }"
              />
              <ErrorMessage as="div" name="password-check" class="form-error" v-slot="{ message }">
                <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
                <span>{{ message }}</span>
              </ErrorMessage>
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
        :disabled="!enableSubmit || isSubmitting || !(meta.valid && meta.touched)"
        @click="submitForm(tempMember)"
      >
        確認修改
      </button>
    </div>
  </VForm>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/memberStore'
import { passwordRules } from '@/utils/useValidation'

const memberStore = useMemberStore()
const oldPassword = ref('')
const passwordCheck = ref('')
const { member, tempMember } = storeToRefs(memberStore)
const { UpdateMember } = memberStore

const isEdit = ref(false)
const fileInput = ref(null)

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

const memberPhoto = computed({
  get: () => {
    return isEdit.value ? tempMember.value.imageUrl : member.value.imageUrl
  },
  set: (val) => {
    tempMember.value.imageUrl = val
  }
})

const enableSubmit = computed(() => {
  // 使用 json server auth 模擬，無法先確認原始密碼再允許修改
  const condition =
    tempMember.value.newPassword === '' ||
    (passwordCheck.value === tempMember.value.newPassword &&
      oldPassword.value !== tempMember.value.newPassword &&
      oldPassword.value)
  return condition ? true : false
})

const newPhoto = computed(() => fileInput.value.files[0])

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

const updatePassword = (password) => {
  if (!tempMember.value.newPassword) return true
  return passwordRules(password)
}

const checkPassword = (password) => {
  if (!tempMember.value.newPassword) return true
  else if (!password) return '確認密碼 為必填'
  return password === tempMember.value.newPassword ? true : '兩次密碼輸入不同，請重新確認'
}

const uploadImage = (imgFile) => {
  if (imgFile) {
    const reader = new FileReader()
    reader.readAsDataURL(imgFile)
    reader.addEventListener('load', () => {
      memberPhoto.value = reader.result
    })
  }
}
</script>
