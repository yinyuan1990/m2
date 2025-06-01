<script>
import * as echarts from "echarts";
import {load} from "@/bbjs/AccountManager"
import { fetchTokenDetailWithFallback,fetchTokenDetail,fetchTokenBalance } from "@/bbjs/priceService"
import {chainDefaultAssetMap,chainArr} from "@/bbjs/chain-default-assets"
import { formatLargeNumber,formatPrice,formatBalance } from "@/bbjs/utils"
import { formatDate } from "@/static/js/common"
import receivePayment from "@/components/index/receivePayment.vue";
export default {
  components:{
    receivePaymentVue:receivePayment
  },
  data() {
    return {
        timeKey:0,
        timeList:['1D','1W','1M','3M','1Y','所有'],
        setList: [
            { name: '出入金', img: require('@/static/icon/plus-minus.svg'), id: 1 },
            { name: '兑换', img: require('@/static/icon/swap-horizontal.svg'), id: 2 },
            { name: '跨链桥', img: require('@/static/icon/bridge.svg'), id: 3 },
            { name: '发送', img: require('@/static/icon/arrow-2-up-right.svg'), id: 4 },
            { name: '收款', img: require('@/static/icon/scan-barcode.svg'), id: 5 },
        ],
        closeSvg: require('@/static/icon/close.svg'),
        dbitem:{},// 代币参数
        details:{}, // 详情参数
        newTime:'',// 当前时间
    };
  },
  mounted() {
    let dbitem = load('dbitem')
    this.dbitem = dbitem
    console.log( dbitem )
    this.$nextTick(()=>{
        this.init();
    })
    this.newTime = formatDate( new Date().getTime(),'MM月DD日 hh:ii' )
  },
  methods: {
    formatLargeNumber,
    formatPrice,
    formatBalance,
    goDbSc(){ // 去市场
            
        window.open('https://portfolio.metamask.io/buy?metamaskEntry=ext_buy_banner_activity&chainId=1&metametricsId=0x90f3346b1d4226d7a4a6f6188cfd7b89cc71620bdeb47c62abae8570b8d94126&metricsEnabled=true&marketingEnabled=true','_blank')
    },
    setListChange(id){
        let urls;
        if(id == 1){
            urls = 'https://portfolio.metamask.io/buy?metamaskEntry=ext_buy_sell_button&chainId=1&metametricsId=0x90f3346b1d4226d7a4a6f6188cfd7b89cc71620bdeb47c62abae8570b8d94126&metricsEnabled=true&marketingEnabled=true'
        }else if( id == 2){
            this.$router.push({
                path:'/exchange'
            })
        }else if( id == 3){
          this.$router.push({
            path:'/klqbox'
          })
        }else if( id == 4){
            this.$router.push({
                path:'/openb'
            })
        }else if( id == 5){
            this.receivePaymentVueShow = true
        }

        urls && ( window.open(urls,'_blank') )
    },
    backFn(){ // 返回
      this.$router.back()
    },
    getDbInfo(){ // 获取代币数据
      let chainArrAct = chainArr.filter(it=>{
        return it.chainId == this.dbitem.chainId
      })[0];
      let dbInfo = chainDefaultAssetMap[chainArrAct.chainId];
      let wlAndDbinfo = {
        ...chainArrAct,
        ...dbInfo,
      }
      console.log('wlAndDbinfo',wlAndDbinfo,this.dbitem)
      let ajaxfn;
      let paramsObj;
      if( this.dbitem.isMainCoin ){
        ajaxfn = fetchTokenDetail
        paramsObj = {
          coinGeckoPlatformId:wlAndDbinfo.coinGeckoPlatformId,
          contractAddress:this.dbitem.contractAddress
        }
      }else{
        ajaxfn = fetchTokenDetailWithFallback
        paramsObj = {
          rpcUrl:wlAndDbinfo.rpcUrls[0],
          platformId:wlAndDbinfo.coinGeckoPlatformId,
          contractAddress:this.dbitem.contractAddress
        }
      }
      console.log('paramsObj',paramsObj,ajaxfn)
      ajaxfn(paramsObj).then(res=>{
        console.log(res,'---res--')
        
  //       {
  //   name: data.name, // 代币名称，例如 "Avalanche"
  //   symbol: data.symbol, // 代币符号，例如 "AVAX"
  //   logo: data.image.large, // 图标地址，用于 UI 显示

  //   marketCap: data.market_data.market_cap.usd, // 市值（单位：美元），例如 95450000000 -> 95.45 十亿
  //   volume: data.market_data.total_volume.usd, // 24小时交易额（单位：美元），例如 913080000 -> 913.08 百万
  //   circulatingSupply: data.market_data.circulating_supply, // 流通供应数量（单位：个），例如 145890000 -> 145.89 百万

  //   ath: data.market_data.ath.usd, // 有史以来最高价（单位：美元），例如 787.77
  //   atl: data.market_data.atl.usd, // 有史以来最低价（单位：美元），例如 0.0398

  //   change24h: data.market_data.price_change_percentage_24h, // 24 小时涨跌幅（百分比），例如 -1.23
  //   price: data.market_data.current_price.usd, // 当前价格（单位：美元）

  //   platform: data.asset_platform_id || '', // 平台 ID（如 'ethereum'，仅代币有）
  //   updatedAt: Date.now() // 时间戳，标记最后更新时间
  // }
        this.details = res;
        let conAdd = this.dbitem.isMainCoin?'':this.dbitem.contractAddress;
        let newOjb = {
          rpcUrl: wlAndDbinfo.rpcUrls[0],
          address:this.dbitem.address,
          contractAddress:conAdd,
          decimals:this.dbitem.decimals
        }
        console.log(newOjb,'fetchTokenBalance--')
        fetchTokenBalance(newOjb).then(yures=>{
          console.log( yures,'--yures' )
          this.details = {
            ...this.details,
            ...yures
          }
        })
      })
    },
    init() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: "category",
          show: false,
          axisLine: { show: false }, // 隐藏轴线
          axisTick: { show: false }, // 隐藏刻度线
          axisLabel: { show: false }, // 隐藏标签
          splitLine: { show: false }, // 隐藏网格线
          data: ["10", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        tooltip: {
          trigger: "axis",
          showContent: false,
          axisPointer: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          show: false,
          axisLine: { show: false }, // 隐藏轴线
          axisTick: { show: false }, // 隐藏刻度线
          axisLabel: { show: false }, // 隐藏标签
          splitLine: { show: false }, // 隐藏网格线
        },
        grid: {
          width: "auto",
          height: "auto",
          left: "0px", // 左侧边距
          right: "0px", // 右侧边距
          top: "15px", // 顶部边距
          bottom: "0px", // 底部边距
          containLabel: true, // 包含坐标轴标签区域
        },
        series: [
          {
            markPoint: {
              // symbol:'rect',
              label: {
                backgroundColor: "transparent",
                distance: 120,
                color: "#686e7d",
              },
              itemStyle: {
                color: "transparent",
              },
              data: [{ type: "max", name: "Max" }],
            },
            data: [150, 230, 224, 218, 135, 147, 260],
            showSymbol: false,
            areaStyle: {
                opacity:0.4  
            },
            // stack: 'Total',
            // smooth: true,
            type: "line",
          },
        ],
      };

      option && myChart.setOption(option);
      myChart.getZr().on('click', function(params) {
            const point = [params.offsetX, params.offsetY];
            const [xIndex] = myChart.convertFromPixel({seriesIndex:0}, point);
            if(xIndex >= 0) {
                const option = myChart.getOption();
                console.log('选中数据:', option.series[0].data[xIndex]);
            }
      });

      this.getDbInfo();
      
    },
  },
};
</script>
<template>
  <div class="dbdetails">
    <!-- 接收加密货币弹框 -->
    <receivePaymentVue v-if="receivePaymentVueShow" 
        @closeFn="receivePaymentVueShow = false"></receivePaymentVue>
    <headtop></headtop>
    <div class="dbdetails_head p16">
      <span
        class="mm-box mm-icon ts backSvg mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
        @click="backFn"
      ></span>
      <div class="dbdetails_head_tt mm-text--body-md">{{details.name}}</div>
      <span
        class="mm-box mm-icon ts more-vertical mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
      ></span>
    </div>
    <div class="p16">
      <h1
        class="mm-box mm-text mm-text--display-md mm-text--font-weight-medium mm-box--margin-bottom-1 mm-box--color-text-default mm-box--rounded-lg"
        data-testid="asset-hovered-price"
        style="opacity: 1"
      >
        ${{ details.price  }}
      </h1>
      <div class="mm-box" style="opacity: 1">
        <svg
          class="chart-up"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="details.change24h>= 0"
        >
          <path
            d="M9.75 3.8125L6.25 7.4875L4.91667 5.3875L2.25 8.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M8.08398 3.8125H9.75065V5.5625"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <svg class="chart-down" width="12" height="12" v-else
        viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.75 8.1875L6.25 4.5125L4.91667 6.6125L2.25 3.8125" 
          stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M8.08398 8.1875H9.75065V6.4375" stroke-linecap="round" 
          stroke-linejoin="round"></path>
        </svg>
        <p
          class="mm-box mm-text mm-text--body-md-medium 
          mm-box--margin-right-1 mm-box--margin-left-1 
          mm-box--display-inline-block 
          "
          :class="details.change24h>= 0?'mm-box--color-success-default':'mm-box--color-error-default'"
        >
          {{ details.change24h}}%
        </p>
        <p
          class="mm-box mm-text mm-text--body-md-medium mm-box--display-inline-block mm-box--color-text-alternative"
        >
          {{newTime}}
        </p>
      </div>
    </div>
    <div class="eharbox" id="main" v-show="false"></div>
    <!-- <div class="timelist p16 " v-shwo="false"> 
        <div class="timelist_it mm-text--body-sm-medium mm-box--color-text-alternative" 
        v-for="(it,i) in timeList" :key="i"
        :class="{'time-range-button__selected':timeKey==i}">
            {{ it }}
        </div>
    </div> -->
    <div class="setList">
        <button class="icon-button eth-overview__button" 
        data-testid="eth-overview-buy" 
        v-for="(it) in setList" @click="setListChange(it.id)"
            :key="it.id">
            <div data-theme="light" 
            class="icon-button__circle eth-overview__icon-button">
                <iconimgVue :url="it.img"
                    class="mm-box mm-icon ts mm-icon--size-sm mm-box--display-inline-block mm-box--color-primary-inverse">
                </iconimgVue>
                <!-- <span class="mm-box mm-icon mm-icon--size-sm mm-box--display-inline-block mm-box--color-primary-inverse" 
                :style="`mask-image: url(&quot;./images/icons/plus-minus.svg&quot;);`"></span> -->
            </div>
            <p
                class="mm-box mm-text icon-button__label mm-text--body-sm mm-text--ellipsis mm-box--color-text-default">
                {{ it.name }}
            </p>
        </button>
    </div>
    <div class="p16">
        <h3 class="mm-box mm-text mm-text--heading-md 
        mm-box--padding-bottom-2 
        mm-box--padding-left-4 mm-box--color-text-default">您的余额</h3>
        <div class="mm-box mm-box--display-flex mm-box--gap-4 
        mm-box--flex-direction-row mm-box--width-full mm-box--height-full">
            <a class="mm-box mm-box--padding-top-2 
            mm-box--padding-right-4 mm-box--padding-bottom-2 
            mm-box--padding-left-4 mm-box--display-flex 
            mm-box--flex-direction-row mm-box--width-full" 
            data-testid="multichain-token-list-button" style="height: 62px; cursor: auto; 
            background-color: transparent; transition: background-color 0.2s ease-in-out;">
                <div 
                    class="mm-box mm-badge-wrapper mm-box--margin-right-4 
                    mm-box--display-inline-block" style="align-self: center;margin-right: 16px;">
                        <div class="mm-box mm-text mm-avatar-base 
                        mm-avatar-base--size-md mm-avatar-token mm-text--body-sm 
                        mm-text--text-transform-uppercase mm-box--display-flex 
                        mm-box--justify-content-center mm-box--align-items-center 
                        mm-box--color-text-default mm-box--background-color-background-muted 
                        mm-box--rounded-full">
                            <img class="mm-avatar-token__token-image" 
                            :src="details.logo" alt="ETH logo">
                        </div>
                        <div class="mm-box mm-badge-wrapper__badge-container rsmallicon
                        mm-badge-wrapper__badge-container--rectangular-bottom-right">
                            <div class="mm-box mm-text mm-avatar-base 
                            mm-avatar-base--size-xs mm-avatar-network 
                            mm-text--body-xs mm-text--text-transform-uppercase 
                            mm-box--display-flex mm-box--justify-content-center 
                            mm-box--align-items-center mm-box--color-text-default 
                            mm-box--background-color-background-muted mm-box--rounded-md 
                            mm-box--border-color-background-default mm-box--border-width-2 
                            box--border-style-solid">
                                <img class="mm-avatar-network__network-image" 
                                :src="details.logo" alt="Ethereum Mainnet logo">
                                </div>
                            </div>
                        </div>
                        <div class="mm-box mm-box--display-flex 
                        mm-box--flex-direction-column mm-box--justify-content-center 
                        mm-box--width-full" style="flex-grow: 1; overflow: hidden;">
                            <div class="mm-box mm-box--display-flex 
                            mm-box--flex-direction-row mm-box--justify-content-space-between">
                                <p class="mm-box mm-text mm-text--body-md 
                                mm-text--font-weight-medium mm-text--ellipsis 
                                mm-box--color-text-default">{{ details.name }}
                                    <button v-if="dbitem.isMainCoin && dbitem.chainId == '1'"
                                    class="mm-box mm-box--padding-inline-0 
                                    mm-box--padding-inline-start-1 mm-box--padding-inline-end-1 
                                    mm-box--gap-1 mm-box--background-color-transparent" 
                                    data-testid="staking-entrypoint-0x1" tabindex="0">
                                        <span class="mm-box mm-text mm-text--body-md 
                                        mm-box--color-text-default">•</span>
                                        <span class="mm-box mm-text mm-text--body-md 
                                        mm-text--font-weight-medium mm-box--padding-inline-start-1 
                                        mm-box--padding-inline-end-1 
                                        mm-box--color-primary-default">质押</span>
                                        <span class="mm-box mm-icon ts stakeSvg
                                        mm-icon--size-sm 
                                        mm-box--display-inline-block 
                                        mm-box--color-primary-default" 
                                        ></span>
                                    </button>
                                </p>
                                <p class="mm-box mm-text mm-text--body-md 
                                mm-text--font-weight-medium mm-text--ellipsis 
                                mm-text--text-align-end mm-box--color-text-default" 
                                data-testid="multichain-token-list-item-secondary-value" 
                                style="white-space: nowrap; padding-inline-start: 8px;">
                                US${{ formatBalance(dbitem.price*details.formatted) }}</p>
                            </div>
                            <div class="mm-box mm-box--display-flex 
                            mm-box--flex-direction-row 
                            mm-box--justify-content-space-between">
                            <div class="mm-box mm-box--display-flex">
                                <p class="mm-box mm-text mm-text--body-sm-medium 
                                mm-text--ellipsis " 
                                :class="details.change24h>= 0?'mm-box--color-success-default':'mm-box--color-error-default'"
                                data-testid="token-increase-decrease-percentage-0x0000000000000000000000000000000000000000">
                                {{ details.change24h }}%
                                </p>
                            </div>
                            <p class="mm-box mm-text 
                            mm-text--body-sm-medium 
                            mm-text--text-align-end 
                            mm-box--color-text-alternative" 
                            data-testid="multichain-token-list-item-value">
                            {{ (details.formatted+' '+dbitem.symbol) }}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        <h3 class="mm-box mm-text mm-text--heading-md 
        mm-box--padding-bottom-2 
        mm-box--padding-left-4 mm-box--color-text-default">代币详情</h3>
        <div class="mm-box mm-box--display-flex mt12px
        mm-box--justify-content-space-between">
            <p class="mm-box mm-text 
            mm-text--body-md-medium 
            mm-box--color-text-alternative">网络： </p>
            <div class="mm-box mm-text 
            mm-text--body-md mm-box--display-flex 
            mm-box--gap-1 mm-box--align-items-center 
            mm-box--color-text-default" data-testid="asset-network">
                <div class="mm-box mm-text mm-avatar-base 
                mm-avatar-base--size-sm mm-avatar-network 
                mm-text--body-sm mm-text--text-transform-uppercase 
                mm-box--display-flex mm-box--justify-content-center 
                mm-box--align-items-center mm-box--color-text-default
                mm-box--background-color-background-alternative 
                mm-box--rounded-md mm-box--border-color-background-default 
                mm-box--border-width-1 box--border-style-solid">
                    <img class="mm-avatar-network__network-image" 
                    :src="details.logo" alt="Ethereum Mainnet logo"/>
                </div>
                {{ details.name }}
            </div>
        </div>
        <div class="mm-box mm-box--display-flex mt12px
        mm-box--justify-content-space-between">
            <p class="mm-box mm-text mm-text--body-md-medium 
            mm-box--color-text-alternative">支出上限</p>
            <a class="mm-box mm-text mm-button-base 
            asset-page__spending-caps mm-text--body-md-medium mm-button-link 
            mm-button-link--size-auto mm-text--body-md-medium 
            mm-box--padding-0 mm-box--padding-right-0 
            mm-box--padding-left-0 mm-box--display-inline-flex 
            mm-box--justify-content-center mm-box--align-items-center 
            mm-box--color-primary-default mm-box--background-color-transparent" 
            href="https://portfolio.metamask.io/?metamaskEntry=asset_page&amp;metametricsId=0x90f3346b1d4226d7a4a6f6188cfd7b89cc71620bdeb47c62abae8570b8d94126&amp;metricsEnabled=true&amp;marketingEnabled=true&amp;accountAddress=0x9b5e3e15d28b856ee1077370bbbb303b2d95ee52&amp;tab=spending-caps" 
            target="_blank" rel="noopener noreferrer">在 Portfolio 上编辑</a>
        </div>
        <h3 class="mm-box mm-text mm-text--heading-md 
        mm-box--padding-bottom-2 
        mm-box--padding-left-4 mm-box--color-text-default">市场详情</h3>
        <div class="mm-box mm-box--display-flex mt12px
        mm-box--justify-content-space-between">
            <p class="mm-box mm-text 
            mm-text--body-md-medium 
            mm-box--color-text-alternative">市值</p>
            <p class="mm-box mm-text mm-text--body-md 
            mm-box--color-text-default" 
            data-testid="asset-market-cap">{{ formatLargeNumber(details.marketCap) }}</p>
        </div>
        <div class="mm-box mm-box--display-flex mt12px
        mm-box--justify-content-space-between">
            <p class="mm-box mm-text 
            mm-text--body-md-medium 
            mm-box--color-text-alternative">总交易额</p>
            <p class="mm-box mm-text mm-text--body-md 
            mm-box--color-text-default" 
            data-testid="asset-market-cap">{{ formatLargeNumber(details.volume) }}</p>
        </div>
        <div class="mm-box mm-box--display-flex mt12px
        mm-box--justify-content-space-between">
            <p class="mm-box mm-text 
            mm-text--body-md-medium 
            mm-box--color-text-alternative">循环供应</p>
            <p class="mm-box mm-text mm-text--body-md 
            mm-box--color-text-default" 
            data-testid="asset-market-cap">{{ formatLargeNumber(details.marketCap) }}</p>
        </div>
        <div class="mm-box mm-box--display-flex mt12px
        mm-box--justify-content-space-between">
            <p class="mm-box mm-text 
            mm-text--body-md-medium 
            mm-box--color-text-alternative">有史以来新高</p>
            <p class="mm-box mm-text mm-text--body-md 
            mm-box--color-text-default" 
            data-testid="asset-market-cap">{{ formatPrice(details.ath) }}</p>
        </div>
        <div class="mm-box mm-box--display-flex mt12px
        mm-box--justify-content-space-between">
            <p class="mm-box mm-text 
            mm-text--body-md-medium 
            mm-box--color-text-alternative">有史以来新低</p>
            <p class="mm-box mm-text mm-text--body-md 
            mm-box--color-text-default" 
            data-testid="asset-market-cap">{{ formatPrice(details.atl) }}</p>
        </div>
        <h3 class="mm-box mm-text mm-text--heading-md 
        mm-box--padding-bottom-2 
        mm-box--padding-left-4 mm-box--color-text-default">您的活动</h3>

        <div
            class="
            mm-box ramps-card lsjbls newbg
            ramps-card-token mm-box--margin-2 mm-box--display-flex mm-box--gap-2 mm-box--flex-direction-column
            mm-box--rounded-lg">
            <div class="mm-box mm-box--display-flex mm-box--justify-content-space-between">
                <h4 class="mm-box mm-text ramps-card__title mm-text--heading-sm mm-box--color-text-default">
                    钱包使用提示</h4>
                <button
                    class="mm-box mm-button-icon mm-button-icon--size-sm mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-info-inverse mm-box--background-color-transparent mm-box--rounded-lg"
                    aria-label="关闭" data-testid="ramp-card-close-btn">
                    <iconimgVue :url="closeSvg"
                        class="mm-box mm-icon ts mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit">
                    </iconimgVue>
                </button>
            </div>
            <p class="mm-box mm-text ramps-card__body mm-text--body-md mm-box--color-text-default">添加代币可解锁使用
                Web3 的更多方法。</p>
            <button class="
                mm-box mm-text mm-button-base 
                mm-button-base--size-md ramps-card__cta-button mm-text--body-md-medium mm-box--padding-0 
                mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center 
                mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative 
                mm-box--rounded-pill p16" @click="goDbSc">代币市场</button>
        </div>
    </div>

  </div>
