<script>
import openNoticeVue from './openNotice.vue';
import selectUVue from '@/components/index/selectU.vue'
import addAccVue from '@/components/index/addAcc.vue'
import accountnumberVue from '@/components/index/accountnumber.vue'
import importVocabularyVue from '@/components/index/importVocabulary.vue'
import signttVue from '@/components/index/signtt.vue'
import detailsVue from './details.vue';
import showSignVue from './showSign.vue';
import selectWlVue from './selectWl.vue';
// import { assetManager } from "@/bbjs/AssetManager"
// import { accountManager } from "@/bbjs/AccountManager"

import topmix from "./topmix"
import { copyText } from "@/static/js/common"
export default {
  mixins:[topmix],
  props:{
    topHis:{ // 禁止头部点击
        default:false
    }
  },
  components: {
    openNoticeVue,
    selectUVue,
    addAccVue,
    accountnumberVue,
    importVocabularyVue,
    signttVue,
    detailsVue,
    showSignVue,
    selectWlVue,
  },
  data() {
    return {
      isShowMore: false,// 是否显示更多
      openNoticeVueShow: false,// 开启通知
      selectUVueShow: false,// 切换账号弹框
      addAccVueShow: false, // 添加账号弹框开关
      accountnumberVueShow: false, // 添加账号 弹框开关
      importVocabularyVueShow: false,// 导入私钥记词器开关
      signttVueShow: false,// 私钥设置弹框
      detailsVueShow:false,// 账号详情弹框
      showSignVueShow:false, // 显示私钥弹框
      selectWlVueShow:false,// 选择网络弹框
      nextList:[],// 下一步列表
      
    };
  },
  mounted(){
    
    // this.userinfos = userinfos;
    // assetManager.getAssets("2470ce11-9e04-466c-bbbb-a9f06d572fd8","1")
  },
  methods: {
    // formatAddress,
    copyText,
    showMoreFn() { // 显示更多
      console.log('showMoreFn')
      this.isShowMore = true;
    },
    setTab(type) { // 跳转
      this.isShowMore = false;
      let urls;
      if (type == 1) { // 通知
        this.openNoticeVueShow = true;
      } else if (type == 2) { // 账户详情
        this.detailsVueShow = true;
      } else if (type == 3) { // 在Explorer上查看
        urls = 'https://etherscan.io/address/0x0768155eC2bbEe956C261d1ED660Ad21cb025DEf'
      } else if (type == 4) { // 所有许可
        this.$router.push({
          path: '/permission'
        })
      } else if (type == 5) { // Snaps

      } else if (type == 6) { // 获取帮助
        urls = 'https://support.metamask.io/'
      } else if (type == 7) { // 设置
        this.$router.push({
          path: '/setting'
        })
      } else if (type == 8) { // 锁定 MetaMask 退出登录
        // localStorage.removeItem('')
        this.$router.push({
            path:'/newlgoin'
        })
      }
      if (urls) {
        window.open(urls, '_blank')
      }
    },
    showAdd(){
        if(this.topHis) return;
        this.selectUVueShow = true
    },
    nextFn(typename){ // 下一步
      console.log('-nextFn--',typename)
      this.nextList.push(typename.hide)
      this[typename.hide] = false;
      this[typename.show] = true;
    },
    backFn(hide){ // 上一步
      console.log('-backFn--',hide)
      let arr= this.nextList.splice( this.nextList.length-1,1 )
      this[arr[0]] = true;
      this[hide] = false;
    },
    Refresh(){ // 刷新数据
      this.initSet()
      this.$emit('Refresh')
    }
  }
};
</script>
<template>
  <div class="indexbox_head">
    <!-- 选择网络弹框 -->
    <selectWlVue v-if="selectWlVueShow" @closeFn="selectWlVueShow = false"></selectWlVue>
    <!-- 显示私钥弹框 -->
    <showSignVue v-if="showSignVueShow" @closeFn="showSignVueShow = false"></showSignVue>
    <!-- 账号详情弹框 -->
    <detailsVue v-if="detailsVueShow" 
    @closeFn="detailsVueShow = false"></detailsVue>
    <!-- 私钥设置弹框 -->
    <signttVue v-if="signttVueShow" @backFn="backFn"
    @closeFn="signttVueShow = false"></signttVue>
    <!-- 导入私钥记词器弹框 -->
    <importVocabularyVue v-if="importVocabularyVueShow" @backFn="backFn"
    @closeFn="importVocabularyVueShow = false">
    </importVocabularyVue>
    <!-- 添加账号弹框 -->
    <accountnumberVue v-if="accountnumberVueShow" @closeFn="accountnumberVueShow = false"></accountnumberVue>
    <!-- 添加账号弹框 -->
    <addAccVue v-if="addAccVueShow" @nextFn="nextFn"
    @backFn="backFn"
    @closeFn="addAccVueShow = false"></addAccVue>
    <!-- 切换账号弹框 -->
    <selectUVue v-if="selectUVueShow" @nextFn="nextFn"
    @Refresh="Refresh"
    @closeFn="selectUVueShow = false"></selectUVue>
    <!-- 私钥设置弹框 -->
    <openNoticeVue v-if="openNoticeVueShow" @closeFn="openNoticeVueShow = false"></openNoticeVue>
    <!-- <div class="head_left"></div> -->
    <button @click="selectWlVueShow = true"
    class="mm-box mm-picker-network btnpoists
    multichain-app-header__contents__network-picker 
    mm-box--margin-2 mm-box--padding-right-2 
    mm-box--padding-left-2 
    mm-box--sm:display-flex mm-box--gap-2 
    mm-box--align-items-center mm-box--background-color-background-alternative 
    mm-box--rounded-pill" aria-label="网络菜单 Ethereum Mainnet" 
    data-testid="network-display">
        <div class="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs 
        mm-avatar-network mm-picker-network__avatar-network 
        mm-text--body-xs mm-text--text-transform-uppercase 
        mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center 
        mm-box--color-text-default mm-box--background-color-background-alternative 
        mm-box--rounded-md mm-box--border-color-background-default mm-box--border-width-1 
        box--border-style-solid" role="img">
            <img class="mm-avatar-network__network-image" 
            :src="userinfos.child.logoURI"
            alt="Ethereum Mainnet logo">
        </div>
        <p class="mm-box mm-text mm-text--body-sm mm-text--ellipsis 
        mm-box--color-text-default">{{ userinfos.child.name }}</p>
        <span class="mm-box mm-picker-network__arrow-down-icon mm-icon ts arrow-down
        mm-icon--size-xs mm-box--margin-left-auto mm-box--display-inline-block mm-box--color-icon-default"></span>
    </button>
    <div class="head_con">
      <div
        class="mm-box mm-text mm-text--body-md mm-text--ellipsis mm-box--display-flex mm-box--flex-direction-column mm-box--align-items-center mm-box--color-text-default">
        <button
        :class="topHis?'mm-button-base--disabled':''"
          class="mm-box mm-text mm-button-base mm-button-base--size-sm 
          mm-button-base--ellipsis multichain-account-picker 
          mm-text--body-md-medium mm-text--ellipsis mm-box--padding-0 
          mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex 
          mm-box--gap-1 mm-box--justify-content-center mm-box--align-items-center 
          mm-box--color-text-default mm-box--background-color-transparent mm-box--rounded-lg"

          data-testid="account-menu-icon" @click="showAdd">
          <span
            class="mm-box mm-text mm-text--inherit mm-text--ellipsis mm-box--display-flex mm-box--gap-2 mm-box--align-items-center mm-box--color-text-default">
            <div
              class="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs mm-avatar-account mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full mm-box--border-color-background-default box--border-style-solid box--border-width-1">
              <div class="mm-avatar-account__jazzicon">
                <div style="
                    border-radius: 50px;
                    overflow: hidden;
                    padding: 0px;
                    margin: 0px;
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    background: rgb(3, 85, 94);
                  ">
                  <headbox height="16" width="16"></headbox>
                </div>
              </div>
            </div>
            <span
              class="mm-box mm-text multichain-account-picker__label 
              mm-text--body-md mm-text--font-weight-bold mm-text--ellipsis 
              mm-box--color-text-default">Account
              {{ (userinfos.idx || 0)+1 }}</span>
          </span>

          <img src="@/static/icon/arrow-down.svg" alt=""
            class="mm-box mm-icon mm-icon--size-sm mm-box--margin-inline-start-1 mm-box--display-inline-block mm-box--color-icon-default" />
        </button>
        <div>
          <div class="" tabindex="0" data-tooltipped="" aria-describedby="tippy-tooltip-1" data-original-title="复制到剪贴板"
            style="display: inline">
            <button
              class="mm-box mm-text mm-button-base mm-button-base--size-sm mm-button-base--ellipsis multichain-app-header__address-copy-button mm-text--body-md-medium mm-text--ellipsis mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-transparent mm-box--rounded-lg"
              data-testid="app-header-copy-button" style="height: auto">
              <span
                class="mm-box mm-text mm-text--inherit mm-text--ellipsis mm-box--display-flex mm-box--gap-2 mm-box--align-items-center mm-box--color-text-default">
                <span
                  class="mm-box mm-text mm-text--body-sm mm-text--ellipsis mm-box--color-text-alternative">
                  <!-- 0x07681...25DEf -->
                  {{  formatAddress(userinfos.child.address || '')  }}
                </span>
              </span>
              <img src="@/static/icon/copy.svg" alt="" @click="copyText( userinfos.child.address|| '' )"
                class="mm-box mm-icon mm-icon--size-sm 
                mm-box--margin-inline-start-1 mm-box--display-inline-block mm-box--color-icon-alternative" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="head_right" @click="showMoreFn">
      <img src="@/static/icon/more-vertical.svg" alt="" class="head_right_ic" />

    </div>
    <div class="tanbox" v-show="isShowMore">
      <div class="tanbox_bj" style="background-color: rgba(0, 0, 0, 0);" @click="isShowMore = false"></div>
      <div class="head_right_more" >
        <div class="head_right_more_it" @click="setTab(1)">
          <span class="
          it_icon
          mm-box mm-icon ts mm-icon--size-sm 
          mm-box--margin-right-2 mm-box--display-inline-block 
          mm-box--color-inherit"></span>
          <div class="it_cons mm-text--body-md">
            通知
          </div>
          <div class="it_tuic">新推出！</div>
        </div>
        <div class="
        mm-box mm-box--width-full
        mm-box--border-color-border-muted 
        box--border-style-solid box--border-width-1" style="height: 1px; border-bottom-width: 0px;"></div>
        <div class="head_right_more_it" @click="setTab(2)">
          <span class="
          it_icon zhsvg
          mm-box mm-icon ts mm-icon--size-sm 
          mm-box--margin-right-2 mm-box--display-inline-block 
          mm-box--color-inherit"></span>
          <div class="it_cons mm-text--body-md">
            账户详情
          </div>
        </div>
        <div class="head_right_more_it" @click="setTab(3)">
          <span class="
          it_icon export
          mm-box mm-icon ts mm-icon--size-sm 
          mm-box--margin-right-2 mm-box--display-inline-block 
          mm-box--color-inherit"></span>
          <div class="it_cons ">
            <div class="it_cons_til mm-text--body-md">在Explorer上查看 </div>
            <div class="it_cons_msg mm-text--body-xs">etherscan.io</div>
          </div>
        </div>
        <div class="
        mm-box mm-box--width-full
        mm-box--border-color-border-muted 
        box--border-style-solid box--border-width-1" style="height: 1px; border-bottom-width: 0px;"></div>
        <div class="head_right_more_it" @click="setTab(4)">
          <span class="
          it_icon syxk
          mm-box mm-icon ts mm-icon--size-sm 
          mm-box--margin-right-2 mm-box--display-inline-block 
          mm-box--color-inherit"></span>
          <div class="it_cons mm-text--body-md">
            所有许可
          </div>
        </div>
        <div class="head_right_more_it" @click="setTab(5)">
          <span class="
          it_icon snapsss
          mm-box mm-icon ts mm-icon--size-sm 
          mm-box--margin-right-2 mm-box--display-inline-block 
          mm-box--color-inherit"></span>
          <div class="it_cons mm-text--body-md">
            Snaps
          </div>
        </div>

        <div class="head_right_more_it" @click="setTab(6)">
          <span class="
          it_icon message-question
          mm-box mm-icon ts mm-icon--size-sm 
          mm-box--margin-right-2 mm-box--display-inline-block 
          mm-box--color-inherit"></span>
          <div class="it_cons mm-text--body-md">
            获取帮助
          </div>
        </div>
        <div class="head_right_more_it" @click="setTab(7)">
          <span class="
          it_icon setting
          mm-box mm-icon ts mm-icon--size-sm 
          mm-box--margin-right-2 mm-box--display-inline-block 
          mm-box--color-inherit"></span>
          <div class="it_cons mm-text--body-md">
            设置
          </div>
        </div>
        <div class="head_right_more_it" @click="setTab(8)">
          <span class="
          it_icon lock
          mm-box mm-icon ts mm-icon--size-sm 
          mm-box--margin-right-2 mm-box--display-inline-block 
          mm-box--color-inherit"></span>
          <div class="it_cons mm-text--body-md">
            锁定 MetaMask
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style scoped lang="scss">
.indexbox_head {
  position: sticky;
  box-shadow: 0 2px 16px 0 #0000001a;
  box-sizing: border-box;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 68px;
  z-index: 2;

  .head_left {
    width: 52px;
  }

  .head_con {
    flex: 1;
    margin: 0 20px;
  }

  .head_right {
    position: relative;

    &_ic {
      width: 16px;
      height: 16px;
      display: block;
    }
  }

  .mm-icon {
    background: transparent;
  }

  .mm-icon.ts {
    background-color: currentColor;
  }

  .mm-icon.ts {
    background-color: currentColor;
  }
}

