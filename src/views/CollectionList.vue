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
          <ul class="grid grid-cols-2 lg:block mb-4 lg:mb-20">
            <li
              class="col-span-1"
              v-for="el in collectionList"
              :key="el.id"
              @click="selectedCategory(el.category)"
            >
              <router-link
                :to="{ query: { category: categoryList(el.category) } }"
                class="btn block text-center transition-all duration-300 w-full border-b border-x border-dark-400 px-2 py-3 lg:text-left lg:border-x-0"
                :class="{ selected: selectedOption === el.category }"
              >
                {{ `${categoryList(el.category)}(${el.data.length})` }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right Side -->
      <div class="col-span-9">
        <!-- <div class="mb-10 flex justify-between">
          <div>
            <svg class="inline mr-[15px] cursor-pointer" width="24px" height="24x" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#525252">
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              <g id="SVGRepo_iconCarrier"><title>三欄</title><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-104.000000, -935.000000)" fill="#525252"><path d="M128,935 L124,935 C121.791,935 120,936.791 120,939 L120,943 C120,945.209 121.791,947 124,947 L128,947 C130.209,947 132,945.209 132,943 L132,939 C132,936.791 130.209,935 128,935 L128,935 Z M128,951 L124,951 C121.791,951 120,952.791 120,955 L120,959 C120,961.209 121.791,963 124,963 L128,963 C130.209,963 132,961.209 132,959 L132,955 C132,952.791 130.209,951 128,951 L128,951 Z M112,951 L108,951 C105.791,951 104,952.791 104,955 L104,959 C104,961.209 105.791,963 108,963 L112,963 C114.209,963 116,961.209 116,959 L116,955 C116,952.791 114.209,951 112,951 L112,951 Z M112,935 L108,935 C105.791,935 104,936.791 104,939 L104,943 C104,945.209 105.791,947 108,947 L112,947 C114.209,947 116,945.209 116,943 L116,939 C116,936.791 114.209,935 112,935 L112,935 Z" id="grid" sketch:type="MSShapeGroup"></path></g></g></g>
            </svg>
            <svg class="inline cursor-pointer" fill="#525252" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="24px" height="24px" stroke="#525252" stroke-width="30.72">
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              <g id="SVGRepo_iconCarrier"><title>單欄</title> <g><g><path d="M0,0v512h512V0H0z M462.452,462.452H49.548V49.548h412.903V462.452z"/></g></g><g><g><rect x="305.548" y="99.097" width="66.065" height="313.806"/></g></g><g><g><rect x="140.387" y="99.097" width="66.065" height="313.806"/></g></g></g>
            </svg>
          </div>
          // 搜尋框
          <div class="w-3/4 relative">
            <input class="w-full" type="search" aria-label="Search" name="search" placeholder="請輸入產品名稱 、關鍵字">
            <button><i class="absolute right-14 top-3 fa-solid fa-magnifying-glass"></i></button>
            <button><i class="absolute right-0 top-0 fa-solid fa-filter text-white bg-black px-3 py-3"></i></button>
          </div>
        </div> -->
        <ul class="grid grid-cols-12 gap-4">
          <li
            v-for="item in selectedData"
            :key="item.id"
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
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectionStore } from '../stores/collectionStore'
import collectionConstant from '../utils/constant/collection/collection'
import CollectionBanner from '../components/collection/CollectionBanner.vue'
import PageComponent from '../components/layout/PageComponent.vue'
import CollectionListItem from '../components/collection/CollectionListItem.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'

const collectionStore = useCollectionStore()
const { pages } = storeToRefs(collectionStore)
const { turnPage } = collectionStore

const { category } = collectionConstant

