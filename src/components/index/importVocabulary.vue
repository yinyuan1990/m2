<script>
export default {
  data() {
    return {
        list:[],
        isShow24:false,// 是否显示 24位
    };
  },
  computed:{
    filList(){
        if(this.isShow24) return this.list;
        else  return  this.list.filter(it=>  it.id<=12)
    },
    isOkBtn(){
        let lengsb = this.list.filter(it=>{
            return it.value
        })
        if(this.isShow24) return lengsb.length == 24;
        else  return lengsb.length == 12;
    }
  },
  mounted(){
    this.$nextTick(()=>{
        document.querySelector('input[type="password"]').setAttribute('autocomplete', 'off');

    })
    this.list = []
    for(let i=0;i<24;i++){
        this.list.push({
            id:i+1,
            value:'',
            isShow:false,
        })
    }
  },
  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
    backFn() {
      this.$emit("backFn",'importVocabularyVueShow');
      
    },
    changeNum(){
        this.isShow24 = !this.isShow24;
    }
  },
};
</script>
<template>
  <div class="tanbox">
    <div class="tanbox_bj" @click="closeFn"></div>
    <div class="skypeGroups">
      <div class="skypeGroups_head">导入私钥助记词</div>
      <span class="skypeGroups_close" @click="closeFn"></span>
      <span class="skypeGroups_close back" @click="backFn"></span>
      <div class="skypeGroups_bodys">
        <p
          class="mm-box mm-text mm-text--body-md 
          mm-box--margin-top-2 mm-box--color-text-default"
        >
          通过您的 12 个或 24 个单词私钥助记词导入现有钱包。
        </p>
        <div class="signboxs">
            <div class="signboxs_it" v-for="(it) in filList" :key="it.id">
                <div class="signboxs_it_num">{{it.id}}.</div>
                <input type="password" v-show="!it.isShow" class="signboxs_it_inp"
                autocomplete="off"
                style="outline: none; box-shadow: none;"
                 x-webkit-autofill="never"
                v-model="it.value"
                />
                <input type="text" v-show="it.isShow" class="signboxs_it_inp" 
                v-model="it.value"
                />
                <span class="signboxs_it_ics iconfont " 
                :class="it.isShow?'icon-yanjing_xianshi':'icon-yanjing_yincang'"></span>
            </div>
        </div>
        <div class="signchange" @click="changeNum">
            我有 {{isShow24?12:24}} 个单词组成的助记词
        </div>
        <div class="signchange_btn" :class="{'act':isOkBtn}">导入钱包</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skypeGroups_bodys {
  padding: 16px;
}
.signboxs{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &_it{
        width: 47%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &_num{
            line-height: 48px;
            font-size: 16px;
            width: 52px;
        }
        &_inp{
            width: 80px;
            height: 40px;
            border-radius: 6px;
            border: 1px solid #b7bbc8;
            padding: 0 4px;
            box-sizing: border-box;
            margin: 0 8px;
        }
        &_ics{
            font-size: 26px;
            color: #121314;
            transform: scaleY(-1);
        }
    }
}
.signchange{
    color: #4459ff;
    font-size: 16px;
    text-align: center;
    margin-top: 30px;
}
.signchange_btn{
    width: 100%;
    padding: 0 16px;
    background: #4459ff;
    font-size: 16px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    opacity: 0.5;
    color: #fff;
    border-radius: 20px;
    margin-top: 20px;
    &.act{
        opacity: 1;
    }
}
</style>