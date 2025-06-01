<script>
export default {
  name:'',
  data(){ return{} },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
  }
}
</script>
<template>
  <div class="permission">
    <van-nav-bar
        title="权限"
        left-text=""
        :border="false"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="permission_txt">此处暂无内容</div>
  </div>
</template>
<style lang="scss">
.permission{
    .van-nav-bar__arrow{
        color: #121314;
    }
    &_txt{
        text-align: center;
        font-size: 14px;
        color: #121314;
        margin-top: 40vh;
    }
}
</style>