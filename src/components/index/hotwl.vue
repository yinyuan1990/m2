<script>
export default {
  data() {
    return {};
  },
};
</script>
<template>
<div id="hotwl"
class="
mm-box mm-popover 
mm-popover--open mm-popover--reference-hidden 
mm-box--padding-4 mm-box--background-color-background-default 
mm-box--rounded-lg mm-box--border-color-border-muted 
box--border-style-solid box--border-width-1" role="tooltip" 
data-popper-reference-hidden="false" data-popper-escaped="false" 
data-popper-placement="bottom-start" 
style="
position: absolute; inset: 0px auto auto 0px; 
transform: translate(-1px, 32px); 
width: auto; 
z-index: 10; 
display: flex; flex-direction: column; 
padding: 0px; min-width: 250px;">
    <div class="mm-box selectable-list-item-wrapper" 
    data-testid="network-filter-all">
        <button class="mm-box mm-text selectable-list-item 
        selectable-list-item--selected mm-text--body-md 
        mm-box--display-flex mm-box--align-items-center 
        mm-box--width-full mm-box--color-text-default 
        mm-box--background-color-background-default" 
        data-testid="network-filter-all__button">
            <div class="mm-box mm-box--display-flex 
            mm-box--gap-3 mm-box--justify-content-space-between 
            mm-box--width-full">
                <div class="mm-box">
                    <p class="mm-box mm-text mm-text--body-md-medium 
                    mm-box--color-text-default">热门网络</p>
                    <p class="mm-box mm-text mm-text--body-sm-medium 
                        mm-box--color-text-alternative" 
                        data-testid="network-filter-all__total">
                        <div class="mm-box currency-display-component 
                        mm-box--display-flex mm-box--flex-wrap-wrap 
                        mm-box--align-items-center">
                            <span class="mm-box mm-text 
                            currency-display-component__text mm-text--inherit 
                            mm-text--ellipsis mm-box--color-text-default" 
                            data-testid="account-value-and-suffix">$0.00</span>
                            <span class="mm-box mm-text 
                            currency-display-component__suffix mm-text--inherit 
                            mm-box--margin-inline-start-1 mm-box--color-text-default">USD</span>
                        </div>
                    </p>
                </div>
                <div class="mm-box mm-box--display-flex mm-box--align-items-center">
                    <div class="info-tooltip" data-testid="info-tooltip">
                        <div>
                            <div class="info-tooltip__tooltip-container" 
                            tabindex="0" data-tooltipped="" 
                            aria-describedby="tippy-tooltip-12" data-original-title="null" 
                            style="display: inline;">
                                <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 0C2.2 0 0 2.2 0 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.2-.7-.6.3-.8.7-.8zm.7 6H4.3V4.3h1.5V8z" fill="var(--color-icon-alternative)"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div class="mm-box mm-text mm-avatar-base mm-avatar-base--size-sm 
                    mm-avatar-network mm-text--body-sm mm-text--text-transform-uppercase 
                    mm-box--display-flex mm-box--justify-content-center 
                    mm-box--align-items-center mm-box--color-text-default 
                    mm-box--background-color-background-alternative 
                    mm-box--rounded-md mm-box--border-color-background-default 
                    mm-box--border-width-1 box--border-style-solid" 
                    style="margin-left: 0px; z-index: 5;">
                        <img class="mm-avatar-network__network-image" 
                        src="@/static/icon/eth_logo.svg" alt="logo">
                    </div>
                    <div class="mm-box mm-text 
                    mm-avatar-base mm-avatar-base--size-sm mm-avatar-network 
                    mm-text--body-sm mm-text--text-transform-uppercase 
                    mm-box--display-flex mm-box--justify-content-center 
                    mm-box--align-items-center mm-box--color-text-default 
                    mm-box--background-color-background-alternative 
                    mm-box--rounded-md mm-box--border-color-background-default 
                    mm-box--border-width-1 box--border-style-solid" 
                    style="margin-left: -20px; z-index: 4;">
                    <img class="mm-avatar-network__network-image" 
                    src="@/static/icon/linea-logo-mainnet.svg" alt=" logo">
                    </div>
                </div>
            </div>
        </button>
        <div class="mm-box selectable-list-item__selected-indicator 
        mm-box--background-color-primary-default 
        mm-box--rounded-pill"></div>
    </div>
    <div class="mm-box selectable-list-item-wrapper" 
    data-testid="network-filter-current">
    <button class="mm-box mm-text selectable-list-item 
    mm-text--body-md mm-box--display-flex mm-box--align-items-center 
    mm-box--width-full mm-box--color-text-default 
    mm-box--background-color-background-default" 
    data-testid="network-filter-current__button">
        <div class="mm-box mm-box--display-flex 
        mm-box--gap-3 mm-box--justify-content-space-between 
        mm-box--align-items-center mm-box--width-full">
            <div class="mm-box">
                <p class="mm-box mm-text 
                mm-text--body-md-medium 
                mm-box--color-text-default">当前网络</p>
                <p class="mm-box mm-text 
                mm-text--body-sm-medium 
                mm-box--color-text-alternative">
                    <div class="mm-box currency-display-component 
                    mm-box--display-flex mm-box--flex-wrap-wrap 
                    mm-box--align-items-center">
                        <span class="mm-box mm-text currency-display-component__text 
                        mm-text--inherit mm-text--ellipsis mm-box--color-text-default" 
                        data-testid="account-value-and-suffix">$0.00</span>
                        <span class="mm-box mm-text currency-display-component__suffix 
                        mm-text--inherit mm-box--margin-inline-start-1 
                        mm-box--color-text-default">USD</span>
                    </div>
                </p>
            </div>
            <div class="mm-box mm-text mm-avatar-base 
            mm-avatar-base--size-sm mm-avatar-network 
            mm-text--body-sm mm-text--text-transform-uppercase 
            mm-box--display-flex mm-box--justify-content-center 
            mm-box--align-items-center mm-box--color-text-default 
            mm-box--background-color-background-alternative mm-box--rounded-md 
            mm-box--border-color-background-default mm-box--border-width-1 
            box--border-style-solid">
                <img class="mm-avatar-network__network-image" 
                src="@/static/icon/eth_logo.svg" alt="Ethereum Mainnet logo">
            </div>
        </div>
    </button>
</div>
</div>
</template>
<style scoped>
</style>