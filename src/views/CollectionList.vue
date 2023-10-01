<template>
  <CollectionBanner :title="'展品目錄'" />
  <!-- TODO: router-view, other category(except painting) layout -->
  <div class="container">
    <div class="lg:grid grid-cols-12 gap-6">
      <!-- Left Side -->
      <div class="col-span-3">
        <div class="text-lg font-semibold">
          <p class="flex flex-col border-b border-dark">
            展品類別
            <span class="font-cormo text-2xl">CATEGORY</span>
          </p>
          <div class="mb-6 lg:mb-20">
            <SideMenu
              :menu="categoryList"
              :selectedOption="curCategory"
              @select-item="selectCategory"
            />
          </div>
        </div>
      </div>
      <!-- Right Side -->
      <div class="col-span-9">
        <ul class="grid grid-cols-12 gap-4">
          <li
            v-for="item in collectionList"
            :key="item.collectionId"
            class="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <CollectionListItem :collection-item="item" />
          </li>
        </ul>
        <div class="flex py-10 lg:py-15">
          <PageComponent :pages="pages" @change="turnPage" />
        </div>
      </div>
    </div>
  </div>
  <BackgroundComponent />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCollectionStore } from '../stores/collectionStore'
import SideMenu from '../components/layout/SideMenu.vue'
import CollectionBanner from '../components/collection/CollectionBanner.vue'
import PageComponent from '../components/layout/PageComponent.vue'
import CollectionListItem from '../components/collection/CollectionListItem.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'
import { watch } from 'vue'

const collectionStore = useCollectionStore()
const { pages, collectionList, categoryList, curCategory, route } = storeToRefs(collectionStore)
const { turnPage, fetchPageCollections, fetchCategoryList, selectCategory } = collectionStore

const updateCurCategory = () => {
  if(route.value?.query?.length) {
      curCategory.value = categoryList.value.find(category => category.title === route.value.query.category)
    }
}

watch(
  () => route,
  async () => {
    await fetchCategoryList()
    updateCurCategory()
  },
  {deep: true, immediate:true}
)



fetchPageCollections()

// import { ref, reactive } from 'vue'
// import collectionConstant from '../utils/constant/collection/collection'
// const { category } = collectionConstant

