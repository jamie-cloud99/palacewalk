<template>
  <CollectionBanner :title="'精選目錄'" />

  <!-- * 加入格線系統 & 格線與內容分離 -->
  <div class="container">
    <div class="lg:grid grid-cols-12 gap-6">
      <div class="col-span-3">
        <div class="text-lg font-semibold">
          <h3 class="flex flex-col border-b border-dark">
            展品類別
            <span class="font-cormo text-2xl">CATEGORY</span>
          </h3>
          <ul class="grid grid-cols-2 lg:block mb-4 lg:mb-20">
            <li
              class="col-span-1"
              v-for="el in collectionList"
              :key="el.collectionId"
              @click="selectedCategory(el.category)"
            >
              <!-- * 因為網頁文字行高比設計稿大， 所以會相應減少 padding -->
              <button
                type="button"
                class="btn block text-center transition-all duration-300 w-full border-b border-x border-dark-400 px-2 py-3 lg:text-left lg:border-x-0"
                :class="{ 'bg-primary text-white': selectedOption === el.category }"
              >
                {{ `${categoryList(el.category)}(${el.data.length})` }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-9">
        <!-- * 減少清單項目的間距，跟側邊選單作出分隔 -->
        <ul class="grid grid-cols-12 gap-4">
          <li
            v-for="item in selectionData"
            :key="item.id"
            class="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <!-- * 元件跟格線分離 -->
            <TestComponent :collection-item="item" />
          </li>
        </ul>
        <div class="flex py-10 lg:py-15">
          <PageComponent :pages="pages" @change="turnPage" />
        </div>
      </div>
    </div>
  </div>

  <!-- * background：改成絕對定位、固定高度；修改路徑 -->
  <div
    class="absolute -z-10 top-[600px] bg-[url('../images/page-bg.svg')] bg-[position:left_-5rem_top] bg-no-repeat h-[800px] w-full"
  ></div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectionStore } from '../stores/collectionStore'
import collectionConstant from '../utils/constant/collection/collection'
import CollectionBanner from '../components/collection/CollectionBanner.vue'
import PageComponent from '../components/layout/PageComponent.vue'
import TestComponent from './TestComponent.vue'

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
      }
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
        collectionId: 'A001',
        title: '白瓷劃花螭紋碟',
        author: '不詳',
        time: '西元12-13世紀'
      },
      {
        id: '2',
        collectionId: 'A002',
        title: '青花鬥彩蓮塘紋瓷碗',
        author: '不詳',
        time: '西元1522-1566年'
      },
      {
        id: '3',
        collectionId: 'A003',
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
        title: '人丹楓呦鹿',
        author: '不詳',
        time: '五代'
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

let total = ref(0)
collectionList[0].data = collectionList
  .filter((item) => item.category !== 0)
  .flatMap((el) => el.data)
total.value = collectionList[0].data.length

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
let selectionData = reactive([])
const selectedCategory = (option) => {
  selectedOption.value = option
  selectionData = collectionList.find((item) => item.category === selectedOption.value).data
  return { selectionData, selectedOption }
}
selectedCategory(2)
</script>