.head_right_more {
  position: absolute;
  inset: 0px auto auto 0px;
  --abc: calc(100vw - 240px);
  transform: translate(var(--abc), 51px);
  overflow: hidden;
  width: 225px;
  border: 1px solid #b7bbc866;
  box-shadow: var(--shadow-size-md) var(--color-shadow-default);
  background: #fff;
  right: 0px;
  top: -4px;
  z-index: 10;
  border-radius: 6px;

  &_it {
    background: none;

    font-size: inherit;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px;
    cursor: pointer;
    color: inherit;
    box-sizing: border-box;

    .it_icon {
      mask-image: url('@/static/icon/notification.svg');
      color: #121314;
      margin-right: 8px;

      &.zhsvg {
        mask-image: url('@/static/icon/scan-barcode.svg');
      }

      &.export {
        mask-image: url('@/static/icon/export.svg');
      }

      &.syxk {
        mask-image: url('@/static/icon/security-tick.svg');
      }

      &.snapsss {
        mask-image: url('@/static/icon/snaps.svg');
        // width: 16px;
        // height: 16px;
      }

      &.message-question {
        mask-image: url('@/static/icon/message-question.svg');
      }

      &.setting {
        mask-image: url('@/static/icon/setting.svg');
      }

      &.lock {
        mask-image: url('@/static/icon/lock.svg');
      }
      
    }

    .it_cons {
      flex: 1;
    }

    .it_tuic {
      padding: 0 8px;
      height: 24px;
      width: max-content;
      padding-top: 1px;
      padding-bottom: 1px;
      line-height: 24px;
      box-sizing: border-box;
      color: #4459ff;
      background: #4459ff1a;
      border-radius: 4px;
      font-size: 14px;
    }
  }
  
}
.arrow-down {
    mask-image: url('@/static/icon/arrow-down.svg');
    color: #121314;
}
.btnpoists{
    position: absolute;
    left: 8px;
    top: 10px;
    width: 99px;
    display: flex;
}
</style>