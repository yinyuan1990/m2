<script>
export default {
    name: '',
    data() { return {} },
    methods:{
        back(){
            this.$router.back()
        }
    }
}
</script>
<template>
    <div
        class="mm-box multichain-page__inner-container bridge__container mm-box--display-flex mm-box--flex-direction-column mm-box--width-full mm-box--height-full mm-box--background-color-background-default">
        <div
            class="mm-box mm-header-base multichain-page-header mm-box--padding-4 mm-box--display-flex mm-box--justify-content-center mm-box--width-full">
            <div class="mm-box" style="min-width: 24px;">
                <button @click="back"
                    class="mm-box mm-button-icon mm-button-icon--size-sm mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-default mm-box--background-color-transparent mm-box--rounded-lg"
                    aria-label="返回"><span
                        class="mm-box mm-icon ts arrow-left
                        mm-icon--size-sm mm-box--display-inline-block 
                        mm-box--color-inherit"
                        ></span>
                </button></div>
            <div class="mm-box" style="width: calc(100% - 48px);">
                <h4
                    class="mm-box mm-text mm-text--heading-sm mm-text--ellipsis mm-text--text-align-center mm-box--padding-inline-start-8 mm-box--padding-inline-end-8 mm-box--display-block mm-box--color-text-default">
                    跨链桥</h4>
            </div>
            <div class="mm-box mm-box--display-flex mm-box--justify-content-flex-end" 
            style="min-width: 24px;">
                <button
                    class="mm-box mm-button-icon mm-button-icon--size-sm mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-default mm-box--background-color-transparent mm-box--rounded-lg"
                    aria-label="设置">
                    <span
                        class="mm-box mm-icon setting ts
                        mm-icon--size-sm mm-box--display-inline-block 
                        mm-box--color-inherit"></span>
                </button></div>
        </div>
        <div
            class="mm-box multichain-page-content mm-box--padding-0 mm-box--display-flex mm-box--flex-direction-column mm-box--width-full mm-box--height-full">
            <div
                class="mm-box mm-container mm-container--max-width-undefined prepare-bridge-page mm-box--display-flex mm-box--gap-8 mm-box--flex-direction-column mm-box--width-full">
                <div
                    class="mm-box mm-container mm-container--max-width-undefined mm-box--padding-inline-6 mm-box--display-flex mm-box--gap-1 mm-box--flex-direction-column mm-box--width-full">
                    <div
                        class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--gap-4 mm-box--flex-direction-row mm-box--flex-wrap-nowrap mm-box--justify-content-space-between mm-box--align-items-center">
                        <div class="mm-box mm-text-field mm-text-field--size-md mm-text-field--truncate amount-input mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-flex mm-box--align-items-center mm-box--background-color-background-default mm-box--rounded-sm mm-box--border-width-1 box--border-style-solid"
                            style="min-width: 96px; max-width: 190px;"><input
                                class="mm-box mm-text mm-input mm-input--disable-state-styles mm-text-field__input mm-text--body-md mm-text--text-align-start mm-box--margin-0 mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--color-text-default mm-box--background-color-transparent mm-box--border-style-none"
                                autocomplete="off" placeholder="0" type="text" data-testid="from-amount" focused="false"
                                value=""
                                style="font-weight: 400; font-size: 36px; transition: font-size 0.1s; padding: 0px;">
                        </div><button
                            class="mm-box mm-text mm-select-button mm-select-button--size-lg mm-text--body-md mm-box--padding-top-3 mm-box--padding-right-4 mm-box--padding-bottom-3 mm-box--padding-left-4 mm-box--display-flex mm-box--gap-0 mm-box--justify-content-space-between mm-box--align-items-center mm-box--height-full mm-box--color-text-default mm-box--background-color-background-default mm-box--rounded-pill mm-box--border-color-border-muted box--border-style-solid box--border-width-1"
                            data-testid="bridge-source-button"
                            style="padding: 8px 11px 8px 8px; min-width: fit-content;">
                            <div class="mm-box mm-badge-wrapper mm-box--margin-right-2 mm-box--display-inline-block">
                                <div
                                    class="mm-box mm-text mm-avatar-base mm-avatar-base--size-md mm-avatar-token mm-text--body-sm mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-hover mm-box--rounded-full">
                                    <img class="mm-avatar-token__token-image" 
                                    src="@/static/icon/eth_logo.svg"
                                        alt="ETH logo"></div>
                                <div
                                    class="mm-box mm-badge-wrapper__badge-container mm-badge-wrapper__badge-container--rectangular-bottom-right">
                                    <div
                                        class="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs mm-avatar-network mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-md mm-box--border-color-background-default mm-box--border-width-1 box--border-style-solid">
                                        <img class="mm-avatar-network__network-image" 
                                        src="@/static/icon/eth_logo.svg"
                                            alt="Ethereum Mainnet logo"></div>
                                </div>
                            </div><span
                                class="mm-box mm-select-button__content mm-box--display-flex mm-box--flex-direction-column mm-box--width-full"><label
                                    class="mm-box mm-text mm-label mm-text--body-md mm-text--font-weight-medium mm-box--display-inline-flex mm-box--align-items-center mm-box--color-text-default">
                                    <p
                                        class="mm-box mm-text mm-text--body-lg-medium mm-text--ellipsis mm-box--color-text-default">
                                        ETH</p>
                                </label></span>
                                <span
                                class="mm-box mm-icon ts arrow-2-down
                                mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
                                style="display: none;"></span>
                        </button>
                    </div>
                    <div
                        class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--flex-direction-row mm-box--flex-wrap-nowrap mm-box--justify-content-space-between mm-box--align-items-center">
                        <div
                            class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--flex-direction-row mm-box--flex-wrap-nowrap mm-box--justify-content-space-between mm-box--align-items-center">
                            <p
                                class="mm-box mm-text mm-text--body-md mm-text--font-weight-normal mm-text--ellipsis mm-text--text-align-end mm-box--color-text-alternative-soft">
                                $0.00</p>
                        </div>
                        <p class="mm-box mm-text mm-text--body-md mm-box--display-flex mm-box--gap-1 mm-box--color-text-alternative-soft"
                            style="cursor: default; text-decoration: none;">0 ETH</p>
                    </div>
                </div>
                <div class="mm-box mm-container mm-container--max-width-undefined mm-box--padding-top-8 mm-box--display-flex mm-box--flex-direction-column mm-box--width-full mm-box--height-full mm-box--background-color-background-alternative-soft"
                    style="position: relative;">
                    <div class="mm-box prepare-bridge-page__switch-tokens mm-box--display-flex mm-box--background-color-background-alternative-soft"
                        style="position: absolute; top: calc(-19px); right: calc(50% - 20px); border: 2px solid var(--color-background-default); border-radius: 100%; opacity: 1; width: 40px; height: 40px; justify-content: center;">
                        <button
                            class="mm-box mm-button-icon mm-button-icon--size-lg mm-button-icon--disabled mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-alternative-soft mm-box--background-color-transparent mm-box--rounded-lg"
                            aria-label="switch-tokens" disabled="" data-testid="switch-tokens"
                            style="align-self: center; border-radius: 100%; width: 100%; height: 100%;"><span
                                class="mm-box mm-icon ts arrow-2-down
                                mm-icon--size-lg mm-box--display-inline-block mm-box--color-inherit"
                                ></span></button>
                    </div>
                    <div
                        class="mm-box mm-container mm-container--max-width-undefined mm-box--padding-inline-6 mm-box--display-flex mm-box--gap-1 mm-box--flex-direction-column mm-box--width-full">
                        <div
                            class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--gap-4 mm-box--flex-direction-row mm-box--flex-wrap-nowrap mm-box--justify-content-space-between mm-box--align-items-center">
                            <div class="mm-box mm-text-field mm-text-field--size-md mm-text-field--disabled mm-text-field--truncate amount-input mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-flex mm-box--align-items-center mm-box--background-color-background-default mm-box--rounded-sm mm-box--border-width-1 box--border-style-solid"
                                style="min-width: 96px; max-width: 190px; opacity: 1;"><input
                                    class="mm-box mm-text mm-input mm-input--disable-state-styles mm-input--disabled mm-text-field__input mm-text--body-md mm-text--text-align-start mm-box--margin-0 mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--color-text-default mm-box--background-color-transparent mm-box--border-style-none"
                                    autocomplete="off" disabled="" placeholder="0" readonly="" type="text"
                                    data-testid="to-amount" focused="false" value="0"
                                    style="font-weight: 400; font-size: 36px; transition: font-size 0.1s; padding: 0px;">
                            </div><button
                                class="mm-box mm-text mm-button-base mm-button-base--size-lg mm-button-primary mm-text--body-md-medium mm-text--font-weight-normal mm-box--padding-0 mm-box--padding-right-6 mm-box--padding-left-6 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-inverse mm-box--background-color-primary-default mm-box--rounded-pill"
                                data-theme="light" data-testid="bridge-destination-button"
                                style="white-space: nowrap;">桥接至</button>
                        </div>
                        <div
                            class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--flex-direction-row mm-box--flex-wrap-nowrap mm-box--justify-content-space-between mm-box--align-items-center">
                            <div
                                class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--flex-direction-row mm-box--flex-wrap-nowrap mm-box--justify-content-space-between mm-box--align-items-center">
                                <p
                                    class="mm-box mm-text mm-text--body-md mm-text--font-weight-normal mm-text--ellipsis mm-text--text-align-end mm-box--color-text-alternative-soft">
                                </p>
                            </div><a
                                class="mm-box mm-text mm-text--body-md mm-box--display-flex mm-box--gap-1 mm-box--color-text-alternative-soft"
                                style="cursor: pointer; text-decoration: underline;"></a>
                        </div>
                    </div>
                    <div
                        class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--flex-direction-column mm-box--justify-content-center mm-box--width-full mm-box--height-full">
                    </div>
                    <div
                        class="mm-box mm-container mm-container--max-width-undefined mm-box--padding-6 mm-box--padding-top-6 mm-box--display-flex mm-box--flex-direction-row mm-box--flex-wrap-nowrap mm-box--justify-content-space-between mm-box--align-items-center">
                        <div class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--gap-3 mm-box--flex-direction-column mm-box--width-full"
                            style="padding-bottom: revert-layer; padding-inline: 16px; position: relative; overflow: hidden;">
                            <div
                                class="mm-box multichain-page-footer mm-box--padding-0 mm-box--display-flex mm-box--gap-2 mm-box--flex-direction-column mm-box--width-full">
                                <div
                                    class="mm-box mm-container mm-container--max-width-undefined mm-box--display-flex mm-box--gap-1 mm-box--flex-direction-row mm-box--flex-wrap-nowrap mm-box--justify-content-center mm-box--align-items-center">
                                    <p
                                        class="mm-box mm-text mm-text--body-md mm-text--text-align-center mm-box--color-text-alternative-soft">
                                        选择代币和金额</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.setting{
    mask-image: url('@/static/icon/setting.svg');
}
.arrow-left{
    mask-image: url('@/static/icon/arrow-left.svg');
}
.arrow-2-down{
    mask-image: url('@/static/icon/arrow-2-down.svg');
}
.mm-badge-wrapper__badge-container--rectangular-bottom-right{
    right: var(--badge-wrapper-position-rectangular);
    transform: scale(1) translate(50%, 50%);
    transform-origin: 100% 100%;
    bottom: var(--badge-wrapper-position-rectangular);
}
.mm-box--padding-left-6{
    padding: 0 16px;
}
</style>