<script>
import skypeGroupsVue from '@/components/index/skypeGroups.vue'
import receivePaymentVue from '@/components/index/receivePayment.vue'
import selectUVue from '@/components/index/selectU.vue'
import addAccVue from '@/components/index/addAcc.vue'
import accountnumberVue from '@/components/index/accountnumber.vue'
import importVocabularyVue from '@/components/index/importVocabulary.vue'
import signttVue from '@/components/index/signtt.vue'
import hotwlVue from '@/components/index/hotwl.vue'
import sortgzVue from '@/components/index/sortgz.vue'
import bisetVue from '@/components/index/biset.vue'
import { save } from "@/bbjs/AccountManager"
import { assetManager } from "@/bbjs/AssetManager"
import topmix from "@/components/head/topmix.js"
import {fetchTokenPrice} from '@/bbjs/priceService'
import {chainDefaultTokenMap,getTrustWalletChainLogo} from "@/bbjs/chain-default-assets"
import addDbVue from '@/components/index/addDb.vue'


export default {
    name: '',
    mixins:[topmix],
    components:{
        skypeGroupsVue,
        receivePaymentVue,
        selectUVue,
        addAccVue,
        accountnumberVue,
        importVocabularyVue,
        signttVue,
        hotwlVue,
        sortgzVue,
        bisetVue,
        addDbVue,
    },
    data() {
        return {
            arrowDown: require('@/static/icon/arrow-down.svg'),
            filterSvg: require('@/static/icon/filter.svg'),
            moreVertica: require('@/static/icon/more-vertical.svg'),
            exportSvg: require('@/static/icon/export.svg'),
            eyeSvg: require('@/static/icon/eye.svg'),
            closeSvg: require('@/static/icon/close.svg'),
            stakeSvg: require('@/static/icon/stake.svg'),
            setList: [
                { name: '出入金', img: require('@/static/icon/plus-minus.svg'), id: 1 },
                { name: '兑换', img: require('@/static/icon/swap-horizontal.svg'), id: 2 },
                { name: '跨链桥', img: require('@/static/icon/bridge.svg'), id: 3 },
                { name: '发送', img: require('@/static/icon/arrow-2-up-right.svg'), id: 4 },
                { name: '收款', img: require('@/static/icon/scan-barcode.svg'), id: 5 },
            ],
            active: 0,

            coinList:[],// 代币 和 nft 列表
            skypeGroupsVueShow:false,// 充值方法弹框开关
            receivePaymentVueShow:false,//接收加密货币弹框
            selectUVueShow:false,// 切换账号弹框
            addAccVueShow:false, // 添加账号弹框开关
            accountnumberVueShow:false, // 添加账号 弹框开关
            importVocabularyVueShow:false,// 导入私钥记词器开关
            signttVueShow:false,// 私钥设置弹框

            showHotTan:false,// 热门网络
            sortgzVueTan:false,// 排序规则
            bisetVueTan:false, // 添加代币
            accEtsbox:{},// 用户资产
            isShowMw:true,// 是否是明文
            totalM:0,// 总金额
            // daibiList:[],// 代币列表
            addDbVueShow:false,// 添加代币弹框
            cliTimes:true,// 当前点击间隔
        }
    },
    mounted(){
        // let userinfo = load('userAddInfo')
        // console.log('userAddInfo',userinfo)
        let user = this.$getUser(()=>{
            // this.$router.replace({
            //     path:'/newlogin'
            // })
        })
        if(!user){
            this.$router.replace({
                path:'/login'
            })
            return
        }
        setTimeout(()=>{
            this.initData()
        },500)

        

    },
    methods:{
        async initData(){
            var userinfos = accountManager.getCurrentAccount( )
            this.accEtsbox = assetManager.getAssets(userinfos.walletId,userinfos.currentChainId);
            console.log ( this.accEtsbox,userinfos,'--this.accEtsbox1' ) 
            this.coinList = [];
            this.totalM = 0;
            if(  !this.accEtsbox ||  this.accEtsbox.length == 0 ) return ;
            // this.totalM = fetchTokenBalance(this.userinfos.child.address)
            // console.log( this.totalM )
            
            let arrbox = []
            for(let i=0;i<this.accEtsbox.length;i++){
                let it = this.accEtsbox[i]
                let meta = chainDefaultTokenMap[ it.chainId ]
                
                let data = await fetchTokenPrice(meta.coinGeckoPlatformId)
                let arrboxit = {
                    ...data,
                    ...it,
                    miniIcon:getTrustWalletChainLogo(it.chainId)
                }
                this.totalM += (arrboxit.price*arrboxit.balance)
                arrbox.push(arrboxit)
            }
            console.log ( arrbox,'--this.accEtsbox2' ) 
            this.coinList = arrbox;
            // console.log('data',data)
        },
        activeChange(){
            console.log(this.active)
        },
        receiveSkype(){ // 显示接收货币弹框
            this.receivePaymentVue = true;
        },
        goDbSc(){ // 去市场
            if( this.active == 0 ){
                this.skypeGroupsVueShow = true;
            }else{
                window.open('https://portfolio.metamask.io/buy?metamaskEntry=ext_buy_banner_activity&chainId=1&metametricsId=0x90f3346b1d4226d7a4a6f6188cfd7b89cc71620bdeb47c62abae8570b8d94126&metricsEnabled=true&marketingEnabled=true','_blank')
            }
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
        Refresh(){ // 刷新
            this.initSet()
            setTimeout(()=>{
                this.initData()
            },500)
        },
        showDetailsDb(it){ //显示代币详情
            save('dbitem',it)
            this.$router.push({
                path:"/dbdetails"
            })
        },
        addDb(){
            console.log( 'addDb---' )
            // let arrs = ['bisetVueTan','sortgzVueTan',]
            this.addDbVueShow = true;
        },
        setTanFn(typeTxt){ // 设置弹框
            this[typeTxt] = !this[typeTxt];
            let arrs = ['bisetVueTan','sortgzVueTan','showHotTan'];
            let keys = arrs.indexOf(typeTxt)
            arrs.splice(keys,1);
            arrs.forEach(it=>{
                this[it] = false;
            })
            this.cliTimes = false;
            let tim = setTimeout(()=>{
                clearTimeout(tim)
                this.cliTimes = true
            },200)
        },
        checkNewDom(event){
            let eventbox =  event.target 
            // console.log('hotbox')
            if( this.showHotTan && this.cliTimes){
                // console.log('hotbox')
                const hotwl = document.getElementById('hotwl');
                this.showHotTan = hotwl && hotwl.contains(eventbox); // 返回布尔值
            }else if(this.sortgzVueTan && this.cliTimes){
                const sortgz = document.getElementById('sortgz');
                this.sortgzVueTan = sortgz && sortgz.contains(eventbox); // 返回布尔值
            }else if(this.bisetVueTan && this.cliTimes){
                const biset = document.getElementById('biset');
                this.bisetVueTan = biset && biset.contains(eventbox); // 返回布尔值
            }
            
            
            
            // console.log( event )
            
            // console.log( event.contains(sortgz),event.contains(biset),event.contains(hotwl) )
            
            
            
        }
    }
}
</script>
<template>
    <div class="indexbox" @click="checkNewDom($event)">
        <!-- 添加代币弹框 -->
        <addDbVue v-if="addDbVueShow" @Refresh="Refresh"
        @closeFn="addDbVueShow = false"></addDbVue>
        <!-- 私钥设置弹框 -->
        <signttVue v-if="signttVueShow" 
        @closeFn="signttVueShow = false"></signttVue>
        <!-- 导入私钥记词器弹框 -->
        <importVocabularyVue v-if="importVocabularyVueShow" 
        @closeFn="importVocabularyVueShow = false"></importVocabularyVue>
        <!-- 添加账号弹框 -->
        <accountnumberVue v-if="accountnumberVueShow" 
        @closeFn="accountnumberVueShow = false"></accountnumberVue>
        <!-- 添加账号弹框 -->
        <addAccVue v-if="addAccVueShow" 
        @closeFn="addAccVueShow = false"></addAccVue>
         <!-- 切换账号弹框 -->
        <selectUVue v-if="selectUVueShow" 
        @closeFn="selectUVueShow = false"></selectUVue>
        <!-- 接收加密货币弹框 -->
        <receivePaymentVue v-if="receivePaymentVueShow" 
        @closeFn="receivePaymentVueShow = false"></receivePaymentVue>
        <!--  充值方法弹框 -->
        <skypeGroupsVue v-if="skypeGroupsVueShow" 
        @receive="receiveSkype"
        @closeFn="skypeGroupsVueShow = false"></skypeGroupsVue>
        <headtop @Refresh="Refresh"></headtop>
        <div class="indexbox_body">
            <div title="" class="" tabindex="0">
                <div class="eth-overview__balance" style="display: block;width: 100%;box-sizing: border-box;margin: 16px auto;">
                    <div class="eth-overview__primary-container mauto">
                        <div class="mm-box currency-display-component eth-overview__primary-balance mm-box--display-flex mm-box--flex-wrap-wrap mm-box--align-items-center"
                            data-testid="eth-overview__primary-currency" style="display: contents;">
                            <template v-if="isShowMw">
                                <span
                                    class="mm-box mm-text currency-display-component__text mm-text--inherit mm-text--ellipsis mm-box--color-text-default"
                                    data-testid="account-value-and-suffix">
                                    ${{ totalM }}
                                </span>
                                <span
                                    class="mm-box mm-text currency-display-component__suffix mm-text--inherit mm-box--margin-inline-start-1 mm-box--color-text-default">
                                    USD
                                </span>
                            </template>
                            <template v-else>
                                <span
                                    class="mm-box mm-text currency-display-component__suffix 
                                    mm-text--inherit mm-box--margin-inline-start-1 
                                    mm-box--color-text-default">
                                    •••••••••••
                                </span>
                            </template>
                        </div>
                        <button
                            
                            class="mm-box mm-button-icon mm-button-icon--size-md 
                            mm-box--margin-left-2 mm-box--display-inline-flex 
                            mm-box--justify-content-center mm-box--align-items-center 
                            mm-box--color-icon-alternative mm-box--background-color-transparent 
                            mm-box--rounded-lg"
                            @click="isShowMw = !isShowMw"
                            aria-label="Sensitive toggle" data-testid="sensitive-toggle">

                            <iconimgVue :url="eyeSvg"
                                class="mm-box mm-icon ts mm-icon--size-md mm-box--display-inline-block mm-box--color-inherit">
                            </iconimgVue>
                        </button>
                    </div>
                    <div class="mm-box wallet-overview__currency-wrapper mauto" style="justify-content: center;">
                        <div class="mm-box mm-box--display-flex">
                            <p class="mm-box mm-text mm-text--body-md-medium mm-text--ellipsis mm-box--color-text-default"
                                data-testid="aggregated-value-change" style="white-space: pre;">
                                
                                {{ !isShowMw?'••••••':'(+US$0)' }}
                            </p>
                            <p class="mm-box mm-text mm-text--body-md-medium mm-text--ellipsis mm-box--color-text-default"
                                data-testid="aggregated-percentage-change">
                                {{ !isShowMw?'••••••':'(+0.00%)' }}
                            </p>
                        </div>
                        <a class="mm-box mm-text mm-button-base mm-button-link mm-button-link--size-auto mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
                            data-testid="portfolio-link">
                            Portfolio
                            <iconimgVue :url="exportSvg"
                                class="mm-box mm-icon ts mm-icon--size-sm mm-box--margin-inline-start-1 mm-box--display-inline-block mm-box--color-inherit">
                            </iconimgVue>
                        </a>
                    </div>
                </div>
            </div>
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
            <div class="tabbox">
                <!--  background="#f6f6f7" -->
                <van-tabs v-model="active" @change="activeChange" 
                type="line" color="#121314" class="tabbox_child">
                    <van-tab title="代币"></van-tab>
                    <van-tab title="收藏品"></van-tab>
                    <van-tab title="活动"></van-tab>
                </van-tabs>
                <div class="mm-box mm-box--display-flex mm-box--justify-content-space-between"

                >

                    <button
                        class="mm-box mm-text mm-button-base 
                        mm-button-base--size-sm mm-button-base--ellipsis 
                        asset-list-control-bar__button asset-list-control-bar__network_control 
                        mm-text--body-md-medium mm-text--ellipsis mm-box--margin-right-2 mm-box--padding-0 
                        mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex 
                        mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default 
                        mm-box--background-color-background-default mm-box--rounded-pill"
                        data-testid="sort-by-networks"
                        @click="setTanFn('showHotTan')">
                        <span
                            class="mm-box mm-text mm-text--inherit 
                            mm-text--ellipsis 
                            mm-box--color-text-default">热门网络</span>
                        <iconimgVue :url="arrowDown"
                            class="mm-box mm-icon ts mm-icon--size-sm 
                            mm-box--margin-inline-start-1 mm-box--display-inline-block mm-box--color-inherit">
                        </iconimgVue>
                        
                    </button>
                    <div
                        class="mm-box asset-list-control-bar__buttons 
                        mm-box--display-flex mm-box--justify-content-flex-end">
                        <div @click="setTanFn('sortgzVueTan')">
                            <div class="" tabindex="0" data-tooltipped="" aria-describedby="tippy-tooltip-22"
                                data-original-title="排序方式" style="display: inline;">
                                <button
                                    class="mm-box mm-text mm-button-base mm-button-base--size-sm asset-list-control-bar__button mm-text--body-md-medium mm-box--margin-right-2 mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-default mm-box--rounded-pill"
                                    data-testid="sort-by-popover-toggle">

                                    <iconimgVue :url="filterSvg"
                                        class="mm-box mm-icon ts mm-icon--size-sm mm-box--margin-inline-end-0 mm-box--display-inline-block mm-box--color-inherit">
                                    </iconimgVue>
                                    <span class="mm-box mm-text mm-text--inherit mm-box--color-text-default"></span>
                                </button>
                            </div>
                        </div>
                        <button @click="setTanFn('bisetVueTan')"
                            class="mm-box mm-text mm-button-base mm-button-base--size-sm asset-list-control-bar__button mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-default mm-box--rounded-pill"
                            data-testid="import-token-button">

                            <iconimgVue :url="moreVertica"
                                class="mm-box mm-icon ts mm-icon--size-sm mm-box--margin-inline-end-0 mm-box--display-inline-block mm-box--color-inherit">
                            </iconimgVue>
                            <span class="mm-box mm-text mm-text--inherit mm-box--color-text-default"></span>
                        </button>
                    </div>
                    <hotwlVue v-if="showHotTan"></hotwlVue>
                    <sortgzVue v-if="sortgzVueTan"></sortgzVue>
                    <bisetVue v-if="bisetVueTan" @addDbFn="addDb" @Refresh="Refresh"></bisetVue>
                </div>
                <div
                    class="mm-box mm-box--display-flex 
                    mm-box--gap-4 
                    mm-box--flex-direction-row mm-box--width-full mm-box--height-full"
                    v-for="(item,index) in coinList" :key="index"
                    @click="showDetailsDb(item)">
                    <a class="
                    mm-box mm-box--padding-top-2 mm-box--padding-right-4 
                    mm-box--padding-bottom-2 mm-box--padding-left-4 
                    mm-box--display-flex mm-box--flex-direction-row mm-box--width-full"
                    
                        data-testid="multichain-token-list-button"
                        style="height: 62px; 
                        cursor: pointer; 
                        
                         transition: background-color 0.2s ease-in-out;">
                        <div class="mm-box mm-badge-wrapper 
                        mm-box--margin-right-4 mm-box--display-inline-block"
                            style="align-self: center;    margin-right: 16px;">
                            <div
                                class="mm-box mm-text mm-avatar-base 
                                mm-avatar-base--size-md mm-avatar-token mm-text--body-sm 
                                mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center 
                                mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-muted 
                                mm-box--rounded-full">
                                <!-- <img class="mm-avatar-token__token-image" 
                                src="@/static/icon/eth_logo.svg" alt="ETH logo"> -->
                                <img class="mm-avatar-token__token-image" 
                                :src="item.iconUrl" alt="ETH logo">
                            </div>
                            <div
                                class="mm-box mm-badge-wrapper__badge-container rxiaobiao
                                mm-badge-wrapper__badge-container--rectangular-bottom-right">
                                <div
                                    class="mm-box mm-text mm-avatar-base 
                                    mm-avatar-base--size-xs mm-avatar-network 
                                    mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex 
                                    mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default 
                                    mm-box--background-color-background-muted mm-box--rounded-md mm-box--border-color-background-default 
                                    mm-box--border-width-2 box--border-style-solid">
                                    <!-- src="@/static/icon/eth_logo.svg" -->
                                    <img class="mm-avatar-network__network-image" 
                                    :src="item.miniIcon"
                                        alt="Ethereum Mainnet logo"></div>
                            </div>
                        </div>
                        <div class="mm-box mm-box--display-flex 
                        mm-box--flex-direction-column mm-box--justify-content-center 
                        mm-box--width-full"
                            style="flex-grow: 1; overflow: hidden;">
                            <div
                                class="mm-box mm-box--display-flex 
                                mm-box--flex-direction-row mm-box--justify-content-space-between">
                                <p
                                    class="mm-box mm-text mm-text--body-md 
                                    mm-text--font-weight-medium mm-text--ellipsis 
                                    mm-box--color-text-default">
                                    {{item.name}}
                                    <button
                                    v-if="item.isMainCoin && item.chainId == '1'"
                                        class="mm-box mm-box--padding-inline-0 
                                        mm-box--padding-inline-start-1 mm-box--padding-inline-end-1 
                                        mm-box--gap-1 mm-box--background-color-transparent"
                                        data-testid="staking-entrypoint-0x1" tabindex="0">
                                        <span class="mm-box mm-text mm-text--body-md mm-box--color-text-default">•</span>
                                        <span class="mm-box mm-text mm-text--body-md 
                                        mm-text--font-weight-medium mm-box--padding-inline-start-1 
                                        mm-box--padding-inline-end-1 mm-box--color-primary-default">质押</span>
                                        <iconimgVue :url="stakeSvg"
                                            class="mm-box mm-icon ts mm-icon--size-sm 
                                            mm-box--display-inline-block mm-box--color-primary-default">
                                        </iconimgVue>
                                    </button>
                                </p>
                                <p class="mm-box mm-text mm-text--body-md mm-text--font-weight-medium 
                                mm-text--ellipsis mm-text--text-align-end mm-box--color-text-default"
                                    data-testid="multichain-token-list-item-secondary-value"
                                    style="white-space: nowrap; padding-inline-start: 8px;">
                                    {{  isShowMw?('US$ '+(item.price*item.balance)):'••••••••••'  }}
                                </p>
                            </div>
                            <div
                                class="mm-box mm-box--display-flex mm-box--flex-direction-row mm-box--justify-content-space-between">
                                <div class="mm-box mm-box--display-flex">
                                    <p class="mm-box mm-text mm-text--body-sm-medium mm-text--ellipsis 
                                    "
                                    :class="item.change24h>=0?'mm-box--color-success-default':'mm-box--color-error-default'"
                                        data-testid="token-increase-decrease-percentage-0x0000000000000000000000000000000000000000"
                                        >
                                        {{ item.change24h }}%</p>
                                </div>
                                <p class="mm-box mm-text mm-text--body-sm-medium mm-text--text-align-end mm-box--color-text-alternative"
                                    data-testid="multichain-token-list-item-value">
                                {{  isShowMw?(item.balance+' '+item.symbol):'••••••'  }}</p>
                            </div>
                        </div>
                    </a>
                    <div class="emtrybox" v-if="coinList.length == 0">
                        <div class="emtrybox_til">尚无 {{ active==0?'代币':'NFT' }}</div>
                        <div class="emtrybox_more">了解更多</div>
                    </div>
                    
                </div>
                <template v-if="active == 1">
                <div class="exprotboxs">
                    <span class="exprotboxs_icon"></span>
                    导入 NFT
                </div>
                <div class="exprotboxs news">
                    <span class="exprotboxs_icon"></span>
                    刷新列表
                </div>
                </template>
                <div
                    v-if="active != 1"
                    class="
                    mm-box ramps-card lsjbls
                    ramps-card-token mm-box--margin-2 mm-box--display-flex mm-box--gap-2 mm-box--flex-direction-column
                    mm-box--rounded-lg"
                    :class="{'newbg':active == 2}">
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
                        mm-box--rounded-pill plr16" @click="goDbSc">代币市场</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.indexbox {
    width: 100vw;
    height: 100vh;
    display: block;
    overflow: hidden;
    overflow-y: auto;
    position: relative;

    
    &_body{
        // background-color: #f6f6f7;
    }

    .mm-icon {
        background: transparent;
    }

    .mm-icon.ts {
        background-color: currentColor;
    }

    .mm-icon.ts {
        background-color: currentColor;
    }

    .mauto {
        margin: 0 auto;
    }

    

    .tabbox {
        padding: 0 16px;
        box-sizing: border-box;

        &_child {
            border-bottom: 1px solid #b7bbc866;
            // background-color: #f6f6f7;
        }
    }

    .lsjbls {
        background: url('@/static/img/ramps-card-token-illustration.png') right bottom / contain no-repeat, linear-gradient(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), linear-gradient(90deg, rgb(1, 137, 236) 0%, rgb(75, 122, 237) 35%, rgb(103, 116, 238) 58%, rgb(112, 106, 244) 80.5%, rgb(124, 91, 252) 100%);
        margin: 0;
    }

    .plr16 {
        padding: 0 16px;
    }
    .rxiaobiao{
        right: var(--badge-wrapper-position-rectangular);
        transform: scale(1) translate(50%, 50%);
        transform-origin: 100% 100%;
    }
    .lsjbls.newbg{
        background: url('@/static/img/ramps-card-activity-illustration.png') right bottom / contain no-repeat, linear-gradient(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), linear-gradient(90deg, rgb(87, 197, 220) 0%, rgb(6, 191, 221) 49.39%, rgb(53, 169, 199) 100%);
    }
    .emtrybox{
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 280px;
        &_til{
            font-size: 16px;
            font-weight: 500;
            color:#686e7d;
        }
        &_more{
            line-height: 40px;
            color: #4459ff;
            font-size: 16px;
            font-weight: 500;
        }
    }
    
}
.mm-box--justify-content-space-between{
    position: relative;
}
</style>