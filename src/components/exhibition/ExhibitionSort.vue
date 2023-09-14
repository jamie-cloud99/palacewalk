<template>
	<h4 class="text-lg font-semibold">展覽</h4>
	<h3 class="text-2xl font-semibold mb-1 leading-8">EXHIBITS</h3>
	<hr class="border-black" />
	<ul class="flex lg:block mb-[24px] lg:mb-[56px]">
		<SortList
			:menu="menuContent"
			:selectedOption="curMenuItem"
			@select-item="changeMenuItem"
		></SortList>
	</ul>
	<div class="hidden lg:block">
		<h4 class="text-lg font-semibold">檢索</h4>
		<h3 class="text-2xl font-semibold mb-1 leading-8">SEARCH</h3>
		<ul>
			<li class="mb-3 relative">
				<input type="text" id="search" class="search-input" placeholder="展覽檢索" />
				<a href="#"><i class="fa-solid fa-magnifying-glass input-icon"></i>
				</a>
			</li>
			<li class="relative xs:mb-3"> 
				<select name="" id="search" class="form-select search-input">
					<option class="text-dark-600" value="" disabled selected>請選擇類別</option>
					<option class="text-dark" value="">藝術</option>
					<option class="text-dark" value="">文物</option>
					<option class="text-dark" value="">綜合</option>
				</select>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SortList from '../layout/SortList.vue'

const route = useRoute()
const router = useRouter()

const menuContent = reactive([
{
    code: 'recent',
    title: '當期展覽'
  },
  {
    code: 'coming',
    title: '近期展覽'
  }
])

const curMenuItem = ref(menuContent[0])
const changeMenuItem = (item) => {
  curMenuItem.value = item
  router.push({ path: `${route.path}`, query: { period: item.title } })
}

</script>

<style>
.sort-item {
	@apply block px-2.5 py-4 leading-5 text-lg border-b border-dark-400;
}
.sort-item.selected{
	@apply bg-primary text-white;
}

.search-input {
	@apply form-input border-dark-800 w-full py-3 pl-[12px] pr-12 placeholder:text-dark-600;
}

.input-icon {
	@apply absolute top-1/2 transform -translate-y-1/2 right-2.5;
}
</style>