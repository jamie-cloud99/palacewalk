<template>
  <div
    class="bg-image bg-dark text-white bg-center w-full max-w-[450px] xl:max-w-[500px] h-full overflow-hidden after:bg-dark"
  >
    <div class="relative z-10 py-10 px-6 lg:px-14">
      <div class="flex justify-between">
        <p class="text-4xl font-bold mb-4">01</p>
        <button
          type="button"
          @click="toggleSideMenu('collectionText')"
          class="btn w-12 h-12 bg-white text-dark bg-[url('/images/exhibitions/text-bg.webp')] border-2 border-dark hover:bg-white/70"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <h2 class="text-4xl font-bold mb-6">清 翠玉白菜</h2>
      <div
        class="max-h-[600px] lg:max-h-[350px] scrollbar-thin scrollbar-thumb-dark-200 scrollbar-track-rounded scrollbar-thumb-rounded overflow-y-scroll leading-7 space-y-4"
      >
        <p>
          這件與真實白菜相似度幾乎百分百的作品，是由翠玉所琢碾而成，親切的題材、潔白的菜身與翠綠的葉子，都讓人感覺十分熟悉而親近，別忘了看看菜葉上停留的兩隻昆蟲，它們可是寓意多子多孫的螽斯和蝗蟲。
        </p>
        <p>
          此件作品原置於紫禁城的永和宮，永和宮為光緒皇帝妃子瑾妃的寢宮，因此有人推測此器為瑾妃的嫁妝象徵其清白，並企求多子多孫。雖說翠玉這個材質與白菜造型始風行於清中晚期，白菜與草蟲的題材在元到明初的職業草蟲畫中，屢見不鮮，一直是受民間歡迎的吉祥題材。
        </p>
        <p>
          除此之外，包心葉類的蔬菜也曾被唐代的詩人杜甫用來作為政治環境惡劣、懷才不遇的隱喻，在文人畫的傳統中，亦被引用來作為繪畫的主題，以表述類似的心情，暗諫為政者的昏庸。
        </p>
        <p>
          在乾隆四十年（1775）的一首名為＜題和闐玉鏤霜松花插＞的御製詩中，作為帝王的清高宗，從以包心葉菜為造型的花插，聯想到以杜甫詩中園吏不識嘉蔬之隱喻為藝諫的傳統，而有所警惕；詩云：「和闐產玉來既夥，吳匠相材製器妥。仿古熟乃出新奇，風氣增華若何可，菜葉離披菜根卷，心其中空口其侈。插花雅合是菜花，緋桃雪梨羞婀娜，民無此色庶云佳，藝諫或斯默喻我」。
        </p>
        <p>
          不過相信無論是此位宮廷作坊中的工匠，或是製作翠玉白菜的玉匠，都只是發揮創意、巧藝，為順應贊助者喜好而創作，但是由於並未留下相關的資料記載，也留給觀者更多想像的空間。
        </p>

        <div class="py-3 pr-3">
          <img class="w-full h-auto" src="/images/collection/collection-U001.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStatusStore } from '../../stores/statusStore.js'

const statusStore = useStatusStore()
const { toggleSideMenu } = statusStore
</script>

<style scoped>
.bg-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../images/exhibitions/text-bg.webp');
}
</style>
