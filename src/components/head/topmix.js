import { assetManager } from "@/bbjs/AssetManager"
import { accountManager } from "@/bbjs/AccountManager"
import {formatAddress} from "@/bbjs/utils"
import { chainDefaultAssetMap } from "@/bbjs/chain-default-assets"

export default {
 data(){
    return {
        userinfos:{// 账号信息
        child:{},// 当前账号绑定的主币

        },
    }
 },
 mounted(){
    this.initSet()
 },
 methods: {
    formatAddress,
    initSet(){
        let userinfos  = accountManager.getCurrentAccount()
        let userinfosAll  = accountManager.getAllAccounts()
        console.log( userinfos,'--userinfos' )
        let idx = 0;
        let filarr = userinfosAll.filter((it,i)=>{
            if(it.walletId == userinfos.walletId){
                console.log( it,'filter' )
                idx = i
            }
            return it.walletId == userinfos.walletId;
        })
       
        if(filarr.length == 1){
            // let arrs = filarr[0].addresses.filter(it=>{
            //     return it.chainId ==  userinfos.currentChainId
            // })
            
            let childobj =  chainDefaultAssetMap[userinfos.currentChainId];
            
            let child = {
                ...accountManager.getCurrentAddress(),
                ...childobj
            }
            console.log( child,'idx--arrs' )
            this.userinfos = {
                ...userinfos,
                idx,
                child:child,
            }
        }
        console.log( this.userinfos ,'idx' )
    }
 }
}