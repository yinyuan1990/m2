<script>
export default {
  data() {
    return {
        aniShow:true,// 动画
        value:'',
        valTxt:'',// 
        userInfo:{}
    };
  },
  mounted(){
    this.userInfo = this.$getUser()
  },
  methods:{
    checkPsw(){
        if(this.value != this.userInfo.psw){
            this.valTxt = '密码不正确'
            return false
        }else{
            this.valTxt = ''
            return true;
        }
    },
    goHome(){
        if(!this.checkPsw()) return;
        if(!this.value) return;
        this.$router.replace({
            path:'/index'
        })
    }
  }
};
</script>
<template>
  <div id="app-content">
    <div class="app os-win">
      <div
        class="mm-box multichain-app-header 
        multichain-app-header-shadow mm-box--margin-bottom-0 
        mm-box--display-flex mm-box--align-items-center 
        mm-box--width-full mm-box--background-color-background-default"
      >
        <div
          class="mm-box multichain-app-header__lock-contents 
          mm-box--padding-2 mm-box--display-flex mm-box--gap-2 
          mm-box--justify-content-space-between mm-box--align-items-center 
          mm-box--width-full mm-box--background-color-background-default"
        >
          <div>
            <button
              class="mm-box mm-picker-network 
              multichain-app-header__contents__network-picker 
              mm-box--padding-right-2 mm-box--padding-left-2 mm-box--display-flex 
              mm-box--gap-2 mm-box--align-items-center 
              mm-box--background-color-background-alternative mm-box--rounded-pill"
              aria-label="网络菜单 Ethereum Mainnet"
              data-testid="network-display"
            >
              <div
                class="mm-box mm-text 
                mm-avatar-base mm-avatar-base--size-xs 
                mm-avatar-network mm-picker-network__avatar-network 
                mm-text--body-xs mm-text--text-transform-uppercase 
                mm-box--display-flex mm-box--justify-content-center 
                mm-box--align-items-center mm-box--color-text-default 
                mm-box--background-color-background-alternative mm-box--rounded-md 
                mm-box--border-color-background-default mm-box--border-width-1 
                box--border-style-solid"
                role="img"
              >
                <img
                  class="mm-avatar-network__network-image"
                  src="@/static/icon/eth_logo.svg"
                  alt="Ethereum Mainnet logo"
                />
              </div>
              <p
                class="mm-box mm-text 
                mm-text--body-sm mm-text--ellipsis
                mm-box--color-text-default"
              >
                Ethereum Mainnet
              </p>
              <span
                class="
                mm-box mm-picker-network__arrow-down-icon arrow-down
                mm-icon mm-icon--size-xs mm-box--margin-left-auto 
                mm-box--display-inline-block mm-box--color-icon-default"
                style=""
              ></span>
            </button>
          </div>
          <button
            class="mm-box app-header__logo-container app-header__logo-container--clickable mm-box--background-color-transparent"
            data-testid="app-header-logo"
          >
            <svg
              height="30"
              width="162"
              viewBox="0 0 696 344"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="app-header__metafox-logo--horizontal"
            >
              <path
                d="M394.102 265.407V340.812H355.162V288.57L310.786 293.73C301.039 294.854 296.75 298.041 296.75 303.912C296.75 312.512 304.892 316.136 322.344 316.136C332.985 316.136 344.773 314.553 355.184 311.824L335.026 340.353C326.885 342.165 318.95 343.06 310.579 343.06C275.262 343.06 255.103 329.024 255.103 304.119C255.103 282.149 270.95 270.613 306.956 266.531L354.519 261.004C351.951 247.175 341.516 241.167 320.762 241.167C301.291 241.167 279.78 246.143 260.539 255.431L266.662 221.696C284.55 214.22 304.938 210.367 325.532 210.367C370.825 210.367 394.148 229.173 394.148 265.384L394.102 265.407ZM43.7957 170.991L1.23138 340.812H43.7957L64.9173 255.477L101.542 299.372H145.918L182.542 255.477L203.664 340.812H246.228L203.664 170.968L123.718 265.912L43.7727 170.968L43.7957 170.991ZM203.664 1.14648L123.718 96.0905L43.7957 1.14648L1.23138 170.991H43.7957L64.9173 85.6558L101.542 129.55H145.918L182.542 85.6558L203.664 170.991H246.228L203.664 1.14648ZM496.454 263.825L462.031 258.848C453.431 257.495 450.037 254.766 450.037 250.019C450.037 242.313 458.407 238.919 475.63 238.919C495.559 238.919 513.447 243.001 532.253 251.831L527.506 218.554C512.324 213.119 494.894 210.413 476.777 210.413C434.442 210.413 411.325 225.136 411.325 251.624C411.325 272.241 424.007 283.777 450.954 287.859L485.836 293.065C494.665 294.418 498.289 297.812 498.289 303.247C498.289 310.953 490.147 314.576 473.612 314.576C451.871 314.576 428.319 309.37 409.078 300.082L412.931 333.359C429.466 339.482 450.977 343.105 471.135 343.105C514.617 343.105 537.252 327.924 537.252 300.977C537.252 279.465 524.57 267.907 496.5 263.848L496.454 263.825ZM552.388 186.15V340.812H591.329V186.15H552.388ZM636.829 271.301L690.974 212.638H642.516L591.329 273.319L645.91 340.789H695.057L636.829 271.278V271.301ZM546.953 134.297C546.953 159.203 567.111 173.238 602.429 173.238C610.799 173.238 618.734 172.321 626.876 170.532L647.034 142.003C636.622 144.709 624.835 146.314 614.194 146.314C596.764 146.314 588.6 142.691 588.6 134.091C588.6 128.197 592.911 125.032 602.635 123.909L647.011 118.749V170.991H685.952V95.586C685.952 59.3513 662.629 40.5689 617.335 40.5689C596.718 40.5689 576.354 44.4217 558.466 51.8979L552.342 85.6329C571.583 76.3449 593.095 71.3684 612.565 71.3684C633.32 71.3684 643.755 77.3769 646.323 91.2057L598.759 96.7326C562.754 100.815 546.907 112.35 546.907 134.32L546.953 134.297ZM438.043 126.156C438.043 157.414 456.16 173.261 491.936 173.261C506.201 173.261 517.988 170.991 529.294 165.785L534.271 131.591C523.4 138.15 512.301 141.544 501.201 141.544C484.437 141.544 476.961 134.756 476.961 119.574V74.2809H536.06V42.8163H476.961V16.099L402.909 55.2691V74.2809H437.997V126.133L438.043 126.156ZM399.767 111.892V119.597H294.526C299.273 135.284 313.377 142.462 338.42 142.462C358.349 142.462 376.925 138.38 393.437 130.468L388.69 163.537C373.508 169.867 354.267 173.284 334.567 173.284C282.257 173.284 253.727 150.19 253.727 107.397C253.727 64.603 282.715 40.5918 327.55 40.5918C372.384 40.5918 399.79 66.6441 399.79 111.914L399.767 111.892ZM294.021 93.3155H360.574C357.065 78.2942 345.53 70.451 327.091 70.451C308.653 70.451 297.714 78.0878 294.021 93.3155Z"
                fill="rgb(22,22,22)"
              ></path></svg
            ><img
              src="@/static/icon/metamask-fox.svg"
              class="app-header__metafox-logo--icon"
              alt=""
            />
          </button>
        </div>
      </div>
      <div class="mm-box main-container-wrapper">
        <div class="unlock-page__container">
          <div class="unlock-page" data-testid="unlock-page">
            <div class="unlock-page__mascot-container">
              <div style="z-index: 0">
                <svg width="120px" height="120px">
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="83.3324521780014,44.04672682285309 100.0377345085144,37.57654666900635 94.47851657867432,54.518505334854126"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="94.47851657867432,54.518505334854126 83.5702496767044,53.119294345378876 83.3324521780014,44.04672682285309"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="36.909345388412476,43.925880789756775 25.613926649093628,54.3486687541008 20.298525094985962,37.362163066864014"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="25.613926649093628,54.3486687541008 36.909345388412476,43.925880789756775 36.910847425460815,53.003381341695786"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="84.30208325386047,62.57442332804203 94.47851657867432,54.518505334854126 99.78458762168884,73.55282485485077"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="94.47851657867432,54.518505334854126 84.30208325386047,62.57442332804203 83.5702496767044,53.119294345378876"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="77.93437242507935,84.21446442604065 99.78458762168884,73.55282485485077 94.29969191551208,91.65323138237"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="74.47019577026367,84.81219291687012 77.93437242507935,84.21446442604065 94.29969191551208,91.65323138237"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="83.3324521780014,44.04672682285309 94.92896318435669,16.01047396659851 100.0377345085144,37.57654666900635"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="36.41692399978638,62.46139973402023 25.613926649093628,54.3486687541008 36.910847425460815,53.003381341695786"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="25.613926649093628,54.3486687541008 36.41692399978638,62.46139973402023 20.341511964797974,73.37671279907227"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="36.909345388412476,43.925880789756775 20.298525094985962,37.362163066864014 25.69723606109619,15.804777145385742"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="42.810428738594055,84.14153158664703 25.59339165687561,91.51723623275757 20.341511964797974,73.37671279907227"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="45.61992287635803,84.75251913070679 25.59339165687561,91.51723623275757 42.810428738594055,84.14153158664703"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="94.92896318435669,16.01047396659851 83.3324521780014,44.04672682285309 69.35985088348389,41.95359706878662"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="83.3324521780014,44.04672682285309 83.5702496767044,53.119294345378876 69.35985088348389,41.95359706878662"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="69.35985088348389,41.95359706878662 67.8649091720581,33.09955537319183 94.92896318435669,16.01047396659851"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="51.4665412902832,41.906535029411316 52.45193749666214,33.05723011493683 67.8649091720581,33.09955537319183"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="51.4665412902832,41.906535029411316 67.8649091720581,33.09955537319183 69.35985088348389,41.95359706878662"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="51.4665412902832,41.906535029411316 25.69723606109619,15.804777145385742 52.45193749666214,33.05723011493683"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="25.69723606109619,15.804777145385742 51.4665412902832,41.906535029411316 36.909345388412476,43.925880789756775"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="36.909345388412476,43.925880789756775 51.4665412902832,41.906535029411316 36.910847425460815,53.003381341695786"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="20.341511964797974,73.37671279907227 36.41692399978638,62.46139973402023 42.530638575553894,63.38851064443588"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="99.78458762168884,73.55282485485077 77.93437242507935,84.21446442604065 78.26716840267181,70.61007410287857"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="84.30208325386047,62.57442332804203 99.78458762168884,73.55282485485077 78.26716840267181,70.61007410287857"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="20.341511964797974,73.37671279907227 42.90816128253937,70.53034722805023 42.810428738594055,84.14153158664703"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="20.341511964797974,73.37671279907227 42.530638575553894,63.38851064443588 42.90816128253937,70.53034722805023"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="78.08408260345459,55.76744645833969 69.35985088348389,41.95359706878662 83.5702496767044,53.119294345378876"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="78.08408260345459,55.76744645833969 83.5702496767044,53.119294345378876 84.30208325386047,62.57442332804203"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="42.97135949134827,55.68144366145134 36.41692399978638,62.46139973402023 36.910847425460815,53.003381341695786"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="42.97135949134827,55.68144366145134 36.910847425460815,53.003381341695786 51.4665412902832,41.906535029411316"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="78.3504170179367,63.472627848386765 78.08408260345459,55.76744645833969 84.30208325386047,62.57442332804203"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="78.08408260345459,55.76744645833969 71.87061220407486,55.41404351592064 69.35985088348389,41.95359706878662"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="42.97135949134827,55.68144366145134 42.530638575553894,63.38851064443588 36.41692399978638,62.46139973402023"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="84.30208325386047,62.57442332804203 78.26716840267181,70.61007410287857 78.3504170179367,63.472627848386765"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="42.97135949134827,55.68144366145134 51.4665412902832,41.906535029411316 49.29024875164032,55.35863667726517"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="69.35985088348389,41.95359706878662 71.87061220407486,55.41404351592064 67.3022098839283,55.14396250247955"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="53.93788620829582,55.11112421751022 51.4665412902832,41.906535029411316 69.35985088348389,41.95359706878662"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="53.93788620829582,55.11112421751022 69.35985088348389,41.95359706878662 67.3022098839283,55.14396250247955"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="49.29024875164032,55.35863667726517 51.4665412902832,41.906535029411316 53.93788620829582,55.11112421751022"
                  ></polygon>
                  <polygon
                    fill="rgb(192,196,205)"
                    stroke="rgb(192,196,205)"
                    points="64.10913750529289,92.47659802436829 65.47170996665955,89.4522875547409 77.93437242507935,84.21446442604065"
                  ></polygon>
                  <polygon
                    fill="rgb(192,196,205)"
                    stroke="rgb(192,196,205)"
                    points="56.424275413155556,92.46147751808167 65.47170996665955,89.4522875547409 64.10913750529289,92.47659802436829"
                  ></polygon>
                  <polygon
                    fill="rgb(192,196,205)"
                    stroke="rgb(192,196,205)"
                    points="56.424275413155556,92.46147751808167 42.810428738594055,84.14153158664703 56.1656454205513,89.43360686302185"
                  ></polygon>
                  <polygon
                    fill="rgb(192,196,205)"
                    stroke="rgb(192,196,205)"
                    points="56.424275413155556,92.46147751808167 56.1656454205513,89.43360686302185 65.47170996665955,89.4522875547409"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="78.08408260345459,55.76744645833969 78.3504170179367,63.472627848386765 75.60488820075989,60.15256160404533"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="68.71597945690155,65.1109953224659 75.60488820075989,60.15256160404533 78.3504170179367,63.472627848386765"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="42.530638575553894,63.38851064443588 42.97135949134827,55.68144366145134 45.43518394231796,60.08040231652558"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="78.3504170179367,63.472627848386765 78.26716840267181,70.61007410287857 68.71597945690155,65.1109953224659"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="52.403284907341,65.07304251194 42.530638575553894,63.38851064443588 45.43518394231796,60.08040231652558"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="42.90816128253937,70.53034722805023 42.530638575553894,63.38851064443588 52.403284907341,65.07304251194"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="78.08408260345459,55.76744645833969 75.60488820075989,60.15256160404533 70.54615259170532,59.836174780502915"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="70.54615259170532,59.836174780502915 71.87061220407486,55.41404351592064 78.08408260345459,55.76744645833969"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="68.71597945690155,65.1109953224659 70.54615259170532,59.836174780502915 75.60488820075989,60.15256160404533"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="45.43518394231796,60.08040231652558 42.97135949134827,55.68144366145134 50.58895021677017,59.78836194612086"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="50.58895021677017,59.78836194612086 42.97135949134827,55.68144366145134 49.29024875164032,55.35863667726517"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="52.403284907341,65.07304251194 45.43518394231796,60.08040231652558 50.58895021677017,59.78836194612086"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="78.26716840267181,70.61007410287857 77.93437242507935,84.21446442604065 66.96285858750343,77.03026950359344"
                  ></polygon>
                  <polygon
                    fill="rgb(231,235,246)"
                    stroke="rgb(231,235,246)"
                    points="66.96285858750343,77.03026950359344 77.93437242507935,84.21446442604065 65.47170996665955,89.4522875547409"
                  ></polygon>
                  <polygon
                    fill="rgb(255,92,22)"
                    stroke="rgb(255,92,22)"
                    points="42.90816128253937,70.53034722805023 54.98581185936928,77.00427532196045 42.810428738594055,84.14153158664703"
                  ></polygon>
                  <polygon
                    fill="rgb(231,235,246)"
                    stroke="rgb(231,235,246)"
                    points="54.98581185936928,77.00427532196045 56.1656454205513,89.43360686302185 42.810428738594055,84.14153158664703"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="70.54615259170532,59.836174780502915 67.3022098839283,55.14396250247955 71.87061220407486,55.41404351592064"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="50.58895021677017,59.78836194612086 49.29024875164032,55.35863667726517 53.93788620829582,55.11112421751022"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="66.3555058836937,62.282670959830284 70.54615259170532,59.836174780502915 68.71597945690155,65.1109953224659"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="70.54615259170532,59.836174780502915 66.3555058836937,62.282670959830284 67.3022098839283,55.14396250247955"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="54.97372403740883,62.25576929748058 50.58895021677017,59.78836194612086 53.93788620829582,55.11112421751022"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="50.58895021677017,59.78836194612086 54.97372403740883,62.25576929748058 52.403284907341,65.07304251194"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="66.3555058836937,62.282670959830284 53.93788620829582,55.11112421751022 67.3022098839283,55.14396250247955"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="66.3555058836937,62.282670959830284 54.97372403740883,62.25576929748058 53.93788620829582,55.11112421751022"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="64.44994747638702,74.41304415464401 66.3555058836937,62.282670959830284 68.71597945690155,65.1109953224659"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="64.44994747638702,74.41304415464401 68.71597945690155,65.1109953224659 78.26716840267181,70.61007410287857"
                  ></polygon>
                  <polygon
                    fill="rgb(227,72,7)"
                    stroke="rgb(227,72,7)"
                    points="57.50168390572071,74.39772605895996 52.403284907341,65.07304251194 54.97372403740883,62.25576929748058"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="57.50168390572071,74.39772605895996 42.90816128253937,70.53034722805023 52.403284907341,65.07304251194"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="78.26716840267181,70.61007410287857 66.96285858750343,77.03026950359344 64.44994747638702,74.41304415464401"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="42.90816128253937,70.53034722805023 57.50168390572071,74.39772605895996 54.98581185936928,77.00427532196045"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="64.44994747638702,74.41304415464401 54.97372403740883,62.25576929748058 66.3555058836937,62.282670959830284"
                  ></polygon>
                  <polygon
                    fill="rgb(255,141,93)"
                    stroke="rgb(255,141,93)"
                    points="64.44994747638702,74.41304415464401 57.50168390572071,74.39772605895996 54.97372403740883,62.25576929748058"
                  ></polygon>
                  <polygon
                    fill="rgb(192,196,205)"
                    stroke="rgb(192,196,205)"
                    points="56.1656454205513,89.43360686302185 65.65572559833527,81.44634962081909 65.47170996665955,89.4522875547409"
                  ></polygon>
                  <polygon
                    fill="rgb(231,235,246)"
                    stroke="rgb(231,235,246)"
                    points="66.96285858750343,77.03026950359344 65.47170996665955,89.4522875547409 65.65572559833527,81.44634962081909"
                  ></polygon>
                  <polygon
                    fill="rgb(192,196,205)"
                    stroke="rgb(192,196,205)"
                    points="56.1656454205513,89.43360686302185 56.32067084312439,81.42663180828094 65.65572559833527,81.44634962081909"
                  ></polygon>
                  <polygon
                    fill="rgb(231,235,246)"
                    stroke="rgb(231,235,246)"
                    points="54.98581185936928,77.00427532196045 56.32067084312439,81.42663180828094 56.1656454205513,89.43360686302185"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="66.96285858750343,77.03026950359344 63.14393788576126,75.3718614578247 64.44994747638702,74.41304415464401"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="58.92872393131256,75.36262214183807 57.50168390572071,74.39772605895996 64.44994747638702,74.41304415464401"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="58.92872393131256,75.36262214183807 64.44994747638702,74.41304415464401 63.14393788576126,75.3718614578247"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="54.98581185936928,77.00427532196045 57.50168390572071,74.39772605895996 58.92872393131256,75.36262214183807"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="66.96285858750343,77.03026950359344 65.65572559833527,81.44634962081909 65.07017657160759,77.89373874664307"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="63.14393788576126,75.3718614578247 66.96285858750343,77.03026950359344 65.07017657160759,77.89373874664307"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="54.98581185936928,77.00427532196045 56.999835669994354,77.87631511688232 56.32067084312439,81.42663180828094"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="58.92872393131256,75.36262214183807 56.999835669994354,77.87631511688232 54.98581185936928,77.00427532196045"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="56.32067084312439,81.42663180828094 65.07017657160759,77.89373874664307 65.65572559833527,81.44634962081909"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="56.32067084312439,81.42663180828094 56.999835669994354,77.87631511688232 65.07017657160759,77.89373874664307"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="56.999835669994354,77.87631511688232 58.92872393131256,75.36262214183807 63.14393788576126,75.3718614578247"
                  ></polygon>
                  <polygon
                    fill="rgb(102,24,0)"
                    stroke="rgb(102,24,0)"
                    points="56.999835669994354,77.87631511688232 63.14393788576126,75.3718614578247 65.07017657160759,77.89373874664307"
                  ></polygon>
                </svg>
              </div>
            </div>
            <h1
              class="mm-box mm-text mm-text--display-md 
              mm-text--font-weight-medium mm-box--margin-top-1 
              mm-box--margin-bottom-1 mm-box--color-text-default"
              data-testid="unlock-page-title"
            >
              欢迎回来！
            </h1>
            <p
              class="mm-box mm-text mm-text--body-md 
              mm-box--color-text-alternative"
            >
              即将进入去中心化网络
            </p>
            <form class="unlock-page__form">
              <div
                class="MuiFormControl-root MuiTextField-root 
                MuiFormControl-fullWidth"
              >
                <label
                  class="MuiFormLabel-root MuiInputLabel-root 
                  jss16 MuiInputLabel-formControl MuiInputLabel-animated"
                  data-shrink="false"
                  for="password"
                  id="password-label"
                  :class="aniShow?'anshow':'anhide'"
                  >密码</label
                >
                <div
                  class="MuiInputBase-root MuiInput-root 
                  MuiInput-underline jss18 MuiInputBase-fullWidth 
                  MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl"
                >
                  <input
                    aria-invalid="false"
                    autocomplete="current-password"
                    id="password"
                    v-model="value"
                    type="password"
                    dir="auto"
                    data-testid="unlock-password"
                    class="MuiInputBase-input MuiInput-input"
                  />
                </div>
                <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-filled" v-if="valTxt"
                id="password-helper-text">
                    {{ valTxt }}
                </p>
              </div>
            </form>
            <button
              class="button btn--rounded btn-default"
              data-testid="unlock-submit"
              variant="contained"
              :class="value?'valueok':''"
              @click="goHome"
              style="
                background-color: var(--color-primary-default);
                color: var(--color-primary-inverse);
                margin-top: 20px;
                height: 56px;
                font-weight: 500;
                box-shadow: none;
                border-radius: 100px;
              "
            >
              登录
            </button>
            <div class="unlock-page__links">
              <a
                class="button btn-link unlock-page__link"
                role="button"
                tabindex="0"
                >忘记密码了？</a
              >
            </div>
            <div class="unlock-page__support">
              <span>
                需要帮助？请联系
                <a
                  href="https://support.metamask.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  >MetaMask 支持</a
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
}
.arrow-down{
    mask-image: url('@/static/icon/arrow-down.svg')
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
.MuiInput-input, .MuiInputBase-input {
    color: var(--color-text-default) !important;
}
label + .MuiInput-formControl {
    margin-top: 16px;
}

.MuiInput-root {
    position: relative;
}

.MuiInputBase-fullWidth {
    width: 100%;
}

.MuiInputBase-root {
    color: rgba(0, 0, 0, 0.87);
    cursor: text;
    display: inline-flex;
    position: relative;
    font-size: 1rem;
    box-sizing: border-box;
    align-items: center;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.1876em;
    letter-spacing: 0.00938em;
}
.multichain-app-header__lock-contents{
    height: 68px;
}
.MuiInput-underline:before {
    left: 0;
    right: 0;
    bottom: 0;
    content: "\00a0";
    position: absolute;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    pointer-events: none;
}
.jss18:before {
    border-bottom: 1px solid var(--color-text-default) !important;
}
.MuiInput-underline:after {
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    position: absolute;
    transform: scaleX(0);
    transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid #3f51b5;
    pointer-events: none;
}
.jss18:after {
    border-bottom: 2px solid var(--color-primary-default);
}
.jss16 {
    color: var(--color-text-alternative);
    font-weight: 400;
}
.jss16.jss17 {
  color: var(--color-text-alternative);
}
.MuiInputLabel-root {
    display: block;
    transform-origin: top left;
}
.MuiInputLabel-formControl {
    top: -23px;
    left: 0;
    position: absolute;
    transform: translate(0, 24px) scale(1);
}
.MuiInputLabel-animated {
    transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
}
// .MuiInputLabel-animated.anshow{
//     animation: jinrux 0.5s linear 1 1;
// }
// .MuiInputLabel-animated.anhide{
//     animation: jinruxhide 0.5s linear 1 1;
// }

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
.MuiFormControl-fullWidth {
    width: 100%;
}
.btn--rounded.valueok{
    opacity: 1;
}

</style>
