<script>
import { accountManager } from '@/bbjs/AccountManager';
import { assetManager } from '@/bbjs/AssetManager';
import {formatAddress} from "@/bbjs/utils"
import {chainDefaultTokenMap} from "@/bbjs/chain-default-assets"
import { Toast } from 'vant';
export default {
  props:{
    hideAddBtn:{ // 隐藏添加按钮
      default:true
    }
  },
  data() {
    return {
      value: "",
      accList:[],
    };
  },
  mounted(){
   this.init()
  },
  methods: {
    formatAddress,
    async init(){
      this.accList = accountManager.getAllAccounts()
      let newacc = accountManager.getCurrentAccount()
      this.accList.forEach( async (item)=>{
        
        let arrs = item.addresses.filter(it=>{
          return item.currentChainId == it.chainId
        });
        if(arrs.length == 1) item.child = arrs[0];

        // 设置 总金额
        let totalm = {};
        totalm = assetManager.getChainAssetSummary( item.walletId,item.child.chainId )
        item.totalm = totalm;

        // 设置当前选中账号
        item.actItem = item.walletId == newacc.walletId; 
      })
      console.log( this.accList,'--accList' )
    },
    nextFn(){
      this.$emit('nextFn',{hide:'selectUVueShow',show:'addAccVueShow'})
    },
    closeFn() {
      this.$emit("closeFn");
    },
    changeAccFn(item){ // 切换选中账号
      if(item.actItem){
        return
      }
      Toast('切换成功')
      
      accountManager.switchAccount(item.walletId);
      this.closeFn()
      this.$emit('Refresh')
    }
  },
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">选择一个账号</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <van-search
        class="searbox"
        background="#ffffff"
        v-model="value"
        placeholder="搜索账户"
      />
      <div class="acclist" v-for="(item,i) in accList" :key="i"
      @click="changeAccFn(item)"
      :class="{'active':item.actItem}">
        <div class="acclist_ganz"></div>
        <div class="acclist_toux">
          <div class="acclist_toux_svg">
            <svg x="0" y="0" width="32" height="32">
              <rect
                x="0"
                y="0"
                width="32"
                height="32"
                transform="translate(0.04548281146116274 0.35464848635470203) rotate(204.4 16 16)"
                fill="#2392E1"
              ></rect>
              <rect
                x="0"
                y="0"
                width="32"
                height="32"
                transform="translate(-8.837578990023701 18.403064650125863) rotate(198.4 16 16)"
                fill="#FB1895"
              ></rect>
              <rect
                x="0"
                y="0"
                width="32"
                height="32"
                transform="translate(24.472661675533953 -15.136307912299616) rotate(481.9 16 16)"
                fill="#018E72"
              ></rect>
            </svg>
          </div>

          <div class="acclist_toux_type"></div>
        </div>
        <div class="acclist_iconbox">
          <div class="acclist_iconbox_one">
            <div class="oneleft mm-text--body-md-medium">Account {{ i+1 }}</div>
            <div class="onerig">${{ item.totalPrice }} <span class="xb">USD</span></div>
          </div>
          <div class="acclist_iconbox_one">
            <div class="oneleft mm-text--body-md-medium xox">{{ formatAddress(item.child.address || '') }}</div>
            <div class="onerig">
              <img src="@/static/icon/eth_logo.svg" alt="" class="onerig_icon">
              0 ETH
            </div>
          </div>
        </div>
        <div class="acclist_more">
          <span class="acclist_more_icon mm-icon mm-icon--size-sm"></span>
        </div>
      </div>
      <div class="skypeGroups_addbtn" @click="nextFn" v-if="hideAddBtn">
        <span class="addicon mm-icon mm-icon--size-sm"> </span>
        添加账户或硬件钱包
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.searbox {
  border-width: 1px;
  border-style: solid;
  border-color: var(--color-border-default);
  width: 90%;
  margin: 0 auto 12px;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
}
.skypeGroups_addbtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  color: var(--color-primary-default);
  border: 1px solid var(--color-primary-default);
  font-weight: var(--typography-s-body-md-medium-font-weight);
  font-size: var(--typography-s-body-md-medium-font-size);
  height: 48px;
  line-height: 48px;
  letter-spacing: var(--typography-s-body-md-medium-letter-spacing);
  box-sizing: border-box;
  padding: 0 16px;
  border-radius: 24px;
  gap: 8px;
  margin-top: 10px;
  .addicon {
    mask-image: url("@/static/icon/add.svg");
    color: var(--color-primary-default);
  }
}
.acclist {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &.active{
    background-color: var(--color-primary-muted);
    .acclist_ganz{
      background-color: var(--color-primary-default);
    }
    
  }
  &_ganz {
    width: 4px;
    height: calc(100% - 8px);
    position: absolute;
    top: 4px;
    left: 4px;
    background-color: transparent;
    border-radius: 6px;
  }
  &_toux {
    width: 32px;
    height: 32px;
    position: relative;
    &_svg {
      position: relative;
      border-radius: 50px;
      overflow: hidden;
      padding: 0px;
      margin: 0px;
      width: 32px;
      height: 32px;
      display: inline-block;
      background: rgb(242, 102, 2);
    }
    &_type {
      position: absolute;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      bottom: -1px;
      right: 2px;
      &::after {
        content: "";
        position: absolute;
        left: 2px;
        top: 2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #686e7d;
      }
    }
  }
  &_iconbox {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 6px;
    &_one {
      justify-content: space-between;
      display: flex;
      .oneleft {
        color: var(--color-text-default);
        text-align: left;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-weight: bold;
        &.xox{
          font-size: 12px;
          font-weight: 400;
        }
      }
      .onerig{
        color: var(--color-text-default);
        font-size: 14px;
        .xb{
          font-size: 12px;
        }
        &_icon{
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-bottom: -1px;
          border-radius: 50%;
        }
      }
    }
  }
  &_more {
    width: 24px;
    height: 24px;
    padding: 0;
    font-size: 14px;
    cursor: pointer;
    // background-color: var(--color-background-hover);
    color: var(--color-icon-default);
    &_icon {
      mask-image: url("@/static/icon/more-vertical.svg");
      color: var(--color-icon-default);
      display: inline-block;
    }
  }
}
</style>