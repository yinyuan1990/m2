<script>
export default {
  data() {
    return {
        isShowSign:true,// 是否显示私钥
    };
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
      <div class="skypeGroups_head">显示私钥</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>
      <div class="skypeGroups_bodys">
        <div class="mm-box mm-text mm-avatar-base mm-avatar-base--size-lg mm-avatar-account mm-text--body-lg-medium mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full" style="margin: 0px auto;"><div class="mm-avatar-account__jazzicon"><div style="border-radius: 50px; overflow: hidden; padding: 0px; margin: 0px; width: 40px; height: 40px; display: inline-block; background: rgb(242, 102, 2);"><svg x="0" y="0" width="40" height="40"><rect x="0" y="0" width="40" height="40" transform="translate(0.05685351432645343 0.4433106079433776) rotate(204.4 20 20)" fill="#2392E1"></rect><rect x="0" y="0" width="40" height="40" transform="translate(-11.046973737529628 23.00383081265733) rotate(198.4 20 20)" fill="#FB1895"></rect><rect x="0" y="0" width="40" height="40" transform="translate(30.59082709441744 -18.92038489037452) rotate(481.9 20 20)" fill="#018E72"></rect></svg></div></div></div>
        <p class="mm-box mm-text mm-text--body-lg-medium mm-box--margin-top-2 mm-box--margin-bottom-2 mm-box--color-text-default" style="word-break: break-word;text-align:center;">Account 1</p>
        <button 
            class="mm-box ppbtn16
            mm-text mm-button-base mm-button-base--size-sm 
            multichain-address-copy-button mm-text--body-sm 
            mm-box--padding-0 mm-box--padding-right-4 
            mm-box--padding-left-4 mm-box--display-inline-flex 
            mm-box--justify-content-center mm-box--align-items-center 
            mm-box--color-primary-default mm-box--background-color-primary-muted 
            mm-box--rounded-pill" 
            data-testid="address-copy-button-text">
            <span  
                class="mm-box mm-text 
                mm-text--inherit 
                mm-box--color-primary-default">
                <div class="mm-box mm-box--display-flex">0x9B5E3...5eE52</div>
            </span>
            <span class="mm-box mm-icon ts copysvg
            mm-icon--size-sm mm-box--margin-inline-start-1 
            mm-box--display-inline-block mm-box--color-inherit" 
            style=""></span>
        </button>
        <label class="mm-box mm-text mm-label mm-label--html-for dsiboxss mt20
        mm-form-text-field__label mm-text--body-md mm-text--font-weight-medium 
        mm-box--display-inline-flex mm-box--align-items-center mm-box--color-text-default" 
        for="account-details-authenticate">
            {{isShowSign?'Account 1 的私钥':'输入您的密码'}}
        </label>
        <div class="mm-box mm-box--padding-4 
        mm-box--display-flex mm-box--gap-4 
        mm-box--flex-direction-row 
        mm-box--align-items-center mm-box--rounded-sm 
        mm-box--border-width-1 box--border-style-solid"
        v-if="isShowSign">
            <p class="mm-box mm-text mm-text--body-sm mm-box--color-text-default" 
            data-testid="account-details-key" style="word-break: break-word;">
             <span>e5f14d19922066b8b4051c5f48540333bf4f0ac637a2cdde8e1319ead10eb3b0</span>
            </p>
            <button class="mm-box mm-button-icon 
            mm-button-icon--size-lg 
            mm-box--display-inline-flex 
            mm-box--justify-content-center mm-box--align-items-center 
            mm-box--color-icon-default mm-box--background-color-transparent 
            mm-box--rounded-lg" aria-label="复制私钥">
            <span class="mm-box mm-icon copysvg
            mm-icon--size-lg mm-box--display-inline-block 
            mm-box--color-inherit" ></span>
            </button>
        </div>
        <div v-else
        class="mm-box dsiboxss
        mm-text-field mm-text-field--size-md 
        mm-text-field--truncate mm-form-text-field__text-field 
        mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex 
        mm-box--align-items-center mm-box--background-color-background-default 
        mm-box--rounded-sm mm-box--border-width-1 box--border-style-solid">
            <input class="mm-box mm-text mm-input ppbtn16
            mm-input--disable-state-styles mm-text-field__input 
            mm-text--body-md mm-box--margin-0 mm-box--padding-0 
            mm-box--padding-right-4 mm-box--padding-left-4 
            mm-box--color-text-default mm-box--background-color-transparent 
            mm-box--border-style-none" 
            autocomplete="off" id="account-details-authenticate" 
            placeholder="密码" type="password" focused="false" value="">
        </div>
        <div class="mm-box mm-banner-base mm-banner-alert 
        mm-banner-alert--severity-danger mm-box--margin-top-6 
        mm-box--padding-3 mm-box--padding-left-2 mm-box--display-flex 
        mm-box--gap-2 mm-box--background-color-error-muted 
        mm-box--rounded-sm">
            <span class="mm-box mm-icon danger
            mm-icon--size-lg mm-box--display-inline-block 
            mm-box--color-error-default" 
            ></span>
            <div class="mm-box mm-box--min-width-0">
                <p class="mm-box mm-text mm-text--body-md 
                mm-box--color-text-default">
                警告：切勿泄露此私钥。任何拥有您私钥的人都可以窃取您账户中持有的任何资产。
                </p>
                <p class="mm-box mm-text mm-text--body-md mm-box--color-text-default"></p>
            </div>
        </div>
        <div class="skypeGroups_bodys_censs">
            <div class="skypeGroups_bodys_censs_n">取消</div>
            <div class="skypeGroups_bodys_censs_n ok">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_bodys{
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.copysvg{
    mask-image: url('@/static/icon/copy.svg');
}
.copy-success{
    mask-image: url('@/static/icon/copy-success.svg');
}
.danger{
    mask-image: url('@/static/icon/danger.svg');
}
.ppbtn16{
    padding: 0 16px;
    margin: 0 auto;
}
.mt20{
    margin-top: 20px;
}
.dsiboxss{
    width: 100%;
    text-align: left;
    // display: block;
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