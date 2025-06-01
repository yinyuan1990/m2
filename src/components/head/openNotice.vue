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
      <div class="skypeGroups_head">开启通知</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <div class="skypeGroups_body">
        <img src="@/static/img/turn-on-metamask-notifications.png" 
        alt="" class="skypeGroups_body_bigimg"/>
        <p class="
        mm-box mm-text mm-text--body-md 
        mm-box--color-text-default">
            通过通知随时了解您的钱包动态。
        </p>
        <p class="
        mm-box mm-text mm-text--body-md mm-box--padding-top-4 
        mm-box--color-text-default">
        <span> 为了使用钱包通知，我们使用配置文件在您的不同设备上同步某些设置。
            <a class="mm-box mm-text mm-text--body-md mm-box--color-info-default" 
                href="https://support.metamask.io/privacy-and-security/profile-privacy" 
                target="_blank" rel="noopener noreferrer">
                了解我们如何在使用此功能时保护您的隐私。
            </a> 
        </span>
        </p>
        <p class="
        mm-box mm-text mm-text--body-md 
        mm-box--padding-top-4 mm-box--color-text-default">
            <span> 您可以随时在 
                <span class="mm-box mm-text 
                mm-text--body-md mm-text--font-weight-bold 
                mm-box--color-text-default">
                    设置 &gt; 通知。
                </span> 
                中关闭通知 
            </span>
        </p>
        <div class="skypeGroups_body_openbtn">开启</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">

.skypeGroups_body{
    padding: 16px 16px 0;
    margin-top: 10px;
    &_bigimg{
        width: 100%;
        display: block;
        border-radius: 6px;
        margin-bottom: 8px;
    }
    &_openbtn{
        box-shadow: 0 2px 8px 0 #4459ff33;
        background: #4459ff;
        color: #fff;
        font-size: 16px;
        text-align: center;
        width: 100%;
        height: 48px;
        line-height: 48px;
        border-radius: 24px;
        margin-top: 16px;
    }
}
</style>