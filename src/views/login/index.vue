<script>
import { checkPasswordStrength,copyText } from "@/static/js/common";
// import { createWallet } from "@/bbjs/walletManager"
import { accountManager } from "@/bbjs/AccountManager"
import { assetManager } from "@/bbjs/AssetManager"
import {chainDefaultTokenMap} from "@/bbjs/chain-default-assets"
import { Notify } from 'vant';
export default {
  data() {
    return {
      oneCheck: false,// 登录 协议同意
      langList: [
        'አማርኛ',
        "العربية",
        "български",
        "বাংলা",
        "Català",
        "Dansk",
        "Deutsch",
        "ελληνικά",
        "English",
        "Español",
        "Estonian",
        "فارسی",
        "Suomi",
        "日本語",
        "ಕನ್ನಡ",
        "한국어",
        "Lietuviškai",
        "Latvian",
        "മലയാളം",
        "Українська мова",
        "Tiếng Việt",
        "中文(简体)",
        "中文(繁體)",
      ],
      langListVal: [
        'አማርኛ',
        "العربية",
        "български",
        "বাংলা",
        "Català",
        "Dansk",
        "Deutsch",
        "ελληνικά",
        "en",
        "Español",
        "Estonian",
        "فارسی",
        "Suomi",
        "日本語",
        "ಕನ್ನಡ",
        "한국어",
        "Lietuviškai",
        "Latvian",
        "മലയാളം",
        "Українська мова",
        "Tiếng Việt",
        "zh_CN",
        "zh_TW",
      ],
      langKey: 21, // 选中的
      tabKey: 0,// 当前状态
      // tabKey: 3,// 当前状态
      createdOrAdd: 2,// 导入还是创建 1创建 2导入
      checkSvg: require('@/static/icon/check.svg'),
      checkSvgBold: require('@/static/icon/check-bold.svg'),
      isshowSign: false,// 是否显示私钥助记词
      isShowOneSign: true,// 是否是第一次显示
      copySvg: require('@/static/icon/copy.svg'),
      settingSvg: require('@/static/icon/setting.svg'),
      formPsw:{ // 创建密码对象
        psw1:'',
        psw1_txt:'',
        psw1_qd:'',
        psw2:'',
        psw2_txt:'',
        psw2_qd:'',
      },
      createWallet:{ // 创建的当前钱包信息

      },
      mnemonicWords:[],// 复制词列表
      querIsOk:false,// 确认助记词是否完成
    };
  },
  computed:{
    isBtn2Ok(){
      return this.formPsw.psw1 && this.formPsw.psw2 && !this.formPsw.psw1_txt && !this.formPsw.psw2_txt
    }
  },
  mounted(){
    
    // 
   let user = this.$getUser(()=>{
      this.$router.replace({
        path:'/newlogin'
      })
   })
   console.log( user,'--' )
    
  //  this.createWallet = accountManager.createFromMnemonic()
  },
  methods: {
    okSetBtn(){
      // if( this.createdOrAdd == 2 ){

      // }
      console.log( this.createWallet,'okSetBtn' )
      for(let i=0;i<this.createWallet.addresses.length;i++){
        let it = this.createWallet.addresses[i];
        console.log( it,'---createWallet-addresses' )
        assetManager.addDefaultMainAsset( this.createWallet.walletId,it.chainId,it.address );
        let meta = chainDefaultTokenMap[ it.chainId ]
        assetManager.addContractTokenAsset( this.createWallet.walletId,it.chainId,it.address,meta.contractAddress );
      }
      let userAddInfo = {
        ...this.createWallet,
        psw:this.formPsw.psw1,
        time: new Date().getTime()
      }
      console.log('--userAddInfo',userAddInfo)
      localStorage.setItem('userAddInfo',JSON.stringify(userAddInfo))
      // return;
      setTimeout(()=>{
        this.$router.push({
          path:'/install'
        })
      },500)
      
    },
    setAddFn(type) { // 下一步
      if (!this.oneCheck) return;
      if( this.tabKey == 0 && type == 1 ){
        // this.createWallet = createWallet()
        this.createWallet = accountManager.createFromMnemonic()
        console.log(  this.createWallet  )
        // this.createWallet.mnemonic
        this.mnemonicWords = this.createWallet.mnemonic.split(' ').map(it=>{
          return {
            value:'',
            name:it,
            tiptxt:''
          }
        })
      }
      if( this.tabKey ==  3){
        if(this.createdOrAdd == 2){ // 导入助记词

          this.tabKey =6
          this.mnemonicWords = this.mnemonicWords.map(it=>{
            return {
              value:'',
              name:'',
              tiptxt:''
            }
          })
        }else{
          this.tabKey += 1;
        }
      }else if(this.tabKey ==  5){
        this.createWallet.mnemonic = this.mnemonicWords.map(it=>it.value).join(' ');
        this.tabKey += 1;
      }else{
        this.tabKey += 1;
      }
      
      type && (this.createdOrAdd = type)
    },
    showTipTan() { // 设置提醒

    },
    goShowSign() { // 设置显示 私钥
      if (!this.isShowOneSign) {
        this.oneCheck = true;
        this.setAddFn();
        return;
      }
      this.isShowOneSign = false;
      this.isshowSign = true;
    },
    copyFn(txt) { // 复制
      copyText(txt)
    },
    // checkPwsOne(){ // 验证密码是否一致
    //   if( this.formPsw.psw1 != this.formPsw.psw2 ){
    //     this.formPsw.psw2_txt = '请确认下密码'
    //     return false;
    //   }
    // },
    zjcChangeInp(i){ // 验证助记词正确
      let obj = this.mnemonicWords[i];
      // console.log('obj',obj)
      
      if(!obj.value){
        this.mnemonicWords[i].tiptxt = '请输入助记词'
        return
      }else if( obj.name != obj.value && this.createdOrAdd == 1){
        this.mnemonicWords[i].tiptxt = '助记词不正确'
      }else{
        this.mnemonicWords[i].tiptxt = ''
      }
      let arr = this.createdOrAdd==1?[3,4,8]: [1,2,3,4,5,6,7,8,9,10,11,12];
      let borrs = true;
      for(let o=0;o<arr.length;o++){
        let it = this.mnemonicWords[arr[o]-1];
        
        if( (it.name != it.value || !it.name || !it.value)&& this.createdOrAdd==1 ){
          borrs = false
          break;
        }else if( !it.value ){
          // this.mnemonicWords[arr[o]-1].tiptxt = '请输入助记词'
          borrs = false
          break;
        }
      }
      console.log( this.mnemonicWords,i )
      this.querIsOk = borrs
    },
    blurFn(txt){ // 验证密码强度
      console.log(txt)
      
      let inpval = this.formPsw[txt];
      if( !inpval ) return;
      inpval = inpval.trim()
      this.formPsw[txt] = inpval;
      let strpsw = checkPasswordStrength(inpval);
      console.log( inpval ,strpsw)
      if( !strpsw ){
        this.formPsw[txt+'_txt'] = '密码至少为8位'
      }else{
        this.formPsw[txt+'_qd'] = strpsw
        this.formPsw[txt+'_txt'] = ''
      }
      if( txt=='psw2' ){
        if( this.formPsw.psw1 != this.formPsw.psw2 ){
          this.formPsw.psw2_txt = '密码不一致'
          return false;
        }
      }
    },
    querenyanz(){ // 确认私钥助记词
      let arr = this.createdOrAdd==1?[3,4,8]: [1,2,3,4,5,6,7,8,9,10,11,12];
      let borrs = true;
      for(let o=0;o<arr.length;o++){
        let it = this.mnemonicWords[arr[o]-1];
        if( (it.name != it.value || !it.name || !it.value) && this.createdOrAdd==1 ){
          borrs = false
          break;
        }else if( !it.value){
          // this.mnemonicWords[arr[o]-1].tiptxt = '请输入助记词'
          borrs = false
          break;
        }
      }
      this.querIsOk = borrs;
      console.log( this.mnemonicWords )
      if( !this.querIsOk ) return;
      let zijcStr = this.mnemonicWords.map(it=>{
        if( this.createdOrAdd==1 ){
          return it.name
        }else{
          return it.value
        }
      }).join(' ');
      let errTxt;
      console.log(zijcStr,'--zijcStr')
      try {
        if(this.createdOrAdd == 2) this.createWallet =  accountManager.importMnemonic(zijcStr);
      } catch (error) {
        errTxt = error;
        console.log(error)
      }
      if( errTxt ) {
        Notify({ type: 'danger', message: '无效助记词' });
        this.querIsOk = false;
        return
      }
      

      this.setAddFn('')
    },
    setMimaFn(){ // 设置事件
      // this.blurFn('');
      console.log( 
        this.isBtn2Ok,'setMimaFn',
        this.formPsw
       )
      //  debugger;
      if( !this.formPsw.psw1_txt && !this.formPsw.psw1 ){
        return
      }
      if( !this.formPsw.psw2 && !this.formPsw.psw2_txt ){
        return
      }
      if( !this.formPsw.psw1 && !this.formPsw.psw2 ){
        return
      } 
      if(!this.isBtn2Ok) return;
      // console.log( 
      //   this.isBtn2Ok,'setMimaFn'
      //  )
      this.oneCheck = true;
      this.setAddFn('')
    },
    filterEnglish(it) {
      it.value = it.value.replace(/[^a-zA-Z]/g, '')
    }
  }
};
</script>
<template>
  <div class="app os-win">
    <div class="onboarding-app-header">
      <div class="onboarding-app-header__contents">
        <button class="mm-box onboarding-app-header__logo-container mm-box--background-color-transparent"
          data-testid="app-header-logo">
          <img src="@/static/icon/metamask-fox.svg" class="onboarding-app-header__metafox-logo--icon" alt="" />
        </button>
        <div class="dropdown">
          <select class="dropdown__select">
            <option :value="langListVal[i]" :selected="i == langKey" 
            v-for="(item, i) in langList" :key="i">{{ item }}
            </option>
          </select>
          <img src="@/static/icon/arrow-down.svg" class="dropdown__icon-caret-down" alt="" />
        </div>
      </div>
    </div>
    <div class="mm-box main-container-wrapper">
      <div class="onboarding-flow">
        <div class="onboarding-flow__wrapper" v-if="tabKey == 0">
          <div class="onboarding-welcome" data-testid="onboarding-welcome">
            <div class="carousel-root" tabindex="0">
              <div class="carousel carousel-slider" style="width: 100%">
                <div>
                  <h2
                    class="mm-box mm-text mm-text--heading-lg mm-text--font-weight-bold mm-text--text-align-center mm-box--color-text-default">
                    让我们开始吧
                  </h2>
                  <p
                    class="mm-box mm-text mm-text--body-md mm-text--text-align-center mm-box--margin-right-6 mm-box--margin-left-6 mm-box--color-text-default">
                    MetaMask 深受数百万人信任，是一款可以让所有人进入 web3
                    世界的安全钱包。
                  </p>
                  <div class="onboarding-welcome__mascot">
                    <div style="z-index: 0">
                      <svg width="250px" height="300px">
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="178.5537749528885,129.9593187868595 215.68167954683304,72.90959358215332 213.49123120307922,127.56021916866302">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="178.5537749528885,129.9593187868595 213.49123120307922,127.56021916866302 193.15745681524277,163.8249021023512">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="215.68167954683304,72.90959358215332 178.5537749528885,129.9593187868595 177.68431454896927,104.46165204048157">
                        </polygon>
                        <polygon fill="rgb(255,92,22)" stroke="rgb(255,92,22)"
                          points="177.68431454896927,104.46165204048157 153.08213979005814,92.57173240184784 215.68167954683304,72.90959358215332">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="184.92255359888077,248.38326573371887 106.69969581067562,193.84371042251587 155.95990978181362,214.7241085767746">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="75.56647807359695,180.36814257502556 155.95990978181362,214.7241085767746 106.69969581067562,193.84371042251587">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="190.6234174966812,204.76389080286026 204.9117609858513,208.67818146944046 184.92255359888077,248.38326573371887">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="204.9117609858513,208.67818146944046 190.6234174966812,204.76389080286026 209.36892181634903,167.8823858499527">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="145.10823227465153,89.48706239461899 124.8660590063082,79.59770858287811 153.08213979005814,92.57173240184784">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="145.10823227465153,89.48706239461899 153.08213979005814,92.57173240184784 177.68431454896927,104.46165204048157">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="155.95990978181362,214.7241085767746 190.6234174966812,204.76389080286026 184.92255359888077,248.38326573371887">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="75.56647807359695,180.36814257502556 102.25917585194111,191.475248336792 155.95990978181362,214.7241085767746">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="196.85476273298264,157.39202164113522 203.6328986287117,137.5344380736351 200.9401097893715,162.85139545798302">
                        </polygon>
                        <polygon fill="rgb(255,92,22)" stroke="rgb(255,92,22)"
                          points="203.6328986287117,137.5344380736351 196.73298299312592,130.0279565155506 177.68431454896927,104.46165204048157">
                        </polygon>
                        <polygon fill="rgb(255,92,22)" stroke="rgb(255,92,22)"
                          points="177.68431454896927,104.46165204048157 196.73298299312592,130.0279565155506 191.77376478910446,124.41827282309532">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="167.5155945122242,113.34058418869972 145.10823227465153,89.48706239461899 177.68431454896927,104.46165204048157">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="167.5155945122242,113.34058418869972 177.68431454896927,104.46165204048157 191.77376478910446,124.41827282309532">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="203.6328986287117,137.5344380736351 196.85476273298264,157.39202164113522 198.51524382829666,145.32064804807305">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="193.29341500997543,138.98404240608215 196.73298299312592,130.0279565155506 203.6328986287117,137.5344380736351">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="203.6328986287117,137.5344380736351 198.51524382829666,145.32064804807305 193.29341500997543,138.98404240608215">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="189.35825675725937,149.25398309715092 198.51524382829666,145.32064804807305 196.85476273298264,157.39202164113522">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="90.1126116514206,13.800421357154846 145.10823227465153,89.48706239461899 93.24517473578453,91.22326523065567">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="189.35825675725937,149.25398309715092 193.29341500997543,138.98404240608215 198.51524382829666,145.32064804807305">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="93.24517473578453,91.22326523065567 67.44834780693054,60.64561307430267 90.1126116514206,13.800421357154846">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="93.24517473578453,91.22326523065567 145.10823227465153,89.48706239461899 103.67867164313793,107.09939002990723">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="66.00196287035942,106.864133477211 93.24517473578453,91.22326523065567 103.67867164313793,107.09939002990723">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="93.24517473578453,91.22326523065567 66.00196287035942,106.864133477211 67.44834780693054,60.64561307430267">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="193.29341500997543,138.98404240608215 191.77376478910446,124.41827282309532 196.73298299312592,130.0279565155506">
                        </polygon>
                        <polygon fill="rgb(255,92,22)" stroke="rgb(255,92,22)"
                          points="155.6948907673359,111.3183930516243 145.10823227465153,89.48706239461899 167.5155945122242,113.34058418869972">
                        </polygon>
                        <polygon fill="rgb(255,92,22)" stroke="rgb(255,92,22)"
                          points="139.71265126019716,108.4553986787796 103.67867164313793,107.09939002990723 145.10823227465153,89.48706239461899">
                        </polygon>
                        <polygon fill="rgb(255,92,22)" stroke="rgb(255,92,22)"
                          points="139.71265126019716,108.4553986787796 145.10823227465153,89.48706239461899 155.6948907673359,111.3183930516243">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="193.97784769535065,137.65089735388756 167.5155945122242,113.34058418869972 191.77376478910446,124.41827282309532">
                        </polygon>
                        <polygon fill="rgb(192,196,205)" stroke="rgb(192,196,205)"
                          points="155.93869984149933,215.86778908967972 206.07566833496094,191.1250501871109 190.6234174966812,204.76389080286026">
                        </polygon>
                        <polygon fill="rgb(255,92,22)" stroke="rgb(255,92,22)"
                          points="139.71265126019716,108.4553986787796 113.17389644682407,123.44756573438644 103.67867164313793,107.09939002990723">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="113.17389644682407,123.44756573438644 66.00196287035942,106.864133477211 103.67867164313793,107.09939002990723">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="66.00196287035942,106.864133477211 113.17389644682407,123.44756573438644 57.59776383638382,143.99862326681614">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="193.97784769535065,137.65089735388756 173.3093447983265,128.26914712786674 167.5155945122242,113.34058418869972">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="156.96783363819122,122.50869423151016 155.6948907673359,111.3183930516243 167.5155945122242,113.34058418869972">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="102.25917585194111,191.475248336792 56.449756026268005,193.37048828601837 125.91322214575484,176.38650611042976">
                        </polygon>
                        <polygon fill="rgb(192,196,205)" stroke="rgb(192,196,205)"
                          points="102.25917585194111,191.475248336792 125.91322214575484,176.38650611042976 141.70327968895435,209.70844477415085">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="173.3093447983265,128.26914712786674 156.96783363819122,122.50869423151016 167.5155945122242,113.34058418869972">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="217.32741594314575,152.01477580703795 173.3093447983265,128.26914712786674 193.97784769535065,137.65089735388756">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="156.96783363819122,122.50869423151016 139.71265126019716,108.4553986787796 155.6948907673359,111.3183930516243">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="159.61940586566925,135.84635965526104 143.51871609687805,120.42616009712219 156.96783363819122,122.50869423151016">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="143.51871609687805,120.42616009712219 139.71265126019716,108.4553986787796 156.96783363819122,122.50869423151016">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="156.96783363819122,122.50869423151016 173.3093447983265,128.26914712786674 159.61940586566925,135.84635965526104">
                        </polygon>
                        <polygon fill="rgb(192,196,205)" stroke="rgb(192,196,205)"
                          points="141.70327968895435,209.70844477415085 206.07566833496094,191.1250501871109 155.93869984149933,215.86778908967972">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="131.34628115221858,127.92779579758644 139.71265126019716,108.4553986787796 143.51871609687805,120.42616009712219">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="139.71265126019716,108.4553986787796 131.34628115221858,127.92779579758644 113.17389644682407,123.44756573438644">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="159.61940586566925,135.84635965526104 131.34628115221858,127.92779579758644 143.51871609687805,120.42616009712219">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="57.59776383638382,143.99862326681614 113.17389644682407,123.44756573438644 131.34628115221858,127.92779579758644">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="144.87786032259464,138.9463473111391 131.34628115221858,127.92779579758644 159.61940586566925,135.84635965526104">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="57.59776383638382,143.99862326681614 131.34628115221858,127.92779579758644 144.87786032259464,138.9463473111391">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="204.79143410921097,146.3351416401565 159.61940586566925,135.84635965526104 173.3093447983265,128.26914712786674">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="204.79143410921097,146.3351416401565 144.87786032259464,138.9463473111391 159.61940586566925,135.84635965526104">
                        </polygon>
                        <polygon fill="rgb(192,196,205)" stroke="rgb(192,196,205)"
                          points="141.70327968895435,209.70844477415085 125.91322214575484,176.38650611042976 189.14101272821426,183.62092450261116">
                        </polygon>
                        <polygon fill="rgb(192,196,205)" stroke="rgb(192,196,205)"
                          points="141.70327968895435,209.70844477415085 189.14101272821426,183.62092450261116 206.07566833496094,191.1250501871109">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="217.32741594314575,152.01477580703795 204.79143410921097,146.3351416401565 173.3093447983265,128.26914712786674">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="125.91322214575484,176.38650611042976 56.449756026268005,193.37048828601837 57.59776383638382,143.99862326681614">
                        </polygon>
                        <polygon fill="rgb(227,72,7)" stroke="rgb(227,72,7)"
                          points="57.59776383638382,143.99862326681614 144.87786032259464,138.9463473111391 125.91322214575484,176.38650611042976">
                        </polygon>
                        <polygon fill="rgb(255,92,22)" stroke="rgb(255,92,22)"
                          points="144.87786032259464,138.9463473111391 200.185164809227,150.02261106128572 125.91322214575484,176.38650611042976">
                        </polygon>
                        <polygon fill="rgb(231,235,246)" stroke="rgb(231,235,246)"
                          points="200.185164809227,150.02261106128572 189.14101272821426,183.62092450261116 125.91322214575484,176.38650611042976">
                        </polygon>
                        <polygon fill="rgb(255,141,93)" stroke="rgb(255,141,93)"
                          points="144.87786032259464,138.9463473111391 204.79143410921097,146.3351416401565 200.185164809227,150.02261106128572">
                        </polygon>
                        <polygon fill="rgb(192,196,205)" stroke="rgb(192,196,205)"
                          points="189.14101272821426,183.62092450261116 220.73209285736084,167.91394762694836 206.07566833496094,191.1250501871109">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="203.86677235364914,160.32748147845268 223.57561439275742,158.09823833405972 220.73209285736084,167.91394762694836">
                        </polygon>
                        <polygon fill="rgb(192,196,205)" stroke="rgb(192,196,205)"
                          points="189.14101272821426,183.62092450261116 203.86677235364914,160.32748147845268 220.73209285736084,167.91394762694836">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="209.02898162603378,151.5183316078037 212.55812048912048,147.55797497928143 220.1509177684784,151.00194329861552">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="209.02898162603378,151.5183316078037 220.1509177684784,151.00194329861552 223.57561439275742,158.09823833405972">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="203.86677235364914,160.32748147845268 209.02898162603378,151.5183316078037 223.57561439275742,158.09823833405972">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="200.185164809227,150.02261106128572 204.79143410921097,146.3351416401565 212.55812048912048,147.55797497928143">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="212.55812048912048,147.55797497928143 209.02898162603378,151.5183316078037 200.185164809227,150.02261106128572">
                        </polygon>
                        <polygon fill="rgb(231,235,246)" stroke="rgb(231,235,246)"
                          points="200.185164809227,150.02261106128572 203.86677235364914,160.32748147845268 189.14101272821426,183.62092450261116">
                        </polygon>
                        <polygon fill="rgb(102,24,0)" stroke="rgb(102,24,0)"
                          points="200.185164809227,150.02261106128572 209.02898162603378,151.5183316078037 203.86677235364914,160.32748147845268">
                        </polygon>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul class="onboarding-welcome__buttons">
              <li>
                <div
                  class="box onboarding__terms-of-use box--flex-direction-row box--align-items-center box--display-flex">
                  <div class="checkbox" :class="{ 'active': oneCheck }" @click="oneCheck = !oneCheck"></div>
                  <label class="onboarding__terms-label" for="onboarding__terms-checkbox"><span
                      class="mm-box mm-text mm-text--body-md mm-box--margin-left-2 mm-box--color-text-default"><span>
                        我同意MetaMask的<a class="create-new-vault__terms-link" href="https://metamask.io/terms.html"
                          target="_blank" rel="noopener noreferrer">使用条款</a>
                      </span>
                    </span>

                  </label>
                </div>
              </li>
              <li>
                <button class="button btn--rounded btn-primary" data-testid="onboarding-create-wallet"
                  :disabled="!oneCheck" @click="setAddFn(1)">
                  创建新钱包
                </button>
              </li>
              <li>
                <button class="button btn--rounded btn-secondary" data-testid="onboarding-import-wallet"
                  :disabled="!oneCheck" @click="setAddFn(2)">
                  导入现有钱包
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="onboarding-flow__wrapper" v-else-if="tabKey == 1">
          <div class="onboarding-metametrics" data-testid="onboarding-metametrics">
            <h2
              class="mm-box mm-text mm-text--heading-lg mm-text--font-weight-bold mm-text--text-align-center mm-box--color-text-default">
              请帮助我们改进 MetaMask</h2>
            <p
              class="mm-box mm-text onboarding-metametrics__desc mm-text--body-md mm-text--text-align-left mm-box--color-text-default">
              我们希望收集基本的使用和诊断数据，以改进 MetaMask。请注意，我们绝不会出卖您在此处提供的数据。</p>
            <div class="mm-box mm-box--padding-top-2 mm-box--padding-bottom-2"><a
                class="mm-box mm-text mm-text--body-md mm-box--color-primary-default"
                href="https://support.metamask.io/privacy-and-security/profile-privacy#how-is-the-profile-created"
                target="_blank" rel="noopener noreferrer">了解我们如何在收集您的个人资料使用数据的同时保护您的隐私。</a></div>
            <p
              class="mm-box mm-text onboarding-metametrics__desc mm-text--body-md mm-text--text-align-left mm-box--color-text-default">
              当我们收集指标时，总是...</p>
            <ul>
              <li>
                <div class="mm-box"><span
                    class="mm-box mm-icon mm-icon--size-sm mm-box--margin-inline-end-2 mm-box--display-inline-block mm-box--color-success-default"
                    :style="`mask-image: url(${checkSvg});`"></span><span> <span
                      class="mm-box mm-text mm-text--inherit mm-text--font-weight-bold mm-box--margin-top-0 mm-box--color-text-default">私密：</span>
                    会存储点击量和应用程序的浏览量，但不会存储其他详情（如您的公钥）。 </span></div>
              </li>
              <li>
                <div class="mm-box"><span
                    class="mm-box mm-icon mm-icon--size-sm mm-box--margin-inline-end-2 mm-box--display-inline-block mm-box--color-success-default"
                    :style="`mask-image: url(${checkSvg});`"></span><span> <span
                      class="mm-box mm-text mm-text--inherit mm-text--font-weight-bold mm-box--color-text-default">通用：</span>
                    我们暂时使用您的 IP 地址来检测一般位置（如您的国家或地区），但从来不会进行存储。 </span></div>
              </li>
              <li>
                <div class="mm-box"><span
                    class="mm-box mm-icon mm-icon--size-sm mm-box--margin-inline-end-2 mm-box--display-inline-block mm-box--color-success-default"
                    :style="`mask-image: url(${checkSvg});`"></span><span> <span
                      class="mm-box mm-text mm-text--inherit mm-text--font-weight-bold mm-box--color-text-default">可选：</span>
                    您可以随时决定是否通过设置共享或删除您的使用数据。 </span></div>
              </li>
            </ul>
            <label
              class="mm-box mm-text mm-checkbox mm-text--body-md mm-box--padding-bottom-3 mm-box--display-inline-flex mm-box--align-items-center mm-box--color-text-default"
              for="metametrics-opt-in" data-testid="metametrics-data-collection-checkbox">
              <span class="mm-checkbox__input-wrapper">
                <input
                  class="mm-box mm-checkbox__input mm-checkbox__input--checked mm-box--margin-0 mm-box--margin-right-2 mm-box--display-flex mm-box--background-color-primary-default mm-box--rounded-sm mm-box--border-color-primary-default mm-box--border-width-2 box--border-style-solid"
                  type="checkbox" title="我们将使用此数据来了解您如何与我们的营销通信交互。我们可能会分享相关资讯（例如产品特点）。" id="metametrics-opt-in"
                  :checked="false">
                <span
                  class="mm-box mm-checkbox__icon mm-icon mm-icon--size-md mm-box--display-inline-block mm-box--color-primary-inverse"
                  :style="`mask-image: url(${checkSvgBold});`"></span>
              </span>
              <span>我们将使用此数据来了解您如何与我们的营销通信交互。我们可能会分享相关资讯（例如产品特点）。</span>
            </label>
            <p
              class="mm-box mm-text onboarding-metametrics__terms mm-text--body-sm mm-text--text-align-left mm-box--color-text-alternative">
              <span> 如果我们决定将这些数据用于其他目的，我们会通知您。您可以查看我们的 <a href="https://metamask.io/privacy.html" target="_blank"
                  rel="noopener noreferrer">隐私政策</a> 以了解更多信息。请记住，您可以随时转到设置并选择退出。 </span>
            </p>
            <div
              class="mm-box onboarding-metametrics__buttons mm-box--display-flex mm-box--gap-4 mm-box--flex-direction-row mm-box--width-full">
              <button
                class="mm-box mm-text mm-button-base mm-button-base--size-lg mm-button-secondary mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent mm-box--rounded-pill mm-box--border-color-primary-default box--border-style-solid box--border-width-1"
                data-testid="metametrics-no-thanks" @click="setAddFn('')">不，谢谢
              </button>
              <button
                class="mm-box mm-text mm-button-base mm-button-base--size-lg mm-button-primary mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-inverse mm-box--background-color-primary-default mm-box--rounded-pill"
                data-theme="light" data-testid="metametrics-i-agree" @click="setAddFn('')">我同意
              </button>
            </div>
          </div>
        </div>
        <div class="onboarding-flow__wrapper" v-else-if="tabKey == 2">
          <div class="create-password__wrapper" data-testid="create-password">
            <div class="box box--margin-bottom-4 box--flex-direction-row">
              <ul class="progressbar">
                <li class="active">创建密码</li>
                <li class="">安全钱包</li>
                <li class="">确认私钥助记词</li>
              </ul>
            </div>
            <h2 class="mm-box mm-text mm-text--heading-lg mm-box--margin-bottom-3 mm-box--color-text-default">创建密码</h2>
            <h4
              class="mm-box mm-text mm-text--heading-sm mm-text--font-weight-normal mm-text--text-align-center mm-box--color-text-default">
              此密码只会在此设备上解锁您的 MetaMask 钱包。MetaMask 无法恢复此密码。</h4>
            <div class="mm-box mm-box--margin-top-3 mm-box--justify-content-center">
              <div class="create-password__form">
                <div class="form-field"><label class="mm-box">
                    <div class="form-field__heading">
                      <div class="mm-box form-field__heading-title mm-box--display-flex mm-box--align-items-baseline">
                        <h6
                          class="mm-box mm-text mm-text--body-sm-bold mm-box--display-inline-block mm-box--color-text-default">
                          新密码（至少 8 个字符）</h6>
                      </div>
                      <div class="mm-box form-field__heading-detail mm-box--margin-right-2 mm-box--text-align-end"><a
                          class="mm-box mm-text mm-button-base create-password__form--password-button mm-button-link mm-button-link--size-auto mm-text--body-sm mm-box--margin-bottom-1 mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
                          href="#" data-testid="show-password" type="a">显示</a></div>
                    </div>
                    <!-- autocomplete="new-password" -->
                    <input class="form-field__input" v-model="formPsw.psw1" @blur="blurFn('psw1')"
                    
                    autocomplete="off"
                     type="password" data-testid="create-password-new" />
                     <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-filled" v-if="formPsw.psw1_txt"
                    id="password-helper-text">{{ formPsw.psw1_txt }}</p>
                    <h6
                      v-if="formPsw.psw1_qd"
                      class="mm-box mm-text form-field__password-strength 
                      mm-text--body-sm mm-box--color-text-default">
                      <span> 密码强度：
                        <span data-testid="weak-password" class="create-password__weak">{{formPsw.psw1_qd}}</span> 
                      </span>
                    </h6>
                    <h6
                      class="mm-box mm-text form-field__password-strength-text mm-text--body-xs mm-box--color-text-alternative">
                      强密码可以提高钱包的安全性，以防设备被盗或被入侵。</h6>
                  </label></div>
                <div class="form-field"><label class="mm-box">
                    <div class="form-field__heading">
                      <div class="mm-box form-field__heading-title mm-box--display-flex mm-box--align-items-baseline">
                        <h6
                          class="mm-box mm-text mm-text--body-sm-bold mm-box--display-inline-block mm-box--color-text-default">
                          确认密码</h6>
                      </div>
                      <div class="mm-box form-field__heading-detail mm-box--margin-right-2 mm-box--text-align-end">
                        <div class="create-password__form--checkmark">
                          <span
                            v-if="formPsw.psw2 &&  !formPsw.psw2_txt"
                            class="mm-box mm-icon mm-icon--size-md 
                            mm-box--display-inline-block mm-box--color-inherit"
                            :style="`mask-image: url(${checkSvg});`"></span>
                          </div>
                      </div>
                    </div>
                    <input class="form-field__input" type="password" v-model="formPsw.psw2" 
                    @blur="blurFn('psw2')"
                    data-testid="create-password-confirm">
                    <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-filled" v-if="formPsw.psw2_txt"
                    id="password-helper-text">{{ formPsw.psw2_txt }}</p>
                  </label></div>
                <div
                  class="mm-box mm-box--margin-top-4 mm-box--margin-bottom-4 mm-box--justify-content-space-between mm-box--align-items-center">
                  <label
                    class="mm-box mm-text mm-checkbox create-password__form__terms-checkbox mm-text--body-md mm-box--display-inline-flex mm-box--align-items-flex-start mm-box--color-text-default"><span
                      class="mm-checkbox__input-wrapper">
                      <input
                        class="mm-box mm-checkbox__input mm-checkbox__input--checked 
                        mm-box--margin-0 mm-box--margin-right-2 mm-box--display-flex mm-box--background-color-primary-default mm-box--rounded-sm mm-box--border-color-primary-default mm-box--border-width-2 box--border-style-solid"
                        type="checkbox" data-testid="create-password-terms">
                      <span
                        class="mm-box mm-checkbox__icon mm-icon mm-icon--size-md mm-box--display-inline-block mm-box--color-primary-inverse"
                        :style="`mask-image: url(${checkSvg});`"></span>
                    </span>
                    <span>
                      <p class="mm-box mm-text mm-text--body-md mm-box--margin-left-2 mm-box--color-text-default"><span>
                          我明白 MetaMask 无法为我恢复此密码。<a
                            href="https://support.metamask.io/getting-started/user-guide-secret-recovery-phrase-password-and-private-keys/"
                            target="_blank" rel="noopener noreferrer"><span
                              class="create-password__link-text">了解更多</span></a> </span></p>
                    </span></label>
                </div>
                <button 
                class="button 
                btn--rounded 
                btn-primary 
                btn--large 
                create-password__form--submit-button"
                :class="isBtn2Ok?'':'huibtn'"
                  data-testid="create-password-wallet" @click="setMimaFn('')">创建新钱包</button>
              </div>
            </div>
          </div>
        </div>
        <div class="onboarding-flow__wrapper" v-else-if="tabKey == 3">
          <div
            class="mm-box secure-your-wallet mm-box--display-flex mm-box--flex-direction-column mm-box--justify-content-center mm-box--align-items-center"
            data-testid="secure-your-wallet">
            <div class="box box--margin-bottom-4 box--flex-direction-row">
              <ul class="progressbar">
                <li class="active complete">创建密码</li>
                <li class="active">安全钱包</li>
                <li class="">确认私钥助记词</li>
              </ul>
            </div>
            <h2
              class="mm-box mm-text mm-text--heading-lg mm-text--text-align-center mm-box--margin-bottom-4 mm-box--color-text-default">
              保护您的钱包安全</h2>
            <div class="mm-box secure-your-wallet__srp-design-container"><img
                class="secure-your-wallet__srp-design-image" src="@/static/img/srp-lock-design.png" alt="SRP Design">
            </div>
            <div
              class="mm-box secure-your-wallet__actions mm-box--margin-bottom-8 mm-box--display-flex mm-box--gap-4 mm-box--flex-direction-column mm-box--sm:flex-direction-row mm-box--justify-content-space-between mm-box--width-full">
              <button
                class="mm-box mm-text mm-button-base mm-button-base--size-lg mm-button-base--block mm-button-secondary mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent mm-box--rounded-pill mm-box--border-color-primary-default box--border-style-solid box--border-width-1"
                data-testid="secure-wallet-later" @click="setAddFn('')">稍后提醒我（不推荐）</button>
              <button
                class="mm-box mm-text mm-button-base mm-button-base--size-lg mm-button-base--block mm-button-primary mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-inverse mm-box--background-color-primary-default mm-box--rounded-pill"
                data-theme="light" data-testid="secure-wallet-recommended" @click="setAddFn('')">保护我的钱包（推荐）</button>
            </div>
            <div class="mm-box secure-your-wallet__desc">
              <h3 class="mm-box mm-text mm-text--heading-sm mm-box--color-text-default">什么是账户私钥助记词？</h3>
              <p class="mm-box mm-text mm-text--body-md mm-box--margin-bottom-4 mm-box--color-text-default">
                您的账户私钥助记词是由12个单词组成的短语，它是您的钱包和资金的“主私钥”</p>
              <h3 class="mm-box mm-text mm-text--heading-sm mm-box--color-text-default">如何保存我的账户私钥助记词？</h3>
              <ul class="mm-box secure-your-wallet__list mm-box--margin-bottom-4">
                <li class="mm-box mm-text mm-text--body-md mm-box--color-text-default">写下并存储在多个秘密位置。</li>
                <li class="mm-box mm-text mm-text--body-md mm-box--color-text-default">安全存放在保险箱内。</li>
              </ul>
              <h3 class="mm-box mm-text mm-text--heading-sm mm-box--color-text-default">我是否应该分享我的账户私钥助记词？</h3>
              <p class="mm-box mm-text mm-text--body-md mm-box--margin-bottom-4 mm-box--color-text-default">
                切勿分享您的账户私钥助记词，包括也不能与 MetaMask 分享！</p>
              <h3
                class="mm-box mm-text mm-text--heading-sm mm-box--padding-4 mm-box--color-text-default mm-box--background-color-primary-muted mm-box--rounded-lg">
                如果有人要求您的恢复短语，他们可能会试图欺诈您并偷窃您的钱包资金</h3>
            </div>
          </div>
        </div>
        <div class="onboarding-flow__wrapper" v-else-if="tabKey == 4">
          <div class="recovery-phrase" data-testid="recovery-phrase">
            <div class="box box--flex-direction-row">
              <ul class="progressbar">
                <li class="active complete">创建密码</li>
                <li class="active">安全钱包</li>
                <li class="">确认私钥助记词</li>
              </ul>
            </div>
            <div class="mm-box mm-box--margin-bottom-4 mm-box--justify-content-center mm-box--text-align-center">
              <h2
                class="mm-box mm-text recovery-phrase__header mm-text--heading-lg mm-text--font-weight-bold mm-box--color-text-default">
                写下您的私钥助记词</h2>
            </div>
            <div class="mm-box mm-box--margin-bottom-4 mm-box--justify-content-center mm-box--text-align-center">
              <h4 class="mm-box mm-text mm-text--heading-sm mm-text--font-weight-normal mm-box--color-text-default">
                请写下这个由12个单词组成的账户私钥助记词，然后将其保存到您信任并且只有您可以访问的地方。</h4>
            </div>
            <div class="mm-box recovery-phrase__tips mm-box--margin-bottom-4 mm-box--text-align-left">
              <h4 class="mm-box mm-text mm-text--heading-sm mm-box--color-text-default">提示:</h4>
              <ul>
                <li>
                  <h4 class="mm-box mm-text mm-text--heading-sm mm-text--font-weight-normal mm-box--color-text-default">
                    写下并存储在多个秘密位置。</h4>
                </li>
                <li>
                  <h4 class="mm-box mm-text mm-text--heading-sm mm-text--font-weight-normal mm-box--color-text-default">
                    安全存放在保险箱内。</h4>
                </li>
              </ul>
            </div>
            <div
              class="box recovery-phrase__secret box--margin-bottom-4 box--padding-4 box--display-grid box--flex-direction-row box--rounded-md box--border-style-solid box--border-color-border-muted box--border-width-1">
              <div data-testid="recovery-phrase-chips" class="recovery-phrase__chips"
                :class='{ "recovery-phrase__chips--hidden": !isshowSign }'>
                <div class="recovery-phrase__chip-item" v-for="(it,i) in mnemonicWords" :key="i">
                  <div class="recovery-phrase__chip-item__number">{{ i+1 }}.</div>
                  <div data-testid="recovery-phrase-chip-0"
                    class="recovery-phrase__chip chip 
                    chip--border-color-border-default 
                    chip--background-color-undefined chip--max-content">
                    {{ it.name }}</div>
                </div>
              </div>
              <div class="recovery-phrase__secret-blocker" v-show="!isshowSign">
                <i class="iconfont icon-yanjing_xianshi" style="    font-size: 16px;" color="white"
                  v-show="isShowOneSign"></i>
                <!-- <i class="far fa-eye" color="white"></i> -->
                <p v-show="isShowOneSign"
                  class="mm-box mm-text recovery-phrase__secret-blocker--text mm-text--body-sm mm-box--color-overlay-inverse">
                  请确保没有人在看您的屏幕</p>
              </div>
            </div>
            <div class="recovery-phrase__footer">
              <div class="recovery-phrase__footer__copy-and-hide__area" v-show="!isShowOneSign">
                <a class="button btn-link recovery-phrase__footer__copy-and-hide__button recovery-phrase__footer__copy-and-hide__button__hide-seed"
                  role="button" tabindex="0" @click="isshowSign = !isshowSign">
                  <span class="button__icon">
                    <i class="iconfont " :class="isshowSign ? 'icon-yanjing_yincang' : 'icon-yanjing_xianshi'"
                      color="var(--color-primary-default)">
                    </i>
                  </span>
                  {{ isshowSign ? '隐藏助记词' : '显示助记词' }}
                </a>

                <a class="button btn-link recovery-phrase__footer__copy-and-hide__button 
                recovery-phrase__footer__copy-and-hide__button__copy-to-clipboard"
                  role="button" tabindex="0"
                  @click="copyFn(createWallet.mnemonic)">
                  <span class="button__icon">
                    <span
                      class="mm-box mm-icon mm-icon--size-md mm-box--display-inline-block mm-box--color-primary-default"
                      :style="`mask-image: url(${copySvg});`">
                    </span>
                  </span>
                  复制到剪贴板
                </a>
              </div>
              <button class="button btn--rounded btn-primary recovery-phrase__footer--button"
                data-testid="recovery-phrase-reveal" @click="goShowSign">{{ isShowOneSign ? '显示私钥助记词' : '下一步'
                }}</button>
            </div>
          </div>
        </div>
        <div class="onboarding-flow__wrapper" v-else-if="tabKey == 5">
          <div class="recovery-phrase__confirm" data-testid="confirm-recovery-phrase">
            <div class="box box--margin-bottom-4 box--flex-direction-row">
              <ul class="progressbar">
                <li class="active complete">创建密码</li>
                <li class="active complete l34">安全钱包</li>
                <li class="active l34">确认私钥助记词</li>
              </ul>
            </div>
            <div
              class="box box--margin-bottom-4 box--flex-direction-row box--justify-content-center box--text-align-center box--display-flex">
              <h2 class="mm-box mm-text mm-text--heading-lg mm-text--font-weight-bold mm-box--color-text-default">
                确认私钥助记词</h2>
            </div>
            <div
              class="box box--margin-bottom-4 box--flex-direction-row box--justify-content-center box--text-align-center box--display-flex">
              <h4 class="mm-box mm-text mm-text--heading-sm mm-text--font-weight-normal mm-box--color-text-default">
                确认私钥助记词</h4>
            </div>
            <div
              class="box recovery-phrase__secret box--margin-bottom-4 box--padding-4 box--display-grid box--flex-direction-row box--rounded-md box--border-style-solid box--border-color-border-muted box--border-width-1">
              <div data-testid="recovery-phrase-chips" class="recovery-phrase__chips">
                <div class="recovery-phrase__chip-item" v-for="(it,i) in mnemonicWords" :key="i">
                  <div class="recovery-phrase__chip-item__number">{{ i+1 }}.</div>
                  <div data-testid="recovery-phrase-chip-0" v-if="![3,4,8].includes(i+1) && createdOrAdd==1"
                    class="recovery-phrase__chip chip chip--border-color-border-default chip--background-color-undefined chip--max-content">
                    {{it.name}}</div>
                  <div v-else
                    class="recovery-phrase__chip--with-input chip--with-input chip chip--border-color-primary-default chip--background-color-undefined chip--max-content">
                    <input data-testid="recovery-phrase-input-2" type="text" class="chip__input"
                    @blur="zjcChangeInp(i)" autocomplete="new-password"
                    @input="filterEnglish(it)"
                    v-model="it.value"/>
                    <p class="MuiFormHelperText-root postittt 
                    Mui-error MuiFormHelperText-filled"  v-show="it.tiptxt"
                    id="password-helper-text">{{it.tiptxt}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="recovery-phrase__footer__confirm">
              <button
                class="button btn--rounded btn-primary btn--large recovery-phrase__footer__confirm--button"
                data-testid="recovery-phrase-confirm" 
                :class="querIsOk?'':'huibtn'"
                @click="querenyanz"
                >确认</button></div>
          </div>
        </div>
        <div class="onboarding-flow" v-else-if="tabKey == 6">
          <div class="onboarding-flow__wrapper">
            <div class="mm-box creation-successful mm-box--display-flex mm-box--flex-direction-column"
              data-testid="creation-successful">
              <div
                class="mm-box mm-box--margin-top-6 mm-box--display-flex mm-box--flex-direction-column mm-box--justify-content-center">
                <p class="mm-box mm-text mm-text--body-md mm-box--margin-bottom-4 mm-box--justify-content-center mm-box--color-text-default"
                  style="align-self: center; font-size: 70px;"><span>🎉</span></p>
                <h2
                  class="mm-box mm-text mm-text--heading-lg mm-box--margin-6 mm-box--justify-content-center mm-box--color-text-default"
                  style="align-self: center;">恭喜！</h2>
                <p class="mm-box mm-text mm-text--body-lg-medium mm-box--margin-bottom-6 mm-box--color-text-default">
                  <span> 您的钱包受到保护，可随时使用。您可在 <b>设置 &gt; 安全与隐私。</b> 找到私钥助记词 </span></p>
              </div>
              <p class="mm-box mm-text mm-text--body-lg-medium mm-box--margin-bottom-6 mm-box--color-text-default">
                <span> 将您的私钥助记词提醒存放在安全的地方。如果遗失，没有人能帮您找回。更糟糕的是，您将无法再访问您的钱包。<a
                    class="mm-box mm-text mm-button-base mm-button-link mm-button-link--size-inherit mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
                    href="https://support.metamask.io/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask"
                    target="_blank" rel="noopener noreferrer">了解更多。</a> </span></p>
              <div class="mm-box mm-box--display-flex mm-box--flex-direction-column mm-box--align-items-flex-start">
                <button
                  class="mm-box mm-text mm-button-base mm-button-link mm-button-link--size-auto mm-text--body-md-medium mm-box--margin-top-4 mm-box--margin-bottom-4 mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
                  style="font-size: var(--font-size-5);"><span
                    class="mm-box mm-icon mm-icon--size-md mm-box--margin-inline-end-1 mm-box--display-inline-block mm-box--color-inherit"
                    :style="`mask-image: url(${settingSvg});`"></span>管理默认隐私设置</button>
                <p class="mm-box mm-text mm-text--body-sm mm-box--color-text-default">设置经过优化，更具易用性和安全性。可随时对此进行更改。</p>
              </div>
              <div
                class="mm-box creation-successful__actions mm-box--margin-top-6 mm-box--display-flex mm-box--flex-direction-column mm-box--justify-content-center mm-box--align-items-center">
                <button
                  class="mm-box mm-text mm-button-base mm-button-base--size-lg 
                  mm-button-primary mm-text--body-md-medium mm-box--margin-top-6 mm-box--padding-0 
                  mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex 
                  mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-inverse 
                  mm-box--background-color-primary-default mm-box--rounded-pill"
                  @click="okSetBtn"
                  data-theme="light" data-testid="onboarding-complete-done" style="width: 184px;">完成</button>
                </div>
            </div>
          </div><a class="button btn-link onboarding-flow__twitter-button" href="https://twitter.com/MetaMask"
            target="_blank" role="button" tabindex="0"><span>在 Twitter 上关注我们</span><i
              class="fab fa-twitter onboarding-flow__twitter-button__icon"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  align-items: center;
}

