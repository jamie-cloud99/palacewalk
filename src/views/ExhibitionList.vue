<template>
	<div class="mb-6 lg:mb-[68px]">
		<ExhibitionBanner :banner-content="curBannerContent" />
	</div>
	<div class="bg-[url('/images/page-bg.svg')] bg-[position:0_216px,_left_top] bg-no-repeat">
		<div class="container mb-[60px]">
			<div class="lg:grid grid-cols-12 gap-x-12">
				<div class="col-span-3">
					<ExhibitionSort 
						:menu="menuContent" 
						:selectedOption="curMenuItem" 
						@select-item="changeMenuItem" 
					/>
				</div>
				<div class="col-span-9">
					<ul class="flex flex-wrap mb-20 gap-6 overflow-hidden lg:grid grid-cols-12">
						<li v-for="item in exhibitList" :key="item.id" class="col-span-12 md:col-span-6">
							<ExhibitionListItem :exhibition-item="item" />
						</li>
					</ul>
					<!-- <PageComponent :pages="pages" @change="turnPage" /> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ExhibitionBanner from '../components/exhibition/ExhibitionBanner.vue'
import ExhibitionSort from '../components/exhibition/ExhibitionSort.vue'
import ExhibitionListItem from '../components/exhibition/ExhibitionListItem.vue'

const route = useRoute()
const router = useRouter()

const breadList = reactive([
	{
		title: '首頁',
		path: '/'
	},
	{
		title: '展覽空間',
		path: '/exhibitions'
	},
	{
		title: '當期展覽',
		path: '/exhibitions'
	}
])
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
const curBannerContent = computed(() => {
	return { title: `展覽空間 — ${curMenuItem.value.title}`, breadList }
})

const changeMenuItem = (item) => {
	curMenuItem.value = item
	breadList[breadList.length - 1].title = item.title
	router.push({ path: `${route.path}`, query: { period: item.title } })
}
const exhibitList = ref([
	{
		id: '1',
		exhibitionId: 'U001',
		title: '士拿乎—清宮鼻煙壺的時尚風潮',
		startDate: '2023.6.20',
		endDate: '2024.3.28',
	},
	{
		id: '2',
		exhibitionId: 'U002',
		title: '風格故事—琺瑯彩瓷特展 ',
		startDate: '2023.7.7',
		endDate: '2024.7.16',
	},
	{
		id: '3',
		exhibitionId: 'U003',
		title: '故宮經典-藝術與文化策展',
		startDate: '2023.6.20',
		endDate: '2024.3.28',
	},
	{
		id: '4',
		exhibitionId: 'U004',
		title: '繽彩燒窯—開光雙連瓶藝術展',
		startDate: '2023.6.24',
		endDate: '2024.5.28',
	},
	{
		id: '5',
		exhibitionId: 'U005',
		title: '釉瓷之美：太平有象瓷尊特展',
		startDate: '2023.5.20',
		endDate: '2024.8.19',
	}
])
</script>