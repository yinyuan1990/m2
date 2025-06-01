<script>
export default {
  data() {
    return {};
  },
  methods:{
    backFn(){
        this.$router.back()
    }
  }
};
</script>
<template>
  <div class="exchange">
    <headtop :topHis="true"></headtop>
    <div class="exchange_head">
      <span
        class="mm-box mm-icon ts arrow-2-left
        mm-icon--size-lg 
        mm-box--display-inline-block mm-box--color-icon-alternative"
        title="取消"
        @click="backFn"
      ></span>
      <div class="nr">兑换</div>
      <span
        class="mm-box mm-icon ts settingsvg
        mm-icon--size-lg 
        mm-box--display-inline-block mm-box--color-icon-alternative"
        title="取消"
      ></span>
    </div>
    <div class="exchange_bodys">
        <div class="prepare-swap-page__swap-from-content">
            <div class="box box--display-flex box--gap-4 
            box--flex-direction-row box--justify-content-space-between 
            box--align-items-center">
                <div class="selected-token">
                    <div class="selected-token-list 
                    selected-token-list__selector-closed-container 
                    selected-token-input-pair__selector--closed" 
                    data-testid="selected-token-list" tabindex="0">
                        <div class="selected-token-list__selector-closed">
                            <div class="">
                                <img src="@/static/icon/eth_logo.svg" 
                                style="    margin-right: 8px;"
                                class="url-icon selected-token-list__selector-closed-icon" 
                                alt="ETH">
                            </div>
                            <div class="selected-token-list__labels 
                            selected-token-list__labels--with-icon">
                                <div class="selected-token-list__item-labels">
                                    <span data-testid="prepare-swap-page-swap-from" 
                                    class="selected-token-list__closed-primary-label">ETH</span>
                                </div>
                            </div>
                        </div>
                        <span class="mm-box mm-icon ts arrow-down
                        mm-icon--size-xs mm-box--margin-right-3 mm-box--display-inline-block 
                        mm-box--color-icon-alternative" 
                        style="    margin-right: 12px;"></span>
                    </div>
                </div>
                <div class="box box--display-flex 
                box--flex-direction-row box--align-items-center">
                    <div class="mm-box mm-text-field 
                    mm-text-field--size-sm 
                    prepare-swap-page__from-token-amount 
                    prepare-swap-page__from-token-amount--lg 
                    mm-box--padding-right-0 mm-box--padding-left-0 
                    mm-box--display-inline-flex mm-box--align-items-center 
                    mm-box--background-color-background-default 
                    mm-box--rounded-sm mm-box--border-width-1 
                    box--border-style-solid">
                        <input class="mm-box mm-text mm-input pintss
                        mm-input--disable-state-styles mm-text-field__input 
                        mm-text--body-md mm-box--margin-0 mm-box--padding-0 
                        mm-box--padding-right-4 mm-box--padding-left-4 
                        mm-box--color-text-default mm-box--background-color-transparent 
                        mm-box--border-style-none" autocomplete="off" 
                        placeholder="0" type="text" 
                        data-testid="prepare-swap-page-from-token-amount" 
                        focused="false" value="11">
                    </div>
                </div>
            </div>
            <div class="box box--display-flex box--flex-direction-row 
            box--justify-content-space-between 
            box--align-items-stretch">
                <div class="prepare-swap-page__balance-message">余额: 0</div>
                <div class="box box--display-flex 
                    box--flex-direction-row 
                    box--justify-content-flex-end box--align-items-flex-end">
                    <p class="mm-box mm-text mm-text--body-sm 
                    mm-box--color-text-alternative">$28,914.71</p>
                </div>
            </div>
            <div class="box box--display-flex 
            box--flex-direction-row box--justify-content-flex-start">
            <p class="mm-box mm-text mm-text--body-sm-bold 
            mm-box--margin-top-0 mm-box--color-text-alternative">ETH 不足</p>
            </div>
            <div class="box box--display-flex 
            box--flex-direction-row box--justify-content-center">
                <div class="prepare-swap-page__switch-tokens" 
                    data-testid="prepare-swap-page-switch-tokens" title="切换代币顺序">
                    <span class="mm-box mm-icon ts arrow-2-down
                    mm-icon--size-lg mm-box--display-inline-block mm-box--color-inherit"></span>
                </div>
            </div>
        </div>
        <div class="prepare-swap-page__swap-to-content">
            <div class="box box--display-flex box--gap-4 
            box--flex-direction-row box--justify-content-space-between 
            box--align-items-center">
                <div class="selected-token">
                    <div class="selected-token-list 
                    selected-token-list__selector-closed-container 
                    selected-token-input-pair__selector--closed" 
                    data-testid="selected-token-list" tabindex="0">
                        <div class="selected-token-list__selector-closed">
                            <div class="">
                                <img src="@/static/icon/eth_logo.svg" 
                                style="    margin-right: 8px;"
                                class="url-icon selected-token-list__selector-closed-icon" 
                                alt="ETH">
                            </div>
                            <div class="selected-token-list__labels 
                            selected-token-list__labels--with-icon">
                                <div class="selected-token-list__item-labels">
                                    <span data-testid="prepare-swap-page-swap-from" 
                                    class="selected-token-list__closed-primary-label">ETH</span>
                                </div>
                            </div>
                        </div>
                        <span class="mm-box mm-icon ts arrow-down
                        mm-icon--size-xs mm-box--margin-right-3 mm-box--display-inline-block 
                        mm-box--color-icon-alternative" 
                        style="    margin-right: 12px;"></span>
                    </div>
                </div>
                <div class="box box--display-flex 
                box--flex-direction-row box--align-items-center">
                    <div class="mm-box mm-text-field 
                    mm-text-field--size-sm 
                    prepare-swap-page__from-token-amount 
                    prepare-swap-page__from-token-amount--lg 
                    mm-box--padding-right-0 mm-box--padding-left-0 
                    mm-box--display-inline-flex mm-box--align-items-center 
                    mm-box--background-color-background-default 
                    mm-box--rounded-sm mm-box--border-width-1 
                    box--border-style-solid">
                        <input class="mm-box mm-text mm-input pintss
                        mm-input--disable-state-styles mm-text-field__input 
                        mm-text--body-md mm-box--margin-0 mm-box--padding-0 
                        mm-box--padding-right-4 mm-box--padding-left-4 
                        mm-box--color-text-default mm-box--background-color-transparent 
                        mm-box--border-style-none" autocomplete="off" 
                        placeholder="0" type="text" 
                        disabled
                        data-testid="prepare-swap-page-from-token-amount" 
                        focused="false" value="11">
                    </div>
                </div>
            </div>
            <div class="box box--display-flex box--flex-direction-row 
            box--justify-content-space-between 
            box--align-items-stretch">
                <div class="prepare-swap-page__balance-message">余额: 0</div>
                <div class="box box--display-flex 
                    box--flex-direction-row 
                    box--justify-content-flex-end box--align-items-flex-end">
                    <p class="mm-box mm-text mm-text--body-sm 
                    mm-box--color-text-alternative">$28,914.71</p>
                </div>
            </div>
            <div class="box box--display-flex 
            box--flex-direction-row box--justify-content-flex-start">
            </div>
        </div>
        <button class="mm-box mm-text discent mtb12
        mm-button-base mm-button-link 
        mm-button-link--size-auto mm-text--body-sm 
        mm-text--font-weight-normal mm-box--margin-top-2 
        mm-box--padding-0 mm-box--padding-right-0 
        mm-box--padding-left-0 mm-box--display-inline-flex 
        mm-box--justify-content-center mm-box--align-items-center 
        mm-box--color-primary-default mm-box--background-color-transparent" 
        target="_blank" 
        data-testid="prepare-swap-page-cross-chain-swaps-link">使用跨链桥跨网络兑换</button>
        <div class="mm-box mm-banner-base 
        mm-banner-alert mm-banner-alert--severity-info 
        mm-box--margin-top-2 mm-box--padding-3 
        mm-box--padding-left-2 mm-box--display-flex 
        mm-box--gap-2 mm-box--background-color-primary-muted 
        tipsboxs
        mm-box--rounded-sm">
            <span class="mm-box mm-icon ts infoSvg
            mm-icon--size-lg mm-box--display-inline-block mm-box--color-primary-default"></span>
            <div class="mm-box mm-box--min-width-0">
                <p class="mm-box mm-text 
                mm-text--body-lg-medium 
                mm-box--color-text-default" 
                data-testid="swaps-banner-title">余额不足</p>
                <p class="mm-box mm-text mm-text--body-md 
                mm-box--color-text-default" 
                data-testid="mm-banner-alert-notification-text">我们无法检索您的 USDC 余额</p>
                <p class="mm-box mm-text mm-text--body-md 
                mm-box--color-text-default"></p>
                <button class="mm-box mm-text mm-button-base 
                mm-button-link mm-button-link--size-auto 
                mm-text--body-md-medium mm-box--padding-0 
                mm-box--padding-right-0 mm-box--padding-left-0 
                mm-box--display-inline-flex mm-box--justify-content-center 
                mm-box--align-items-center mm-box--color-primary-default 
                mm-box--background-color-transparent">购买更多ETH</button>
            </div>
        </div>
        <div data-testid="countdown-timer__timer-container " 
        class="countdown-timer__timer-container flexjuscenbox mtb12">
            <span> <div class="countdown-timer__time">0:12</div> 后更新报价 </span>
        </div>
        <div class="box box--display-flex box--flex-direction-row 
        box--justify-content-space-between box--align-items-center">
            <p class="mm-box mm-text mm-text--body-md 
            mm-box--margin-right-1 
            mm-box--color-text-default">报价*</p>
            <div class="exchange-rate-display review-quote__exchange-rate-display">
                <div class="box exchange-rate-display__quote-rate--no-link 
                box--display-flex box--gap-1 box--flex-direction-row 
                box--justify-content-center box--align-items-center 
                box--color-text-default" 
                data-testid="exchange-rate-display-quote-rate">
                    <span>1</span>
                    <span class="" 
                    data-testid="exchange-rate-display-base-symbol">ETH</span>
                    <span>=</span>
                    <span>2612.9569</span>
                    <span class="">USDC</span>
                </div>
            </div>
        </div>
        <div class="box box--display-flex box--flex-direction-row 
        box--justify-content-space-between box--align-items-center">
            <div class="mm-box mm-text mm-text--body-md 
            mm-box--margin-right-1 
            mm-box--color-text-default">估算的燃料费
                <div class="info-tooltip__tooltip-container" tabindex="0" 
                    data-tooltipped="" aria-describedby="tippy-tooltip-16" 
                    data-original-title="null" style="display: inline-block;width: 12px;">
                    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M5 0C2.2 0 0 2.2 0 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.2-.7-.6.3-.8.7-.8zm.7 6H4.3V4.3h1.5V8z" fill="var(--color-icon-alternative)"></path></svg>
                </div>
            </div>
            <div class="exchange-rate-display review-quote__exchange-rate-display"
            style="width: 190px !important;">
                <div class="box box--display-flex 
                box--flex-direction-row 
                box--align-items-flex-end box--width-6/12"
                style="width:100%;">
                    <h6 class="mm-box mm-text mm-text--body-md 
                    mm-text--text-align-right mm-box--padding-right-1 
                    mm-box--width-8/12 mm-box--color-text-default">0.00068 ETH</h6>
                    <h6 class="mm-box mm-text mm-text--body-md-bold 
                    mm-text--text-align-right mm-box--width-4/12 
                    mm-box--color-text-default" data-testid="review-quote-gas-fee-in-fiat"> $1.78</h6>
                </div>
            </div>
        </div>
        <div class="box box--display-flex box--flex-direction-row 
        box--justify-content-space-between box--align-items-center">
            <div class="mm-box mm-text mm-text--body-md 
            mm-box--margin-right-1 
            mm-box--color-text-default"></div>
            <div class="exchange-rate-display review-quote__exchange-rate-display"
            style="width: 190px !important;">
                <div class="box box--display-flex 
                box--flex-direction-row 
                box--align-items-flex-end box--width-6/12"
                style="width:100%;">
                    <h6 class="mm-box mm-text mm-text--body-md 
                    mm-text--text-align-right mm-box--padding-right-1 
                    mm-box--width-8/12 mm-box--color-text-default">最大费用: </h6>
                    <h6 class="mm-box mm-text mm-text--body-md-bold 
                    mm-text--text-align-right mm-box--width-4/12 
                    mm-box--color-text-default" data-testid="review-quote-gas-fee-in-fiat"> $1.78</h6>
                </div>
            </div>
        </div>
        <div class="box box--margin-top-3 
        box--display-flex box--flex-direction-row 
        box--justify-content-center box--align-items-center">
            <p class="mm-box mm-text mm-text--body-sm 
            mm-box--color-text-alternative">*
                <span> 包含0.875%的MetaMask费用 – 
                    <button class="mm-box mm-text mm-button-base 
                    mm-button-link mm-button-link--size-inherit 
                    mm-text--body-md-medium mm-box--padding-0 
                    mm-box--padding-right-0 mm-box--padding-left-0 
                    mm-box--display-inline-flex mm-box--justify-content-center 
                    mm-box--align-items-center mm-box--color-primary-default 
                    mm-box--background-color-transparent" 
                    data-testid="review-quote-view-all-quotes">查看所有报价</button> 
                </span>
            </p>
        </div>
        <div class="exchange_foot">
            <div class="exchange_foot_btn mm-text--body-md-medium">显示最新报价</div>
            <div class="exchange_foot_txt">服务条款</div>
        </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.exchange {
  width: 100vw;
  height: 100vh;
  &_head {
    margin: 20px auto;
    display: flex;
    padding: 0 16px;
    background: #f3f5f9;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    .nr{
        flex: 1;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
  }
  &_bodys{
    padding: 12px 16px;
    
  }
  .pintss{
    padding-right: 4px;
    text-align: right;
    padding-left: 16px;
  }
  .tipsboxs{
    border-left: 4px solid var(--color-primary-default);
    padding-left: 8px;
    width: fit-content;
    margin: 8px auto;
  }
  
  .discent{
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .flexjuscenbox{
    display: flex;
    justify-content: center;
  }
  .mtb12{
    margin: 12px auto;
  }
  &_foot{
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 16px;
    &_btn{
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #ffffff;
        background: #4459ff;
        text-align: center;
        border-radius: 20px;
        opacity: 0.5;
        margin: 0 auto 10px;
        &.active{
            opacity:1;
        }
    }
    &_txt{
        font-size: 0.75rem;
        font-family: var(--font-family-default);
        line-height: 140%;
        font-style: normal;
        font-weight: normal;
        color: var(--color-primary-default);
        margin-bottom: 16px;
        cursor: pointer;
        display: flex;
        justify-content: center;
    }
  }
}
.settingsvg {
  mask-image: url("@/static/icon/setting.svg");
}
.infoSvg {
  mask-image: url("@/static/icon/info.svg");
}
.arrow-2-left {
  mask-image: url("@/static/icon/arrow-2-left.svg");
}
.arrow-down{
    mask-image: url("@/static/icon/arrow-down.svg");
}
.arrow-2-down{
    mask-image: url("@/static/icon/arrow-2-down.svg");
}
</style>