</template>
<style scoped lang="scss">
.dbdetails {
  width: 100vw;
  height: 100vh;
  &_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0;
    color: #686e7d;
    &_tt {
      flex: 1;
      margin: 0 10px;
    }
  }
  .p16 {
    padding: 0 16px;
    box-sizing: border-box;
  }
  .timelist{
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    width: 100%;
    &_it{
        padding: 0 16px;
        height: 24px;
        border-radius: 12px;
    }
  }
  .setList{
    margin: 12px 0;
  }
  .rsmallicon{
    right: var(--badge-wrapper-position-rectangular);
    transform: scale(1) translate(50%, 50%);
    transform-origin: 100% 100%;
  }
}
.backSvg {
  mask-image: url("@/static/icon/arrow-left.svg");
}
.more-vertical {
  mask-image: url("@/static/icon/more-vertical.svg");
}
.stakeSvg {
  mask-image: url("@/static/icon/stake.svg");
}
.eharbox {
  width: 100%;
  height: 152px;
}
.mt12px{
    margin: 12px 0;
}
.lsjbls {
    background: url('@/static/img/ramps-card-token-illustration.png') right bottom / contain no-repeat, linear-gradient(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), linear-gradient(90deg, rgb(1, 137, 236) 0%, rgb(75, 122, 237) 35%, rgb(103, 116, 238) 58%, rgb(112, 106, 244) 80.5%, rgb(124, 91, 252) 100%);
    margin: 0;
}
.lsjbls.newbg{
    background: url('@/static/img/ramps-card-activity-illustration.png') right bottom / contain no-repeat, linear-gradient(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), linear-gradient(90deg, rgb(87, 197, 220) 0%, rgb(6, 191, 221) 49.39%, rgb(53, 169, 199) 100%);
}
</style>