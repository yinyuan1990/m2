<script>
import selectU from '@/components/index/selectU.vue';
export default {
  name: '',
  components:{
    selectU
  },
  data() { return {
    selectUShow:false,// 弹框
  } },
  methods: {
    onClickLeft() { // 返回
      this.$router.back();
    }
  }
}
</script>
<template>
  <div class="openb">
    <selectU v-if="selectUShow" @closeFn="selectUShow"
    :hideAddBtn="false"></selectU>
    <van-nav-bar title="发送" left-arrow @click-left="onClickLeft" />
    <div
      class="mm-box multichain-page-content mm-box--padding-4 mm-box--display-flex mm-box--flex-direction-column mm-box--width-full mm-box--height-full">
      <div class="mm-box mm-box--padding-bottom-4 mm-box--display-flex mm-box--flex-direction-column">
        <label
          class="mm-box mm-text mm-label mm-text--body-md 
          mm-text--font-weight-medium mm-box--padding-bottom-2 
          mm-box--display-inline-flex mm-box--align-items-center 
          mm-box--color-text-default">自</label>
          <div class="ens-input">
            <div class="ens-input__wrapper ens-input__wrapper--valid">
              <div class="ens-input__wrapper__input 
              ens-input__wrapper__input--selected"
                data-testid="ens-input-selected">
                <div
                  class="mm-box mm-text mm-avatar-base 
                  mm-avatar-base--size-md mm-avatar-account 
                  mm-text--body-sm mm-text--text-transform-uppercase
                  mm-box--display-flex mm-box--justify-content-center 
                  mm-box--align-items-center mm-box--color-text-default 
                  mm-box--background-color-background-alternative 
                  mm-box--rounded-full mm-box--border-color-background-default 
                  box--border-style-solid box--border-width-1">
                  <div class="mm-avatar-account__jazzicon">
                    <div
                      style="border-radius: 50px; overflow: hidden; padding: 0px; margin: 0px; width: 32px; height: 32px; display: inline-block; background: rgb(3, 85, 94);">
                      <svg x="0" y="0" width="32" height="32">
                        <rect x="0" y="0" width="32" height="32"
                          transform="translate(1.2287117953293862 -0.5638602610158286) rotate(457.2 16 16)"
                          fill="#236FE1"></rect>
                        <rect x="0" y="0" width="32" height="32"
                          transform="translate(-3.403944040084849 -15.267229749046443) rotate(424.2 16 16)"
                          fill="#C81456"></rect>
                        <rect x="0" y="0" width="32" height="32"
                          transform="translate(24.603209621458493 -5.789959143834658) rotate(473.0 16 16)"
                          fill="#F93301"></rect>
                      </svg></div>
                  </div>
                </div>
                <div class="ens-input__selected-input__title">
                  Account 1<p
                    class="mm-box mm-text mm-text--body-sm 
                    mm-text--ellipsis mm-box--color-text-alternative">
                    0x07681...25DEf</p>
                </div>
              </div>
              <button
                class="mm-box mm-button-icon mm-button-icon--size-sm ens-input__wrapper__action-icon-button mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-default mm-box--background-color-transparent mm-box--rounded-lg"
                aria-label="关闭">
                <span
                  class="mm-box mm-icon ts arrow-down
                  mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
                  style=""></span>
                </button>
            </div>
          </div>
        </div>
      <div class="mm-box asset-picker-amount">
        <div
          class="mm-box mm-box--margin-bottom-1 mm-box--padding-1 mm-box--padding-top-1 mm-box--padding-bottom-1 mm-box--display-flex mm-box--align-items-center mm-box--background-color-background-default mm-box--rounded-lg mm-box--border-style-solid mm-box--border-color-error-default mm-box--border-width-1">
          <button
            class="mm-box mm-text mm-button-base mm-button-base--size-md asset-picker mm-text--body-md-medium mm-box--padding-2 mm-box--padding-right-2 mm-box--padding-left-2 mm-box--display-flex mm-box--gap-2 mm-box--align-items-center mm-box--color-text-default mm-box--background-color-transparent mm-box--rounded-pill"
            data-testid="asset-picker-button"><span class="mm-box mm-text mm-text--inherit mm-box--color-text-default">
              <div class="mm-box mm-box--display-flex mm-box--gap-3 mm-box--align-items-center">
                <div class="mm-box mm-box--display-flex">
                  <div class="mm-box mm-badge-wrapper mm-box--display-inline-block">
                    <div
                      class="mm-box mm-text mm-avatar-base mm-avatar-base--size-md mm-avatar-token mm-text--body-sm mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full">
                      <img class="mm-avatar-token__token-image" src="@/static/icon/eth_logo.svg" alt="ETH logo"></div>
                    <div
                      class="mm-box mm-badge-wrapper__badge-container mm-badge-wrapper__badge-container--rectangular-bottom-right">
                      <div
                        class="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs mm-avatar-network mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-md mm-box--border-color-border-muted mm-box--border-width-2 box--border-style-solid">
                        <img class="mm-avatar-network__network-image" src="@/static/icon/eth_logo.svg"
                          alt="Ethereum Mainnet logo"></div>
                    </div>
                  </div>
                </div>
                <div class="mm-box">
                  <div title="" class="" tabindex="0" style="display: inline;">
                    <p class="mm-box mm-text asset-picker__symbol mm-text--body-md mm-box--color-text-default">ETH</p>
                  </div>
                </div>
              </div>
            </span><span
              class="mm-box mm-icon ts arrow-down
              mm-icon--size-sm mm-box--margin-inline-start-0 mm-box--display-inline-block mm-box--color-icon-default"
              ></span></button>
          <div class="unit-input asset-picker-amount__input">
            <div class="unit-input__inputs">
              <div title="0" class="unit-input__input-container" style="display: inherit;"><input
                  data-testid="currency-input" type="number" dir="ltr" class="unit-input__input" placeholder="0" min="0"
                  step="any" value="0" style="width: 1.5ch;">
                <div class="unit-input__suffix">ETH</div>
              </div>
              <div
                class="mm-box currency-display-component currency-input__conversion-component mm-box--display-flex mm-box--flex-wrap-wrap mm-box--align-items-center"
                title="$0.00"><span
                  class="mm-box mm-text currency-display-component__text mm-text--inherit mm-text--ellipsis mm-box--color-text-default"
                  data-testid="account-value-and-suffix">$0.00</span></div>
            </div><button
              class="mm-box mm-button-icon mm-button-icon--size-sm asset-picker-amount__input__swap mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent mm-box--rounded-lg"
              aria-label="切换输入货币"><span
                class="mm-box mm-icon ts swap-vertical
                mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
                ></span></button>
          </div>
        </div>
        <div class="mm-box mm-box--display-flex">
          <div class="mm-box asset-picker-amount__balance mm-box--display-flex">
            <p class="mm-box mm-text mm-text--body-sm mm-box--margin-right-1 mm-box--color-error-default">余额:</p>
            <div
              class="mm-box currency-display-component mm-box--display-flex mm-box--flex-wrap-wrap mm-box--align-items-center"
              title="0"><span
                class="mm-box mm-text currency-display-component__text mm-text--body-sm mm-text--ellipsis mm-box--color-error-default"
                data-testid="account-value-and-suffix">0</span></div>
            <p class="mm-box mm-text mm-text--body-sm mm-box--color-error-default" data-testid="send-page-amount-error">
              . 燃料资金不足</p>
          </div>
        </div>
      </div>
      <div class="mm-box mm-box--margin-top-6">
        <div class="mm-box mm-box--padding-bottom-4 mm-box--display-flex mm-box--flex-direction-column">
          <label
            class="mm-box mm-text mm-label mm-text--body-md 
            mm-text--font-weight-medium mm-box--padding-bottom-2 
            mm-box--display-inline-flex mm-box--align-items-center mm-box--color-text-default">至</label>
          <div class="ens-input">
            <div class="ens-input__wrapper ens-input__wrapper--valid">
              <div class="ens-input__wrapper__input ens-input__wrapper__input--selected"
                data-testid="ens-input-selected">
                <div
                  class="mm-box mm-text mm-avatar-base mm-avatar-base--size-md mm-avatar-account mm-text--body-sm mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full mm-box--border-color-background-default box--border-style-solid box--border-width-1">
                  <div class="mm-avatar-account__jazzicon">
                    <div
                      style="border-radius: 50px; overflow: hidden; padding: 0px; margin: 0px; width: 32px; height: 32px; display: inline-block; background: rgb(3, 85, 94);">
                      <svg x="0" y="0" width="32" height="32">
                        <rect x="0" y="0" width="32" height="32"
                          transform="translate(1.2287117953293862 -0.5638602610158286) rotate(457.2 16 16)"
                          fill="#236FE1"></rect>
                        <rect x="0" y="0" width="32" height="32"
                          transform="translate(-3.403944040084849 -15.267229749046443) rotate(424.2 16 16)"
                          fill="#C81456"></rect>
                        <rect x="0" y="0" width="32" height="32"
                          transform="translate(24.603209621458493 -5.789959143834658) rotate(473.0 16 16)"
                          fill="#F93301"></rect>
                      </svg></div>
                  </div>
                </div>
                <div class="ens-input__selected-input__title">Account 1<p
                    class="mm-box mm-text mm-text--body-sm mm-text--ellipsis mm-box--color-text-alternative">
                    0x07681...25DEf</p>
                </div>
              </div><button
                class="mm-box mm-button-icon mm-button-icon--size-sm ens-input__wrapper__action-icon-button mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-default mm-box--background-color-transparent mm-box--rounded-lg"
                aria-label="关闭"><span
                  class="mm-box mm-icon ts close
                  mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
                  style=""></span></button>
            </div>
          </div>
        </div>
        <div class="mm-box">
          <div class="mm-box mm-box--padding-bottom-4 mm-box--display-flex mm-box--flex-direction-column">
            <div class="mm-box asset-picker-amount">
              <div
                class="mm-box mm-box--margin-bottom-1 mm-box--padding-1 mm-box--padding-top-1 mm-box--padding-bottom-1 mm-box--display-flex mm-box--align-items-center mm-box--background-color-background-default mm-box--rounded-lg mm-box--border-style-solid mm-box--border-color-border-muted mm-box--border-width-1">
                <button
                  class="mm-box mm-text mm-button-base mm-button-base--size-md mm-button-base--disabled asset-picker mm-text--body-md-medium mm-box--padding-2 mm-box--padding-right-2 mm-box--padding-left-2 mm-box--display-flex mm-box--gap-2 mm-box--align-items-center mm-box--color-text-default mm-box--background-color-transparent mm-box--rounded-pill"
                  disabled="" data-testid="asset-picker-button" title="在此地区无法兑换代币"><span
                    class="mm-box mm-text mm-text--inherit mm-box--color-text-default">
                    <div class="mm-box mm-box--display-flex mm-box--gap-3 mm-box--align-items-center">
                      <div class="mm-box mm-box--display-flex">
                        <div class="mm-box mm-badge-wrapper mm-box--display-inline-block">
                          <div
                            class="mm-box mm-text mm-avatar-base mm-avatar-base--size-md mm-avatar-token mm-text--body-sm mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full">
                            <img class="mm-avatar-token__token-image" src="@/static/icon/eth_logo.svg" alt="ETH logo"></div>
                          <div
                            class="mm-box mm-badge-wrapper__badge-container mm-badge-wrapper__badge-container--rectangular-bottom-right">
                            <div
                              class="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs mm-avatar-network mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-md mm-box--border-color-border-muted mm-box--border-width-2 box--border-style-solid">
                              <img class="mm-avatar-network__network-image" 
                              src="@/static/icon/eth_logo.svg"
                                alt="Ethereum Mainnet logo"></div>
                          </div>
                        </div>
                      </div>
                      <div class="mm-box">
                        <div title="" class="" tabindex="0" style="display: inline;">
                          <p class="mm-box mm-text asset-picker__symbol mm-text--body-md mm-box--color-text-default">ETH
                          </p>
                        </div>
                      </div>
                    </div>
                  </span><span
                    class="mm-box mm-icon ts arrow-down
                    mm-icon--size-sm mm-box--margin-inline-start-0 mm-box--display-none mm-box--color-icon-default"
                   ></span></button>
                <div class="unit-input asset-picker-amount__input">
                  <div class="unit-input__inputs">
                    <div title="0" class="unit-input__input-container" style="display: inherit;"><input disabled=""
                        data-testid="currency-input" type="number" dir="ltr" class="unit-input__input" placeholder="0"
                        min="0" step="any" value="0" style="width: 1.5ch;">
                      <div class="unit-input__suffix">ETH</div>
                    </div>
                    <div
                      class="mm-box currency-display-component currency-input__conversion-component mm-box--display-flex mm-box--flex-wrap-wrap mm-box--align-items-center"
                      title="$0.00"><span
                        class="mm-box mm-text currency-display-component__text mm-text--inherit mm-text--ellipsis mm-box--color-text-default"
                        data-testid="account-value-and-suffix">$0.00</span></div>
                  </div><button
                    class="mm-box mm-button-icon mm-button-icon--size-sm asset-picker-amount__input__swap mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent mm-box--rounded-lg"
                    aria-label="切换输入货币"><span
                      class="mm-box mm-icon ts swap-vertical
                      mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
                      ></span></button>
                </div>
              </div>
              <div class="mm-box mm-box--display-flex"></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.openb {

  .van-nav-bar .van-icon {
    color: #121314;
  }

  .van-hairline--bottom::after {
    border: 0;
  }
}
</style>
<style scoped lang="scss">
.openb {
  width: 100vw;
  height: 100vh;
  display: block;

  .van-nav-bar .van-icon {
    color: #121314;
  }
}
.arrow-down{
  mask-image: url('@/static/icon/arrow-down.svg');
}
.swap-vertical{
  mask-image: url('@/static/icon/swap-vertical.svg');
}
.close{
  mask-image: url('@/static/icon/close.svg');
}
.unit-input__inputs{
  align-items: flex-end;
}
.asset-picker-amount__input .unit-input__inputs > div.unit-input__input-container > *{
  text-align: right;
}
.mm-badge-wrapper__badge-container--rectangular-bottom-right{
  right: var(--badge-wrapper-position-rectangular);
    transform: scale(1) translate(50%, 50%);
    transform-origin: 100% 100%;
}
.mm-avatar-account__jazzicon >div{
  margin-right: 8px !important;
}
</style>