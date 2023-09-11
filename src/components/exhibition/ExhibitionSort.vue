<template>
	<h4 class="text-lg font-semibold">展覽</h4>
	<h3 class="text-2xl font-semibold mb-1 leading-8">EXHIBITS</h3>
	<hr class="border-black" />
	<ul class="mb-[54px]">
		<li v-for="item in menuContent" :key="item.title" >
			<router-link :to="item.path" class="sort-item">
				{{ item.title }}
			</router-link>
		</li>
	</ul>
	<h4 class="text-lg font-semibold">檢索</h4>
	<h3 class="text-2xl font-semibold mb-1 leading-8">SEARCH</h3>
	<ul>
		<li class="mb-3 relative">
			<input type="text" id="search" class="search-input" placeholder="展覽檢索" />
			<a href="#"><i class="fa-solid fa-magnifying-glass input-icon"></i>
			</a>
		</li>
		<li class="relative xs:mb-3">
			<input type="text" id="search" class="search-input" placeholder="請選擇類別" />
			<a href="#"><i class="fa-solid fa-chevron-down input-icon"></i>
			</a>
		</li>
	</ul>
</template>

<script setup>
import { reactive } from 'vue'

const menuContent = reactive([
	{
		title: '當期展覽',
		path: '/exhibitions/?="當期展覽"'
	},
	{
		title: '近期展覽',
		path: '/exhibitions/?="近期展覽"'
	}
])

</script>

<style>
.sort-item {
	@apply block px-2.5 py-4 leading-5 text-lg border-b border-dark-400;
}
.sort-item.active{
	@apply bg-primary text-white;
}

.search-input {
	@apply form-input border-dark-800 w-full py-3 pl-[12px] pr-12 placeholder:text-dark-600;
}

.input-icon {
	@apply absolute top-1/2 transform -translate-y-1/2 right-2.5;
}
</style>