<script>
import {chainDefaultAssetMap} from "@/bbjs/chain-default-assets"
export default {
  props:{
    isActive:{
        default:false,
    },
    isNeedAdd:{ // 添加
        default:false
    },
    item:{
        default:()=>{
            return {

            }
        }
    }
  },
  data() {
    return {
        qiyongList:[], // 启用的网络
        qitaList:[],  // q其他网络
    };
  },
  mounted(){
    
  },
  methods:{
    addLx(it){
        this.$emit('addLx',it)
    }
  }
};
</script>
<template>
  <div
    :class="{'hidebg':!isActive}"
    class="mm-box multichain-network-list-item itmeppboxs multichain-network-list-item--selected mm-box--padding-top-4 
    mm-box--padding-right-4 mm-box--padding-bottom-4 mm-box--padding-left-4 mm-box--display-flex mm-box--gap-4 mm-box--justify-content-space-between mm-box--align-items-center mm-box--width-full mm-box--background-color-primary-muted"
  >
    <div
      class="mm-box multichain-network-list-item__selected-indicator itmeppboxs_left mm-box--background-color-primary-default mm-box--rounded-pill"
    ></div>
    <div
      class="mm-box mm-text mm-avatar-base mm-avatar-base--size-sm mm-avatar-network mm-text--body-sm mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-md mm-box--border-color-background-default mm-box--border-width-1 box--border-style-solid"
    >
    <!-- src="@/static/icon/eth_logo.svg" -->
      <img
        class="mm-avatar-network__network-image"
        :src="item.logoURI"
        :alt="item.name + 'IMG LOGO'"
      />
    </div>
    <div
      class="mm-box mm-box--display-flex mm-box--flex-direction-column mm-box--justify-content-flex-start mm-box--align-items-flex-start mm-box--width-full"
      style="overflow: hidden"
    >
      <div
        class="mm-box mm-box--display-flex mm-box--align-items-center mm-box--width-full"
        data-testid="Ethereum Mainnet"
      >
        <div class="multichain-network-list-item__tooltip">
          <div title="" class="" tabindex="0" style="display: inline">
            <p
              class="mm-box mm-text mm-text--body-md mm-text--ellipsis mm-box--color-text-default mm-box--background-color-transparent"
              tabindex="0"
            >
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <button v-if="!isNeedAdd"
      class="mm-box mm-button-icon mm-button-icon--size-sm mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-default mm-box--background-color-transparent mm-box--rounded-lg"
      aria-label="网络选项"
      data-testid="network-list-item-options-button-eip155:1"
    >
      <span
        class="mm-box mm-icon ts more-vertical mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
      ></span>
    </button>
    <button v-else @click="addLx(item)"
    class="mm-box mm-text 
        mm-button-base add-network__add-button plr16
        mm-button-link mm-button-link--size-auto 
        mm-text--body-md-medium mm-box--padding-0 
        mm-box--padding-right-0 mm-box--padding-left-0 
        mm-box--display-inline-flex mm-box--justify-content-center 
        mm-box--align-items-center mm-box--color-primary-default 
        mm-box--background-color-transparent" 
        type="link" data-testid="test-add-button">添加</button>
  </div>
</template>
<style scoped lang="scss">
.more-vertical {
  mask-image: url("@/static/icon/more-vertical.svg");
}
.itmeppboxs {
  padding: 16px;
  &.hidebg {
    background: #ffffff;
    .itmeppboxs_left {
      background: #fff;
    }
  }
  &_left {
    left: 4px;
  }
  .plr16{
    // padding: 0 16px;
    width: 70px;
  }
}
</style>