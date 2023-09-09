<template>
  <div class="container flex flex-col">
    <div>
      <h1 class="font-bold text-[32px]">我的展覽</h1>
    </div> 
    <h2 class="text-[20px] leading-[28px] mb-[30px]">故宮走走，讓你成為自己的策展家</h2>
    <p class="text-[20px] leading-[28px] border-y-2 border-black py-[10px]">利用故宮的珍貴展品，結合你的獨特視角，打造屬於自己的展覽。翻閱千年文物，選擇你心儀的藝術品，並按照自己的喜好、主題或故事串聯起來，營造出一場獨一無二的展覽體驗。</p>
    <div class="flex justify-between pt-[32px] pb-[42px]">
      <div class="flex gap-[25px]">
        <div class="filterBtn-active btn">全部</div>
        <div class="filterBtn btn">未上架</div>
        <div class="filterBtn btn">已上架</div>
        <div class="filterBtn btn">已上架</div>
      </div>
      <div class="btn bg-black text-white">新增展覽</div>
    </div>
    <div class="flex flex-col gap-[42px] pb-[64px]">
      <div class="flex gap-[26px] h-[200px] shadow-[0_4px_10px_4px_rgba(0,0,0,0.10)]">
        <div class="flex w-100 h-[200px]">
          <img src="./../../../images/curating/exPage1.png" alt="" />
        </div>
        <div class="flex flex-col justify-between w-100 py-[24px] px-[26px]">
           <div>
            <p class="text-[24px] mb-[8px] text-[#B87107]">風格故事—琺瑯彩瓷特展</p>
            <p class="text-[#525252]">2023/07/07 - 2024/07/16</p>
          </div>
          <div class="flex gap-[20px]">
            <div class="btn text-white bg-[#E43B30]">查看留言</div>
            <div class="btn border border-black">前往展覽</div>
          </div>
        </div>
      </div>

      <div class="flex gap-[26px] h-[200px] shadow-[0_4px_10px_4px_rgba(0,0,0,0.10)]">
        <div class="flex w-100 h-[200px]">
          <img src="./../../../images/curating/exPage1.png" alt="" />
        </div>
        <div class="flex flex-col justify-between w-100 py-[24px] px-[26px]">
           <div>
            <p class="text-[24px] mb-[8px] text-[#B87107]">風格故事—琺瑯彩瓷特展</p>
            <p class="text-[#525252]">2023/07/07 - 2024/07/16</p>
          </div>
          <div class="flex gap-[20px]">
            <div class="btn text-white bg-[#E43B30]">查看留言</div>
            <div class="btn border border-black">前往展覽</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>