const collectionList = reactive([
  {
    category: 0 // 全部
  },
  {
    category: 1, // 精選展品
    data: [
      {
        id: '1',
        collectionId: 'U001',
        title: '翠玉白菜',
        author: '不詳',
        time: '明末清初'
      },
      {
        id: '2',
        collectionId: 'U002',
        title: '肉形石',
        author: '不詳',
        time: '明末清初'
      },
      {
        id: '3',
        collectionId: 'U003',
        title: '銅熊尊',
        author: '不詳',
        time: '漢'
      },
      {
        id: '4',
        collectionId: 'U004',
        title: '玉熊尊',
        author: '乾隆',
        time: '清'
      },
      {
        id: '5',
        collectionId: 'U005',
        title: '玉辟邪',
        author: '不詳',
        time: '東漢'
      },
      {
        id: '6',
        collectionId: 'U006',
        title: '玉蟬',
        author: '不詳',
        time: '西漢'
      },
    ]
  },
  {
    category: 2, // 繪畫
    data: [
      {
        id: '1',
        collectionId: 'P001',
        title: '春山圖',
        author: '王原祁',
        time: '清'
      },
      {
        id: '2',
        collectionId: 'P002',
        title: '洛陽耆英會圖',
        author: '不詳',
        time: '宋'
      },
      {
        id: '3',
        collectionId: 'P003',
        title: '寶積賓伽羅佛像',
        author: '吳道子',
        time: '唐'
      },
      {
        id: '4',
        collectionId: 'P004',
        title: '洗馬圖',
        author: '韓幹',
        time: '唐'
      },
      {
        id: '5',
        collectionId: 'P005',
        title: '溪山秋色圖',
        author: '宋徽宗,趙佶',
        time: '宋'
      },
      {
        id: '6',
        collectionId: 'P006',
        title: '內人雙陸圖',
        author: '周昉',
        time: '唐'
      },
      {
        id: '7',
        collectionId: 'P007',
        title: '草堂十志圖',
        author: '盧鴻',
        time: '唐'
      },
      {
        id: '8',
        collectionId: 'P008',
        title: '護國天王像',
        author: '尉遲乙僧',
        time: '唐'
      },
      {
        id: '9',
        collectionId: 'P009',
        title: '人宮樂圖',
        author: '不詳',
        time: '唐'
      },
      {
        id: '10',
        collectionId: 'P010',
        title: '玉堂富貴圖',
        author: '徐熙',
        time: '五代十國'
      },
      {
        id: '11',
        collectionId: 'P011',
        title: '蓉雀',
        author: '徐熙',
        time: '五代南唐'
      },
      {
        id: '12',
        collectionId: 'P012',
        title: '顧德謙弄簫圖',
        author: '徐熙',
        time: '五代南唐'
      }
    ]
  },
  {
    category: 3, //器物
    data: [
      {
        id: '1',
        collectionId: 'B001',
        title: '白瓷劃花螭紋碟',
        author: '不詳',
        time: '西元12-13世紀'
      },
      {
        id: '2',
        collectionId: 'B002',
        title: '青花鬥彩蓮塘紋瓷碗',
        author: '不詳',
        time: '西元15-16世紀'
      },
      {
        id: '3',
        collectionId: 'B003',
        title: '藍地灑金星玻璃瓶',
        author: '不詳',
        time: '歐洲 十八世紀'
      }
    ]
  },
  {
    category: 4, // 硬幣古錢
    data: [
      {
        id: '1',
        collectionId: 'C001',
        title: '五銖錢',
        author: ' ',
        time: '西元502-557年 南朝梁'
      },
      {
        id: '2',
        collectionId: 'C002',
        title: '開元通寶',
        author: ' ',
        time: '唐高祖武德四年後'
      },
      {
        id: '3',
        collectionId: 'C003',
        title: '乾隆通寶',
        author: '',
        time: '清 乾隆'
      }
    ]
  },
  {
    category: 5, // 織品絲繡
    data: [
      {
        id: '1',
        collectionId: 'K001',
        title: '緙絲花鳥',
        author: '沈子蕃',
        time: '宋'
      },
      {
        id: '2',
        collectionId: 'K002',
        title: '緙絲寶生如來',
        author: '不詳',
        time: '宋'
      },
      {
        id: '3',
        collectionId: 'K003',
        title: '乾隆御製呦鹿等詠鹿詩 成扇',
        author: '彭元瑞',
        time: '清'
      }
    ]
  },
  {
    category: 6, // 其他文物
    data: [
      {
        id: '1',
        collectionId: 'T001',
        title: '畫柳枝山鳥 成扇',
        author: '邊景昭',
        time: '明末'
      },
      {
        id: '2',
        collectionId: 'T002',
        title: '珊瑚水盛珊瑚水盛',
        author: '不詳',
        time: '西元1644-1911年'
      },
      {
        id: '3',
        collectionId: 'T003',
        title: '隨身工具銅盒',
        author: '不詳',
        time: '十八世紀晚期'
      }
    ]
  }
])

collectionList[0].data = collectionList
  .filter((item) => item.category !== category.ALL)
  .flatMap((el) => el.data)

const categoryList = (type) => {
  switch (type) {
    case category.ALL:
      return '全部'
    case category.MASTERPIECES:
      return '精選展品'
    case category.PAINTING:
      return '繪畫'
    case category.JADE:
      return '器物'
    case category.COIN:
      return '硬幣古錢'
    case category.KNIT:
      return '織品絲繡'
    case category.OTHER:
      return '其他文物'
  }
}

const selectedOption = ref('')
const selectedData = ref([])
const selectedCategory = (option) => {
  selectedOption.value = option
  selectedData.value = collectionList.find((item) => item.category === selectedOption.value).data
}
selectedCategory(2)
</script>

<style scoped>
.selected {
  @apply bg-primary text-white;
}
.hover-style {
  @apply opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-1000 group-hover:ease-in-out;
}
</style>
