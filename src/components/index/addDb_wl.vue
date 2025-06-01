<script>
import wlbox from '../head/wlbox.vue';
import { chainArr,chainDefaultAssetMap } from "@/bbjs/chain-default-assets"
import { accountManager } from '@/bbjs/AccountManager';
export default {
  components:{
    wlbox,
  },
  data() {
    return {
      chainArr:[],
    };
  },
  mounted(){
    let news = accountManager.getCurrentAccount();
    
    this.chainArr = chainArr.map((it,i)=>{
      let oit = chainDefaultAssetMap[it.chainId]
      return {
        
        ...oit,
        ...it,
        isSelWl:news.currentChainId == it.chainId,
      }
    })
  },
  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
    backFn() {
      this.$emit("closeFn");
    },
    seleItem(it){
      this.$emit('selItem',it)
      this.backFn()
    }
  },
};
</script>
<template>
  <div class="tanbox">
    
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">添加自定义网络</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>
      <div class="skypeGroups_body">
        <wlbox v-for="(item ,i) in chainArr" :key="i" :item="item"
        @click.native="seleItem(item)"
        :isActive="item.isSelWl"></wlbox>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_body{
    padding: 16px 16px 80px;
    box-sizing: border-box;
    .pp16{
        padding: 0 16px;
        // position: relative;
    }
    .postrela{
        position: relative;
    }
}
.arrow-up{
    mask-image: url('@/static/icon/arrow-up.svg');
}
.addsvg{
    mask-image: url('@/static/icon/add.svg');
}
</style>