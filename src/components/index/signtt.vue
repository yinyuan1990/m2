<script>
import { accountManager } from "@/bbjs/AccountManager"
import {isValidPrivateKey} from "@/bbjs/utils"
import { assetManager } from "@/bbjs/AssetManager"
import { Toast } from "vant";
import {chainDefaultTokenMap} from "@/bbjs/chain-default-assets"
export default {
  data() {
    return {
        isShowPsw:true,// 是否显示密码
        signVal:'',// 私钥值
    };
  },
  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
    backFn() {
      this.$emit("backFn",'signttVueShow');
    },
    addQianbao(){ // 私钥添加钱包
      if( !isValidPrivateKey(this.signVal) ) {
        Toast('私钥不合法');
        return
      }
      let acc = accountManager.importPrivateKey(this.signVal)

      let it = acc.addresses[0]
      assetManager.addDefaultMainAsset( acc.walletId,it.chainId,it.address );

      let meta = chainDefaultTokenMap[ it.chainId ]
      assetManager.addContractTokenAsset( acc.walletId,it.chainId,it.address,meta.contractAddress );
      Toast('添加成功');
      this.closeFn();
      
    }
  },
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">私钥</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>
      <div class="skypeGroups_bodys">
        <p
          class="mm-box mm-text mm-text--body-sm mm-box--margin-top-2 mm-box--color-text-default"
        >
          导入的账户将不会与最初创建的 MetaMask
          账户私钥助记词相关联。了解更多有关导入账户的信息
          <a
            class="mm-box mm-text mm-button-base mm-button-link mm-button-link--size-inherit mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
            href="https://support.metamask.io/managing-my-wallet/accounts-and-addresses/what-are-imported-accounts-/"
            target="_blank"
            rel="noopener noreferrer"
            >此处</a
          >
        </p>
        <div class="skypeGroups_bodys_select">
          <div class="skypeGroups_bodys_select_til">选择类型</div>
          <div class="dropdown">
            <select class="dropdown__select">
              <option value="私钥">私钥</option>
              <!-- <option value="JSON 文件">JSON 文件</option> -->
            </select>
            <span
              class="
              mm-box dropdown__icon-caret-down dwonsvg
              mm-icon mm-icon--size-sm mm-box--display-inline-block 
              mm-box--color-inherit"
            ></span>
          </div>
        </div>
        <div class="skypeGroups_bodys_copys">请粘贴您的私钥:</div>
        <div class="skypeGroups_bodys_signs">
            <input type="text" class="signs" v-show="isShowPsw" v-model="signVal"/>
            <input type="password" class="signs" v-show="!isShowPsw" v-model="signVal"/>
            <i class="iconfont eyesb" @click="isShowPsw = !isShowPsw"
            :class="isShowPsw?'icon-yanjing_xianshi':'icon-yanjing_yincang'"></i>
        </div>
        <div class="skypeGroups_bodys_censs">
            <div class="skypeGroups_bodys_censs_n" @click="backFn">取消</div>
            <div class="skypeGroups_bodys_censs_n ok" @click="addQianbao">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_bodys {
  padding: 16px;
  &_select {
    display: flex;
    margin: 16px auto;
    justify-content: space-between;
    align-items: center;
    &_til {
      color: #121314;
      font-size: 16px;
      font-weight: 600;
      line-height: 40px;
    }
    .dropdown__select{
        padding: 12px 40px 12px 16px;
    }
    .dwonsvg{
        mask-image: url('@/static/icon/arrow-down.svg');
        right: 16px;
    }
  }
  &_copys{
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }
  &_signs{
    box-sizing: border-box;
    padding: 0 16px;
    position: relative;
    height: 48px;
    display: flex;
    align-items: center;
    border: 1px solid #b7bbc8;
    border-radius: 8px;
    &.red{
        border-color: #ca3542;
    }
    .signs{
        flex: 1;
        border: 0;
    }
    .eyesb{
        color: #121314;
        font-size: 24px;
        transform: scaleY(-1);
    }
  }
  

}

.skypeGroups_bodys_censs{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    &_n{
        color: #4459ff;
        background-color: #ffffff;
        box-shadow: var(--shadow-size-sm) var(--color-shadow-primary);
        padding: 0 16px;
        border: 1px solid #4459ff;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        text-align: center;
        width: 46%;

        &.ok{
            background: #4459ff;
            color: #ffffff;
        }
    }
}
</style>