<template>
	<div
		class="h-[260px] bg-no-repeat bg-[url('/images/exhibitions/exhibition-banner.png'),_url('/images/exhibitions/page-banner1-1.jpg')] bg-[position:82%_18px,_center_bottom] xs:bg-[size:200px,_cover] lg:bg-[size:244px,_cover]">
		<div class="container relative text-white">
			<h2 class="absolute top-[115px] text-3xl font-serif font-bold px-2 drop-shadow-md">
				{{ bannerContent.title }}
			</h2>
			<BreadcrumbsComponent class="absolute top-[228px]" :nav-list="bannerContent.breadList" />
		</div>
	</div>
</template>

<script setup>
import { toRefs } from 'vue'
import BreadcrumbsComponent from '../layout/BreadcrumbsComponent.vue'

const props = defineProps({
	bannerContent: Object
})

const { bannerContent } = toRefs(props)
</script>
