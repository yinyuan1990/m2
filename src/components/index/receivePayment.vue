<script>
import QRCode from 'qrcode'
import { accountManager } from '@/bbjs/AccountManager';
import { copyText } from '@/static/js/common';
export default {
  data() {
    return {
      wxUser:{},
      userInfo:{},
      index:0,
    };
  },
  created(){
    let user = accountManager.getCurrentAccount( );
    let arrUser = accountManager.getAllAccounts();
    for(let i=0;i<arrUser.length;i++){
      let it = arrUser[i]
      if( it.walletId == user.walletId ){
        this.index = i;
        break;
      }
    }
    let wxUser = user.addresses.filter(it=>{
      return it.chainId == user.currentChainId;
    })
    this.userInfo =user;
    this.wxUser = wxUser[0];
    console.log( wxUser )
  },
  mounted(){
    
    this.$nextTick(()=>{
      const text = this.wxUser.address;  // 要编码的内容
        const canvas = document.getElementById('imgqr');  // 获取 canvas 元素
      console.log(  text,canvas)
      const options = {
            width: 200,  // 二维码的宽度
            height: 200, // 二维码的高度
            color: {
                dark: '#000000',  // 二维码的前景色（黑色）
                light: '#ffffff'  // 二维码的背景色（白色）
            },
            errorCorrectionLevel: 'H'  // 错误修正级别：L (低), M (中), Q (较高), H (最高)
        };
        QRCode.toCanvas(canvas, text,options, function(error) {
            if (error) {
                console.error(error);
            } else {
                // console.log("QR Code successfully generated!");
                // 添加Logo
              setTimeout(() => {
                  const canvas2 = document.querySelector("#imgqr");
                  const ctx = canvas2.getContext("2d");
                  const logo = new Image();
                  logo.src = require('@/static/icon/metamask-fox.svg');
                  logo.onload = () => {
                      const x = (canvas2.width - 40) / 2;
                      const y = (canvas2.height - 40) / 2;
                      ctx.drawImage(logo, x, y, 40, 40);
                  };
              }, 100);
            }
        });

    })
  },
  methods:{
    copyText,
    closeFn(){
        this.$emit('closeFn')
    },
    goHref(type){
        let urls;
        if(type==1){
            urls= 'https://portfolio.metamask.io/buy?metamaskEntry=ext_buy_sell_button&chainId=1&metametricsId=0x90f3346b1d4226d7a4a6f6188cfd7b89cc71620bdeb47c62abae8570b8d94126&metricsEnabled=true&marketingEnabled=true';

        }else if(type == 2){

        }else if(type == 3){

        }
        window.open(urls)
    }
  }
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
        <div class="skypeGroups_head">收款</div>
        <span class="skypeGroups_close" @click="closeFn"></span>
        <div class="skypeGroups_qrcode">
            <!-- <img src="" alt="" class="imgqr"> -->
             <canvas  id="imgqr" class="imgqr" width="166" height="166"></canvas >
        </div>
        <div class=" 
        mm-text--body-lg-medium 
        mm-text--text-align-center 
        mm-box--color-text-default">
            Account {{ index+1 }}
        </div>
        <div class="miyaob  mm-text--body-lg-medium ">
            {{wxUser.address.substr(0,6)}}
            <span class="ss">{{ wxUser.address.substr(6,wxUser.address.length-10) }}</span>
            {{wxUser.address.substr(wxUser.address.length-4,4)}}
        </div>
        <div class="copybox" @click="copyText( wxUser.address )">
            <span class="copybox_icon 
            mm-icon--size-sm 
            mm-icon"></span>
            Copy address
        </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_qrcode{
  padding: 0;
  overflow: hidden;
}
</style>