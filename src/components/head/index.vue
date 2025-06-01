<script>
export default {
  name:'',
  data(){ return {
    list:[
        {
            name:'首页',
            img:require('@/static/icon/setting.svg')
        },
        {
            name:'首页',
            img:require('@/static/icon/setting.svg')
        },
        {
            isSetF:true,// 特殊化设置
        },
        {
            name:'首页',
            img:require('@/static/icon/setting.svg')
        },
        {
            name:'首页',
            img:require('@/static/icon/setting.svg')
        },
    ]
  } }
}
</script>
<template>
  <div class="headbox">
    <div v-for="(item,index) in list" :key="index" class="headbox_head"></div>
  </div>
</template>
<style scoped lang="scss">
.headbox{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    background: #fff;
    box-shadow: 3px 3px 3px #f6f6f6;
    height: 60px;
    box-sizing: border-box;
    padding: 1;
}
</style>