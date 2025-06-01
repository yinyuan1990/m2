<script>
export default {
  data() {
    return {};
  },
};
</script>
<template>
  <div
    id="sortgz"
    class="mm-box mm-popover mm-popover--open mm-popover--reference-hidden mm-box--padding-4 mm-box--background-color-background-default mm-box--rounded-lg mm-box--border-color-border-muted box--border-style-solid box--border-width-1"
    role="tooltip"
    data-popper-reference-hidden="false"
    data-popper-escaped="false"
    data-popper-placement="bottom-start"
    style="
      position: absolute;
      inset: 0px auto auto 0px;

      right: 0;
      left: unset;
      top: 32px;
      width: auto;
      z-index: 10;
      display: flex;
      flex-direction: column;
      padding: 0px;
      min-width: 250px;
    "
  >
    <div
      class="mm-box selectable-list-item-wrapper"
      data-testid="network-filter-all"
    >
      <button
        class="mm-box mm-text selectable-list-item 
        mm-text--body-md mm-box--display-flex mm-box--align-items-center 
        mm-box--width-full mm-box--color-text-default mm-box--background-color-background-default"
        data-testid="network-filter-all__button"
      >
        <div
          class="mm-box mm-box--display-flex mm-box--gap-3 mm-box--justify-content-space-between mm-box--width-full"
        >
          按字母顺序排列（A-Z）
        </div>
      </button>
      
    </div>
    <div
      class="mm-box selectable-list-item-wrapper"
      data-testid="network-filter-current"
    >
      <button
        class="mm-box mm-text selectable-list-item mm-text--body-md selectable-list-item--selected 
        mm-box--display-flex mm-box--align-items-center mm-box--width-full 
        mm-box--color-text-default mm-box--background-color-background-default"
        data-testid="network-filter-current__button"
      >
        <div
          class="mm-box mm-box--display-flex mm-box--gap-3 mm-box--justify-content-space-between mm-box--align-items-center mm-box--width-full"
        >
          余额降序（$ 高-低）
        </div>
      </button>
      <div
        class="mm-box selectable-list-item__selected-indicator mm-box--background-color-primary-default mm-box--rounded-pill"
      ></div>
    </div>
  </div>
</template>
<style scoped>
</style>