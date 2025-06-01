<script>
export default {
  data() {
    return {};
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
      <div class="skypeGroups_head">添加自定义网络</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>
      <div class="skypeGroups_body">
        <div class="mm-box mm-box--padding-top-4 postrela">
            <label class="mm-box mm-text mm-label 
            mm-text--body-md-medium mm-text--font-weight-medium 
            mm-box--display-inline-flex mm-box--align-items-center 
            mm-box--color-text-default">默认 RPC（远程过程调用）URL</label>
            <div class="mm-box dropdown-editor__item-dropdown 
            mm-box--padding-right-4 mm-box--padding-left-4 pp16
            mm-box--display-flex mm-box--justify-content-space-between
            mm-box--align-items-center mm-box--rounded-lg 
            mm-box--border-color-primary-default mm-box--border-width-1 
            box--border-style-solid">
                <input class="mm-box mm-text mm-input 
                dropdown-editor__item-placeholder mm-text--body-md 
                mm-box--margin-0 mm-box--padding-0 mm-box--padding-top-3 
                mm-box--padding-bottom-3 mm-box--color-text-default 
                mm-box--background-color-transparent mm-box--border-style-none" 
                autocomplete="off" placeholder="添加 URL" 
                readonly="" type="text" tabindex="-1" value="">
                <button class="mm-box mm-button-icon 
                mm-button-icon--size-md mm-box--margin-left-auto 
                mm-box--display-inline-flex mm-box--justify-content-center 
                mm-box--align-items-center mm-box--color-icon-default 
                mm-box--background-color-transparent mm-box--rounded-lg" 
                aria-label="默认 RPC（远程过程调用）URL" 
                data-testid="test-add-rpc-drop-down">
                    <span class="mm-box mm-icon ts arrow-up
                    mm-icon--size-md 
                        mm-box--display-inline-block mm-box--color-inherit"></span>
                </button>
            </div>
            <div class="mm-box mm-popover 
            mm-popover--open mm-popover--reference-hidden 
            dropdown-editor__item-popover mm-box--padding-4 
            mm-box--padding-top-0 mm-box--padding-right-0 
            mm-box--padding-bottom-0 mm-box--padding-left-0 
            mm-box--background-color-background-default mm-box--rounded-lg 
            mm-box--border-color-border-muted box--border-style-solid 
            box--border-width-1" role="tooltip" 
            data-popper-reference-hidden="false" data-popper-escaped="false" 
            data-popper-placement="bottom" 
            style="position: absolute; inset: 0px auto auto 0px;  width: 100%;left:0;top:102%;">
                <div class="mm-box">
                    <div class="mm-box dropdown-editor__item 
                    mm-box--padding-4 mm-box--display-flex 
                    mm-box--align-items-center">
                        <span class="mm-box mm-icon ts addsvg
                        mm-icon--size-sm 
                        mm-box--margin-right-2 mm-box--display-inline-block 
                        mm-box--color-primary-default"></span>
                        <button class="mm-box mm-text mm-text--body-sm-medium 
                        mm-box--color-primary-default 
                        mm-box--background-color-transparent">添加 RPC（远程过程调用）URL</button>
                    </div>
                </div>
            </div>
        </div>
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