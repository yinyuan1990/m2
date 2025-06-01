<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
  },
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">充值方法</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>