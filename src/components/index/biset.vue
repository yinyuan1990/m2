<script>
export default {
  data() {
    return {};
  },
  methods:{
    addDbFn(){
      console.log('addDbFn')
      this.$emit('addDbFn')
    },
    Refresh(){
      this.$emit('Refresh')
    }
  }
};
</script>
<template>
  <div
    id="biset"
    class="mm-box mm-popover mm-popover--open mm-popover--reference-hidden mm-box--padding-4 mm-box--background-color-background-default mm-box--rounded-lg mm-box--border-color-border-muted box--border-style-solid box--border-width-1"
    role="tooltip"
    style="
      position: absolute;
      right: 0;
      left: unset;
      top: 32px;
      width: auto;
      z-index: 10;
      display: flex;
      flex-direction: column;
      padding: 0px;
      min-width: 158px;
    "
    data-popper-reference-hidden="false"
    data-popper-escaped="false"
    data-popper-placement="bottom-end"
  >
    <div class="mm-box selectable-list-item-wrapper" @click="addDbFn"
    data-testid="importTokens">
      <button
        class="mm-box mm-text selectable-list-item mm-text--body-md mm-box--display-flex mm-box--align-items-center mm-box--width-full mm-box--color-text-default mm-box--background-color-background-default"
        data-testid="importTokens__button"
        
      >
        <span
          class="mm-box mm-icon mm-icon--size-sm addsvg
          mm-box--margin-inline-end-2 mm-box--display-inline-block mm-box--color-inherit"
        ></span
        >添加代币
      </button>
    </div>
    <div class="mm-box selectable-list-item-wrapper" data-testid="refreshList">
      <button
        class="mm-box mm-text selectable-list-item mm-text--body-md mm-box--display-flex mm-box--align-items-center mm-box--width-full mm-box--color-text-default mm-box--background-color-background-default"
        data-testid="refreshList__button"
        @click="Refresh"
      >
        <span
          class="mm-box mm-icon mm-icon--size-sm refreshsvg
          mm-box--margin-inline-end-2 mm-box--display-inline-block mm-box--color-inherit"
        ></span
        >刷新列表
      </button>
    </div>
  </div>
</template>
<style scoped>
.refreshsvg{
    mask-image: url('@/static/icon/refresh.svg')
}
.addsvg{
    mask-image: url('@/static/icon/add.svg')
}
</style>