// const collectionList = reactive([
//   {
//     category: 0 // 全部
//   },
//   {
//     category: 1, // 精選展品
//     data: [
//       {
//         id: '1',
//         collectionId: 'U001',
//         title: '翠玉白菜',
//         author: '不詳',
//         time: '明末清初'
//       },
//       {
//         id: '2',
//         collectionId: 'U002',
//         title: '肉形石',
//         author: '不詳',
//         time: '明末清初'
//       },
//       {
//         id: '3',
//         collectionId: 'U003',
//         title: '銅熊尊',
//         author: '不詳',
//         time: '漢'
//       },
//       {
//         id: '4',
//         collectionId: 'U004',
//         title: '玉熊尊',
//         author: '乾隆',
//         time: '清'
//       },
//       {
//         id: '5',
//         collectionId: 'U005',
//         title: '玉辟邪',
//         author: '不詳',
//         time: '東漢'
//       },
//       {
//         id: '6',
//         collectionId: 'U006',
//         title: '玉蟬',
//         author: '不詳',
//         time: '西漢'
//       },
//     ]
//   },
//   {
//     category: 2, // 繪畫
//     data: [
//       {
//         id: '1',
//         collectionId: 'P024',
//         title: '秋山疊翠 軸',
//         author: '朱叔重',
//         time: '元'
//       },
//       {
//         id: '2',
//         collectionId: 'P002',
//         title: '洛陽耆英會圖',
//         author: '不詳',
//         time: '宋'
//       },
//       {
//         id: '3',
//         collectionId: 'P003',
//         title: '寶積賓伽羅佛像',
//         author: '吳道子',
//         time: '唐'
//       },
//       {
//         id: '4',
//         collectionId: 'P004',
//         title: '洗馬圖',
//         author: '韓幹',
//         time: '唐'
//       },
//       {
//         id: '5',
//         collectionId: 'P005',
//         title: '溪山秋色圖',
//         author: '宋徽宗,趙佶',
//         time: '宋'
//       },
//       {
//         id: '6',
//         collectionId: 'P006',
//         title: '內人雙陸圖',
//         author: '周昉',
//         time: '唐'
//       },
//       {
//         id: '7',
//         collectionId: 'P007',
//         title: '草堂十志圖',
//         author: '盧鴻',
//         time: '唐'
//       },
//       {
//         id: '8',
//         collectionId: 'P008',
//         title: '護國天王像',
//         author: '尉遲乙僧',
//         time: '唐'
//       },
//       {
//         id: '9',
//         collectionId: 'P009',
//         title: '人宮樂圖',
//         author: '不詳',
//         time: '唐'
//       },
//       {
//         id: '10',
//         collectionId: 'P010',
//         title: '玉堂富貴圖',
//         author: '徐熙',
//         time: '五代十國'
//       },
//       {
//         id: '11',
//         collectionId: 'P011',
//         title: '蓉雀',
//         author: '徐熙',
//         time: '五代南唐'
//       },
//       {
//         id: '12',
//         collectionId: 'P012',
//         title: '顧德謙弄簫圖',
//         author: '徐熙',
//         time: '五代南唐'
//       }
//     ]
//   },
//   {
//     category: 3, //器物
//     data: [
//       {
//         id: '1',
//         collectionId: 'B001',
//         title: '白瓷劃花螭紋碟',
//         author: '不詳',
//         time: '西元12-13世紀'
//       },
//       {
//         id: '2',
//         collectionId: 'B002',
//         title: '青花鬥彩蓮塘紋瓷碗',
//         author: '不詳',
//         time: '西元15-16世紀'
//       },
//       {
//         id: '3',
//         collectionId: 'B003',
//         title: '藍地灑金星玻璃瓶',
//         author: '不詳',
//         time: '歐洲 十八世紀'
//       }
//     ]
//   },
//   {
//     category: 4, // 硬幣古錢
//     data: [
//       {
//         id: '1',
//         collectionId: 'C001',
//         title: '五銖錢',
//         author: ' ',
//         time: '西元502-557年 南朝梁'
//       },
//       {
//         id: '2',
//         collectionId: 'C002',
//         title: '開元通寶',
//         author: ' ',
//         time: '唐高祖武德四年後'
//       },
//       {
//         id: '3',
//         collectionId: 'C003',
//         title: '乾隆通寶',
//         author: '',
//         time: '清 乾隆'
//       }
//     ]
//   },
//   {
//     category: 5, // 織品絲繡
//     data: [
//       {
//         id: '1',
//         collectionId: 'K001',
//         title: '緙絲花鳥',
//         author: '沈子蕃',
//         time: '宋'
//       },
//       {
//         id: '2',
//         collectionId: 'K002',
//         title: '緙絲寶生如來',
//         author: '不詳',
//         time: '宋'
//       },
//       {
//         id: '3',
//         collectionId: 'K003',
//         title: '乾隆御製呦鹿等詠鹿詩 成扇',
//         author: '彭元瑞',
//         time: '清'
//       }
//     ]
//   },
//   {
//     category: 6, // 其他文物
//     data: [
//       {
//         id: '1',
//         collectionId: 'T001',
//         title: '畫柳枝山鳥 成扇',
//         author: '邊景昭',
//         time: '明末'
//       },
//       {
//         id: '2',
//         collectionId: 'T002',
//         title: '珊瑚水盛珊瑚水盛',
//         author: '不詳',
//         time: '西元1644-1911年'
//       },
//       {
//         id: '3',
//         collectionId: 'T003',
//         title: '隨身工具銅盒',
//         author: '不詳',
//         time: '十八世紀晚期'
//       }
//     ]
//   }
// ])

// collectionList[0].data = collectionList
//   .filter((item) => item.category !== category.ALL)
//   .flatMap((el) => el.data)

// const categoryList = (type) => {
//   switch (type) {
//     case category.ALL:
//       return '全部'
//     case category.MASTERPIECES:
//       return '精選展品'
//     case category.PAINTING:
//       return '繪畫'
//     case category.JADE:
//       return '器物'
//     case category.COIN:
//       return '硬幣古錢'
//     case category.KNIT:
//       return '織品絲繡'
//     case category.OTHER:
//       return '其他文物'
//   }
// }

// const selectedOption = ref('')
// const selectedData = ref([])
// const selectedCategory = (option) => {
//   selectedOption.value = option
//   selectedData.value = collectionList.find((item) => item.category === selectedOption.value).data
// }
// selectedCategory(2)
</script>

<style scoped>
.selected {
  @apply bg-primary text-white;
}
.hover-style {
  @apply opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-1000 group-hover:ease-in-out;
}
</style>
