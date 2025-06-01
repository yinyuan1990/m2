<script>
import addWlVue from './addWl.vue';
import wlboxVue from "./wlbox.vue";
import { chainDefaultAssetMap,chainArr } from "@/bbjs/chain-default-assets"
import { accountManager } from "@/bbjs/AccountManager"
export default {
  components: {
    wlboxVue,
    addWlVue,
  },
  data() {
    return {
        addWlVueShow:false,// 添加网络配置
        listArr:[],
        userinfo:{},
        filval:''
    };
  },
  computed:{
    addList(){ // 已经添加的
        return this.listArr.filter(it=>{
            return it.isAdd && it.name.indexOf(this.filval) != -1;
        })
    },
    needAddList(){ // 需要被添加的
        return this.listArr.filter(it=>{
            return !it.isAdd && it.name.indexOf(this.filval) != -1;
        })
    }
  },
  mounted(){
    // chainDefaultAssetMap
    let arrbox = chainArr//Object.keys(chainDefaultAssetMap);
    let userinfo = accountManager.getCurrentAccount()
    this.userinfo = userinfo;
    let idarr = userinfo.addresses;
    idarr = idarr.map(it=>{
        return it.chainId
    })
    this.listArr = arrbox.map(it=>{
        let isAdd = idarr.includes(it.chainId); // 是否被添加
        let isSelWl = userinfo.currentChainId == it.chainId; // 是否当前被选中的
        return {
            ...it,
            ...chainDefaultAssetMap[it.chainId],
            // chainId:it,
            isAdd,
            isSelWl,// 
        }
    })
    console.log( this.listArr,'listArr' )
  },

  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
    addLx(it){ // 添加用户网络
        accountManager.switchToChain(it.chainId);
        this.closeFn();
        this.$parent.Refresh()
    },
    selWxFn(it){ // 切换至当前网络
      accountManager.switchToChain(it.chainId);
        this.closeFn();
        this.$parent.Refresh()
    }
  },
};
</script>
<template>
  <div class="tanbox">
    <!-- 添加网络功能弹框 -->
    <addWlVue v-if="addWlVueShow" 
    @closeFn="addWlVueShow = false">

    </addWlVue>
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">选择网络</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <div class="skypeGroups_bbod">
        <div
          class="mm-box mm-text-field mm-text-field--size-lg pp16 mm-text-field--truncate mm-text-field-search mm-box--padding-right-0 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--align-items-center mm-box--width-full mm-box--background-color-background-default mm-box--rounded-md mm-box--border-width-1 box--border-style-solid"
          data-testid="search-list"
        >
          <span
            class="mm-box mm-icon search ts mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
          ></span>
          <input
            class="mm-box mm-text mm-input mm-input--disable-state-styles mm-text-field__input mm-text--body-md mm-box--margin-0 mm-box--margin-right-6 mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-2 mm-box--color-text-default mm-box--background-color-transparent mm-box--border-style-none"
            autocomplete="off"
            placeholder="搜索"
            type="search"
            data-testid="network-redesign-modal-search-input"
            focused="false"
            v-model="filval"
          />
        </div>
      </div>
      <div
        class="mm-box mm-box--padding-4 mm-box--display-flex mm-box--justify-content-space-between"
      >
        <p
          class="mm-box mm-text mm-text--body-md mm-box--color-text-alternative"
        >
          启用的网络
        </p>
      </div>
      <wlboxVue :isActive="item.isSelWl" 
      v-for="(item,i) in addList" :key="i" :item="item"
      @click.native="selWxFn(item)"></wlboxVue>
      <div
        class="mm-box mm-box--padding-4 mm-box--display-flex mm-box--justify-content-space-between"
      >
        <p
          class="mm-box mm-text mm-text--body-md mm-box--color-text-alternative"
        >
          其他网络
        </p>
      </div>
      <wlboxVue :isNeedAdd="true" 
      v-for="(item,i) in needAddList" 
      :key="i+'neeed'" :item="item"
      @addLx="addLx"></wlboxVue>
      <!-- <div class="mm-box mm-box--padding-4">
        <button
          class="mm-box mm-text mm-button-base mm-button-base--size-lg mm-button-base--block mm-button-secondary mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent mm-box--rounded-pill mm-box--border-color-primary-default box--border-style-solid box--border-width-1"
        >
          <span
            class="mm-box mm-icon ts addsvg
            mm-icon--size-sm mm-box--margin-right-2 mm-box--margin-inline-end-1 mm-box--display-inline-block mm-box--color-inherit"
          ></span
          >添加自定义网络
        </button>
      </div> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_bbod {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
}
.pp16 {
  padding: 0 16px;
}
.search {
  mask-image: url("@/static/icon/search.svg");
  margin-right: 8px;
}
.addsvg {
  mask-image: url("@/static/icon/add.svg");
  margin-right: 8px;
}
</style>