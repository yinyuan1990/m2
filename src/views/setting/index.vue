<script>
export default {
  data() {
    return {
        caolist:[
            {name:'通用',id:1},
            {name:'高级',id:2},
            {name:'联系方式',id:3},
            {name:'安全和隐私',id:4},
            {name:'通知',id:5},
            {name:'实验性',id:6},
            {name:'关于',id:7},
        ]
    };
  },
  methods:{
    back(){
        this.$router.back()
    }
  }
};
</script>
<template>
  <div class="setting">
    <headtop></headtop>
    <div class="setting_body">
        <div class="setting_body_til">
            设置
            <span class="mm-box mm-icon ts closesvg
            mm-icon--size-sm mm-box--display-inline-block 
            mm-box--color-inherit"
            @click="back"></span>
        </div>
        <div class="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
            <div class="MuiInputBase-root MuiInput-root 
                jss42 MuiInputBase-fullWidth MuiInput-fullWidth 
                MuiInputBase-formControl MuiInput-formControl 
                MuiInputBase-adornedStart MuiInputBase-adornedEnd">
                <div class="MuiInputAdornment-root MuiInputAdornment-positionStart" 
                style="margin-right: 12px;">
                    <span class="mm-box mm-icon ts searchsvg
                    mm-icon--size-sm mm-box--display-inline-block 
                    mm-box--color-icon-muted" 
                    ></span>
                </div>
                <input aria-invalid="false" autocomplete="off" id="search-settings" 
                placeholder="搜索" type="text" dir="auto" 
                class="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart 
                MuiInputBase-inputAdornedEnd" value="">
            </div>
        </div>
        <div class="caolist" v-for="it in caolist" :key="it.id" :class="it.id+'svg'">
            <span class="mm-box mm-icon ts caolist_iconl
            mm-icon--size-sm mm-box--display-inline-block 
            mm-box--color-icon-muted" 
            :class="'caolist_iconl'+it.id"
            ></span>
            <div class="caolist_til">{{ it.name }}</div>
            <span class="mm-box mm-icon ts arrow-right
            mm-icon--size-sm mm-box--display-inline-block 
            mm-box--color-icon-muted" 
            ></span>
        </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.setting{
    width: 100vw;
    height: 100vh;
    &_body{
        padding: 16px;
        &_til{
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            position: relative;
            padding: 15px 0;
        }
    }
}
.closesvg{
    mask-image: url('@/static/icon/close.svg');
    position: absolute;
    right: 15px;
    top: 19px;
}
.searchsvg{
    mask-image: url('@/static/icon/search.svg');
}
.MuiFormControl-fullWidth {
    width: 100%;
}
.MuiFormControl-root {
    border: 0;
    margin: 0;
    display: inline-flex;
    padding: 0;
    position: relative;
    min-width: 0;
    flex-direction: column;
    vertical-align: top;
}
.jss42 {
    color: var(--color-text-default);
    border: 1px solid var(--color-border-default);
    height: 48px;
    display: flex;
    padding: 0 16px;
    font-size: 0.875rem;
    align-items: center;
    font-family: "CentraNo1", Helvetica, Arial, sans-serif;
    border-radius: 8px;
    background-color: var(--color-background-default);
}
.MuiInput-root {
    position: relative;
}
.MuiInputAdornment-root {
    height: 0.01em;
    display: flex;
    max-height: 2em;
    align-items: center;
    white-space: nowrap;
}
.MuiInputBase-input {
    font: inherit;
    color: currentColor;
    width: 100%;
    border: 0;
    height: 1.1876em;
    margin: 0;
    display: block;
    padding: 6px 0 7px;
    min-width: 0;
    background: none;
    box-sizing: content-box;
    animation-name: mui-auto-fill-cancel;
    letter-spacing: inherit;
    animation-duration: 10ms;
    -webkit-tap-highlight-color: transparent;
}
.arrow-right{
    mask-image: url('@/static/icon/arrow-right.svg');
}
.caolist{
    padding: 20px 0;
    height: 65px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #121314;
    &_iconl{
        mask-image: url('@/static/icon/setting.svg');
        margin-right: 8px;
        color: #121314;
        &.caolist_iconl2{
            mask-image: url('@/static/icon/sliders.svg');
        }
        &.caolist_iconl3{
            mask-image: url('@/static/icon/book.svg');
        }
        &.caolist_iconl4{
            mask-image: url('@/static/icon/lock.svg');
        }
        &.caolist_iconl5{
            mask-image: url('@/static/icon/notification.svg');
        }
        &.caolist_iconl6{
            mask-image: url('@/static/icon/flask.svg');
        }
        &.caolist_iconl7{
            mask-image: url('@/static/icon/info.svg');
        }
    }
    &_til{
        flex: 1;
        font-size: 1.125rem;
    }
}
</style>