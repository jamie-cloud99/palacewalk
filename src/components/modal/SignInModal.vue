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
              class="w-full text-2xl font-bold py-6 hover:bg-black/20"
              :class="{ 'bg-black text-white hover:!bg-black': hasAccount }"
            >
              登入
            </button>
          </div>
          <div class="col-span-1">
            <button
              type="button"
              @click="changeForm(false)"
              class="w-full text-2xl font-bold py-6 hover:bg-black/20"
              :class="{ 'bg-black text-white hover:!bg-black': !hasAccount }"
            >
              註冊
            </button>
          </div>
        </div>
        <VForm v-slot="{ errors, isSubmitting, meta }" ref="formLogIn">
          <div
            v-if="hasAccount"
            class="overflow-y-auto scrollbar-hidden max-h-[300px] px-8 py-4 lg:py-6"
            data-te-modal-body-ref
          >
            <h5 class="mb-4 text-center text-xl font-semibold">會員登入，入宮暢行最自在</h5>

            <div class="mb-4">
              <label for="account" class="block mb-2">帳號</label>
              <VField
                v-model.trim="tempMember.email"
                type="email"
                id="account"
                placeholder="請輸入信箱"
                class="form-input w-full"
                name="email"
                rules="email|required"
                :class="{ 'is-invalid': errors['email'] }"
              />
              <ErrorMessage as="div" name="email" class="form-error" v-slot="{ message }">
                <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
                <span>{{ message }}</span>
              </ErrorMessage>
            </div>
            <div class="mb-4">
              <label for="password" class="block mb-2">密碼</label>
              <VField
                v-model.trim="tempMember.password"
                id="password"
                type="password"
                placeholder="請輸入密碼"
                label="密碼"
                name="password"
                :rules="passwordRules"
                class="form-input w-full"
                :class="{ 'is-invalid': errors['password'] }"
              />
              <ErrorMessage as="div" name="password" class="form-error" v-slot="{ message }">
                <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
                <span>{{ message }}</span>
              </ErrorMessage>
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
              <VField
                v-model.trim="tempMember.name"
                id="name"
                type="text"
                placeholder="請輸入暱稱"
                label="暱稱"
                name="name"
                rules="required"
                class="form-input w-full"
                :class="{ 'is-invalid': errors['name'] }"
              />
              <ErrorMessage as="div" name="name" class="form-error" v-slot="{ message }">
                <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
                <span>{{ message }}</span>
              </ErrorMessage>
            </div>
            <div class="mb-4">
              <label for="account" class="block mb-2">帳號</label>
              <VField
                v-model.trim="tempMember.email"
                type="email"
                id="account"
                placeholder="請輸入信箱"
                class="form-input w-full"
                name="email"
                rules="email|required"
                :class="{ 'is-invalid': errors['email'] }"
              />
              <ErrorMessage as="div" name="email" class="form-error" v-slot="{ message }">
                <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
                <span>{{ message }}</span>
              </ErrorMessage>
            </div>
            <div class="mb-4">
              <label for="password" class="block mb-2">密碼</label>
              <VField
                v-model.trim="tempMember.password"
                id="password"
                type="password"
                placeholder="請輸入密碼"
                label="密碼"
                name="password"
                :rules="passwordRules"
                class="form-input w-full"
                :class="{ 'is-invalid': errors['password'] }"
              />
              <ErrorMessage as="div" name="password" class="form-error" v-slot="{ message }">
                <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
                <span>{{ message }}</span>
              </ErrorMessage>
            </div>
            <div class="mb-4">
              <label for="password-check" class="block mb-2">確認密碼</label>
              <VField
                v-model.trim="checkedPassword"
                id="password-check"
                type="password"
                placeholder="請再次輸入密碼"
                label="確認密碼"
                name="password-check"
                :rules="checkPassword"
                class="form-input w-full"
                :class="{ 'is-invalid': errors['password'] }"
              />
              <ErrorMessage as="div" name="password-check" class="form-error" v-slot="{ message }">
                <span class="mr-1"><i class="fa-solid fa-circle-exclamation"></i></span>
                <span>{{ message }}</span>
              </ErrorMessage>
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
              type="submit"
              class="btn w-24 bg-primary text-white hover:bg-dark disabled:bg-primary/50 disabled:cursor-not-allowed"
              :disabled="isSubmitting || !(meta.valid && meta.touched)"
              @click="logInMember(tempMember)"
            >
              登入
            </button>
            <button
              v-else
              type="submit"
              class="btn w-24 bg-primary text-white hover:bg-dark disabled:bg-primary/50 disabled:cursor-not-allowed"
              :disabled="isSubmitting || !(meta.valid && meta.touched)"
              @click="registerMember(tempMember)"
            >
              註冊
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal, initTE } from 'tw-elements'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/memberStore'
import { storeToRefs } from 'pinia'

const modal = ref(null)
const curModal = ref(null)
const hasAccount = ref(true)
const memberStore = useMemberStore()
const { tempMember } = storeToRefs(memberStore)
const { signUp, logIn } = memberStore
const checkedPassword = ref('')
const formLogIn = ref(null)
const router = useRouter()

defineExpose({
  curModal
})

const closeModal = () => {
  formLogIn.value.resetForm()
  curModal.value.hide()
}

const changeForm = (status) => {
  hasAccount.value = status
  tempMember.value = {}
}

const logInMember = async (member) => {
  const account = { email: member.email, password: member.password }
  curModal.value.hide()
  await logIn(account)
  router.go(0)
}

const registerMember = async (member) => {
  const data = {
    ...member,
    imageUrl:
      'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
  }

  curModal.value.hide()
  await signUp(data)
  router.go(0)
}

const passwordRules = (password) => {
  if (!password) return '密碼 為必填'
  const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/
  return regex.test(password) ? true : '密碼 6 位數以上，須包含至少一個數字和一個英文字母'
}

const checkPassword = (password) => {
  if (!password) return '確認密碼 為必填'
  return password === tempMember.value.password ? true : '兩次密碼輸入不同，請重新確認'
}

initTE({ Modal })

onMounted(() => {
  curModal.value = new Modal(modal.value)
})
</script>
