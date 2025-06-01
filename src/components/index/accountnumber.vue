<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
    backFn(){
        this.$emit('backFn')
    }
  },
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">Add 以太坊 account</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>
      <div class="skypeGroups_body">
        <div class="skypeGroups_shebox">账户名称</div>
        <input type="text" class="skypeGroups_inp" placeholder="Account 2"/>
        <div class="skypeGroups_btns">
            <div class="skypeGroups_btns_cen">取消</div>
            <div class="skypeGroups_btns_cen ok">确认</div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_body{
    padding: 16px;
}
.skypeGroups_shebox{
    font-weight: 500;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
    color: #121314;
}
.skypeGroups_inp{
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
.skypeGroups_btns{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    &_cen{
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