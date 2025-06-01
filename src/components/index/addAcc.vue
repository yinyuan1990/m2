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
      this.$emit('backFn','addAccVueShow')
    },
    goTanFn(showtxt){ // 去弹框
      this.$emit('nextFn',{hide:'addAccVueShow',show:showtxt})
    }
  },
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">添加账户</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>
      <div class="skypeGroups_body">
        <p class="
        mm-box mm-text 
        mm-text--body-sm-medium 
        mm-box--margin-bottom-2 
        mm-box--color-text-alternative">
            创建新账户
        </p>
        <div class="exprotboxs">
            <span class="exprotboxs_icon"></span>
            以太坊账户
        </div>
        <div class="exprotboxs ">
            <span class="exprotboxs_icon"></span>
            Solana 账户
        </div>
        <p class="
        mm-box mm-text 
        mm-text--body-sm-medium 
        mm-box--margin-bottom-2 
        mm-box--color-text-alternative">
            导入钱包或账户
        </p>
        <div class="exprotboxs " @click="goTanFn('importVocabularyVueShow')">
            <span class="exprotboxs_icon syqb"></span>
            私钥助记词
        </div>
        <div class="exprotboxs syq" @click="goTanFn('signttVueShow')">
            <span class="exprotboxs_icon"></span>
            私钥
        </div>
        <p class="
        mm-box mm-text 
        mm-text--body-sm-medium 
        mm-box--margin-bottom-2 
        mm-box--color-text-alternative">
            导入钱包或账户
        </p>
        <div class="exprotboxs">
            <span class="exprotboxs_icon qbs"></span>
            硬件钱包
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">

.skypeGroups_body{
    padding: 16px;

}
.syqb.exprotboxs_icon{
    mask-image: url('@/static/icon/wallet.svg');
}
.syq.exprotboxs_icon{
    mask-image: url('@/static/icon/key.svg');
}
.qbs.exprotboxs_icon{
    mask-image: url('@/static/icon/hardware.svg');
}
</style>