.onboarding-app-header {
  align-items: center;
  background: var(--color-background-default);
  position: relative;
  z-index: 12;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  flex: 0 0 auto;
  padding: 16px;
  z-index: 26;
}

.onboarding-app-header__contents {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  background: #fff;
}

.onboarding-app-header__logo-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 0 auto;
  background: #fff;
}

.onboarding-app-header__metafox-logo--icon {
  height: 32px;
}

.dropdown {
  position: relative;
  display: inline-block;
  height: 48px;
  width: 206px;
}

.dropdown__select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  font-size: 0.875rem;
  /* font-family: var(--font-family-default); */
  line-height: 140%;
  font-style: normal;
  font-weight: normal;
  color: #121314;
  border: 1px solid #b7bbc8;
  border-radius: 8px;
  background-color: #ffffff;
  width: 100%;
  padding: 12px 40px 12px 16px;
}

.dropdown__icon-caret-down {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  right: 16px;
  width: 16px;
  display: block;
}

.main-container-wrapper {
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  min-height: 0;
  width: 100%;
}

.onboarding-flow {
  background-color: #ffffff;
  padding: 0 16px;
  width: 100%;
}

.onboarding-flow__wrapper {
  margin: 24px auto;
  padding: 32px 16px;
  max-width: 600px;
  border: 1px solid #b7bbc866;
  border-radius: 24px;
}

.carousel-root {
  outline: none;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 1px solid #9ca1af;
  border-radius: 2px;
  box-sizing: border-box;
  margin-right: 6px;

}

.checkbox.active {
  background: url('~@/static/img/check.png') no-repeat;
  background-size: 100% 100%;
}

.recovery-phrase__footer__copy-and-hide__area {
  width: 100%;
}
.huibtn{
  opacity: var(--opacity-disabled);
}
.progressbar li{
  width: 60px;
}
.progressbar li::after{
  left: -13px;
}
.progressbar li.l34::after{
  left: -34px;
}
.recovery-phrase__chip-item{
  position: relative;
}
.recovery-phrase__chip-item .postittt{
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  text-align: center;
}
</style>