<script>
export default {
  data() {
    return {

    };
  },
  methods:{
    closeFn(){
        this.$emit('closeFn')
    },
    goHref(type){
        let urls;
        if(type==1){
            urls= 'https://portfolio.metamask.io/buy?metamaskEntry=ext_buy_sell_button&chainId=1&metametricsId=0x90f3346b1d4226d7a4a6f6188cfd7b89cc71620bdeb47c62abae8570b8d94126&metricsEnabled=true&marketingEnabled=true';

        }else if(type == 2){
            this.$emit('receive');
            this.$emit('closeFn')
            return;
        }else if(type == 3){
            urls = 'https://portfolio.metamask.io/transfer?metamaskEntry=ext_funding_method_modal&metametricsId=0x90f3346b1d4226d7a4a6f6188cfd7b89cc71620bdeb47c62abae8570b8d94126&metricsEnabled=true&marketingEnabled=true&accountAddress=0x9b5e3e15d28b856ee1077370bbbb303b2d95ee52&tab=transfer';
        }
        window.open(urls,'_blank')
    }
  }
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
        <div class="skypeGroups_head">充值方法</div>
        <span class="skypeGroups_close" @click="closeFn"></span>
        <div class="skypeGroups_market" @click="goHref(1)">
            <span class="skypeGroups_market_icon"></span>
            <div class="skypeGroups_market_box">
                <div class="skypeGroups_market_box_til">代币市场</div>
                <div class="skypeGroups_market_box_p">借记卡或信用卡购买选项</div>
            </div>
        </div>
        <div class="skypeGroups_market" @click="goHref(2)">
            <span class="skypeGroups_market_icon iocn2"></span>
            <div class="skypeGroups_market_box">
                <div class="skypeGroups_market_box_til">接收加密货币</div>
                <div class="skypeGroups_market_box_p">使用钱包地址或二维码从另一账户存入加密货币。</div>
            </div>
        </div>
        <div class="skypeGroups_market" @click="goHref(3)">
            <span class="skypeGroups_market_icon iocn3"></span>
            <div class="skypeGroups_market_box">
                <div class="skypeGroups_market_box_til">转移加密货币</div>
                <div class="skypeGroups_market_box_p">链接您的 Coinbase 或 Binance 账户，将加密货币免费转移到 MetaMask。</div>
            </div>
        </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups{
    position: absolute;
    background: #ffffff;
    left: 16px;
    top: 16px;
    box-shadow: var(--shadow-size-lg) (--color-shadow-default);
    width: calc(100% - 32px);
    border-radius: 10px;
    min-height: 200px;
    padding: 16px 0;
    &_head{
        font-size: 16px;
        font-weight: bold;
        color: #121314;
        text-align: center;
        margin-bottom: 10px;
    }
    &_close{
        --icon-size: var(--size, 16px);
        font-size: var(--icon-size);
        width: 1em;
        height: 1em;
        max-width: 1em;
        flex: 0 0 1em;
        background-color: currentColor;
        mask-size: cover;
        -webkit-mask-size: cover;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-position: center;
            --size: 16px;
        mask-image: url('@/static/icon/close.svg');
        color: #121314;
        position: absolute;
        right: 16px;
        top: 16px;
    }
    &_market{
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        gap: 8px;
        cursor: pointer;
        align-items: center;
        &_icon{
            --icon-size: var(--size, 16px);
            font-size: var(--icon-size);
            width: 1em;
            height: 1em;
            max-width: 1em;
            flex: 0 0 1em;
            background-color: currentColor;
            mask-size: cover;
            -webkit-mask-size: cover;
            mask-repeat: no-repeat;
            -webkit-mask-repeat: no-repeat;
            mask-position: center;
            -webkit-mask-position: center;
            --size: 20px;
            mask-image: url('@/static/icon/card.svg');
            &.iocn2{
                mask-image: url('@/static/icon/received.svg');
            }
            &.iocn3{
                mask-image: url('@/static/icon/link.svg');
            }
        }
        &_box{
            flex-direction: column;
            display: flex;
            &_til{
                font-weight: var(--typography-s-body-md-medium-font-weight);
                font-size: var(--typography-s-body-md-medium-font-size);
                line-height: var(--typography-s-body-md-medium-line-height);
                letter-spacing: var(--typography-s-body-md-medium-letter-spacing);
                color: var(--color-text-default);
            }
            &_p{
                color: var(--color-text-alternative);
                font-weight: var(--typography-s-body-sm-font-weight);
                font-size: var(--typography-s-body-sm-font-size);
                line-height: var(--typography-s-body-sm-line-height);
                letter-spacing: var(--typography-s-body-sm-letter-spacing);
            }
        }
    }

}
</style>