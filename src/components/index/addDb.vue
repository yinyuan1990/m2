<script>
import addDb_wl from './addDb_wl.vue';
import { accountManager } from '@/bbjs/AccountManager';
import { chainArr, chainDefaultAssetMap } from "@/bbjs/chain-default-assets"
import { fetchTokenDetailFromChain,fetchTokenDetailFromCoingecko } from "@/bbjs/priceService"
import { debounce } from "@/static/js/common"
import {isValidAddress} from "@/bbjs/utils"
import { assetManager } from '@/bbjs/AssetManager';
var that;
export default {
  components: {
    addDb_wl
  },
  data() {
    return {
      active: 0,
      searchVal: '',// 搜索值
      hyAddVal: '',// 合约地址值
      hyFhVal: '',// 合约符号值
      hyXsVal: "",// 合约小数
      isSeachHy: false,// 搜索出合约
      addDb_wlShwo: false,// 切换网络
      selWl: {},// 当前设置的网络
      isCheckIpt:false,// 当前是否选中
      searchList:[], // 搜索的列表
    };
  },
  mounted() {
    that = this;
    let news = accountManager.getCurrentAccount();
    let chainArrIt = chainArr.filter(it => {
      return it.chainId == news.currentChainId;
    })
    this.selWl = {
      ...chainDefaultAssetMap[news.currentChainId],
      ...chainArrIt[0],
    }

  },
  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
    backFn() {
      this.$emit('backFn')
    },
    selItem(it) {
      console.log(it)
      this.selWl = it
    },
    changeInps:debounce(()=>{ // 搜索变化监听
      console.log( that.searchVal,that.selWl )
      that.isCheckIpt = false
      if( !that.searchVal ) return;
      if(isValidAddress(that.searchVal)){
        that.searchList = [];
        that.isCheckIpt = false;
        fetchTokenDetailFromChain(that.selWl.rpcUrls[0],that.searchVal).then(res=>{
          console.log(res,'fetchTokenDetailFromChain')
          that.searchList.push({
            ...res,
            logoURI:that.selWl.logoURI,
          });
        })
      }

    },600),
    changeInpsDz:debounce(()=>{ // 搜索变化监听
      console.log( that.searchVal,that.selWl )
      that.isSeachHy = false
      if( !that.hyAddVal ) return;
      if(isValidAddress(that.hyAddVal)){
        that.searchList = [];
        that.isCheckIpt = false;
        that.isSeachHy = false;
        fetchTokenDetailFromChain(that.selWl.rpcUrls[0],that.hyAddVal).then(res=>{
          console.log(res,'fetchTokenDetailFromChain')
          that.searchList.push({
            ...res,
            logoURI:that.selWl.logoURI,
          });
          that.hyXsVal = res.decimals
          that.hyFhVal = res.symbol
          that.isSeachHy = true;
        })
      }

    },600),
    async nextFn(){ // 下一步
      let boors;
      let addStr;
      if( this.active == 0 && this.isCheckIpt){
        boors = true;
        addStr = this.searchVal;
      }else if( this.active == 1  && this.isSeachHy){
        boors = true;
        addStr = this.hyAddVal;
      }
      if(!boors) return;
      // let obj =  await fetchTokenDetailFromCoingecko( this.selWl.coinGeckoPlatformId ,addStr  )
      // console.log( obj )
      assetManager.addContractTokenAsset( 
        this.selWl.walletId,
        this.selWl.chainId,
        this.selWl.address,
        addStr )
        this.closeFn()
        this.$emit('Refresh')
    },
  },
};
</script>
<template>
  <div class="tanbox">
    <addDb_wl v-if="addDb_wlShwo" @closeFn="addDb_wlShwo = false" @selItem="selItem"></addDb_wl>
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">添加代币</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>

      <div class="skypeGroups_body">
        <van-tabs v-model="active" type="line" color="#121314" class="tabbox_child">
          <van-tab title="搜索"></van-tab>
          <van-tab title="自定义代币"></van-tab>
        </van-tabs>
        <div v-if="active == 1" class="mm-box mm-banner-base mm-banner-alert btnboxset
          mm-banner-alert--severity-warning mm-box--padding-3 
          mm-box--padding-left-2 mm-box--display-flex mm-box--gap-2 
          mm-box--background-color-warning-muted mm-box--rounded-sm" data-testid="custom-token-warning"><span class="mm-box mm-icon ts danger
            mm-icon--size-lg mm-box--display-inline-block mm-box--color-warning-default"></span>
          <div class="mm-box mm-box--min-width-0">
            <p class="mm-box mm-text mm-text--body-md mm-box--color-text-default"><span> 任何人都可以创建代币，包括创建现有代币的虚假版本。了解 <a
                  class="mm-box mm-text mm-button-base mm-button-link mm-button-link--size-auto mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
                  href="https://support.metamask.io/managing-my-tokens/token-safety-practices/"
                  rel="noopener noreferrer" target="_blank">欺诈和安全风险信息。</a> </span></p>
          </div>
        </div>
        <div class="mm-box mm-box--padding-top-4">
          <div class="mm-box mm-box--padding-right-4 mm-box--padding-bottom-4 mm-box--padding-left-4">
            <div class="mm-box" @click="addDb_wlShwo = true">
              <div class="mm-box dropdown-editor__item-dropdown 
                mm-box--padding-right-1 mm-box--padding-left-4 
                mm-box--display-flex mm-box--justify-content-space-between prl
                mm-box--align-items-center mm-box--rounded-lg mm-box--border-color-border-default 
                mm-box--border-width-1 box--border-style-solid">
                <div class="mm-box mm-box--padding-top-3 mm-box--padding-bottom-3 
                  mm-box--display-flex mm-box--gap-3 mm-box--justify-content-space-between 
                  mm-box--width-full">
                  <div class="mm-box">
                    <p class="mm-box mm-text mm-text--body-md-medium 
                    mm-box--color-text-default">{{ selWl.name }}</p>
                  </div>
                  <div class="mm-box mm-box--display-flex mm-box--align-items-flex-start">
                    <div class="mm-box mm-text mm-avatar-base mm-avatar-base--size-sm 
                      mm-avatar-network mm-text--body-sm mm-text--text-transform-uppercase 
                      mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center 
                      mm-box--color-text-default mm-box--background-color-background-alternative 
                      mm-box--rounded-md mm-box--border-color-background-default mm-box--border-width-1 
                      box--border-style-solid" style=""><img class="mm-avatar-network__network-image"
                        :src="selWl.logoURI" alt="logo"></div>
                  </div>
                </div>
                <button class="mm-box mm-button-icon
                  mm-button-icon--size-md mm-box--margin-left-auto 
                  mm-box--display-inline-flex mm-box--justify-content-center 
                  mm-box--align-items-center mm-box--color-icon-default 
                  mm-box--background-color-transparent mm-box--rounded-lg"
                  data-testid="test-import-tokens-drop-down"><span class="mm-box mm-icon  ts arrow-down
                    mm-icon--size-md 
                    mm-box--display-inline-block mm-box--color-inherit"></span></button>
              </div>
            </div>
          </div>
          <div v-if="active == 0" class="mm-box mm-box--padding-right-4 
          mm-box--padding-bottom-4 mm-box--padding-left-4">
            <div class="mm-box mm-text-field mm-text-field--size-md 
              mm-text-field--truncate mm-text-field-search 
              import-tokens-modal__button-search mm-box--padding-right-0 
              mm-box--padding-left-4 mm-box--display-inline-flex 
              mm-box--align-items-center mm-box--width-full 
              mm-box--background-color-background-default 
              mm-box--rounded-sm mm-box--border-width-1 box--border-style-solid">
              <span class="mm-box mm-icon ts searchSvg
                mm-icon--size-sm mm-box--padding-1 mm-box--display-inline-block mm-box--color-inherit"></span>
              <input v-model="searchVal" @input="changeInps"
                class="mm-box mm-text mm-input mm-input--disable-state-styles mm-text-field__input mm-text--body-md mm-box--margin-0 mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-2 mm-box--color-text-default mm-box--background-color-transparent mm-box--border-style-none"
                autocomplete="off" placeholder="搜索代币" type="search" focused="false" value="">
            </div>
          </div>
          <div class="mm-box token-list__empty-list mm-box--padding-right-4 mm-box--padding-left-4" 
          v-if="active == 0 && searchList.length == 0">
            <div
              class="mm-box mm-box--display-flex mm-box--flex-direction-column mm-box--align-items-center mm-box--text-align-center">
              <p class="mm-box mm-text mm-text--body-md mm-box--color-text-alternative">添加您通过MetaMask获得的代币</p><a
                class="mm-box mm-text mm-button-base mm-button-link mm-button-link--size-auto mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
                target="_blank" rel="noopener noreferrer"
                href="https://support.metamask.io/managing-my-tokens/custom-tokens/how-to-display-tokens-in-metamask/">了解更多</a>
            </div>
          </div>
        </div>
        <template v-if="active == 1">
          <div class="skypeGroups_shebox">代币合约地址</div>
          <input type="text" class="skypeGroups_inp" placeholder="" v-model="hyAddVal" 
          @input="changeInpsDz"/>
        </template>
        <template v-if="isSeachHy">
          <div class="skypeGroups_shebox">代币符号</div>
          <input type="text" class="skypeGroups_inp" placeholder="" v-model="hyFhVal" />
          <div class="skypeGroups_shebox hui">代币小数</div>
          <input type="text" class="skypeGroups_inp hui" placeholder="" v-model="hyXsVal" disabled />
        </template>
        <div v-show="active == 0"
          class="mm-box token-list__token_component mm-box--padding-top-2 
          mm-box--padding-right-4 mm-box--padding-bottom-2 mm-box--padding-left-4 
          mm-box--display-flex mm-box--flex-direction-row mm-box--flex-wrap-nowrap 
          mm-box--align-items-center mm-box--background-color-transparent" v-for="(item,i) in searchList"
          :key="i">
          <div class="mm-box mm-box--display-flex mm-box--align-items-center">
            <label
              class="mm-box mm-text mm-checkbox labler10
              mm-text--body-md mm-box--margin-right-2 mm-box--display-inline-flex 
              mm-box--align-items-center mm-box--color-text-default">
              <span
                class="mm-checkbox__input-wrapper">
                <input
                  class="mm-box mm-checkbox__input mm-box--margin-0 mm-box--margin-right-0 
                  mm-box--display-flex mm-box--rounded-sm
                  mm-box--border-color-border-default mm-box--border-width-2 box--border-style-solid"
                  :class="isCheckIpt?'mm-box--border-color-primary-default':'mm-box--background-color-background-default'"
                  type="checkbox"
                  v-model="isCheckIpt"
                  >
                  <span v-if="isCheckIpt"
                   class="mm-box mm-checkbox__icon mm-icon check-bold
                  mm-icon--size-md mm-box--display-inline-block 
                  mm-box--color-primary-inverse" ></span>
                </span>
            </label>
            <div class="mm-box">
              <div
                class="mm-box mm-badge-wrapper mm-box--margin-top-1 divrigh
                mm-box--margin-right-4 mm-box--display-inline-block">
                <div
                  class="mm-box mm-text mm-avatar-base mm-avatar-base--size-md mm-avatar-token mm-text--body-sm mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full">
                  L</div>
                <div
                  class="mm-box mm-badge-wrapper__badge-container r10
                  mm-badge-wrapper__badge-container--rectangular-bottom-right">
                  <div
                    class="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs mm-avatar-network token-list__token_component__network-badge mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-md mm-box--border-color-background-default mm-box--border-width-1 box--border-style-solid">
                    <img class="mm-avatar-network__network-image" 
                    :src="item.logoURI"
                      alt="Ethereum Mainnet logo">
                  </div>
                </div>
              </div>
            </div>
            <div class="mm-box">
              <p class="mm-box mm-text mm-text--body-md mm-text--font-weight-medium mm-box--color-text-default">
                {{ item.name }}
              </p>
              <p class="mm-box mm-text mm-text--body-sm mm-box--color-text-alternative">
                {{ item.symbol }}
              </p>
            </div>
          </div>
        </div>
        <div class="skypeGroups_btns">
          <div class="skypeGroups_btns_cen" @click="nextFn"
          :class="{ 'ok': isCheckIpt || isSeachHy }">下一步</div>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_body {
  padding: 16px;
  .hui{
    opacity: 0.4;
  }
}

