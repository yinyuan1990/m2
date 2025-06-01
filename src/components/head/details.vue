<script>
export default {
  data() {
    return {
        name:'Account 1',
        showEdit:false,// 是否显示编辑
        activeName: 'a',
    };
  },
  watch:{
    showEdit(newVal){
        this.$nextTick(()=>{
            newVal &&(this.$refs.nameinp.focus())
        })
        
    }
    
  },
  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
    backFn() {
      this.$emit("backFn");
    },
  },
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">
        <div
          style="
            border-radius: 50px;
            overflow: hidden;
            padding: 0px;
            margin: 0px;
            width: 40px;
            height: 40px;
            display: inline-block;
            background: rgb(242, 102, 2);
          "
        >
          <svg x="0" y="0" width="40" height="40">
            <rect
              x="0"
              y="0"
              width="40"
              height="40"
              transform="translate(0.05685351432645343 0.4433106079433776) rotate(204.4 20 20)"
              fill="#2392E1"
            ></rect>
            <rect
              x="0"
              y="0"
              width="40"
              height="40"
              transform="translate(-11.046973737529628 23.00383081265733) rotate(198.4 20 20)"
              fill="#FB1895"
            ></rect>
            <rect
              x="0"
              y="0"
              width="40"
              height="40"
              transform="translate(30.59082709441744 -18.92038489037452) rotate(481.9 20 20)"
              fill="#018E72"
            ></rect>
          </svg>
        </div>
      </div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>
      <div class="skypeGroups_conts">
        <div v-show="!showEdit"
          class="mm-box mm-box--display-flex mm-box--gap-3 mm-box--align-items-center"
        >
          <p
            class="mm-box mm-text mm-text--body-lg-medium mm-box--color-text-default"
            style="word-break: break-word"
          >
            {{name}}
          </p>
          <button
            class="mm-box mm-button-icon mm-button-icon--size-lg mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-default mm-box--background-color-transparent mm-box--rounded-lg"
            data-testid="editable-label-button"
            aria-label="编辑"
            @click="showEdit = true"
          >
            <span
              class="mm-box mm-icon mm-icon--size-lg editsvg mm-box--display-inline-block mm-box--color-inherit"
            ></span>
          </button>
        </div>
        <div v-show="showEdit"
        class="mm-box editable-label mm-box--display-flex mm-box--gap-3">
          <div
            class="box mm-form-text-field 
            box--display-flex box--flex-direction-column"
            data-testid="editable-input"
          >
            <div
              class="mm-box mm-text-field 
              mm-text-field--size-md mm-text-field--truncate 
              mm-form-text-field__text-field mm-box--padding-right-0 
              mm-box--padding-left-0 mm-box--display-inline-flex 
              mm-box--align-items-center mm-box--background-color-background-default 
              mm-box--rounded-sm mm-box--border-width-1 box--border-style-solid"
            >
              <input
                ref="nameinp"
                class="mm-box mm-text mm-input ppboxs22
                mm-input--disable-state-styles 
                mm-text-field__input mm-text--body-md 
                mm-box--margin-0 mm-box--padding-0 mm-box--padding-right-4 
                mm-box--padding-left-4 mm-box--color-text-default 
                mm-box--background-color-transparent 
                mm-box--border-style-none"
                autocomplete="off"
                placeholder="账户名称"
                required=""
                type="text"
                v-model="name"
              />
            </div>
            <p
              class="mm-box mm-text mm-help-text 
              mm-form-text-field__help-text mm-text--body-xs 
              mm-box--margin-top-1 mm-box--color-text-default"
            >
              ​
            </p>
          </div>
          <button
          @click="showEdit = false"
            class="mm-box mm-button-icon mm-button-icon--size-lg 
            mm-box--display-inline-flex mm-box--justify-content-center 
            mm-box--align-items-center mm-box--color-icon-default 
            mm-box--background-color-transparent mm-box--rounded-lg"
            data-testid="save-account-label-input"
          >
            <span
              class="mm-box mm-icon mm-icon--size-lg checksvg
              mm-box--display-inline-block mm-box--color-inherit"
            ></span>
          </button>
        </div>
        <div class="mm-box mm-box--display-flex" 
        style="position: relative">
          <p
            class="mm-box mm-text mm-text--body-md 
            mm-box--margin-bottom-4 mm-box--color-text-default"
            data-testid="account-address-shortened"
          >
            0x9b5e3e15d2...3b2d95ee52
          </p>
          <button
            class="mm-box mm-button-icon mm-button-icon--size-md 
            mm-box--display-inline-flex mm-box--justify-content-center 
            mm-box--align-items-center mm-box--color-icon-alternative 
            mm-box--background-color-transparent mm-box--rounded-lg"
            aria-label="copy-button"
            data-testid="address-copy-button-text"
            style="cursor: pointer; position: absolute; right: -32px; top: -2px"
          >
            <span
              class="mm-box mm-icon mm-icon--size-md copysvg 
              mm-box--display-inline-block mm-box--color-inherit"
            ></span>
          </button>
        </div>
      </div>
      <div class="skypeGroups_tabs">
        <van-tabs v-model="activeName"
        type="line" color="#121314" class="skypeGroups_tabs_child">
            <van-tab title="Type" name="a"></van-tab>
            <van-tab title="Details" name="b"></van-tab>
        </van-tabs>
        <template v-if="activeName == 'a'">

        
        <div class="mm-box mm-banner-base 
            mm-banner-alert mm-banner-alert--severity-info 
            mm-box--margin-top-4 mm-box--padding-3 
            mm-box--padding-left-2 mm-box--display-flex mm-box--gap-2 
            mm-box--background-color-primary-muted mm-box--rounded-sm">
            <span class="mm-box mm-icon mm-icon--size-lg 
                mm-box--display-inline-block infosvg
                mm-box--color-primary-default"></span>
                <div class="mm-box 
                mm-box--min-width-0">
                    <p class="mm-box mm-text 
                    mm-text--body-lg-medium 
                    mm-box--color-text-default">
                    Switch to smart account</p>
                    <p class="mm-box mm-text 
                    mm-text--body-md mm-box--color-text-default">
                    Same address. Smarter features.
                    </p>
                    <button class="mm-box mm-text 
                    mm-button-base mm-button-link 
                    mm-button-link--size-inherit 
                    mm-text--body-md-medium mm-box--padding-0 
                    mm-box--padding-right-0 mm-box--padding-left-0 
                    mm-box--display-inline-flex mm-box--justify-content-center 
                    mm-box--align-items-center mm-box--color-primary-default 
                    mm-box--background-color-transparent" 
                    target="_blank" rel="noopener noreferrer">
                    了解更多
                    </button>
                </div>
        </div>
        <div class="
        mm-box mm-box--margin-top-4 
        mm-box--display-flex mm-box--justify-content-space-between 
        mm-box--align-items-center">
            <div class="mm-box mm-box--display-flex 
            mm-box--justify-content-flex-start 
            mm-box--align-items-center">
                <div class="mm-box mm-text 
                mm-avatar-base mm-avatar-base--size-md 
                mm-avatar-network mm-text--body-sm 
                mm-text--text-transform-uppercase 
                mm-box--display-flex mm-box--justify-content-center 
                mm-box--align-items-center mm-box--color-text-default 
                mm-box--background-color-background-alternative 
                mm-box--rounded-md mm-box--border-color-background-default 
                mm-box--border-width-1 box--border-style-solid">
                    <img 
                    class="mm-avatar-network__network-image" 
                    src="@/static/icon/eth_logo.svg" 
                    alt="Ethereum Mainnet logo">
                </div>
                <div class="
                mm-box mm-box--margin-inline-start-4 
                mm-box--display-flex mm-box--flex-direction-column">
                    <p class="mm-box mm-text 
                    mm-text--body-md-medium 
                    mm-box--color-text-default">Ethereum Mainnet</p>
                    <p class="mm-box mm-text mm-text--body-md 
                    mm-box--color-text-alternative">Standard Account</p>
                </div>
            </div>
            <button class="mm-box mm-text mm-button-base 
            mm-button-link mm-button-link--size-auto 
            mm-text--body-md-medium mm-box--padding-0 
            mm-box--padding-right-0 mm-box--padding-left-0 
            mm-box--display-inline-flex mm-box--justify-content-center 
            mm-box--align-items-center mm-box--color-primary-default 
            mm-box--background-color-transparent">切换</button>
        </div>
        </template>
        <template v-else-if="activeName == 'b'">
            <div class="skypeGroups_qrcode">
                <img src="" alt="" class="imgqr">
            </div>
            <div class=" 
            mm-text--body-lg-medium 
            mm-text--text-align-center 
            mm-box--color-text-default">
                Account 1
            </div>
            <div class="miyaob  mm-text--body-lg-medium ">
                0x9b5e
                <span class="ss">3e15d28b856ee1077370bbbb303b2d9</span>
                5ee52
            </div>
            <div class="copybox">
                <span class="copybox_icon 
                mm-icon--size-sm 
                mm-icon"></span>
                Copy address
            </div>
            <button class="mm-box mm-text mm-button-base 
            mm-button-base--size-lg mm-button-base--block 
            mm-button-secondary mm-text--body-md 
            mm-box--margin-bottom-1 mm-box--padding-0 
            mm-box--padding-right-4 mm-box--padding-left-4 
            mm-box--display-inline-flex mm-box--justify-content-center 
            mm-box--align-items-center mm-box--color-primary-default 
            mm-box--background-color-transparent mm-box--rounded-pill 
            mm-box--border-color-primary-default box--border-style-solid 
            box--border-width-1" 
            data-testid="account-details-display-export-private-key">显示私钥</button>
            <button class="mm-box mm-text mm-button-base 
            mm-button-base--size-lg mm-button-base--block 
            mm-button-secondary mm-text--body-md 
            mm-box--margin-bottom-1 mm-box--padding-0 
            mm-box--padding-right-4 mm-box--padding-left-4 
            mm-box--display-inline-flex mm-box--justify-content-center 
            mm-box--align-items-center mm-box--color-primary-default 
            mm-box--background-color-transparent mm-box--rounded-pill 
            mm-box--border-color-primary-default box--border-style-solid 
            box--border-width-1" 
            data-testid="account-details-display-export-private-key">显示私钥助记词</button>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_conts {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
  display: flex;
}
.editsvg {
  mask-image: url("@/static/icon/edit.svg");
}
.copysvg {
  mask-image: url("@/static/icon/copy.svg");
}
.checksvg{
    mask-image: url("@/static/icon/check.svg");
}
.ppboxs22{
    padding: 0 10px;
}
.skypeGroups_tabs{
    padding: 16px 16px 0;
    &_child {
        border-bottom: 1px solid #b7bbc866;
        // background-color: #f6f6f7;
    }
}
.infosvg{
    mask-image: url("@/static/icon/info.svg");
}
</style>