.skypeGroups_shebox {
  font-weight: 500;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: #121314;
}

.skypeGroups_inp {
  height: 48px;
  line-height: 48px;
  padding: 0 8px;
  border: 1px solid #b7bbc8;
  background: #fff;
  box-sizing: border-box;
  border-radius: 6px;
  display: block;
  margin: 8px 0;
  width: 100%;
  
}

.skypeGroups_btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  &_cen {
    color: #4459ff;
    background-color: #ffffff;
    box-shadow: var(--shadow-size-sm) var(--color-shadow-primary);
    padding: 0 16px;
    border: 1px solid #4459ff;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    text-align: center;
    // width: 46%;
    width: 100%;
    background: #4459ff;
    color: #ffffff;
    opacity: 0.5;

    &.ok {
      opacity: 1;
    }
  }
}

.arrow-down {
  mask-image: url('@/static/icon/arrow-down.svg');
}

.searchSvg {
  mask-image: url('@/static/icon/search.svg');
}

.danger {
  mask-image: url('@/static/icon/danger.svg');
}
.check-bold{
  mask-image: url('@/static/icon/check-bold.svg');
}

.prl {
  padding: 0 4px 0 16px;
}

.tabbox_child {
  border-bottom: 2px solid var(--color-border-muted);
  margin-bottom: 20px;
}

.btnboxset {

  border-left: 4px solid #9a6300;
}
.divrigh{
  margin-right: 10px;
}
.r10{
  right: -3px;
  bottom: -6px;
}
.labler10{
  margin-right: 10px;
}
.mm-box--border-color-primary-default{
  background-color: #2c3dc5 !important;
}
</style>